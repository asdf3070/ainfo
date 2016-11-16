package cn.heipiao.cp.core.vo;

import org.apache.commons.lang3.StringUtils;

/**
 * <p>
 * 返回消息抽象类</br>
 * 前期版本设计包含状态码、错误信息和业务消息体</br>
 * 当状态码为0时，本次交互成功，错误信息为空，客户端读取业务消息体</br>
 * 当状态码非0时，本次交互失败，业务消息体为空，客户端应读取错误信息</br>
 * 
 * 前期考虑：</br>
 * 理想情况下，应仅返回状态码和消息体，在交互失败时，客户端根据状态码在资源文件中找到对应的具体错误信息。
 * 但这么处理给前期版本开发带来复杂程度，且包含错误信息的资源文件不一定随协议或客户端版本变化而变化，然则需客户端动态加载。
 * 慎重考虑，前期版本中，由服务端负责状态码和错误信息的对应关系，统一返回给客户端。
 * </p>
 * @author Chris
 *
 * @param <T>
 */
public class RespMsg<T> {
	
	/** 成功 **/
	public static int SUCCESS = 0;
	
	/**
	 * 状态码
	 * 0成功，非0失败，
	 */
	private int status;
	
	/**
	 * 错误信息
	 */
	private String errMsg;

	/**
	 * 业务消息体
	 */
	private T body;
	public RespMsg() {
		this.status = SUCCESS;
		this.errMsg = StringUtils.EMPTY;
	}
	
	/**
	 * 构造新消息体
	 * @param status 状态码
	 * @param errMsg 错误信息
	 */
	public RespMsg(int status, String errMsg) {
		super();
		this.status = status;
		this.errMsg = errMsg;
	}

	/**
	 * 构造新消息体
	 * @param body 业务消息体
	 */
	public RespMsg(T body) {
		this();
		this.body = body;
	}

	public int getStatus() {
		return status;
	}

	/**
	 * 设置状态码
	 * @param status
	 */
	public void setStatus(int status) {
		this.status = status;
	}

	public String getErrMsg() {
		return errMsg;
	}

	/**
	 * 设置错误信息
	 * @param errMsg
	 */
	public void setErrMsg(String errMsg) {
		this.errMsg = errMsg;
	}

	public T getBody() {
		return body;
	}

	/**
	 * 设置业务消息体
	 * @param body
	 */
	public void setBody(T body) {
		this.body = body;
	}
	
	public RespMsg<?> setStatus(Status status){
		this.status = status.status;
		this.errMsg = status.message;
		return this;
	}
	
	public RespMsg<?> setStatus(Status status ,T body ){
		this.setStatus(status);
		this.setBody(body);
		return this;
	}
	
}
