package com.livem.quickframework.security;

import com.livem.quickframework.auth.oauth2.OAuthService;
import com.livem.quickframework.constant.SessionConstant;
import com.livem.quickframework.entity.Role;
import com.livem.quickframework.entity.SysMenu;
import com.livem.quickframework.entity.SystemUser;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.livem.dao.GeneriEntityService;
import org.livem.dao.Query2;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.util.Assert;

import java.util.HashSet;
import java.util.Set;

public class ComposeRelm extends AuthorizingRealm {

    private OAuthService oauthService;

    private BeanFactory beanFactory;

    public ComposeRelm(BeanFactory bf) {
        this.beanFactory = bf;
    }

    public OAuthService getOauthService() {
        return oauthService;
    }

    public void setOauthService(OAuthService oauthService) {
        this.oauthService = oauthService;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        if (token instanceof UsernamePasswordToken) return validUserNamePasswordToken((UsernamePasswordToken) token);
        else if (token instanceof OAuthToken) {
            return validOAuthToken((OAuthToken) token);
        }
        throw new AuthenticationException("Not support token type :" + token.getClass().getName());

    }

    private AuthenticationInfo validOAuthToken(OAuthToken token) {
        Assert.notNull(oauthService);
        if (token.getPrincipal() == null) {
            throw new AuthenticationException("token can not be null");
        }
        String loginName = oauthService.getLoginNameByToken(token.getPrincipal().toString());
        if (loginName == null) {
            throw new AuthenticationException("token are not allowed by this realm.");
        }
        SystemUser user = getLoginUserByName(loginName);
        if (user == null) {
            throw new AuthenticationException("账号已不存在");
        }

        SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(user.getId(), "", getName());// password
        // set empty
        // when
        // oauth
        // token
        // validate
        SecurityUtils.getSubject().getSession(true).setAttribute(SessionConstant.KEY_CURRENT_USER, user);
        return info;

    }

    private AuthenticationInfo validUserNamePasswordToken(UsernamePasswordToken upToken) {
        String username = upToken.getUsername();
        // Null username is invalid
        if (username == null) {
            throw new AccountException("Null usernames are not allowed by this realm.");
        }
        SystemUser user = getLoginUserByName(username);
        if (user == null) {
            throw new AccountException("账号不存在");
        }
        if (!user.getPassword().equals(new String(upToken.getPassword()))) {
            throw new AccountException("账号或者密码错误");
        }

        SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(user.getId(), upToken.getPassword(), getName());
        SecurityUtils.getSubject().getSession(true).setAttribute(SessionConstant.KEY_CURRENT_USER, user);
        return info;
    }

    private SystemUser getLoginUserByName(String username) {
        SystemUser user = new SystemUser();
        user.setLoginName(username);
        user.setRecordInfo(null);
        user.setRegDate(null);

        GeneriEntityService entityService = beanFactory.getBean(GeneriEntityService.class);
        Query2<SystemUser> query = entityService.createQuery(SystemUser.class).eq("loginName", username);
        return entityService.findOne(query);

    }

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        if (principals == null) {
            throw new AuthorizationException("PrincipalCollection method argument cannot be null.");
        }

        String username = (String) getAvailablePrincipal(principals);
        SystemUser user = getLoginUserByName(username);
        Set<String> roleNames = new HashSet<String>();
        Set<String> permissions = new HashSet<String>();

        for (Role role : user.getRoles()) {
            for (SysMenu p : role.getMenus()) {
                permissions.add(p.getPerms());
            }
        }
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo(roleNames);
        info.setStringPermissions(permissions);
        return info;
    }

    @Override
    public boolean supports(AuthenticationToken token) {
        if (token instanceof OAuthToken || token instanceof UsernamePasswordToken) return true;
        return false;
    }

}
