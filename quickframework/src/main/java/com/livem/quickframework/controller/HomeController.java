package com.livem.quickframework.controller;

import com.livem.quickframework.constant.SessionConstant;
import com.livem.quickframework.controller.entity.AbsBaseEntityController;
import com.livem.quickframework.entity.SystemUser;
import com.livem.quickframework.model.BaseStaus;
import com.livem.quickframework.model.Changepwd;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.livem.dao.Query2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.validation.Validator;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;
import java.util.List;

@Controller("admin_home")
@RequestMapping("/admin")
public class HomeController extends AbsBaseEntityController {
    @Autowired
    private List<Validator> validators;

    @RequestMapping(path = {"", "/", "/index"})
    public ModelAndView index(ModelMap map) {
        // map.put("user", new User());
        ModelAndView mv = new ModelAndView("/admin/index");
        Object user = SecurityUtils.getSubject().getSession(true).getAttribute(SessionConstant.KEY_CURRENT_USER);
        mv.addObject("user", user);
        return mv;
    }

    @RequestMapping(path = "/changepwd", method = RequestMethod.GET)
    public String changepwd(@ModelAttribute("changepwd") Changepwd changepwd) {

        return "/admin/changepwd";
    }

    @Transactional
    @RequestMapping(path = "/changepwd", method = RequestMethod.POST, consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public String changepwd(@Valid Changepwd changepwd, BindingResult bindresult) {
        if (bindresult.hasErrors()) {
            return "/admin/changepwd";
        }
        if (!changepwd.getPassword1().equals(changepwd.getPassword2())) {
            bindresult.addError(new FieldError("changepwd", "password2", "2次密码不一致"));
            return "/admin/changepwd";
        }
        BaseStaus baseStatus = this.changePwd(changepwd.getOldpwd(), changepwd.getPassword1());
        if (baseStatus.getCode() != BaseStaus.CODE_SUCCESS) {
            bindresult.addError(new ObjectError("error", baseStatus.getMsg()));
            return "/admin/changepwd";
        }
        return "redirect:/admin/index";
    }

    @Transactional
    @RequestMapping(path = "/changepwd", consumes = MediaType.APPLICATION_JSON_VALUE)
    public BaseStaus changePwd(String oldpwd, String newpassword) {
        String username = (String) SecurityUtils.getSubject().getPrincipal();
        try {
            AuthenticationInfo auth = SecurityUtils.getSecurityManager().authenticate(new UsernamePasswordToken(username, oldpwd));
            return changePassword(newpassword, username);
        } catch (AuthenticationException ex) {
            return new BaseStaus(BaseStaus.CODE_ERROR, "原密码错误！");
        }

    }

    BaseStaus changePassword(String newpassword, String username) {
        SystemUser u = new SystemUser();
        u.setLoginName(username);
        Query2<SystemUser> query = generiEntityService.createQuery(SystemUser.class);
        query.eq("loginName", username);
        SystemUser find = generiEntityService.findOne(query);
        if (find != null) {
            find.setPassword(newpassword);
            generiEntityService.updateOrSave(find);
            return new BaseStaus(BaseStaus.CODE_SUCCESS, BaseStaus.MSG_SUCCESS);
        }
        return new BaseStaus(BaseStaus.CODE_ERROR, "修改密码失败！");
    }

}
