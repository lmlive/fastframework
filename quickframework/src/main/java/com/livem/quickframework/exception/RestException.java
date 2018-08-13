package com.livem.quickframework.exception;

public class RestException extends  RuntimeException {
    private  int code;
    private  String msg;

    public  RestException(int code,String msg){
        super(msg);
        this.code=code;
        this.msg=msg;
    }



}
