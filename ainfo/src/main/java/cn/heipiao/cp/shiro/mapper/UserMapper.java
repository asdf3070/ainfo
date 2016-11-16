package cn.heipiao.cp.shiro.mapper;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import cn.heipiao.cp.core.mapper.BaseMapper;
import cn.heipiao.cp.shiro.pojo.Role;
import cn.heipiao.cp.shiro.pojo.SessionUser;
import cn.heipiao.cp.shiro.pojo.User;
import cn.heipiao.cp.sys.pojo.AutoInfoParam;

/**
 *	@author zf 
 *	@version 1.0
 *	@description userMapper
 *	@date 2016年6月1日
 */
public interface UserMapper extends BaseMapper<User>{
	
	/**
	 * 作用: 批量插入
	 * @param U
	 * @return
	 */
	<U> int insertss(U U);
	
	/**
	 * 作用: 查询简要的用户信息列表
	 * @param params
	 * @return
	 */
	List<User> selectListSimple(Map<String, ?> params);

	/**
	 * 通过多个条件模糊查询
	 * @param user
	 * @return
	 */
	List<User> getUsersByConditions(Map<String, String> param);
	/**
	 * 根据昵称或是手机号查用户
	 * 支持模糊查询
	 * @param queryCondition
	 * @return
	 */
	List<User> getUsersByPhoneOrName(String queryCondition);
	
	/**
	 * 
	 * 功能 :
	 * 		获取登录用户
	 * @param param
	 * @return
	 */
	SessionUser getLoginUser(String param);
	
	/**
	 * 
	 * 功能 :
	 * 		获取登陆用户权限
	 * @param userId
	 * @return
	 */
	List<String> getPermissions(String userId);
	
	/**
	 * 
	 * 功能 :
	 * 		根据电话或邮箱查询用户
	 * @param param
	 * @return
	 */
	User findByPhoneOrEmail(String param);
	
	/**
	 * 
	 * 功能 :
	 * 		添加角色
	 * 		后期版本此函数可能不要
	 * @param role
	 */
	@Deprecated
	int insertUserRole(Role role);
	
	/**
	 * 作用: 授权
	 * @param UserId 用户Id
	 * @param permissionId 权限(模板)id
	 * @return
	 */
	int allowPermission(Map<String , String> params);
	
	/**
	 * 作用: 取消授权
	 * @param UserId 用户Id
	 * @param permissionId 权限(模板)id
	 * @return
	 */
	int notAllowPermission(Map<String , String> params);
	
	/**
	 * 作用: 获取用户拥有的权限
	 * @param userId 用户Id
	 * @return
	 */
	List<Role> getPermissionInfos(String userId);
	
	/**
	 * 删除用户的所有权限
	 * @param userId
	 * @return
	 */
	<U> int deleteAllPermission(U userId);
	
	/**
	 * 批量添加用户的权限
	 * @param roles
	 * @return
	 */
	int insertPermissions(Collection<Role> roles);

	
	List<AutoInfoParam> queryAutoInfo();

	int writeAutoInfo(AutoInfoParam param);
	
}
