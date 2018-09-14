package com.livem.quickframework.config;

import java.util.EnumSet;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.DispatcherType;
import javax.servlet.FilterRegistration.Dynamic;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;

import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.servlet.ServletContextInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.filter.DelegatingFilterProxy;

import com.alibaba.fastjson.JSON;
import com.livem.quickframework.auth.oauth2.OAuthService;
import com.livem.quickframework.interceptor.ShiroAuthClassAdvisor;
import com.livem.quickframework.security.ComposeRelm;
import com.livem.quickframework.security.OAuthFilter;

@Configuration
@ConditionalOnWebApplication
@ConditionalOnClass(value = { DefaultWebSecurityManager.class, Realm.class })
@ConfigurationProperties(prefix = "security.shiro")
@PropertySource(value = "classpath:security.properties")
public class ShiroAutoConfig implements ServletContextInitializer {

	private final static Logger logger = LoggerFactory.getLogger(ShiroAutoConfig.class);
	@Autowired
	private BeanFactory beanFactory;

	@Bean("shiroFilter")
	@ConditionalOnMissingBean(value = ShiroFilterFactoryBean.class)
	protected ShiroFilterFactoryBean shiroFilterFactoryBean(@Autowired SecurityManager securityManager) {
		ShiroFilterFactoryBean facb = new ShiroFilterFactoryBean();
		facb.setSecurityManager(securityManager);
		Map<String, String> filterChainDefinitionMap = convertShiroFilterMap();
		// security filter mapper
		facb.setFilterChainDefinitionMap(filterChainDefinitionMap);

		facb.setLoginUrl(loginUrl);

		facb.setSuccessUrl(successUrl);

		facb.setUnauthorizedUrl(unauthorizedUrl);

		facb.getFilters().put("oauth", new OAuthFilter());
		return facb;
	}

	Map<String, String> convertShiroFilterMap() {
		String filter = getFilterChain();
		LinkedHashMap<String, String> result = JSON.parseObject(filter, LinkedHashMap.class);
		return result;
	}

	@Bean
	@ConditionalOnMissingBean(value = SecurityManager.class)
	protected SecurityManager securityManager(@Autowired Realm realm) {
		DefaultWebSecurityManager securityM = new DefaultWebSecurityManager();
		securityM.setRealm(realm);
		return securityM;
	}

	@Bean
	@ConditionalOnMissingBean(value = Realm.class)
	protected Realm realM(@Autowired(required = false) OAuthService oauthService) {
		ComposeRelm composerelm = new ComposeRelm(this.beanFactory);

		composerelm.setOauthService(oauthService);
		composerelm.setAuthenticationCacheName(authenticationCacheName);
		composerelm.setAuthenticationCachingEnabled(authenticationCachingEnabled);
		composerelm.setAuthorizationCacheName(authorizationCacheName);
		composerelm.setCachingEnabled(cachingEnabled);

		return composerelm;
	}

	private String authenticationCacheName;
	private boolean authenticationCachingEnabled;
	private String authorizationCacheName;
	private boolean cachingEnabled;
	private boolean permissionsLookupEnabled;
	private String filterChain;
	private String loginUrl;
	private String successUrl;
	private String unauthorizedUrl;

	public String getUnauthorizedUrl() {
		return unauthorizedUrl;
	}

	public void setUnauthorizedUrl(String unauthorizedUrl) {
		this.unauthorizedUrl = unauthorizedUrl;
	}

	public String getSuccessUrl() {
		return successUrl;
	}

	public void setSuccessUrl(String successUrl) {
		this.successUrl = successUrl;
	}

	public void setLoginUrl(String loginUrl) {
		this.loginUrl = loginUrl;
	}

	public String getLoginUrl() {
		return loginUrl;
	}

	public String getAuthenticationCacheName() {
		return authenticationCacheName;
	}

	public void setAuthenticationCacheName(String authenticationCacheName) {
		this.authenticationCacheName = authenticationCacheName;
	}

	public boolean isAuthenticationCachingEnabled() {
		return authenticationCachingEnabled;
	}

	public void setAuthenticationCachingEnabled(boolean authenticationCachingEnabled) {
		this.authenticationCachingEnabled = authenticationCachingEnabled;
	}

	public String getAuthorizationCacheName() {
		return authorizationCacheName;
	}

	public void setAuthorizationCacheName(String authorizationCacheName) {
		this.authorizationCacheName = authorizationCacheName;
	}

	public boolean isCachingEnabled() {
		return cachingEnabled;
	}

	public void setCachingEnabled(boolean cachingEnabled) {
		this.cachingEnabled = cachingEnabled;
	}

	public boolean isPermissionsLookupEnabled() {
		return permissionsLookupEnabled;
	}

	public void setPermissionsLookupEnabled(boolean permissionsLookupEnabled) {
		this.permissionsLookupEnabled = permissionsLookupEnabled;
	}

	public String getFilterChain() {
		return filterChain;
	}

	public void setFilterChain(String filterChain) {
		this.filterChain = filterChain;
	}


	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {
		logger.debug("==============add shiro filter==============");
		Dynamic f = servletContext.addFilter("shiroFilter", DelegatingFilterProxy.class);
		EnumSet<DispatcherType> set = EnumSet.allOf(DispatcherType.class);
		f.addMappingForUrlPatterns(set, false, new String[] { "/*" });

	}

	@Bean
	public ShiroAuthClassAdvisor shiroAdvisor(SecurityManager sm) {
		ShiroAuthClassAdvisor shiroAdvisor = new ShiroAuthClassAdvisor();
		shiroAdvisor.setSecurityManager(sm);
		return shiroAdvisor;

	}

}
