package com.livem.quickframework.entity;

import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class RecordEntity extends BaseEntity {
	private Recorded recordInfo=new Recorded();

	public Recorded getRecordInfo() {
		return recordInfo;
	}

	public void setRecordInfo(Recorded recordInfo) {
		this.recordInfo = recordInfo;
	}

}
