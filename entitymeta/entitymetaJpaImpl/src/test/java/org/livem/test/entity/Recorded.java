package org.livem.test.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.util.Date;

@Embeddable
public class Recorded {
	@Column(updatable = false)
	private Date createDate=new Date();
	
	@Column(insertable = false)
	private Date updateDate=new Date();
 
	
	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
 public Date getUpdateDate() {
	return updateDate;
}
 public void setUpdateDate(Date updateDate) {
	this.updateDate = updateDate;
}

}
