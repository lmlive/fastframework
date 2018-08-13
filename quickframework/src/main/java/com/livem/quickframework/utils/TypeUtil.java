package com.livem.quickframework.utils;

import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.internal.util.ReflectHelper;
import org.springframework.util.ReflectionUtils;

public abstract class TypeUtil {

	public static Field findFieldByType(Class<?> objClass, Class<?> t) {
		for (Field f : objClass.getDeclaredFields()) {
			if (f.getGenericType() == t) {
				return f;
			}
			if (f.getGenericType() instanceof ParameterizedType) {
				if (((ParameterizedType) f.getGenericType())
						.getActualTypeArguments()[0] == t)
					return f;
			}
		}
		return null;

	}

	/**
	 * 获取field 支持 多级路径如：systemUser.recordInfo.regDate
	 * 
	 * @param type
	 * @param fieldName
	 * @return
	 */
	public static Field getFieldByName(Class<?> type, String fieldName) {

		if (fieldName.contains(".")) {
			Field f = null;

			for (String name : fieldName.split("[.]")) {
				f = getDirectFieldByName(type, name);
				if (f != null)
					type = f.getType();
			}
			return f;
		}
		return getDirectFieldByName(type, fieldName);
	}

	/**
	 * 获取field type 不支持多级路径
	 * 
	 * @param type
	 * @param fieldName
	 * @return
	 */
	public static Field getDirectFieldByName(Class<?> type, String fieldName) {

		if (type == null)
			return null;
		try {
			Field f = type.getDeclaredField(fieldName);
			return f;
		} catch (NoSuchFieldException e) {
			return getFieldByName(type.getSuperclass(), fieldName);
		} catch (SecurityException e) {
			return null;
		}
	}

	/**
	 * 获取field value
	 * 
	 * @param fieldName
	 * @param obj
	 * @return
	 */
	public static Object getFieldValue(String fieldName, Object obj) {
		if (obj == null)
			return null;
		if (fieldName.contains(".")) {
			Object p = obj;
			for (String n : fieldName.split("[.]")) {
				if (p == null)
					return null;
				Field f = getFieldByName(p.getClass(), n);
				try {
					if (f == null)
						return null;
					f.setAccessible(true);
					p = f.get(p);
				} catch (IllegalArgumentException e) {
					e.printStackTrace();
					return null;
				} catch (IllegalAccessException e) {
					e.printStackTrace();
					return null;
				}
			}
			return p;
		} else {
			try {
				Field f = getFieldByName(obj.getClass(), fieldName);
				if (f != null) {
					f.setAccessible(true);
					return f.get(obj);
				}
				return null;
			} catch (IllegalArgumentException e) {
				e.printStackTrace();
				return null;
			} catch (IllegalAccessException e) {
				e.printStackTrace();
				return null;
			}
		}
	}
}
