package com.livem.quickframework.controller;

import com.livem.quickframework.exception.RestException;
import com.livem.quickframework.model.BaseStaus;
import com.livem.quickframework.utils.ShiroUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.Map;

@Controller
@RequestMapping("/admin")
public class LoginController {


    String loginViewName = "/admin/login";

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login() {

        return loginViewName;
    }

    @RequestMapping("/loginout")
    public String loginout() {
        SecurityUtils.getSubject().logout();
        return loginViewName;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public BaseStaus login_in2(@RequestBody(required = false) Map map) {
        AuthenticationToken token = new UsernamePasswordToken(String.valueOf(map.get("username")), String.valueOf(map.get("password")), Boolean.parseBoolean(String.valueOf(map.get("remeber"))));
        String captcha = (String) map.get("captcha");
        if (StringUtils.isEmpty(captcha) || !captcha.equals(ShiroUtils.getKaptcha(ShiroUtils.kaptach_session_key))) {
            throw new RestException(-1, "验证码错误");
        }
        SecurityUtils.getSubject().login(token);
        return BaseStaus.success;

    }


}
