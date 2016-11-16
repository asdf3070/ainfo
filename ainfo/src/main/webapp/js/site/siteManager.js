var pagenum = 1;
var pagesize = window.top.getPageSize();
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
	//
	changeTab(1);
	//初始化标签功能
	initLabelFun();
	
	//初始区域分类
	initPCityTree();
	//初始功能分类
	initPFunTree(dataPFun);
	
	//添加分页组件
	pagination.init(getData, "pagination_id");
	getAllSites();
});


/**
 * 页面信息
 */
var currentPageData;
var pageinfo = {
	"pagesize" : pagination.getPageSize(),
	"pagenum"  : pagenum,
	"totalitem": 0
}
/**
 * 查询各类型钓场
 */
function getTypeSites(stype){
	if(stype == -1) {
		_E.window.show("下期哦！");
		return;
	}
	pageinfo.status = stype;
	pageinfo.type = stype;
	getData();
}
/**
 * 查询默认显示（全部钓场、正常、上架）钓场
 */
function getAllSites(){
	pageinfo.status = 1;
	pageinfo.type = 1;
	$("#page_input").val(1);	
	getData();
}
/**
 * 关键字搜索
 */
function onSearch(){
	var keyword = $("#search_input").val();
	console.info("onSearch", keyword);
	if($.trim(keyword).length == 0){
		_E.window.show("您还没有输入关键字哦！");
		return;
	}
	pageinfo.type = 5;
	pageinfo.keyword = keyword;
	if(typeof pagesize == 'undefined') 
		pagesize = $("page_size").val();
	if(typeof pagenum_  == 'undefined') 
		pagenum  = 1 ;
	getData(pagesize , pagenum);
}
/**
 * 通过区域查询钓场
 */
function getRegionSites(category, regionId){
	pageinfo.type = 6;
	pageinfo.category = category;
	pageinfo.regionId = regionId;
	
	if(typeof pagesize == 'undefined') 
		pagesize = $("page_size").val();
	if(typeof pagenum_  == 'undefined') 
		pagenum  = 1 ;
	
	getData(pagesize , pagenum);
}
function tg(name){
	console.info(name + ": "+Math.round(new Date()))
}
/**
 * 查询钓场信息
 * @param pagesize_
 * @param pagenum_
 */
function getData(pagesize_, pagenum_){
	if(typeof pagesize_ != 'undefined') 
		pagesize = pagesize_;
	if(typeof pagenum_  != 'undefined') 
		pagenum  = pagenum_ ;
	
	pageinfo.pagesize = pagesize;		
	pageinfo.pagenum = pagenum;
	
	AJAX.sites.query(pageinfo, function(data){
		//console.info("successData:", data);
		if(typeof data.body.total == 'undefined' || data.body.total == 0){
			pageinfo.type = 1;
			_E.window.show("没有查询到数据！");
			return;
		}
		pageinfo.totalitem = data.body.total;
		currentPageData = data.body.data;

		$("#u1077").html("");
		var lines = currentPageData;
		if(lines.length > 0){
			var lineHtml = "";
			for(var i=0; i<lines.length; i++){
				var line = parseData(lines[i]);
				lineHtml += '<div class="line" onmouseover="lineOnMouseOver(this, ' + i + ', ' + line.fishSiteId + ')">';
				lineHtml += '	<div class="line_check_area">';
				lineHtml += '		<input class="line_checkbox" id="ckbox_' + i + '" type="checkbox" name="ckbox"/>';
				lineHtml += '	</div>';
				lineHtml += '	<div class="line_fun_area" onclick="lineOnClick(' + i + ')">';
				lineHtml += '		<div class="line_img">';
				if(line.mainImg.substr(line.mainImg.length - 4, 4) == ".mp4"){
//					lineHtml += '			<video autoplay="autoplay" loop="loop" oncanplaythrough="tg(0)" onloadstart="tg(1)" onloadeddata="tg(2)" onended="tg(3)" onemptied="tg(4)" onstalled="tg(5)" onwaiting="tg(6)" onprogress="tg(7)" ondurationchange="tg(8)" >';
					lineHtml += '			<video autoplay="autoplay" loop="loop" oncanplaythrough="imgLoad(this)" >';
					lineHtml += '			    <source src="' + line.mainImg + '" type="video/mp4">';
					lineHtml += '			    MP4';
					lineHtml += '			</video>';
				}else{
					lineHtml += '			<img src="' + line.mainImg + '" onload="imgLoad(this)"/>';
				}
				lineHtml += '		</div>';
				lineHtml += '		<div class="line_name_star">';
				lineHtml += '			<div class="line_up"   style="width: 150px;" title="' + line.fishSiteName + '">' + line.fishSiteName + '</div>';
				lineHtml += '			<div class="line_down" style="width: 150px;" title="' + line.grade + '">' + line.grade + '</div>';
				lineHtml += '		</div>';
				lineHtml += '		<div class="line_contacts_platform">';
				lineHtml += '			<div class="line_up" style="width: 180px;">';
				lineHtml += '				<img style="width: 13px;" src="../../images/frame_images/u604.png"/>';
				lineHtml += '				<span title="' + line.contactPhone + '">' + line.contactPhone + '</span>';
				lineHtml += '			</div>';
				lineHtml += '			<div class="line_down">';
				if(line.authType.length == 3){
					lineHtml += '				<div class="line_label" style="width:43px">';
					lineHtml += '					<span class="line_label_text">' + line.authType + '</span>';
					lineHtml += '				</div>';
				}else if(line.authType.length == 2){
					lineHtml += '				<div class="line_label" style="width:30px">';
					lineHtml += '					<span class="line_label_text">' + line.authType + '</span>';
					lineHtml += '				</div>';
				}
				if(  typeof line.label != "undefined" && typeof line.label.length != "undefined" && line.label.length > 1){
					lineHtml += '				<div class="line_label">';
					lineHtml += '					<span class="line_label_text">斤</span>';
					lineHtml += '				</div>';
					lineHtml += '				<div class="line_label">';
					lineHtml += '					<span class="line_label_text">钟</span>';
					lineHtml += '				</div>';
				}else if( typeof line.label != "undefined" ){
					lineHtml += '				<div class="line_label">';
					lineHtml += '					<span class="line_label_text">' + line.label + '</span>';
					lineHtml += '				</div>';
				}else{
					lineHtml += '				<div class="line_label">';
					lineHtml += '					<span class="line_label_text">斤</span>';
					lineHtml += '				</div>';
				}
				lineHtml += '			</div>';
				lineHtml += '		</div>';
				lineHtml += '		<div class="line_remark">';
				lineHtml += '			<img src="../../images/frame_images/u685.png"/>';
				lineHtml += '			<textarea id="textarea_' + i + '" class="line_remark_text" disabled="disabled">' + line.sysRemarks + '</textarea>';
				lineHtml += '		</div>';
				lineHtml += '		<div class="line_operate">';
				if(line.authType == "未认证"){
					lineHtml += '			<div class="line_operate_button" onclick="editAuthentication(' + i + ')"  style="width: 60px;">指定塘主</div>';
				}else{
					lineHtml += '			<div class="line_operate_button" onclick="queryAuthentication(' + i + ')" style="width: 60px; background-color: #0081c2; color: white;">场主详情</div>';
				}
				lineHtml += '			<div class="line_operate_button" onclick="editSite(' + i + ')">编辑</div>';
				lineHtml += '			<div class="line_operate_button" onclick="editMark(' + i + ')">备注</div>';
				if(line.flag == 1){
					lineHtml += '			<img src="../../images/frame_images/star_u1104_selected.png" style="margin-top: 18px;" onclick="setStar(' + line.fishSiteId + ', 0)"/>';
				}else{
					lineHtml += '			<img src="../../images/frame_images/star_u1104.png"          style="margin-top: 18px;" onclick="setStar(' + line.fishSiteId + ', 1)"/>';
				}
				lineHtml += '		</div>';
				lineHtml += '	</div>';
				lineHtml += '</div>';
			}
			$("#u1077").append(lineHtml);
			if(pagesize > (getElementHeight("#u1077") / getElementHeight(".line"))){
				pageinfo.totalitem = lines.length;
				$("#u1077").addClass("scroll_div");
			}else if(lines.length > pagesize){
				pageinfo.totalitem = lines.length;
				pageinfo.pagesize = lines.length;
			}else{
				$("#u1077").removeClass("scroll_div");
			}

			//如果图片加载不成功则使用，默认图像
			$('img').error(function(){
			    $(this).attr('src',"../../images/frame_images/p65.png");
			})
		}
		pagination.voluation(pageinfo);
	}, function(data){
		console.info("errorData:", data);
	});
}
/**
 * 查看场主详情
 */
function queryAuthentication(index){
	var currSite = currentPageData[index];
	var param = {
		'type': 2,
		'uid' : currSite.uid
	};
	AJAX.users.query(param, function(ret){
		if(ret.body == undefined) {
			_E.window.show("钓场主信息失败，请联系系统管理员！");
			return;
		}
		var uData = ret.body;
		var nickname = uData.nickname == undefined ? "[昵称]" : uData.nickname;
		var realname = uData.realname == undefined ? "(姓名)" : "(" + uData.realname + ")";
		var name = nickname + realname;
		var phone = uData.phone == undefined ? "无" : uData.phone;
		var html = "";
		html += "<div id='queryAuthentication_div'>";
		html += '	<div class="check_main_field" >';
		html += '		<div class="check_main_field_header">';
		html += '			<img src="' + uData.portriat + '" onload="imgLoad(this)"/>';
		html += '		</div>';
		html += '		<div class="check_main_field_text" title="' + name + '" style="margin-top: 11px">' + name + '</div>';
		html += '		<img style="width: 13px; float: left; margin: 11px 5px 0px 40px;" src="../../images/frame_images/u604.png">';
		html += '		<div class="check_main_field_text" title="' + phone +'" style="margin-top: 11px">' + phone + '</div>';
		html += '	</div>';
		html += '	<center id="AuthenticationQrcodeID" style="padding-top: 15px;">';
		html += '	</center>';
		html += '	<div style="margin-top: 10px; padding-right: 40px; text-align: right; color: #8b8b8b;">';
		html += '		使用非IE浏览器，鼠标右键，下载图片';
		html += '	</div>';
		html += "</div>";
		$(html).appendTo($(document.body));
		createDialogPopupOnlyCancel('queryAuthentication_div', 387, 460, "场主详情");
		createQRcode("#AuthenticationQrcodeID", 1000, RES_SITES_AUTO_INFO + "?uid=" + currSite.uid);
		$("#AuthenticationQrcodeID > img").css("width", "300px")
	}, function(ret){
		console.info("sites.authentication error", ret);
	}, param);
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
function editAuthentication(index){
	var currSite = currentPageData[index];
	//分页查询会员信息列表
	currQueryUserParam.type = 0;
	currQueryUserParam.pagenum = 1;
	currQueryUserParam.currSite = currSite;
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
		
		createDialogPopupOnlyCancel('editAuthentication_dialog', 400, 600, "指定塘主");
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
				if( typeof row.portriat != 'undefined' && row.portriat.substr(0, 4) == "WXIN"){
					row.portriat = "http://wx.qlogo.cn/mmopen/" + row.portriat.substr(4);
				}
				html = "";
				html += '		<div class="check_main_field" onclick="authentication(' + currQueryUserParam.currSite.fishSiteId + ', ' + row.id + ')">';
				html += '			<div class="check_main_field_header">';
				html += '				<img src="' + row.portriat + '" onload="imgLoad(this)"/>';
				html += '			</div>';
				html += '			<div class="check_main_field_text" title="' + row.nickname + '">' + row.nickname + '</div>';
				html += '			<img style="width: 13px; float: left; margin: 11px 5px 0px 40px;" src="../../images/frame_images/u604.png">';
				html += '			<div class="check_main_field_text">' + row.username + '</div>';
				html += '		</div>';
				$(html).appendTo($("#check_main"));
			}
		}
	}, function(ret){
		console.info("users.conditions error", ret);
	});
}
function authentication(siteId, uid){
	var param = {
		"uid": uid,
		"siteId": siteId
	}
	//指定塘主
	AJAX.sites.authentication("", function(ret){
		console.info("sites.authentication success", ret);
		getData();
		delPopul_div('editAuthentication_dialog');
		_E.window.show("成功指定钓场主！")
	}, function(ret){
		console.info("sites.authentication error", ret);
	}, param);
}

/**
 * 对列表数据进行解析
 * @param lineData
 * @returns {___anonymous3512_3519}
 */
function parseData(lineData){
	$.each(lineData, function(n,value){
		if(typeof value == 'string' && value.indexOf('\n') != -1){
			;
		}else{
			eval("lineData." + n + "='" + isNull_0(value) + "'");
		}
		console.info("%s=%s", n, value);
	});
	var pcaData = parsePCA(lineData.provinceId, lineData.cityId, lineData.regionId);
	
	
	if( typeof lineData.mainImg == 'undefined' || typeof lineData.mainImg.length == 'undefined' || lineData.mainImg.length == 0){
		lineData.mainImg = "../../images/frame_images/p65.png";
	}else{
		lineData.mainImg = RES_PROC_URL + lineData.mainImg;
	}
	if(lineData.grade == undefined || lineData.grade.length == 0){
		lineData.grade = "☆☆☆☆☆";
	}
	if(pcaData.province != undefined || pcaData.city != undefined || pcaData.region != undefined){
		lineData.grade = pcaData.province.regionName + pcaData.city.regionName + pcaData.region.regionName;
	}
	if(lineData.sysRemarks == undefined || lineData.sysRemarks.length == 0){
		lineData.sysRemarks = "无";
	}
	if( typeof lineData.phoneNum != "undefined" && typeof lineData.phoneNum.length != "undefined" && lineData.phoneNum.length > 0){
		lineData.phoneNum = "(" + lineData.phoneNum + ")";
	}
	if(lineData.contactMan == undefined){
		lineData.contactMan = "无";
	}
	lineData.contactPhone = lineData.contactMan + lineData.phoneNum;
	if(lineData.flag == undefined || lineData.flag.length == 0 || lineData.flag == 0){
		lineData.flag = 0;
	}else{
		lineData.flag = 1;
	}
	if(lineData.authType == 1){
		lineData.authType = "平台";
	}else if(lineData.authType == 2){
		lineData.authType = "钓场主";
	}else if(lineData.authType == 3){
		lineData.authType = "钓友";
	}else{
		lineData.authType = "未认证";
	}
	
	if(  typeof lineData.label != "undefined" && typeof lineData.label.indexOf(",") != "undefined" &&  lineData.label.indexOf(",") != -1){
		lineData.label = ["斤", "钟"]
	}else if(lineData.label == 0){
		lineData.label = "钟";
	}else if(lineData.label == 1){
		lineData.label = "斤";
	}
	
	return lineData;
}


function editSite(index){
	console.info("index:", index);
	window.parent.showSiteEdit(currentPageData[index].fishSiteId);
}

/**
 * 设置钓场备注
 * @param index
 */
function editMark(index){
	console.info("index:", index);
	
	var html = "";
	html += "<div id='editSysRemark_div'>";
	html += 	"<textarea id='remark_id' style='width: 370px; height: 270px; border: none; margin: 5px; resize: none'>" + $("#textarea_" + index).val() + "</textarea>";
	html += "</div>";
	$(html).appendTo($(document.body));
	
	createDialogPopup('editSysRemark_div', 387, 360, "修改钓场系统备注",function(){
		var remarkInfo = $("#remark_id").val();
		console.info("remark_id:", $("#remark_id").val());
		console.info("OK", index);
		var param = {
			"siteId": currentPageData[index].fishSiteId,
			"remark": remarkInfo
		}
		AJAX.sites.remark("", function(data){
			console.info("successData:", data);
			_E.window.show("所选择钓场已修改备注！");
			delPopul_div('editSysRemark_div');
			getData();
		}, function(data){
			console.info("errorData:", data);
		}, param);
	});
}

function setStar(id, flag){
	var param = {
		"siteId": id,
		"flag"  : flag
	}
	AJAX.sites.site.flag("", function(ret){
		console.info("successData:", ret);
		getData();
	}, function(ret){
		console.info("errorData:", ret);
	}, param);
}

var lastFunType;
function getFunPanel(type){
	var checkValues = getCheckboxLineDataIndex();
	if(type != 4 && checkValues.length == 0){
		_E.window.show("请选择行！");
		return;
	}
	var panel = $(".fun_panle");
	if(typeof lastFunType != "undefined" && lastFunType != type){
		panel.css("display", "none");
	}
	lastFunType = type;
	panel.html("<div/>");
	switch(type){
	case 1:
		_E.window.show("下期哦！");
//		panel.css("left", "350px");
//		var html = "";
//		html += '<div class="panel_flow_layout" style="height: 80%">';
//		html += '	<div class="panel_check_button">';
//		html += '		<span class="panel_check_button_text">工作人员</span>';
//		html += '	</div>';
//		html += '	<div class="panel_check_button">';
//		html += '		<span class="panel_check_button_text">误操作下架</span>';
//		html += '	</div>';
//		html += '	<div class="panel_check_button">';
//		html += '		<span class="panel_check_button_text">已经通过审核</span>';
//		html += '	</div>';
//		html += '</div>';
//		html += '<div class="panel_flow_layout" style="height: 20%">';
//		html += '	<div class="panel_control_button cancel_color">';
//		html += '		<span class="panel_check_button_text">不贴</span>';
//		html += '	</div>';
//		html += '	<div class="panel_control_button ok_color">';
//		html += '		<span class="panel_check_button_text">贴上去</span>';
//		html += '	</div>';
//		html += '</div>';
//		panel.append(html);
		break;
	case 2:
		for(var i=0; i<checkValues.length; i++){
			if(isNaN(checkValues[i])){
				continue;
			}
			var dataIndex = currentPageData[checkValues[i]].fishSiteId;
			var param = {
				"siteId": dataIndex,
				"status": 1
			}
			AJAX.sites.site.check("", function(data){
				//console.info("successData:", data);
				var currLine = currentPageData[dataIndex];
				_E.window.show("所选择钓场已上架！");
				getData();
			}, function(data){
				console.info("errorData:", data);
			}, param);
			panel.css("left", "450px");
		}
		break;
	case 3:
		for(var i=0; i<checkValues.length; i++){
			var dataIndex = currentPageData[checkValues[i]].fishSiteId;
			var param = {
				"siteId": dataIndex,
				"status": 3
			}
			AJAX.sites.site.check("", function(data){
				console.info("successData:", data);
				var currLine = currentPageData[dataIndex];
				_E.window.show("所选择钓场已下架！");
				getData();
			}, function(data){
				console.info("errorData:", data);
			}, param);
			panel.css("left", "550px");
		}
		break;
	case 4:
		_E.window.show("下期哦！");
		panel.css("left", "650px");
		break;
	}
	var display = panel.css("display");
	if(display == "none"){
		//panel.fadeIn();
		//panel.fadeIn("slow");
		//panel.fadeIn(3000);
	}else{
		panel.css("display", "none");
	}
}

/**
 * 初始区域分类
 */
function initPCityTree(dataPCity){
	AJAX.region.menulist("", function(data){
		//console.info("successData:", data);
		dataPCity = data.body;
		if(typeof data != "undefined"){
			var cityHtml = '<div class="areas" id="allSite" onmouseover="cityOnMouseOver(this)" onclick="getAllSites()">全部钓场</div>';
			for(var i=0; i<dataPCity.length; i++){
				var p = dataPCity[i];
				if(p.count == 0)continue;
				cityHtml+= '<div class="areas" onmouseover="cityOnMouseOver(this)" onclick="getRegionSites(1, ' + p.rid + ')">' + p.province + '(' + p.count + ')</div>';
				var citys = p.citys;
				for(var j=0; j<citys.length; j++){
					var city = citys[j];
					if(city.count == 0)continue;
					cityHtml+= '<div class="areas city" onmouseover="cityOnMouseOver(this)" onclick="getRegionSites(2, ' + city.rid + ')">' + city.city + '(' + city.count + ')</div>';
				}
			}
			$("#u1109").append(cityHtml);  
		}
	}, function(data){
		console.info("errorData:", data);
	});
}
/**
 * 初始功能分类
 */
function initPFunTree(data){
	if(typeof data != "undefined"){
		var funHtml = "";// '<div class="star_fun" onmouseover="funOnMouseOver(this)">全部钓场</div>';
		for(var i=0; i<data.length; i++){
			var f = data[i];
			//var totalCount = f.name + '(' + f.count + ')';
			funHtml+= '<div class="star_fun" onmouseover="funOnMouseOver(this)" onclick="getTypeSites(' + f.type + ')">' + f.name + '</div>';
		}
		$("#u1234").append(funHtml);
	}
}

function setButtonLineSize(){
	$("#u1077")      .css("width", (bodyWidth - 280) + "px");
	$("#u1077-1")    .css("width", (bodyWidth - 280) + "px");
	$("#u1078-1")    .css("width", (bodyWidth - 280) + "px");
	$("#u1078-1_div").css("width", (bodyWidth - 285) + "px");
	$("#u1128_div")  .css("width", (bodyWidth - 280) + "px");
	$("#u1151")      .css("left",  (bodyWidth - 70)  + "px");
	$("#search")     .css("left",  (bodyWidth - 420) + "px");
	$("#u1142")      .css("left",  (bodyWidth - 90)  + "px");
	//设置“按区域分类”外框
	$("#u1109")      .css("height",(bodyHeight - 200)+ "px");
	//设置“按功能分类”外框
	$("#u1234")      .css("height",(bodyHeight - 200)+ "px");
	//设置“列表”外框
	$("#u1077")      .css("height",(bodyHeight - 195)+ "px");
	//分页部件的位置
	$("#pagination_id").css("top",(bodyHeight - 65)+ "px");
}

/**
 * 切换区域功能分类
 * @param tab_id
 */
function changeTab(tab_id){
	if(tab_id){
		if(tab_id == 1){
			$("#u1212_img_city").attr("src", "../../images/frame_images/city_u1212_selected.png");
			$("#u1212_img_star").attr("src", "../../images/frame_images/u1220.png");

			$("#u1233").css("display", "none");
			$("#u1233").css("visibility", "hidden");
			$("#u1108").css("visibility", "visible");
			$("#u1108").fadeIn();
			$("#u1108").fadeIn("slow");
			$("#u1108").fadeIn(3000);
			$("#u1108").css("visibility", "visible");
		}else if(tab_id == 2){
			$("#u1212_img_city").attr("src", "../../images/frame_images/city_u1212.png");
			$("#u1212_img_star").attr("src", "../../images/frame_images/u1220_selected.png");

			$("#u1108").css("display", "none");
			$("#u1108").css("visibility", "hidden");
			$("#u1233").css("visibility", "visible");
			$("#u1233").fadeIn();
			$("#u1233").fadeIn("slow");
			$("#u1233").fadeIn(3000);
		}
	}
}
/**
 * 按区域分类鼠标悬浮事件
 * @param obj
 */
function cityOnMouseOver(obj){
	$(".areas").css("background-color", "rgb(255, 255, 255)");
	$(obj).css("background-color", "rgba(0, 204, 255, 1)");
}
/**
 * 按功能分类鼠标悬浮事件
 * @param obj
 */
function funOnMouseOver(obj){
	$(".star_fun").css("background-color", "rgb(255, 255, 255)");
	$(obj).css("background-color", "rgba(204,204,204, 1)");
}
/**
 *  数据行鼠标悬浮事件
 * @param obj
 */
function lineOnMouseOver(obj, index, id){
	$(".line").removeClass("line_mouseover");
	$(obj).addClass("line_mouseover");
	pagination.setCurrentRow(index, id);
}

/**
 * 数据行鼠标点击事件
 */
function lineOnClick(index){
	var obj = $("#ckbox_"+index);
	var check = obj.prop("checked")
	if(typeof check == 'undefined' || !check){
		obj.prop("checked", true);
		//obj.attr("checked", "checked");
	}else{
		obj.prop("checked", false);
	}
}

/**
 * 初始化标签功能
 * 包括：色彩及各种事件
 */
function initLabelFun(){
	//设置搜索框placeholder
	$("#search_input").attr("placeholder", "可输入钓场名称、手机号码进行查询");	
	onMouseChangeCss("#u1140", "#u1140_img", 2, "src", "../../images/frame_images/u698_mouseOver.png", "../../images/frame_images/u698.png");
	onMouseChangeCss("#u1132", "#u1132_img", 2, "src", "../../images/frame_images/u698_mouseOver.png", "../../images/frame_images/u698.png");
	onMouseChangeCss("#u1289", "#u1289_img", 2, "src", "../../images/frame_images/u698_mouseOver.png", "../../images/frame_images/u698.png");
	onMouseChangeCss("#u1136", "#u1136_img", 2, "src", "../../images/frame_images/u698_mouseOver.png", "../../images/frame_images/u698.png");
	onMouseChangeCss("#u1151", "#u1151_img", 2, "src", "../../images/frame_images/u725_mouseOver.png", "../../images/frame_images/u725.png");
}
/**
 * 全选
 * @param checkbox_name
 */
function checkAll(checkbox_name) {
	var code_Values = document.all[checkbox_name];

	if (code_Values.length) {
		var check = code_Values[0].checked;
		for (var i = 0; i < code_Values.length; i++) {
			code_Values[i].checked = check;
		}
	} else {
		code_Values.checked = true;
	}
}
/**
 * 获取已选择数据行
 * @returns
 */
function getCheckboxLineDataIndex(){
	var checkBoxName = "ckbox";
	var checkBoxs = document.all[checkBoxName];
	if(typeof checkBoxs == 'undefined'){
		return 0;
	}else{
		var checkValues = [];
		for (var i = 0; i < checkBoxs.length; i++) {
			if(checkBoxs[i].checked){
				var check_id = checkBoxs[i].id;
				var LineDataIndex = parseInt(check_id.substr((checkBoxName + "_").length));
				checkValues.push(LineDataIndex);
			}
		}
		console.info("LineDataIndexs Count:", checkValues.length);
		return checkValues;
	}
}



/**
 * 测试模拟数据
 */
var dataDemo = {
	"totalpage": 10,
	"totalitem" : 200,
	"pagenum" : 200,
	"bady":[
        {
        	"sImg" : "../../images/frame_images/p65.png",
        	"sName": "苗坑水库 (湖库)",
        	"sStar": 3,
        	"sEditName": "唐先生(15507556330)",
        	"style": 1,
        	"fishSiteType": 1,
        	"pondRemarks": "免费的噢，水质很好"
        }
    ]
}
var dataPCity = [
     {
         "province": "广东省",
         "count": 918,
         "rid": 423,
         "citys": [
             {
                 "city": "深圳市",
                 "count": 268,
                 "rid": 423
             },
             {
                 "city": "东莞市",
                 "count": 268,
                 "rid": 423
             }
         ]
     },
     {
         "province": "湖南省",
         "count": 238,
         "rid": 423,
         "citys": [
             {
                 "city": "长沙市",
                 "count": 123,
                 "rid": 423
             },
             {
                 "city": "常德市",
                 "count": 115,
                 "rid": 423
             }
         ]
     }
 ]
var dataPFun = [
    {
    	"name": "上架钓场",
    	"count": 10,
    	"type":1
    },
    {
    	"name": "下架钓场",
    	"count": 10,
    	"type":3
    },
    {
    	"name": "星标钓场",
    	"count": 0,
    	"type":-1
    },
    {
    	"name": "待审核钓场",
    	"count": 55,
    	"type":0
    },
    {
    	"name": "审核未通过",
    	"count": 20,
    	"type": 2
    },
    {
    	"name": "黑名单钓场",
    	"count": 5,
    	"type": 4
    },
    {
    	"name": "举报较多钓场",
    	"count": 0,
    	"type": -1
    },
]