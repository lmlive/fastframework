package com.livem.quickframework.controller.rest;

import com.google.code.kaptcha.Producer;
import com.livem.quickframework.auth.oauth2.OAuthService;
import com.livem.quickframework.model.BaseStaus;
import com.livem.quickframework.model.ResponseStatus;
import com.livem.quickframework.utils.ShiroUtils;
import org.apache.oltu.oauth2.as.issuer.MD5Generator;
import org.apache.oltu.oauth2.as.issuer.OAuthIssuer;
import org.apache.oltu.oauth2.as.issuer.OAuthIssuerImpl;
import org.apache.oltu.oauth2.as.request.OAuthAuthzRequest;
import org.apache.oltu.oauth2.as.request.OAuthUnauthenticatedTokenRequest;
import org.apache.oltu.oauth2.as.response.OAuthASResponse;
import org.apache.oltu.oauth2.common.exception.OAuthProblemException;
import org.apache.oltu.oauth2.common.exception.OAuthSystemException;
import org.apache.oltu.oauth2.common.message.OAuthResponse;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.IOException;

/**
 * @author Administrator
 * 模拟Oauth2
 * 1.get code
 * 2.get token
 */
@RestController
@RequestMapping("/system/auth")
public class Oauth2Controller extends BaseRestController {
    @Autowired
    OAuthService oauthService;
    @Autowired
    private Producer producer;

    OAuthIssuer oauthIssuerImpl = new OAuthIssuerImpl(new MD5Generator());

    @RequestMapping(path = "/authorize")
    public BaseStaus Authorization(String loginName, String password, HttpServletRequest request, HttpServletResponse response) throws OAuthSystemException, IOException {
        try {
            OAuthAuthzRequest oauthRequest = new OAuthAuthzRequest(request);
            if (!this.oauthService.validClientID(oauthRequest.getClientId())) {
                BaseStaus baseStaus = new BaseStaus(BaseStaus.CODE_ERROR, "clientid 错误");
                return baseStaus;
            }

            if (!SecurityUtils.getSubject().isAuthenticated()) {
                AuthenticationToken token = new UsernamePasswordToken(loginName, password);
                try {
                    SecurityUtils.getSubject().login(token);
                } catch (AuthenticationException ex) {
                    BaseStaus baseStaus = new BaseStaus(BaseStaus.CODE_ERROR, ex.getMessage());

                    return baseStaus;
                }
            }
            // build OAuth response
            String authorizationCode = oauthIssuerImpl.authorizationCode();
            OAuthResponse resp = OAuthASResponse.authorizationResponse(request, HttpServletResponse.SC_FOUND).setCode(authorizationCode).location(oauthRequest.getRedirectURI()).buildQueryMessage();


            //add code
            this.oauthService.addCode(authorizationCode, loginName);
            return ResponseStatus.ok(resp);

            // if something goes wrong
        } catch (OAuthProblemException ex) {
            return ResponseStatus.error(ex.getMessage());
        }
    }

    @RequestMapping(path = "/token")
    @ResponseBody
    public BaseStaus getToken(HttpServletRequest request, HttpServletResponse response) throws OAuthSystemException {
        OAuthUnauthenticatedTokenRequest oauthRequest = null;

        try {

            oauthRequest = new OAuthUnauthenticatedTokenRequest(request);

            // validateClient(oauthRequest);
            if (!this.oauthService.validClientID(oauthRequest.getClientId())) {
                throw OAuthProblemException.error("clientId 参数错误");
            }
            String authzCode = oauthRequest.getCode();

            // some code
            String accessToken = oauthIssuerImpl.accessToken();
            String refreshToken = oauthIssuerImpl.refreshToken();

            this.oauthService.addToken(accessToken, authzCode);
            // some code
            OAuthResponse r = OAuthASResponse.tokenResponse(HttpServletResponse.SC_OK).setAccessToken(accessToken).setExpiresIn("3600").setRefreshToken(refreshToken).buildBodyMessage();
            response.setStatus(r.getResponseStatus());
            return ResponseStatus.ok(r);
            // if something goes wrong
        } catch (Exception ex) {
            return ResponseStatus.error(ex.getMessage());

        }
    }


    @RequestMapping("captcha.jpg")
    public void kaptach(ServletRequest request, HttpServletResponse resp) throws IOException {

        String capText = this.producer.createText();
        ShiroUtils.setSessionAttribute(ShiroUtils.kaptach_session_key, capText);
        resp.setHeader("Cache-Control", "no-store, no-cache");
        resp.setContentType("image/jpeg");
        BufferedImage bi = this.producer.createImage(capText);
        ServletOutputStream out = resp.getOutputStream();
        ImageIO.write(bi, "jpg", out);

    }

}
