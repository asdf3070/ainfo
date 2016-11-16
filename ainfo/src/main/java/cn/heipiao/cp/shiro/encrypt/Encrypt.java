package cn.heipiao.cp.shiro.encrypt;

/**
 * 
 * 说明 :
 * 		编码加密/解密接口,一般实现有 base64 , urlEncode
 * 功能 : 
 *      a.	将字符串通过编码加密,解密确保信息安全
 * 使用规范 :
 * 		a. 通常用于数据传输明文加密
 * @author chenwenye
 * @since 2016-5-30 heipiao1.0
 */
public interface Encrypt {
	
	/**
	 * 加密
	 * 
	 * @param value
	 * @return
	 */
	String encrypt(String value);

	/**
	 * 加密
	 * 
	 * @param value
	 * @param enc
	 *            编码
	 * @return
	 */
	String encrypt(String value, String enc);

	/**
	 * 解密
	 * 
	 * @param value
	 * @return
	 */
	String decrypt(String value);

	/**
	 * 解密
	 * 
	 * @param value
	 * @param enc
	 *            编码
	 * @return
	 */
	String decrypt(String value, String enc);

}
