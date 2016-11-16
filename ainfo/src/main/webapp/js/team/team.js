var bodyHeight;
var bodyWidth;
var urlParam = {};

$(document).ready(function() {
	bodyHeight = document.body.offsetHeight;
	bodyWidth  = document.body.offsetWidth;
	// 获取页面参数
	urlParam = getParameters();
	
	// 设置底部的位置
	setButtonLineSize();
	$(window).on('resize', function(){
		bodyHeight = document.body.offsetHeight;
		bodyWidth  = document.body.offsetWidth;
		setButtonLineSize();
	});
	//初始化标签功能
	initLabelFun();
	//初始化成员权限
	initRoleDataModle();
	//加载团队列表
	statusGet(1, "body > div.slable_area > div:nth-child(2)");
});
var lstatus = 1;
function statusGet(s, obj){
	lstatus = s;
	getdata();
	$(".slable").css("background", "#333333");
	$(obj).css("background", "rgba(0, 204, 255, 1)");
}
/**
 * 查询团队成员
 */
function getdata(){
	listClearn();
	AJAX.team.list("/1/300/" + lstatus, function(ret){
		var teams = ret.body;
		showUserData(teams);
	});
}

/**
 * 统一处理用户数据的显示
 */
function showUserData(teams){
	var html = "";
	for( var i = 0; i <teams.length ; ++i ){
		var teamData = pareaData(teams[i]);	//赋值
		var name = teamData.realname == undefined ? teamData.username : teamData.realname;
		var phone= teamData.phonenum;
		html += '<div class="check_main_field" onclick=findById(' + teamData.id + '); >';
		html += '<div class="check_main_field_header">';
		html += '<img id="img_' + i + '" src="' + teamData.portriat + '" onload="imgLoad(this)">';
		html += '</div>';
		html += '<div class="check_main_field_text"">' + name + '</div>';
		html += '<div class="check_main_field_text">' + phone + '</div>';
		html += '</div>';
		
	}
	$("#u488").append(html);
	//如果图片加载不成功则使用，默认图像
	$('img').error(function(){
	    $(this).attr('src',"../../images/main_images/u192_mouseOver.png");
	})
}

function listClearn(){	//团队成员列表清空
	$("#u488").empty();
}
/**
 * 统一处理处理用户返回的数据
 */
function pareaData(uData){
	if(uData.remarks == undefined){
		uData.remarks = "";
	}
	return uData;
}

function findById(id){
	AJAX.team.userInfo("/"+id, function(ret){
		var user = pareaData(ret.body);
		$("#userId").attr("value",user.id);
		$("#headImg").attr("src", user.portriat);
		$("#u531_input").attr("value",user.realname == undefined ? "" : user.realname);
		$("#u545_input").attr("value",user.phonenum == undefined ? "" : user.phonenum);
		$("#u555_input").attr("value",user.email == undefined ? "" : user.email);
		$("#u580_input").text(user.remarks == undefined ? "" : user.remarks);
		var status = user.status == 1 ? '禁  用' : '启  用';
		var sex = user.sex == 1 ? '男' : '女';
		$("#sex").attr("key",user.status);
		$("#sex").empty();
		$("#sex").append(sex);
		
		$("#cache93").text(status);
		$("#cache93").attr("key", user.status);	//修改状态功能
		
		
		var html = "";
		
		var roles = user.roles;	//用户对应的权限 : modelId,userId,modelCode
		var allRoles = $("#u505 div");
		
		for( var n = 0 ; n < allRoles.length ; ++n ){
			 $(allRoles[n]).attr("has",0);
			 $(allRoles[n])[0].has = 0
			 $(allRoles[n]).css("background-color", "rgb(255, 255, 255)");
		}
		
		for( var j = 0 ; j < allRoles.length ; j++ ){
			for( var k = 0; k < roles.length ; ++k ){
				console.log("role的值:", roles[k].modelId);
				if( $(allRoles[j]).attr("role") == roles[k].modelId ){	//相同的模板
					$(allRoles[j]).attr("has",1);
					$(allRoles[j])[0].has = 1;
					$(allRoles[j]).css("background-color", "rgba(0, 204, 255, 1)");
					break;
				}
			}
		}
		
		
		$("#cache7").append(html);
		
		var allGroup = user.allGroup;
		
		var userGroups = user.groups;
		var html0 = "";
		var has;	//判断用户是否含有标签;
		for( var i = 0; i < allGroup.length ; ++i ){
			
			if(isContainGroup( userGroups , allGroup[i].value ) ){
				html0 += '<div class="items" onclick="changeGroup(this)" style="background-color:rgba(0, 204, 255, 1);" has="1" val='+allGroup[i].value+' >' + allGroup[i].key + '</div>';
			}
			else{
				html0 += '<div class="items" onclick="changeGroup(this)" has="0" val='+allGroup[i].value+' >' + allGroup[i].key + '</div>';
			}
		}
		$("#u568_div").empty();	//清空群组标签
		$("#u568_div").append(html0);
		
	});
}

function saveUser(){
	var allRoles = $("#u505 div");
	
	var role;
	
	var userRole = new Array();
	for( var i = 0 ; i < allRoles.length ; ++i ){
		if( $(allRoles[i]).attr("has") == 1 ){
			role = {
				modelId : $(allRoles[i]).attr("role"),
				userId : $("#userId").val(),
				modelCode : $(allRoles[i]).attr("code")
			};
			userRole[i] = role;
		}
	}
	
	var _data = {
		id : $("#userId").val(),
		realname : $("#u531_input").val(),
		phonenum : $("#u545_input").val(),
		email : $("#u555_input").val(),
		sex : $("#sex").attr("val"),	//男:1 , 女:0
		remarks : $("#u580_input").html(),
		groupIds : getGroups(),	//群组ID用 , 分割
		roles : userRole
	};	//user对象;
	var data = JSON.stringify(_data);
	$.ajax({
        url : '/team/update',
        type : 'post',
        data: data,
        traditional:true,
        datatype:"json",  
        contentType: "application/json; charset=utf-8",
        success: function(){
        	_E.window.show("修改成功！")
        }
    });
	
	/*AJAX.team.save(data ,function(){
		alert(yes);
		//成功回调函数
	});*/
	
}

function changgeRemarks(obj){
	$("#u580_input").html($(obj).val());
}

/**
 * 标签亮灯事件
 * @param tag
 */
var groupLigth = groupOnMouseOver;

/**
 * 群组标签表更事件
 * @param tar
 */
function changeGroup(tar){
	if( tar.has ){
		tar.has = 0;
		$(tar).attr("has",0);
		$(tar).css("background-color", "rgb(255, 255, 255)");
	}
	else{
		tar.has = 1;
		$(tar).attr("has",1);
		$(tar).css("background-color", "rgba(0, 204, 255, 1)");
	}
}

/**
 * 改变性别事件
 * @param tar
 */
function changeSex(tar){
	if( tar.val ){
		tar.val = 0;
		$(tar).attr("val",0);
		$(tar).html("女");
	}
	else{
		tar.val = 1;
		$(tar).attr("val",1);
		$(tar).html("男");
	}
}

function updatePassword(){
	
			var html = "";
			html += "<div id='new_pwd_div'>";
			html += "	<center style='padding-top:25px'>";
			html += 	"新的密码 : <input id='newPwd1' type='password' style='width:250px;height:25px;' value='' maxlength='18'/><br>";
			html += 	"确认密码 : <input id='newPwd2' type='password' style='width:250px;height:25px;' value='' maxlength='18'/>";
			html += "	</center>";
			html += "</div>";
			$(html).appendTo($(document.body));
			
			createDialogPopup('new_pwd_div', 387, 190, "修改新密码",function(){
				var pwd1= $("#newPwd1").val();
				var pwd2= $("#newPwd2").val();
				if(pwd1 == pwd2){
					var params = {
						id : $("#userId").val(),
						password : pwd1
					};
					AJAX.team.pwd(JSON.stringify(params), function(data){
						_E.window.show("修改密码成功")
						//delPopul_div('new_pwd_div');
						$("#new_pwd_div").panel('close');
						$("#new_pwd_div").remove();
					}, function(data){
						_E.window.show("修改密码失败，请稍候再试！")
						$("#new_pwd_div").panel('close');
						$("#new_pwd_div").remove();
						console.info("errorData:", data);
					});
				}else{
					_E.window.show("您两次密码不一致，请重新输入！");
					$("#newPwd1").val("");
					$("#newPwd2").val("");
				}
			});
			
}

function changgeRole(tar){
	if( tar.has ){
		tar.has = 0;
		$(tar).attr("has",0);
		$(tar).css("background-color", "rgb(255, 255, 255)");
	}
	else{
		tar.has = 1;
		$(tar).attr("has",1);
		$(tar).css("background-color", "rgba(0, 204, 255, 1)");
	}
}

/**
 * 获取页面中用户的群组标签的id
 * 用,拼接
 */
function getGroups(){
	var groupIds = "";
	var groups = $("#u568_div div");
	for( var i = 0; i < groups.length ; ++i  ){
		if( $(groups[i]).attr("has") == 1 ){
			groupIds += ( $(groups[i]).attr("val") + ",");	//所has属性 == 1 ; 拼接该群组id
		}
	}
	return groupIds;
}


/**
 * 判断用户是否含有此群租
 * @param groups - 用户所拥有的群组
 * @param tagerId - 目标群组Id
 */
function isContainGroup(groups , tagerId){
	for( var i = 0 ; i < groups.length ; ++i ){
		if( groups[i].value == tagerId ){
			return true;
		}
	}
}


/** 授权或取消权限 **/
function permission(){
	
	var userId;
	var permissionId;
	var permissionCode;
	var type;	//授权 : type = 'on' , 取消授权 : type='off'
	AJAX.team.permission("/"+userId + "/" + permissionId + "/" + permissionCode + "/" + type , function(ret){
		//授权/取消授权执行成功
	} );
	
}

function setEmptyTeamList(){
	$("#u488").html("");
	pondCount = 0;
}

function setButtonLineSize(){
	//$("#u1128_div")  .css("width", (bodyWidth - 280) + "px");
	//设置“按区域分类”外框
	$("#u488")      .css("height",(bodyHeight - 200)+ "px");
	$("#u520")      .css("height",(bodyHeight - 200)+ "px");
	$("#u520_div")  .css("height",(bodyHeight - 200)+ "px"); 
	$("#u505")      .css("height",(bodyHeight - 200)+ "px");
}

/**
 * 初始化标签功能
 * 包括：色彩及各种事件
 */
function initLabelFun(){
	//设置搜索框placeholder 
	$("#u531_input").attr("placeholder", "姓名-可登陆");
	$("#u545_input").attr("placeholder", "手机-可登陆");
	$("#u555_input").attr("placeholder", "邮箱-可登陆");
	$("#u580_input").attr("placeholder", "备注");
	$("#u504_input").attr("placeholder", "输入用户名或者手机号查询，回车查询");
	onMouseChangeCss("#u538", "#u538_div", 1, "background-color", "rgba(0, 204, 255, 1)", "rgb(255, 255, 255)");
	onMouseChangeCss("#u540", "#u540_div", 1, "background-color", "rgba(0, 204, 255, 1)", "rgb(255, 255, 255)");
	onMouseChangeCss("#u617", "#u617_img", 2, "src", "../../images/frame_images/u698_mouseOver.png", "../../images/frame_images/u698.png");
	onMouseChangeCss("#u621", "#u621_img", 2, "src", "../../images/frame_images/u698_mouseOver.png", "../../images/frame_images/u698.png");

	//如果图片加载不成功则使用，默认图像
	$('img').error(function(){
	    $(this).attr('src',"../../images/main_images/u192_mouseOver.png");
	})
	
	$("#u504_input").bind('keydown', function(e) {
		
		var params = $("#u504_input").val();
		console.log(params);
		//执行搜索
		if(key13(e)){
			if(params.length > 0){
				AJAX.team.search("/" + params , function(ret){
					listClearn();
					//成功回调函数
					var teams = ret.body;	//团队成员列表
					showUserData(teams);
				});
			}else{
				getdata();
			}
		}
	});
}

/**
 * 选择群组鼠标悬浮事件
 * @param obj
 */
function groupOnMouseOver(obj){
	$(".items").css("background-color", "rgb(255, 255, 255)");
	$(obj).css("background-color", "rgba(0, 204, 255, 1)");
}

/**
 * 指定塘主
 */
var currQueryUserParam = {
	'type'     : 0,
	'pagesize' : 12,
	'pagenum'  : 1,
	'orderRule': 'registimedesc'
};
function editAuthentication(){
	//分页查询会员信息列表
	currQueryUserParam.type = 0;
	currQueryUserParam.pagenum = 1;
	AJAX.users.query(currQueryUserParam, function(ret){
		console.info("users.list success", ret);
		var rows = ret.body;
		var html = "";
		html += '<div id="editAuthentication_dialog">';
		html += '	<div class="check_search">';
		html += '		<input id="check_search_input" class="check_search_input" type="text" value="" placeholder="请输入用户你昵称、手机号码查询">';
		html += '		<img class="check_search_button" src="../../images/frame_images/u709.png" onclick="searchUser()">';
		html += '	</div>';
		html += '	<div id="check_main" class="check_main">';
		html += '		<!--动态增加用户数据-->';
		html += '	</div>';
		html += '</div>';
		$(html).appendTo($(document.body));
		
		createDialogPopupOnlyCancel('editAuthentication_dialog', 400, 600, "添加团队成员");
		queryUser();
		$("#check_main").bind('scroll', function() {
			console.info("scrollTop:", $("#check_main").scrollTop());
			var currScrolledHeight = $("#check_main").scrollTop() + $("#check_main").height();
			var divDocumentHeight  = $("#check_main")[0].scrollHeight;
			console.info("currScrolledHeight: "+currScrolledHeight+" divDocumentHeight: "+divDocumentHeight);
	        if(currScrolledHeight > divDocumentHeight) {
				console.info("scroll 1");
				currQueryUserParam.pagenum++;
				queryUser();
			} else if($("#check_main").scrollTop() <= 0) {
				console.info("scroll 2");
			}
	    });
	}, function(ret){
		console.info("users.list error", ret);
	});
}

//根据用户名或手机号匹配查询用户
function searchUser(){
	keyword = $.trim($("#check_search_input").val());
	if(keyword.length > 0){
		currQueryUserParam.keyword = keyword;
		currQueryUserParam.type = 1;
		$("#check_main").html("");
		queryUser();
	}
}
//
function queryUser(){
	AJAX.users.query(currQueryUserParam, function(ret){
		console.info("users.conditions success", ret);
		var rows = ret.body.data;
		if(rows.length > 0){
			for(var i=0; i<rows.length; i++){
				var row = rows[i];
				/*if(row.portriat.substr(0, 4) == "WXIN"){
					row.portriat = "http://wx.qlogo.cn/mmopen/" + row.portriat.substr(4);
				}*/
				html = "";
				html += '		<div class="check_main_field" key="'+row.id+'" onclick="addTeam(this)">';
				html += '			<div class="check_main_field_header">';
				html += '				<img src="' + row.portriat + '" onload="imgLoad(this)"/>';
				html += '			</div>';
				html += '			<div class="check_main_field_text" style="margin-top: 15px;" title="' + row.nickname + '">' + row.nickname + '</div>';
				html += '			<img style="width: 13px; float: left; margin: 20px 5px 0px 40px;" src="../../images/frame_images/u604.png">';
				html += '			<div class="check_main_field_text" style="margin-top: 15px;">' + row.username + '</div>';
				html += '		</div>';
				$(html).appendTo($("#check_main"));
			}
		}
	}, function(ret){
		console.info("users.conditions error", ret);
	});
}

/**
 * 团队引入功能 - 单个引入
 * @param user
 */
function addTeam(user){
	var params = {
		_ids : $(user).attr("key")
	}
	AJAX.team.add(JSON.stringify(params) , function(ret){
		getdata();
	});
}

/**
 * 禁用用户
 */
function forbidden(){
	var show = $("#cache93").attr("key") ? '启用' : '禁用';
	var userId = $("#userId").val();
	var status = $("#cache93").attr("key") == 1 ? 0 : 1;
	_E.window.confirm("您确认要"+show+"其操作吗？", function(){
		AJAX.team.status("/"+userId +"/"+ status , function(){
			//成功回调函数
			var text = $("#cache93").attr("key") == 1 ? '启用' : '禁用';
			$("#cache93").html(text);
			var key = $("#cache93").attr("key") == 1 ? 0 : 1;
			$("#cache93").attr("key", key);
			getdata();
		});
	}, function(){
		console.info("NO");
	});
}
/**
 * 离职用户
 */
function dimission(){
	_E.window.confirm("您确认要设置其为离职状态吗？", function(){
		AJAX.team.status("/"+$("#userId").val() +"/"+ 2 , function(){
			//成功回调函数
			$("#u621").attr("style", "background-color: rgb(0, 204, 255)");
			getdata();
		});
	}, function(){
		console.info("NO");
	});
}

function showSearch(){
	if($("#u501").css("visibility") == "hidden"){
		$("#u501").css("visibility", "visible");
	}else{
		$("#u501").css("visibility", "hidden");
	}
}

function key13(e){
	var keyCode = keypress(e);
	if(keyCode == 13) {
		return true;
	}
}

/**
 * 初始化成员权限
 */
function initRoleDataModle(){
	for(var i=0; i<roleDataModle.length; i++){
		var role = roleDataModle[i].role;
		if(typeof role != 'undefined'){
			var html = "";
			html += '<div role="'+role+'" pid="'+roleDataModle[i].pid + '" path="' + roleDataModle[i].path + '" code="'+roleDataModle[i].code+'" class="items role" onclick="changgeRole(this)">';
			html += '	<img src="' + roleDataModle[i].img + '" />' + roleDataModle[i].name + '';
			html += '</div>';
			$("#u505").append(html);
		}
	}
}

var roleDataModle = [
	{
		'name': '团队管理',
		'img' : '../../images/team_images/p1.png',	
		'role': 2,
		'pid' : 0,
		'path': '/page/team/index.html',
		'code': 'trem'
	},
	{
		'name': '员工管理',
		'img' : '../../images/team_images/p2.png',
		'role': 3,
		'pid' : 0,
		'path': '/page/staff/index.html',
		'code': 'staff'
	},
	{
		'name': '终端管理',
		'img' : '../../images/team_images/p7.png',
		'role': 4,
		'pid' : 0,
		'path': '/page/terminal/index.html',
		'code': 'terminal'
	},
	{
		'name':'报表中心',
		'img':'../../images/team_images/p29.png',
		'role': 5,
		'pid' : 0,
		'path': '/page/forms/index.html',
		'code': 'forms'
	},
	{
		'name':'系统配置',
		'img':'../../images/team_images/p30.png',
		'role': 99,
		'pid' : 0,
		'path': '/page/system/index.html',
		'code': 'system'
	}
	
]





//<img src="../../images/team_images/p0.png" />数据看板<br>
//<img src="../../images/team_images/p1.png" />团队管理<br>
//<img src="../../images/team_images/p2.png" />会员管理<br>
//<img src="../../images/team_images/p3.png" />合伙人库<br>
//<img src="../../images/team_images/p4.png" />钓场管理<br>
//<img src="../../images/team_images/p5.png" />内容管理<br>
//<img src="../../images/team_images/p6.png" />账务管理<br>
//<img src="../../images/team_images/p7.png" />营销管理<br>
//<img src="../../images/team_images/p25.png" />广告管理<br>
//<img src="../../images/team_images/p26.png" />预警管理<br>
//<img src="../../images/team_images/p8.png" />通知管理<br>
//<img src="../../images/team_images/p28.png" />日志管理<br>
//<img src="../../images/team_images/p29.png" />报表中心<br>
//<img src="../../images/team_images/p30.png" />系统配置<br>