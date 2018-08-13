package com.livem.quickframework.entity;

import org.livem.entitymeta.annotation.EntityConfig;

import javax.persistence.Entity;

@EntityConfig(title = "系统配置",siglePage = true)
@Entity
public class Application extends RecordEntity {


    private  String name;
    private  String introduce;
    private  String author;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIntroduce() {
        return introduce;
    }

    public void setIntroduce(String introduce) {
        this.introduce = introduce;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
