var pagenum = 1;
var pagesize = 10; window.top.getPageSize();
var bodyHeight;
var bodyWidth;

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
	//添加分页组件
	pagination.init(getData, "pagination_id");
	getData();
});

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
	'pagenum':  pagenum,
	'pagesize': pagesize
}


function getData(){
	AJAX.staff.list(staffListParams, function(ret){
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
			ret.body.items[i].id = (i+1);
		}
		$('#dg').datagrid({
		    columns:[[
				{field:'id',          title:'序号',     align:'center', sortable: true},
				{field:'number',      title:'员工编号', align:'center', sortable: true},
				{field:'name',        title:'员工姓名', align:'center', sortable: true},
				{field:'sStatus',      title:'状态',     align:'center', sortable: true},
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
		current.status=0;
		current.password = "";
	}else{
		popupTitle = "修改";
		current = staffListData[index];
	}
	var html = $("<div id='discover_div' style='padding:0; margin: 0;'>" +
				"<table style='padding: 0; margin: 15px 30px 0px 30px; border: 0; font-size: 12px; color:#333;'>" +
					"<tr>" +
						"<td align='center' width='60px'>员工编号：</td>" +
						"<td align='left' width='150px'>" +
						"	<input id='number_input' type='text' class='dInput' value='" + current.number + "' maxlength='16'/>" +
						"</td>" +
						"<td align='center'></td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' width='60px'>员工姓名：</td>" +
						"<td align='left' width='150px'>" +
						"	<input id='name_input' type='text' class='dInput' value='" + current.name + "' maxlength='16'/>" +
						"</td>" +
						"<td align='center'></td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' width='60px'>员工状态：</td>" +
						"<td align='left' width='150px'>" +
						"	<input id='status_input'  type='text' class='dInput' value='" + current.status + "' maxlength='18'/>" +
						"</td>" +
						"<td align='center'></td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' width='60px'>登录密码：</td>" +
						"<td align='left' width='150px'>" +
						"	<input id='password_input' type='password' class='dInput' value='" + current.password + "' maxlength='16'/>" +
						"</td>" +
						"<td align='center'></td>" +
					"</tr>" +
				"</table>" +
			"</div>");
	$(html).appendTo($(document.body));
	var discoverTypeString = "正常,禁用,删除";
	var discoverTypeArray = [];
	for(var i=0; i<discoverTypeString.split(",").length; i++){
		var discoverTypeItem = {
	    	"text" : discoverTypeString.split(",")[i],
	    	"value": i
	    };
		if(i == current.status){
			discoverTypeItem.selected = true;
			//$("#val_title").text(discoverTypeItem.text + "：");
		}
		discoverTypeArray.push(discoverTypeItem);
	}
	createcombobox('status_input', discoverTypeArray, function(selObj){
		//$("#val_title").text(discoverTypeString.split(",")[selObj.value] + "：");
	});
	/**
	 * 创建弹出层有确认和关闭按钮
	 * id input的id
	 * array 下拉数组
	 * _callback 下拉选择后的回调函数
	 */
	createDialogPopup('discover_div', 390, 230, popupTitle,function(){
		if($.trim($("#number_input").val()) == ""){
			$("#number_input").attr("placeholder", "员工编号不可为空！");
			return;
		}
		if($.trim($("#name_input").val()) == ""){
			$("#name_input").attr("placeholder", "员工姓名不可为空！");
			return;
		}
		var pwd = "";
		var params = {
			'number'  : $("#number_input").val(),
			'name'    : $("#name_input").val(),
			'status'  : $('#status_input').combobox('getValue')
		};
		
		if($.trim($("#password_input").val()) == ""){
			$("#password_input").attr("placeholder", "登录密码不可为空！");
			return;
		}else{
			if($("#password_input").val() != current.password){
				pwd = $("#password_input").val();
				params.password=pwd;
			}
		}
		if(index == undefined){
			AJAX.staff.add("" , function(ret){
				delPopul_div("discover_div");
				getData();
				console.debug("staff.add success ret %o", ret);
			}, function(ret){
				console.debug("staff.add error ret %o", ret);
			}, params);
		}else{
			params.id = current.id;
			AJAX.staff.update("" , function(ret){
				delPopul_div("discover_div");
				getData();
				console.debug("staff.update success ret %o", ret);
			} , function(ret){
				console.debug("staff.update error ret %o", ret);
			}, params);
		}
	});
}

function del_(i){
	var current = staffListData[i];
	_E.window.confirm("您正在删除员工【" + current.name + "】,删除后不可回复！确认删除吗？", function(){
		var param = {
			"id": current.id
		}
		AJAX.staff.del("", function(ret){
			_E.window.show("您成功删除了员工【" + current.name + "】！");
			getData();
			console.info("staff.del success %o", ret);
		}, function(ret){
			console.info("staff.del error %o", ret);
		}, param);
	}, function(){
		_E.window.show("您取消删除员工【" + current.name + "】了！");
	});
}