package cn.heipiao.cp.sys.mapper;

import java.util.List;

import cn.heipiao.cp.core.mapper.BaseMapper;
import cn.heipiao.cp.sys.pojo.Meun;

/**
 * 
 * 说明 :
 * 		菜单展示mapper
 * @author chenwenye
 * @since 2016-6-12 heipiao1.0
 */
public interface MeunMapper extends BaseMapper<Meun>{
	
	/**
	 * 
	 * 功能 :
	 * 		根据Pid查询资源或菜单
	 * @param pid
	 * @return
	 */
	List<Meun> selectByPid(Integer pid);
	
}
