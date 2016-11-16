var roleid;
var url;
var urlParam = getParameters();
/*登录输入框*/
$(function() {
	$("#username").attr("placeholder", "用户名");
	$("#pass"    ).attr("placeholder", "密码");
	$("#password").attr("placeholder", "密码");
	// 登录名称
	$("#username").focus(function() {
		if ($(this).val() == '用户名') {
			$(this).val('');
		}
		$(".login_header_logindiv_username").css({
			border : "1px solid #32A4E6"
		});
		$("#username").css({
			border : "none"
		});
	});
	$("#username").blur(function() {
		if ($(this).val() == '') {
			$(this).val('用户名');
		}
		$(".login_header_logindiv_username").css({
			border : "1px solid #D0D0D0",
			borderBottom: "none"
		});
	});

	// 登录密码
	$("#password").blur(function() {
		if ($(this).val() == '') {
			$(this).hide();
			$("#pass").show();
		}
		$(".login_header_logindiv_password").css({
			border : "1px solid #D0D0D0"
		});
	});

	$("#pass").focus(function() {
		$(this).hide();
		$("#password").val('').show().focus();
		$(".login_header_logindiv_password").css({
			border : "1px solid #32A4E6"
		});
	});

	// 登录按钮绑定点击事件
	$("#loginbtn").click(function() {
		submit();
	});
	
	$("#siyaa").click(function(){
		location.href = "http://www.siyaa.cn";
	});
	

	var o = getCookie("LOGOUT");
	var u = getCookie("LOGIN_USERNAME");
	var p = getCookie("LOGIN_PASSWORD");
	if(o == 1){
		do{
			setCookie("LOGIN_USERNAME", "");
			setCookie("LOGIN_PASSWORD", "");
			u = getCookie("LOGIN_USERNAME");
			p = getCookie("LOGIN_PASSWORD");
			console.info("user logout, so delete account and password of cookie!");
		}while(u != undefined && u.length > 0 && p != undefined && p.length > 0);
	}
	if(u != undefined && u.length > 0 && p != undefined && p.length > 0 &&
			location.pathname != "/user/login"){
		$("#username").val(u);
		$("#password").val(p);
		submit();
	}
});


/* 按enter提交表单 */
document.onkeydown = function(e) {
	var username = $("#username").val();
	var keyCode = keypress(e);
	if (keyCode == 13) {
		submit();
	}
}

//创建用户选择登录角色弹出框并初始化用户登录角色
function createSelectRolePopup(data) {
	var select_role = $("<div id='select_role'></div>");
	for(var i = 0; i < data.length; i++) {
		var select_role_div = $("<div class='select_role_div' onclick='select_role_div_click("+data[i].id+",this)' ondblclick='select_role_div_dblclick("+data[i].id+")'>"+data[i].name+"</div>");
		select_role_div.appendTo(select_role);
	}
	select_role.appendTo($(document.body));
}

//角色选择点击事件
function select_role_div_click(rid,e) {
	$(".select_role_div").css('background', '#C6C6C6');
	$(e).css('background', '#FFFFF');
	roleid = rid;
}
//角色选择双击事件
function select_role_div_dblclick(rid) {
	roleid = rid;
	//submit_role();
}

//确定用户选择登录角色点击按钮点击事件
function submit_role() {
	if(roleid) {
		location.href = url + "&rid=" + roleid;
	} else {
		EIMP.window.show('请选择登录角色');
	}
}

/* 登录检查 */
function check(username, password) {
	if (trim(username) == '' || username == '用户名') {
		$("#username").focus();
		return false;
	}
	if (password == ' ') {
		$("#pass").hide();
		$("#password").show().focus();
		return false;
	}
	return true;
}

function submit(){
	var username = $("#username").val();
	var password = $("#password").val();
	var form = $("<form style='display:none;'>").attr("action","/user/login").attr("method","post");
	setCookie("LOGIN_USERNAME", username);
	setCookie("LOGIN_PASSWORD", password);
	form.append($("<input/>").attr("value", username).attr("name","param"));
	form.append($("<input/>").attr("value", password).attr("name","pwd"));
	$("body").append(form);
	form.submit();
}

/**
* 获取最后的错误
*/
function getLastError(){
	var cookieErrorDatas = getCookie("LAST_DATA");
	if(cookieErrorDatas != null && cookieErrorDatas != undefined && cookieErrorDatas.length > 0){
		var cookieErrorDatas = JSON.parse(cookieErrorDatas);
		var msg = "";
		for(var i=0; i<cookieErrorDatas.length; i++){
			var data = cookieErrorDatas[i];
			var s_intertime = "";
			var s_interface = "";
			var s_start = "<br><br>";
			if(data.time  != null && data.time != undefined){
				s_intertime = "调用时间：" + transtateTimestamp(data.time) + " " + data.time + "<br>";
			}
			if(data.url  != null && data.url != undefined){
				s_interface = "调用接口：" + data.url + "<br>";
			}
			if(i == 0) s_start = "";
			msg += s_start + s_intertime + s_interface + _E_EOOROR.MSG(data);
		}
		
		var html = "";
		html += '<style>';
		html += '.clean{';
		html += '	float: right;';
		html += '	margin: 5px;';
		html += '	padding: 5px;';
		html += '	position: absolute;';
		html += '	top: 40px;';
		html += '	left: 330px;';
		html += '	box-shadow: 0px 0px 7px -2px;';
		html += '	border-radius: 6px;';
		html += '	cursor: pointer;';
		html += '}';
		html += '</style>';
		html += '<div id="lastError_div">';
		html += '	<div class="clean" onclick="setCookie(\'LAST_DATA\', \'[]\');$(\'#errorInfo\').html(\'\');">清除</div>';
		html += '	<div id="errorInfo" style="padding: 10px;">' + msg + '</div>';
		html += '</div>';
		$(html).appendTo($(document.body));
		
		createDialogPopup('lastError_div', 387, 210, "最后的错误",function(){
			delPopul_div('lastError_div');
		});
	}
}