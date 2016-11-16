package cn.heipiao.cp.shiro.pojo;

import java.util.Date;
import java.util.List;

import cn.heipiao.cp.sys.pojo.Entry;

/**
 * 说明 : user - bean
 * @author chenwenye
 * @since 2016-6-21  heipiao1.0
 */
public final class User {
	
    private Integer id;

    private String username;

    private String realname;

    private transient String password;

    private String phonenum;

    private String email;

    private String sex;

    private Date registerTime;

    private String portriat;

    private String remarks;

    private Date lastLogintime;

    private String status;
    
    private List<Entry<String , String>> groups;	
    
    private String groupIds;	//其他业务字段,群组ids, 用   , 分割

    private List<Entry<String, String>> allGroup;	//其他业务字段,全部群组
    
	private List<Role> roles;
    
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getRealname() {
        return realname;
    }

    public void setRealname(String realname) {
        this.realname = realname == null ? null : realname.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public String getPhonenum() {
        return phonenum;
    }

    public void setPhonenum(String phonenum) {
        this.phonenum = phonenum == null ? null : phonenum.trim();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex == null ? null : sex.trim();
    }

    public Date getRegisterTime() {
        return registerTime;
    }

    public void setRegisterTime(Date registerTime) {
        this.registerTime = registerTime;
    }

    public String getPortriat() {
        return portriat;
    }

    public void setPortriat(String portriat) {
        this.portriat = portriat == null ? null : portriat.trim();
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks == null ? null : remarks.trim();
    }

    public Date getLastLogintime() {
        return lastLogintime;
    }

    public void setLastLogintime(Date lastLogintime) {
        this.lastLogintime = lastLogintime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

	public List<Entry<String, String>> getGroups() {
		return groups;
	}

	public void setGroups(List<Entry<String, String>> groups) {
		this.groups = groups;
	}

	public String getGroupIds() {
		return groupIds;
	}

	public void setGroupIds(String groupIds) {
		this.groupIds = groupIds;
	}

	public List<Entry<String, String>> getAllGroup() {
		return allGroup;
	}

	public void setAllGroup(List<Entry<String, String>> allGroup) {
		this.allGroup = allGroup;
	}

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}
	
}