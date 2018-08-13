package com.livem.quickframework.controller.rest;

import com.livem.quickframework.constant.SessionConstant;
import com.livem.quickframework.entity.Role;
import com.livem.quickframework.entity.SysMenu;
import com.livem.quickframework.entity.SystemUser;
import com.livem.quickframework.model.BaseStaus;
import com.livem.quickframework.model.ResponseStatus;
import com.livem.quickframework.utils.ShiroUtils;
import org.apache.shiro.SecurityUtils;
import org.livem.dao.Query2;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/system/SystemUser")
public class SystemUserController extends BaseRestController {

    @RequestMapping("info")
    public BaseStaus currentUser() {
        SystemUser user = (SystemUser) SecurityUtils.getSubject().getSession(true).
                getAttribute(SessionConstant.KEY_CURRENT_USER);
        //get user permissions
        List<Role> roles = user.getRoles();
        Set<SysMenu> meus = new HashSet<>();
        for (Role role : roles) {
            List<SysMenu> ms = role.getMenus();
            meus.addAll(ms);
        }
        Map<String, Object> data = new HashMap<>();
        data.put("user", user);
        data.put("menus", meus);
        //TODO   serialize  lazy  data ? How to config json serilize  out data
        return ResponseStatus.ok(data);


    }


}
