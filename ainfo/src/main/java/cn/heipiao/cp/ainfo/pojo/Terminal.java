package cn.heipiao.cp.ainfo.pojo;

import java.io.Serializable;
import java.util.Date;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class Terminal implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2226753290033561384L;

	/**
	 * 主键id
	 */
	private Integer id;

	/**
	 * 终端编号
	 */
	private String number;

	/**
	 * 终端名称
	 */
	private String name;

	/**
	 * 终端IP地址
	 */
	private String ip;

	/**
	 * 拥有功能-对应字典-功能键类型IDs
	 */
	private String position;

	/**
	 * 使用区域-对应字典-区域类型ID
	 */
	private String area;

	/**
	 * 所属员工
	 */
	private String staffId;

	/**
	 * 终端状态 0-启用 1-禁用
	 */
	private Integer status;

	/**
	 * 终端描述
	 */
	private String desc;

	/**
	 * 创建时间
	 */
	private Date createTime;

	/**
	 * 更新时间
	 */
	private Date updateTime;
	

	public Integer getId() {
		return id;
	}



	public void setId(Integer id) {
		this.id = id;
	}



	public String getNumber() {
		return number;
	}



	public void setNumber(String number) {
		this.number = number;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public String getIp() {
		return ip;
	}



	public void setIp(String ip) {
		this.ip = ip;
	}



	public String getPosition() {
		return position;
	}



	public void setPosition(String position) {
		this.position = position;
	}



	public String getArea() {
		return area;
	}



	public void setArea(String area) {
		this.area = area;
	}



	public String getStaffId() {
		return staffId;
	}



	public void setStaffId(String staffId) {
		this.staffId = staffId;
	}



	public Integer getStatus() {
		return status;
	}



	public void setStatus(Integer status) {
		this.status = status;
	}



	public String getDesc() {
		return desc;
	}



	public void setDesc(String desc) {
		this.desc = desc;
	}



	public Date getCreateTime() {
		return createTime;
	}



	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}



	public Date getUpdateTime() {
		return updateTime;
	}



	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}



	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}
}
