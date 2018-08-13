package com.livem.quickframework.config;

import com.google.code.kaptcha.Producer;
import com.google.code.kaptcha.impl.DefaultKaptcha;
import com.google.code.kaptcha.servlet.KaptchaServlet;
import com.google.code.kaptcha.util.Config;
import com.livem.quickframework.utils.ShiroUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.boot.autoconfigure.couchbase.CouchbaseProperties;
import org.springframework.boot.web.servlet.ServletContextInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;
import java.util.Properties;

@Configuration
@ConditionalOnWebApplication
@ConditionalOnMissingBean(Producer.class)
public class KaptachAutoConfig   {




    @Bean
    public Producer producer(Environment environment) {
        Config config = new Config(new SpringProperties(environment));
        DefaultKaptcha p = new DefaultKaptcha();
        p.setConfig(config);
        return p;
    }



    static class SpringProperties extends Properties {
        private Environment environment;

        public SpringProperties(Environment environment) {
            this.environment = environment;
        }

        @Override
        public String getProperty(String key) {
            return environment.getProperty(key);
        }

        @Override
        public String getProperty(String key, String defaultValue) {
            return environment.getProperty(key, defaultValue);
        }
    }
}
