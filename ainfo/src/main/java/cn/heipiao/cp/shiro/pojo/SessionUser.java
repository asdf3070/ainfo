package cn.heipiao.cp.shiro.pojo;

import java.io.Serializable;

import org.apache.commons.lang3.builder.ToStringBuilder;

/**
 * 
 * 说明 :
 *		 用户会话缓存,用于会话缓存 - "Session"
 * 功能 : 
 *      a.	
 * 使用规范 :
 * 		a. 
 * @author chenwenye
 * @since 2016-5-30 heipiao1.0
 */
public final class SessionUser implements Serializable{
	
	/**
	 * UUID
	 */
	private static final long serialVersionUID = -6061124045228703378L;

	/**
	 * 用户名(昵称)
	 */
	private String username;
	
	/**
	 * 用户ID
	 */
	private String id;
	
	/**
	 * 密码 - 敏感信息
	 */
	private transient String password;
	
	/**
	 * 会话ID
	 */
	private String sessionId;
	
	/**
	 * 用户状态
	 */
	private String status;
	
	/**
	 * 角色名称
	 */
	private String remarks;
	
	/**
	 * 头像url
	 */
	private String portriat;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getSessionId() {
		return sessionId;
	}

	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setremarks(String remarks) {
		this.remarks = remarks;
	}

	public String getPortriat() {
		return portriat;
	}

	public void setPortriat(String portriat) {
		this.portriat = portriat;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}
	
}
