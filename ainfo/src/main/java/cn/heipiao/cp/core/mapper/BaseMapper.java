package cn.heipiao.cp.core.mapper;

import java.util.List;
import java.util.Map;

/**
 * 
 * 说明 : 提供最基础的crud实现 , 建议所有的mapper继承此接口 
 * 功能 : a. 提供最基础的crud实现 
 * 使用规范 : a. 所有的mapper接口继承就可使用
 * 
 * @author chenwenye
 * @since 2016-6-3 heipiao1.0
 */
public interface BaseMapper<T> {


	/**
	 * 
	 * 功能 : 主键查询
	 * 
	 * @param id - 不限定类型 ， 可以是number也可以是string
	 * @return
	 */
	<U> T selectById(U id);

	/**
	 * 
	 * 功能 : 
	 * 		列表查询 - 提供分页查询 ,后续版本可能提供排序
	 * @param map
	 * @return
	 * @see
	 */
	List<T> selectList(Map<String, ?> param);

	/**
	 * 
	 * 功能 : 根据主键update
	 * 
	 * @param pojo	- 可以是javaBean也可是map
	 */
	<U> int updateById(U pojo);

	/**
	 * 
	 * 功能 : 增
	 * 
	 * @param pojo	- 可以是javaBean也可是map
	 */
	<U> int insert(U pojo);


	/**
	 * 
	 * 功能 : 根据主键删除
	 * 
	 * @param id - 不限定类型 ， 可以是number也可以是string
	 * @return
	 */
	<U> int deleteById(U id);

}
