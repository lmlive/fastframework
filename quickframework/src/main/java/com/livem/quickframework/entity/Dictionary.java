package com.livem.quickframework.entity;

import com.livem.quickframework.convert.attr.EntityMapPropertyConvert;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.NotBlank;
import org.livem.entitymeta.annotation.EntityConfig;
import org.livem.entitymeta.annotation.Field;
import org.livem.meta.UIType;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;
import java.util.Map;

@Entity
@EntityConfig("字典")
public class Dictionary extends BaseEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4027564149999556622L;
	@Column(name = "dkey")
	@NotBlank(message = "不能为空")
	@NaturalId
	@Field(title = "KEY")
	private String key;
	@NaturalId
	@NotBlank(message = "不能为空")
	@Column(name="dgroup")
	@Field("分组")
	private String group;

	@Convert(converter = EntityMapPropertyConvert.class)
	@Column(name = "dvalue")
	@NotNull(message = "不能为空")
	@Field(uitype = UIType.TextArea)
	private Map<String, Object> value;

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getGroup() {
		return group;
	}

	public void setGroup(String group) {
		this.group = group;
	}

	public Map<String, Object> getValue() {
		return value;
	}

	public void setValue(Map<String, Object> value) {
		this.value = value;
	}

}
