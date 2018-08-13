package com.livem.quickframework.config;

import com.livem.quickframework.convert.custEditor.CustEditor;
import com.livem.quickframework.convert.entity.JavaValidationToJsConverter;
import com.livem.quickframework.convert.entity.JsonEntityConverter;
import com.livem.quickframework.convert.entity.impl.BaseJsonEntityConverterImpl;
import com.livem.quickframework.convert.entity.impl.ComposeValidationConverter;
import com.livem.quickframework.convert.entity.impl.J2eeValidationConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.Validator;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import java.beans.PropertyEditor;
import java.util.*;

@Configuration
public class ConverterAutoConfig {

	@Autowired(required = false)
	List<CustEditor> custEditors = Collections.EMPTY_LIST;

	 

	@Bean
	@ConditionalOnMissingBean(JavaValidationToJsConverter.class)
	public JavaValidationToJsConverter javaValidationConverter() {

		return new ComposeValidationConverter(new J2eeValidationConverter());
	}

	@Bean
	@ConditionalOnMissingBean(value = JsonEntityConverter.class)
	public JsonEntityConverter jsonEntityConverter(LocalValidatorFactoryBean validfac,ApplicationContext appcontent) {
		BaseJsonEntityConverterImpl converter = new BaseJsonEntityConverterImpl();
		Map<Class<?>, PropertyEditor> map = new HashMap<Class<?>, PropertyEditor>();
		for (CustEditor e : this.custEditors) {
			map.put(e.supportType(), e);
		}
		converter.setCustEditors(map);
		List<Validator> validators = new ArrayList<Validator>();
		validators.add(validfac);
		converter.setValidators(validators);
		converter.setAppcontent(appcontent);
		return converter;
	}

	

	
}
