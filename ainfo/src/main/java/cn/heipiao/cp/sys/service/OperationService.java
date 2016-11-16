package cn.heipiao.cp.sys.service;

import java.util.Date;
import java.util.List;

import cn.heipiao.cp.sys.pojo.OperationLog;

/**
 * 
 * 说明 :
 * 		操作日志service
 * 功能 : 
 *      a.	记录操作日志
 *      b.	查询操作日志 - 根据操作用户或时间
 * @author chenwenye
 * @since 2016-6-13 heipiao1.0
 */
public interface OperationService {
	
	/**
	 * 
	 * 功能 :
	 * 		根据用户Id查询其操作日志
	 * @param id
	 * @return
	 */
	List<OperationLog> findByUserId(String id);
	
	/**
	 * 
	 * 功能 :
	 * 		记录操作日志
	 * @param log
	 * @return
	 */
	void insert(OperationLog log);
	
	/**
	 * 
	 * 功能 :
	 * 		根据操作时间查询操作日志
	 * @param start 起始时间
	 * @param end 结束时间
	 * @return
	 */
	List<OperationLog> findByTime(Date start,Date end);
	
}
