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
	//初始标签分组
	initPFunTree(dataPFun);
	//初始化按钮功能
	initButtonFun();
	//初始化“贴标签”库
	initLabelData();
	//初始化“黑名单”库
	initblackData();
	//添加分页组件
	pagination.init(getData, "pagination_id");
	getAllUsers();
});

/**
 * 页面信息
 */
var currentPageData;
var pageinfo = {
	"pagesize" : pagination.getPageSize(),
	"pagenum"  : pagenum,
	"totalitem": 0,
	'orderRule': 'registimedesc'
}

/**
 * 查询默认显示（全部钓场、正常、上架）钓场
 */
function getAllUsers(){
	pageinfo.type = 0;
	getData();
}
/**
 * 查询各类型钓场
 */
function getTypeUsers(stype){
	if(stype == -1) {
		_E.window.show("下期哦！");
		return;
	}
	pageinfo.type = stype;
	getData();
}
/**
 * 关键字搜索
 */
function onSearch(){
	var keyword = $("#search_input").val();
	if(keyword.length > 0){
		console.info("onSearch", keyword);
		pageinfo.type = 1;
		pageinfo.keyword = keyword;
		getData();
	}
	//searchUserList();
}
/**
 * 查询用户信息
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
	
	AJAX.users.query(pageinfo, function(data){
		if(typeof data.body.total == 'undefined' || data.body.total == 0){
			pageinfo.type = 1;
			_E.window.show("没有查询到数据！");
			return;
		}
		pageinfo.totalitem = data.body.total;
		currentPageData = data.body.data;

		$("#u668").html("");
		var lines = currentPageData;
		if(lines.length > 0){
			var lineHtml = "";
			var currPhone = "";
			for(var i=0; i<lines.length; i++){
				var line = parseData(lines[i]);
				
				if( typeof line.phone  != 'undefined' ){
					currPhone = line.phone;
				}
				var phoneIconBg = "";
				if(line.realname != undefined || line.realname != null){
					phoneIconBg = " background: #FBFF02;";
				}
				
				lineHtml += '<div class="line" onmouseover="lineOnMouseOver(this, ' + i + ', ' + line.id + ')">';
				lineHtml += '	<div class="line_check_area">';
				lineHtml += '		<input class="line_checkbox" id="ckbox_' + i + '" type="checkbox" name="ckbox"/>';
				lineHtml += '	</div>';
				lineHtml += '	<div class="line_fun_area" onclick="lineOnClick(' + i + ')">';
				lineHtml += '		<img class="line_img" src="' + line.portriat + '"/>';
				lineHtml += '		<div class="line_name_star">';
				lineHtml += '			<div class="line_up"   style="width: 120px;" title="' + line.nickname + '">' + line.nickname + '</div>';
				lineHtml += '			<div class="line_down" style="font-size: 17px;">   </div>';// 标签
				lineHtml += '		</div>';
				lineHtml += '		<div class="line_contacts_platform">';
				lineHtml += '			<div class="line_up">';
				lineHtml += '				<img style="width: 13px;' + phoneIconBg + '" src="../../images/frame_images/u604.png"/>';
				lineHtml += '				<span>' + currPhone + '</span>';
				lineHtml += '			</div>';
				lineHtml += '		</div>';
				lineHtml += '		<div class="line_remark">';
				lineHtml += '			<img src="../../images/frame_images/u685.png"/>';
				lineHtml += '			<textarea id="textarea_' + i + '" class="line_remark_text" disabled="disabled">' + line.remark + '</textarea>';
				lineHtml += '		</div>';
				lineHtml += '		<div class="line_operate" style="width: 185px;">';
				lineHtml += '			<div key="'+line.id+'" class="line_operate_button" onclick="editMark(' + i + ', this)" style="width: 80px;">修改备注</div>';
				lineHtml += '			<div key="'+line.id+'" class="line_operate_button" onclick="userauth(' + i + ', this)" style="width: 80px;">实名认证</div>';
				lineHtml += '		</div>';
				lineHtml += '	</div>';
				lineHtml += '</div>';
				currPhone = "";
			}
			$("#u668").append(lineHtml);
			if(pagesize > (getElementHeight("#u668") / getElementHeight(".line"))){
				$("#u668").addClass("scroll_div");
			}else if(lines.length > pagesize){
				pageinfo.totalitem = lines.length;
				pageinfo.pagesize = lines.length;
				$("#u668").addClass("scroll_div");
			}else{
				$("#u668").removeClass("scroll_div");
			}

			//如果图片加载不成功则使用，默认图像
			$('img').error(function(){
			    $(this).attr('src',"../../images/main_images/u192_mouseOver.png");
			})
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
		eval("lineData." + n + "='" + isNull_0(value) + "'");
	});
	lineData.remark = isNull_0(lineData.remark);
//	if(typeof lineData.portriat != "undefined" &&  lineData.portriat.substr(0, 4) == "WXIN"){
//		lineData.portriat = "http://wx.qlogo.cn/mmopen/" + lineData.portriat.substr(4);
//	}else if(lineData.portriat.indexOf(RES_PORT_URL) == -1){
//		lineData.portriat = RES_PORT_URL + lineData.portriat;
//	}
	return lineData;
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
	panel.html("");
	
	switch(type){
	case 1:
		createFloatPanel({
			left:125,
			data:labelData,
			buttons:{
				'success':'贴上去',
				'cancel':'不贴'
			},
			success: function(panel, result){
				console.info("user.success:", result);
				if(result.length > 0){
					var labels = "";
					for(var i=0; i<result.length; i++){
						labels += result[i].value + "\31";
					}
					for(var i=0; i<checkValues.length; i++){
						var uid = currentPageData[checkValues[i]].id;
						var param = {
							'userId': uid,
							'labels': labels
						}
						AJAX.users.modify.label(null, function(ret){
							console.info("users.modify.label success", ret);
							_E.window.show("已贴标签！");
						}, function(ret){
							console.info("users.modify.label error", ret);
						}, param);
					}
					panel.remove();
				}else{
					_E.window.show("请选择！");
				}
			},
			cancel: function(result){
				console.info("user.cancel");
			}
		});
		break;
	case 2:
		createFloatPanel({
			left:225,
			data:blackData,
			//input: true,
			buttons:{
				'success':'立即拉黑',
				'cancel':'取消拉黑'
			},
			success: function(panel, result){
				console.info("user.success:", result);
				if(result.length > 0){
					var labels = "";
					for(var i=0; i<result.length; i++){
						labels += result[i].value + "\31";
					}
					for(var i=0; i<checkValues.length; i++){
						var uid = currentPageData[checkValues[i]].id;
						var param = {
							'userId': uid,
							'blackLabels': labels
						}
						AJAX.users.modify.black(null, function(ret){
							console.info("users.modify.black success", ret);
							_E.window.show("已拉黑！");
						}, function(ret){
							console.info("users.modify.black error", ret);
						}, param);
					}
					panel.remove();
				}else{
					_E.window.show("请选择！");
				}
			},
			cancel: function(result){
				console.info("user.cancel");
			}
		});
		break;
	case 3:
		_E.window.show("下期哦！");
		panel.css("display", "none");
		return;
		panel.css("left", "325px");
		break;
	case 4:
		createFloatPanel({
			left:425,
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
	}
}
function userauth(index,obj){
	var user = currentPageData[index];
	if(user.realname == undefined){
		user.realname = "";
	}
	if(user.idcard == undefined){
		user.idcard = "";
	}
	var html = $("<div id='userauth_div' style='padding:0; margin: 0;'>" +
				"<table style='padding: 0; margin: 10px 20px; border: 0; font-size: 12px; color:#333;'>" +
					"<tr>" +
						"<td align='center' width='60px'>真实姓名：</td>" +
						"<td align='left' width='150px'>" +
						"	<input id='realName_input' type='text' style='width:250px;height:25px;' value='" + user.realname + "' maxlength='16'/>" +
						"</td>" +
						"<td align='center'></td>" +
					"</tr>" +
//					"<tr>" +
//						"<td align='center' width='60px'>手机号码：</td>" +
//						"<td align='left' width='150px'>" +
//						"	<input id='phone_input'  type='text' style='width:250px;height:25px;' value='" + user.phone + "'/>" +
//						"</td>" +
//						"<td align='center'></td>" +
//					"</tr>" +
					"<tr>" +
						"<td align='center' width='60px'>身份证号：</td>" +
						"<td align='left' width='150px'>" +
						"	<input id='idNumber_input'  type='text' style='width:250px;height:25px;' value='" + user.idcard + "' maxlength='18'/>" +
						"</td>" +
						"<td align='center'></td>" +
					"</tr>" +
				"</table>" +
			"</div>");
	$(html).appendTo($(document.body));
	
	createDialogPopup('userauth_div', 387, 190, "用户实名认证",function(){
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
}
/**
 * 设置修改备注
 * @param index
 */
function editMark(index,obj){
	console.info("index:", index);
	
	var html = "";
	html += "<div id='editSysRemark_div'>";
	html += 	"<textarea id='remark_id' style='width: 370px; height: 270px; border: none; margin: 5px; resize: none'>" + $("#textarea_" + index).val() + "</textarea>";
	html += "</div>";
	$(html).appendTo($(document.body));
	
	createDialogPopup('editSysRemark_div', 387, 360, "修改用户备注",function(){
		var remarkInfo = $("#remark_id").val();
		console.info("remark_id:", $("#remark_id").val());
		console.info("OK", index);
		var param = {
			"userId":$(obj).attr("key"),
			"remark": remarkInfo
		}
		AJAX.users.remark("", function(data){
			
			$("#textarea_" + index).html(remarkInfo);
			
			console.info("successData:", data);
			_E.window.show("该会员已修改备注！");
			delPopul_div('editSysRemark_div');
			//getData();
		}, function(data){
			console.info("errorData:", data);
		}, param);
	});
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
 * 初始功能分类
 */
function initPFunTree(data){
	if(typeof data != "undefined"){
		var funHtml = "";
		for(var i=0; i<data.length; i++){
			var f = data[i];
			var countStr = '(' + f.count + ')';
			if(f.count == -1){
				countStr = '';
			}
			funHtml+= '<div class="star_fun" onmouseover="funOnMouseOver(this)" onclick="getTypeUsers(' + f.type + ')">' + f.name + countStr + '</div>';
		}
		$("#u689").append(funHtml);
	}
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
 * 窗口大小发生变化时页面后窗口的调整
 */
function setButtonLineSize(){
	$("#u713")         .css("left",  (bodyWidth - 237) + "px");
	$("#u719")         .css("left",  (bodyWidth -  66) + "px");
	$("#u689")         .css("left",  (bodyWidth - 236) + "px");
	$("#u689")         .css("height",(bodyHeight- 166) + "px");
	//表格区域的位置 
	$("#u725")         .css("left",  (bodyWidth - 288) + "px");
	$("#u694_div")     .css("width", (bodyWidth - 284) + "px");
	$("#u668")         .css("width", (bodyWidth - 286) + "px");
	$("#u668")         .css("height",(bodyHeight- 200) + "px");
	//搜索部件的位置
	$("#search")       .css("left",  (bodyWidth - 633) + "px");
	$("#u1142")        .css("left",  (bodyWidth - 303) + "px");
	//分页部件的位置
	$("#pagination_id").css("top",(bodyHeight - 62)+ "px");
}
/**
 * 初始化按钮功能
 * 包括：色彩及各种事件
 */
function initButtonFun(){
	//设置搜索框placeholder
	$("#search_input").attr("placeholder", "可输入用户昵称、手机号码进行查询");	
	onMouseChangeCss("#u706", "#u706_img", 2, "src", "../../images/frame_images/u698_mouseOver.png", "../../images/frame_images/u698.png");
	onMouseChangeCss("#u698", "#u698_img", 2, "src", "../../images/frame_images/u698_mouseOver.png", "../../images/frame_images/u698.png");
	onMouseChangeCss("#u700", "#u700_img", 2, "src", "../../images/frame_images/u698_mouseOver.png", "../../images/frame_images/u698.png");
	onMouseChangeCss("#u702", "#u702_img", 2, "src", "../../images/frame_images/u698_mouseOver.png", "../../images/frame_images/u698.png");
}
//初始化“贴标签”库
function initLabelData(){
	AJAX.dicts.get("/label", function(ret){
		console.info("dicts.label success:", ret)
		labelData = parseLabels2Data(ret.body);
	}, function(ret){
		console.info("dicts.label error:", ret)
	});
}
//初始化“黑名单”库
function initblackData(){
	AJAX.dicts.get("/black", function(ret){
		console.info("dicts.black success:", ret)
		blackData = parseLabels2Data(ret.body);
	}, function(ret){
		console.info("dicts.black error:", ret)
	});
}
function parseLabels2Data(data){
	var ret = [];
	for(var i=0; i<data.length; i++){
		ret.push({
			"name" : data[i].value,
			"value": data[i].code
		});
	}
	return ret;
}

/**
 * 模糊查询用户列表
 */
function searchUserList(_start , _size ){
	var param = $("#search_input").val();	//模糊查询参数
	
	if( param == "" ){
		return;
	}
	
	var start = 1;	//默认的起始
	var size = 8;	//默认的长度
	if( typeof _start != 'undefined' ){
		start = _start;
	}
	if( typeof _size != 'undefined' ){
		size = _size;
	}
	
	var params = {
			param : param,
			start : start,
			size  : size
	};
	AJAX.users.like(params , function(){
		//成功回调函数
		
		//清空页面原有数据
		$("#u668").empty();
		
		//布局数据
		if(typeof data.body.total == 'undefined' || data.body.total == 0){
			pageinfo.type = 1;
			_E.window.show("没有查询到数据！");
			return;
		}
		pageinfo.totalitem = data.body.total;
		currentPageData = data.body.data;

		$("#u668").html("");
		var lines = currentPageData;
		if(lines.length > 0){
			var lineHtml = "";
			var currPhone = "";
			for(var i=0; i<lines.length; i++){
				var line = parseData(lines[i]);
				
				if( typeof line.phone  != 'undefined' ){
					currPhone = line.phone;
				}
				
				lineHtml += '<div class="line" onmouseover="lineOnMouseOver(this, ' + i + ', ' + line.id + ')">';
				lineHtml += '	<div class="line_check_area">';
				lineHtml += '		<input class="line_checkbox" id="ckbox_' + i + '" type="checkbox" name="ckbox"/>';
				lineHtml += '	</div>';
				lineHtml += '	<div class="line_fun_area" onclick="lineOnClick(' + i + ')">';
				lineHtml += '		<img class="line_img" src="' + line.portriat + '"/>';
				lineHtml += '		<div class="line_name_star">';
				lineHtml += '			<div class="line_up"   style="width: 120px;" title="' + line.nickname + '">' + line.nickname + '</div>';
				lineHtml += '			<div class="line_down" style="font-size: 17px;">   </div>';// 标签
				lineHtml += '		</div>';
				lineHtml += '		<div class="line_contacts_platform">';
				lineHtml += '			<div class="line_up">';
				lineHtml += '				<img style="width: 13px;" src="../../images/frame_images/u604.png"/>';
				lineHtml += '				<span>' + currPhone + '</span>';
				lineHtml += '			</div>';
				lineHtml += '		</div>';
				lineHtml += '		<div class="line_remark">';
				lineHtml += '			<img src="../../images/frame_images/u685.png"/>';
				lineHtml += '			<textarea id="textarea_' + i + '" class="line_remark_text" disabled="disabled">' + line.remark + '</textarea>';
				lineHtml += '		</div>';
				lineHtml += '		<div class="line_operate">';
				lineHtml += '			<div key="'+line.id+'" class="line_operate_button" onclick="editMark(' + i + ', this)" style="width: 90px;">修改备注</div>';
				lineHtml += '		</div>';
				lineHtml += '	</div>';
				lineHtml += '</div>';
				currPhone = "";
			}
			$("#u668").append(lineHtml);
			if(pagesize > (getElementHeight("#u668") / getElementHeight(".line"))){
				$("#u668").addClass("scroll_div");
			}else if(lines.length > pagesize){
				pageinfo.totalitem = lines.length;
				pageinfo.pagesize = lines.length;
				$("#u668").addClass("scroll_div");
			}else{
				$("#u668").removeClass("scroll_div");
			}
		}
		pagination.voluation(pageinfo);
	}, function(data){
		console.info("errorData:", data);
	});
		
}

var dataPFun = [
    {
    	"name" : "黑名单",
    	"count": -1,
    	"type" : -1
    },
    {
    	"name" : "全部会员",
    	"count": -1,
    	"type" : 0
    },
    {
    	"name" : "工作人员",
    	"count": 0,
    	"type" : -1
    },
    {
    	"name" : "特别关注",
    	"count": 0,
    	"type" : -1
    },
    {
    	"name" : "论坛管理",
    	"count": 0,
    	"type" : -1
    },
    {
    	"name" : "钓场塘主",
    	"count": 0,
    	"type" : -1
    },
    {
    	"name" : "渔具店主",
    	"count": 0,
    	"type" : -1
    }
]
var labelData=[
	{
		'name':'工作人员',
		'value':'工作人员'
	},
	{
		'name':'特别关注',
		'value':'特别关注'
	},
	{
		'name':'论坛管理',
		'value':'论坛管理'
	}
]
var blackData=[
	{
		'name':'恶意攻击',
		'value':'恶意攻击'
	},
	{
		'name':'违反规定',
		'value':'违反规定'
	},
	{
		'name':'违反规定',
		'value':'违反规定'
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