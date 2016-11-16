package cn.heipiao.cp.sys.service;

import java.util.List;

/**
 * 
 * 说明 :
 * 		菜单service
 * 功能 : 
 *      a.	展示菜单-菜单查询
 *      b.	资源查询
 * @author chenwenye
 * @since 2016-6-12 heipiao1.0
 */
public interface MeunService {
	
	/**
	 * 
	 * 功能 :
	 * 		查询一级菜单列表
	 * @return
	 */
	List<String> getMeunUrlList();
	
}
