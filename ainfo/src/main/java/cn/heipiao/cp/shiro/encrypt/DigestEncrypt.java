package cn.heipiao.cp.shiro.encrypt;

/**
 * 
 * 说明 : 摘要算法加密,一般实现有MD5,SHA1通过hash计算得到,结果唯一且不可逆; 
 * 功能 : 
 * 		a. 对敏感信息加密,eg:用户密码 b.
 * 			生成唯一标识/密钥; 
 * 		eg: 根据用户信息(ID/用户名),生成会话ID(SessionId) 
 * 使用规范 : 
 * 		a.
 * @author chenwenye
 * @since 2016-6- heipiao1.0
 */
public interface DigestEncrypt {

	/**
	 * 功能 : Hash加密
	 * @param value
	 * @return
	 */
	String encrypt(String value);

}
