package com.livem.quickframework.controller.rest;

import com.livem.quickframework.controller.BaseController;
import com.livem.quickframework.entity.BaseEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.validation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

public abstract class BaseRestController extends BaseController {
    final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    protected List<HttpMessageConverter> converters;
    @Autowired
    protected List<Validator> validators;

    public <T extends BaseEntity> T convertRequestToEntity(Class<T> entityClass, HttpServletRequest request) {
        for (HttpMessageConverter converter : converters) {
            if (converter.canRead(entityClass, MediaType.ALL)) {
                try {
                    return (T) converter.read(entityClass, new ServletServerHttpRequest(request));
                } catch (IOException e) {
                    logger.error("--{0}---read entity error {1}", converter.getClass().getName(), e.getMessage());
                    continue;
                }
            }
        }
        return null;
    }

    public Errors valid(Object entity) {
        BindException errors = new BindException(entity, entity.getClass().getName());
        for (Validator validator : validators) {
            ValidationUtils.invokeValidator(validator, entity, errors);
        }
        return errors;
    }


}
