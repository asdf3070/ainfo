package cn.heipiao.cp.ainfo.constant;

import java.util.List;

public class PageSet<T> {
	
	private int pagenum;
	private int pagesize;
	private int totalitem;
	private int totalpage;
	private List<T> items;
	
	public PageSet(int pagenum, int pagesize, int totalitem, List<T> items) {
		if (pagenum < 1) {
			throw new IllegalArgumentException("pagenum cannot less than 1");
		}
		if (pagesize < 1) {
			throw new IllegalArgumentException("pagesize cannot less than 1");
		}
		this.pagenum = pagenum;
		this.pagesize = pagesize;
		this.totalitem = totalitem;
		this.totalpage = totalitem == 0 ? 0 : (totalitem / pagesize) + (totalitem % pagesize > 0 ? 1 : 0);
		this.items = items;
		
	}

	public int getPageNum() {
		return pagenum;
	}

	public int getPageSize() {
		return pagesize;
	}

	public int getTotalPage() {
		return totalpage;
	}
	
	public int getTotalItem() {
		return totalitem;
	}

	public List<T> getItems() {
		return items;
	}
	
}