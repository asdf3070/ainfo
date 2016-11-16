package cn.heipiao.cp.shiro.encrypt;

import org.springframework.stereotype.Component;

import cn.heipiao.cp.core.utils.ExDigestUtils;

/**
 * 
 * 说明 :
 * 		Md5加密 加盐加密
 * @author chenwenye
 * @since 2016-5-30 heipiao1.0
 * @see DigestEncrypt
 */
@Component
public class HeiPiaoMd5DigestEncrypt implements DigestEncrypt {

	@Override
	public String encrypt(String value) {
		return ExDigestUtils.sha1Hex(value);
	}

	public static void main(String[] args) {
		//System.out.println(new HeiPiaoMd5DigestEncrypt().encrypt("123456"));
		//770933960d185fd5c323038494f06dc1120db857
		 //35a73214f7ac0d437da28db53a1f92d5244657e2
		System.out.println(new HeiPiaoMd5DigestEncrypt().encrypt("value"));
	}
	
}
