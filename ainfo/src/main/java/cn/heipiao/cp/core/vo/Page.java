package cn.heipiao.cp.core.vo;

/**
 * 说明 :  分页对象
 * @author chenwenye
 * @since 2016-7-7  heipiao1.0
 */
public final class Page {
	
	public Integer start;
	
	public Integer size;
	
	public Page() {}
	
	/**
	 * 默认构造器
	 */
	public Page(Integer start , Integer size){
		if( start != null && start > 0 )
		this.start = start - 1;
		if( size != null && size > 0 )
		this.size = size;
	}
	
}
