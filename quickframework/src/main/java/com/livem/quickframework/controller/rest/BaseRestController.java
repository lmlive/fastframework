package com.livem.quickframework.controller.rest;

import com.livem.quickframework.controller.BaseController;
import com.livem.quickframework.entity.BaseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Validator;
import org.springframework.web.bind.support.WebRequestDataBinder;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

public abstract class BaseRestController extends BaseController {


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

        return webDataBinder.getBindingResult();
    }


}
