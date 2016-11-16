package cn.heipiao.cp.sys.job;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import cn.heipiao.cp.core.vo.RespMsg;
import cn.heipiao.cp.httpclient.HeiPiaoHttpClientService;

/**
 * @说明 job基类 
 * @author chenwenye
 * @version heipiao1.0 2016年8月1日
 */
public class BaseJob {
	
	protected static final String GET = "GET";
	
	protected static final String POST = "POST";
	
	protected static final String PUT = "PUT";
	
	protected static final String DELETE = "DELETE";
	
	protected Logger log;
	
	@Resource
	private HeiPiaoHttpClientService httpClientService;
	
	public BaseJob() {
		this.log = LoggerFactory.getLogger(this.getClass());
	}
	
	/**
	 * @说明
	 *		统一执行函数
	 * @param url
	 * @param methodType
	 * @param jsonParams
	 * @return
	 */
	protected RespMsg<?> execute(String url , String methodType , String jsonParams){
		try{
			return httpClientService.apiExcute( url , methodType, jsonParams);
		}catch(Exception e){
			log.error(e.getMessage(),e);
			return null;
		}
	}
	
	/**
	 * @说明 判断job是否执行成功
	 * @param resp
	 * @return
	 */
	protected boolean isSuccess(RespMsg<?> resp) {
		if( resp != null ){
			if( resp.getStatus() == 0 ){
				return true;
			}
			log.error(resp.getErrMsg(), resp);
			return false;
		}
		log.error("apiServiceError");
		return false;
	}
	
}
