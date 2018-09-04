package org.livem.entitymeta.config;

import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.BootstrapServiceRegistryBuilder;
import org.livem.dao.GeneriEntityService;
import org.livem.entitymeta.service.Impl.GenericalRepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.SearchStrategy;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceContext;

@Configuration
@ConditionalOnBean(value = EntityManagerFactory.class)
@ConditionalOnMissingBean(GeneriEntityService.class)
public class GenericalRepositoryAutoConfig {

    @PersistenceContext
    private EntityManager em;

    @Bean
    @Primary
    public PlatformTransactionManager platformTransactionManager() {
        return new JpaTransactionManager();
    }

    @Bean
    public GeneriEntityService generiEntityService() {

        return new GenericalRepositoryService(em);
    }

}
