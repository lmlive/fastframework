package com.livem.quickframework.convert.entity.impl;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.livem.quickframework.convert.entity.JavaValidationToJsConverter;
import com.livem.quickframework.convert.entity.ValidInfo;

public class ComposeValidationConverter implements JavaValidationToJsConverter
{
    private  JavaValidationToJsConverter[] validtors;
    public  ComposeValidationConverter(JavaValidationToJsConverter ...validConverter){
        this.validtors=validConverter;
    }

    @Override
    public List<ValidInfo> convert(Field f) {
       if(validtors==null)return  Collections.emptyList();
        ArrayList<ValidInfo> res = new ArrayList<ValidInfo>();
       for(JavaValidationToJsConverter v:validtors){
           res.addAll( v.convert(f));
       }
       return res;

    }

    @Override
    public List<ValidInfo> convert(Class<?> cs) {
        return null;
    }
}
