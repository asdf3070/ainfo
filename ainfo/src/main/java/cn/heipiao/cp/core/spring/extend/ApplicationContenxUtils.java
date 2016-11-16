package cn.heipiao.cp.core.spring.extend;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

/**
 * 说明 : spring上下文操作工具类 
 * 功能 : 获取bean
 * 
 * @author chenwenye
 * @since 2016-6-18 heipiao1.0
 */
public class ApplicationContenxUtils implements ApplicationContextAware {

	/** spring上下文 **/
	private static ApplicationContext applicationContext;

	/**
	 * 作用: 根据class对象获取Bean
	 * 
	 * @param clazz
	 * @return
	 */
	public static <T> T getBean(Class<T> clazz) {
		return applicationContext == null ? null : applicationContext.getBean(clazz);
	}

	/**
	 * 作用: 根据beanId或name寻找bean
	 * 
	 * @param beanId
	 * @return
	 */
	public static Object getBean(String beanId) {
		return applicationContext == null ? null : applicationContext.getBean(beanId);
	}

	@Override
	public void setApplicationContext(ApplicationContext ac) throws BeansException {
		if (ac != null)
			applicationContext = ac;
	}

}
