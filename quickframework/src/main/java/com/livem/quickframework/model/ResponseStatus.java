package com.livem.quickframework.model;

public class ResponseStatus extends BaseStaus {
	private Object data;

	public ResponseStatus(int code,String msg,Object data){
		super(code,msg);
		this.data=data;
	}
	public ResponseStatus(){}
	
	public static ResponseStatus ok(Object data){
		return new ResponseStatus(BaseStaus.CODE_SUCCESS, "操作成功", data);
	}
	public static ResponseStatus error(String msg){
		return new ResponseStatus(BaseStaus.CODE_ERROR, msg,null);
	}
	
	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}


}
