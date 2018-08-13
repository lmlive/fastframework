package com.livem.quickframework.config;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.thymeleaf.dialect.springdata.SpringDataDialect;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.spring5.messageresolver.SpringMessageResolver;
import org.thymeleaf.spring5.view.ThymeleafViewResolver;
 

@Configuration
@AutoConfigureAfter(value = SpringTemplateEngine.class)
@AutoConfigureBefore(value = ThymeleafViewResolver.class)
public class ThymleafConfig implements InitializingBean {
    @Autowired
    SpringTemplateEngine engine;
    @Autowired
    MessageSource messageSource;

    @Bean
    public SpringDataDialect dataDialect() {
        return new SpringDataDialect();
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        engine.setEnableSpringELCompiler(true);
//        engine.setCacheManager(this.cacheManager);
        SpringMessageResolver springMessageResolver = new SpringMessageResolver();
        springMessageResolver.setMessageSource(messageSource);
        springMessageResolver.setOrder(0);
        engine.setMessageResolver(springMessageResolver);
    }

}
