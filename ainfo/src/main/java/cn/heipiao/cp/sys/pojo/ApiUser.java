package cn.heipiao.cp.sys.pojo;

import java.io.Serializable;
import java.util.Date;

/**
 * @author zf
 * @version 1.0
 * @description 用户
 * @date 2016年6月1日
 */
public class ApiUser implements Serializable {
	private static final long serialVersionUID = -1632393744255837723L;
	/** USERID **/
	private Long id;
	/** 用户名 **/
	private String username;
	/** 密码 **/
	private String password;
	/** 昵称 **/
	private String nickname;
	/** 真实姓名 **/
	private String realname;
	/** 生日 **/
	private Date birthday;//
	/** 性别,1代表男，2代表女, 0未知,保密 **/
	private String sex;
	/** 手机号 **/
	private String phone;
	/** 电子邮件 **/
	private String email;
	/** 第三方id **/
	private String openId;
	/** 第三方登录来源 **/
	private String source;
	/** 注册时间 **/
	private Date regisTime;
	/** 区域id **/
	private Integer regionId;
	/** 头像url **/
	private String portriat;
	/** 备注 **/
	private String remark;
	/** 最后登录时间 **/
	private Date lastLoginTime;
	/** 状态,1代表可登录，0代表禁用 **/
	private String status;

	public ApiUser() {

	}

	public ApiUser(String username) {
		this.username = username;
	}

	public Long getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}

	public String getNickname() {
		return nickname;
	}

	public String getRealname() {
		return realname;
	}

	public Date getBirthday() {
		return birthday;
	}

	public String getSex() {
		return sex;
	}

	public String getPhone() {
		return phone;
	}

	public String getEmail() {
		return email;
	}

	public String getOpenId() {
		return openId;
	}

	public String getSource() {
		return source;
	}

	public Date getRegisTime() {
		return regisTime;
	}

	public Integer getRegionId() {
		return regionId;
	}

	public String getPortriat() {
		return portriat;
	}

	public String getRemark() {
		return remark;
	}

	public Date getLastLoginTime() {
		return lastLoginTime;
	}

	public String getStatus() {
		return status;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setUsername(String username) {
		this.username = username == null ? null : username.trim();
	}

	public void setPassword(String password) {
		this.password = password == null ? null : password.trim();;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname == null ? null : nickname.trim();;;
	}

	public void setRealname(String realname) {
		this.realname = realname == null ? null : realname.trim();;;;
	}

	public void setBirthday(Date birthday) {
		if (birthday != null) {
			this.birthday = (Date) birthday.clone();
		} else {
			this.birthday = null;
		}
	}

	public void setSex(String sex) {
		this.sex = sex == null ? null : sex.trim();;;;;
	}

	public void setPhone(String phone) {
		this.phone = phone == null ? null : phone.trim();;;;;
	}

	public void setEmail(String email) {
		this.email = email == null ? null : email.trim();;;;;
	}

	public void setOpenId(String openId) {
		this.openId = openId == null ? null : openId.trim();;;;;
	}

	public void setSource(String source) {
		this.source = source == null ? null : source.trim();;;;;
	}

	public void setRegisTime(Date regisTime) {
		if (regisTime != null) {
			this.regisTime = (Date) regisTime.clone();
		} else {
			this.regisTime = null;
		}
	}

	public void setRegionId(Integer regionId) {
		this.regionId = regionId;
	}

	public void setPortriat(String portriat) {
		this.portriat = portriat == null ? null : portriat.trim();;;;;
	}

	public void setRemark(String remark) {
		this.remark = remark == null ? null : remark.trim();;;;;
	}

	public void setLastLoginTime(Date lastLoginTime) {
		if (lastLoginTime != null) {
			this.lastLoginTime = (Date) lastLoginTime.clone();
		} else {
			this.lastLoginTime = null;
		}
	}

	public void setStatus(String status) {
		this.status = status == null ? null : status.trim();;;;;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password="
				+ password + ", nickname=" + nickname + ", realname="
				+ realname + ", birthday=" + birthday + ", sex=" + sex
				+ ", phone=" + phone + ", email=" + email + ", openId="
				+ openId + ", source=" + source + ", regisTime=" + regisTime
				+ ", portriat=" + portriat + ", remark=" + remark
				+ ", lastLoginTime=" + lastLoginTime + ", status=" + status
				+ "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result
				+ ((nickname == null) ? 0 : nickname.hashCode());
		result = prime * result + ((phone == null) ? 0 : phone.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ApiUser other = (ApiUser) obj;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (nickname == null) {
			if (other.nickname != null)
				return false;
		} else if (!nickname.equals(other.nickname))
			return false;
		if (phone == null) {
			if (other.phone != null)
				return false;
		} else if (!phone.equals(other.phone))
			return false;
		return true;
	}

}
