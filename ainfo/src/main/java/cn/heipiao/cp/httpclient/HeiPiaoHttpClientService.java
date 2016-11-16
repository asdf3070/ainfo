
package cn.heipiao.cp.httpclient;

import java.io.InputStream;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections4.MapUtils;
import org.apache.commons.collections4.map.LinkedMap;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpEntityEnclosingRequestBase;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;

import cn.heipiao.cp.core.spring.extend.Config;
import cn.heipiao.cp.core.vo.RespMsg;
import cn.heipiao.cp.sys.mapper.LogMapper;
import cn.heipiao.cp.sys.pojo.Log;

/**
 * 说明 : 黑漂httpClient - 根据平台特有的请求方式访问api服务 功能 : 访问api服务,提供get，post，put，delete请求方式
 * 
 * @author chenwenye
 * @since 2016-6-15 heipiao1.0
 */
@Service("heiPiaoHttpClientService")
public class HeiPiaoHttpClientService {

	/** 日志 **/
	private static final Logger LOGGER = LoggerFactory.getLogger(HeiPiaoHttpClientService.class);

	@Resource
	private CloseableHttpClient httpClient;

	@Resource
	private RequestConfig requestConfig;
	
	@Resource // 直接使用mapper操作不适用service操作是因为不需要事务的支持,只是单方面的保存访问日志
	private LogMapper logMapper;
	
	private String body;

	/**
	 * 作用: 执行请求api的函数
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public String apiExcute(final HttpServletRequest request) throws Exception {
		String uri = request.getRequestURI();
		String params = StringUtils.contains(uri, "/api") ? request.getRequestURI().substring(4)
				: "";

		final String apiUrl = StringUtils.contains(uri, "/api") ? Config.getMapProp("heipiao.api.addr")
				: request.getRequestURL().toString().replaceAll("/@", "");
		
		final Integer logid = (Integer)request.getAttribute("logId");

		final String METHOD = request.getMethod();
		String resp = StringUtils.EMPTY;

		switch (METHOD) {

		case "GET":
			resp = this.doGet(StringUtils.join(apiUrl, params));
			break;

		case "DELETE":
			resp = this.doDelete(StringUtils.join(apiUrl, params));
			break;

		case "POST":
			resp = this.doCustomPost(StringUtils.join(apiUrl, params), request.getInputStream(), "utf-8");
			break;

		case "PUT":
			resp = this.doCustomPut(StringUtils.join(apiUrl, params), request.getInputStream(), "utf-8");
			break;

		default:
			break;

		}
		try{
			if(!"GET".equals(METHOD) && logid != null){
				Log log = logMapper.selectById(logid);
				log.setContent(resp);
				log.setInterfaceName(
						StringUtils.join("[", METHOD, "]", " - ", log.getInterfaceName(), " - ", params, this.body));
				logMapper.updateById(log);
			}
		}catch(Exception e){
			LOGGER.error("存储操作日志出错:id[{}]\r\nparams[{}]\r\nresp[{}]\r\n原因：{}", logid, params, resp, e.getMessage());
		}
		return resp;
	}

	/**
	 * 作用: 执行请求api的函数
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public RespMsg<?> apiExcute(final String url , final String METHOD, final String stringParams) throws Exception {

		final String apiUrl = Config.getMapProp("heipiao.api.addr");

		RespMsg<?> resp = null;
		
		String _resp = StringUtils.EMPTY;

		switch (METHOD) {

		case "GET":
			_resp = this.doGet(StringUtils.join(apiUrl, url));
			resp = JSONObject.parseObject(_resp, RespMsg.class);
			break;
		case "DELETE":
			_resp = this.doDelete(StringUtils.join(apiUrl, url));
			resp = JSONObject.parseObject(_resp, RespMsg.class);
			break;

		case "POST":
			_resp = this.doCustomPost(StringUtils.join(apiUrl, url),
					stringParams, "utf-8");
			resp = JSONObject.parseObject(_resp, RespMsg.class);
			break;

		case "PUT":
			_resp = this.doCustomPut(StringUtils.join(apiUrl, url),
					stringParams, "utf-8");
			resp = JSONObject.parseObject(_resp, RespMsg.class);
			break;

		default:
			break;

		}

		return resp;
	}
	
	/**
	 * 执行get请求
	 * 
	 * @param url
	 * @return
	 * @throws Exception
	 */
	public String doGet(String url, Map<String, Object> params, String encode) throws Exception {
		LOGGER.info("执行GET请求，URL = {}", url);
		if (!MapUtils.isEmpty(params)) {
			URIBuilder builder = new URIBuilder(url);
			for (Map.Entry<String, Object> entry : params.entrySet()) {
				builder.setParameter(entry.getKey(), entry.getValue().toString());
			}
			url = builder.build().toString();
		}
		// 创建http GET请求
		HttpGet httpGet = new HttpGet(url);
		this.addRestHerader(httpGet);
		httpGet.setConfig(requestConfig);
		return this.closeAndReturn(httpGet, encode);
	}

	public String doGet(String url) throws Exception {
		return this.doGet(url, null);
	}

	/**
	 * 带参数的get请求
	 * 
	 * @param url
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public String doGet(String url, Map<String, Object> params) throws Exception {
		return this.doGet(url, params, "utf-8");
	}

	/**
	 * 执行POST请求
	 * 
	 * @param url
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public String doPost(String url, Map<String, Object> params, String encode) throws Exception {
		LOGGER.info("执行POST请求，URL = {}", url);
		HttpPost httpPost = new HttpPost(url);	//创建http POST请求
		if (!MapUtils.isEmpty(params)) {
			LOGGER.info("参数Map = {}", params.toString());
			this.setFormParam(httpPost, params);
		}
		this.addRestHerader(httpPost);
		httpPost.setConfig(requestConfig);

		return this.closeAndReturn(httpPost, encode);
	}

	/**
	 * 执行POST请求
	 * 
	 * @param url
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public String doPost(String url, Map<String, Object> params) throws Exception {
		return this.doPost(url, params, "UTF-8");
	}

	public String doPostJson(String url, String json) throws Exception {
		// 创建http POST请求
		HttpPost httpPost = new HttpPost(url);
		httpPost.setConfig(requestConfig);
		this.addRestHerader(httpPost);
		if (!StringUtils.isBlank(json)) {
			// 设置请求体为 字符串
			StringEntity stringEntity = new StringEntity(json, "UTF-8");
			httpPost.setEntity(stringEntity);
		}

		return this.closeAndReturn(httpPost, "UTF-8");
	}

	public String doCustomPost(String url, InputStream body, String enc) throws Exception {
		LOGGER.info("执行Post请求，URL = {}", url);
		// LOGGER.info("参数Body = {}" , new String(IOUtils.toByteArray(body) ,
		// "utf-8"));
		HttpPost httpPost = new HttpPost(url);
		this.addRestHerader(httpPost);
		httpPost.setConfig(requestConfig);
		this.setBodyParam(httpPost, body);

		CloseableHttpResponse response = null;
		try {
			// 执行请求
			response = httpClient.execute(httpPost);
			// 判断返回状态是否为200
			if (response.getStatusLine().getStatusCode() == 200) {
				return EntityUtils.toString(response.getEntity(), enc);
			}
		} finally {
			if (response != null) {
				response.close();
			}
		}
		return null;
	}
	
	public String doCustomPost(String url, String body, String enc) throws Exception {
		LOGGER.info("执行Post请求，URL = {}", url);
		// LOGGER.info("参数Body = {}" , new String(IOUtils.toByteArray(body) ,
		// "utf-8"));
		HttpPost httpPost = new HttpPost(url);
		this.addRestHerader(httpPost);
		httpPost.setConfig(requestConfig);
		if( body != null )
		this.setBodyParam(httpPost, body);

		CloseableHttpResponse response = null;
		try {
			// 执行请求
			response = httpClient.execute(httpPost);
			// 判断返回状态是否为200
			if (response.getStatusLine().getStatusCode() == 200) {
				return EntityUtils.toString(response.getEntity(), enc);
			}
		} finally {
			if (response != null) {
				response.close();
			}
		}
		return null;
	}

	/**
	 * 作用:添加固定的头信息 - jersey框架验证
	 * 
	 * @param http
	 *            请求
	 */
	private void addRestHerader(HttpRequestBase request) {
		request.addHeader("Accept", "application/json");
		request.addHeader("Content-Type", "application/json");
		request.addHeader("user-info",Config.getMapProp("heipiao.cp.ip"));
	}

	/**
	 * 作用: 关闭http连接并返回请求结果
	 * 
	 * @param http
	 *            请求
	 * @throws Exception
	 */
	private String closeAndReturn(HttpRequestBase request, String enc) throws Exception {
		CloseableHttpResponse response = null;
		try {
			// 执行请求
			response = httpClient.execute(request);
			// 判断返回状态是否为200
			if (response.getStatusLine().getStatusCode() == 200) {
				return EntityUtils.toString(response.getEntity(), enc);
			}
		} finally {
			if (response != null) {
				response.close();
			}
		}
		return null;
	}

	/**
	 * 作用: 设置请求参数到body
	 * 
	 * @param http
	 *            到请求body
	 * @param params
	 * @throws Exception
	 */
	private void setFormParam(HttpEntityEnclosingRequestBase request, Map<String, Object> params) throws Exception {
		List<NameValuePair> parameters = new LinkedList<NameValuePair>();

		/**
		 * 将map参数存进parameters
		 */
		for (Entry<String, Object> param : params.entrySet()) {
			parameters.add(new BasicNameValuePair(param.getKey(), param.getValue().toString()));
		}

		/**
		 * 设置requestBody
		 */
		HttpEntity entity = new UrlEncodedFormEntity(parameters);
		request.setEntity(entity);
	}

	/**
	 * 作用: 设置请求参数到body
	 * 
	 * @param http
	 *            到请求body
	 * @param params
	 * @throws Exception
	 */
	private void setBodyParam(HttpEntityEnclosingRequestBase request, InputStream body) throws Exception {
		/**
		 * 设置requestBody
		 */
		String body0 = new String(IOUtils.toByteArray(body), "utf-8");
		this.body = body0;
		LOGGER.info("body{}", body0);
		HttpEntity entity = new StringEntity(body0, "utf-8");
		request.setEntity(entity);
	}
	
	/**
	 * 作用: 设置请求参数到body
	 * 
	 * @param http
	 *            到请求body
	 * @param params
	 * @throws Exception
	 */
	private void setBodyParam(HttpEntityEnclosingRequestBase request, String body) throws Exception {
		/**
		 * 设置requestBody
		 */
		LOGGER.info("body{}", body);
		HttpEntity entity = new StringEntity(body, "utf-8");
		request.setEntity(entity);
	}

	/**
	 * 
	 * 作用: 执行Put请求
	 * 
	 * @param url
	 *            请求路径
	 * @return
	 * @throws Exception
	 */
	public String doPut(String url) throws Exception {
		return this.doPut(url, new LinkedMap<String, Object>());
	}

	/**
	 * 
	 * 作用: 执行Put请求
	 * 
	 * @param url
	 *            请求路径
	 * @param params
	 *            请求参数
	 * @return
	 * @throws Exception
	 */
	public String doPut(String url, Map<String, Object> params) throws Exception {
		return this.doPut(url, params, "UTF-8");
	}

	/**
	 * 
	 * 作用: 执行Put请求
	 * 
	 * @param url
	 *            请求路径
	 * @param params
	 *            参数
	 * @param enc
	 *            响应编码
	 * @return
	 * @throws Exception
	 */
	public String doPut(String url, Map<String, Object> params, String enc) throws Exception {
		LOGGER.info("执行PUT请求，URL = {}", url);
		LOGGER.info("参数Map = {}", params.toString());
		HttpPut httpPut = new HttpPut(url);
		this.addRestHerader(httpPut);
		httpPut.setConfig(requestConfig);
		this.setFormParam(httpPut, params);

		return this.closeAndReturn(httpPut, enc);
	}

	/**
	 * 
	 * 作用: 执行delete请求
	 * 
	 * @param url
	 *            请求地址
	 * @return
	 * @throws Exception
	 */
	public String doDelete(String url) throws Exception {
		return this.doDelete(url, null);
	}

	/**
	 * 
	 * 作用: 执行delete请求
	 * 
	 * @param url
	 *            请求地址
	 * @param params
	 *            请求参数
	 * @return
	 * @throws Exception
	 */
	public String doDelete(String url, Map<String, Object> params) throws Exception {
		return this.doDelete(url, params, "UTF-8");
	}

	/**
	 * 
	 * 作用: 执行delete请求
	 * 
	 * @param url
	 *            请求路径
	 * @param params
	 *            请求参数
	 * @param enc
	 *            响应编码
	 * @return
	 * @throws Exception
	 */
	public String doDelete(String url, Map<String, Object> params, String enc) throws Exception {
		LOGGER.info("执行DELETE请求，URL = {}", url);
		if (!MapUtils.isEmpty(params)) {
			LOGGER.info("参数Map = {}", params.toString());
			URIBuilder builder = new URIBuilder(url);
			for (Map.Entry<String, Object> entry : params.entrySet()) {
				builder.setParameter(entry.getKey(), entry.getValue().toString());
			}
			url = builder.build().toString();
		}
		HttpDelete httpDelete = new HttpDelete(url);
		this.addRestHerader(httpDelete);
		httpDelete.setConfig(requestConfig);
		return this.closeAndReturn(httpDelete, enc);
	}

	/**
	 * 作用: 执行put请求 , 区别:一般request的参数是放在form里,而这里的参数是inputStream里的
	 * 
	 * @param url
	 * @param body
	 * @param enc
	 * @return
	 */
	public String doCustomPut(String url, InputStream body, String enc) throws Exception {
		LOGGER.info("执行Put请求，URL = {}", url);
		// LOGGER.info("参数Body = {}" , new String(IOUtils.toByteArray(body) ,
		// "utf-8"));
		HttpPut httpPut = new HttpPut(url);
		this.addRestHerader(httpPut);
		httpPut.setConfig(requestConfig);
		this.setBodyParam(httpPut, body);

		CloseableHttpResponse response = null;
		try {
			// 执行请求
			response = httpClient.execute(httpPut);
			// 判断返回状态是否为200
			if (response.getStatusLine().getStatusCode() == 200) {
				return EntityUtils.toString(response.getEntity(), enc);
			}
		} finally {
			if (response != null) {
				response.close();
			}
		}
		return null;

	}
	
	public String doCustomPut(String url, String body, String enc) throws Exception {
		LOGGER.info("执行Put请求，URL = {}", url);
		// LOGGER.info("参数Body = {}" , new String(IOUtils.toByteArray(body) ,
		// "utf-8"));
		HttpPut httpPut = new HttpPut(url);
		this.addRestHerader(httpPut);
		httpPut.setConfig(requestConfig);
		if( body != null )
		this.setBodyParam(httpPut, body);

		CloseableHttpResponse response = null;
		try {
			// 执行请求
			response = httpClient.execute(httpPut);
			// 判断返回状态是否为200
			if (response.getStatusLine().getStatusCode() == 200) {
				return EntityUtils.toString(response.getEntity(), enc);
			}
		} finally {
			if (response != null) {
				response.close();
			}
		}
		return null;

	}

	public HeiPiaoHttpClientService() {
	}

}
