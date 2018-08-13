package com.livem.quickframework.config;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;

@Configuration
public class EntityMessageSourceConfig {

	@Bean("messageSource")
	public MessageSource ms() {
		ResourceBundleMessageSource bundResource = new ResourceBundleMessageSource();
		bundResource.setUseCodeAsDefaultMessage(true);
		bundResource.addBasenames("18n/18n");
		bundResource.addBasenames("18n/framework");
		return bundResource;

	}

}
