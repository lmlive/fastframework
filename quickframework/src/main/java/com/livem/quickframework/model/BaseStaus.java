package com.livem.quickframework.model;

import java.io.Serializable;

public class BaseStaus implements Serializable {
	public final static int CODE_SUCCESS=0;
	public final static int CODE_ERROR=-1;
	public  final  static  int CODE_NOT_AUTHED=401;

	public final static String MSG_SUCCESS="成功";
	public final static String MSG_ERROR="失败";
	private int code=CODE_SUCCESS;
	private String msg;
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public BaseStaus(){}
	public BaseStaus(int code,String msg){
		this.code=code;
		this.msg=msg;
	}
	public static  BaseStaus success=new BaseStaus(CODE_SUCCESS,"操作成功");
	
}
