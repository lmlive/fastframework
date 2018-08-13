package com.livem.quickframework.auth.oauth2;

public interface OAuthService {
	boolean validClientID(String clientId);
	void addCode(String code,String LoginName);
	void addToken(String token,String code);
	String getLoginNameByToken(String token);
	
}
