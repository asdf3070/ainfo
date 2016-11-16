package cn.heipiao.cp.core.spring.extend;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 说明 : 代表配置文件
 * 功能 : 目前支持map键值对形式的存储
 * @author chenwenye
 * @since 2016-6-18  heipiao1.0
 */
public final class Config {
	
	/**
	 * 散列表 配置
	 */
	private static Map<String , String > mapCfg = new ConcurrentHashMap<String , String>(0x00000008);

	/**
	 * 作用: 通过settter注入给mapCfg赋值
	 * @param mapCfg
	 */
	public void setMapCfg(Map<String, String> mapCfg) {
		Config.mapCfg.putAll(mapCfg);
	}
	
	/**
	 * 作用: 获取散列表的值
	 * @param key 
	 * @return value
	 */
	public static String getMapProp(String key){
		return mapCfg.get(key);
	}
	
}
