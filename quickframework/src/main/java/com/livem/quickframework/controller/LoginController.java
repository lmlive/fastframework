package com.livem.quickframework.controller;

import com.livem.quickframework.auth.oauth2.OAuthService;
import com.livem.quickframework.exception.RestException;
import com.livem.quickframework.model.BaseStaus;
import com.livem.quickframework.model.ResponseStatus;
import com.livem.quickframework.utils.ShiroUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/admin")
public class LoginController {
    @Autowired
    OAuthService oAuthService;

    @RequestMapping("/loginout")
    public BaseStaus loginout() {
        SecurityUtils.getSubject().logout();
        return BaseStaus.success;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public BaseStaus login_in2(@RequestBody(required = false) Map map) {
        AuthenticationToken token = new UsernamePasswordToken(String.valueOf(map.get("username")), String.valueOf(map.get("password")), Boolean.parseBoolean(String.valueOf(map.get("remeber"))));
        String captcha = (String) map.get("captcha");
        if (StringUtils.isEmpty(captcha) || !captcha.equals(ShiroUtils.getKaptcha(ShiroUtils.kaptach_session_key))) {
            throw new RestException(-1, "验证码错误");
        }
        SecurityUtils.getSubject().login(token);
        String tokenStr = UUID.randomUUID().toString();

        String username = ((UsernamePasswordToken) token).getUsername();
        this.oAuthService.addCode(username,username);
        this.oAuthService.addToken(tokenStr, username);
        return ResponseStatus.ok(tokenStr);

    }


}
