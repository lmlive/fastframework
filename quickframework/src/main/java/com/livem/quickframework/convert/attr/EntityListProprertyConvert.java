package com.livem.quickframework.convert.attr;

import java.util.List;

import javax.persistence.AttributeConverter;

import org.springframework.util.StringUtils;

import com.alibaba.fastjson.JSON;

public class EntityListProprertyConvert implements AttributeConverter<List<?>, String> {

	@Override
	public String convertToDatabaseColumn(List<?> attribute) {
		if (attribute == null || attribute.isEmpty())
			return null;
		String data = JSON.toJSONString(attribute);
		return data;
	}

	@Override
	public List<?> convertToEntityAttribute(String dbData) {
		if(!StringUtils.hasLength(dbData))return null;
		return JSON.parseObject(dbData, List.class);
		 
	}

	
	public static void main(String[] args) {
	String data="";
	List  lst = new EntityListProprertyConvert().convertToEntityAttribute(data);
	System.out.println(lst);
	}
	
}
