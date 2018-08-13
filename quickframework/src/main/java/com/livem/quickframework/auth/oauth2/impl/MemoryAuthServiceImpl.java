package com.livem.quickframework.auth.oauth2.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.util.Assert;

import com.livem.quickframework.auth.oauth2.OAuthService;

public class MemoryAuthServiceImpl implements OAuthService{

	Map<String,String> authData=new HashMap<>();
	@Override
	public boolean validClientID(String clientId) {
		return true;
	}

	@Override
	public void addCode(String code, String LoginName) {
		Assert.notNull(code);
		authData.put(code, LoginName);
		
	}

	@Override
	public void addToken(String token, String code) {
		String LoginName=authData.get(code);
		Assert.notNull(LoginName, "code 不存在 ！");
		authData.remove(code);
		authData.put(token, LoginName);
		
		
		
	}

	@Override
	public String getLoginNameByToken(String token) {
		return authData.get(token);
	}

}
