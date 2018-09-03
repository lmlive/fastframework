package org.livem.test.entity;

import org.hibernate.annotations.NaturalId;
import org.livem.entitymeta.annotation.EntityConfig;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity(name="roles")
@EntityConfig(title = "角色",pickColumns = {"id","role_name"})
public class Role   extends  BaseEntity {
	
	@Column(unique = true)
	private String role_name;
	

	public Role(){}
	public Role(String name){
		this.role_name=name;
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
