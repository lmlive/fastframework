package com.livem.quickframework.setup;

import com.livem.quickframework.annation.SetUp;
import com.livem.quickframework.entity.SysMenu;
import com.livem.quickframework.entity.SystemUser;
import org.livem.dao.GeneriEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class SystemUserSetUp {
    @Autowired
    GeneriEntityService generiEntityService;

    @SetUp
    public void systemUserSetUp() {
        SystemUser u = new SystemUser();
        u.setLoginName("admin");
        u.setPassword("123456");
        u.setIntroduce("system user");
        //setup default menus

        generiEntityService.updateOrSave(u);

    }

}
