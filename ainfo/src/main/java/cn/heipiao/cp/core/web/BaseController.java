package cn.heipiao.cp.core.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ModelAttribute;

/**
 * 说明 : controller基类
 * 功能 : 提供http request , response , session
 * @author chenwenye
 * @since 2016-6-22  heipiao1.0
 */
public abstract class BaseController {
	
	/** 日志 **/
	protected Logger log;
	
	/** Request **/
	protected HttpServletRequest request;
	
	/** Response **/
	protected HttpServletResponse response;
	
	protected HttpSession session;
	
	@ModelAttribute
	private void init(HttpServletRequest request , HttpServletResponse response){
		this.request = request;
		this.response = response;
		this.session = request.getSession();
	}
	
	public BaseController() {
		this.log = LoggerFactory.getLogger(this.getClass());
	}
	
}
