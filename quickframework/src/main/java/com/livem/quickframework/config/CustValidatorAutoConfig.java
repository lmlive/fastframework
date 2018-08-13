package com.livem.quickframework.config;

import com.livem.quickframework.validtor.UKValidtor;
import org.hibernate.SessionFactory;
import org.livem.metaservice.PropertyMetaService;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConditionalOnBean(SessionFactory.class)
public class CustValidatorAutoConfig {

	@Bean
	public UKValidtor ukvalidator(BeanFactory bf, PropertyMetaService ep) {
		return new UKValidtor(bf, ep);

	}
}
