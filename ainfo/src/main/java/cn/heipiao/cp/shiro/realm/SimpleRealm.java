package cn.heipiao.cp.shiro.realm;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import cn.heipiao.cp.shiro.pojo.SessionUser;
import cn.heipiao.cp.shiro.service.UserService;

/**
 * Realm - Shiro认证,授权
 * 
 * @author chenwenye
 * @since 2016-5-28 heipiao1.0
 */
public class SimpleRealm extends AuthorizingRealm {

	/** 日志 **/
	private static final Logger log = LoggerFactory.getLogger(SimpleRealm.class);

	private UserService userService;

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	/**
	 * 授权
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		log.info("授权");

		SessionUser curUser = (SessionUser) principals.fromRealm(this.getName()).iterator().next();

		// 获取当前用户权限集合
		SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
		List<String> permissions = userService.getPermissions(curUser.getId());
		authorizationInfo.addStringPermissions(permissions);

		return authorizationInfo;
	}

	/**
	 * 认证
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		log.info("认证-登陆");
		// 根据View层传进来的 手机(邮箱),密码进行登录;
		UsernamePasswordToken uToken = (UsernamePasswordToken) token;
		SessionUser _user = userService.getLoginUser(uToken.getUsername());
		if (_user == null || StringUtils.isBlank(_user.getId())) {
			return null;
		}
		// this.getName(),shiro可以有多个realm，告诉底层具体是哪一个realm
		AuthenticationInfo info = new SimpleAuthenticationInfo(_user, _user.getPassword(), this.getName());
		return info;
	}

}
