package com.livem.quickframework.config;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.stereotype.Component;

@Component
public class MessageSourceBean {
	@Bean("messageSource")
	public MessageSource ms() {
		ResourceBundleMessageSource bundResource = new ResourceBundleMessageSource();
		bundResource.setBasenames("18n/framework","18n/18n");
		bundResource.setUseCodeAsDefaultMessage(true);
		return bundResource;
	}
}
