package org.livem.test.entity;

import javax.persistence.Embeddable;

@Embeddable
public class House {
    private  String address;
    private  String No;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public House(){}

    public  House(String address,String no){
        this.address=address;
        this.No=no;
    }
}
