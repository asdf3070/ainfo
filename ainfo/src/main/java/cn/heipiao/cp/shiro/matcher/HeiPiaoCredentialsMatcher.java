package cn.heipiao.cp.shiro.matcher;

import javax.annotation.Resource;

import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.SimpleCredentialsMatcher;
import org.springframework.stereotype.Component;

import cn.heipiao.cp.shiro.encrypt.DigestEncrypt;

/**
 * 
 * 说明 :
 * @author chenwenye
 * @since 2016-5-30 heipiao1.0
 */
@Component("heiPiaoCredentialsMatcher")
public class HeiPiaoCredentialsMatcher extends SimpleCredentialsMatcher{

	@Resource
	private DigestEncrypt digestEncrypt;

	@Override
	public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) {

		UsernamePasswordToken uToken = (UsernamePasswordToken) token;//770933960d185fd5c323038494f06dc1120db857
																	 //35a73214f7ac0d437da28db53a1f92d5244657e2
		// 注意token.getPassword()拿到的是一个char[]，不能直接用toString()，它底层实现不是我们想的直接字符串，只能强转
		Object tokenCredentials = digestEncrypt.encrypt(new String(uToken.getPassword())); 
				//Encrypt.md5hash(String.valueOf(usertoken.getPassword()), usertoken.getUsername());
		Object accountCredentials = getCredentials(info);

		// 将密码加密与系统加密后的密码校验，内容一致就返回true,不一致就返回false
		return this.equals(tokenCredentials, accountCredentials);
	}

}
