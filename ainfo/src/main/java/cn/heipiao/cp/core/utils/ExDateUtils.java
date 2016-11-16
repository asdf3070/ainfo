package cn.heipiao.cp.core.utils;

import java.util.Calendar;
import java.util.Locale;
import java.util.TimeZone;

/**
 * 扩展日期工具类
 * @author Chris
 *
 */
public class ExDateUtils {
	
	/**
	 * 默认时区：中国上海
	 */
	private static final TimeZone DEFAULT_TIME_ZONE = TimeZone.getTimeZone("Asia/Shanghai");
	
	/**
	 * 默认地区：中国，简单中文
	 * 与星期相当，一般无用
	 */
	private static final Locale DEFAULT_LOCALE = Locale.SIMPLIFIED_CHINESE;
	
	/**
	 * 获取默认时区、地区的系统当前时间
	 * @return java.util.Date
	 */
	public static java.util.Date getDate() {
		return getCalendar().getTime();
	}
	
	/**
	 * 获取默认时区、地区的系统当前时间
	 * @return java.sql.Date
	 */
	public static java.sql.Date getSqlDate() {
		return new java.sql.Date(getCalendar().getTimeInMillis());
	}
	
	/**
	 * 获取默认时区、地区的Calendar对象
	 * @return
	 */
	public static Calendar getCalendar() {
		return Calendar.getInstance(DEFAULT_TIME_ZONE, DEFAULT_LOCALE);
	}

}
