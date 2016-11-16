<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String ctx = request.getContextPath();
	pageContext.setAttribute("ctx", ctx);
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
 <head>
  <title>登录 </title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="Author" CONTENT="liuyong">
  <link rel="stylesheet" type="text/css" charset="utf-8" href="<%=ctx%>/css/global.css"></link>
  <link rel="shortcut icon" href="<%=ctx%>/images/login_images/favicon.ico"/>
  <link rel="stylesheet" type="text/css" charset="utf-8" href="<%=ctx%>/css/login.css"></link>
  <link rel="stylesheet" type="text/css" charset="utf-8" href="<%=ctx%>/js/global/lib/easyui/themes/bootstrap/easyui.css"></link>
  <script type="text/javascript" src="<%=ctx%>/js/global/lib/jquery-1.10.1.js" charset="utf-8"></script>	
  <script type="text/javascript" src="<%=ctx%>/js/global/lib/easyui/jquery.easyui.min.js" charset="utf-8"></script>
  <script type="text/javascript" src="<%=ctx%>/js/global/call.js" charset="utf-8"></script>	
  <script type="text/javascript" src="<%=ctx%>/js/global/global.js" charset="utf-8"></script>
  <script type="text/javascript" src="<%=ctx%>/js/login.js" charset="utf-8"></script>	
  <script type="text/javascript" src="<%=ctx%>/js/global/eimp-ajax.js" charset="utf-8"></script>	
  
 </head>
 
 <body>
	<div class="header_bg"></div>
	<div class="login_warp">
		<div class="login_header">
			<div class="login_header_scr">
				<div class="login_header_logo" style="padding: 12px 0px;padding-bottom: 13px;">
					<!-- <img src="images/login_images/logo1.png" /> -->
				</div>
				<div class="login_header_relation_content">
					<span id="siyaa" style="color:#969696">
						<!-- 服务热线：0755-23912964 -->
					</span>
				</div>
				<div class="login_header_relation">
					<div>
						<!-- <img src="images/login_images/phone.png" /> -->
					</div>				
				</div>		
				<div style="clear:both">
					<!-- <img src="images/login_images/poster_img.png" /> -->
				</div>
			</div>
		</div>		
	</div>
	
	<div class="content_out">
		<div class="content_in">
			<div class="content_title">
				<span class="content_title_span">Ainfo</span>
			</div>
			<div class="login_header_logindiv_username">
				<div class="icodiv">
					<img src="<%=ctx%>/images/login_images/username.png" />						
				</div>
				<div class="inputdiv">
					<input type="text" id="username" class="formIpt formIpt-focus" size="32" maxlength="16"/>
				</div>
			</div>
			<div style="clear:both;"></div>
			<div class="login_header_logindiv_password">
				<div class="icodiv">
					<img src="<%=ctx%>/images/login_images/password.png" onclick="getLastError()"/>						
				</div>
				<div class="inputdiv">
					<input type="text"     id="pass" name="param"    class="formIpt formIpt-focus" size="32" maxlength="16" value="${msg}"/>
					<input type="password" id="password" name="pwd" class="formIpt formIpt-focus" size="32" maxlength="18" style="display:none"/>
				</div>
			</div>
			<div style="clear:both;"></div>
			<div class="login_header_logindiv_loginbtn">
				<!-- <img src="images/login_images/login_btn.png" id="loginbtn" /> -->
				<div id="loginbtn">登录</div>
			</div>
		</div>
	</div>
	
	<div class="bg">
		<!-- <img src="images/login_images/login_bg1.jpg"/> -->
	</div>
	<div class="footer">
		<span>
			<!-- 黑漂科技  版权所有  &copy;2016 服务热线: 0755-23912964  粤ICP备XXXXXXX号 -->
		</span>
	</div>
 </body>
</html>
