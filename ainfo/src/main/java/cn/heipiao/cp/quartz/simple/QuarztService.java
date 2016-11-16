package cn.heipiao.cp.quartz.simple;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @说明 定时服务基类 
 * @author chenwenye
 * @version heipiao1.0 2016年7月26日
 */
public abstract class QuarztService {
	
	private final Logger log;
	
	/**
	 * @说明 启动函数
	 */
	public final void execute(){
		Method [] methods = this.getClass().getDeclaredMethods();
		//Execute execute = null;
		for (Method method : methods) {
			method.setAccessible(true);
			//if( ( execute = method.getAnnotation(Execute.class) ) != null ){
			if( method.getAnnotation(Execute.class) != null ){
				try {
					method.invoke(this);
				} catch (IllegalAccessException e) {
					log.error(e.getMessage(),e);
				} catch (IllegalArgumentException e) {
					log.error(e.getMessage(),e);
				} catch (InvocationTargetException e) {
					log.error(e.getMessage(),e);
				}
			}
		}
	}
	
	public QuarztService() {
		log = LoggerFactory.getLogger(this.getClass());
	}
	
}
