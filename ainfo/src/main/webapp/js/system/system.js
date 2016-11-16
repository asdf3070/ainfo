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
	initButtonFun();
	setSystemStatus();
	initDiscover();
	initSwitch();
});

/**
 * 随窗口大小不同，计算位置并设置 
 */
function setButtonLineSize(){
	$(".page_body").css("height", ((bodyHeight * 0.8) - 80 - 20 - 10) + "px");
	$(".run_img_first").css("margin", ($(".status").height() * 0.08) + "px " + 45 + "px");
}

/**
 * 初始化按钮状态
 */
function initButtonFun(){
	$(".status_button").mouseover(function(){
		var buttonName = $.trim($(this).html());
		if(buttonName == "关　闭"){
			$(this).css("background-color", "#333");
		}
	});
	
	$(".status_button").mouseout(function(){
		var buttonName = $.trim($(this).html());
		if(buttonName == "关　闭"){
			$(this).css("background-color", "#777");
		}
	});
	
	$(".validate_button").mouseover(function(){
		$(this).css("background-color", "#333");
	});
	
	$(".validate_button").mouseout(function(){
		$(this).css("background-color", "#777");
	});
	
	$(".validate_button").click(function(){
		if(statusButtonName == "关　闭"){
			changeTab("#status_change_div", "#status_validate_div");
		}
		if(statusButtonName == "开　启"){
			doStart();
		}
	});

	$("#ossTest").click(function(){
		ossTest();
	});	
	
}

/**
 * 初始化关闭原因
 */
function initChangeReason(){
	$("#change_reason_area").html("");
	for(var i=0; i<chanageReasonData.length; i++){
		var item = chanageReasonData[i];
		html = "";
		html += '<div class="change_reason_items" onmouseover="groupOnMouseOver(this)" value="' + item.value + '">';
		html += '	<div class="point" style="margin: 5px;"></div>';
		html += '	' + item.name;
		html += '</div>';
		$("#change_reason_area").append($(html));
	}
	
}

/**
 * 选择群组鼠标悬浮事件
 * @param obj
 */
function groupOnMouseOver(obj){
	$(".change_reason_items").removeClass("items_select");
	$(obj).addClass("items_select");
}

//===========================================================================
var closeId = "";
var statusButtonName = "";
function sysOperate(obj){
	changeTab("#status_validate_div", "#status_show_div");
	statusButtonName = $.trim($(obj).html());
}
function doStop(){
	var stopObj = $("#status_show_div");
	systemStatusData.status = 0;
	setSystemStatus();
	changeTab(stopObj, "#status_change_div");
}
function doStart(){
	var stopObj = $("#status_show_div");
	systemStatusData.status = 1;
	setSystemStatus();
	changeTab(stopObj, "#status_validate_div");
}
function changeTab(showId, hiddenId){
	$(hiddenId).css("display", "none");
	closeId = hiddenId;
	$(showId).fadeIn();
	$(showId).fadeIn("slow");
	$(showId).fadeIn(3000);
}

function closeTab(obj){
	changeTab(closeId, obj);
}
//===========================================================================

/**
 * 初始化当前系统状态
 */
function setSystemStatus(){
	if(systemStatusData.status){
		$("#run_info").text("系统运行中");
		$("#status_button").text("关　闭");
		$(".run_img_first").css("background-color", "#80E680");
		$(".run_img_second").css("background-color", "#00CC00");
		var cdArray = systemStatusData.consecutive_days.split(",");
		$("#consecutive_days").text("系统已经连续运行：" + cdArray[0] + "小时" + cdArray[1] + "分" + cdArray[2] + "秒");
		$("#start_time").text("系统上次启动时间：" + systemStatusData.start_time);
		$("#sys_status").text("系统当前运行状态：" + systemStatusData.sys_status);
	}else{
		$("#run_info").text("系统维护中");
		$("#status_button").text("开　启");
		$(".run_img_first").css("background-color", "#FF8080");
		$(".run_img_second").css("background-color", "#FF0000");
		var sddArray = systemStatusData.shuting_down_days.split(",");
		$("#consecutive_days").text("系统已经停止运行：" + sddArray[0] + "小时" + sddArray[1] + "分" + sddArray[2] + "秒");
		$("#start_time").text("系统上次启动时间：" + systemStatusData.shut_down_last_time);
		$("#sys_status").text("系统当前运行状态：" + systemStatusData.shut_down_user_use + "用户尝试登录");
	}
	//初始化关闭原因
	initChangeReason();
}

/**
 * 初始化开关配置
 */
function initSwitch(){
	var sys_switch = systemStatusData.sys_switch;
	var lineContainer = $("#sys_status_id");
	for(var i=0; i<sys_switch.length; i++){
		var line = sys_switch[i];
		var html = "";
		var idPrefix = "#sbwb_";
		html += '<div class="tc_content_line">';
		html += '	<div class="point"></div>';
		html += '	<span class="tc_text">' + line.name + '</span>';
		html += '	<div id="sb_' + i + '" class="switch_button">';
		html += '		<div id="sbwb_' + i + '" class="sb_switch_bar" key="' + line.key + '">';
		html += '			<span id="sbs_' + i + '" class="sb_switch" onclick="onSwitch(' + i + ', \'' + idPrefix + '\')"></span>';
		html += '		</div>';
		html += '	</div>';
		html += '</div>';
		lineContainer.append($(html));
		lineContainer.css("height", (lineContainer.height() + 41)+"px");
		changeSwitch($(idPrefix + i), line.on);
	}
	
}

/**
 * 初始化发现配置
 */
function initDiscover(){
	var lineContainer = $("#discover_id");
	for(var i=0; i<discoverData.length; i++){
		var line = discoverData[i];
		var html = "";
		var idPrefix = "#dsbwb_";
		html += '<div class="tc_content_line">';
		html += '	<div class="point"></div>';
		html += '	<span class="tc_text" onclick="updateDiscover(' + i + ')" style="cursor: pointer;">' + line.name + '</span>';
		html += '	<div id="dsb_' + i + '" class="switch_button">';
		html += '		<div id="dsbwb_' + i + '" class="sb_switch_bar" id="' + line.id + '">';
		html += '			<span id="dsbs_' + i + '" class="sb_switch" onclick="onSwitch(' + i + ', \'' + idPrefix + '\')"></span>';
		html += '		</div>';
		html += '	</div>';
		html += '</div>';
		lineContainer.append($(html));
		lineContainer.css("height", (lineContainer.height() + 41)+"px");
		changeSwitch($(idPrefix + i), line.on);
	}
}
/**
 * 对某项功能进行开关设置
 */
function onSwitch(index, idPrefix){
	var sObj = $(idPrefix + index);
	var sStyle = changeSwitch(sObj);
	if(sStyle == 1){
		changeSwitch(sObj, 0);
	}else{
		changeSwitch(sObj, 1);
	}
}

/**
 * 开关动画
 * on: 1=开; 0=关; undefined=获取当前开关状态
 */
function changeSwitch(obj, on){
	var speed = 20;
	if(obj.length > 0){
		if(on != undefined && on != null){
			if(on){
				cssDynamicVary(obj, "left" ,  2, 22, speed);
				cssDynamicVary(obj, "width", 46, 26, speed);
			}else{
				cssDynamicVary(obj, "left" , 22,  2, speed);
				cssDynamicVary(obj, "width", 26, 46, speed);
			}
		}else{
			var left = obj.css("left");
			if(left == "2px"){
				return 0;
			}else{
				return 1;
			}
		}
	}
}
/**
 * 收放动画
 * on: 1=放下; 0=收起; undefined=获取当前开关状态
 */
function changePutOpenSwitch(obj, id){
	var speed = 0.5;
	var contentObj = $(id);
	var contentHeight = contentObj.height();
	if(contentHeight > 0){
		$(obj).removeClass("po_put");
		$(obj).addClass("po_open");
		cssDynamicVary(contentObj, "height" ,  contentHeight, 0, speed);
	}else{
		var divs = $(id + " > div");
		if(divs.length > 0){
			var height = $(divs[0]).outerHeight() * divs.length;
			cssDynamicVary(contentObj, "height" ,  contentHeight, height, speed);
			$(obj).removeClass("po_open");
			$(obj).addClass("po_put");
		}
	}
}

function newDiscover(){
	userauth(discoverNewData);
}
function updateDiscover(index){
	var obj = discoverData[index];
	if(obj.id != undefined && obj.id != null && (obj.id + "").length > 0){
		currentUpdateId = obj.id;
		if(obj.icon.indexOf(RES_DISC_URL) == -1){
			obj.icon = RES_DISC_URL + obj.icon;
		}
		userauth(obj);
	}else{
		_E.window.show("此项有问题哦！暂时不能修改，终于有机会找专业人事诊断了");
	}
}

function userauth(obj){
	var html = $("<div id='discover_div' style='padding:0; margin: 0;'>" +
				"<table style='padding: 0; margin: 15px 30px 0px 30px; border: 0; font-size: 12px; color:#333;'>" +
					"<tr>" +
						"<td align='center' width='60px'>名称：</td>" +
						"<td align='left' width='150px'>" +
						"	<input id='realName_input' type='text' class='dInput' value='" + obj.name + "' maxlength='16'/>" +
						"</td>" +
						"<td align='center'></td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' width='60px'>说明：</td>" +
						"<td align='left' width='150px'>" +
						"	<input id='phone_input'  type='text' class='dInput' value='" + obj.desc + "'/>" +
						"</td>" +
						"<td align='center'></td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' width='60px'>类型：</td>" +
						"<td align='left' width='150px'>" +
						"	<input id='discoverType_input'  type='text' class='dInput' style='width:253px;' value='" + obj.type + "' maxlength='18'/>" +
						"</td>" +
						"<td align='center'></td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' width='60px' id='val_title'>链接：</td>" +
						"<td align='left' width='150px'>" +
						"	<input id='idNumber_input'  type='text' class='dInput' value='" + obj.val + "' maxlength='18'/>" +
						"</td>" +
						"<td align='center'></td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' width='60px'>图标：</td>" +
						"<td align='left' width='150px'>" +
						'	<img id="img_0" class="img " src="' + obj.icon + '" tabindex="0" style="outline: none; width: 64px; height: 64px; border: #ddd solid 1px;">' +
						"</td>" +
						"<td align='center'></td>" +
					"</tr>" +
				"</table>" +
			"</div>");
	$(html).appendTo($(document.body));
	var discoverTypeString = "链接,应用";
	var discoverTypeArray = [];
	for(var i=0; i<discoverTypeString.split(",").length; i++){
		var discoverTypeItem = {
	    	"text" : discoverTypeString.split(",")[i],
	    	"value": i
	    };
		if(i == obj.type){
			discoverTypeItem.selected = true;
			$("#val_title").text(discoverTypeItem.text + "：");
		}
		discoverTypeArray.push(discoverTypeItem);
	}
	createcombobox('discoverType_input', discoverTypeArray, function(selObj){
		$("#val_title").text(discoverTypeString.split(",")[selObj.value] + "：");
	});
	
	createDialogPopup('discover_div', 390, 290, "发现模块配置",function(){
		var params = {
			uid : $(obj).attr("key"),
			realname : $("#realName_input").val(),
			idcard : $("#idNumber_input").val() 
		};
		AJAX.users.authUser(params, function(data){
			_E.window.show("恭喜！实名认证成功")
			getData();
			delPopul_div('userauth_div');
		}, function(data){
			_E.window.show("实名认证失败，请稍候再试！")
			console.info("errorData:", data);
		});
	});
	
	createUpload();
}

var systemStatusData={
	'consecutive_days': '2000,20,20',            // 系统已经连续运行
	'start_time': '2016-08-10 18:00',            // 系统上次启动时间
	'sys_status': 3,                             // 系统当前运行状态
	'status': 1,                                 // 总体状态 1-启动状态 0-关闭状态
	'shuting_down_days': '2000,20,20',           // 系统已经停止运行
	'shut_down_last_time': '2016-08-10 18:00',   // 系统上次启动时间
	'shut_down_user_use': 35000,                 // 系统上次启动时间
	'sys_switch':[
	    {
	    	'key' : 'S001',
	    	'name': '允许用户注册（如果关闭则不允许用户注册，客户端仅支持登录）',
	    	'on': 1                              // 开关 1-开 0-关
	    },
	    {
	    	'key' : 'S002',
	    	'name': '启用充值功能',
	    	'on': 0
	    },
	    {
	    	'key' : 'S003',
	    	'name': '开放消息定制',
	    	'on': 1
	    },{
	    	'key' : 'S004',
	    	'name': 'S004',
	    	'on': 1
	    },
	    {
	    	'key' : 'S005',
	    	'name': 'S005',
	    	'on': 0
	    },
	    {
	    	'key' : 'S006',
	    	'name': 'S006',
	    	'on': 1
	    },{
	    	'key' : 'S007',
	    	'name': 'S007',
	    	'on': 1
	    },
	    {
	    	'key' : 'S008',
	    	'name': 'S008',
	    	'on': 0
	    },
	    {
	    	'key' : 'S009',
	    	'name': 'S009',
	    	'on': 1
	    }
	]
}
var discoverNewData =  {
	'name': '',
	'desc': '',
	'type': 0,
	'val' : '',
	'icon': '../../images/system_images/u2640.png',
	'on': 0
}
var discoverData = [
    {
    	'id'  : 0,
    	'name': '调漂技巧',
    	'desc': '汇集无限大神调漂技巧',
    	'type': 0,                                               // 类型 0-链接 1-应用
    	'val' : 'http://find.heipiaola.com/find/jiqiao.htm',
    	'icon': '0/717355FF-CCC8-C598-AFA6-13B0C5F385D4.png',
    	'on': 1                                                  // 开关 1-开 0-关
    },
    {
    	'id'  : 1,
    	'name': '民间饵料配方',
    	'desc': '。。。',
    	'type': 1,
    	'val' : 'http://find.heipiaola.com/find/erliao.html',
    	'icon': '1/E227E09C-693F-B0DD-89EA-6F34264987F6.png',
    	'on': 0
    },
    {
    	'id'  : 2,
    	'name': '民间饵料配方',
    	'desc': '。。。',
    	'type': 0,
    	'val' : 'http://find.heipiaola.com/find/erliao.html',
    	'icon': '2/BA3C932F-4B6E-A5C2-5A1C-8DA24066B6CB.png',
    	'on': 0
    },
    {
    	'id'  : 3,
    	'name': '民间饵料配方',
    	'desc': "",
    	'type': 1,
    	'val' : 'http://find.heipiaola.com/find/erliao.html',
    	'icon': '3/DE775687-5536-7902-A24D-EC60FDE63DDB.png',
    	'on': 0
    }  
]

var chanageReasonData = [
    {
    	'name': '例行维护',
    	'value': 0
    },
    {
    	'name': '重大更新',
    	'value': 1
    },
    {
    	'name': '营销活动',
    	'value': 2
    },
    {
    	'name': '配合政策',
    	'value': 3
    },
    {
    	'name': '机房故障',
    	'value': 4
    }
]