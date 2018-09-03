package com.livem.quickframework.setup;

import com.livem.quickframework.annation.SetUp;
import com.livem.quickframework.entity.SysMenu;
import com.livem.quickframework.entity.SystemUser;
import org.livem.dao.GeneriEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Transactional
public class SysMenuSetup {
    @Autowired
    GeneriEntityService generiEntityService;

    @SetUp
    public void systemUserSetUp() {
        SysMenu root=new SysMenu();
        root.setName("系统设置");
        root.setOrderNum(0);
        root.setPerms("sys:config:all");
        root.setType(SysMenu.menuType.FOLDER);
        generiEntityService.updateOrSave(root);

        //add menu
        SysMenu m=new SysMenu();
        m.setName("应用配置");
        m.setUrl("/system/entity/Application/list");
        m.setPerms("sys:application:all");
        m.setParentId(root.getId());
        generiEntityService.updateOrSave(m);

        m=new SysMenu();
        m.setName("用户管理");
        m.setUrl("/system/entity/SystemUser/list");
        m.setPerms("sys:user:all");
        m.setParentId(root.getId());
        generiEntityService.updateOrSave(m);

        m=new SysMenu();
        m.setName("角色管理");
        m.setUrl("/system/entity/Role/list");
        m.setPerms("sys:role:all");
        m.setParentId(root.getId());
        generiEntityService.updateOrSave(m);

        m=new SysMenu();
        m.setName("菜单管理");
        m.setUrl("/system/entity/SysMenu/list");
        m.setPerms("sys:menu:all");
        m.setParentId(root.getId());
        generiEntityService.updateOrSave(m);


        m=new SysMenu();
        m.setName("字典管理");
        m.setUrl("/system/entity/Dictionary/list");
        m.setPerms("sys:dictionary:all");
        m.setParentId(root.getId());
        generiEntityService.updateOrSave(m);


    }

}
