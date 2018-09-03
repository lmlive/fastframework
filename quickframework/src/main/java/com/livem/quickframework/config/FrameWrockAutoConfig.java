package com.livem.quickframework.config;

import com.livem.quickframework.FrameWorkBooter;
import com.livem.quickframework.entity.SystemUser;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.PropertySource;

@Configuration
@EnableAspectJAutoProxy
@PropertySource("classpath:/framework.properties")
@EntityScan(basePackageClasses = SystemUser.class)
@ComponentScan(basePackageClasses = FrameWorkBooter.class)
public class FrameWrockAutoConfig {
}
