package cn.heipiao.cp.quartz.simple;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @说明 quazrt执行注解 
 * @author chenwenye
 * @version heipiao1.0 2016年7月26日
 */
@Target( ElementType.METHOD )
@Retention ( RetentionPolicy.RUNTIME )
public @interface Execute {

	String value() default "" ;
	
}
