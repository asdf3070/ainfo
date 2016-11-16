package cn.heipiao.cp.sys.mapper;

import java.util.List;

import cn.heipiao.cp.core.mapper.BaseMapper;
import cn.heipiao.cp.sys.pojo.Entry;
import cn.heipiao.cp.sys.pojo.Group;

/**
 * 说明 :  群组mapper
 * @author chenwenye
 * @since 2016-7-7  heipiao1.0
 */
public interface GroupMapper extends BaseMapper<Group>{
	
	/**
	 * 作用: 根据UserId删除关联
	 * @param u
	 * @return
	 */
	<U> int deleteByUser(U u);
	
	/**
	 * 作用: 批量插入 - 关联userid
	 * @param u
	 * @return
	 */
	<U> int inserts(U u);
	
	/**
	 * 作用: 根据用户Id查询所属的群组
	 * @param userId
	 * @return
	 */
	List<Entry<String, String>> selectByUserId(String userId);
	
	/**
	 * 作用: 查询所有群组
	 * @return
	 */
	List<Entry<String, String>> selectAllGroup();
	
}