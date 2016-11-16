package cn.heipiao.cp.cache.service;

/**
 * 
 * 说明 :
 * 		缓存service;以key-value方式存储
 * 功能 : 
 *      a.	缓存数据
 *      b.	代替HttpSession缓存会话数据
 * @author chenwenye
 * @since 2016-6-7 heipiao1.0
 * @param <T>-数据类型
 */
public interface CacheService<T> {
	
	/**
	 * 功能 :
	 * 		获取数据
	 * @param key
	 * @return
	 */
	T getValue(String key);
	
	/**
	 * 功能 :
	 * 		存放数据
	 * @param key
	 * @param value
	 */
	void put(String key, T value);
	
	/**
	 * 
	 * 功能 :
	 * 		删除数据
	 * @param key
	 */
	void remove(String key);
	
}
