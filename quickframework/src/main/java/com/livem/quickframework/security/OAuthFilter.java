package com.livem.quickframework.security;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.AccessControlFilter;

import com.alibaba.fastjson.JSON;
import com.livem.quickframework.model.BaseStaus;

public class OAuthFilter extends AccessControlFilter {

	@Override
	protected boolean isAccessAllowed(ServletRequest request,
			ServletResponse response, Object mappedValue) throws Exception {

		if (isLoginRequest(request, response)) {
			return true;
		} else {
			Subject subject = getSubject(request, response);
			// If principal is not null, then the user is known and should be
			// allowed access.
			if (subject.isAuthenticated())
				return true;
		}

		HttpServletRequest httpRequest = (HttpServletRequest) request;
		String accessToken = "access_token";
		String token = httpRequest.getParameter(accessToken) == null ? httpRequest
				.getHeader(accessToken) : httpRequest.getParameter(accessToken);
		try {
			SecurityUtils.getSubject().login(new OAuthToken(token));
		} catch (AuthenticationException ex) {
			return false;
		} catch (Exception e) {
			throw e;
		}
		return true;

	}

	@Override
	protected boolean onAccessDenied(ServletRequest request,
			ServletResponse response) throws Exception {

		saveRequest(request);
		// OAuthResponse r = OAuthResponse
		// .errorResponse(HttpServletResponse.SC_EXPECTATION_FAILED)
		// .error(OAuthProblemException.error("Auth failed"))
		// .buildJSONMessage();
		HttpServletResponse res = (HttpServletResponse) response;
		res.addHeader("Access-Control-Allow-Origin", "*");
		res.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
		// response.addHeader("Access-Control-Allow-Headers", "Authorization");
		res.addHeader("Access-Control-Allow-Headers", "x-requested-with");
		res.addHeader("Access-Control-Allow-Headers", "content-type");
		res.addHeader("Access-Control-Max-Age", "1");
		JSON.writeJSONString(response.getOutputStream(), new BaseStaus(
				BaseStaus.CODE_ERROR, "not authed"));
		// throw new AuthenticationException();
		return false;

	}

}
