package com.livem.quickframework.config;

import java.lang.reflect.Method;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cache.CacheProperties;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.ehcache.EhCacheCacheManager;
import org.springframework.cache.ehcache.EhCacheManagerUtils;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.cache.interceptor.SimpleKeyGenerator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Conditional;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;


public class CacheConfig extends  CachingConfigurerSupport{

	@Autowired
	private CacheProperties cacheProperties ;


	@Override
	public KeyGenerator keyGenerator() {
		return new custKeyGenter();
				
	}

//	@Bean
//	public CacheManager ehCacheCacheManager() {
//		Resource location = this.cacheProperties
//				.resolveConfigLocation(this.cacheProperties.getEhcache().getConfig());
//		if (location != null) {
//			net.sf.ehcache.config.Configuration config = EhCacheManagerUtils.parseConfiguration(location);
//			config.setName(getClass().getName());
//			return new CacheManager(config);
//		}
//		return EhCacheManagerUtils.buildCacheManager();
//	}


	static class custKeyGenter implements KeyGenerator{

		@Override
		public Object generate(Object target, Method method, Object... params) {
			return target.getClass().getName()+method.getName()+params;
		}
		
	}
	
}
