package cn.heipiao.cp.sys.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

/**
 * 
 * 说明 : LogFilter代理生产类-解决Filter与spring容器不兼容问题
 * @author chenwenye
 * @since 2016-6-13 heipiao1.0
 */
public final class LogDelegatingFilterProxy implements	Filter{

	/**
	 * 目标Filter
	 */
	private String targetFilter;
	/**
	 * 代理Filter
	 */
    private Filter proxy;
	
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		this.targetFilter = filterConfig.getInitParameter("targetFilter");
		ServletContext servletContext = null;
		servletContext = filterConfig.getServletContext();
		WebApplicationContext wac = null;
		wac = WebApplicationContextUtils.getRequiredWebApplicationContext(servletContext);
		this.proxy = (Filter) wac.getBean(this.targetFilter);
		this.proxy.init(filterConfig);
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		proxy.doFilter(request, response, chain);
	}

	@Override
	public void destroy() {
	}
	
}
