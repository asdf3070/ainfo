package cn.heipiao.cp.sys.mapper;

import java.util.Date;
import java.util.List;
import java.util.Map;

import cn.heipiao.cp.core.mapper.BaseMapper;
import cn.heipiao.cp.sys.pojo.OperationLog;

/**
 * 
 * 说明 :
 * 		基础的日志操作相关crud
 * @author chenwenye
 * @since 2016-6-13 heipiao1.0
 */
public interface OperationLogMapper extends BaseMapper<OperationLog>{
	
	/**
	 * 
	 * 功能 :
	 * 		根据用户ID查询
	 * @param userId
	 * @return
	 */
	List<OperationLog> selectByUserId(String userId);
	
	/**
	 * 
	 * 功能 :
	 * 		根据某段操作时间查询
	 * @param start
	 * @param end
	 * @return
	 */
	List<OperationLog> selectByTime(Map<String , Date> params);
	
}