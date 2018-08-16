package com.livem.quickframework.controller.rest;

import com.livem.quickframework.constant.SessionConstant;
import com.livem.quickframework.entity.Role;
import com.livem.quickframework.entity.SysMenu;
import com.livem.quickframework.entity.SystemUser;
import com.livem.quickframework.exception.RestException;
import com.livem.quickframework.model.BaseStaus;
import com.livem.quickframework.model.ResponseStatus;
import com.livem.quickframework.model.Tree;
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
        Long userid = (Long) SecurityUtils.getSubject().getPrincipal();
        //get user permissions
        if (userid == null) throw new RestException(-1, "un authoed user !");
        SystemUser user = generiEntityService.findOne(SystemUser.class, userid);
        List<SysMenu> menus = Collections.emptyList();
        if ("admin".equalsIgnoreCase(user.getLoginName())) {
            //admin load all menus

            menus = generiEntityService.findAll(SysMenu.class);

        } else {
            List<Role> roles = user.getRoles();
            Set<SysMenu> sysMenus = new HashSet<>();

            for (Role role : roles) {
                List<SysMenu> ms = role.getMenus();
                sysMenus.addAll(ms);
            }
        }
        Map<String, Object> data = new HashMap<>();
        data.put("user", user);
        data.put("menus", convertTotree(menus));

        return ResponseStatus.ok(data);

    }


    List<Tree<SysMenu>> convertTotree(List<SysMenu> menus) {
        List<Tree<SysMenu>> res = new ArrayList<>();
        List<SysMenu> root = findByParentId(menus, null);
        for (SysMenu sysMenu : root) {
            Tree<SysMenu> tree = new Tree<>();
            tree.setObj(sysMenu);
            tree.setList(new ArrayList<>());
            res.add(tree);
            fillTree(tree, menus);

        }
        return res;

    }

    void fillTree(Tree<SysMenu> t, List<SysMenu> list) {
        for (SysMenu s : findByParentId(list, t.getObj().getId())) {
            Tree<SysMenu> c = new Tree<>();
            c.setObj(s);
            c.setList(new ArrayList<>());
            t.getList().add(c);
            fillTree(c, list);
        }
    }

    List<SysMenu> findByParentId(List<SysMenu> list, Long parent) {
        List<SysMenu> res = new LinkedList<>();
        for (SysMenu sysMenu : list) {
            if (parent == null) {
                if (sysMenu.getParentId() == null) res.add(sysMenu);
            } else {
                if (parent.equals(sysMenu.getParentId())) {
                    res.add(sysMenu);
                }
            }
        }
        return res;
    }


}
