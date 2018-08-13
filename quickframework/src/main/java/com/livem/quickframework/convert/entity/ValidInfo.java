package com.livem.quickframework.convert.entity;

public class ValidInfo {
	private String validName;
	private Object validConstraint;
	private String errorMsg;

	
	public ValidInfo(String validName,Object constraint,String msg){
		this.validConstraint=constraint;
		this.validName=validName;
		this.errorMsg=msg;
	}
	public ValidInfo(){}
	
	
	public String getValidName() {
		return validName;
	}

	public void setValidName(String validName) {
		this.validName = validName;
	}

	public Object getValidConstraint() {
		return validConstraint;
	}

	public void setValidConstraint(Object validConstraint) {
		this.validConstraint = validConstraint;
	}

	public String getErrorMsg() {
		return errorMsg;
	}

	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}

}
