package com.livem.quickframework.interceptor;

import java.lang.reflect.Method;
import java.lang.reflect.Type;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.springframework.aop.support.AopUtils;

import com.livem.quickframework.entity.BaseEntity;
import org.springframework.aop.support.StaticMethodMatcherPointcutAdvisor;
import org.springframework.core.ResolvableType;

public abstract class BaseDaoExecuteInterceptor<T extends BaseEntity> extends StaticMethodMatcherPointcutAdvisor implements MethodInterceptor {


    protected abstract void before(Object... params) throws Exception;

    protected abstract void after(Object returnValue, Object... params) throws Exception;

    private Class<T> entityClass = null;

    public Class<T> getEntityClass() {
        return entityClass;
    }

    public BaseDaoExecuteInterceptor() {
        Type gtype = getClass().getGenericSuperclass();
        if (gtype != null) {
            if (gtype instanceof java.lang.reflect.ParameterizedType) {
                entityClass = (Class<T>) ((java.lang.reflect.ParameterizedType) gtype).getActualTypeArguments()[0];
            }
        }
    }


    @Override
    public final boolean matches(Method paramMethod, Class<?> paramClass) {
        ResolvableType[] generics = ResolvableType.forClass(paramMethod.getDeclaringClass()).getGenerics();
        return (generics.length == 2);
    }

    @Override
    public final Object invoke(MethodInvocation paramMethodInvocation) throws Throwable {
        before(paramMethodInvocation.getArguments());
        Object obj = paramMethodInvocation.proceed();
        after(obj, paramMethodInvocation.getArguments());
        return obj;
    }

}
