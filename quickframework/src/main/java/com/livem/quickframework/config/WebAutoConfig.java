package com.livem.quickframework.config;

import java.text.SimpleDateFormat;
import java.util.List;

import com.livem.quickframework.exception.RestExceptionHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.web.ErrorProperties.IncludeStacktrace;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.format.datetime.DateFormatter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.lang.Nullable;
import org.springframework.validation.Validator;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;
import com.livem.quickframework.convert.custEditor.IdToEntityConverter;
import com.livem.quickframework.convert.custEditor.StringToMapConverter;

@Configuration
@EnableConfigurationProperties(value = ServerProperties.class)
public class WebAutoConfig implements WebMvcConfigurer, InitializingBean {

    Logger log = LoggerFactory.getLogger(WebAutoConfig.class);

    @Value("${application.docBase:}")
    private String docBase = ".";

    @Autowired
    ServerProperties serverProperties;


    @Autowired
    BeanFactory beanFactory;

    IncludeStacktrace includeStacktrace = IncludeStacktrace.ALWAYS;

    @Bean
    public RestExceptionHandler restExceptionHandler() {
        return new RestExceptionHandler();
    }

    @Override
    public void addFormatters(FormatterRegistry registry) {
        // registry.addFormatter(new DateFormatter("yyyy-MM-dd"));
        // registry.addFormatter(new DateFormatter("yyyy-MM-dd hh:mm:ss"));
        registry.addFormatter(new DateFormatter());
        IdToEntityConverter idtoentityConvert = new IdToEntityConverter();
        idtoentityConvert.setBeanFactory(this.beanFactory);
        registry.addConverter(idtoentityConvert);
        registry.addConverter(new StringToMapConverter());

    }

    @Override
    public void afterPropertiesSet() throws Exception {
        serverProperties.getError().setIncludeStacktrace(includeStacktrace);
    }

    @Override
    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(new FastJsonHttpMessageConverter());
        for (HttpMessageConverter<?> c : converters) {
            if (c instanceof MappingJackson2HttpMessageConverter) {
                ((MappingJackson2HttpMessageConverter) c).getObjectMapper().setDateFormat(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss"));
                break;
            }
        }

    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/system/**");
        registry.addMapping("/admin/**");



    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("asset/**").addResourceLocations("classpath:asset/");
        registry.addResourceHandler("assets/**").addResourceLocations("classpath:assets/");
        registry.addResourceHandler("public/**").addResourceLocations("classpath:public/");

    }

    @Nullable
    @Override
    public Validator getValidator() {
        return null;
    }
}
