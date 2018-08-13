package com.livem.quickframework.config;

import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.condition.ConditionOutcome;
import org.springframework.boot.autoconfigure.condition.SpringBootCondition;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.type.AnnotatedTypeMetadata;

import com.livem.quickframework.auth.oauth2.OAuthService;
import com.livem.quickframework.auth.oauth2.impl.MemoryAuthServiceImpl;

@Configuration
@AutoConfigureBefore(value = ShiroAutoConfig.class)
public class OAuthServerAutoConfig {

	@Bean
	public OAuthService oauthService() {
		return new MemoryAuthServiceImpl();
	}

	static class OauthServiceNotExistCondition extends SpringBootCondition {
		@Override
		public ConditionOutcome getMatchOutcome(ConditionContext context,
				AnnotatedTypeMetadata metadata) {
			boolean notExist = context.getBeanFactory().getBean(
					OAuthService.class) == null;
			return new ConditionOutcome(notExist, "");
		}
	}
}
