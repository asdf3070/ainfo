package cn.heipiao.cp.sys.filter;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.Arrays;
import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;

import cn.heipiao.cp.core.constant.SysConstant;
import cn.heipiao.cp.shiro.pojo.SessionUser;
import cn.heipiao.cp.sys.mapper.LogMapper;
import cn.heipiao.cp.sys.pojo.Log;

/**
 * 
 * 说明 : 访问日志记录过滤器 功能 : a. 记录访问
 * 
 * @author chenwenye
 * @since 2016-6-13 heipiao1.0
 */
@Component("logFilter")
public final class LogFilter implements Filter {

	//private static final Logger log = LoggerFactory.getLogger(LogFilter.class);

	@Resource // 直接使用mapper操作不适用service操作是因为不需要事务的支持,只是单方面的保存访问日志
	private LogMapper logMapper;

	//private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");

	@Override
	public void doFilter(ServletRequest req, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		SessionUser curUser = null;
		if (!(req instanceof HttpServletRequest)) {
			chain.doFilter(req, response);
		} else if ((curUser = (SessionUser) ((HttpServletRequest) req).getSession().getAttribute(SysConstant.SESSION_TICKET)) != null 
				&& isLogReq((HttpServletRequest)req , FILTER_REQ) ) { // 当前用户已经登陆

			Log log = new Log();
			log.setUserId(Integer.valueOf(curUser.getId()));
			log.setIp(this.getIpAddr((HttpServletRequest) req));
			log.setInterfaceName(URLDecoder.decode(((HttpServletRequest) req).getRequestURL().toString(), "utf-8"));
			log.setTime(new Date());
			log.setNickname(curUser.getUsername());
			/*
			 * log.setContent(StringUtils.join("用户:", curUser.getUsername(),
			 * "/br 用户Id:" , log.getUserId() , "/br 访问接口:",
			 * log.getInterfaceName(), "/br 访问的系统时间:",
			 * sdf.format(log.getTime()), "/br 访问者IP:" , log.getIp()));
			 */
			logMapper.insert(log); // 记录访问日志
			int id = log.getId();
			req.setAttribute("logId", id);
			chain.doFilter(req, response);
		} else {
			chain.doFilter(req, response);
		}
	}

	/**
	 * 获取真实IP地址
	 * 
	 * @param request
	 *            页面请求
	 * @return IP地址
	 */
	private String getIpAddr(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_CLIENT_IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_X_FORWARDED_FOR");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return ip;
	}

	// bmp,jpg,tiff,gif,pcx,tga,exif,fpx,svg,psd,cdr,pcd,dxf,ufo,eps,ai,raw 常见图片格式

	private static final String[] FILTER_REQ = { "ico" , "css", "js", "html", "png", "bmp", "jpg", "tiff", "gif", "pcx",
			"tga", "exif", "fpx", "svg" , "psd" , "cdr" , "dxf" , "ufo" , "eps" , "ai" , "raw" };

	/**
	 * 判断当前请求是否需要过滤,
	 * 规则: 根据请求后缀判断 图片,html,js,css过滤处理
	 * 
	 * @param request
	 * @return
	 */
	private boolean isLogReq(HttpServletRequest request, String... filterUrl) {
		
		String [] _tail = request.getRequestURI().split("\\.");
		if( _tail.length > 0 && Arrays.asList(FILTER_REQ).contains(_tail[_tail.length - 1]) ){
			return false;
		}
		return true;
	}

	@Override
	public void destroy() {
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}
}
