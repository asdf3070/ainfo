package cn.heipiao.cp.core.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.DispatcherServlet;

import com.alibaba.fastjson.JSONObject;

import ch.qos.logback.core.status.Status;
import cn.heipiao.cp.core.spring.extend.ApplicationContenxUtils;
import cn.heipiao.cp.core.vo.RespMsg;
import cn.heipiao.cp.httpclient.HeiPiaoHttpClientService;

public class ProxyAndDispatchServlet extends DispatcherServlet {

	//@Resource
	private HeiPiaoHttpClientService httpClientService;

	/** 日志 **/
	private static final Logger log = LoggerFactory.getLogger(ProxyAndDispatchServlet.class);

	/**
	 * UUID
	 */
	private static final long serialVersionUID = -774408542703128673L;

	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/json;charset=UTF-8");
		String uri = request.getRequestURI();

		if (StringUtils.contains(uri, "/api") || StringUtils.contains(uri, "/@")) {	//转发请求道api
			
			if( httpClientService == null ){
				httpClientService = (HeiPiaoHttpClientService) ApplicationContenxUtils.getBean("heiPiaoHttpClientService");
			}
			
			String resp =StringUtils.EMPTY;
			PrintWriter pw = response.getWriter();
			try {
				resp = httpClientService.apiExcute(request);
				
				pw.println(resp);
			} catch (Exception e) {
				log.error("api服务异常");
				log.error(e.getMessage());
				pw.println(JSONObject.toJSONString(new RespMsg<>(Status.ERROR, "apiServiceError")));
			}finally{
				if( pw != null ){
					pw.close();
				}
			}
		} else {	//通过springMVC处理
			super.service(request, response);
		}
		
	}

}
