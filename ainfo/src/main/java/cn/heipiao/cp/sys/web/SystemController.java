package cn.heipiao.cp.sys.web;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.heipiao.cp.core.constant.SysConstant;
import cn.heipiao.cp.core.spring.extend.Config;
import cn.heipiao.cp.core.vo.RespMsg;
import cn.heipiao.cp.core.web.BaseController;

/**
 * 
 * 说明 : 系统控制器 
 * 功能 : a. 展示一级菜单列表
 * 		 b.返回版本信息
 * @author chenwenye
 * @since 2016-6-12 heipiao1.0
 */
@Controller
public final class SystemController extends BaseController{
	
	/**
	 * 功能 : 统一页面跳转
	 * @param page
	 * @return
	 */
	@RequestMapping("/{page}")
	public String goPage(@PathVariable("page")String page){
		
		if( "main".equals(page) && this.session.getAttribute(SysConstant.SESSION_TICKET) == null ){
			return "login";	//未登录且请求主菜单
		}
		
		return page;
	}
	
	/**
	 * 作用: 返回配置信息
	 * @param type
	 * @return
	 */
	@RequestMapping("/sys/message/{type}")
	@ResponseBody
	public RespMsg<String> getMessage(@PathVariable("type")String type ){
		return new RespMsg<String>(Config.getMapProp(type));
	}
	
	/**
	 * 作用: 返回配置信息
	 * @param type
	 * @return
	 */
	@RequestMapping("/sys/param")
	@ResponseBody
	public RespMsg<Map<String, String>> getParam(){
		Map<String, String> ret = new HashMap<>();
		ret.put("version", Config.getMapProp("heipiao_cp_version"));
		String[] systemParamList = Config.getMapProp("system.param.list").split(",");
		for(int i=0; i<systemParamList.length; i++){
			ret.put(systemParamList[i], Config.getMapProp(systemParamList[i]));
		}
		return new RespMsg<Map<String, String>>(ret);
	}
}
