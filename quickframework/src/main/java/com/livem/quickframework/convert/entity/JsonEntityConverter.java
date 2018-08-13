package com.livem.quickframework.convert.entity;

import javax.xml.bind.ValidationException;

import com.alibaba.fastjson.JSONObject;
import com.livem.quickframework.entity.BaseEntity;

public interface JsonEntityConverter  {
	BaseEntity fromJsonToEntity(final JSONObject json,Class<? extends BaseEntity> entityClass) throws ValidationException;
	
	JSONObject fromEntityToJson(final Object entity,Class<? extends BaseEntity> entityClass);
}
