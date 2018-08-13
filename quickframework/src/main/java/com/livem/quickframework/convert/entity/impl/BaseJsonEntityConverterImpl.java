package com.livem.quickframework.convert.entity.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.livem.quickframework.convert.entity.JsonEntityConverter;
import com.livem.quickframework.entity.BaseEntity;
import com.livem.quickframework.entity.SystemUser;
import org.apache.shiro.util.ClassUtils;
import org.hibernate.SessionFactory;
import org.livem.dao.GeneriEntityService;
import org.livem.meta.ColumnMeta;
import org.livem.meta.PickUiMeta;
import org.livem.metaservice.EntityMetaService;
import org.livem.metaservice.PropertyMetaService;
import org.springframework.beans.MutablePropertyValues;
import org.springframework.context.ApplicationContext;
import org.springframework.context.MessageSource;
import org.springframework.format.datetime.DateFormatter;
import org.springframework.validation.FieldError;
import org.springframework.validation.Validator;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.support.WebRequestDataBinder;

import javax.xml.bind.ValidationException;
import java.beans.PropertyEditor;
import java.util.*;
import java.util.Map.Entry;

/**
 * @author liming post 过来的json
 *         不是标准的json；因为组合字段处理过（systemUser={recordinfo.regDate
 *         :'',recordInfo.updateTime:'',sex:1,name:'test'}） 所有需要转换下
 *
 */
public class BaseJsonEntityConverterImpl implements JsonEntityConverter {

	Map<Class<?>, PropertyEditor> custEditors;

	ApplicationContext appcontent;

	public ApplicationContext getAppcontent() {
		return appcontent;
	}

	public void setAppcontent(ApplicationContext appcontent) {
		this.appcontent = appcontent;
	}

	public void setCustEditors(Map<Class<?>, PropertyEditor> custEditors) {
		this.custEditors = custEditors;
	}

	public Map<Class<?>, PropertyEditor> getCustEditors() {
		return custEditors;
	}

	private MessageSource messageSource;

	public MessageSource getMessageSource() {
		return messageSource;
	}

	public void setMessageSource(MessageSource messageSource) {
		this.messageSource = messageSource;
	}

	private List<Validator> validators;

	public List<Validator> getValidators() {
		return validators;
	}

	public void setValidators(List<Validator> validators) {
		this.validators = validators;
	}

	
	EntityMetaService getEntityMetaService() {
		return getAppcontent().getBean(EntityMetaService.class);
	}
	PropertyMetaService getPropertyMetaService() {
		return getAppcontent().getBean(PropertyMetaService.class);
	}
	/*
	 * 对应复合字段meta描述采用了分级属性如recordInfo.createDate，便于字段描述定义
	 * webdatabinder能够很好的解决这个问题；而json做不到，所以用了webdatabinder转换entity
	 * 
	 * @see
	 * org.lm.quickframework.convert.entity.JsonEntityConverter#fromJsonToEntity(com
	 * .alibaba .fastjson.JSONObject, java.lang.Class)
	 */
	@Override
	public BaseEntity fromJsonToEntity(final JSONObject json, Class<? extends BaseEntity> entityClass)
			throws ValidationException {

		 
		List<ColumnMeta> columnMetas = getPropertyMetaService().getColumnMetasByEntityClass(entityClass);
		Set<String> columnDataKeys = new HashSet<String>();
		for (ColumnMeta c : columnMetas) {
			columnDataKeys.add(c.getDataKey());
		}

		// 删除多余的属性，免得干扰数据转换的绑定
		// 上传数据采用form提交的格式方便数据绑定验证，复合对象原始json格式数据去掉
		List<String> keys = new ArrayList<String>();
		for (Entry<String, Object> en : json.entrySet()) {
			if (!columnDataKeys.contains(en.getKey())) {
				keys.add(en.getKey());
			}
		}
		for (String k : keys) {
			json.remove(k);
		}
		// 关联对象转为entity ，oneToOne ,oneToMany,ManyToOne,ManyToMany
		for (ColumnMeta cm : columnMetas) {
			if (cm.getUiMeta() instanceof PickUiMeta) {
				PickUiMeta uimeta = (PickUiMeta) cm.getUiMeta();
				SessionFactory sf = appcontent.getBean(SessionFactory.class);
				if (uimeta.isMultiPick()) {
					JSONArray ids = json.getJSONArray(cm.getDataKey());
					if (ids != null && !ids.isEmpty()) {
						List<BaseEntity> entitys = new ArrayList<BaseEntity>();
						Iterator<Object> iters = ids.iterator();
						while (iters.hasNext()) {
							Class c = uimeta.getPickEntityType();
							Object entity = getGeneriEntityService().findOne(c,
									Long.parseLong(iters.next().toString()));
							entitys.add((BaseEntity) entity);
						}
						json.put(cm.getDataKey(), entitys);

					}
				} else {
					Long id = json.getLong(cm.getDataKey());
					if (id != null) {
						Class c = uimeta.getPickEntityType();
						Object entity = this.appcontent.getBean(GeneriEntityService.class).findOne(c, id);
						json.put(cm.getDataKey(), entity);
					} else
						json.put(cm.getDataKey(), null);
				}
			}
		}

		MutablePropertyValues mp = new MutablePropertyValues(json);
		Object obj = ClassUtils.newInstance(entityClass);
		WebRequestDataBinder binder = new WebRequestDataBinder(obj);
		binder.setAutoGrowNestedPaths(true);
		for (Entry<Class<?>, PropertyEditor> en : this.custEditors.entrySet()) {
			binder.registerCustomEditor(en.getKey(), en.getValue());
		}

		Validator[] vs = getValidators().toArray(new Validator[0]);
		binder.addValidators(vs);
		binder.bind(mp);
		binder.validate();

		if (binder.getBindingResult().hasErrors()) {
			StringBuilder sb = new StringBuilder();
			for (FieldError fe : binder.getBindingResult().getFieldErrors()) {
				String fieldName = fe.getField();
				if (getMessageSource() != null) {
					fieldName = getMessageSource().getMessage(fieldName, null, Locale.getDefault());
				}
				sb.append(fieldName + ":" + fe.getDefaultMessage() + "\r\n");
			}
			throw new ValidationException(sb.toString());
		}
		return (BaseEntity) obj;

	}

	private GeneriEntityService getGeneriEntityService() {
		return this.appcontent.getBean(GeneriEntityService.class);
	}

	@Override
	public JSONObject fromEntityToJson(final Object entity, Class<? extends BaseEntity> entityClass) {
		// JSONObject.toJSON(entity);
		String str = JSON.toJSONString(entity);
		return JSONObject.parseObject(str);
	}

	public static void main(String[] args) {
		SystemUser obj = new SystemUser();
		MutablePropertyValues mp = new MutablePropertyValues();
		Map<String, Object> pv = new HashMap<String, Object>();
		pv.put("createDate", "2017-09-09");
		pv.put("updateDate", "2017-01-01");

		mp.add("recordInfo.createDate", "2011-01-01");
		mp.add("recordInfo", pv);
		WebDataBinder binder = new WebDataBinder(obj);
		binder.setAutoGrowNestedPaths(true);
		binder.addCustomFormatter(new DateFormatter("yyyy-MM-dd"));
		binder.bind(mp);
		System.out.println(JSON.toJSONString(obj));
		System.out.println(obj.getRecordInfo().getCreateDate());
		if (binder.getBindingResult().hasErrors()) {
			for (FieldError er : binder.getBindingResult().getFieldErrors()) {

				System.out.println(er.getField() + ":" + er.getObjectName() + ":" + er.getDefaultMessage());
			}
		}

	}

}
