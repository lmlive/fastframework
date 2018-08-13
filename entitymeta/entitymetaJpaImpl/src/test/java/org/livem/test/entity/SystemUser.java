package org.livem.test.entity;

import org.hibernate.annotations.NaturalId;
import  org.livem.test.EntityListProprertyConvert;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
public class SystemUser  extends  BaseEntity   {

	@Column(unique=true)
	private String loginName;

//	@ColumnTransformer(read = "decrypt( 'AES', '101010101', pswd  )", write = "encrypt('AES', '101010101', ?)")
	private String password;

	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Role> roles;

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

	@Embedded
	private Recorded recordInfo = new Recorded();
	private Integer age;

	@Column(length = 500)
	private String introduce;

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


	private String photo;


	private String file;

    @Convert(converter = EntityListProprertyConvert.class)
	private List<String> upFiles;

    @ElementCollection
    private Set<House> houses;

	public Set<House> getHouses() {
		return houses;
	}

	public void setHouses(Set<House> houses) {
		this.houses = houses;
	}

	// @Convert(converter=ListProprertyConvert.class)
	// @UIField(ftype=FType.File)
	// private List<String> downloads;

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
