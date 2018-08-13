package com.livem.quickframework.security;

import org.apache.shiro.authc.AuthenticationToken;
import org.thymeleaf.dialect.springdata.util.Strings;

public class OAuthToken implements AuthenticationToken{

	private String token;
	public   OAuthToken(String token) {
		this.token=token;
	}
	
	@Override
	public Object getPrincipal() {
		return this.token;
	}

	@Override
	public Object getCredentials() {
		return Strings.EMPTY;//shiro 会对比token 和认证后的authentication credit info
	}

}
