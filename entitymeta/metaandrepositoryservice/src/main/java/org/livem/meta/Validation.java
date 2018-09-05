package org.livem.meta;

public class Validation {
    //    验证名称
    private String validName;
    //    正则表达式
    private String regEx;
    //    错误提示
    private String errorMsg;

    private  boolean required;


    public Validation(String validName, String constraint, String msg) {
        this.regEx = constraint;
        this.validName = validName;
        this.errorMsg = msg;
    }

    public Validation() {
    }


    public String getValidName() {
        return validName;
    }

    public void setValidName(String validName) {
        this.validName = validName;
    }

    public String getErrorMsg() {
        return errorMsg;
    }

    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }

    public String getRegEx() {
        return regEx;
    }

    public void setRegEx(String regEx) {
        this.regEx = regEx;
    }

    public boolean isRequired() {
        return required;
    }

    public void setRequired(boolean required) {
        this.required = required;
    }
}
