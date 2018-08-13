package org.lm.testapp.entity;

import com.livem.quickframework.entity.BaseEntity;
import org.livem.entitymeta.annotation.Field;
import org.livem.meta.UIType;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Entity
public class Product extends BaseEntity {

    @Field(title = "产品名称")
    @NotNull(message = "产品名称不能为空")
    private String pname;
    @Field(title ="单价")
    private float price;
    @Column(columnDefinition = "text")
    @Field( title = "产品描述",uitype = UIType.RichContent)
    private String desc;


    @Field(title = "产品图片",uitype = UIType.Img)
    private String img;

    public String getPname() {
        return pname;
    }

    public void setPname(String pname) {
        this.pname = pname;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
