<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String ctx = request.getContextPath();
	pageContext.setAttribute("ctx", ctx);
%>
<%@ taglib uri="http://shiro.apache.org/tags" prefix="shiro"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<title>Ainfo</title>
<meta http-equiv="pragma" content="no-cache"></meta>
<meta http-equiv="cache-control" content="no-cache"></meta>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="shortcut icon" href="../images/login_images/favicon.ico" />
<link rel="stylesheet" type="text/css" charset="utf-8" href="../css/global.css" />
<link rel="stylesheet" type="text/css" charset="utf-8" href="../css/main.css"></link>
<link rel="stylesheet" type="text/css" charset="utf-8" href="../js/global/lib/easyui/themes/bootstrap/easyui.css"></link>
<link rel="stylesheet" type="text/css" charset="utf-8" href="../js/global/lib/easyui/themes/icon.css"></link>

<script type="text/javascript" src="../js/global/lib/jquery-1.10.1.js" charset="utf-8"></script>
<script type="text/javascript" src="../js/global/lib/easyui/jquery.easyui.min.js" charset="utf-8"></script>
<script type="text/javascript" src="../js/global/call.js" charset="utf-8"></script>
<script type="text/javascript">

/**
 * 初始化系统配置
 */
$.ajax({
	url        : '/sys/param',
	type       : 'get',
	datatype   : 'json',  
	async      : false,
	contentType: 'application/json; charset=utf-8',
	success    : function(data, status, obj){
		setCookie("SYS_PARAMS", JSON.stringify(data.body));
		console.info("set system params is done. %o", data.body);
	}
});
</script>
<script type="text/javascript" src="../js/global/global.js" charset="utf-8"></script>
<script type="text/javascript" src="../js/global/eimp-ajax.js" charset="utf-8"></script>

</head>
<body class="easyui-layout">
<input type="hidden" id="currentChannelType" />

<!-- 左边布局 -->
<div class="main_left">
	<div class="main_left_head">
		<!-- Unnamed (形状) -->
		<div id="u192s" class="ax_default icon normal small_icon">
			<img id="u192_img" class="img" src="images/headimg/${sessionUser.portriat}" onload="imgLoad(this)"/>
			<!-- Unnamed () -->
			<div id="u193" class="text"
				style="display: none; visibility: hidden">
				<p id="cache14">
					<span id="cache15"></span>
				</p>
			</div>
		</div>
		<div id="u192" class="ax_default icon normal">
			<img id="u192_img" class="img" src="images/headimg/${sessionUser.portriat}" onload="imgLoad(this)"/>
			<!-- Unnamed () -->
			<div id="u193" class="text"
				style="display: none; visibility: hidden">
				<p id="cache14">
					<span id="cache15"></span>
				</p>
			</div>
		</div>
		<!-- Unnamed (矩形) -->
		<div id="u194" class="ax_default label normal">
			<div id="u194_div" class="normal"></div>
			<!-- Unnamed () -->
			<div id="u195" class="text" style="visibility: visible;">
				<p id="cache12">
					<span id="cache13">${sessionUser.username}</span>
				</p>
			</div>
		</div>
		<!-- Unnamed (矩形) -->
		<div id="u196" class="ax_default label normal"
			style="cursor: pointer;">
			<div id="u196_div" class=""></div>
			<!-- Unnamed () -->
			<div id="u197" class="text" style="visibility: visible;">
				<p>
					<span>${sessionUser.remarks }</span>
				</p>
			</div>
		</div>
		<div id="u198" class="ax_default primary_button normal"
			style="cursor: pointer;left: 10px">
			<div id="u198_div" class="normal"></div>
			<!-- Unnamed () -->
			<div id="u199" class="text" style="visibility: visible;">
				<p id="cache8">
					<span id="cache9">退出</span>
				</p>
			</div>
		</div>
	</div>

	<div class="main_left_menu">
		<shiro:hasPermission name="trem">
			<div class="main_menu" onclick="addTab('团队管理', '/page/team/index.html')">
				<img class="main_menu_logo " src="../images/main_images/u146.png" title="团队管理"/>
				<div class="main_menu_title">团队管理</div>
			</div>
		</shiro:hasPermission>
		<shiro:hasPermission name="staff">
			<div class="main_menu" onclick="addTab('员工管理', '/page/staff/index.html')">
				<img class="main_menu_logo " src="../images/main_images/u158.png" title="员工管理"/>
				<div class="main_menu_title">员工管理</div>
			</div>
		</shiro:hasPermission>
		<shiro:hasPermission name="terminal">
			<div class="main_menu" onclick="addTab('终端管理', '/page/terminal/index.html')">
				<img class="main_menu_logo " src="../images/main_images/u248.png" title="终端管理"/>
				<div class="main_menu_title">终端管理</div>
			</div>
		</shiro:hasPermission>
		<shiro:hasPermission name="forms">
			<div class="main_menu" onclick="addTab('报表中心', '/page/team/index.html')">
				<img class="main_menu_logo " src="../images/main_images/u302.png" title="报表中心"/>
				<div class="main_menu_title">报表中心</div>
			</div>
		</shiro:hasPermission>
		<shiro:hasPermission name="system">
		<!-- 系统配置 (固定在最后)-->
		<div class="main_menu" onclick="addTab('系统配置', '/page/system/index.html')">
			<img class="main_menu_logo " src="../images/main_images/u311.png" title="系统配置"/>
			<div class="main_menu_title">系统配置</div>
		</div>
		</shiro:hasPermission>
	</div>
</div>
<!-- 右边布局 -->
<div style="overflow: hidden;">
	<!-- 头部布局 -->
	<div class="main_header">
		<div class="main_header_warp">
			<div class="main_header_left">
				<span id="door-div" class="slide-trigger">
					<i class="icon-mc-door" onclick="codoor()"></i>
				</span>
				<div id="small_icon" class="small_icon_top">
					<img src="images/headimg/${sessionUser.portriat}" onload="imgLoad(this)"/>
				</div>
				<span id="uName_remarks" class="slide-trigger ax_default" style="padding-top: 3px; display:block">
					${sessionUser.username}-${sessionUser.remarks}
				</span>
				<div id="navigation" class="slide-trigger ax_default navigation" style="padding-top: 3px;">
					功能导航<i class="navigation_gt"></i>
				</div>
				<!-- 
				<span style="display:block;color:RGB(156,156,156);font-weight:400;font-size:16px;float:left;margin-left:8px;margin-top:1px;">
					6.2.4
				</span>
				 -->
				<div></div>
			</div>
			<div class="main_header_right">

				<div id="message-div" class="slide-trigger">
					<a href="javascript:void(0);"> <i class="icon-mc-message"></i>
					</a>
					<div id="u335" class="ax_default marker marker_hidden">
						<img id="u335_img-message" class="img "
							src="../images/main_images/u335.png" />
						<!-- Unnamed () -->
						<div id="u336" class="text"
							style="visibility: visible; top: 2px; transform-origin: 7px 7px 0px;">
							<span>8</span>
						</div>
					</div>
				</div>
				<div id="sign-div" class="slide-trigger">
					<a href="javascript:void(0);"> <i class="icon-mc-sign"></i>
					</a>
					<div id="u335" class="ax_default marker marker_hidden">
						<img id="u335_img-sign" class="img "
							src="../images/main_images/u337.png" />
						<!-- Unnamed () -->
						<div id="u336" class="text"
							style="visibility: visible; top: 2px; transform-origin: 7px 7px 0px;">
							<span>5</span>
						</div>
					</div>
				</div>
				<div id="warn-div" class="slide-trigger">
					<a href="javascript:void(0);"> <i class="icon-mc-warn"></i>
					</a>
					<div id="u335" class="ax_default marker marker_hidden">
						<img id="u335_img-sign" class="img "
							src="../images/main_images/u341.png" />
						<!-- Unnamed () -->
						<div id="u336" class="text"
							style="visibility: visible; top: 2px; transform-origin: 7px 7px 0px;">
							<span>1</span>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
	<!-- 中间布局 -->
	<div class="main_center">
		<div id="tab-box" class="easyui-tabs"></div>
	</div>
	<!-- 底部布局 -->
	<div class="main_footer">
		<span>黑漂科技 版权所有 &copy;2016 服务热线: 0755-23912964 粤ICP备XXXXXXX号</span>
	</div>
</div>
<div class="show_img_box" onclick="$(this).css('display', 'none')">
	<img id="show_img_box_img" onload="showImageOnload(this)"/>
</div>
<script type="text/javascript" src="../js/main.js" charset="utf-8"></script>
</body>
</html>