package com.livem.quickframework.setup;

import com.livem.quickframework.annation.SetUp;
import com.livem.quickframework.entity.SystemUser;
import org.livem.dao.GeneriEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SystemSetUp {
    @Autowired
    GeneriEntityService generiEntityService;

    @SetUp
    public void systemUserSetUp() {
        SystemUser u = new SystemUser();
        u.setLoginName("admin");
        u.setPassword("123456");
        u.setIntroduce("system user");
        generiEntityService.updateOrSave(u);

    }

}
