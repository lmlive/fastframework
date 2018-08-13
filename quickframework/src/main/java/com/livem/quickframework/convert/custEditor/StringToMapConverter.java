package com.livem.quickframework.convert.custEditor;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.convert.TypeDescriptor;
import org.springframework.core.convert.converter.ConditionalGenericConverter;
import org.springframework.core.convert.converter.GenericConverter;
import org.springframework.util.Assert;

import java.lang.reflect.Type;
import java.util.*;

public class StringToMapConverter implements ConditionalGenericConverter {
    @Override
    public boolean matches(TypeDescriptor source, TypeDescriptor to) {
      return  String.class.isAssignableFrom(source.getType()) && Map.class.isAssignableFrom(to.getType());
    }

    @Override
    public Set<ConvertiblePair> getConvertibleTypes() {
        HashSet<ConvertiblePair> set = new HashSet<ConvertiblePair>();
        set.add(new ConvertiblePair(String.class,Map.class));
        return set;
    }

    @Override
    public Object convert(Object o, TypeDescriptor typeDescriptor, TypeDescriptor dest) {
       if(o==null)return null;
       String s=String.valueOf(o);
//        ObjectMapper mapper=new ObjectMapper();
//      return   mapper.convertValue(o,dest.getType());
        JSONObject jsonobj = JSONObject.parseObject(s);

        return jsonobj;


    }


    public static void main(String[] args) {
        StringToMapConverter cv = new StringToMapConverter();
        boolean matches = cv.matches(TypeDescriptor.valueOf(String.class), TypeDescriptor.valueOf(HashMap.class));
        Assert.isTrue(matches);
          matches = cv.matches(TypeDescriptor.valueOf(String.class), TypeDescriptor.valueOf(JSONObject.class));
        Assert.isTrue(matches);
String str="{\"name\":\"test name\",\"age\":\"123\"}";
        Object data = cv.convert(str, TypeDescriptor.valueOf(String.class), TypeDescriptor.valueOf(LinkedHashMap.class));
        Assert.notNull(data);
        System.out.println(data);
        Map map = (Map) JSONObject.parseObject(str);
        Assert.notNull(map);
        System.out.println(map);
      map=   JSONObject.parseObject(str).toJavaObject(Map.class);

        System.out.println(map);

    }
}
