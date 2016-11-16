package cn.heipiao.cp.shiro.constant;

import java.util.Map;
import java.util.TreeMap;

/**
 * 
 * 说明 :
 * 		heipiao1.0后台管理版本用户权限暂时没有明确的角色分类,只有超级管理员和普通用户
 * 功能 : 
 *      a.	
 * 使用规范 :
 * 		a.
 * @author chenwenye
 * @since 2016-5-30 heipiao1.0
 */
public class ShiroConstant {

	/** 系统默认编码 **/
	public static final String DEFAULT_CHARSET = "UTF-8";
	
	/** 资源配置根路径/顶级资源路径 ID **/
	public static final int RESOURCE_ROOT_ID = 0;
	
	/** 资源配置根路径/顶级资源路径CODE **/
	public static final String RESOURCE_ROOT_CODE = "root";
	
	/**  有效状态  **/
	public static final int VALID = 1;
	
	/** 无效状态/冻结状态 **/
	public static final int INVALID = 0;
	
	/** 用户权限 1:超级管理员 ; 2:普通运营人员 **/
	public static Map<Integer , String> ROLES ;
	
	static{
		//可以考虑用配置文件做
		ROLES = new TreeMap<Integer , String>();
		ROLES.put(1, "超级管理员");
		ROLES.put(2, "普通运营人员");
	}
	
	/** 默认用户角色code **/
	public static final int DEFUALT_ROLE_CODE = 1;
	
	/**  heiPiaoCredentialsMatcher beanName @see SimpleRealm  **/
	public final static String CREDENTIALS_MATCHER_BEAN_NAME = "heiPiaoCredentialsMatcher";
	
	
}

