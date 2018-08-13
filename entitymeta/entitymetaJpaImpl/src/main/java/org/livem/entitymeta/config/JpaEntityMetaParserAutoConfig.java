package org.livem.entitymeta.config;

import java.util.List;

import javax.persistence.EntityManagerFactory;

import org.livem.entitymeta.service.AttributeParser;
import org.livem.entitymeta.service.Impl.JpaMetaService;
import org.livem.entitymeta.service.validation.ValidationParser;
import org.livem.metaservice.EntityMetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConditionalOnMissingBean(EntityMetaService.class)
@ConditionalOnBean(value = EntityManagerFactory.class)
@AutoConfigureAfter({HibernateJpaAutoConfiguration.class,ValidationParserAutoConfig.class})
public class JpaEntityMetaParserAutoConfig {

	@Autowired(required = false)
	CacheManager cacheManager;

	@Autowired
	MessageSource messageSource;

	@Autowired
	List<ValidationParser> validationParsers;

	@Bean
	public EntityMetaService entityMetaService(EntityManagerFactory ef) {
		JpaMetaService jpaMetaService = new JpaMetaService(ef.createEntityManager());
		if (cacheManager != null) {
			Cache cache = cacheManager.getCache("");
			if (cache != null)
				jpaMetaService.setCache(cache);
		}
		AttributeParser attributeParser = new AttributeParser();
		attributeParser.setValidationParser(validationParsers);
		attributeParser.setMessageSource(messageSource);
		// attributeParser.setLocale();
		jpaMetaService.setAttributeParser(attributeParser);
		return jpaMetaService;
	}

}
