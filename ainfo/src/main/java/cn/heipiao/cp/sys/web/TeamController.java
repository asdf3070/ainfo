package cn.heipiao.cp.sys.web;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;

import cn.heipiao.cp.core.spring.extend.Config;
import cn.heipiao.cp.core.vo.Page;
import cn.heipiao.cp.core.vo.RespMsg;
import cn.heipiao.cp.core.vo.Status;
import cn.heipiao.cp.core.web.BaseController;
import cn.heipiao.cp.httpclient.HeiPiaoHttpClientService;
import cn.heipiao.cp.shiro.pojo.User;
import cn.heipiao.cp.shiro.service.UserService;
import cn.heipiao.cp.sys.pojo.ApiUser;
import cn.heipiao.cp.sys.pojo.AutoInfoParam;
import cn.heipiao.cp.sys.service.TeamService;

/**
 * 说明 : 功能 :
 * 
 * @author chenwenye
 * @since 2016-6-28 heipiao1.0
 */
@Controller
public final class TeamController extends BaseController {

	@Resource
	private TeamService teamService;

	@Resource
	private UserService userService;

	@Resource
	private HeiPiaoHttpClientService httpClientService;

	@RequestMapping(value = "/team/search/{param}", method = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT })
	@ResponseBody
	public RespMsg<?> findByParam(@PathVariable("param") String param) {
		return new RespMsg<>(this.userService.getUsersByPhoneOrName(param));
	}

	@RequestMapping(value = "/team/update", method = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT })
	@ResponseBody
	public RespMsg<?> update(@RequestBody User user) {
		return this.teamService.update(user) ? new RespMsg<>().setStatus(Status.SUCCESS)
				: new RespMsg<>().setStatus(Status.ERROR);
	}
	
	@RequestMapping( value= "/team/updatePwd" )
	@ResponseBody
	public RespMsg<?> updatePwd(@RequestBody User user){
		return this.teamService.updatePwd(String.valueOf(user.getId()), user.getPassword()) ? new RespMsg<>().setStatus(Status.SUCCESS)
				: new RespMsg<>().setStatus(Status.ERROR);
	}

	@RequestMapping(value = "/team/findList/{start}/{size}/{status}", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RespMsg<List<User>> findList(
			@PathVariable("start") Integer start, 
			@PathVariable("size") Integer size, 
			@PathVariable("status") String status) {
		return new RespMsg<List<User>>(this.teamService.findUserList(new Page(start, size), status));
	}

	@RequestMapping(value = "/team/userInfo/{id}")
	@ResponseBody
	public RespMsg<User> findById(@PathVariable("id") String id) {
		return new RespMsg<User>(this.userService.findById(id));
	}
	
	@RequestMapping(value = "/team/status/{userId}/{statusCode}")
	@ResponseBody
	public RespMsg<?> updataStatus(@PathVariable("userId") String userId , @PathVariable("statusCode") String statusCode ){
		return this.teamService.updateStatus(userId, statusCode) ? new RespMsg<>() : new RespMsg<>().setStatus(Status.ERROR);
	}

	/**
	 * 作用: 授权/取消授权
	 * @param userId
	 * @return
	 */
	@RequestMapping(value = "/team/permission/{userId}/{permissionId}/{permissionCode}/{type}")
	@ResponseBody
	public RespMsg<?> permission(@PathVariable("userId") String userId,
			@PathVariable("permissionId") String permissionId, @PathVariable("permissionCode") String permissionCode,
			@PathVariable("type") String type) {
		return this.teamService.permission(userId, permissionId, permissionCode, type) ? new RespMsg<>()
				: new RespMsg<>().setStatus(Status.ERROR);
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/team/adds", method = RequestMethod.POST)
	@ResponseBody
	public RespMsg<?> addTeam(@RequestBody String _ids) {
		JSONObject json = ((JSONObject)JSONObject.parse(_ids));
		String ids = json.getString("_ids");
		if(ids == null){
			new RespMsg<>(10086, "该用户已经是团队成员");
		}
		//(HashMap<String, Object>)
		// 添加团队,多个id之间用,分割
		String[] idsArray = ids.split(",");

		List<ApiUser> users = new LinkedList<ApiUser>();
		for (String id : idsArray) {
			try {
				String _resp = httpClientService
						.doGet(StringUtils.join(Config.getMapProp("heipiao.api.addr"), "/users/user/", id));
				RespMsg<?> resp = JSONObject.parseObject(_resp, RespMsg.class);
				ApiUser apiUser = new ApiUser();
				if (resp.getStatus() == 0) {
					/*
					 * {"id":1,"username":"野狗","phone":"1234567890","status":"1"
					 * ,"remark":"技术员","nickname":"OutDog","email":
					 * "OutDog@heipiao.com","regisTime":1465380484000,"portriat"
					 * :"http://xxxxxxxxxxxxxxxxxx","password":
					 * "35a73214f7ac0d437da28db53a1f92d5244657e2",
					 * "lastLoginTime":1465380484000}
					 */
					Map<Object, Object> body = (Map<Object, Object>) resp.getBody();
					Object obj = body.get("birthday");
					Long birthday = 0L;
					if(obj instanceof Integer){
						birthday = Long.valueOf((Integer)obj);
					}else if(obj instanceof Long){
						birthday = (Long)obj;
					}
					body.put("birthday", new Date());
					BeanUtils.populate(apiUser, body);
					apiUser.setBirthday(new Date(birthday));
					users.add(apiUser);
				}

			} catch (Exception e) {
				log.error(e.getMessage(), e);
				return new RespMsg<>().setStatus(Status.ERROR);
			}
		}
		
		return teamService.addTeams(users) ? new RespMsg<>() : new RespMsg<>(10086, "该用户已经是团队成员");
	}

	/**
	 * Ainfo参数查询
	 * @return
	 */
	@RequestMapping(value = "/aparam/query", method={RequestMethod.GET})
	@ResponseBody
	public RespMsg<List<AutoInfoParam>> ainfoQuery() {
		
		List<AutoInfoParam> list = this.teamService.queryAutoInfo();
		
		return  new RespMsg<List<AutoInfoParam>>(list);
	}


	/**
	 * Ainfo参数写入
	 * @return
	 */
	@RequestMapping(value = "/aparam/write/{id}/{value}")
	@ResponseBody
	public RespMsg<?> ainfoWrite(@PathVariable("id") Integer id, @PathVariable("value") Integer value) {
		
		boolean ret = this.teamService.writeAutoInfo(id, value);
		
		return  new RespMsg<>().setStatus(Status.SUCCESS, ret);
	}

}
