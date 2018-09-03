package com.livem.quickframework.entity;

import org.hibernate.annotations.NaturalId;
import org.livem.entitymeta.annotation.EntityConfig;
import org.livem.entitymeta.annotation.Field;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import java.util.List;

@Entity(name="roles")
@EntityConfig(title="角色",pickColumns = {"id","role_name"})
public class Role extends BaseEntity{
	
	@NaturalId
	@Field(title = "角色名称")
	private String role_name;
	
	
	@Field(title = "权限点")
	@ManyToMany(fetch=FetchType.LAZY)
	private List<SysMenu> menus;
	
	public Role(){}
	public Role(String name){
		this.role_name=name;
	}

	public List<SysMenu> getMenus() {
		return menus;
	}

	public void setMenus(List<SysMenu> menus) {
		this.menus = menus;
	}

	public String getRole_name() {
		return role_name;
	}
	public void setRole_name(String role_name) {
		this.role_name = role_name;
	}
	
	@Override
	public String toString() {
		return getRole_name();
	}
}
