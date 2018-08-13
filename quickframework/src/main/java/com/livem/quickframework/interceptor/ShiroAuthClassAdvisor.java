package com.livem.quickframework.interceptor;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;

import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.apache.shiro.authz.annotation.RequiresGuest;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.apache.shiro.authz.annotation.RequiresUser;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.springframework.core.annotation.AnnotationUtils;

public class ShiroAuthClassAdvisor extends AuthorizationAttributeSourceAdvisor {
	private static final Class<? extends Annotation>[] AUTHZ_ANNOTATION_CLASSES = new Class[] {
			RequiresPermissions.class, RequiresRoles.class, RequiresUser.class,
			RequiresGuest.class, RequiresAuthentication.class };

	@Override
	public boolean matches(Method method, Class targetClass) {

		boolean match = super.matches(method, targetClass);
		if (match)
			return match;
		// check class
		if (targetClass != null) {
			return isAuthzAnnotationPresent(targetClass);
		}
		return false;
	}

	private boolean isAuthzAnnotationPresent(Class<?> c) {
		for (Class<? extends Annotation> annClass : AUTHZ_ANNOTATION_CLASSES) {
			Annotation a = AnnotationUtils.findAnnotation(c, annClass);
			if (a != null) {
				return true;
			}
		}
		return false;
	}
}
