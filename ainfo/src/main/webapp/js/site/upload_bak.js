accessid= '6MKOqxGiGU4AUk44';
accesskey= 'ufu7nS8kS59awNihtjSonMETLI0KLy';

//上传至服务器目录，最后以/结尾
g_dirname = 'test/'
g_object_name = ''
//上传文件名类型  random_name：随机文件名  local_name：本地文件名
g_object_name_type = 'random_name'
now = timestamp = Date.parse(new Date()) / 1000; 

var policyText = {
    "expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
    "conditions": [
         ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
    ]
};

var policyBase64 = Base64.encode(JSON.stringify(policyText))
message = policyBase64
var bytes = Crypto.HMAC(Crypto.SHA1, message, accesskey, { asBytes: true }) ;
var signature = Crypto.util.bytesToBase64(bytes);

if(window.top.OStsData.expiration < timestamp){
	window.top.OStsData.getOSts();
}
'use strict';
var OSS = OSS.Wrapper;
var STS = OSS.STS;
var bucket = 'fs-profile';
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
function test(){
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
	client.list().then(function(result) {
		console.log("fun-listSucc.:", result);
		test2DueResult(result);
	}).catch(function (err) {
		console.log("fun-listError:", err);
	});
}

function test2DueResult(result){
	var objects = result.objects.sort(function(a, b) {
		var ta = new Date(a.lastModified);
		var tb = new Date(b.lastModified);
		if (ta > tb) return -1;
		if (ta < tb) return 1;
		return 0;
	});

	for (var i = 0; i < objects.length; i++) {
		console.info(transtateTimestamp(objects[i].lastModified) + " " + objects[i].size + " " + objects[i].name)
	}
}

//保存当前待保存多媒体文件信息
var currentImgArray = {};
/**
 * 初始化上传位置图片
 */
function initImgSet(){
	$("#u1443_images").html("");
	currentImgCount = 0;
	currentImgSet = -1;
	currendFileList = {};
	currendChooseFilesCount = 0;
	for(var i=0; i<9; i++){
		addImg(null, i);
		eval("currentImgArray.a" + i + "={}");
	}
	currentImgArray.total=0;
}

/**
 * 获取多媒体文件信息
 * imgSrc==null: 获取当前应该放置的位置
 * imgSrc!=null: 获取当前多媒体文件的位置
 */
function getLastImgSet(imgSrc){
	var ret = -1;
	for(var i=0; i<9; i++){
		eval("var imgset = currentImgArray.a" + i);
		if(imgSrc == null){
			if(typeof imgset.src == 'undefined'){
				ret = i;
				break;
			}
		}else{
			if(typeof imgset.src != 'undefined' && imgset.src == imgSrc){
				ret = i;
				break;
			}
		}
	}
	return ret;
}

var currentImgSet = -1;
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

function showCurrentImgArray(){
	for(var i=0; i<9; i++){
		console.info("currentImgArray[%d]:%s", i, eval("JSON.stringify(currentImgArray.a" + i + ")"));
	}
	console.info("currentImgArray[total]:%d", currentImgArray.total);
}

function getImgIndex4Src(imgSrc){
	var a = imgSrc.split("/");
	return a[a.length-1].split(".")[0];
}

/**
 * 设置图片及位置图片
 */
var currentImgCount = 0;
function addImg(imgSrc, img_index){
	if(currentImgCount == 9) return;
	if(imgSrc != null){
		img_index = getImgIndex4Src(imgSrc);
		eval("currentImgArray.a" + img_index + ".src='" + imgSrc + "'");
		currentImgArray.total++;
		imgSrc = RES_PROC_URL + imgSrc;
		$("#img_" + img_index).attr("src", imgSrc);
		$("#img_del_" + img_index).removeClass("hiddenc");
		currentImgCount++;
	}else{
		var html = "";
		html += '<div class="img_element">';
		html += '	<div class="img_element_main">';
		html += '		<img id="img_' + img_index + '" src="../../images/site_images/siteImg_u1446.png" onload="imgLoad(this)" onclick="chooseImgSet(this, ' + img_index + ')"></img>';
		html += '	</div>';
		html += '	<div id="img_del_' + img_index + '" class="img_element_del hiddenc" onclick="delImg(this)">';
		html += '		<img src="../../images/site_images/u1424.png"/>';
		html += '	</div>';
		html += '	<p class="img_element_progress"></p>'
		html += '</div>';
		$("#u1443_images").append(html);
		//绑定事件让鼠标在图片上也可以有背景色
		$(".img_element").mouseover(function(){$("#u1443_back").addClass("u1443_mouseover");});
	}
}
var currendFileList = {};
var currendChooseFilesCount = 0;
function addImgPreview(file ,imgSrc){
	var imgId   = file.id;
	var imgName = file.name;
	eval("currendFileList." + imgId + " = file;");
	if(currentImgCount == 9) return;
	if(currendChooseFilesCount > 1){
		console.info("addImgPreview->uploader.files.length", uploader.files.length);
		var imgIndex = getLastImgSet();
		$("#img_" + imgIndex).attr("src", imgSrc);
		$("#img_" + imgIndex).attr("imgId", imgId);
		$("#img_" + imgIndex).attr("imgName", imgName);
		$("#img_del_" + imgIndex).removeClass("hiddenc");
		eval("var src     = currentImgArray.a" + imgIndex + ".src");
		eval("var prevSrc = currentImgArray.a" + currentImgSet + ".prevSrc");
		if(typeof src != 'undefined' && typeof prevSrc == 'undefined'){
			eval("currentImgArray.a" + imgIndex + ".prevSrc='" + src + "'");
		}
		eval("currentImgArray.a" + imgIndex + ".src='" + imgName + "'");
		eval("currentImgArray.a" + imgIndex + ".status='start'");
	}else{
		$("#img_" + currentImgSet).attr("src", imgSrc);
		$("#img_" + currentImgSet).attr("imgId", imgId);
		$("#img_" + currentImgSet).attr("imgName", imgName);
		$("#img_del_" + currentImgSet).removeClass("hiddenc");
		eval("var src     = currentImgArray.a" + currentImgSet + ".src");
		eval("var prevSrc = currentImgArray.a" + currentImgSet + ".prevSrc");
		if(typeof src != 'undefined' && typeof prevSrc == 'undefined'){
			eval("currentImgArray.a" + currentImgSet + ".prevSrc='" + src + "'");
		}
		eval("currentImgArray.a" + currentImgSet + ".src='" + imgName + "'");
		eval("currentImgArray.a" + currentImgSet + ".status='start'");
	}
	currentImgArray.total++;
	currentImgCount++;
	if(currentImgCount > 0){
		//$("#upload_div").removeClass("hiddenc");
	}
	if(currentImgCount == 9){
		//$("#plusImgDiv").addClass("hiddenc");
	}
}
/**
 * 删除一个多媒体对象
 * @param obj
 */
function delImg(obj){
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
}


//解析要显示的文件名
function get_uploaded_object_name(filename){
    if (g_object_name_type == 'local_name'){
        tmp_name = g_object_name
        tmp_name = tmp_name.replace("${filename}", filename);
        return tmp_name
    }else if(g_object_name_type == 'random_name') {
        return g_object_name
    }
}
//获取指定长度的随机字符串
function random_string(len) {
	len = len || 32;
	var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
	var maxPos = chars.length;
	var pwd = '';
	for (i = 0; i < len; i++) {
		pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
//获取文件后缀
function get_suffix(filename) {
    pos = filename.lastIndexOf('.')
    suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos)
    }
    return suffix;
}
//计算对象名称
function calculate_object_name(filename){
    if (g_object_name_type == 'local_name')    {
        g_object_name += "${filename}"
    }
    else if (g_object_name_type == 'random_name')    {
        suffix = get_suffix(filename);
        g_object_name = g_dirname + random_string(10) + suffix
    }
    return ''
}

function getKeyName(filename){
	var imgIndex = -1;
	if(uploader.files.length > 1){
		imgIndex = getLastImgSet(filename);
	}else{
		imgIndex = currentImgSet;
	}
	if(imgIndex != -1){
		suffix = get_suffix(filename);
		return g_dirname + imgIndex + suffix;
	}else{
		return -1;
	}
}
/**
 * STS 文件上传
 * @param key
 * @param file
 */
function stsUpload2oss(file){
	var keyName = getKeyName(file.name);
	if(keyName == -1){
		return;
	}
    
    return client.multipartUpload(keyName, file.getNative(), {
		progress: stsProgress
	}).then(function(res) {
		console.log('upload success:', res);
		var imgIndex = getLastImgSet(file.name);
		eval("currentImgArray.a" + imgIndex + ".src='" + keyName + "'");
		eval("currentImgArray.a" + imgIndex + ".status='end'");
		$('#u1443_images > div:nth-child(' + (imgIndex + 1) + ') > p').css('width', '100%');
		uploader.removeFile(file);
	}).catch(function(err){
		_E.window.show("文件上传遇到问题请重新选择！");
		console.log('multipartUpload err.code:', err.code);
		console.log('multipartUpload err-file', file.name);
		var imgIndex = getLastImgSet(file.name);
		$("#img_" + imgIndex).attr("src", "../../images/site_images/siteImg_u1446.png");
		$("#img_" + imgIndex).attr("imgId", "");
		$("#img_" + imgIndex).attr("imgName", "");
		$("#img_del_" + imgIndex).addClass("hiddenc");
		eval("currentImgArray.a" + imgIndex + ".src=''");
		eval("var prevSrc = currentImgArray.a" + imgIndex + ".prevSrc");
		if(typeof prevSrc != 'undefined'){
			eval("currentImgArray.a" + imgIndex + ".src='" + prevSrc + "'");
			$("#img_" + imgIndex).attr("src", RES_PROC_URL + prevSrc);
		}
		$('#u1443_images > div:nth-child(' + (imgIndex + 1) + ') > p').css('width',  '0');
		eval("currentImgArray.a" + imgIndex + ".status='end'");
		currentImgArray.total--;
	});
}
/**
 * STS 上传进度回调
 * @param p
 */
function stsProgress(p, cpt){
    if(typeof cpt != "undefined"){
		var imgIndex = getLastImgSet(cpt.file.name);
		$('#u1443_images > div:nth-child(' + (imgIndex + 1) + ') > p').css('width',  (p * 100) + '%');
    }
	return function(done){
		done();
	}
}
/**
 * 使用STS进行文件上传
 */
function stsUpload(_callback){
	for(var i=0; i<uploader.files.length; i++){
		var upFile = uploader.files[i];
		stsUpload2oss(upFile);
	}
	if(typeof _callback == 'function'){
		var ret=[];
		for(var i=0; i<9; i++){
			eval("ret.push(currentImgArray.a" + i + ")");
		}
		_callback(ret);
	}
}

function set_upload_param(up, filename, ret){
    g_object_name = g_dirname;
    if (filename != '') {
        suffix = get_suffix(filename);
        calculate_object_name(filename);
    }
    new_multipart_params = {
        'key' : g_object_name,
        'policy': policyBase64,
        'OSSAccessKeyId': accessid, 
        'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
        'signature': signature,
    };

    up.setOption({
        'url': RES_PROC_URL,
        'multipart_params': new_multipart_params
    });
    
    //up.start();
}
//实例化一个plupload上传对象
var uploader = new plupload.Uploader({ 
	runtimes            : 'html5,flash,silverlight,html4',
	browse_button 		: 'plusImgDiv',
	flash_swf_url       : 'lib/plupload-2.1.2/js/Moxie.swf',
	silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',
    multi_selection     : true,
    filters             : {
							  mime_types : [ //只允许上传图片和zip文件
							    { 
							    	title : "multi-media files", 
							    	extensions : "jpg,gif,png,mp4" 
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
							  width: 100,
							  height: 100,
							  crop: true,
							  quality: 60,
							  preserve_headers: false
						  },
	unique_names        : true,
	drop_element        : 'u1443',
	url 				: RES_PROC_URL,
	
	init                :{
		PostInit: function() {
			document.getElementById('upload_div').onclick = function() {
	            set_upload_param(uploader, '', false);
	            return false;
			};
		},

		//绑定文件添加进队列事件
		FilesAdded: function(up, files) {
			currendChooseFilesCount = files.length;
			if(currentImgCount == 9){
				$(".img_element").remove();
			}
			var len = files.length;
			if(len > 9) len = 9;
			for(var i = 0; i<len; i++){
				var file = files[i]; 
				!function(i){
					console.info("previewImageIndex:", i);
					previewImage(files[i], function(imgsrc){
						//生成预览进行显示
						addImgPreview(files[i], imgsrc);
					})
			    }(i);
			    //stsUpload();
			}
		},
		
		//当文件从上传队列移除后触发
		FilesRemoved: function(up, files){
			for(var i = 0; i<files.length; i++){
				console.info("文件:" +files[i].name+ " ID:" + files[i].id + "从上传队列删除");
			}
		},

		BeforeUpload: function(up, file) {
            //check_object_radio();
            //get_dirname();
            set_upload_param(up, file.name, true);
        },
        
        //绑定文件上传进度事件
		UploadProgress: function(up, file) {
			$('#file-'+file.id+' .img_element_progress').css('width',file.percent + '%');//控制进度条
		},

		FileUploaded: function(up, file, info) {
            if (info.status == 200){
            	var resoueces = $("#u1443").attr("resoueces");
            	if(typeof resoueces == 'undefined') resoueces = "";
            	$("#u1443").attr("resoueces", resoueces + get_uploaded_object_name(file.name) + ",");
                console.info('upload to oss success, object name:' + get_uploaded_object_name(file.name));
            }
            else{
                console.info(info.response);
            } 
		},

		Error: function(up, err) {
			switch(err.code){
			case -602:
				_E.window.show("重复的选择了文件：" + err.file.name);
				break;
			case -600:
				_E.window.show("您选择的文件超限制：" + up.settings.filters.max_file_size);
				break;
			case -200:
				_E.window.show("网络传输有问题哦，请专业人事诊断一下吧！" + err.response);
				break;
			}
			console.info("errCode: " + err.code + " Error xml:", err.response);
			//document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
		}
	}
	
});
//初始化
uploader.init(); 

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
