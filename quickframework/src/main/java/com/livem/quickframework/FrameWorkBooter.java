package com.livem.quickframework;

import com.livem.quickframework.entity.SystemUser;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@EnableAspectJAutoProxy
@PropertySource("classpath:/framework.properties")
@EntityScan(basePackageClasses = SystemUser.class)
public class FrameWorkBooter {
    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(FrameWorkBooter.class, args);

   }

}
