package cn.heipiao.cp.sys.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.collections4.map.LinkedMap;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import cn.heipiao.cp.core.utils.ExDigestUtils;
import cn.heipiao.cp.core.vo.Page;
import cn.heipiao.cp.shiro.mapper.UserMapper;
import cn.heipiao.cp.shiro.pojo.Role;
import cn.heipiao.cp.shiro.pojo.User;
import cn.heipiao.cp.sys.mapper.GroupMapper;
import cn.heipiao.cp.sys.pojo.AutoInfoParam;
import cn.heipiao.cp.sys.service.TeamService;

/**
 * 说明 : 团队管理Service
 * @author chenwenye
 * @since 2016-7-7  heipiao1.0
 */
@Service
public class TeamServiceImpl implements TeamService{

	/** 群组mapper **/
	@Resource
	private GroupMapper groupMapper;
	
	/** 用户mapper  **/
	@Resource
	private UserMapper userMapper;
	
	@Override
	public boolean update(User user) {
		boolean b1 = this.userMapper.updateById(user) > 0;
		Map<String , Object> params = new LinkedMap<String , Object>();
		params.put("userId", user.getId());
		this.groupMapper.deleteByUser(user.getId());
		String [] groups;
		if( !StringUtils.isBlank(((groups = user.getGroupIds().split(","))[0])) ){	//空判断
			params.put("groupIds", Arrays.asList(groups));
			this.groupMapper.inserts(params);
		}
		
		this.userMapper.deleteAllPermission(user.getId());
		List<Role> roles = user.getRoles();
		List<Role> _null = new ArrayList<Role>(1);
		_null.add(null);
		roles.removeAll(_null);
		if( roles != null && roles.size() > 0 ){
			this.userMapper.insertPermissions(roles);
		}
		
		return b1;
	}

	@Override
	public List<User> findUserList(Page page, String status) {
		Map<String, Object> params = new LinkedMap<String , Object>();
		if( page != null ){
			params.put("start", page.start);
			params.put("size", page.size);
		}
		if("_".equals(status.trim())){
			status = null;
		}
		params.put("status", status);
		return this.userMapper.selectListSimple(params);
	}

	@Override
	public boolean permission(String userId, String permissionId, String modelCode , String value) {
		Map<String , String> params = new LinkedMap<String , String>();
		params.put("userId", userId);
		params.put("modelId", permissionId);
		params.put("modelCode", modelCode);
		if( ALLOW.equals(value) ){
			return this.userMapper.allowPermission(params) > 0;
		}
		if( NOT_ALLOW.equals(value) ){
			return this.userMapper.notAllowPermission(params) > 0;
		}
		return false;
	}

	@Override
	public <U> boolean addTeams(List<U> users) {
		try{
			for (U u : users) {
				this.userMapper.insert(u);
			}
			//return this.userMapper.insertss(users) > 0;	TODO 后期修改为单sql批量插入
			return true;
		}catch(Exception e){
			return false;	//该团队已经引入
		}
	}

	@Override
	public boolean updateStatus(String userId, String status) {
		Map<String , String> params = new LinkedMap<String , String>();
		params.put("id", userId);
		params.put("status", status);
		return this.userMapper.updateById(params) > 0;
	}

	@Override
	public boolean updatePwd(String userId, String pwd) {
		if( StringUtils.isBlank(pwd) ){
			return false;
		}
		Map<String , String> params = new LinkedMap<String , String>();
		params.put("id", userId);
		params.put("password", ExDigestUtils.sha1Hex(pwd));
		return this.userMapper.updateById(params) > 0;
	}

	@Override
	public List<AutoInfoParam> queryAutoInfo() {
		List<AutoInfoParam> ret = this.userMapper.queryAutoInfo();
		return ret;
	}

	@Override
	public boolean writeAutoInfo(Integer id, Integer value) {
		AutoInfoParam params = new AutoInfoParam();
		params.setId(id);
		params.setpValue(value);
		return this.userMapper.writeAutoInfo(params) > 1;
	}

}
