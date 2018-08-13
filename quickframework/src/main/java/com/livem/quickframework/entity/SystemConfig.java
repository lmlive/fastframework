package com.livem.quickframework.entity;

import org.hibernate.annotations.NaturalId;
import org.livem.entitymeta.annotation.EntityConfig;
import org.livem.entitymeta.annotation.Field;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.util.Date;

@Entity
@EntityConfig(title = "系统配置")
public class SystemConfig extends BaseEntity {
	@NaturalId
	@Field(title = "属性名称")
	private String propertyName;
	@Field(title = "属性值")
	private String dataValue;

	@Column(updatable = false)
	private Date createDt = new Date();

	@Column(insertable = false)
	private Date updateDt = new Date();

	public String getPropertyName() {
		return propertyName;
	}

	public void setPropertyName(String propertyName) {
		this.propertyName = propertyName;
	}

	public String getDataValue() {
		return dataValue;
	}

	public void setDataValue(String dataValue) {
		this.dataValue = dataValue;
	}

	public Date getCreateDt() {
		return createDt;
	}

	public void setCreateDt(Date createDt) {
		this.createDt = createDt;
	}

	public Date getUpdateDt() {
		return updateDt;
	}

	public void setUpdateDt(Date updateDt) {
		this.updateDt = updateDt;
	}

	@Override
	public String toString() {
		return getPropertyName()+":"+getDataValue();
	}
	
}
