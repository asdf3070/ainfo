package cn.heipiao.cp.sys.service;

import java.util.List;

import cn.heipiao.cp.core.vo.Page;
import cn.heipiao.cp.shiro.pojo.User;
import cn.heipiao.cp.sys.pojo.AutoInfoParam;

/**
 * 说明 : 团队管理service
 * @author chenwenye
 * @since 2016-7-7  heipiao1.0
 */
public interface TeamService {
	
	/** 开启权限 **/
	String ALLOW = "on";
	
	/** 取消权限 **/
	String NOT_ALLOW = "off";
	
	/**
	 * 作用: 更改团队用户信息
	 * @param user
	 * @return
	 */
	boolean update(User user);
	
	/**
	 * 作用: 查询用户列表信息(简要信息)
	 * @return
	 */
	List<User> findUserList(Page page, String status);
	
	/**
	 * 作用: 批量添加用户进团队
	 * @param users
	 * @return
	 */
	<U> boolean addTeams(List<U> users);
	
	/**
	 * 作用: 授权/取消权限
	 * @param UserId 用户Id
	 * @param permissionId 权限Id
	 * @param value 权限值
	 * @param modelCode 模板名称
	 * @return
	 */
	boolean permission(String userId, String permissionId , String modelCode , String value);
	
	/**
	 * 
	 * 作用: 更改用户权限
	 * @param userId 用户id
	 * @param status 状态 
	 * @return
	 */
	boolean updateStatus(String userId, String status);
	
	/**
	 * @说明 : 修改用户密码
	 * @param userId
	 * @param pwd
	 * @return
	 */
	boolean updatePwd(String userId, String pwd);

	List<AutoInfoParam> queryAutoInfo();

	boolean writeAutoInfo(Integer id, Integer value);
	
}
