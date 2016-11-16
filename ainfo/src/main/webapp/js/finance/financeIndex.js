var bodyHeight;
var bodyWidth;
var urlParam = {};

$(document).ready(function() {
	bodyHeight = document.body.offsetHeight;
	bodyWidth  = document.body.offsetWidth;
	// 获取页面参数
	var urlParam = getParameters();
	
	// 设置底部的位置
	setMainIframeSize();
	$(window).on('resize', function(){
		bodyHeight = document.body.offsetHeight;
		bodyWidth  = document.body.offsetWidth;
		setMainIframeSize();		
	});
	//
	switchSubMenu(null, 1);
});

function switchSubMenu(obj, menu_id){
	$(".Fun").css("display", "none");
	$("#Fun-" + menu_id).css("display", "block");
	$(".menu-item").css("color", "#333333");
	if(obj == null){
		obj = $(".menu-list").children().eq(menu_id - 1)
	}else{
		//$(".menu-list div:first-child").css("color", "#0000FF");
	}
	$(obj).css("color", "#0000FF");
}

function setMainIframeSize(){
	$(".Fun > iframe").css("width", bodyWidth + "px");
	$(".Fun > iframe").css("height", bodyHeight + "px");
}

/**
 * 修改钓场信息
 * @param data
 * @param index
 */
function showSiteEdit(data, index){
	$("#Fun-1").css("display", "none");
	$("#Fun-siteEdit").css("display", "block");
	siteEditIframe.window.setEditData(data, index);
}

function hiddenSiteEdit(){
	$("#Fun-1").css("display", "block");
	$("#Fun-siteEdit").css("display", "none");
}
