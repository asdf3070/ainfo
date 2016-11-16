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
	//切换筛选面板
	//changeTab(1);
	//初始化标签功能
	initLabelFun();
	
	//初始区域分类
	initPCityTree();
	//初始功能分类
	initPFunTree(dataPFun);
	
	//添加分页组件
	pagination.init(getData, "pagination_id");
	getdefaultQuery();
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
	pageinfo.type = stype;
	getData();
}
/**
 * 查询默认钓场财务信息
 */
function getdefaultQuery(){
	pageinfo.type = 0;
	getData();
}
/**
 * 关键字搜索
 */
function onSearch(){
	_E.window.show("需求不明确，API没有对应接口，明确后添加！");
	return;
	var keyword = $("#search_input").val();
	console.info("onSearch", keyword);
	pageinfo.type = 5;
	pageinfo.keyword = keyword;
	getData();
}
/**
 * 通过区域查询钓场
 */
function getRegionSites(category, regionId){
	pageinfo.type = 6;
	pageinfo.category = category;
	pageinfo.regionId = regionId;
	getData();
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
	
	AJAX.account.query(pageinfo, function(data){
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
				lineHtml += '			<img src="' + line.mainImg + '" onload="imgLoad(this)"/>';
				lineHtml += '		</div>';
				lineHtml += '		<div class="line_name_star">';
				lineHtml += '			<div class="line_up"   style="width: 120px;" title="' + line.fishSiteName + '">' + line.fishSiteName + '</div>';
				lineHtml += '			<div class="line_down">';
				lineHtml += '				<img style="width: 13px;" src="../../images/frame_images/u604.png"/>';
				lineHtml += '				<span>' + line.phone + '</span>';
				lineHtml += '			</div>';
				lineHtml += '		</div>';
				lineHtml += '		<div class="line_contacts_platform">';
				lineHtml += '			<div class="line_up" style="top: 8px;">';
				lineHtml += '				<span style="font-size:20px; color:red">余额:' + line.balance + '</span>';
				lineHtml += '			</div>';
				lineHtml += '			<div class="line_down">';
				lineHtml += '				<span>累计提现:' + line.withdrawTotal + '</span>';
				lineHtml += '			</div>';
				lineHtml += '		</div>';
				lineHtml += '		<div class="line_contacts_platform">';
				lineHtml += '			<div class="line_up" style="top: 8px;">';
				lineHtml += '				<span style="font-size:20px;">存鱼:' + line.depositFish + '</span>';
				lineHtml += '			</div>';
				lineHtml += '			<div class="line_down">';
				lineHtml += '				<span>累计存鱼:' + line.depositFish_Total + '</span>';
				lineHtml += '			</div>';
				lineHtml += '		</div>';
				lineHtml += '		<div class="line_operate">';
				lineHtml += '			<div class="line_operate_button" onclick="queryTradeList(' + i + ', ' + line.fishSiteId + ')" style="width: 70px;">交易记录</div>';
				lineHtml += '			<div class="line_operate_button" onclick="storeDetail(' + i + ', ' + line.depositFish + ')" style="width: 70px;">存鱼情况</div>';
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
                                                                                     // 当每页面要显示的行数超过可显示的行数时，滚动显示
			if(getElementHeight("#u1077") > 2 && pagesize > (getElementHeight("#u1077") / getElementHeight(".line"))){ 
				pageinfo.totalitem = lines.length;
				$("#u1077").addClass("scroll_div");
			}else{                                                                   // 否则取消滚动显示
				$("#u1077").removeClass("scroll_div");
			}
			if(lines.length > pagesize){                                             // 如果本次要显示的数据总数超过大小
				pageinfo.totalitem = lines.length;
				pageinfo.pagesize = lines.length;
			}
		}
		pagination.voluation(pageinfo);
	}, function(data){
		console.info("errorData:", data);
	});
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
//	if(lineData.mainImg.length == 0){
//		lineData.mainImg = "../../images/frame_images/p65.png";
//	}else{
//		lineData.mainImg = RES_PROC_URL + lineData.mainImg;
//	}
	if(lineData.phone.length > 0){
		lineData.phone = "(" + lineData.phone + ")";
	}
	return lineData;
}

/**
 * 指定塘主
 */
var currQueryUserParam = {
	'type'     : 0,
	'pagesize' : 18,
	'pagenum'  : 1,
	'orderRule': 'registimedesc'
};
function queryTradeList(index, siteId){
	var currSite = currentPageData[index];
	//分页查询会员信息列表
	currQueryUserParam.type = 0;
	currQueryUserParam.siteId = siteId;
	var html = "";
	html += '<div id="queryTradeList_dialog">';
	html += '	<div class="check_search_popup">';
	html += '		<input id="check_search_input" class="check_search_input" type="text" value="" placeholder="请输入相关内容查询">';
	html += '		<img class="check_search_button" src="../../images/frame_images/u709.png" onclick="searchUser()">';
	html += '	</div>';
	html += '	<div style="float:right;"><input id="styleSelect" name="status_input" style="width:140px;height:42px;border:0px;"/></div>';

	html += '	<div class="selecter_lable_area">';
	for(var i=0; i<recordLabelArray.length; i++){
		html += '	<div  onmouseover="selecterFieldOnMouseOver(this)" onclick="getIsFree(0, \'商业钓场\', this)">' + recordLabelArray[i].text + '</div>';
	}
	html += '	</div>';
	html += '	<div class="selecter_table_head">';
	html += '		<div style="width:  5%;">编号</div>';
	html += '		<div style="width: 14%;">创建时间</div>';
	html += '		<div style="width:  8%;">交易分类</div>';
	html += '		<div style="width:  8%;">名称</div>';
	html += '		<div style="width: 20%;">交易号</div>';
	html += '		<div style="width:  8%;">对方</div>';
	html += '		<div style="width:  8%;">金额</div>';
	html += '		<div style="width:  7%;">状态</div>';
	html += '		<div style="width: 11%;">操作</div>';
	html += '	</div>';
	html += '	<div id="check_main" class="check_main">';
	html += '		<!--动态增加用户数据-->';
	html += '	</div>';
	html += '</div>';
	$(html).appendTo($(document.body));
	
	createDialogPopupOnlyCancel('queryTradeList_dialog', bodyWidth-50, bodyHeight-120, currSite.fishSiteName + "交易记录");
	queryList();
	$("#check_main").css("height", ($("#queryTradeList_dialog > div.panel > div").height()-116) + "px");
	$("#check_main").bind('scroll', function() {
		console.info("scrollTop:", $("#check_main").scrollTop());
		var currScrolledHeight = $("#check_main").scrollTop() + $("#check_main").height();
		var divDocumentHeight  = $("#check_main")[0].scrollHeight;
		console.info("currScrolledHeight: "+currScrolledHeight+" divDocumentHeight: "+divDocumentHeight);
        if(currScrolledHeight > divDocumentHeight) {
			console.info("scroll 1");
			currQueryUserParam.pagenum++;
			queryList();
		} else if($("#check_main").scrollTop() <= 0) {
			console.info("scroll 2");
		}
    });
	createcombobox('styleSelect', recordStyleArray, function(){
		//
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
function queryList(){
	AJAX.account.list(currQueryUserParam, function(ret){
		console.info("users.conditions success", ret);
		var rows = ret.body.data;
		if(rows.length > 0){
			for(var i=0; i<rows.length; i++){
				var row = parseListData(rows[i]);
				html = "";
				html += '		<div class="cselecter_table_body">';
				html += '			<div style="width:  5%; text-align: right;">' + (i+1) + '</div>';
				html += '			<div style="width: 14%; text-align: center;">' + row.tradeTime + '</div>';
				html += '			<div style="width:  8%; text-align: center;">' + row.tradeType + '</div>';
				html += '			<div style="width:  8%; text-align: center;">' + row.description + '</div>';
				html += '			<div style="width: 20%; text-align: center;">' + row.orderId + '</div>';
				html += '			<div style="width:  8%; text-align: center;">' + row.otherSide + '</div>';
				html += '			<div style="width:  8%; text-align: center;">' + row.tradeMoney + '</div>';
				html += '			<div style="width:  7%; text-align: center;">' + row.status + '</div>';
				html += '			<div style="width: 11%; text-align: center;"> </div>';
				html += '		</div>';
				$(html).appendTo($("#check_main"));
			}
		}
	}, function(ret){
		console.info("users.conditions error", ret);
	});
}

function parseListData(row){
	$.each(row, function(n,value){
		value = isNull_0(value);
		if(n == "tradeTime"){
			value = transtateTimestamp(parseInt(value));
		}
		if(n == "tradeType"){
			switch(parseInt(value)){
				case 0:
					value = "购票";
					break;
				case 5:
					value = "提现";
					break;
			}
		}
		if(n == "status"){
			switch(parseInt(value)){
				case 0:
					value = "失败";
					break;
				case 1:
					value = "成功";
					break;
			}
		}
		
		eval("row." + n + "='" + value + "'");
	});
	return row;
}
function authentication(siteId, uid){
	var param = {
		"uid": uid,
		"siteId": siteId
	}
	//指定塘主
	AJAX.sites.authentication("", function(ret){
		console.info("sites.authentication success", ret);
		delPopul_div('queryTradeList_dialog');
		_E.window.show("成功指定钓场主！")
	}, function(ret){
		console.info("sites.authentication error", ret);
	}, param);
}

/**
 * 存鱼情况
 */
function storeDetail(index, depositFish){
	var currSite = currentPageData[index];
	currQueryUserParam.fishSiteId = currSite.fishSiteId;  //设置钓场id
	//分页查询会员信息列表
	currentFeeType = [];
	var html = "";
	html += '<div id="editfeeType_dialog">';
	html += '	<div class="big_info">';
	html += '		<p style="font-size: 13px; font-weight: 100; top: 30px;">当前存鱼总额</p>';
	html += '		<p style="top: 0px;" id="storeTotal">' + depositFish + '</p>';
	html += '	</div>';
	html += '	<div class="selecter_lables selecter">';
	html += '		<div class="selecter_lable" onclick="switchSelecter(this, 1, switchCallBack)" style="width:187px">存鱼排行</div>';
	html += '		<div class="selecter_lable" onclick="switchSelecter(this, 2, switchCallBack)" style="width:187px">存鱼流水</div>';
	html += '	</div>';
	html += '	<div class="selecter_mains selecter" style="height:172px">';
	html += '		<div class="selecter_main" id="selecter-1" style="height:490px"> <!--动态增加用户数据--> </div>';
	html += '		<div class="selecter_main" id="selecter-2" style="height:490px"> <!--动态增加用户数据--> </div>';
	html += '	</div>';
	html += '</div>';
	$(html).appendTo($(document.body));
	
	createDialogPopupOnlyCancel('editfeeType_dialog', 400, 700, currSite.fishSiteName + "存鱼信息",function(){
		//
	});
	switchSelecter(null, 1, switchCallBack);
	
	$("#selecter-1").bind('scroll', function() {
		scrollLoading(this);
    });
	$("#selecter-2").bind('scroll', function() {
		scrollLoading(this);
    });
}
/**
 * 切换标签页
 * @param obj
 * @param sp_id
 * @param __callback
 */
function switchSelecter(obj, sp_id, __callback){
	$(".selecter_main").css("display", "none");
	$("#selecter-" + sp_id).css("display", "block");
	$(".selecter_lable").css("color", "#5A4D4D");
	$(".selecter_lable").css("background-color", "#ECECEC");
	if(obj == null){
		obj = $(".selecter_lables").children().eq(sp_id - 1)
	}
	$(obj).css("background-color", "rgb(0, 0, 0)");
	$(obj).css("color", "rgb(239, 234, 234)");
	if(typeof __callback == 'function'){
		__callback(sp_id);
	}
}
/**
 * 切换标签页后回调
 * @param sp_id
 */
function switchCallBack(sp_id){
	currQueryUserParam.type       = sp_id;  			  //设置查询方式
	currQueryUserParam.selecterId = "#selecter-" + sp_id; //设置查询方式
	currQueryUserParam.pagesize   = 12;
	if($("#selecter-" + sp_id).html().indexOf("动态增加用户数据") != -1){
		$("#selecter-" + sp_id).html("");
		currQueryUserParam.startId = 0;
		queryUserFinance(sp_id);
	}
	if(sp_id == 2){
		
	}
}

function selecterFieldOnMouseOver(obj){
	$(".selecter_lable_area div").css("background-color", "#7D7D7D");
	$(obj).css("background-color", "rgba(0, 204, 255, 1)");
}

function queryUserFinance(sp_id){
	AJAX.deposits.query(currQueryUserParam, function(ret){
		console.info("users.conditions success", ret);
		var rows = ret.body;
		if(rows.length > 0){
			if(sp_id == 1){
				for(var i=0; i<rows.length; i++){
					var row = rows[i];
					html = "";
					html += '		<div class="check_main_field">';
					html += '			<div class="check_main_field_header">';
					html += '				<img src="' + row.portriat + '" onload="imgLoad(this)"/>';
					html += '			</div>';
					html += '			<div class="check_main_field_text" title="' + row.nickname + '">' + row.nickname + '</div>';
					html += '			<div class="check_main_field_text" style="float: right; color: red;">' + row.balance + '</div>';
					html += '		</div>';
					$(html).appendTo($(currQueryUserParam.selecterId));
				}
			}else if(sp_id == 2){
				for(var i=0; i<rows.length; i++){
					var row = rows[i];
					if(row.direction == 0){
						row.direction = "使用";
						row.tradeMoney = "-" + row.tradeMoney;
					}else{
						row.direction = "存鱼";
						row.tradeMoney = row.tradeMoney;
					}
					html = "";
					html += '		<div class="check_main_field" style="height:60px; position: relative;">';
					html += '			<div class="line_contacts_platform" style="width: 60%;">';
					html += '				<div class="line_up" style="top: 4px;">';
					html += '					<div class="check_main_field_header" style="margin: 0px 5px 0px 25px;">';
					html += '						<img src="' + row.portriat + '" onload="imgLoad(this)"/>';
					html += '					</div>';
					html += '					<div style="float: left; margin-top: 5px;" title="' + row.nickname + '">' + row.nickname + '</div>';
					html += '				</div>';
					html += '				<div class="line_down" style="left: 25px; font-size: 12px;">';
					html += '					<span>' + transtateTimestamp(row.createTime) + '</span>';
					html += '				</div>';
					html += '			</div>';
					html += '			<div class="line_contacts_platform" style="width: 40%;">';
					html += '				<div class=""   style="color: red; text-align: right; padding: 5px 10px 0px 0px;">';
					html += '					<span>' + row.tradeMoney + '</span>';
					html += '				</div>';
					html += '				<div class="" style="text-align: right; padding-right: 10px;">';
					html += '					<span>' + row.direction + '</span>';
					html += '				</div>';
					html += '			</div>';
					html += '		</div>';
					$(html).appendTo($(currQueryUserParam.selecterId));
				}
			}
		}else{
			html = '<center style="color: rgba(255, 0, 0, 0.21);">这里没有更多信息了！</center>';
			$(html).appendTo($(currQueryUserParam.selecterId));
		}
	}, function(ret){
		console.info("users.conditions error", ret);
	});
}

function scrollLoading(obj){
	console.info("scrollTop:", $(obj).scrollTop());
	var currScrolledHeight = $(obj).scrollTop() + $(obj).height();
	var divDocumentHeight  = $(obj)[0].scrollHeight;
	console.info("currScrolledHeight: "+currScrolledHeight+" divDocumentHeight: "+divDocumentHeight);
    if(currScrolledHeight >= divDocumentHeight) {
		console.info("scroll 1");
		currQueryUserParam.pagenum++;
		queryUserFinance();
	} else if($(obj).scrollTop() <= 0) {
		console.info("scroll 2");
	}
}


function editSite(index){
	console.info("index:", index);
	window.parent.showSiteEdit(currentPageData[index], index);
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
	_E.window.show("下期哦！");
	return;
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
	lastFunType = type;
	$(".fun_panle").remove();
	switch(type){
	case 1:
		createFloatPanel({
			left:350,
			width:200,
			data: orderData,
			buttons:{},
			success: function(result){
				console.info("user.success:", result);
				for(var i=0; i<orderData.length; i++){
					var v = parseInt(result[0].value);
					if(orderData[i].value == v){
						if(typeof orderData[i].orderRule != 'undefined'){
							pageinfo.orderRule = orderData[i].orderRule;
							getData();
						}else{
							_E.window.show("下期哦！");
						}
					}
				}
			},
			cancel: function(result){
				console.info("user.cancel");
			}
		});
		break;
	case 2:
		_E.window.show("下期哦！");
		break;
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
					cityHtml+= '<div class="areas city" onmouseover="cityOnMouseOver(this)" onclick="getRegionSites(2, ' + p.rid + ')">' + city.city + '(' + city.count + ')</div>';
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
			if(f.count != -1){
				f.count = "("  + f.count + ")";
			}else{
				f.count = "";
			}
			funHtml+= '<div class="star_fun" onmouseover="funOnMouseOver(this)" onclick="getTypeSites(' + f.type + ')">' + f.name + '' + f.count + '</div>';
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
	$("#u1109")      .css("height",(bodyHeight - 170)+ "px");
	//设置“按功能分类”外框
	$("#u1234")      .css("height",(bodyHeight - 170)+ "px");
	//设置“列表”外框
	$("#u1077")      .css("height",(bodyHeight - 195)+ "px");
	//分页部件的位置
	$("#pagination_id").css("top",(bodyHeight - 65)+ "px");
	//设置表顶
	$("#remind_line").css("width", ($("#u1128_div").width()-400) + "px");
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
    	"name" : "签约钓场",
    	"count": -1,
    	"type" : 0
    },
    {
    	"name" : "提现待审核",
    	"count": -1,
    	"type" : -1
    },
    {
    	"name" : "提现已通过",
    	"count": -1,
    	"type" : -1
    },
    {
    	"name" : "提现未通过",
    	"count": -1,
    	"type" : -1
    }
]


var orderData = [
	{
		'name':'按用户昵称升序',
		'value':1
	},
	{
		'name':'按用户昵称降序',
		'value':2
	},
	{
		'name':'按注册日期升序',
		'value':3,
		'orderRule':'registimeasc'
	},
	{
		'name':'按注册日期降序',
		'value':4,
		'orderRule':'registimedesc'
	},
	{
		'name':'按最活跃降序',
		'value':5
	}
]
var recordStyleArray = [
    {
    	"text" : "全部",
    	"value": 15
    },
    {
    	"text" : "消费（购票）",
    	"value": 0
    },
    {
    	"text" : "退票",
    	"value": 5
    }
];
var recordLabelArray = [
    {
    	"text" : "所有状态",
    	"value": 0
    },
    {
    	"text" : "进行中",
    	"value": 1
    },
    {
    	"text" : "等待付款",
    	"value": 2
    },
    {
    	"text" : "等待发货",
    	"value": 3
    },
    {
    	"text" : "等待确认发货",
    	"value": 4
    },
    {
    	"text" : "退款",
    	"value": 5
    },
    {
    	"text" : "成功",
    	"value": 6
    },
    {
    	"text" : "失败",
    	"value": 7
    },
    {
    	"text" : "维权",
    	"value": 8
    }
];