package com.livem.quickframework.config;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.web.servlet.ServletContextInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.livem.quickframework.service.StoreService;
import com.livem.quickframework.service.impl.LocalFileStoreServiceImpl;

@Configuration
@ConditionalOnMissingBean(StoreService.class)
public class StoreServiceAutoConfig implements ServletContextInitializer {

	private ServletContext servletContext;
	@Bean
	StoreService localStoreService(){
		LocalFileStoreServiceImpl storeService = new LocalFileStoreServiceImpl();
		storeService.setServletContext(this.servletContext);
		return storeService;
	}

	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {
		this.servletContext=servletContext;
	}
}
