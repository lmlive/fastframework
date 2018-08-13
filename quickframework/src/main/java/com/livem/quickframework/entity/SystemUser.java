package com.livem.quickframework.entity;

import com.livem.quickframework.constant.DictionaryKeyConstant;
import com.livem.quickframework.convert.attr.EntityListProprertyConvert;
import org.hibernate.validator.constraints.Range;
import org.livem.entitymeta.annotation.EntityConfig;
import org.livem.entitymeta.annotation.Field;
import org.livem.entitymeta.annotation.Ordered;
import org.livem.entitymeta.annotation.Picked;
import org.livem.meta.UIType;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Entity
@Ordered("id,LoginName,password,age,sex,introduce,regDate,recordInfo,photo,file")
@Picked("username,photo,recrodInfo")
@EntityConfig(title = "系统账号")
public class SystemUser extends BaseEntity {

	@NotNull(message = "登录账号不能为空")
	@Column(unique=true)
	@Field(title = "登录账号")
	private String loginName;

	@Field(title = "名字")
	private  String disName;

	@NotEmpty(message = "密码不能为空")
	@Field(uitype = UIType.Password)
	//@ColumnTransformer(read = "decrypt( 'AES', '123456', pswd  )", write = "encrypt('AES', '123456', ?)")
	private String password;

	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@Field(title = "用户角色")
	private List<Role> roles;

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

	@Embedded
	private Recorded recordInfo = new Recorded();
	@Range(min = 0, max = 200)
	@Field(uitype = UIType.Number)
	private Integer age;

	@Field(uitype = UIType.RichContent)
	@Column(length = 500)
	private String introduce;


	public String getDisName() {
		return disName;
	}

	public void setDisName(String disName) {
		this.disName = disName;
	}

	public String getIntroduce() {
		return introduce;
	}

	public void setIntroduce(String introduce) {
		this.introduce = introduce;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Version
	private Date regDate;
	
 

	@Field(uitype = UIType.Img)
	private String photo;

	@Field(uitype = UIType.File)
	private String file;

	@Field(uitype = UIType.File)
	@Convert(converter = EntityListProprertyConvert.class)
	private List<String> upFiles;

	// @Convert(converter=ListProprertyConvert.class)
	// @UIField(ftype=FType.File)
	// private List<String> downloads;

	@Field(uitype = UIType.Dictionary, dictGroup = DictionaryKeyConstant.GROUP_SYSTEM_DATA, dictKey = DictionaryKeyConstant.KEY_SYSTEM_SEX)
	private Integer sex;

	public Integer getSex() {
		return sex;
	}

	public void setSex(Integer sex) {
		this.sex = sex;
	}

	public String getFile() {
		return file;
	}

	public void setFile(String file) {
		this.file = file;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public Date getRegDate() {
		return regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}

	@Override
	public String toString() {
		return this.loginName;
	}

	public Recorded getRecordInfo() {
		return recordInfo;
	}

	public void setRecordInfo(Recorded recordInfo) {
		this.recordInfo = recordInfo;
	}

	public List<String> getUpFiles() {
		return upFiles;
	}

	public void setUpFiles(List<String> upFiles) {
		this.upFiles = upFiles;
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

}
