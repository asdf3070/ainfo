var tspi = {
	'version': '',
	'RES_PROC_URL': "",
	'RES_DYNA_URL': "",
	'RES_PORT_URL': "",
	'RES_DISC_URL': "",
	'RES_SITES_AUTO_INFO': ""
};
if(typeof getCookie == 'undefined'){
	console.info();
}

/**
 * 系统配置集
 */
var SYS_PARAMS = getCookie("SYS_PARAMS") == "" ? {} : JSON.parse(getCookie("SYS_PARAMS"));
/**
 * version: 当前控制台版本
 * RES_PROC_URL: 钓场主图/图片/视频
 * RES_DYNA_URL：钓场动态（放鱼、鱼获、攻略）
 * RES_PORT_URL：用户头像
 * RES_DISC_URL：发现图标
 * RES_SITES_AUTO_INFO: 钓场主推广链接
 */
var version = SYS_PARAMS.version;
var RES_PROC_URL = SYS_PARAMS.RES_PROC_URL;
var RES_DYNA_URL = SYS_PARAMS.RES_DYNA_URL;
var RES_PORT_URL = SYS_PARAMS.RES_PORT_URL;
var RES_DISC_URL = SYS_PARAMS.RES_DISC_URL;
var RES_SITES_AUTO_INFO = SYS_PARAMS.RES_SITES_AUTO_INFO;

/**
 * 鼠标指针进出事件变换效果
 * @param mouseHit 触发鼠标事件的标签
 * @param mouseChange 变换效果的标签
 * @param type 执行类型：1-css 2-attr
 * @param type4Name 
 * @param type4Over
 * @param type4Out
 */
function onMouseChangeCss(mouseHit, mouseChange, type, type4Name, type4Over, type4Out){
	$(mouseHit).mouseover(function(){
		if(type == 1){
			$(mouseChange).css(type4Name, type4Over);
		} else{
			$(mouseChange).attr(type4Name, type4Over);
		}
	});
	$(mouseHit).mouseout(function(){
		if(type == 1){
			$(mouseChange).css(type4Name, type4Out);
		} else{
			$(mouseChange).attr(type4Name, type4Out);
		}
	});
}

/**
 * 以动态形式设置CSS数字样式
 */
function cssDynamicVary(obj, cssName, start, end, speed){
	var intervalId = setInterval(function(){
		if(start != end){
			obj.css(cssName, start + "px");
		}else{
			obj.css(cssName, start + "px");
			clearInterval(intervalId);
		}
		if(start < end){
			start++;
		}else{
			start--;
		}
	}, speed);
}

function transtateTimestamp(timestamp){
	var time = new Date(timestamp);
	var year = time.getFullYear();
	var month = (time.getMonth() + 1) > 9 && (time.getMonth() + 1) || ('0' + (time.getMonth() + 1))
	var date = time.getDate() > 9 && time.getDate() || ('0' + time.getDate())
	var hour = time.getHours() > 9 && time.getHours() || ('0' + time.getHours())
	var minute = time.getMinutes() > 9 && time.getMinutes() || ('0' + time.getMinutes())
	var second = time.getSeconds() > 9 && time.getSeconds() || ('0' + time.getSeconds())
	var YmdHis = year + '-' + month + '-' + date
		+ ' ' + hour + ':' + minute + ':' + second;
	return YmdHis;
}

/**
 * 获取标签的高度值
 * @param obj 对象
 * @param unit 单位 px、em...
 */
function getElementHeight(obj, unit){
	var height = $(obj).css("height");
	if(typeof unit == 'undefined' || unit == null){
		unit = "px";
	}
	height = height.substr(0, height.indexOf(unit));
	return parseInt(height);
}

/**
 * 生成二维码
 */
function createQRcode(obj, width, text){
	var e = $(obj);
	var param = {
		'width' : width,
		'height': width
	};
	var qrcode = new QRCode($(obj)[0], param);
    qrcode.makeCode(text);
}

function utf16to8(str) {   
    var out, i, len, c;   
    out = "";   
    len = str.length;   
    for(i = 0; i < len; i++) {   
    c = str.charCodeAt(i);   
    if ((c >= 0x0001) && (c <= 0x007F)) {   
        out += str.charAt(i);   
    } else if (c > 0x07FF) {   
        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));   
        out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));   
        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));   
    } else {   
        out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));   
        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));   
    }   
    }   
    return out;   
} 

/*
 * 创建下拉框选择控件
 * id input的id
 * array 下拉数组
 * _callback 下拉选择后的回调函数
 * multiple 是否是多选
 * key 选中的值，多选为数组
 **/
function createcombobox(id, array, _callback, multiple, key) {
	if(multiple == undefined){
		multiple = false;
	}
	$("#"+id).combobox({
	    valueField 	: 'value',   
	    textField	: 'text',
	    data		: array,
	    multiple    : multiple,
	    onSelect	: function(r) {
	    	if(typeof _callback === 'function') {
	    		_callback(r);
	    	}
	    }
	});
	if(key != undefined){
		$("#"+id).combobox('setValue',key);
	}
}

/**
 * 创建弹出层只有关闭按钮
 * id input的id
 * array 下拉数组
 * _callback 下拉选择后的回调函数
 */
function createDialogPopupOnlyCancel(div, width, height, title, _callback) {
	$('#'+div).dialog({
		width: width,
		height: height,   
		title: title,
		modal	   : true,
		collapsible: false,
		minimizable: false,
		maximizable: false,
		resizable  : false,
		closable   : false,
		buttons : [
			{
				text:'关闭',
				handler:function(){
					if(typeof _callback2 === 'undefined') {
						delPopul_div(div);
					} else if(typeof _callback2 === 'function') {
						_callback();
					}
				}
			}
		]
	});	
}
/**
 * 创建弹出层有确认和关闭按钮
 * id input的id
 * array 下拉数组
 * _callback 下拉选择后的回调函数
 */
function createDialogPopup(div, width, height, title,_callback1,_callback2) {
	$('#'+div).dialog({
		width: width,   
		height: height,   
		title: title,
		modal	   : true,
		collapsible: false,
		minimizable: false,
		maximizable: false,
		resizable  : false,
		closable   : false,
		buttons : [{
			text:'确定',
			handler:function(){
				if(typeof _callback1 === 'function') {
					_callback1();
				} else {
					EIMP.window.show('回调函数错误');
				}
			}
		},{
			text:'关闭',
			handler:function(){
				if(typeof _callback2 === 'undefined') {
					delPopul_div(div);
				} else if(typeof _callback2 === 'function') {
					_callback2();
				}
			}
		}]
	});	
}

/**
 * 删除弹出层div
 * @param div
 */
function delPopul_div(div) {
	$("#"+div).panel('close');
	$("#"+div).remove();
}

/**
 * 隐藏弹出层div
 * @param div
 */
function hidePopul_div(div) {
	$("#"+div).panel('close');
}

/**
 * 创建浮动式面板
 */
function createFloatPanel(param){
	var sTop = "";
	var sLeft = "";
	var sWidth = "";
	var sHeight = "";
	var noButtonName = "取消";
	if(typeof param.top    != 'undefined')sTop    = "top: "    + param.top    + "px;";
	if(typeof param.left   != 'undefined')sLeft   = "left: "   + param.left   + "px;";
	if(typeof param.width  != 'undefined')sWidth  = "width: "  + param.width  + "px;";
	if(typeof param.height != 'undefined')sHeight = "height: " + param.height + "px;";
	if(typeof param.buttons.cancel  != 'undefined')noButtonName = param.buttons.cancel;

	
	var panel = $(".fun_panle");
	if(panel.length != 0){
		panel.remove();
	}
	var html = "";
	html += '<div class="fun_panle" style="' + sTop + ' ' + sLeft + ' ' + sWidth + ' ' + sHeight + '">';
	html += '	<div id="panel_p1" class="panel_flow_layout" style="height: 85%">';
	for(var i=0; i<param.data.length; i++){
		html += '		<div class="panel_button panel_check_button" onclick="window.floatPanel.clickButton(this, ' + i + ')">';
		html += '			<span class="panel_check_button_text" value="' + param.data[i].value + '">' + param.data[i].name + '</span>';
		html += '		</div>';
	}
	html += '	</div>';
	var hasInput = false;
	if(typeof param.input != 'undefined'){
		hasInput = true;
		html += '	<div class="panel_flow_layout" style="height: 20%">';
		html += '		<input id="reason_input" type="text" value="" placeholder="输入理由">';
		html += '	</div>';
	}
	html += '	<div class="panel_flow_layout" style="height: 20%">';
	html += '		<div id="doPanelCancel" class="panel_button panel_control_button cancel_color">';
	html += '			<span class="panel_check_button_text" style="margin: 5px 16px;">' + noButtonName + '</span>';
	html += '		</div>';
	var clickOut = false;
	if(typeof param.buttons.success != 'undefined'){
		var okButtonName = "确认";
		if(typeof param.buttons.success != 'undefined')okButtonName = param.buttons.success;
		html += '		<div id="doPanelOk" class="panel_button panel_control_button ok_color">';
		html += '			<span class="panel_check_button_text" style="margin: 5px 16px;">' + okButtonName + '</span>';
		html += '		</div>';
	}else{
		clickOut = true;
	}
	html += '	</div>';
	html += '</div>';
	$('body').append(html);
	
	if(hasInput){
		$("#panel_p1").css("height", "65%");
		$("#reason_input").css("width", ($(".fun_panle").width()-10)+"px");
	}
		
	panel = $(".fun_panle");
	var display = panel.css("display");
	if(display == "none"){
		panel.fadeIn();
		panel.fadeIn("slow");
		panel.fadeIn(3000);
	}else{
		panel.remove();
	}
	
	$("#doPanelOk").click(function(){
		var result = window.floatPanel.getResult();
		param.success(panel, result);
	});
	$("#doPanelCancel").click(function(){
		panel.remove();
		if(typeof param.cancel == 'function'){
			param.cancel();
		}
	});
	
	window.floatPanel = {
		'params':{
			'clickOut': clickOut
		},
		'fData': param.data,
		'selectfData':{},
		'clickButton':function(obj, dIndex){
			var selObj = this.fData[dIndex];
			eval("var sel = this.selectfData.a_" + selObj.value);
			if(typeof sel == 'undefined'){
				$(obj).css("background-color", "#97E2FF");
				eval("this.selectfData.a_" + selObj.value + "=selObj.name");
			}else{
				$(obj).css("background-color", "#FFFFFF");
				eval("delete this.selectfData.a_" + selObj.value);
			}
			if(this.params.clickOut){
				//如果此面板没有按钮，则直接确认
				panel.remove();
				param.success(this.getResult());
			}
		},
		'getResult':function(){
			var sfData = this.selectfData;
			var reason = $("#reason_input").val();
			var result = [];
			if(hasInput && reason.length > 0){
				sfData.reason = reason;
			}
			$.each(sfData, function(n,value){
				result.push({
					"name" : value,
					"value": n.substr(2)
				})
			});
			return result;
		}
	};
	console.info("createFloatPanel inited");
}

/**
* 统一处理图片不变形
* 如果是img标签触发onload，如果是video标签触发oncanplaythrough
*/
function imgLoad(e) {
	//console.info("imgLoad:",$(e).attr("src"))
	//获取当前图片父div,此div设置宽度高度样式
	var parentDiv = $(e).parent();
	var _dwidth = $(parentDiv).width();
	var _dheight = $(parentDiv).height();
	var _iwidth = $(e).width();
	var _iheight = $(e).height();
	
	if(e.tagName.toUpperCase() == "VIDEO"){
		var tmp = _iwidth;
	}
	
	$(e).removeAttr("style");
	
	if(_iwidth > _iheight){//处理宽图片，显示中间部分
		$(e).css("height", _dheight + "px");
	}else if(_iwidth < _iheight){//处理高图片,让高图片显示中间部分
		$(e).css("width", _dwidth + "px");
	}else{
		$(e).css("width", _dwidth + "px");
	}
	_iwidth = $(e).width();
	_iheight = $(e).height();
	
	if(_iwidth < _iheight) {//处理高图片,让高图片显示中间部分
		var marginTop = (_iheight - _dheight) / 2 * -1;
		$(e).css('marginTop', marginTop+'px');
		
	} else if(_iwidth > _iheight) {//处理宽图片，显示中间部分
		var width = _iwidth / _iheight * _dheight / _dwidth * 100;
		$(e).css('width',width+'%');
		$(e).css('height','100%');
		//这里必须重新获取图片width
		_iwidth = $(e).width();
		var marginLeft = (_iwidth - _dwidth) / 2 * -1;
		$(e).css('marginLeft',marginLeft+'px');
	}
}

$('#search_input').bind('keydown', function(e) {
	var method = $("#u1145").attr("onclick");
	eval("method");
});


// Generate a pseudo-GUID by concatenating random hexadecimal.  
Math.guid = function() {
	//Generate four random hex digits.  
	function S4() {  
	   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);  
	}; 
   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4()).toUpperCase();  
};

function parsePCA(provinceId, cityId, regionId){
	var province = {'regionName':'','regionNum':''};
	var city     = {'regionName':'','regionNum':''};
	var region   = {'regionName':'','regionNum':''};
	
	if(provinceId != undefined && provinceId != null && provinceId > 0){
		eval("province = window.top.dataAreas.a" + provinceId);
	}
	if(cityId != undefined && cityId != null && cityId > 0){
		eval("city     = window.top.dataAreas.a" + cityId);
	}
	if(regionId != undefined && regionId != null && regionId > 0){
		eval("region   = window.top.dataAreas.a" + regionId);
	}
	
	//province = province == undefined ? {'regionName':''} : province;
	//city = city == undefined ? {'regionName':''} : city;
	//region = region == undefined ? {'regionName':''} : region;
	return {
		'province':province,
		'city':city,
		'region':region
	}
}

/**
 * 分页组件
 * */
var pagination = (function(){
	var init;
	var voluation;
	
	var pageinfo_ = {};
	
	
	//赋值
	voluation = function(pageinfo) {
		if(typeof pageinfo !== 'undefined') {
			pageinfo_ = pageinfo;
			//分页数据
			totalpage = getTotalPage(pageinfo);
			if(totalpage == 0) {
				$("#page_input").val('1');
			} else {
				$("#page_input").val(pagenum);
			}
			$("#page_size").val(pagesize);
			$("#totalpage").text(totalpage == 0 ? 1 : totalpage);
			var fromitem = (pagenum - 1) * pagesize + 1;
			var toitem = pagenum * pagesize;
			if(totalpage == 1){
				toitem = pageinfo.totalitem;
			}
			$("#fromitem").text(fromitem);
			$("#toitem").text(toitem);
			$("#totalitem").text(pageinfo.totalitem);
		}
	}
	
	/**
	 * 计算总页数
	 */
	getTotalPage = function(data){
		if(data.totalitem % data.pagesize == 0){
			return data.totalitem / data.pagesize
		}else{
			var total = (data.totalitem / data.pagesize + 1 + "");
			return parseInt(total.substring(0,total.indexOf(".")));
		}
	}
	
	/**
	 * 设置鼠标选中当前行数
	 */
	setCurrentRow = function(row, id){
		if(typeof row =='undefined' || row == null){
			$(".page_curr").css("display", "none");
		}else{
			row += parseInt($("#fromitem").text());
			$(".page_curr").css("display", "block");
			$("#page_curr_count").text(row);
		}
		$("#page_curr_id").text(id);
	}
	
	//参数_callbock 上一页下一页等执行函数
	init = function(_callbock, elementid) {
		var html = $("<div class='page contentpage'>" +
				"<div class='page_left'>" +
					"<div class='page_left_1'></div>" +
					"<div class='page_left_2'><img src='../../images/main_images/first.png' title='首页' id='first_page' /></div>" +
					"<div class='page_left_3'><img src='../../images/main_images/prev.png' title='上一页' id='prev_page' /></div>" +
					"<div class='page_left_1'></div>" +
					"<div class='page_left_4'>第</div>" +
					"<div class='page_left_5'>" +
						"<input id='page_input' size='1' title='按确认键提交' onkeyup=\"this.value=this.value.replace(/\D/g,'')\" />" +
					"</div>" +
					"<div class='page_left_3'>页，共<span id='totalpage'></span>页</div>" +
					"<div class='page_left_1'></div>" +
					"<div class='page_left_2'><img src='../../images/main_images/next.png' title='下一页' id='next_page' /></div>" +
					"<div class='page_left_3'><img src='../../images/main_images/last.png' title='尾页' id='last_page' /></div>" +
					"<div class='page_left_1'></div>" +
					"<div class='page_left_5'>" +
						"显示<span id='fromitem'>1</span>到<span id='toitem'>10</span>条，共<span id='totalitem'>0</span>条记录　" +
						"每页<input id='page_size' style='width: 25px; text-align: center;' size='1' title='按确认键提交' onkeyup=\"this.value=this.value.replace(/\D/g,'')\" />行　" +
					"</div>" +
					"<span class='page_curr'>当前是第</span><span class='page_curr' id='page_curr_count'></span><span class='page_curr'>条记录-></span>" +
					"<span class='page_curr'>ID为</span><span class='page_curr' id='page_curr_id'></span>　" +
				"</div>" +
				"" +
				"<div class='page_right'>" +
				"</div>" +
			"</div>");
		if(typeof elementid !== 'undefined') {
			html.appendTo($("#"+elementid));
		} else {
			html.appendTo($(document.body));
		}
		
		//第一页
		$('#first_page').bind('click', function() {
			if(pagenum != 1) {
				pagenum = 1;
				_callbock(pagesize, pagenum);
			}	
		});
		//上一页
		$('#prev_page').bind('click', function() {
			if(pagenum == 1) {
				return;
			}
			if(pagenum < 1) {
				pagenum = 1;
			} else {
				pagenum -= 1;
			}
			_callbock(pagesize, pagenum);
		});
		//下一页
		$('#next_page').bind('click', function() {
			if(pagenum >= totalpage) {
				return;
			}
			if(pagenum > totalpage) {
				pagenum = totalpage;
			} else {
				pagenum += 1;
			}
			_callbock(pagesize, pagenum);
		});
		//最后页
		$('#last_page').bind('click', function() {
			if(pagenum < totalpage) {
				pagenum = totalpage;
				_callbock(pagesize, pagenum);
			}
		});
		//分页输入框的确定按键事件
		$('#page_input').bind('keydown', function(e) {
			key13(e, _callbock);
		});
		//分页输入框的确定按键事件
		$('#page_size').bind('keydown', function(e) {
			key13(e, _callbock);
		});
	};
	
	key13 = function(e, _callbock){
		var keyCode = keypress(e);
		//删除
		if(keyCode == 13) {
			var page = $("#page_input").val();
			var size = $("#page_size").val();
			if(isNumber(size)){
				pagesize = size;
				window.top.setPageSize(pagesize);
				//console.info("pagesize", window.top.getPageSize());
			}
			if(isNumber(page)) {
				pagenum = parseInt(page);
				if(pagenum > totalpage) {
					pagenum = totalpage;
				} else if(pagenum < 1) {
					pagenum = 1;
				}
				_callbock(pagesize, pagenum);
			} 
			else {
				_E.window.show('请输入数字');
			}
			//重新设置页面分页信息栏
			pageinfo_.pagesize = pagesize;
			pagination.voluation(pageinfo_);
		}
	};
	
	getPageSize = function(){
		return parseInt(window.top.getPageSize());
	}
	
	return {
		init         : init,
		voluation    : voluation,
		setCurrentRow: setCurrentRow,
		getPageSize  : getPageSize
	};
}());
