package cn.heipiao.cp.ainfo.constant;

/**
 * @author asdf3070@163.com
 * @date 2016年10月31日
 * @version 1.0 0：<br/>
 * @desc 0-表示业务流程正确，反之则不正确。 <br/><br/>
 * 
 * 不正确的状态类型为一下说明： <br/>
 *          1xxx: 1开头的代表用户模块的状态 <br/>
 */
public enum Status {
	/**
	 * 代表成功，其他则代表失败
	 */
	SUCCESS(0, "成功"),
	
	/**
	 * 系统繁忙，此时请开发者稍候再试
	 */
	SYS_BUSY(0, "系统繁忙稍候再试"),

	/**
	 * 服务器Error-程序异常
	 */
	ERROR(4000, "服务器Error-程序异常"),
	
	/**
	 * 字段值为空或值错误
	 */
	PARAM_NULL_ERROR(4001, "字段值为空或值错误"),

	/**
	 * HTTP状态:403:不予响应
	 */
	FORBIDDEN(4003, "不予响应");

	
	private int code;
	private String codeMsg;

	private Status(int code, String codeMsg) {
		this.code = code;
		this.codeMsg = codeMsg;
	}

	public int getCode() {
		return code;
	}

	public String getCodeMsg() {
		return codeMsg;
	}
}
