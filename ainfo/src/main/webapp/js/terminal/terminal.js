var pagenum = 1;
var pagesize = 10; window.top.getPageSize();
var bodyHeight;
var bodyWidth;
var positionArray=[];
var areaArray=[];

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
	getData();
	setRemoteCombox('f_status', 'status_list_input', false, '0', function(e){
		staffListParams.status = e.value;
		getData();
		console.info(e);
	});
});
COMBOX_INIT_TEXT="请选择";

function setButtonLineSize(){
	$('#dg').datagrid({
        onSortColumn: function (sort, order) {
            //alert("sort:"+sort+",order："+order+"");
        }
	});
	$('#pp').pagination({
		onSelectPage:function(pageNumber, pageSize){
			$(this).pagination('loading');
			console.info('pageNumber:'+pageNumber+',pageSize:'+pageSize);
			staffListParams.pagenum = pageNumber;
			staffListParams.pagesize= pageSize;
			getData();
			$(this).pagination('loaded');
		}
	});
}
var staffListData = [];
var staffListParams = {
	'status'  : 0,
	'pagenum' : pagenum,
	'pagesize': pagesize
}


function getData(){
	AJAX.terminal.list(staffListParams, function(ret){
		console.info("staff.list success %o", ret);
		staffListData = ret.body.items;
		for(var i=0; i<staffListData.length; i++){
			ret.body.items[i].sUpdateTime = transtateTimestamp(staffListData[i].updateTime);
			ret.body.items[i].sCreateTime = transtateTimestamp(staffListData[i].createTime);
			switch(staffListData[i].status){
			case 0:
				ret.body.items[i].sStatus = "正常";
				break;
			case 1:
				ret.body.items[i].sStatus = "禁用";
				break;
			case 2:
				ret.body.items[i].sStatus = "删除";
				break;
			}
			var funHtml = "";
			funHtml += '<div class="line_operate_button" onclick="addEdit(' + i + ')">修改</div>';
			funHtml += '<div class="line_operate_button" onclick="del_(' + i + ')">删除</div>';
			ret.body.items[i].fun = funHtml;
			ret.body.items[i].serial = (i+1);
		}
		$('#dg').datagrid({
		    columns:[[
				{field:'serial',      title:'序号',     align:'center', sortable: true},
				{field:'number',      title:'终端编号', align:'center', sortable: true},
				{field:'name',        title:'终端名称', align:'center', sortable: true},
				{field:'sStatus',     title:'状态',     align:'center', sortable: true},
				{field:'sUpdateTime', title:'更新时间', align:'center', sortable: true},
				{field:'sCreateTime', title:'创建时间', align:'center', sortable: true},
				{field:'fun',         title:'操作', align:'center'}
		    ]],
		    data: ret.body.items
		});
		$('#pp').pagination({
		    total   : ret.body.totalItem,
		    pageSize: ret.body.pagesize,
		    pageList: [10,20,50,100]
		});
	}, function(){
		console.info("staff.list error %o", ret);
	});
}

function addEdit(index){
	var current = {};
	var popupTitle = "添加";
	if(index == undefined){
		current.number = "";
		current.name = "";
		current.ip = "";
		current.status = "";
		current.staff = "";
		current.password = "";
		current.position = "";
		current.area = "";
		current.desc = "";
	}else{
		popupTitle = "修改";
		current = staffListData[index];
	}
	var html = $("<div id='discover_div' style='padding:0; margin: 0;'>" +
				"<table style='padding: 0; margin: 15px 30px 0px 30px; border: 0; font-size: 12px; color:#333;'>" +
					"<tr>" +
						"<td align='center' width='60px'>终端编号：</td>" +
						"<td align='left' width='150px'>" +
						"	<input id='number_input' type='text' class='dInput' value='" + current.number + "' maxlength='16'/>" +
						"</td>" +
						"<td align='center'>*</td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' width='60px'>终端名称：</td>" +
						"<td align='left' width='150px'>" +
						"	<input id='name_input' type='text' class='dInput' value='" + current.name + "' maxlength='16'/>" +
						"</td>" +
						"<td align='center'>*</td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' width='60px'>终端ＩＰ：</td>" +
						"<td align='left' width='150px'>" +
						"	<input id='ip_input' type='text' class='dInput' value='" + current.ip + "' maxlength='20'/>" +
						"</td>" +
						"<td align='center'>*</td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' width='60px'>拥有功能：</td>" +
						"<td align='left' width='150px'>" +
						"	<input id='position_input'  type='text' class='dInput' value='" + current.position + "' maxlength='18' placeholder='" + COMBOX_INIT_TEXT + "'/>" +
						"</td>" +
						"<td align='center'>*</td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' width='60px'>所属区域：</td>" +
						"<td align='left' width='150px'>" +
						"	<input id='area_input'  type='text' class='dInput' value='" + current.area + "' maxlength='18'/>" +
						"</td>" +
						"<td align='center'>*</td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' width='60px'>所属员工：</td>" +
						"<td align='left' width='150px'>" + 
						"	<input id='staff_input'  type='text' class='dInput' value='" + current.staffId + "' maxlength='18'/>" +
						"</td>" +
						"<td align='center'>*</td>" +
					"</tr>" +
						"<tr>" +
						"<td align='center' width='60px'>终端状态：</td>" +
						"<td align='left' width='150px'>" +
						"	<input id='status_input'  type='text' class='dInput' value='" + current.status + "' maxlength='18'/>" +
						"</td>" +
						"<td align='center'>*</td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' width='60px'>描述：</td>" +
						"<td align='left' width='150px'>" +
						"	<textarea id='desc_input' class='dInput dtextarea'>" + current.desc + "</textarea>" +
						"</td>" +
						"<td align='center'></td>" +
					"</tr>" +
				"</table>" +
			"</div>");
	$(html).appendTo($(document.body));
	setRemoteCombox('f_position', 'position_input', true, current.position);
	setRemoteCombox('f_area', 'area_input', false, current.area);
	setRemoteCombox('f_status', 'status_input', false, current.status);
	setStaffCombox('staff_input', current.staffId);
	createDialogPopup('discover_div', 390, 450, popupTitle, function(){
		toAddOrUpdate(current.id);
	});
}
/**
 * 新建修改
 */
function toAddOrUpdate(id){
	var params = {
		'number'  : $("#number_input").val(),
		'name'    : $("#name_input").val(),
		'ip'      : $("#ip_input").val(),
		'position': convertArray2String($('#position_input').combobox('getValues')),
		'area'    : $('#area_input').combobox('getValue'),
		'staffId' : $('#staff_input').combobox('getValue'),
		'status'  : $('#status_input').combobox('getValue'),
		'desc'    : $("#desc_input").val()
	};
	if(!parseParams(params)){
		return;
	}
	if(id == undefined){
		AJAX.terminal.add("" , function(ret){
			delPopul_div("discover_div");
			getData();
			console.debug("terminal.add success ret %o", ret);
		}, function(ret){
			console.debug("terminal.add error ret %o", ret);
		}, params);
	}else{
		params.id = id;
		AJAX.terminal.update("" , function(ret){
			delPopul_div("discover_div");
			getData();
			console.debug("terminal.update success ret %o", ret);
		} , function(ret){
			console.debug("terminal.update error ret %o", ret);
		}, params);
	}
}
/**
 * 删除
 */
function del_(i){
	var current = staffListData[i];
	_E.window.confirm("您正在删除终端【" + current.name + "】,删除后不可回复！确认删除吗？", function(){
		var param = {
			"id": current.id
		}
		AJAX.terminal.del("", function(ret){
			_E.window.show("您成功删除了终端【" + current.name + "】！");
			getData();
			console.info("staff.del success %o", ret);
		}, function(ret){
			console.info("staff.del error %o", ret);
		}, param);
	}, function(){
		_E.window.show("取消删除终端【" + current.name + "】！");
	});
}
/**
 * 检查参数正确性
 */
function parseParams(obj){
	var due2input = function(param, id, message){
		if(param.length == 0){
			$("#" + id).attr("placeholder", message);
			$("#" + id).focus();
			return false;
		}
		return true;
	}
	var due2combox = function(param, id, message){
		if(param.length == 0){
			_E.window.show(message);
			return false;
		}
		return true;
	}
	if(!due2input(obj.number,    'number_input',   "终端编号不可空")) return false;
	if(!due2input(obj.name,      'name_input',     "终端名称不可空")) return false;
	if(!due2input(obj.ip,        'ip_input',       "终端ＩＰ不可空")) return false;
	if(!due2combox(obj.position, 'position_input', "请选择拥有功能")) return false;
	if(!due2combox(obj.area,     'area_input',     "请选择所属区域")) return false;
	if(!due2combox(obj.staffId,  'staff_input',    "请选择所属员工")) return false;
	if(!due2combox(obj.status,   'status_input',   "请选择终端状态")) return false;
	return true;
}
/**
 * 初始化拥有功能、所属区域、终端状态下拉框
 */
function setRemoteCombox(type, id, multiple, key, __onSelect){
	AJAX.dicts.query("/"  + type, function(ret){
		console.debug("dicts.query " + type + " success ret %o %o", ret, key);
		$("#" + id).combobox({
		    valueField 	: 'value',
		    textField	: 'name',
		    data		: ret.body,
		    multiple    : multiple,
		    onSelect	: function(a) {
		    	if(typeof __onSelect == 'function'){
		    		__onSelect(a);
		    	}
		    },
			onUnselect  : function(a) {
			}
		});
		if(key != undefined && key != null && key != ""){
			if(multiple){
				var keys = key.split(",");
				key = "";
				for(var i=0; i<keys.length; i++){
					key += "'" + keys[i] + "',";
				}
				eval("key = ["+key+"]");
				$("#"+id).combobox('setValues',key);
			}else{
				$("#"+id).combobox('setValue',key);
			}
		}
	} , function(ret){
		console.debug("dicts.query " + type + " error ret %o", ret);
	});
}
/**
 * 初始化所属员工下拉框
 */
function setStaffCombox(id, key){
	var staffListParams = {
		'status'  : 0,
		'pagenum' : 1,
		'pagesize': 2000
	}
	AJAX.staff.list(staffListParams, function(ret){
		console.debug("staff.list success ret %o %o", ret, key);
		$("#" + id).combobox({
		    valueField 	: 'number',
		    textField	: 'name',
		    data		: ret.body.items,
		    onSelect	: function(a) {
		    },
			onUnselect  : function(a) {
			}
		});
		$("#"+id).combobox('setValue',key);
	} , function(ret){
		console.debug("staff.list error ret %o", ret);
	});
}