var bodyHeight;
var bodyWidth;
var urlParam = {};
var currid;
var currpid;
var ids = new Array();
var pids = new Array();

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
	//初始化功能分类
	changeTab(1);
	//初始化标签功能
	initLabelFun();
	//初始区域分类
	initPCityTree();
	//初始功能分类
	initPFunTree(dataPFun);
	//初始设置用户区域
	initUserCheckArea();
	//合伙人信息框绑定
	updatePartnerInfoInputBinds();
});

/**
 * 显示基本资料
 */
function baseInfo(){
	$("#u846_state0").css("display", "block");
	$("#u846_state1").css("display", "none");
}
/**
 * 显示签约钓场
 */
function selfSite(){
	$("#u846_state0").css("display", "none");
	$("#u846_state1").css("display", "block");
	$("#u846_state1").html("");
	getPartnerSites();
}

/**
 * 页面信息
 */
var currentPageData;
var pageinfo = {
	"sitepagestart": 1,
	"sitepagesize" : 15,
	"uesrpagestart": 1,
	"uesrpagesize" : 18,
	"totalitem": 0
}
/**
 * 查询默认显示（全部钓场、正常、上架）钓场
 */
function getPartnerSites(){
	pageinfo.siteType = 0;
	pageinfo.sitepagestart = 1;
	pageinfo.total = 0;
	getUserSiteData();
}
/**
 * 查询钓场信息
 * @param pagesize_
 * @param pagenum_
 */
function getUserSiteData(pagesize_, pagenum_){
	if( typeof pageinfo.partnerId == "undefined" ){
		_E.window.show("您想查询签约钓场吗？请先选择合伙人！");return ;
	}
	AJAX.users.partner.fishsite(pageinfo, function(ret){
		var name = currPartner.realname == undefined ? currPartner.nickname : currPartner.realname;
		console.info("users.partner.fishsite success Data:", ret);
		if(typeof ret.body == 'undefined'){
			$("#u846_state1").html('<center style="opacity: 0.5;">查询签约钓场的信息发生问题，请稍候再试！"</center>');
			return;
		}
		var currentPageData = ret.body;
		if(currentPageData.length == undefined){
			currentPageData = currentPageData.data;
		}
		if(currentPageData.length > 0){
			var lines = currentPageData;
			pageinfo.total = data.body.total;
			//组织显示行并显示
			var lineHtml = getSiteHtmlData(lines, true);
			$("#u846_state1").append(lineHtml);
			//合伙人签约钓场列表满屏添加滚动条
			if(pageinfo.sitepagesize > (getElementHeight("#u846_state1") / getElementHeight(".line"))){
				pageinfo.totalitem = lines.length;
				$("#u846_state1").addClass("scroll_div");
			}else if(lines.length > pageinfo.sitepagesize){
				pageinfo.totalitem = lines.length;
				pageinfo.pagesize = lines.length;
			}else{
				$("#u846_state1").removeClass("scroll_div");
			}
			//合伙人签约钓场列表滚动
			$("#u846_state1").bind('scroll', function() {
				console.info("scrollTop:", $("#u846_state1").scrollTop());
				var currScrolledHeight = $("#u846_state1").scrollTop() + $("#u846_state1").height();
				var divDocumentHeight  = $("#u846_state1")[0].scrollHeight;
				console.info("currScrolledHeight: "+currScrolledHeight+" divDocumentHeight: "+divDocumentHeight);
		        if(currScrolledHeight >= divDocumentHeight) {
					console.info("scroll 1");
					if(pageinfo.sitepagestart * pageinfo.sitepagesize < pageinfo.total){
						pageinfo.sitepagestart++;
						getUserSiteData();
					}
				} else if($("#u846_state1").scrollTop() <= 0) {
					console.info("scroll 2");
				}
		    });
		}else{
			var errorMsg = "没有查询到合伙人[" + name + "]的签约钓场哦!";
			$("#u846_state1").html('<center style="opacity: 0.5;">' + errorMsg + '</center>');
			return;
		}
	}, function(data){
		console.info("errorData:", data);
	});
}
//通过钓场数据集获取对应的页面HTML
function getSiteHtmlData(lines, needCheckBox, s_callback){
	if(typeof s_callback == 'undefined'){
		s_callback = "";
	}
	var lineHtml = "";
	for(var i=0; i<lines.length; i++){
		var line = parseData(lines[i]);
		lineHtml += '<div class="line" onmouseover="lineOnMouseOver(this, ' + i + ', ' + line.fishSiteId + ')">';
		lineHtml += '	<div class="line_check_area">';
		if(needCheckBox){
			lineHtml += '		<input class="line_checkbox" id="ckbox_' + i + '" type="checkbox" name="ckbox"/>';
		}
		lineHtml += '	</div>';
		lineHtml += '	<div class="line_fun_area" onclick="lineOnClick(' + i + ', ' + s_callback + ', ' + line.fishSiteId + ')">';
		lineHtml += '		<div class="line_img">';
		lineHtml += '			<img src="' + line.mainImg + '" onload="imgLoad(this)"/>';
		lineHtml += '		</div>';
		lineHtml += '		<div class="line_name_star">';
		lineHtml += '			<div class="line_up"   style="width: 200px;" title="' + line.fishSiteName + '">' + line.fishSiteName + '</div>';
		lineHtml += '			<div class="line_down" style="font-size: 17px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 200px;" title="' + line.grade + '">' + line.grade + '</div>';
		lineHtml += '		</div>';
		lineHtml += '		<div class="line_contacts_platform">';
		lineHtml += '			<div class="line_up"   style="width: 200px;" title="' + line.contactPhone + '">';
		lineHtml += '				<img style="width: 13px;" src="../../images/frame_images/u604.png"/>';
		lineHtml += '				<span>' + line.contactPhone + '</span>';
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
		if(line.label.length > 1){
			lineHtml += '				<div class="line_label">';
			lineHtml += '					<span class="line_label_text">斤</span>';
			lineHtml += '				</div>';
			lineHtml += '				<div class="line_label">';
			lineHtml += '					<span class="line_label_text">钟</span>';
			lineHtml += '				</div>';
		}else{
			lineHtml += '				<div class="line_label">';
			lineHtml += '					<span class="line_label_text">' + line.label + '</span>';
			lineHtml += '				</div>';
		}
		lineHtml += '			</div>';
		lineHtml += '		</div>';
		lineHtml += '	</div>';
		lineHtml += '</div>';
	}
	return lineHtml;
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
	});
	var pcaData = parsePCA(lineData.provinceId, lineData.cityId, lineData.regionId);
	if(pcaData.province != undefined || pcaData.city != undefined || pcaData.region != undefined){
		lineData.grade = pcaData.province.regionName + pcaData.city.regionName + pcaData.region.regionName;
	}
	if(lineData.phoneNum.length > 0){
		lineData.phoneNum = "(" + lineData.phoneNum + ")";
	}
	if(lineData.contactMan == undefined){
		lineData.contactMan = "无";
	}
	lineData.contactPhone = lineData.contactMan + lineData.phoneNum;
	if(lineData.flag.length == 0 || lineData.flag == 0){
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
	
	if(lineData.label.indexOf(",") != -1){
		lineData.label = ["斤", "钟"]
	}else if(lineData.label == 0){
		lineData.label = "钟";
	}else if(lineData.label == 1){
		lineData.label = "斤";
	}
	
	return lineData;
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
function lineOnClick(index, _callback, fishSiteId){
	var obj = $("#ckbox_"+index);
	var check = obj.prop("checked")
	if(typeof check == 'undefined' || !check){
		obj.prop("checked", true);
	}else{
		obj.prop("checked", false);
	}
	if(typeof _callback == 'function'){
		_callback(fishSiteId);
	}
}
//================================================================================给合伙人分配钓场 Start.
/**
 * 给合伙人分配钓场
 */
var addPartnerUserSiteQueryParam = {
	'index': 0,
	'size' : 8,
	'keyword': '',
	'nextPage': ''
};
function addPartnerUserSite(){
	var html = "";
	html += '<div id="addPartnerUser_dialog">';
	html += '	<div class="check_search">';
	html += '		<input id="check_search_input" class="check_search_input" type="text" value="" placeholder="请输入用户你昵称、手机号码查询" style="width:486px">';
	html += '		<img class="check_search_button" src="../../images/frame_images/u709.png" onclick="searchPartnerUserSite()">';
	html += '	</div>';
	html += '	<div id="check_main" class="check_main">';
	html += '		<!--动态增加钓场数据-->';
	html += '	</div>';
	html += '</div>';
	$(html).appendTo($(document.body));
	createDialogPopupOnlyCancel('addPartnerUser_dialog', 540, 600, "给合伙人分配钓场");
	
	addPartnerUserSiteQueryParam.type = 1;
	queryPartnerUserSite();
	$("#check_main").bind('scroll', function() {
		console.info("scrollTop:", $("#check_main").scrollTop());
		var currScrolledHeight = $("#check_main").scrollTop() + $("#check_main").height();
		var divDocumentHeight  = $("#check_main")[0].scrollHeight;
		console.info("currScrolledHeight: "+currScrolledHeight+" divDocumentHeight: "+divDocumentHeight);
        if(currScrolledHeight > divDocumentHeight) {
			console.info("scroll 1");
			addPartnerUserSiteQueryParam.index = addPartnerUserSiteQueryParam.nextPage;
			queryPartnerUserSite();
		} else if($("#check_main").scrollTop() <= 0) {
			console.info("scroll 2");
		}
    });
}
function searchPartnerUserSite(){
	keyword = $.trim($("#check_search_input").val());
	if(keyword.length > 0){
		addPartnerUserSiteQueryParam.keyword = keyword;
		addPartnerUserSiteQueryParam.index = 0;
		$("#check_main").html("");
		queryPartnerUserSite();
	}
}
function queryPartnerUserSite(){
	var keyword  = addPartnerUserSiteQueryParam.keyword;
	var size  = addPartnerUserSiteQueryParam.size;
	var index = addPartnerUserSiteQueryParam.index;
	AJAX.sites.list.partner("/_" + keyword + "/" + index + "/" + size, function(ret){
		console.info("sites.query success:", ret);
		if(typeof ret.body == 'undefined' || 
			(typeof ret.body.total != 'undefined' && ret.body.data.length == 0) || 
			(typeof ret.body.total == 'undefined' && ret.body.length == 0)){
			pageinfo.type = 1;
			_E.window.show("没有查询到数据！");
			return;
		}
		var lines = [];
		if(typeof ret.body.total != 'undefined'){
			lines = ret.body.data;
		}else{
			lines = ret.body;
		}
		
		if(lines.length > 0){
			addPartnerUserSiteQueryParam.nextPage = lines[lines.length-1].fishSiteId;
			var lineHtml = getSiteHtmlData(lines, false, "addSite4PartnerUser");
			$("#check_main").append(lineHtml);
		}
	}, function(ret){
		console.info("sites.query error:", ret);
	});
	addPartnerUserSiteQueryParam.keyword = "";
}

function editAuthentication(){
	//分页查询会员信息列表
	currQueryUserParam.pagenum = 1;
	currQueryUserParam.type = 0;
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
		
		createDialogPopupOnlyCancel('editAuthentication_dialog', 400, 600, "添加合伙人");
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



function addSite4PartnerUser(fishSiteId){
	if(typeof currPartner == 'undefined'){
		_E.window.show("请选择一个合伙人！");
		delPopul_div('addPartnerUser_dialog');
		return;
	}
	pageinfo.siteType = 1;
	pageinfo.partnerId = currPartner.pId;
	pageinfo.fishSiteId = fishSiteId;
	AJAX.users.partner.fishsite(pageinfo, function(ret){
		console.info("users.partner.fishsite-1 success:", ret);
		_E.window.show("成功给合伙人添加了一个钓场！");
		delPopul_div('addPartnerUser_dialog');
		selfSite();
	}, function(ret){
		console.info("users.partner.fishsite-1 error:", ret);
	});
}
//================================================================================给合伙人分配钓场 End.


//================================================================================修改合伙人信息 Start.
var updatePartnerInfoParam = {};
function updatePartnerInfo(){
	if(currid == undefined) {
		_E.window.show("请选择合伙人哦！");
		return;
	}
	updatePartnerInfoParam.id = currid;
	updatePartnerInfoParam.pId = currpid;
	console.info("updatePartnerInfoParam:", updatePartnerInfoParam);
	AJAX.users.partner.modification("", function(ret){
		console.info("users.partner.modification success:", ret);

		//刷新区域列表
		initPCityTree(updatePartnerInfoParam.pRegionId);
		//刷新合伙人列表
		getPartnerData();
	}, function(ret){
		console.info("users.partner.modification error:", ret);
	}, updatePartnerInfoParam);
}
function updatePartnerInfoInputBinds(){
	$("#u852_input").blur(function () { //姓名
		updatePartnerInfoParam.realname = $(this).val();
		updatePartnerInfo();
	});
	$("#u866_input").blur(function () { //手机
		updatePartnerInfoParam.phone = $(this).val();
		updatePartnerInfo();
	});
	$("#u876_input").blur(function () { //邮箱
		updatePartnerInfoParam.email = $(this).val();
		updatePartnerInfo();
	});
	$("#u901_input").blur(function () { //备注
		updatePartnerInfoParam.pRemark = $(this).val();
		updatePartnerInfo();
	});
	$("#u859").click(function () { //男
		setSex1Style();
		updatePartnerInfoParam.sex = 1;
		updatePartnerInfo();
	});
	$("#u861").click(function () { //女
		setSex0Style();
		updatePartnerInfoParam.sex = 0;
		updatePartnerInfo();
	});
}

function setProvince(pRegionId){
	$(".items").css("border-color", "#CCCCCC");
	$("#province_" + pRegionId).css("border-color", "#0081C2");
	updatePartnerInfoParam.pRegionId = pRegionId;
	updatePartnerInfo();
}

function setSex1Style(){
	$("#cache201").css("color", "rgb(0, 204, 255)");
	$("#cache199").css("color", "rgb(0, 0, 0)");
	$("#u859_div").css("border-color", "#0081C2");
	$("#u861_div").css("border-color", "#CCCCCC");
}
function setSex0Style(){
	$("#cache201").css("color", "rgb(0, 0, 0)");
	$("#cache199").css("color", "rgb(0, 204, 255)");
	$("#u859_div").css("border-color", "#CCCCCC");
	$("#u861_div").css("border-color", "#0081C2");
}

/**
 * 编辑合伙人信息
 */
var currPartner;
var currUser;
function editPartnerUser(index, obj){
	currUser = partnerQureyData[index];
	currid = currUser.id;
	AJAX.users.partner.id("/" + currid , function(ret){
		currpid = currUser.pId;
		console.log('$(obj).attr("index")========' + $(obj).attr("index"));
		console.log('[id, pId]=========[%d, %d]', currid, currpid);
		console.log('regionId========%s', partnerQureyData.regionId);
		$(".check_main_field").css("color", "#000");
		$(obj).css("color", "#0081c2");
		currPartner = ret.body;
		pageinfo.partnerId = currPartner.pId;
		if(  typeof currPartner.portriat != 'undefined' && currPartner.portriat.substr(0, 4) == "WXIN"){
			currPartner.portriat = "http://wx.qlogo.cn/mmopen/" + currPartner.portriat.substr(4);
		}
		$("#u944 > div > img").attr("src", currPartner.portriat);
		$("#u852_input").val(isNull_0(currPartner.realname));	updatePartnerInfoParam.realname = currPartner.realname;
		$("#u866_input").val(isNull_0(currPartner.phone));		updatePartnerInfoParam.phone = currPartner.phone;
		$("#u876_input").val(isNull_0(currPartner.email));		updatePartnerInfoParam.email = currPartner.email;
		$("#u901_input").val(isNull_0(currPartner.pRemark));	updatePartnerInfoParam.remark = currPartner.pRemark;
		var sex = $.trim(isNull_0(currPartner.sex));			updatePartnerInfoParam.sex = currPartner.sex;
		sex="0";
		if(sex.length > 0){
			if(sex == "1"){
				setSex1Style();
			}else{
				setSex0Style();
			}
		}
		$(".items").css("border-color", "#CCCCCC");
		$("#province_" + updatePartnerInfoParam.pRegionId).css("border-color", "#0081C2");
		//查询合伙人钓场
		$("#u846_state1").html("");
		getPartnerSites();
	});
}
/**
 * 初始设置用户区域
 */
function initUserCheckArea(dataPCity){
	var cityHtml = '';
	$.each(window.top.dataProv, function(n,value){
		allPCityData.push(value);
		cityHtml+= '<div id="province_' + value.regionNum + '" class="items" onmouseover="groupOnMouseOver(this)" style="background-color: rgb(255, 255, 255); width: 45px;" onclick="setProvince(' + value.regionNum + ')">';
		if(value.regionName.indexOf("黑龙江") == -1 ){
			cityHtml+= value.regionName.substr(0,2);
		}else{
			cityHtml+= '黑龙江';
		}
		cityHtml+= '</div>';
	});
	$("#u887_div").append(cityHtml);
}
/**
 * 选择群组鼠标悬浮事件
 * @param obj
 */
function groupOnMouseOver(obj){
	$(".items").css("background-color", "rgb(255, 255, 255)");
	$(obj).css("background-color", "rgba(0, 204, 255, 1)");
}
//================================================================================修改合伙人信息 End.

/**
 * 初始区域分类
 */
var allPCityData=[];
function initPCityTree(regionNum){
	
	
	AJAX.users.partner.region(function(ret){
		var cityHtml = '';
		$.each(ret.body , function(n,value){
			allPCityData.push(value);
			cityHtml+= '<div class="areas" onmouseover="cityOnMouseOver(this)" onclick="getRegionUsers(' + value.regionNum + ', this)">';
			cityHtml+= '	<img src="../../images/partner_images/p63.png" style="border-radius: 90px; width: 12px; height: 12px; margin: 0px 5px 1px 40px;">';
			cityHtml+= '	' + value.regionName;
			cityHtml+= '</div>';
		});
		$("#areaSelectedPanel").html("");
		$("#areaSelectedPanel").append(cityHtml);
		regionNum = regionNum == undefined ? ret.body[0].regionNum : regionNum;
		getRegionUsers(regionNum, "#areaSelectedPanel > div:nth-child(1)");
	});
	
	
}

/**
 * 按区域分类鼠标悬浮事件
 * @param obj
 */
function cityOnMouseOver(obj){
	$(".areas").css("background-color", "rgb(255, 255, 255)");
	$(obj).css("background-color", "rgb(245, 245, 245)");
}
/**
 * 初始功能分类
 */
function initPFunTree(data){
	if(typeof data != "undefined"){
		var funHtml = "";// '<div class="star_fun" onmouseover="funOnMouseOver(this)">全部钓场</div>';
		for(var i=0; i<data.length; i++){
			var f = data[i];
			funHtml+= '<div class="star_fun" onmouseover="funOnMouseOver(this)" onclick="getTypeSites(' + f.type + ')">' + f.name + '</div>';
		}
		$("#styleSelectedPanel").append(funHtml);
	}
}
/**
 * 查询各类型钓场
 */
function getTypeSites(stype){
	if(stype == -1) {
		_E.window.show("下期哦！");
		return;
	}
	pageinfo.type = stype;
	pageinfo.status = 1; //1表示审核中，0表示审核不通过，2表示审核通过
	getPartnerData();
}
/**
 * 通过区域查询合伙人
 */
function getRegionUsers(regionId, obj){
	updatePartnerInfoParam.pRegionId = regionId; //修改合伙人信息时
	$(".areas").css("color", "#000");
	$(obj).css("color", "#0081c2");
	pageinfo.type = 0;
	pageinfo.uesrpagestart = 0;
	pageinfo.regionId = regionId;
	getPartnerData();
}
/**
 * 搜索合伙人
 */
function showSearch(){
	if($("#u501").css("visibility") == "hidden"){
		$("#u501").css("visibility", "visible");
	}else{
		$("#u501").css("visibility", "hidden");
	}
}
/**
 * 搜索合伙人，按回车
 */
function key13(e){
	var keyCode = keypress(e);
	if(keyCode == 13) {
		var keyword = $("#u504_input").val();
		if(typeof keyword == 'undefined' || (typeof keyword != 'undefined' && keyword.length == 0)){
			_E.window.show("请输入关键字查询！");
			return;
		}
		pageinfo.type = 1;
		pageinfo.uesrpagestart = 0;
		pageinfo.keyword = keyword;
		getPartnerData();
	}
}
var partnerQureyData;
function getPartnerData(){
	AJAX.users.partner.qurey(pageinfo, function(ret){
		console.info("users.partner.qurey success =>" + pageinfo.type, ret);
		if(ret.body == undefined){
			$("#u825").html('<center style="opacity: 0.5;">查询的信息发生问题，请稍候再试！</center>');
		}
		partnerQureyData = ret.body;
		if(partnerQureyData.length == undefined){
			partnerQureyData = partnerQureyData.data;
		}
		partnerQureyData.regionId = pageinfo.regionId;
		lines = partnerQureyData;
		if(lines.length > 0){
			if(pageinfo.uesrpagestart == 0){
				$("#u825").html("");
			}
			var lineHtml = "";
			for(var i=0; i<lines.length; i++){
				var line = lines[i];
				if(line.realname == null || line.realname == undefined){
					line.realname = line.nickname;
				}
				lineHtml += '<div index="'+i+'" class="check_main_field" onclick="editPartnerUser(' + i + ', this)">';
				lineHtml += '	<div class="check_main_field_header">';
				lineHtml += '		<img src="' + line.portriat + '" onload="imgLoad(this)">';
				lineHtml += '	</div>';
				lineHtml += '	<div class="check_main_field_text" title="' + line.realname + '">' + line.realname + '</div>';
				lineHtml += '	<div class="check_main_field_text">' + line.phone + '</div>';
				lineHtml += ' <div class="" ></div> ';
				lineHtml += '</div>';
			}
			$("#u825").append(lineHtml);
			$("#u825").bind('scroll', function() {
				//console.info("scrollTop:", $("#u825").scrollTop());
				var currScrolledHeight = $("#u825").scrollTop() + $("#u825").height();
				var divDocumentHeight  = $("#u825")[0].scrollHeight;
				console.info("currScrolledHeight: "+currScrolledHeight+" divDocumentHeight: "+divDocumentHeight);
		        if(currScrolledHeight >= divDocumentHeight) {
					//console.info("scroll 1");
					pageinfo.uesrpagestart += pageinfo.uesrpagesize;
					getPartnerData();
				} else if($("#u825").scrollTop() <= 0) {
					//console.info("scroll 2");
				}
		    });
			
		}else{
			if(pageinfo.uesrpagestart == 0){
				$("#u825").html('<center style="opacity: 0.5;">没有查询到数据！</center>');
			}else{
				$("#u825").html('<center style="opacity: 0.5;">没有更多数据了哦！</center>');
			}
			return;
		}
	}, function(ret){
		console.info("users.partner.qurey error =>" + pageinfo.type, ret);
	});
	//
	if(pageinfo.type == 13){
		$("#u1025").css("display", "none");
		$("#u9460").css("display", "block");
	}else{
		$("#u1025").css("display", "block");
		$("#u9460").css("display", "none");
	}
}

/**
 * 合伙人审核-操作面板
 */
function partnerCheck(){
	if(currUser == undefined){
		_E.window.show("请选择一个合伙人！");
		return;
	}
	var html = "";
	html += '<div id="partnerCheck_dialog">';
	html += '	<div class="check_main" style="height: 76px;">';
	html += '		<div class="cm_button" onclick="partnerCheckDo(2)">通过审核</div>';
	html += '		<div class="cm_button" style="background: #F11717;" onclick="partnerCheckDo(0)">审核不通过</div>';
	html += '	</div>';
	html += '</div>';
	$(html).appendTo($(document.body));
	
	createDialogPopupOnlyCancel('partnerCheck_dialog', 400, 150, "[" + currUser.realname + "]的合伙人申请");
	
}
/**
 * 合伙人审核-执行
 */
function partnerCheckDo(status){
	var checkStatusMsg = "";
	if(status == 0){
		checkStatusMsg = "审核不通过";
	}else if(status == 2){
		checkStatusMsg = "审核通过";
	}else{
		status = undefined;
	}
	if(status != undefined){
		_E.window.confirm("您现在正在操作的是：<font color='#F11717'>" + checkStatusMsg + "</font>[" + currUser.realname + "]的申请合伙人操作，您确认执行本次审核吗？", function(){
			var checkParam = {
				'uid': currUser.id,
				'status': status
			};
			AJAX.users.partner.check("", function(ret){
				console.info("users.partner.modification success:", ret);
				_E.window.show("您已对[" + currUser.realname + "]的合伙人申请，执行<font color='#F11717'>" + checkStatusMsg + "</font>操作！");
				//刷新“申请合作”
				getTypeSites(13);
			}, function(ret){
				console.info("users.partner.modification error: %o checkParam: %o", ret, checkParam);
				_E.window.show("您在对[" + currUser.realname + "]的合伙人申请，执行<font color='#F11717'>" + checkStatusMsg + "</font>操作，时失败，请联系管理员！<font color='#000'>后台返回：<i>" + ret.errMsg + "</i></font>");
			}, checkParam);
			delPopul_div("partnerCheck_dialog");
		}, function(){
			console.info("NO");
		});
	}
}

/**
 * 添加合伙人
 */
var currQueryUserParam = {
	'type'     : 0,
	'pagesize' : 12,
	'pagenum'  : 1,
	'orderRule': 'registimedesc'
};
function addPartnerUser(){
	//分页查询会员信息列表
	currQueryUserParam.type = 0;
	AJAX.users.query(currQueryUserParam, function(ret){
		console.info("users.list success", ret);
		var rows = ret.body;
		var html = "";
		html += '<div id="addPartnerUser_dialog">';
		html += '	<div class="check_search">';
		html += '		<input id="check_search_input" class="check_search_input" type="text" value="" placeholder="请输入用户你昵称、手机号码查询">';
		html += '		<img class="check_search_button" src="../../images/frame_images/u709.png" onclick="searchUser()">';
		html += '	</div>';
		html += '	<div id="check_main" class="check_main">';
		html += '		<!--动态增加用户数据-->';
		html += '	</div>';
		html += '</div>';
		$(html).appendTo($(document.body));
		
		createDialogPopupOnlyCancel('addPartnerUser_dialog', 400, 600, "添加合伙人");
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
				html += '		<div class="check_main_field" onclick="addPartner(' + pageinfo.regionId + ', ' + row.id + ')">';
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
//添加合伙人
function addPartner(region, uid){
	var param = {
		"uid": uid,
		"region": region
	}
	AJAX.users.partner.add("", function(ret){
		console.info("users.partner.add success", ret);
		delPopul_div('addPartnerUser_dialog');
		_E.window.show("成功添加合伙人！")
		//刷新区域列表
		initPCityTree();
		//刷新合伙人列表
		getPartnerData();
	}, function(ret){
		console.info("users.partner.add error", ret);
	}, param);
}




/**
 * 按功能分类鼠标悬浮事件
 * @param obj
 */
function funOnMouseOver(obj){
	$(".star_fun").css("background-color", "rgb(255, 255, 255)");
	$(obj).css("background-color", "rgb(245, 245, 245)");
}

//设置底部的位置
function setButtonLineSize(){u825
	$(".u968")       .css("height", (bodyHeight - 173) + "px");
	$("#u825")       .css("height", (bodyHeight - 173) + "px");
	
	$("#u846_state0").css("height", (bodyHeight - 173) + "px");
	$("#u846_state1").css("height", (bodyHeight - 173) + "px");
	$("#u847")       .css("height", (bodyHeight - 173) + "px");
	$("#u847_div")   .css("height", (bodyHeight - 173) + "px");
	//备注框
	$("#u899_div")   .css("height", ($("#u847").height() -  494) + "px");
	$("#u901_input") .css("height", ($("#u847").height() -  508) + "px");
}
/**
 * 初始化标签功能
 * 包括：色彩及各种事件
 */
function initLabelFun(){
	//设置搜索框placeholder
	$("#u852_input").attr("placeholder", "姓名");
	$("#u866_input").attr("placeholder", "手机");
	$("#u876_input").attr("placeholder", "邮箱");
	$("#u901_input").attr("placeholder", "备注");
	$("#u504_input").attr("placeholder", "输入用户名或者手机号查询");
	onMouseChangeCss("#u859", "#u859_div", 1, "background-color", "rgba(0, 204, 255, 1)", "rgb(255, 255, 255)");
	onMouseChangeCss("#u861", "#u861_div", 1, "background-color", "rgba(0, 204, 255, 1)", "rgb(255, 255, 255)");
	onMouseChangeCss("#u942", "#u942_img", 2, "src", "../../images/frame_images/u698_mouseOver.png", "../../images/frame_images/u698.png");
	onMouseChangeCss("#u946", "#u946_img", 2, "src", "../../images/frame_images/u698_mouseOver.png", "../../images/frame_images/u698.png");
	$("#u504_input").bind('keydown', function(e) {
		key13(e);
	});
}

/**
 * 切换功能分类
 * @param tab_id
 */
function changeTab(tab_id){
	if(tab_id){
		if(tab_id == 1){
			$("#u959 > p > span").text("区域");
			$("#u965_img").attr("src", "../../images/partner_images/city_u965_selected.png");
			$("#u989_img").attr("src", "../../images/partner_images/collect_u989.png");

			$("#styleSelectedPanel").css("display", "none");
			$("#styleSelectedPanel").css("visibility", "hidden");
			$("#areaSelectedPanel").css("visibility", "visible");
			$("#areaSelectedPanel").fadeIn();
			$("#areaSelectedPanel").fadeIn("slow");
			$("#areaSelectedPanel").fadeIn(3000);
			$("#areaSelectedPanel").css("visibility", "visible");
		}else if(tab_id == 2){
			$("#u959 > p > span").text("类型");
			$("#u965_img").attr("src", "../../images/partner_images/city_u965.png");
			$("#u989_img").attr("src", "../../images/partner_images/collect_u989_selected.png");

			$("#areaSelectedPanel").css("display", "none");
			$("#areaSelectedPanel").css("visibility", "hidden");
			$("#styleSelectedPanel").css("visibility", "visible");
			$("#styleSelectedPanel").fadeIn();
			$("#styleSelectedPanel").fadeIn("slow");
			$("#styleSelectedPanel").fadeIn(3000);
		}
	}
}

var dataPFun = [
    {
    	"name" : "签约最多TOP10",
    	"count": 10,
    	"type" : -1
    },
    {
    	"name" : "最近引入合伙人",
    	"count": 10,
    	"type" : -1
    },
    {
    	"name" : "星标合伙人",
    	"count": 0,
    	"type" : -1
    },
    {
    	"name" : "申请合作",
    	"count": 55,
    	"type" : 13
    }
]