var bodyHeight;
var bodyWidth;
var urlParam = {};
var pondCount = 0;
var pageType = 0; //0-new 1-modify
var currentFishSiteId = -1;
var currentEditPondId = 0;

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
	//初始化输入框中的holder
	initInputHolder();
	//如果新建就初始化一个塘
	if(urlParam.hit == "new"){
		//pageType = 0;
		//pondCount = 0;
		//添一个池塘
		//addPound();
		//$("#u1322 > p > span").html("新建钓场");
	}else{
		pageType = 1;
		pondCount = 0;
	}
});

function initNew(){
	//window.parent.siteNewIframe.location.reload();
	pageType = 0;
	pondCount = 0;
	//初始化全局参数当前钓场为-1，说明是新建
	currentUpdateSiteId = -1;
	//初始化上传位置图片
	initImgSet();
	var siteTitle = $("#u1322 > p > span").html();
	if(siteTitle.indexOf("修改") != -1){
		window.location.reload();
	}
	//清空之前所有池塘
	if( $("#u1375 div").length > 0 ){
		//清空之前的鱼塘
		$("#u1375").empty();
	}
	//添一个池塘
	addPound();
	//设置标题
	$("#u1322 > p > span").html("新建钓场");
	//初始化钓场信息框
	initSiteParam();
}

function initInputHolder(){
	$("#u1328_input").attr("placeholder", "钓场名称");
	$("#u1453_input").attr("placeholder", "区域");
	$("#u1338_input").attr("placeholder", "详细地址");
	$("#u1495_input").attr("placeholder", "收费类型");
	$("#u1473_input").attr("placeholder", "钓场类型");
	$("#u1366_input").attr("placeholder", "简 介");
	$("#u1575_input").attr("placeholder", "联络人");
	$("#u1463_input").attr("placeholder", "手机");
	$("#u1684_input").attr("placeholder", "配套设施");
	
	$("#u1443_back").mouseover(function(){$("#u1443_back").addClass("u1443_mouseover");});
	$("#u1443_back").mouseout(function(){$("#u1443_back").removeClass("u1443_mouseover");});
	
	$("#plusImg").mousedown(function(){
		$("#plusImg").attr("src", "../../images/site_images/plus_selected.png");
	});
	$("#plusImg").mouseup(function(){
		$("#plusImg").attr("src", "../../images/site_images/plus.png");
	});
}

function setButtonLineSize(){
	$("#u1319")      .css("height",(bodyHeight - 182)+ "px");
	$("#u1375")      .css("height",(bodyHeight - 182)+ "px");
}
/**
 * 初始化钓场信息框
 */
function initSiteParam(){
	$("#u1328_input").val("");
	$("#u1453_input").val("");
	$("#u1453_input").removeAttr("title");
	$("#u1799").val("");
	$("#u1799").removeAttr("title");
	$("#u1599").removeAttr("title");
	$("#u1338_input").val("");
	$("#u1495_input").removeAttr("isfree");
	$("#u1473_input").val("");
	$("#u1366_input").val("");
	$("#u1575_input").val("");
	$("#u1463_input").val("");
	$("#u1684_input").val("");
	$("#u1443").removeAttr("resources");
	$("#u1443").removeAttr("mainimg");
}
/**
 * 获取已设置的钓场信息
 */
function getSiteParam(){
	var lnglat = getLngLat4Title();
	var areaid = getAreaIds4Title();
	var param = {
		"fishSiteId"  : currentFishSiteId,
		"fishSiteName": $("#u1328_input").val(),
		"provinceId"  : areaid[0],
		"cityId"      : areaid[1],
		"regionId"    : (typeof areaid[2] == 'undefined' || areaid[2] == '' || areaid[2] == 'undefined' ) ? 0 : areaid[2] ,
		"longitude"   : lnglat[0], 
		"latitude"    : lnglat[1], 
		"kNum"        : $("#u1599").attr("title"),
		"addr"        : $("#u1338_input").val(),
		"isFree"      : $("#u1495_input").attr("isfree"),
		"fishSiteType": $("#u1473_input").val(),
		"fishSiteInfo": $("#u1366_input").val(),
		"contactMan"  : $("#" +
				"u1575_input").val(),
		"phoneNum"    : $("#u1463_input").val(),
		"facility"    : $("#u1684_input").val(),
		"resources"   : $("#u1443").attr("resources"),
		"mainImg"     : $("#u1443").attr("mainimg")
	}/*typeof $("#unitPrice_0").val() != 'undefined'*/
	return checkParamsOfSite(param);
}
/**
 * 获取指定当前钓场所有塘的信息
 */
function getPondParam(){
	var param = [];
	for(var i=0; i<pondCount; i++){
		var pondParam = getOnePondParam(i);
		var checkRet = checkParamsOfPond(pondParam, i);
		if(checkRet == null){
			return null;
		}
		param.push(checkRet);
	}
	return param;
}
/**
 * 获取指定塘的信息
 */
function getOnePondParam(index){
	var pondParam = {};
	pondParam.fishPondId      = $("#fishPondName_" + index).attr("fishpondid");
	pondParam.fishPondName    = $("#fishPondName_" + index).val();
	
	pondParam.payType         = $("#unitPrice_" + index).attr("paytype");
	pondParam.admissionTicket = $("#unitPrice_" + index).attr("ticket");
	pondParam.unitPrice       = $("#unitPrice_" + index).attr("price");
	pondParam.getFishLimit    = $("#unitPrice_" + index).attr("limit");
	
	pondParam.area            = $("#area_" + index).val();
	pondParam.areaUnit        = $("#area_" + index).attr("areauint");
	pondParam.capacity        = $("#capacity_" + index).val();
	pondParam.mainFishType    = $("#mainFishType_" + index).val();
	pondParam.viceFishType    = $("#viceFishType_" + index).val();
	pondParam.fishRodLimit    = $("#fishRodLimit_" + index).val();
	pondParam.pondRemarks     = $("#pondRemarks_" + index).val();
	pondParam.depth = $("#depth_start_" + index).val() + "-" + $("#depth_end_" + index).val();
	return pondParam;
}
/**
 * 更新指定的塘
 */
function updatePound(index){
	var pondParam = getOnePondParam(index);
	pondParam.fishSiteId = currentFishSiteId;
	if(pondParam.fishPondId != undefined && pondParam.fishSiteId != 'undefined'){
		AJAX.sites.pond.modification("", function(ret){
			console.info("sites.pond.modification successData", ret);
			_E.window.show("[" + pondParam.fishPondName + "]修改成功！");
		}, function(ret){
			console.info("sites.pond.modification errorData", ret);
			_E.window.show("[" + pondParam.fishPondName + "]修改失败！");
		}, pondParam);
	}
}
/**
 * 新建或修改钓场
 */
function saveSite(){
	var siteParam = getSiteParam();
	if(siteParam == null){
		return;
	}
	var pondParam = getPondParam();
	if(pondParam == null){
		return;
	}
	if(pageType == 0){//新建钓场
		siteParam.fishPonds = pondParam;
		AJAX.sites.site.create("", function(ret){
			console.info("sites.site.create successData", ret);
			//新建钓场得到钓场ID后，上传文件
			if(currentImgCount > 0){
				newSiteUploadFiels(ret.body, updateImgs);
			}
			_E.window.show("新建钓场“" +siteParam.fishSiteName+ "”信息！");
			//window.parent.refurbishSitesList();
			window.parent.switchSubMenu(null, 1);
			window.parent.siteShowIframe.changeTab(2);
			window.parent.siteShowIframe.getTypeSites(0);
		}, function(ret){
			console.info("sites.site.create errorData", ret);
		}, siteParam);
	}else if(pageType == 1){//修改钓场
		AJAX.sites.site.modification("", function(ret){
			console.info("sites.site.modification successData", ret);
			_E.window.show("成功更新钓场信息！");
			window.parent.refurbishSitesList();
		}, function(ret){
			console.info("sites.site.modification errorData", ret);
		}, siteParam);
		
		for(var i=0; i<pondParam.length; i++){
			var paramOfPond = pondParam[i];
			paramOfPond.fishSiteId = siteParam.fishSiteId;
			if(typeof paramOfPond.fishPondId == 'undefined' || paramOfPond.fishPondId == null){
				AJAX.sites.pond.create("", function(ret){
					console.info("sites.pond.create successData", ret);
				}, function(ret){
					console.info("sites.pond.create errorData", ret);
				}, paramOfPond);
				
			}else{
				AJAX.sites.pond.modification("", function(ret){
					console.info("sites.pond.modification successData", ret);
				}, function(ret){
					console.info("sites.pond.modification errorData", ret);
				}, paramOfPond);
			}
		}
	}
}
/**
 * 新建钓场后处理图片信息并更新图片信息
 */
function updateImgs(srcArray, lFishSiteId, lMainImg){
	_E.window.progress(null, "图片或视频正在上传中... ...");
	var wait2UploadEnd = setInterval(function(){
		var isUploadEnd = true;
		for(var i=0; i<srcArray.length; i++){
			var img = srcArray[i];
			if(typeof img.status != 'undefined' && img.status == "start"){
				isUploadEnd = false;
				console.info("第%d个没有完成：", i, JSON.stringify(img));
				break;
			}
		}
		if(isUploadEnd){
			console.info("都完成了！");
			console.info("updateImgs", srcArray);
			var resources = "";
			var mainImg = "";
			for(var i=0; i<srcArray.length; i++){
				var img = srcArray[i];
				if(typeof img.src != 'undefined'){
					if(i == 0){
						mainImg   = img.src;
						resources = img.src + ",";
					}else{
						resources += img.src + ",";
					}
				}
			}
			var siteParam = getSiteParam();
			siteParam.mainImg = lMainImg;
			siteParam.resources = resources;
			siteParam.fishSiteId = lFishSiteId;
			if(siteParam.mainImg == undefined){
				siteParam.mainImg = mainImg;
			}
			console.info("siteParam:", siteParam);
			if(siteParam.resources.length > 0){
				AJAX.sites.site.modification("", function(ret){
					console.info("sites.site.modification successData", ret);
					window.parent.setEditMenu();
					setEditData(siteParam.fishSiteId);
				}, function(ret){
					console.info("sites.site.modification errorData", ret);
				}, siteParam);
			}else{
				siteParam.fishSiteId = 1;
				window.parent.setEditMenu();
				setEditData(siteParam.fishSiteId);
			}
			_E.window.progress('close');
			clearTimeout(wait2UploadEnd);
		}
	}, 50);
}

function checkParamsOfSite(obj){
	$.each(obj, function(n,value){
		if(typeof value == 'string' && value.indexOf('\n') != -1){
			;
		}else{
		eval("obj." + n + "='" + isNull_0(value) + "'");
		}
	});
	if(obj.fishSiteName.length == 0){
		_E.window.show("请查看钓场名称，不可为空！");
		return null;
	}
	if(obj.regionId.length == 0 || obj.cityId.length == 0 || obj.provinceId.length ==0){
		_E.window.show("请选择区域，不可为空！");
		return null;
	}
	if(obj.longitude.length == 0 || obj.latitude.length == 0){
		_E.window.show("请设置经纬度，不可为空！");
		return null;
	}
	if(obj.addr.length == 0){
		_E.window.show("请输入准确的地址信息，不可为空！");
		return null;
	}
	if(obj.isFree.length == 0){
		_E.window.show("请选择收费类型等信息，不可为空！");
		return null;
	}
	return obj;
}

function checkParamsOfPond(obj, i){
	if(typeof obj.fishPondName == 'undefined' || obj.fishPondName == null){
		_E.window.show("请注意您第" + (i+1) + "个塘的名称，有问题哦！");
		return null;
	}else if(obj.fishPondName == ""){
		_E.window.show("请注意您第" + (i+1) + "个塘的名称，不可为空！");
		return null;
	}
	
	if(typeof obj.payType == 'undefined' || obj.payType == null){
		//_E.window.show("请设置塘的收费情况！");
		//return null;
	}
	return obj;
}

function setEditData(fishSiteId){
	pageType = 1;
	pondCount = 0;
	//初始化上传位置图片
	initImgSet();
	currentUpdateSiteId = fishSiteId;
	AJAX.sites.site.get("/" + fishSiteId, function(ret){
		console.info("sites.site.get successData", ret);
		var siteData = ret.body;
		currentFishSiteId = siteData.fishSiteId;
		var pcaData = parsePCA(siteData.provinceId, siteData.cityId, siteData.regionId);
		eval("var province = window.top.dataAreas.a" + siteData.provinceId);
		eval("var city     = window.top.dataAreas.a" + siteData.cityId);
		eval("var region   = window.top.dataAreas.a" + siteData.regionId);
		province = province == undefined ? {'regionName':''} : province;
		city = city == undefined ? {'regionName':''} : city;
		region = region == undefined ? {'regionName':''} : region;
		
		$("#u1328_input").val(siteData.fishSiteName);
		$("#u1322 > p > span").html("修改" + siteData.fishSiteName + "信息");
		
		$("#u1453_input").val(pcaData.province.regionName + pcaData.city.regionName + pcaData.region.regionName); 
		$("#u1453_input").attr("title", pcaData.province.regionNum + "," + pcaData.city.regionNum + "," + pcaData.region.regionNum); 
		
		$("#u1799").attr("title", siteData.longitude + "," + siteData.latitude); 
		$("#u1599").attr("title", siteData.kNum);
		
		$("#u1338_input").val(siteData.addr);
		
		$("#u1495_input").attr("isFree", siteData.isFree)
		if(siteData.isFree == 0){
			$("#u1495_input").val("收费");
		}else{
			$("#u1495_input").val("免费");
		}
		$("#u1473_input").val(siteData.fishSiteType);
		$("#u1366_input").val(siteData.fishSiteInfo);
		$("#u1575_input").val(siteData.contactMan);
		$("#u1463_input").val(siteData.phoneNum);
		$("#u1684_input").val(siteData.facility);
		
		if( siteData.resources != undefined && siteData.resources != null && siteData.resources != "" ){	//判断是否包含图片
			var images = siteData.resources.split(",");
			for(var i=0; i<images.length; i++){
				var imageName = $.trim(images[i]);
				if(imageName.length > 0){
					addImg(imageName, i);
				}
			}
        	//var resources = $("#u1443").attr("resources");
        	//if(typeof resources == 'undefined') resources = "";
        	$("#u1443").attr("resources", siteData.resources);
		}
		setMainImg(siteData.mainImg);//设置主图
		//获取鱼塘信息
		AJAX.sites.pond.list("/" + siteData.fishSiteId, function(pondRet){
			console.info("sites.pond.list successData", pondRet);
			var pondDataArray = pondRet.body;
			setEmptyPound();
			for(var i=0; i<pondDataArray.length; i++){
				var pondData = pondDataArray[i];
				addPound();
				$("#fishPondName_" + i).attr("fishPondId", pondData.fishPondId);
				$("#fishPondName_" + i).val(pondData.fishPondName);
				
				var unit = "元/斤";
				if(pondData.payType == 0){
					unit = "小时";
				}
				if(pondData.unitPrice != null && pondData.unitPrice != undefined){
					$("#unitPrice_" + i).val(pondData.unitPrice + unit);
					$("#unitPrice_" + i).attr("payType", pondData.payType);
					$("#unitPrice_" + i).attr("Ticket",  pondData.admissionTicket);
					$("#unitPrice_" + i).attr("Price",   pondData.unitPrice);
					$("#unitPrice_" + i).attr("Limit",   pondData.getFishLimit);
					$("#unitPrice_" + i).attr("title", getFeeTitle(pondData.payType, pondData.admissionTicket, pondData.unitPrice, pondData.getFishLimit));
				}
				if(typeof pondData.area != 'undefined' && pondData.area != null){
					$("#area_" + i).val(pondData.area);
					//$("#area_" + i).attr("title", pondData.area + translateAreaUnit(pondData.areaUnit));
					//$("#area_" + i).attr("areaunit", pondData.areaUnit);
					areaUnitClick("#areaUnit_" + i, i, pondData.areaUnit);
				}
				$("#capacity_" + i).val(pondData.capacity);
				$("#mainFishType_" + i).val(pondData.mainFishType);
				$("#viceFishType_" + i).val(pondData.viceFishType);
				$("#fishRodLimit_" + i).val(pondData.fishRodLimit);
				$("#pondRemarks_" + i).val(pondData.pondRemarks);
				
				if(pondData.depth == null || pondData.depth == undefined){
					pondData.depth = "-"
				}
				$("#depth_start_" + i).val(pondData.depth.split("-")[0]);
				$("#depth_end_" + i).val(pondData.depth.split("-")[1]);
				
			}
		}, function(pondRet){
			console.info("sites.pond.list errorData", pondRet);
		});
	}, function(ret){
		console.info("sites.site.get errorData", ret);
	});
}

//将水域面积的单位转换为中文
function translateAreaUnit(areaUnit){
	if(areaUnit == 0){
		return "㎡";
	}else if(areaUnit == 1){
		return "亩";
	}
}

//将unitPrice的单位转换为中文
function translateUnitPriceUnit(payType){
	if(payType == 0){
		return "小时";
	}else{
		return "元/斤";
	}
}

function setEmptyPound(index){
	$("#u1375").html("");
	pondCount = 0;
}

/**
 * 增加一个塘
 */
function addPound(){
	pondCount = $("#u1375 .pound").length;
	var html = "";
	html += '<div class="pound">';
	html += '	<div class="pound_toolbar">';
	html += '		<img id="pound_close_" class="img saveImg" src="../../images/site_images/u1424.png" onclick="removePound(this, ' + pondCount + ')">';
	if(pageType == 1){
		html += '   <img id="pound_saved_" class="img saveImg" src="../../images/frame_images/u587.png" onclick="updatePound('+pondCount+')"/>';
	}
	html += '	</div>';
	html += '	<div class="pound_main">';
	html += '		<div class="pound_fields">';
	html += '			<div   style="width:60px" >塘　名</div>';
	html += '			<input style="width:199px" id="fishPondName_' + pondCount + '" type="text" placeholder="如：综合塘">';
	html += '			<div   style="width:60px" >收　费</div>';
	html += '			<input style="width:70px" id="unitPrice_' + pondCount + '" type="text" placeholder="12元/斤" onclick="editfee(' + pondCount + ')">';
	html += '			<div   style="width:60px" >面　积</div>';
	html += '			<input style="width:70px" id="area_' + pondCount + '" type="text" placeholder="200" onFocus="$(\'#areaUnit_' + pondCount + '\').css(\'display\', \'block\')">';
	html += '			<div   style="width:60px" >钓位数</div>';
	html += '			<input style="width:70px" id="capacity_' + pondCount + '" type="text" placeholder="200">';
	html += '			<span class="areaUnit" id="areaUnit_' + pondCount + '">';
	html += '				<span class="line_label" onmouseover="areaUnitMouseOver(this)" onmouseout="areaUnitMouseOut(this)" onclick="areaUnitClick(this, ' + pondCount + ', 1)">';
	html += '					<span class="line_label_text">亩</span>';
	html += '				</span>';
	html += '				<span class="line_label" onmouseover="areaUnitMouseOver(this)" onmouseout="areaUnitMouseOut(this)" onclick="areaUnitClick(this, ' + pondCount + ', 0)">';
	html += '					<span class="line_label_text">㎡</span>';
	html += '				</span>';
	html += '			</span>';
	html += '		</div>';
	html += '		<div class="pound_fields">';
	html += '			<div   style="width:60px" >主鱼种</div>';
	html += '			<input style="width:198px" id="mainFishType_' + pondCount + '" type="text" placeholder="如：鲫鱼,罗非">';
	html += '			<div   style="width:60px" >次鱼种</div>';
	html += '			<input style="width:224px" id="viceFishType_' + pondCount + '" type="text" placeholder="如：鲶鱼">';
	html += '			<div   style="width:60px" >限杆数</div>';
	html += '			<input style="width:50px" id="fishRodLimit_' + pondCount + '" type="text" placeholder="1">';
	html += '		</div>';
	html += '		<div class="pound_fields">';
	html += '			<div   style="width:60px" >备　注</div>';
	html += '			<input style="width:466px" id="pondRemarks_' + pondCount + '" type="text" placeholder="如：不可用抛杆，手杆限长7.2米">';
	html += '			<div   style="width:60px" >水深(米)</div>';
	html += '			<input style="width:30px;text-align: right; border: none; margin-top: 6px;" ';
	html += 			                          'id="depth_start_' + pondCount + '" type="text" placeholder="3">';
	html += '			<div   style="width:10px" >~</div>';
	html += '			<input style="width:30px"  id="depth_end_' + pondCount + '" type="text" placeholder="5">';
	html += '		</div>';
	html += '	</div>';
	html += '</div>';
	$("#u1375").append(html);
	pondCount++;
}

/**
 * 删除一个塘
 */
function removePound(obj, i){
	if(pondCount == 1){
		_E.window.show("已经是最后一个鱼塘了，不可以再删除了！");
		return;
	}
	_E.window.confirm("您确认要删除此鱼塘吗，删除后不可恢复！", function(){
		
		if( typeof $("#fishPondName_" + i) == 'undefined' || typeof $("#fishPondName_" + i).attr("fishPondId") == 'undefined'   ){
			
			console.log($(".pound")[i]);
			
			$(".pound")[i].remove();
			
			_E.window.show("成功删除此鱼塘！");
			return ;
		}
		
		AJAX.sites.pond.removel("/" + currentFishSiteId + "/" + $("#fishPondName_" + i).attr("fishPondId"), function(ret){
			console.info("sites.pond.modification successData", ret);
			$(obj).parent().parent().remove();
			pondCount--;
			_E.window.show("成功删除此鱼塘！");
		}, function(ret){
			console.info("sites.pond.modification errorData", ret);
		});
	}, function(){
		_E.window.show("此次删除鱼塘的操作已被取消！");
	});
}
//面积单位鼠标经过变色
function areaUnitMouseOver(obj){
	$(".line_label").css("background-color", "rgb(255, 255, 255)");
	$(obj).css("background-color", "rgba(0, 204, 255, 1)");
}
//面积单位鼠标移出区域
function areaUnitMouseOut(obj){
	$(obj).css("background-color", "rgb(255, 255, 255)");
}
//选择面积单位
function areaUnitClick(obj, i, areaUint){
	$("#areaUnit_" + i).css("display", "none");
	$("#area_" + i).attr("areauint", areaUint);
	var area = $("#area_" + i).val();
	if(typeof area != "undefined" || area.length != 0){
		$("#area_" + i).attr("title", area + translateAreaUnit(areaUint));
	}
	var divIndex = areaUint == 1 ? 1 : 2;
	$("#areaUnit_0 > span").css("border", "1px solid rgb(204, 204, 204)");
	$("#areaUnit_0 > span:nth-child(" + divIndex + ")").css("border", "1px solid rgb(0, 204, 255)");
}

//从title中解析经纬度信息
function getLngLat4Title(){
	var vlng = vlat = "";
	var title = $("#u1799").attr("title");
	if(typeof title != 'undefined' && title.length>0 && title.indexOf("请")==-1 && title.indexOf(",")!=-1){
		vlng = title.split(",")[0];
		vlat = title.split(",")[1];
	}
	return [vlng, vlat];
}

//从title中解析省市区信息
function getAreaIds4Title(){
	var p = c = a = "";
	var title = document.getElementById("u1453_input").title;
	if(typeof title != 'undefined' && title.length>0 && title.indexOf("请")==-1 && title.indexOf(",")!=-1){
		return title.split(",");
	}
	return ["", "", ""];
}

/**
 * 设置经纬度
 */
function editLngLat(){
	var lnglat = getLngLat4Title();
	var html = "";
	html += '<div id="editLngLat_dialog">';
	html += '	<div class="dialog_lable"  style="margin-top: 10px;">';
	html += '		<span>钓场经度：</span><input type="text" id="Lng_input" class="dialog_input" style="width:100px" value="' + lnglat[0] + '"/>';
	html += '	</div>';
	html += '	<div class="dialog_lable">';
	html += '		<span>钓场纬度：</span><input type="text" id="Lat_input" class="dialog_input" style="width:100px" value="' + lnglat[1] + '"/>';
	html += '	</div>';
	html += '</div>';
	$(html).appendTo($(document.body));
	createDialogPopup('editLngLat_dialog', 300, 170, "设置经纬度",function(a){
		var rLng = /^[\-\+]?(0?\d{1,2}\.\d{1,6}|1[0-7]?\d{1}\.\d{1,6}|180\.0{1,6})$/; //经度： -180.0～+180.0（整数部分为0～180，必须输入1到6位小数）
		var rlat = /^[\-\+]?([0-8]?\d{1}\.\d{1,6}|90\.0{1,6})$/;                      //纬度： -90.0～+90.0     （整数部分为0～90，   必须输入1到6位小数）
		var lng = $("#Lng_input").val();
		if(lng.length == 0){
			_E.window.show("请输入经度！");return;
		}
		if(!rLng.test(lng)){
			_E.window.show("请重新设置经纬度，经度不正确！");return null;
		}
		var lat = $("#Lat_input").val();
		if(lat.length == 0){
			_E.window.show("请输入纬度！");return;
		}
		if(!rlat.test(lat)){
			_E.window.show("请重新设置经纬度，纬度不正确！");return null;
		}
		$("#u1799").attr("title", lng + "," + lat);
		delPopul_div('editLngLat_dialog');
	});
}
/**
 * 设置高德K码
 */
function editKCode(){
	var vkf = vkm = vke = "";
	var title = $("#u1599").attr("title");
	if(typeof title != 'undefined' && title.length>0 && title.indexOf("请")==-1 && title.indexOf("-")!=-1){
		vkf = title.split("-")[0];
		vkm = title.split("-")[1];
		vke = title.split("-")[2];
	}
	var html = "";
	html += '<div id="editKCode_dialog">';
	html += '	<div class="dialog_lable" style="margin-top: 30px;">钓场经度：';
	html += '		<input type="text" id="kf_input" class="dialog_input" style="width:50px" value="' + vkf + '"/>-';
	html += '		<input type="text" id="km_input" class="dialog_input" style="width:50px" value="' + vkm + '"/>-';
	html += '		<input type="text" id="ke_input" class="dialog_input" style="width:50px" value="' + vke + '"/>';
	html += '	</div>';
	html += '</div>';
	$(html).appendTo($(document.body));
	createDialogPopup('editKCode_dialog', 300, 170, "设置高德K码",function(a){
		var kf = $("#kf_input").val();
		var km = $("#km_input").val();
		var ke = $("#ke_input").val();
		if(kf.length == 0 || km.length == 0 || ke.length == 0){
			_E.window.show("请正确输入K码！");return;
		}
		$("#u1599").attr("title", kf + "-"+ km + "-"+ ke);
		delPopul_div('editKCode_dialog');
	});
}



function switchSelecter(obj, sp_id, __callback){
	
	/*if( $(obj).val() == "省份" ){
		$("#selecter-2").empty();	//清空城市
		$("#selecter-3").empty();	//清空县区
	}
	
	if( $(obj).val() == "城市" ){
		$("#selecter-3").empty();	//清空县区
	}*/
	
	$(".selecter_main").css("display", "none");
	$("#selecter-" + sp_id).css("display", "block");
	$(".selecter_lable").css("color", "#5A4D4D");
	$(".selecter_lable").css("background-color", "#ECECEC");
	if(obj == null){
		obj = $(".selecter_lables").children().eq(sp_id - 1)
	}
	$(obj).css("background-color", "rgb(0, 204, 255)");
	if(typeof __callback == 'function'){
		__callback(sp_id);
	}
}
function selecterFieldOnMouseOver(obj){
	//$(".selecter_main_field").css("background-color", "rgb(255, 255, 255)");
	//$(obj).css("background-color", "rgba(0, 204, 255, 1)");
}

function editPCA(){
	var html = "";
	html += '<div id="editPCA_dialog">';
	html += '	<div class="selecter_lables selecter">';
	html += '		<div class="selecter_lable" onclick="switchSelecter(this, 1)">省份</div>';
	html += '		<div class="selecter_lable" onclick="switchSelecter(this, 2)">城市</div>';
	html += '		<div class="selecter_lable" onclick="switchSelecter(this, 3)">地区</div>';
	html += '	</div>';
	html += '	<div class="selecter_mains selecter">';
	html += '		<div class="selecter_main" id="selecter-1"></div>';
	html += '		<div class="selecter_main" id="selecter-2"></div>';
	html += '		<div class="selecter_main" id="selecter-3"></div>';
	html += '	</div>';
	html += '</div>';
	$(html).appendTo($(document.body));
	
	createDialogPopup('editPCA_dialog', 600, 500, "设置鱼塘所在地区",function(){
		delPopul_div('editPCA_dialog');
	});
	$.each(window.top.dataProv, function(n,prov){
		var p = '<div class="selecter_main_field" onmouseover="selecterFieldOnMouseOver(this)" onclick="showCitySelecter(' + prov.regionNum + ', \'' + prov.regionName + '\')">' + prov.regionName + '</div>';
		$(p).appendTo($("#selecter-1"));
	});
	switchSelecter(null, 1);
}
var selectedPCA = {};
function showCitySelecter(regionNum, regionName){
	
	$("#selecter-2").empty();	//清空城市
	$("#selecter-3").empty();	//清空县区
	
	selectedPCA.num = regionNum;
	selectedPCA.area= regionName;
	eval("var citys = window.top.dataCity.a" + regionNum);
	for(var i=0; i<citys.length; i++){
		var city = citys[i];
		var p = '<div class="selecter_main_field" onmouseover="selecterFieldOnMouseOver(this)" onclick="showAreaSelecter(' + city.regionNum + ', \'' + city.regionName + '\')">' + city.regionName + '</div>';
		$(p).appendTo($("#selecter-2"));
	}
	switchSelecter(null, 2);
}
function showAreaSelecter(regionNum, regionName){
	
	$("#selecter-3").empty();	//清空县区
	
	selectedPCA.num += "," + regionNum;
	selectedPCA.area+= regionName;
	eval("var areas = window.top.dataArea.a" + regionNum);
	for(var i=0; i<areas.length; i++){
		var area = areas[i];
		var p = '<div class="selecter_main_field" onmouseover="selecterFieldOnMouseOver(this)" onclick="getAreaRegionNum(' + area.regionNum + ', \'' + area.regionName + '\')">' + area.regionName + '</div>';
		$(p).appendTo($("#selecter-3"));
	}
	switchSelecter(null, 3);
}
function getAreaRegionNum(regionNum, regionName){
	selectedPCA.num += "," + regionNum;
	selectedPCA.area+= regionName;
	$("#u1453_input").attr("title", selectedPCA.num);
	$("#u1453_input").val(selectedPCA.area);
	delPopul_div('editPCA_dialog');
}

function switchCallBack(){
	currentFeeType = [];
	currentIsFree = 0;
}

var currentFeeType = [];
var currentIsFree = 0;
function editfeeType(){
	currentFeeType = [];
	var html = "";
	html += '<div id="editfeeType_dialog">';
	html += '	<div class="selecter_lables selecter">';
	html += '		<div class="selecter_lable" onclick="switchSelecter(this, 1, switchCallBack)" style="width:130px">收费</div>';
	html += '		<div class="selecter_lable" onclick="switchSelecter(this, 2, switchCallBack)" style="width:130px">免费</div>';
	html += '	</div>';
	html += '	<div class="selecter_mains selecter" style="height:172px">';
	html += '		<div class="selecter_main" id="selecter-1" style="height:172px">';
	html += '			<div class="selecter_main_field" style="width:130px" onmouseover="selecterFieldOnMouseOver(this)" onclick="getIsFree(0, \'商业钓场\', this)">商业钓场</div>';
	html += '			<div class="selecter_main_field" style="width:130px" onmouseover="selecterFieldOnMouseOver(this)" onclick="getIsFree(0, \'湖库\', this)">湖库</div>';
	html += '			<div class="selecter_main_field" style="width:132px" onmouseover="selecterFieldOnMouseOver(this)" onclick="getIsFree(0, \'农家乐\', this)">农家乐</div>';
	html += '		</div>';
	html += '		<div class="selecter_main" id="selecter-2"  style="height:172px">';
	html += '			<div class="selecter_main_field" style="width:132px" onmouseover="selecterFieldOnMouseOver(this)" onclick="getIsFree(1, \'野塘\', this)">野塘</div>';
	html += '			<div class="selecter_main_field" style="width:132px" onmouseover="selecterFieldOnMouseOver(this)" onclick="getIsFree(1, \'江河\', this)">江河</div>';
	html += '			<div class="selecter_main_field" style="width:132px" onmouseover="selecterFieldOnMouseOver(this)" onclick="getIsFree(1, \'湖库\', this)">湖库</div>';
	html += '		</div>';
	html += '	</div>';
	html += '</div>';
	$(html).appendTo($(document.body));
	
	createDialogPopup('editfeeType_dialog', 600, 300, "设置鱼塘收费情况",function(){
		if(currentIsFree == 0){
			$("#u1495_input").val("收费");
		}else{
			$("#u1495_input").val("免费");
		}
		$("#u1495_input").attr("isFree", currentIsFree);
		var tmp = "";
		for(var i=0; i<currentFeeType.length; i++){
			tmp += currentFeeType[i] + "、"
		}
		$("#u1473_input").val(tmp.substr(0, tmp.length-1));
		delPopul_div('editfeeType_dialog');
	});
	switchSelecter(null, 1, switchCallBack);
}
function getIsFree(isFree, siteType, obj){
	currentIsFree = isFree;
	if($(obj).css("background-color") == "rgb(0, 204, 255)"){
		$(obj).css("background-color", "rgb(255, 255, 255)");
		for(var i=0; i<currentFeeType.length; i++){
			if(currentFeeType[i] == siteType){
				currentFeeType.splice(i,1);
			}
		}
	}else{
		$(obj).css("background-color", "rgb(0, 204, 255)");
		var isCanPush = true;
		for(var i=0; i<currentFeeType.length; i++){
			if(currentFeeType[i] == siteType){
				return;
			}
		}
		if(isCanPush){
			currentFeeType.push(siteType);
		}
	}
}


var currentfacility = [];
function editFacility(index){
	var html = "";
	html += '<div id="editFacility_dialog">';
	html += '	<div class="selecter_lables selecter" style="height: 0px">';
	html += '		<div class="selecter_lable" onclick="switchSelecter(this, 1)">配套设施</div>';
	html += '	</div>';
	html += '	<div class="selecter_mains selecter"  style="height:172px">';
	html += '		<div class="selecter_main" id="selecter-1" style="height:172px">';
	html += '			<div class="selecter_main_field" style="width:132px" onmouseover="selecterFieldOnMouseOver(this)" onclick="getFacility(\'停车场\', this)">停车场</div>';
	html += '			<div class="selecter_main_field" style="width:132px" onmouseover="selecterFieldOnMouseOver(this)" onclick="getFacility(\'小卖部\', this)">小卖部</div>';
	html += '			<div class="selecter_main_field" style="width:132px" onmouseover="selecterFieldOnMouseOver(this)" onclick="getFacility(\'棋牌室\', this)">棋牌室</div>';
	html += '			<div class="selecter_main_field" style="width:132px" onmouseover="selecterFieldOnMouseOver(this)" onclick="getFacility(\'快餐\', this)">快餐</div>';
	html += '			<div class="selecter_main_field" style="width:132px" onmouseover="selecterFieldOnMouseOver(this)" onclick="getFacility(\'农家乐\', this)">农家乐</div>';
	html += '			<div class="selecter_main_field" style="width:132px" onmouseover="selecterFieldOnMouseOver(this)" onclick="getFacility(\'饵料\', this)">饵料</div>';
	html += '		</div>';
	html += '	</div>';
	html += '</div>';
	$(html).appendTo($(document.body));
	
	createDialogPopup('editFacility_dialog', 600, 300, "设置鱼塘配套设施",function(){
		var tmp = "";
		for(var i=0; i<currentfacility.length; i++){
			tmp += currentfacility[i] + "、"
		}
		$("#u1684_input").val(tmp.substr(0, tmp.length-1));
		delPopul_div('editFacility_dialog');
	});
	switchSelecter(null, 1);
}

function getFacility(facility, obj){
	if($(obj).css("background-color") == "rgb(0, 204, 255)"){
		$(obj).css("background-color", "rgb(255, 255, 255)");
		for(var i=0; i<currentfacility.length; i++){
			if(currentfacility[i] == facility){
				currentfacility.splice(i,1);
			}
		}
	}else{
		$(obj).css("background-color", "rgb(0, 204, 255)");
		var isCanPush = true;
		for(var i=0; i<currentfacility.length; i++){
			if(currentfacility[i] == facility){
				return;
			}
		}
		if(isCanPush){
			currentfacility.push(facility);
		}
	}
}

function editfee(index){
	currentEditPondId = index;
	var html = "";
	html += '<div id="editfee_dialog">';
	html += '	<div class="selecter_lables selecter">';
	html += '		<div class="selecter_lable" onclick="switchSelecter(this, 1, editfeeBack)" style="width: 200px;">斤塘（按斤收费）</div>';
	html += '		<div class="selecter_lable" onclick="switchSelecter(this, 2, editfeeBack)" style="width: 200px;">钟塘（按小时收费）</div>';
	html += '	</div>';
	html += '	<div class="selecter_mains selecter">';
	html += '		<div class="selecter_main" id="selecter-1">';
	html += '			<div class="check_area">';
	html += '				<div class="check_title" style="margin: 10px 25px;">入场金额</div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(10,null,null, this, ' + index + ')">10元</div></div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(12,null,null, this, ' + index + ')">12元</div></div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(15,null,null, this, ' + index + ')">15元</div></div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(18,null,null, this, ' + index + ')">18元</div></div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(20,null,null, this, ' + index + ')">20元</div></div>';
	html += '				<div class="check_area_field">';
	html += '					<input id="TicketInput1" onclick="cleanBrotherColor(this, 1)" type="text"/> 元';
	html += '				</div>';
	html += '			</div>';
	html += '			<img src="../../images/team_images/u524.png">';
	html += '			<div class="check_area">';
	html += '				<div class="check_title" style="margin: 10px 25px;">鱼费/斤</div>';
	html += '				<div style="display:none"><div id="cleanThisCol">为清空此列特别设置</div></div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(null,10,null, this, ' + index + ')">10元</div></div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(null,12,null, this, ' + index + ')">12元</div></div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(null,15,null, this, ' + index + ')">15元</div></div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(null,18,null, this, ' + index + ')">18元</div></div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(null,20,null, this, ' + index + ')">20元</div></div>';
	html += '				<div class="check_area_field">';
	html += '					<input id="PriceInput1" onclick="cleanBrotherColor(this, 2)" type="text"/> 元';
	html += '				</div>';
	html += '			</div>';
	html += '			<img src="../../images/team_images/u524.png">';
	html += '			<div class="check_area">';
	html += '				<div class="check_title" style="margin: 10px 25px;">带鱼</div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(null,null,-1, this, ' + index + '   )">不限</div></div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(null,null, 0, this, ' + index + ', 0)">禁止</div></div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(null,null, 1, this, ' + index + '   )">限带1斤</div></div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(null,null, 2, this, ' + index + '   )">限带2斤</div></div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(null,null, 3, this, ' + index + '   )">限带3斤</div></div>';
	html += '				<div class="check_area_field">';
	html += '					<input id="LimitInput1" onclick="cleanBrotherColor(this, 3)" type="text"/> 斤';
	html += '				</div>';
	html += '			</div>';
	html += '		</div>';
	html += '		<div class="selecter_main" id="selecter-2">';
	html += '			<div class="check_area">';
	html += '				<div class="check_title" style="margin: 10px 25px;">入场金额</div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(10,null,null, this, ' + index + ')">10元</div></div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(12,null,null, this, ' + index + ')">12元</div></div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(15,null,null, this, ' + index + ')">15元</div></div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(18,null,null, this, ' + index + ')">18元</div></div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(20,null,null, this, ' + index + ')">20元</div></div>';
	html += '				<div class="check_area_field">';
	html += '					<input id="TicketInput2" onclick="cleanBrotherColor(this, 1)" type="text"/> 元';
	html += '				</div>';
	html += '			</div>';
	html += '			<img src="../../images/team_images/u524.png">';
	html += '			<div class="check_area">';
	html += '				<div class="check_title" style="margin: 10px 25px;">可钓时间</div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(null, 4,null, this, ' + index + ')">4小时</div></div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(null, 5,null, this, ' + index + ')">5小时</div></div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(null, 7,null, this, ' + index + ')">7小时</div></div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(null, 8,null, this, ' + index + ')">8小时</div></div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(null,12,null, this, ' + index + ')">12小时</div></div>';
	html += '				<div class="check_area_field">';
	html += '					<input id="PriceInput2" onclick="cleanBrotherColor(this, 2)" type="text"/> 小时';
	html += '				</div>';
	html += '			</div>';
	html += '			<img src="../../images/team_images/u524.png">';
	html += '			<div class="check_area">';
	html += '				<div class="check_title" style="margin: 10px 25px;">带鱼</div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(null,null,-1, this, ' + index + ')">不限</div></div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(null,null, 0, this, ' + index + ')">禁止</div></div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(null,null, 1, this, ' + index + ')">限带1斤</div></div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(null,null, 2, this, ' + index + ')">限带2斤</div></div>';
	html += '				<div class="check_area_field"><div style="margin-top: 5px;" onclick="setTicketPriceLimit(null,null, 3, this, ' + index + ')">限带3斤</div></div>';
	html += '				<div class="check_area_field">';
	html += '					<input id="LimitInput2" onclick="cleanBrotherColor(this, 3)" type="text"/> 斤';
	html += '				</div>';
	html += '			</div>';
	html += '		</div>';
	html += '	</div>';
	html += '</div>';
	$(html).appendTo($(document.body));
	
	createDialogPopup('editfee_dialog', 600, 500, "设置鱼塘收费情况",function(){
		var payType = $("#unitPrice_" + currentEditPondId).attr("payType");
		var unit = "";
		if(payType == 1){
			if($("#TicketInput1").val() != ""){
				$("#unitPrice_" + currentEditPondId).attr("Ticket", $("#TicketInput1").val());
			}
			if($("#PriceInput1").val() != ""){
				$("#unitPrice_" + currentEditPondId).attr("Price", $("#PriceInput1").val());
			}
			if($("#LimitInput1").val() != ""){
				$("#unitPrice_" + currentEditPondId).attr("Limit", $("#LimitInput1").val());
			}
			unit = "元/斤";
		}
		if(payType == 0){
			if($("#TicketInput2").val() != ""){
				$("#unitPrice_" + currentEditPondId).attr("Ticket", $("#TicketInput2").val());
			}
			if($("#PriceInput2").val() != ""){
				$("#unitPrice_" + currentEditPondId).attr("Price", $("#PriceInput2").val());
			}
			if($("#LimitInput2").val() != ""){
				$("#unitPrice_" + currentEditPondId).attr("Limit", $("#LimitInput2").val());
			}
			unit = "小时";
		}
		var ticket = $("#unitPrice_" + currentEditPondId).attr("Ticket");
		var price  = $("#unitPrice_" + currentEditPondId).attr("Price");
		var limit  = $("#unitPrice_" + currentEditPondId).attr("Limit");
		if(typeof ticket == 'undefined' || typeof price == 'undefined' || typeof limit == 'undefined'){
			_E.window.show("请您正确的输入或选择！");
			return;
		}
		$("#unitPrice_" + currentEditPondId).val(price + unit);
		$("#unitPrice_" + currentEditPondId).attr("title", getFeeTitle(payType, ticket, price, limit));
		delPopul_div('editfee_dialog');
	});
	switchSelecter(null, 1, editfeeBack);
}
//通过收费情况的当前值组织一句话用来显示
function getFeeTitle(payType, ticket, price, limit){
	var ret = "";
	ticket = "入场金额" + ticket + "元，";
	if(limit == -1){
		limit = "不限";
	}else if(limit == 0){
		limit = "禁止";
	}else{
		limit = limit + "斤";
	}
	limit  = "带鱼情况" + limit;
	if(payType == 1){
		ret += "斤塘：" + ticket + limit;
		if(limit.indexOf("禁止") == -1){
			ret += "，" + price + "元/斤";
		}
	}else if(payType == 0){
		ret += "钟塘：" + ticket + "可钓" + price + "小时，" + limit;
	}
	return ret;
}
function setTicketPriceLimit(Ticket, Price, Limit, obj, i, linit0){
	if(Ticket != null){
		$("#unitPrice_" + i).attr("Ticket", Ticket);
	}else if(Price != null){
		$("#unitPrice_" + i).attr("Price", Price);
	}else if(Limit != null){
		$("#unitPrice_" + i).attr("Limit", Limit);
	}
	if(typeof linit0 != 'undefined' && linit0 == 0){
		cleanBrotherColor("#cleanThisCol", null);
		$("#PriceInput1").val("0");
	}
	
	cleanBrotherColor(obj, null);
	if($(obj).parent().css("background-color") == "rgb(0, 204, 255)"){
		$(obj).parent().css("background-color", "rgb(255, 255, 255)");
	}else{
		$(obj).parent().css("background-color", "rgb(0, 204, 255)");
	}
}

function editfeeBack(sp_id){
	if(sp_id == 1){
		$("#unitPrice_" + currentEditPondId).attr("payType", 1);
	}else if(sp_id == 2){
		$("#unitPrice_" + currentEditPondId).attr("payType", 0);
	}
}
//将之前设置的内容清空
function cleanBrotherColor(obj, type){
	$(obj).parent().siblings().css("background-color", "rgb(255, 255, 255)");
	$(".check_title").css("background-color", "rgba(0, 0, 0, 0)");
	if(type != null){
		if(type == 1){
			$("#unitPrice_" + currentEditPondId).attr("Ticket", null);
		}else if(type == 2){
			$("#unitPrice_" + currentEditPondId).attr("Price", null);
		}else if(type == 3){
			$("#unitPrice_" + currentEditPondId).attr("Limit", null);
		}
	}
}

