package org.livem.entitymeta.config;

import org.livem.dao.GeneriEntityService;
import org.livem.entitymeta.service.Impl.GenericalRepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.SearchStrategy;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

@Configuration
@AutoConfigureAfter(HibernateJpaAutoConfiguration.class)
@ConditionalOnBean(value = EntityManagerFactory.class)
@ConditionalOnMissingBean(GeneriEntityService.class)
public class GenericalRepositoryAutoConfig {

    @Autowired
    private EntityManager em;

    @Bean
    public GeneriEntityService generiEntityService() {
        return new GenericalRepositoryService(em);
    }

}
