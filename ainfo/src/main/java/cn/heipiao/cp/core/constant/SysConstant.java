package cn.heipiao.cp.core.constant;

/**
 * 
 * 说明 :
 * 		系统常量类
 * 功能 : 
 *      a.	系统配置常量类
 * 使用规范 :
 * 		a.	需要在系统中经常使用的请在此配置
 * @author chenwenye
 * @since 2016-6-22 heipiao1.0
 */
public final class SysConstant {
	
	/** 从session获取当前登录用户  **/
	public static final String SESSION_TICKET = "sessionUser";
	
	/**	登陆cookies的值-用户获取sessionID	**/
	public static final String COOKIE_TICKET = "heipiao_ticket";
	
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
	
	/** 离职状态 **/
	public static final int LEAVE = 2;
	
	
}
