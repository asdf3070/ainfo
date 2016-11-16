package cn.heipiao.cp.shiro.web;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import cn.heipiao.cp.core.constant.SysConstant;
import cn.heipiao.cp.core.web.BaseController;
import cn.heipiao.cp.shiro.pojo.SessionUser;
import cn.heipiao.cp.shiro.service.UserService;

/**
 * 
 * 说明 : LoginController,负责登陆登出 功能 : a. 用户登录登出
 * 
 * @author chenwenye
 * @since 2016-6- heipiao1.0
 */
@Controller
public final class LoginController extends BaseController{

	private static final Logger log = LoggerFactory.getLogger(LoginController.class);

	@Resource
	private UserService userService;

	/**
	 * 登录功能
	 * 
	 * @param pwd
	 *            密码
	 * @param param
	 *            登录参数 ; 1:电话 2:邮箱 3:第三方接口
	 * @param type
	 *            登录类型 : 1: 后台登陆
	 * @return
	 */
	@RequestMapping(value = "/user/login", method = RequestMethod.POST)
	public String login(String pwd ,String param ,Model model) {
		// 非空验证
		if ( StringUtils.isBlank(param) ) {
			model.addAttribute("msg", "手机或邮箱不能为空");
			return "login";
		}

		if ( StringUtils.isBlank(pwd) ) {
			model.addAttribute("msg", "密码不能为空");
			return "login";
		}

		// shiro验证
		Subject subject = SecurityUtils.getSubject();
		// 通过token
		UsernamePasswordToken token = new UsernamePasswordToken();
		token.setUsername(param);
		token.setPassword(pwd.toCharArray());
		try {
			subject.login(token);
		} catch (Exception e) {
			model.addAttribute("msg", "用户名或密码错误");
			return "login";
		}

		// 从shiro获取user对象
		SessionUser user = (SessionUser) subject.getPrincipal();

		if (user.getStatus().equals(String.valueOf(SysConstant.INVALID))) {
			model.addAttribute("msg", "账户冻结,请联系管理员");
			return "login";
		}
		
		if (user.getStatus().equals(String.valueOf(SysConstant.LEAVE))) {
			model.addAttribute("msg", "该员工已离职");
			return "login";
		}

		log.info("登陆完毕");
		
		this.session.setAttribute(SysConstant.SESSION_TICKET, user);//将user添加进回话
		this.session.setMaxInactiveInterval(2 * 60 * 60);
		
		return "redirect:/main";
	}
	
	/**
	 * 
	 * 功能 :
	 * 		登出
	 * @return
	 */
	@RequestMapping("/user/logout")
	public String logout(){
		
		//this.session.invalidate();  --  谨慎使用,存在同一时间再次登录,登录失败的问题;
		this.session.removeAttribute(SysConstant.SESSION_TICKET);
		
		return "login";
	}
	
}
