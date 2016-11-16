package cn.heipiao.cp.core.utils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;

/**
 * 说明 : cookies操作工具类 功能 : 操作cookies
 * 
 * @author chenwenye
 * @since 2016-6-21 heipiao1.0
 */
public final class CookiesUtils {

	public static String getCookieValue(HttpServletRequest request, String key) {

		if (StringUtils.isBlank(key)) {
			return StringUtils.EMPTY;
		}

		Cookie[] cookies = getCookies(request);

		for (Cookie cookie : cookies) {
			if (key.equals(cookie.getName())) {
				return cookie.getValue();
			}
		}

		return StringUtils.EMPTY;
	}

	public static Cookie getCookie(HttpServletRequest request, String key) {

		if (StringUtils.isBlank(key)) {
			return null;
		}

		Cookie[] cookies = getCookies(request);

		for (Cookie cookie : cookies) {
			if (key.equals(cookie.getName())) {
				return cookie;
			}
		}
		
		return null;

	}

	public static Cookie[] getCookies(HttpServletRequest request) {
		return request.getCookies();
	}

}
