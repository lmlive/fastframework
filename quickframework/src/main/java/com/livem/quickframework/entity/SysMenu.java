package com.livem.quickframework.entity;

import org.livem.entitymeta.annotation.EntityConfig;
import org.livem.entitymeta.annotation.Field;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
@EntityConfig(title = "菜单")
public class SysMenu extends BaseEntity {

    public  static  enum  menuType{
        FOLDER,
        MENU,
        BUTTON
    }
    private Long menuId;

    /**
     * 父菜单ID，一级菜单为0
     */
    @Field(title = "上级菜单ID")
    private Long parentId;

    /**
     * 菜单名称
     */
    @Field(title = "菜单名称")
    private String name;

    /**
     * 菜单URL
     */
    @Field(title = "菜单地址")
    private String url;

    /**
     * 授权(多个用逗号分隔，如：user:list,user:create)
     */
    @Field(title = "授权")
    private String perms;

    /**
     * 类型     0：目录   1：菜单   2：按钮
     */
    @Field(title = "类型     0：目录   1：菜单   2：按钮")
    private menuType type;

    /**
     * 菜单图标
     */
    @Field(title ="菜单图标")
    private String icon;

    /**
     * 排序
     */
    @Field(title ="排序")
    private Integer orderNum;


    public Long getMenuId() {
        return menuId;
    }

    public void setMenuId(Long menuId) {
        this.menuId = menuId;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getPerms() {
        return perms;
    }

    public void setPerms(String perms) {
        this.perms = perms;
    }

    public menuType getType() {
        return type;
    }

    public void setType(menuType type) {
        this.type = type;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Integer getOrderNum() {
        return orderNum;
    }

    public void setOrderNum(Integer orderNum) {
        this.orderNum = orderNum;
    }
}
