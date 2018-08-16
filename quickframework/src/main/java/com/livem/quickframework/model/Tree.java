package com.livem.quickframework.model;

import com.livem.quickframework.entity.SysMenu;

import java.io.Serializable;
import java.util.List;

public class Tree<T>   implements Serializable {
    public  T obj;
    public List<Tree<T>> list;

    public T getObj() {
        return obj;
    }

    public void setObj(T obj) {
        this.obj = obj;
    }

    public List<Tree<T>> getList() {
        return list;
    }

    public void setList(List<Tree<T>> list) {
        this.list = list;
    }
}
