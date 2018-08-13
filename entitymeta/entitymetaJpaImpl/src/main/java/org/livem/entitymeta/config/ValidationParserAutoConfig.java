package org.livem.entitymeta.config;

import org.livem.entitymeta.compoent.SimpleValidationParser;
import org.livem.entitymeta.service.validation.ValidationParser;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConditionalOnMissingBean(ValidationParser.class)
public class ValidationParserAutoConfig {

    @Bean
    public ValidationParser validationParser() {
        return new SimpleValidationParser();
    }
}
