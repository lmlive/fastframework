package com.livem.quickframework.model;

import com.livem.quickframework.entity.SysMenu;

import java.util.List;

public class TreeMenu extends SysMenu {
    List<TreeMenu> list;

    public TreeMenu(SysMenu sysMenu) {

    }

    public List<TreeMenu> getList() {
        return list;
    }

    public void setList(List<TreeMenu> list) {
        this.list = list;
    }
}
