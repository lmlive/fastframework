package org.livem.entitymeta.service;

import org.livem.entitymeta.annotation.EntityConfig;
import org.livem.entitymeta.annotation.Field;
import org.livem.entitymeta.service.validation.ValidationParser;
import org.livem.meta.*;
import org.springframework.context.MessageSource;
import org.springframework.util.ClassUtils;
import org.springframework.util.StringUtils;
import org.springframework.util.TypeUtils;

import javax.persistence.Column;
import javax.persistence.EntityManager;
import javax.persistence.Id;
import javax.persistence.Version;
import javax.persistence.metamodel.Attribute;
import javax.persistence.metamodel.EmbeddableType;
import javax.persistence.metamodel.SingularAttribute;
import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.util.*;

public class AttributeParser {

	private MessageSource messageSource;
	private Locale locale;
	List<ValidationParser> validationParser;
	private EntityManager entityManager;
	private Class<?> entityClass;

	public void setEntityManager(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	public void setValidationParser(List<ValidationParser> validationParser) {
		this.validationParser = validationParser;
	}

	public void setMessageSource(MessageSource messageSource) {
		this.messageSource = messageSource;

	}

	public void setLocale(Locale locale) {
		this.locale = locale;
	}

	public ColumnMeta getColumnMeta(Class<?> entityClass, Attribute<?, ?> attribute) {
		this.entityClass = entityClass;
		if (attribute == null)
			return null;
		ColumnMeta meta = new ColumnMeta();
		if (attribute.getPersistentAttributeType() == Attribute.PersistentAttributeType.EMBEDDED) {
			meta = new EmbeddedColumnMeta();
			((EmbeddedColumnMeta) meta).setSubColumns(new ArrayList<>());
			EmbeddableType<?> emtype = entityManager.getMetamodel().embeddable(attribute.getJavaType());
			Set<?> subatts = emtype.getAttributes();
			for (Object o : subatts) {
				Attribute<?, ?> subatt = (Attribute<?, ?>) o;
				((EmbeddedColumnMeta) meta).getSubColumns().add(getColumnMeta(emtype.getJavaType(), subatt));
			}

		}

		meta.setTitle(attribute.getName());
		meta.setDataKey(attribute.getName());
		meta.setType(attribute.getJavaType());
		meta.setKey(parseKey(attribute));
		Field an = Util.getAttrAnnotation(attribute, Field.class);
		if (an != null) {
			meta.setTitle(an.title());
		}
		if (StringUtils.isEmpty(meta.getTitle()) && messageSource != null) {
			String key = entityClass.getSimpleName() + "." + attribute.getName();
			String disName = messageSource.getMessage(key, new Object[] { attribute.getName() }, attribute.getName(),
					locale);
			meta.setTitle(disName);
		}

		meta.setEntityClass(entityClass);

		BaseUiMeta uimeta = parserUiMeta(attribute);
		meta.setUiMeta(uimeta);

		parseValidation(attribute, meta);

		parseJpaAnonotation(attribute, uimeta);
		return meta;

	}

	private void parseValidation(Attribute<?, ?> attribute, ColumnMeta meta) {
		if (validationParser != null && !validationParser.isEmpty()) {
			Set<Validation> sets = new HashSet<>();
			for (ValidationParser parser : validationParser) {
				Set<Validation> set = parser.parserPerpertyValidation(attribute);
				sets.addAll(set);
			}
			meta.getUiMeta().setValidMeta(sets);
		}
	}

	boolean parseKey(Attribute attr) {
		if (Util.getAttrAnnotation(attr, Id.class) != null) {
			return true;
		}
		// Column c = getAttrAnnotation(attr, Column.class);
		// if (c != null && c.unique()) return true;
		return false;
	}

	void parserColumAnnotation(BaseUiMeta meta, Attribute attribute) {
		javax.persistence.Column ano = Util.getAttrAnnotation(attribute, Column.class);
		if (ano != null) {
			meta.setUpdateAble(ano.updatable());
			meta.setInsertAble(ano.insertable());
			if (!ano.nullable()) {
				meta.getValidMeta().add(new Validation("require", "^\\S+$", "不能为空"));
			}

		}
	}

	BaseUiMeta parserFeldAnnotation(Attribute attribute) {
		Field uitype = Util.getAttrAnnotation(attribute, Field.class);
		BaseUiMeta uimeta = new BaseUiMeta();
		if (uitype != null) {
			UIType uitype2 = uitype.uitype();
			switch (uitype2) {
			case Dictionary:
				uimeta = new DictUiMeta();
				((DictUiMeta) uimeta).setDictGroup(uitype.dictGroup());
				((DictUiMeta) uimeta).setDictKey(uitype.dictKey());
				break;
				case Enum:
					uimeta=new EnumMeta();
					((EnumMeta) uimeta).setEnumSource(uitype.enumValues());
					break;
			case Password:
				uimeta.setUiType(UIType.Password);
				uitype2 = UIType.Password;
				break;
			case File:
				// 是否多文件
				uimeta = new FileUiMeta();
				if (Collection.class.isAssignableFrom(attribute.getJavaType())) {
					((FileUiMeta) uimeta).setMulti(true);
				} else
					((FileUiMeta) uimeta).setMulti(false);
				break;
			case Img:
				// 上传一组图片按文件处理
				if (Collection.class.isAssignableFrom(attribute.getJavaType())) {
					uimeta = new FileUiMeta();
					((FileUiMeta) uimeta).setMulti(true);
					uitype2 = UIType.File;
				}
				break;
			case List:
				// list
				if (Collection.class.isAssignableFrom(attribute.getJavaType())) {
					uitype2 = UIType.List;
				}
				break;
			default:
				break;
			}

			uimeta.setUiType(uitype2);
			uimeta.setInsertAble(!uitype.readOnly());
			uimeta.setUpdateAble(!uitype.readOnly());
			uimeta.setVisable(!uitype.hidden());

		}

		if (uitype == null || uitype.uitype() == UIType.Auto) {
			// auto parse ui meta
			Class<?> type = ClassUtils.resolvePrimitiveIfNecessary((Class<?>) attribute.getJavaType());
			if (Number.class.isAssignableFrom(type)) {
				uimeta.setUiType(UIType.Number);
			} else if (Date.class.isAssignableFrom(type)) {
				uimeta.setUiType(UIType.Date);
			} else if (Boolean.class.isAssignableFrom(type)) {
				uimeta.setUiType(UIType.Boolean);
			} else if (Map.class.isAssignableFrom(type)) {
				uimeta.setUiType(UIType.Map);
			} else if (type.isArray()) {
				byte[] bt = new byte[0];
				if (TypeUtils.isAssignable(bt.getClass(), type)) {
					uimeta.setUiType(UIType.File);
				} else
					uimeta.setUiType(UIType.Text);
			} else if (Collection.class.isAssignableFrom(type)) {
				uimeta.setUiType(UIType.List);
			} else
				uimeta.setUiType(UIType.Text);
		}

		return uimeta;
	}

	void parseJpaAnonotation(Attribute attribute, BaseUiMeta uimeta) {
		// parse @Id @column
		parseIdAnnotation(attribute, uimeta);
		// @column
		parserColumAnnotation(uimeta, attribute);
		Version version = Util.getAttrAnnotation(attribute, Version.class);
		if (version != null) {
			uimeta.setInsertAble(false);
			uimeta.setUpdateAble(true);
			uimeta.setVisable(false);

		}
	}

	private void parseIdAnnotation(Attribute attribute, BaseUiMeta uimeta) {
		Annotation idan = Util.getAttrAnnotation(attribute, Id.class);
		if (idan != null) {
			uimeta.setInsertAble(false);
			uimeta.setUpdateAble(false);
			uimeta.setDisAsReadOnly(true);
		}
	}

	BaseUiMeta parserUiMeta(Attribute attribute) {

		BaseUiMeta meta = null;
		switch (attribute.getPersistentAttributeType()) {
		case BASIC:
			meta = parserFeldAnnotation(attribute);
			break;
		case EMBEDDED:
			meta = new BaseUiMeta();
			break;
		case ELEMENT_COLLECTION:
			meta = parserFeldAnnotation(attribute);
			break;
		case MANY_TO_MANY:
			meta = createPickMeta(attribute, true);
			break;
		case MANY_TO_ONE:
			meta = createPickMeta(attribute, false);
			break;
		case ONE_TO_MANY:
			meta = createPickMeta(attribute, true);
			break;
		case ONE_TO_ONE:
			meta = createPickMeta(attribute, false);
			break;
		}

		parserColumAnnotation(meta, attribute);
		if (attribute instanceof SingularAttribute && ((SingularAttribute) attribute).isVersion()) {
			meta.setInsertAble(false);
			meta.setUpdateAble(false);
			meta.setVisable(false);
			meta.setUiType(UIType.Number);
			meta.setDisAsReadOnly(false);
		}
		return meta;
	}

	private BaseUiMeta createPickMeta(Attribute attribute, boolean multipick) {
		PickUiMeta pickMeta = new PickUiMeta();
		pickMeta.setUiType(UIType.Pick);
		Class<?> pickEntityClass = attribute.getJavaType();
		if (attribute.isCollection()) {
			if (attribute.getJavaMember() instanceof Method) {
				pickEntityClass = (Class<?>) ((ParameterizedType) ((Method) attribute.getJavaMember())
						.getGenericReturnType()).getActualTypeArguments()[0];
			} else {
				pickEntityClass = (Class<?>) ((ParameterizedType) ((java.lang.reflect.Field) attribute.getJavaMember())
						.getGenericType()).getActualTypeArguments()[0];
			}
		}
		pickMeta.setPickEntityShortName(pickEntityClass.getSimpleName());
		pickMeta.setPickEntityType(pickEntityClass);
		pickMeta.setMultiPick(multipick);

		EntityConfig entityconfig = pickEntityClass.getAnnotation(EntityConfig.class);
		if (entityconfig != null)
			pickMeta.setPickColumns(Arrays.asList(entityconfig.pickColumns()));

		return pickMeta;
	}

}
