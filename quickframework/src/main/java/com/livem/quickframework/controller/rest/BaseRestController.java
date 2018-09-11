package com.livem.quickframework.controller.rest;

import com.livem.quickframework.controller.BaseController;
import com.livem.quickframework.entity.BaseEntity;
import com.livem.quickframework.entity.SystemUser;
import com.livem.quickframework.exception.RestException;
import org.apache.commons.beanutils.ConstructorUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.ReflectUtils;
import org.springframework.core.convert.support.GenericConversionService;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.util.ClassUtils;
import org.springframework.util.ReflectionUtils;
import org.springframework.validation.*;
import org.springframework.web.bind.support.WebRequestDataBinder;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

public abstract class BaseRestController extends BaseController {
    final Logger logger = LoggerFactory.getLogger(getClass());


    @Autowired
    private RequestMappingHandlerAdapter requestMappingHandlerAdapter;


    @Autowired
    protected List<Validator> validators;

    public BindingResult convertRequestToEntity(Class entityClass, HttpServletRequest request) {
        BaseEntity obj = null;
        HttpInputMessage msg = new ServletServerHttpRequest(request);
        List<HttpMessageConverter<?>> msgconverter = requestMappingHandlerAdapter.getMessageConverters();
        for (HttpMessageConverter<?> converter : msgconverter) {
            if (converter.canRead(entityClass, MediaType.APPLICATION_JSON_UTF8)) {
                try {
                    obj = (BaseEntity) converter.read(entityClass, msg);
                    break;
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        WebRequestDataBinder webDataBinder = new WebRequestDataBinder(obj);
        requestMappingHandlerAdapter.getWebBindingInitializer().initBinder(webDataBinder);
        webDataBinder.validate();

//        for (HttpMessageConverter converter : requestMappingHandlerAdapter.getMessageConverters()) {
//            if (converter.canRead(entityClass, MediaType.ALL)) {
//                try {
//                    return (T) converter.read(entityClass, new ServletServerHttpRequest(request));
//                } catch (IOException e) {
//                    logger.error("--{0}---read entity error {1}", converter.getClass().getName(), e.getMessage());
//                    continue;
//                }
//            }
//        }
        return webDataBinder.getBindingResult();
    }

    public Errors valid(Object entity) {
        BindException errors = new BindException(entity, entity.getClass().getName());
        for (Validator validator : validators) {
            ValidationUtils.invokeValidator(validator, entity, errors);
        }
        return errors;
    }


    public static void main(String[] args) {
        Constructor<SystemUser> c = ClassUtils.getConstructorIfAvailable(SystemUser.class);
        SystemUser obj = null;
        try {
            obj = c.newInstance();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
        System.out.println(obj == null);
    }

}
