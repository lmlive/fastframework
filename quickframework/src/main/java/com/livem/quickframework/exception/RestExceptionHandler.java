package com.livem.quickframework.exception;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.ObjectSerializer;
import com.livem.quickframework.model.BaseStaus;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.ws.Response;
import java.io.IOException;
import java.lang.annotation.Annotation;

public class RestExceptionHandler implements HandlerExceptionResolver {

    @Override
    public ModelAndView resolveException(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) {
        BaseStaus staus=new BaseStaus(BaseStaus.CODE_ERROR,e.getMessage());
        httpServletResponse.setContentType("application/json");
        try {
            httpServletResponse.getOutputStream().write(JSON.toJSONString(staus).getBytes());
            httpServletResponse.getOutputStream().close();
            return null;
        } catch (IOException e1) {

            return null;
        }
    }
}
