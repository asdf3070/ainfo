package cn.heipiao.cp.sys.pojo;

/**
 * 
 * 说明 :
 * 		菜单-资源Bean
 * @author chenwenye
 * @since 2016-6-12 heipiao1.0
 */
public final class Meun {
	
	/**
	 * 主键
	 */
	private Integer id;

	/**
	 * 父id
	 */
    private Integer pid;

    /**
     * 资源编码
     */
    private String code;

    /**
     * 资源名称
     */
    private String name;

    /**
     * 资源链接
     */
    private String url;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code == null ? null : code.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url == null ? null : url.trim();
    }

	@Override
	public String toString() {
		return "Meun [id=" + id + ", pid=" + pid + ", code=" + code + ", name=" + name + ", url=" + url + "]";
	}
    
}
