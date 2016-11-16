package cn.heipiao.cp.cache.service.impl;

import javax.annotation.Resource;

import org.springframework.cache.ehcache.EhCacheCacheManager;
import org.springframework.stereotype.Service;

import cn.heipiao.cp.cache.service.CacheService;

/**
 * 
 * 说明 :
 * 		Ehcache方式实现缓存
 * @author chenwenye
 * @since 2016-6- heipiao1.0
 * @param <T>
 */
@Service
public class EhcacheServiceImp<T> implements CacheService<T> {
	
	/**  默认缓存名称  **/
	private static final String DEFAULT_CACHE_NAME = "heipiaoDefaultCache";
	
	@Resource
	private EhCacheCacheManager cacheCacheManager;
	
	@SuppressWarnings("unchecked")
	@Override
	public T getValue(String key) {
		try{
		return (T)cacheCacheManager.getCache(DEFAULT_CACHE_NAME).get(key);
		}catch(Exception e){
			return null;
		}
	}

	@Override
	public void put(String key, T value) {
		cacheCacheManager.getCache(DEFAULT_CACHE_NAME).put(key, value);
	}

	@Override
	public void remove(String key) {
		cacheCacheManager.getCache(DEFAULT_CACHE_NAME).evict(key);
	}

}
