package com.livem.quickframework.entity;

import org.livem.entitymeta.annotation.Field;

import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class RecordEntity extends BaseEntity {
	@Field(title = "记录")
	private Recorded recordInfo=new Recorded();

	public Recorded getRecordInfo() {
		return recordInfo;
	}

	public void setRecordInfo(Recorded recordInfo) {
		this.recordInfo = recordInfo;
	}

}
