package cn.heipiao.cp.shiro.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.heipiao.cp.shiro.encrypt.DigestEncrypt;
import cn.heipiao.cp.shiro.mapper.UserMapper;
import cn.heipiao.cp.shiro.pojo.Role;
import cn.heipiao.cp.shiro.pojo.SessionUser;
import cn.heipiao.cp.shiro.pojo.User;
import cn.heipiao.cp.shiro.service.UserService;
import cn.heipiao.cp.sys.mapper.GroupMapper;

/**
 * @author zf
 * @version 1.0
 * @description
 * @date 2016年6月1日
 */
@Service
public class UserServiceImpl implements UserService {

	@Resource
	private UserMapper userMapper;
	
	@Resource
	private GroupMapper groupMapper;

	/**
	 * 系统统一加密
	 */
	@Resource
	private DigestEncrypt digestEncrypt;

	@Override
	public void save(User user) {
	}

	@Override
	public SessionUser getLoginUser(String param) {
		SessionUser user = userMapper.getLoginUser(param);
		return user;
	}

	@Override
	public List<String> getPermissions(String userId) {
		return this.userMapper.getPermissions(userId);
	}

	@Override
	public List<User> getUsersByPhoneOrName(String param) {
		return this.userMapper.getUsersByPhoneOrName(param);
	}

	public User findById(String id) {
		User user = this.userMapper.selectById(id);
		user.setGroups(groupMapper.selectByUserId(id));
		user.setAllGroup(this.groupMapper.selectAllGroup());
		user.setRoles(this.getPermissionInfos(id));
		return user;
	}

	@Override
	public List<Role> getPermissionInfos(String userId) {
		return this.userMapper.getPermissionInfos(userId);
	}

}
