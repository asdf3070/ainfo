package cn.heipiao.cp.shiro.service;

import java.util.List;

import cn.heipiao.cp.shiro.pojo.Role;
import cn.heipiao.cp.shiro.pojo.SessionUser;
import cn.heipiao.cp.shiro.pojo.User;

/**
 * @author zf
 * @version 1.0
 * @description
 * @date 2016年6月1日
 */
public interface UserService {
	
	/**
	 * 用户注册
	 * @param user
	 */
	void save(User user);
	
	/**
	 * 
	 * 功能 :
	 * 		根据用户id冻结用户
	 * @param id
	 * @return
	 */
	//void freezeUser(String id);
	
	/**
	 * 
	 * 功能 :
	 * 		根据主键更改User
	 * @param user
	 * @return
	 */
	//void updateById(User user);
	
	/**
	 * 
	 * 功能 :
	 * 		主键查询
	 * @param id
	 * @return
	 */
	User findById(String id);
	
	/**
	 * 
	 * 功能 :
	 * 		根据用户昵称或电话号码模糊查询用户
	 * @since 1.0可能根据后续版本会有变动
	 * @param param
	 * @return
	 */
	List<User> getUsersByPhoneOrName(String param);
	
	/**
	 * 
	 * 功能 :
	 * 		获取登陆用户
	 * 		后台用户
	 * @param param 电话/用户名/邮箱
	 * @return
	 */
	SessionUser getLoginUser(String param);
	
	/**
	 * 
	 * 功能 :
	 * 		获取当前用户所拥有权限
	 * @param userId 用户Id
	 * @return
	 */
	List<String> getPermissions(String userId);
	
	/**
	 * 
	 * 功能 :
	 * 		普通的列表查询
	 * @param param
	 * @return
	 */
	//List<User> selectList(Map<String, Object> param);
	
	/**
	 * 作用: 获取更详细的权限列表-根据用户Id
	 * @param userId 用户Id
	 * @return
	 */
	List<Role> getPermissionInfos(String userId);
	
}
