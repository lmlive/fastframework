package org.livem.entitymeta;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@Configuration
public class JpaEntityMetaBooter {

    public static void main(String[] args) {
        ConfigurableApplicationContext app = SpringApplication.run(JpaEntityMetaBooter.class, args);
        String[] names = app.getBeanDefinitionNames();
        for (String name : names) {
            System.out.println(name);
        }
    //    EntityMetaService   service = app.getBean(EntityMetaService.class);
//        System.out.println(service);
    }
}
