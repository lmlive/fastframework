package com.livem.quickframework.entity;

import org.livem.entitymeta.annotation.Field;
import org.livem.meta.UIType;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Version;
import java.util.Date;

@Embeddable
public class Recorded {
    @Column(updatable = false)
    @Field(title = "创建日期", readOnly = true, uitype = UIType.DateTime)
    private Date createDate = new Date();

    @Column(insertable = false)
    @Field(title = "修改日期", readOnly = true, uitype = UIType.DateTime)
    private Date updateDate = new Date();



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
