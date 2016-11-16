package cn.heipiao.cp.shiro.pojo;

/**
 * 
 * 说明 :
 * 		角色Bean 因为heipiaoCp1.0版本权限管理是残疾的所以此对象后期可能会修改
 * 功能 : 
 *      a.	本质是 用户资源映射 
 * 使用规范 :
 * 		a.
 * @author chenwenye
 * @since 2016-6- heipiao1.0
 */
public final class Role {

	private Integer modelId;

	private Integer userId;

	private String modelCode;

	public Integer getModelId() {
		return modelId;
	}

	public void setModelId(Integer modelId) {
		this.modelId = modelId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getModelCode() {
		return modelCode;
	}

	public void setModelCode(String modelCode) {
		this.modelCode = modelCode;
	}

	public Role() {
	}

	
}
