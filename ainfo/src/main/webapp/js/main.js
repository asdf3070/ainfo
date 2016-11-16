var OStsData = {};
var dataProv = {};
var dataCity = {};
var dataArea = {};
var dataAreas= {};
$(document).ready(function() {
	// 获取页面参数
	var obj = getParameters();
	//0-小菜单 1-大菜单 2-顶部菜单
	initMenuStyle(0); 
	initLabelFun();
	// 设置底部的位置
	setMainCenterHeight();		
	$(window).on('resize', function(){
		setMainCenterHeight();
	});
	
	//addTab('welcome', '/page/welcome.html');
	addTab('welcome', '/page/terminal/index.html');

	//向服务器获取版本
//	AJAX.system.message("heipiao_cp_version", function(ret){
//		version = ret.body;
//	});
	
	//获取OSS STS请求参数
	//getOSts();
	//初始化省市区区划数据
	//getDataPCA();
	
});
/**
 * 初始化标签功能
 * 包括：色彩及各种事件
 */
function initLabelFun(){
	// 
	onMouseChangeCss("#message-div", ".icon-mc-message", 1, "background-image", 
			"url(../images/main_images/u323_mouseOver.png)", "url(../images/main_images/u323.png)");
	onMouseChangeCss("#sign-div", ".icon-mc-sign", 1, "background-image", 
			"url(../images/main_images/u325_mouseOver.png)", "url(../images/main_images/u325.png)");
	onMouseChangeCss("#warn-div", ".icon-mc-warn", 1, "background-image", 
			"url(../images/main_images/u339_mouseOver.png)", "url(../images/main_images/u339.png)");
	
	onMouseChangeCss("#door-div", ".icon-mc-door", 1, "background-image", 
			"url(../images/main_images/u321_mouseOver.png)", "url(../images/main_images/u321.png)");
	
	//onMouseChangeCss("#u192", "#u192_img", 2, "src", "../images/main_images/u192_mouseOver.png", "../images/main_images/u192.png");
	onMouseChangeCss("#u198", "#u198_div", 1, "background-color", 
			"rgba(255, 0, 0, 1)", "rgba(22, 155, 213, 1)");

	
	$("#u199").click(function(){
		$("<form>").attr("action","/user/logout").submit();
		setCookie("LOGOUT", "1");
	});
	
	$("#tab-box").tabs({
		onSelect: function(event, ui){
			setMainCenterHeight();
		}
	});
	
	$("#u134").mouseover(function(){
		console.info(this);
		console.info($(this));
	});
	
	$("#navigation").mouseover(function(){
		$(".navigation_gt").addClass("navigation_gt_mouseover");
	});
	$("#navigation").mouseout(function(){
		$(".navigation_gt").removeClass("navigation_gt_mouseover");
	});
	setCookie("LOGOUT", "0");
}


/**
 * 获取OSS STS请求参数
 */
function getOSts(){
	AJAX.token.oss_sts(function(ret){
		OStsData = ret.body;
	}, function(ret){
		console.info("token.oss_sts error", ret);
	});
}

/**
 * 菜单切换
 * 0-小菜单 1-大菜单 2-顶部菜单
 */
function initMenuStyle(mStyle){
	var lobj = $(".main_left");
	switch(mStyle){
	case 0:
		lobj.css("width", "57px");
		lobj.css("left", "-10px");
		$("#u192s").css("display", "block");
		$("#u198").css("left", "17px");
		$("#uName_remarks").css("display", "block");
		break;
	case 1:
		lobj.css("width", "200px");
		lobj.css("left", "0px");
		$("#u192s").css("display", "none");
		$("#u198").css("left", "133px");
		$("#uName_remarks").css("display", "none");
		break;
	case 2:
		lobj.css("width", "0px");
		break;
	}
}
function codoor(){
	var lobj = $(".main_left");
	var lWidth = lobj.width();
	var intervalId = -1;
	if(lWidth == 200){
		intervalId = setInterval(function(){
			lWidth = (lWidth - 10);
			lobj.css("width", lWidth+"px");
			if(lWidth < 60){
				lobj.css("width", "57px");
				lobj.css("left", "-10px");
				$("#u192s").css("display", "block");
				$("#u198").css("left", "17px");
				$("#uName_remarks").css("display", "block");
				clearInterval(intervalId);
			}
		}, 50);
	}else{
		$("#u192s").css("display", "none");
		$("#u198").css("left", "133px");
		$("#uName_remarks").css("display", "none");
		intervalId = setInterval(function(){
			lWidth = (lWidth + 10);
			lobj.css("width", lWidth+"px");
			if(lWidth > 200){
				lobj.css("width", "200px");
				lobj.css("left", "0px");
				clearInterval(intervalId);
			}
		}, 50);
	}
}

/**
 * 获取省市区区划数据
 */
function getDataPCA(){
	AJAX.region.list("", function(data){
		//console.info("successData:", data);
		var tmp = data.body;
		for(var i=0; i<tmp.length; i++){
			var area = tmp[i];
			eval("dataAreas.a" + area.regionNum + "=area");
			var area4= (area.pid + "").substr(2, 4);
			if(area.pid == 0){
				eval("dataProv.a" + area.regionNum + "=area");
				eval("dataCity.a" + area.regionNum + "=[]");
			}else if(area4 == "0000"){
				eval("dataCity.a" + area.pid + ".push(area)");
				eval("dataArea.a" + area.regionNum + "=[]");
			}else{
				eval("var eObj = dataArea.a" + area.pid);
				if(typeof eObj == "undefined"){
					continue;
				}
				eval("dataArea.a" + area.pid + ".push(area)");
			}
		}
		console.info("dataProv:", dataProv);
		console.info("dataCity:", dataCity);
		console.info("dataArea:", dataArea);
		console.info("dataAreas:", dataAreas);
	}, function(data){
		console.info("errorData:", data);
	});
}


//菜单点击事件
function addTab(_title,_url,isDel) {
	if(typeof isDel !== 'undefined') {
		isDel = false;
	} else {
		isDel = true;
	}
	var boxId = '#tab-box';
	if($(boxId).tabs('exists',_title) ){
		var tab = $(boxId).tabs('getTab',_title);
		var index = $(boxId).tabs('getTabIndex',tab);
		$(boxId).tabs('select',index);
		if(tab && tab.find('iframe').length > 0){  
			 var _refresh_ifram = tab.find('iframe')[0];  
		     _refresh_ifram.contentWindow.location.href=_url;  
	    } 
	}else{		
		var _content ="<iframe scrolling='auto' frameborder='0' src='"+_url+"' style='width:100%; height:100%'></iframe>";
		$(boxId).tabs('add',{
		    title   :_title,
		    content :_content,
		    closable:isDel,
		    select  :function(title,index){
		        alert(title+' is selected');
		        
		    },
		    tools   : [ {
				iconCls : 'icon-mini-refresh',
				handler : function() {
					refreshTab(_title);
				}
			} ]
		});				
	}
	setMainCenterHeight();
}


//刷新
function refreshTab(title) {
	var tab = $("#tab-box").tabs('getTab', title);
	$("#tab-box").tabs('update', {
		tab : tab,
		options : tab.panel('options')
	});
}

/**
 * 设置主体中间布局的高度
 */
function setMainCenterHeight(__callback){
	var bodyHeight = document.body.offsetHeight;
	var bodyWidth  = document.body.offsetWidth;
	var headerH    = $(".main_header").css("height");
	var footerH    = $(".main_footer").css("height");
	headerH = headerH.substr(0, headerH.indexOf("px")) * 1;
	footerH = footerH.substr(0, footerH.indexOf("px")) * 1;
	var centerH    = bodyHeight-headerH-footerH;
	$(".main_center").css("height", centerH + "px");

	var leftW    = $(".main_left").css("width");
	leftW = leftW.substr(0, leftW.indexOf("px")) * 1;
	var centerW    = bodyWidth-leftW;
	var obj = $('.tabs-panels > div > div'); //$(".tabs-panels ").find(".panel  div:first-child");
	if(typeof obj != 'undefined'){
		obj.css("height", centerH + "px");
		obj.css("width", centerW + "px");
	}
	if(typeof __callback == "function"){
		__callback();
	}
	$(".main_left_menu").css("height", bodyHeight-147 + "px");
}
/**
 * 初始化分页显示的页小
 */
var pagesize = getCookie("pagesize");
if(typeof pagesize == 'undefined' || pagesize == ""){
	pagesize = 8;
	setCookie("pagesize", pagesize);
}
/**
 * 获取当前页大小
 */
function getPageSize(){
	return pagesize;
}
/**
 * 设置当前页大小
 */
function setPageSize(size){
	pagesize = size;
	setCookie("pagesize", pagesize);
}

/**
 * 显示图片
 * @param img_src
 */
function showImage(obj){
	var bodyWidth  = $("body").width();//document.body.offsetWidth;
	var bodyHeight = $("body").height();//document.body.offsetHeight;
	$(".show_img_box").css({
		"width" : bodyWidth + "px",
		"height": bodyHeight + "px"
	});
	var img_src = $(obj).attr("src");
	$("#show_img_box_img").attr("src", img_src);
	$(".show_img_box").css("display", "block");
}
function showImageOnload(obj){
	var bodyWidth  = $("body").width();//document.body.offsetWidth;
	var bodyHeight = $("body").height();//document.body.offsetHeight;
	var objWidth   = $(obj).width();
	var objHeight  = $(obj).height();
	console.info("bodyWidth :"+bodyWidth+" objWidth:"+objWidth);
	console.info("bodyHeight:"+bodyHeight+" objHeight:"+objHeight);
	$("#show_img_box_img").css({
		"position": "relative",
		"top": ((bodyHeight-objHeight)/2)+"px",
		"left": ((bodyWidth-objWidth)/2)+"px"
	});
}