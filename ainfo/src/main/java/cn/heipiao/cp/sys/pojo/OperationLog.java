package cn.heipiao.cp.sys.pojo;

import java.util.Date;

/**
 * 
 * 说明 :
 * 		操作日志bean
 * @author chenwenye
 * @since 2016-6-13 heipiao1.0
 */
public final class OperationLog {
	/**
	 * 主键
	 */
    private Integer id;

    /**
     * 用户ID
     */
    private Integer userId;

    /**
     * 用户昵称
     */
    private String nickname;

    /**
     * 操作时间
     */
    private Date operateTime;

    /**
     * 操作内容
     */
    private String content;

    /**
     * 接口名称
     */
    private String interfaceName;

    /**
     * IP地址
     */
    private String ip;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname == null ? "" : nickname.trim();
    }

    public Date getOperateTime() {
        return operateTime;
    }

    public void setOperateTime(Date operateTime) {
        this.operateTime = operateTime == null ? new Date() : operateTime;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? "" : content.trim();
    }

    public String getInterfaceName() {
        return interfaceName;
    }

    public void setInterfaceName(String interfaceName) {
        this.interfaceName = interfaceName == null ? "" : interfaceName.trim();
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip == null ? "" : ip.trim();
    }
}