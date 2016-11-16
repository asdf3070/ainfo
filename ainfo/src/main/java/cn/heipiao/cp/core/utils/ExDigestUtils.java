package cn.heipiao.cp.core.utils;

import org.apache.commons.codec.digest.DigestUtils;

/**
 * 扩展apache项目中commons组件的摘要工具类
 * @author Chris
 *
 */
public class ExDigestUtils {
	
	/**
	 * 首部加盐：黑
	 */
	private static final String SALT_HEAD = "1518fc4aa7c0bc5b02622adb27ba00f3c64373b7";
	
	/**
	 * 尾部加盐：漂
	 */
	private static final String SALT_TAIL = "dc0601156313f7f1cf8ccb6d549ddab9d84a2831";
	
	/**
	 * 在原密码明文基础上首尾加盐
	 * @param txt
	 * @return
	 */
	public static String sha1Hex(String txt) {
		StringBuilder sb = new StringBuilder();
		sb.append(SALT_HEAD).append(txt).append(SALT_TAIL);
		return DigestUtils.sha1Hex(sb.toString());
	}

}
