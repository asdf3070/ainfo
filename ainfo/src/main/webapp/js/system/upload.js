var currentUpdateId = -1;
var signatureJson = null;
var now = timestamp = Date.parse(new Date()) / 1000; 
var expire = 0;

//发送ajax请求
function send_request(){
    var xmlhttp = null;
    if (window.XMLHttpRequest){
        xmlhttp=new XMLHttpRequest();
    }
    else if (window.ActiveXObject){
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (xmlhttp!=null){
        serverUrl = "http://" + location.host + "/api/token/oss_sign";
        xmlhttp.open( "POST", serverUrl, false );
        xmlhttp.send('{"bucket":"app-discovery","dir":"' + currentUpdateId + '/"}');
        return xmlhttp.responseText
    }else{
        alert("Your browser does not support XMLHTTP.");
    }
};
//获取服务器签名
function get_signature(){
    //可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
    now = timestamp = Date.parse(new Date()) / 1000; 
    if (expire < now + 3){
        body = send_request()
        if(body != null && body != undefined && body.length > 0){
        	signatureJson = eval ("(" + body + ")").body;
        }
        return true;
    }
    return false;
};
//解析文件扩展名
function get_suffix(filename) {
    pos = filename.lastIndexOf('.')
    suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos)
    }
    return suffix;
}

//上传文件
function set_upload_param(up, file, ret){
    if (ret == false){
        ret = get_signature()
    }
    if(signatureJson != null && signatureJson != undefined){
        if(typeof file == 'object'){
        	//console.info(Math.round(new Date()) + " " + file.id + " set_upload_param ()");
    		//file.currentImgSet = getImgRightSet(null, file);
    		file.ossPathFile = signatureJson.dir + file.currentImgSet + get_suffix(file.name);
    		file.ossPathUuidFile = signatureJson.dir + Math.guid() + get_suffix(file.name);
        }
        var optionParams = {
            'url': signatureJson.host,
            'multipart_params': {
                'key' : file.ossPathUuidFile,
                'policy': signatureJson.policy,
                'OSSAccessKeyId': signatureJson.accessid, 
                'signature': signatureJson.signature,
                'success_action_status' : '200' //让服务端返回200,不然，默认会返回204
            }
        }
        up.setOption(optionParams);
    }
    up.start();
	console.info("Now is update fish site, so upload files right now!");
}
var uploader;

function createUpload(){
	var imgHolder = $("#u2640_img");
	if(imgHolder.length < 0){
		_E.window.show("上传控件初始化失败！");
		return;
	}
	
	uploader = new plupload.Uploader({
		runtimes            : 'html5,flash,silverlight,html4',
		browse_button 		: 'img_0',
		flash_swf_url       : 'lib/plupload-2.1.2/js/Moxie.swf',
		silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',
	    multi_selection     : true,
	    filters             : {
								  mime_types : [ //只允许上传图片和zip文件
								    { 
								    	title : "multi-media files", 
								    	extensions : "jpg,gif,png"   //,mp4 
								    }, 
								    {
								    	title : "Zip files", 
								    	extensions : "zip"
								    }
								  ],
								  max_file_size : '102400kb', //最大只能上传400kb的文件
								  prevent_duplicates : false //是否允许选取重复文件
							  },
	    resize              : {
								  //width: 100,
								  //height: 100,
								  crop: true,
								  quality: 100,
								  preserve_headers: true
							  },
		unique_names        : true,
		drop_element        : 'u1443',
		url 				: "http://www.baidu.com",
	
		init                :{
			PostInit: function() {
				;
			},
	
			//绑定文件添加进队列事件
			FilesAdded: function(up, files) {
				signatureJson = null;
				currendChooseFilesCount = files.length;
				if(currendChooseFilesCount > 1){
					//$(".img_element").remove();
					_E.window.show("请选择一个图片文件");
					return;
				}
				var len = files.length;
				var MAX = 9-currentImgCount;
				for(var i = 0; i<len; i++){
					var file = files[i];
					var count = i+1;
					if(count <= MAX || currendChooseFilesCount == 1){
						!function(i){
							previewImage(files[i], function(imgsrc){
								//console.info(Math.round(new Date()) + " Set fiel.currentImgSet");
								if(currendChooseFilesCount > 1){
									files[i].currentImgSet = getImgRightSet(null, files[i]);
								}else{
									files[i].currentImgSet = currentImgSet;
								}
								console.info("previewImageIndex:" + i + " file.currentImgSet=" + files[i].currentImgSet);
								//生成预览进行显示
								addImgPreview(files[i], imgsrc);
							})
					    }(i);
					}else{
						up.removeFile(file);
					}
				}
			    if(currentUpdateId != -1){
					setTimeout(function(){
						//添加完成如果是修改时，就直接上传
						set_upload_param(uploader, '', false);
					}, 500);
			    }else{
			    	console.info("Now is new fish site, so current time do not upload files, Please hit Save Button!");
			    }
			},
			
			//当文件从上传队列移除后触发
			FilesRemoved: function(up, files){
				for(var i = 0; i<files.length; i++){
					console.info("文件:" +files[i].name+ " ID:" + files[i].id + "从上传队列删除");
				}
			},
	
			BeforeUpload: function(up, file) {
				//console.info(Math.round(new Date()) + " Judge file.currentImgSet");
				if(file.currentImgSet == undefined || file.currentImgSet == -1){
					if(currendChooseFilesCount == 1){
						file.currentImgSet = currentImgSet;
					}else{
		    			console.info("file.currentImgSet is wrongful,so upload stoped! %s %o", file.currentImgSet, file);
		    			uploader.stop();
		    			return;
					}
	    		}
				$('#img_progress_' + file.currentImgSet).removeClass("hiddenc");
	    		set_upload_param(up, file, true);
	        },
	        
	        //绑定文件上传进度事件
			UploadProgress: function(up, file) {
				console.info("file.percent", file.percent);
				$('#img_progress_' + file.currentImgSet + ' > span').html(file.percent + '%');
				$('#img_div' + file.currentImgSet + ' > p').css('width',file.percent + '%');//控制进度条
			},
	
			FileUploaded: function(up, file, info) {
	            if (info.status == 200){
	            	var uParams = up.getOption();
	            	eval("var thisImg =  currentImgArray.a" + file.currentImgSet);
	            	eval("delete currentImgArray.a" + file.currentImgSet + ".status");
	            	eval("delete currentImgArray.a" + file.currentImgSet + ".set");
	            	var prevSrc = thisImg.prevSrc;
	            	if(prevSrc != null && prevSrc != undefined){
	            		delFile(prevSrc, function(res){
	            			console.info("success del file: %s", prevSrc);
	                		eval("delete currentImgArray.a" + file.currentImgSet + ".prevSrc");
	            		}, function(res){
	            			console.info("del file error: %s %o", prevSrc, res);
	            		});
	            	}
	            	eval("currentImgArray.a" + file.currentImgSet + ".src='" + file.ossPathUuidFile + "'");
	                console.info('upload to oss success, get url is: %s', uParams.url + "/" + file.ossPathUuidFile);
	                console.info('of couse you can use this file name: %s', file.ossPathFile);
	                
	            	var resources = "";
	            	for(var i=0; i<1; i++){
						eval("var imgObj = currentImgArray.a" + i);
						if(imgObj.src != undefined && imgObj.status == undefined){
							resources += imgObj.src + ",";
						}else{
							resources += ",";
						}
					}
	            	$("#img_0").attr("resources", resources);
	            	$("#img_0").attr("mainimg", currentImgArray.mainImg);
	            }
	            else{
	                console.info(info.response);
	            } 
			},
	
			Error: function(up, err) {
				switch(err.code){
				case -200:
					_E.window.show("网络传输有问题哦，请专业人事诊断一下吧！" + err.response);
					break;
				case -602:
					_E.window.show("重复的选择了文件：" + err.file.name);
					break;
				case -600:
					_E.window.show("您选择的文件超限制：" + up.settings.filters.max_file_size);
					break;
				case -601:
					var mime_types = up.getOption().filters.mime_types;
					var validateType = "";
					for(var i=0; i<mime_types.length; i++){
						validateType += mime_types[i].extensions + ",";
					}
					_E.window.show("您选择了不支持上传的文件，支持的文件格式是：" + validateType);
					break;
				}
				console.info("errCode: " + err.code + " Error xml:", err.response);
				//document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
			}
		}
	});
	
	uploader.init();
	initImgSet();
}

//图片预览处理：file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
function previewImage(file,callback){
	if(!file || !/image\//.test(file.type)) return; //确保文件是图片
	if(file.type=='image/gif'){//gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
		var fr = new mOxie.FileReader();
		fr.onload = function(){
			callback(fr.result);
			fr.destroy();
			fr = null;
		}
		fr.readAsDataURL(file.getSource());
	}else{
		var preloader = new mOxie.Image();
		preloader.onload = function() {
			preloader.downsize( 300, 300 );//先压缩一下要预览的图片,宽300，高300
			var imgsrc = preloader.type=='image/jpeg' ? preloader.getAsDataURL('image/jpeg',80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
			callback && callback(imgsrc); //callback传入的参数为预览图片的url
			preloader.destroy();
			preloader = null;
		};
		preloader.load( file.getSource() );
	}	
}
//保存当前待保存多媒体文件信息
var currentImgArray = {};
//当前图片计数器
var currentImgCount = 0;
//当前选择文件队列
var currendFileList = {};
//记录最后一次选择文件的个数
var currendChooseFilesCount = 0;
//保存当前需要设置图片的位置
var currentImgSet = 0;

/**
 * 新建得到ID后，上传文件
 */
function newUploadFiels(id, _callback){
	//设置当前ID
	currentUpdateId = id;
	//正式启动上传机制
	set_upload_param(uploader, '', false);
	if(typeof _callback == 'function'){
		var ret=[];
		for(var i=0; i<9; i++){
			eval("ret.push(currentImgArray.a" + i + ")");
		}
		_callback(ret, fishSiteId, currentImgArray.mainImg);
	}
}
/**
 * 初始化上传位置图片
 */
function initImgSet(){
	$("#u1443_images").html("");
	currentImgCount = 0;
	currentImgSet = 0;
	currendFileList = {};
	currendChooseFilesCount = 0;
	for(var i=0; i<1; i++){
		addImg(null, i);
		eval("currentImgArray.a" + i + "={}");
	}
	currentImgArray.total = 0;
}

/**
 * 初始化主图及设置主图
 */
function setMainImg(mainImg, mainImgIndex){
	if(mainImg != undefined && mainImg != null && mainImg != "" ){
		currentImgArray.mainImg = mainImg;
		//showCurrentImgArray();
		for(var i=0; i<9; i++){
			eval("var imgObj = currentImgArray.a" + i);
			//console.info("imgObj.src[%s] == mainImg[%s]", imgObj.src, mainImg);
			if(imgObj.src != undefined && imgObj.status == undefined && imgObj.src == mainImg){
				mainImgIndex = i;
				break;
			}
		}
	}
	//console.info("mainImgIndex:", mainImgIndex);
	if(mainImgIndex !=undefined && mainImgIndex != -1){
		eval("var imgObj = currentImgArray.a" + mainImgIndex);
		if(imgObj.src != undefined && imgObj.status == undefined){
			$(".main_label").addClass("hiddenc");
			$("#img_main_" + mainImgIndex).removeClass("hiddenc");
			currentImgArray.mainImg = imgObj.src;
            $("#u1443").attr("mainimg", imgObj.src);
		}
	}
}

//选择一个图片位置
function chooseImgSet(obj, img_index){
	currentImgSet = img_index;
	$(".img_element_main").css("border", "none");
	$("#img_" + img_index).parent().css("border", "1px solid #838486");
	$("#plusImgDiv").removeClass("hiddenc");
	$("#upload_div").removeClass("hiddenc");
	onMouseChangeCss("#upload_div", "#upload_div", 1, "background", "#ECECEC", "#FFFFFF");
	onMouseChangeCss("#plusImgDiv", "#plusImgDiv", 1, "background", "#ECECEC", "#FFFFFF");
	showCurrentImgArray();
}
//显示当前图片待保存多媒体文件信息
function showCurrentImgArray(){
	for(var i=0; i<9; i++){
		console.info("currentImgArray[%d]:%s", i, eval("JSON.stringify(currentImgArray.a" + i + ")"));
	}
	console.info("currentImgArray[total]:%d", currentImgArray.total);
	console.info("currentImgArray[mainImg]:%s", currentImgArray.mainImg);
}

/**
 * 初始化位置图片（当前图片+默认图片）
 */
function addImg(imgSrc, img_index){
	if(currentImgCount == 9) return;
	if(imgSrc != null && imgSrc != undefined){
		//img_index = getImgIndex4Src(imgSrc);
		setSrc2Img(img_index, RES_DISC_URL + imgSrc, null, null, false, null);
	}else{
		var html = "";
		html += '<div id="img_div' + img_index + '" class="img_element">';
		html += '	<div class="img_element_main">';
		html += '		<img id="img_' + img_index + '" src="../../images/site_images/siteImg_u1446.png" onload="imgLoad(this)" onclick="chooseImgSet(this, ' + img_index + ')"></img>';
		html += '	</div>';
		html += '	<div id="img_del_' + img_index + '" class="img_element_del hiddenc" onclick="delImg(this)">';
		html += '		<img src="../../images/site_images/u1424.png"/>';
		html += '	</div>';
		html += '	<p class="img_element_progress"></p>';
		html += '	<div id="img_main_' + img_index + '"     class="main_label line_label hiddenc" style="position: absolute; top: 1px;  left: -1px; background-color: #208E0A; border-color: #208E0A; color: #D9DE07;">';
	    html += '		<span class="line_label_text" style="left: 3px;">主图</span>';
	    html += '	</div>';
		html += '	<div id="img_big_' + img_index + '"     class="main_label line_label hiddenc" style="position: absolute; top: 56px; left: 41px; background-color: rgba(255, 255, 255, 0); color: #0081c2" onclick="window.top.showImage($(\'#img_' + img_index + '\'))">';
	    html += '		<span class="line_label_text" style="left: 3px;">大图</span>';
	    html += '	</div>';
		html += '	<div id="img_progress_' + img_index + '" class="prog_label line_label hiddenc" style="position: absolute; top: 52px; left: -1px; background-color: #E21B1B; border-color: #E21B1B; color: #D9DE07;">';
	    html += '		<span class="line_label_text" style="left: 0px;">0%</span>';
	    html += '	</div>';
		html += '</div>';
		$("#u1443_images").append(html);
		//绑定事件让鼠标在图片上也可以有背景色
		$(".img_element").mouseover(function(){$("#u1443_back").addClass("u1443_mouseover");});
		$("#img_div" + img_index).mouseover(function(){
			for(var i=0; i<9; i++){
				$(".img_element > #img_big_" + i).addClass("hiddenc");
			}
			$(".img_element > #img_big_" + img_index).removeClass("hiddenc");
		});
	}
}
/**
 * 选择要上传的图片后设置预览图
 */
function addImgPreview(file ,imgSrc, imgIndex){
	var imgId   = file.id;
	var imgName = file.ossPathFile;
	eval("currendFileList." + imgId + " = file;");
	if(currendChooseFilesCount > 1){
		var imgIndex = file.currentImgSet;
		setSrc2Img(imgIndex, imgSrc, imgId, imgName, true);
	}else{
		setSrc2Img(currentImgSet, imgSrc, imgId, imgName, true);
	}
}
/**
 * 删除一个多媒体对象
 * @param obj
 */
function delImg(obj){
	/*
	var parentObj = $(obj).parent();
	var file = eval("currendFileList." + parentObj.attr("imgId"));
	parentObj.remove();
	uploader.removeFile(file);
	if(currentImgCount == 9){
		$("#plusImgDiv").removeClass("hiddenc");
	}
	currentImgCount--;
	console.info("currentImgCount:", currentImgCount);
	if(currentImgCount == 0){
		//$("#upload_div").addClass("hiddenc");
	}
	*/
}
//从图片路径中解析图片位置
function getImgIndex4Src(imgSrc){
	var a = imgSrc.split("/");
	return a[a.length-1].split(".")[0];
}
//获取视频代码
function getVideoHtml(img_index, videoSrc){
	var html = "";
	html += '		<video autoplay="autoplay" loop="loop" oncanplaythrough="imgLoad(this)" onclick="chooseImgSet(this, ' + img_index + ')">';
	html += '		    <source id="video_' + img_index + '" src="' + videoSrc + '" type="video/mp4">';
	html += '		    MP4';
	html += '		</video>';
	return html;
}
//设置指定位置的正确图片,同时更新currentImgArray
function setSrc2Img(imgIndex, imgSrc, imgId, imgName, isPreview){
	if(imgIndex == -1){
		console.info("imgIndex == -1", imgIndex);
		return;
	}
	if(imgSrc.substr(imgSrc.length - 4, 4) == ".mp4"){
		$("#img_" + imgIndex).css("display", "none");
		var parent = $("#img_" + imgIndex).parent();
		parent.append(getVideoHtml(imgIndex, imgSrc));
	}else{
		if($("#video_" + imgIndex).length > 0){
			$("#video_" + imgIndex).parent().remove();
		}
		$("#img_" + imgIndex).css("display", "block");
		$("#img_" + imgIndex).attr("src", imgSrc);
	}
	if(imgId != null && imgId != undefined){
		$("#img_" + imgIndex).attr("imgId", imgId);
	}
	if(imgName != null && imgName != undefined){
		$("#img_" + imgIndex).attr("imgName", imgName);
	}
	//$("#img_del_" + imgIndex).removeClass("hiddenc");
	
	if(isPreview){
		if(currendChooseFilesCount == 1){
			eval("var src     = currentImgArray.a" + imgIndex + ".src");
			eval("var prevSrc = currentImgArray.a" + currentImgSet + ".prevSrc");
			if(typeof src != 'undefined' && typeof prevSrc == 'undefined'){
				eval("currentImgArray.a" + imgIndex + ".prevSrc='" + src + "'");
			}
		}
		imgSrc = imgName;
		eval("currentImgArray.a" + imgIndex + ".status='start'");
	}
	if(imgSrc != undefined && imgSrc.indexOf(RES_DISC_URL) != -1){
		imgSrc = imgSrc.substr(imgSrc.indexOf(RES_DISC_URL) + RES_DISC_URL.length);
	}
	eval("currentImgArray.a" + imgIndex + ".src='" + imgSrc + "'");
	currentImgArray.total++;
	currentImgCount++;
	if(currentImgCount > 9)currentImgCount=9;
}

/**
 * 获取多媒体文件信息
 * imgSrc==null: 获取当前应该放置的位置
 * imgSrc!=null: 获取当前多媒体文件的位置
 */
function getImgRightSet(imgSrc, file){
	var ret = -1;
	for(var i=0; i<9; i++){
		eval("var imgset = currentImgArray.a" + i);
		if(imgSrc == null || imgSrc == undefined){
			if(currendChooseFilesCount > 1){
				if(typeof imgset.src == 'undefined' && imgset.set == undefined){
					ret = i;
					eval("currentImgArray.a" + i + ".set=true;");
					break;
				}
			}else{
				//如果当前只选择了一个文件则返回当前选择的位置
				ret = currentImgSet;
				break;
			}
		}else{
			if(typeof imgset.src != 'undefined' && imgset.src == imgSrc){
				ret = i;
				break;
			}
		}
	}
	//file.currentImgSet
	if(ret == -1 && (imgSrc == null || imgSrc == undefined) && file.currentImgSet != undefined){
		ret = file.currentImgSet;
	}
	return ret;
}

//=============================================================================
'use strict';
var OSS = OSS.Wrapper;
var STS = OSS.STS;
var bucket = 'app-discovery';
var region =  'oss-cn-hangzhou';
var accessKeyId     = window.top.OStsData.accessKeyId;
var accessKeySecret = window.top.OStsData.accessKeySecret;
var securityToken   = window.top.OStsData.securityToken;
var client;
if(accessKeyId != undefined && accessKeySecret != undefined){
	client = new OSS({
		'region'         : region,
		'accessKeyId'    : accessKeyId,
		'accessKeySecret': accessKeySecret,
		'stsToken'       : securityToken,
		'bucket'         : bucket
	});
}

function delFile(keyName, sucCallback, errCallback){
	client.delete(keyName).then(function(result){
		sucCallback(keyName, result);
	}).catch(function (err) {
		sucCallback(keyName, err);
	});
}
function ossTest(){
	//co
	var co = require('co');
	co(function* () {
		var result = yield client.list();
		console.log("co-listSucc.:", result);
		test2DueResult(result)
	}).catch(function (err) {
		console.log("co-listError:", err);
	});
	//fun
	/*
	client.list().then(function(result) {
		console.log("fun-listSucc.:", result);
		test2DueResult(result);
	}).catch(function (err) {
		console.log("fun-listError:", err);
	});  
	*/
}
	
function test2DueResult(result){
	var objects = result.objects.sort(function(a, b) {
		var ta = new Date(a.lastModified);
		var tb = new Date(b.lastModified);
		if (ta > tb) return -1;
		if (ta < tb) return 1;
		return 0;
	});

	var fileNameArray = [];
	for (var i = 0; i < objects.length; i++) {
		fileNameArray.push(objects[i].name);
		console.info(transtateTimestamp(objects[i].lastModified) + " " + objects[i].name + " " + objects[i].size)
	}
	
	console.info("====================================================");	
	fileNameArray = fileNameArray.sort();
	for (var i = 0; i < fileNameArray.length; i++) {
		var fn = fileNameArray[i];
		for (var j = 0; j < objects.length; j++) {
			if(objects[j].name == fn){
				console.info(transtateTimestamp(objects[j].lastModified) + " " + objects[j].name + " " + objects[j].size)
				break;
			}
		}
	}
}
//=============================================================================