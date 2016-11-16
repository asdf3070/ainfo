//var LOGINDATA = $.parseJSON(getCookie("LOGINDATA"))

/*
	截取访问地址栏后的参数
*/
function getParameters() { 
	var url = decodeURI(location.search);//取访问地址url?后的部分
	var obj = new Object();	//返回对象
	var str;	//截取后的字符串
	if(url.charAt(0) == "?") {
		url = url.substring(1, url.length);
		//两个参数以上的情况
		if(url.indexOf("&") != -1) {
			str = url.split("&");
			for(var i = 0; i < str.length; i++) {
				var str1 = str[i].split("=");
				if(str1.length == 2 && str1[0] != '') {
					obj[str1[0]] = str1[1];
				}				
			}
		} 
		//一个参数的情况
		else {
			str = url.split("=");
			if(str.length == 2 && str[0] != '') {
				obj[str[0]] = str[1];
			}			
		}
	}
	return obj;
}

function getParametersByUrl(url) { 
	if(typeof url === 'undefined') {
		return null;
	}
	if(isNumber(url)) {
		return url;
	}
	var obj = new Object();	//返回对象
	var str;	//截取后的字符串
	if(url.indexOf('?') != -1) {
		url = url.substring(url.indexOf('?')+1, url.length);
		//两个参数以上的情况
		if(url.indexOf("&") != -1) {
			str = url.split("&");
			for(var i = 0; i < str.length; i++) {
				var str1 = str[i].split("=");
				if(str1.length == 2 && str1[0] != '') {
					obj[str1[0]] = str1[1];
				}				
			}
		} 
		//一个参数的情况
		else {
			str = url.split("=");
			if(str.length == 2 && str[0] != '') {
				obj[str[0]] = str[1];
			}			
		}
	}
	return obj;
}

/*	
	替换节点中id属性值没有双引号的方法 
	obj: 节点ID
*/
function ieInnerHTML(obj) {
	 var zz = obj.innerHTML,
		 z = 
	   zz.match(/<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>/g);
	  if (z){
		for (var i=0;i<z.length;i++){
		  var y, zSaved = z[i];
		  z[i] = z[i].replace(/(<?\w+)|(<\/?\w+)\s/,
							  function(a){return a.toLowerCase();});
		  y = z[i].match(/\=\w+[?\s+|?>]/g);
		   if (y){
			for (var j=0;j<y.length;j++){
			  z[i] = z[i].replace(y[j],y[j]
						 .replace(/\=(\w+)([?\s+|?>])/g,'="$1"$2'));
			}
		   }
		   zz = zz.replace(zSaved,z[i]);
		 }
	   }
	  return zz;
 }
 /*
	判断浏览器类型
*/
function getOs()  
{  
   if(navigator.userAgent.indexOf("MSIE")>0) {  
        return "MSIE";	//IE
   }  
   if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
        return "Firefox";  //火狐
   }  
   if(isSafari=navigator.userAgent.indexOf("Safari")>0) {  
        return "Safari";  //谷歌
   }   
   if(isCamino=navigator.userAgent.indexOf("Camino")>0){  
        return "Camino";  
   }  
   if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){  
        return "Gecko";  
   }  
}  

var start = 0; //光标起始位置
var end = 0;	//光标终点位置
/*
	计算光标的位置
	在指定光标的位置添加文本图片等。
	id = 元素ID
	text = 插入到指定位置的文本
*/
function insertText(id, text){        
    var textBox = document.getElementById(id);
    var pre = textBox.value.substr(0, start);
    var post = textBox.value.substr(end);
    textBox.value = pre + text + post;
	if(document.selection) {
		var tempText = textBox.createTextRange(); 
		tempText.moveStart("character", start); 
		tempText.moveEnd("character", -(textBox.value.length-(start+text.length))); 
		tempText.select(); 
	} else {
		 textBox.selectionStart = textBox.selectionEnd = start+text.length;
	}
	start += text.length;
}
/*
	保存光标的位置	
*/
function savePos(textBox){
    //如果是Firefox(1.5)的话，方法很简单
    if(typeof(textBox.selectionStart) == "number"){
        start = textBox.selectionStart;
        end = textBox.selectionEnd;
    }
    //下面是IE(6.0)的方法，麻烦得很，还要计算上'\n'
    else if(document.selection){
        var range = document.selection.createRange();
        if(range.parentElement().id == textBox.id){
            var range_all = document.body.createTextRange();
            range_all.moveToElementText(textBox);
            //两个range，一个是已经选择的text(range)，一个是整个textarea(range_all)
            //range_all.compareEndPoints()比较两个端点，如果range_all比range更往左(further to the left)，则                
			//返回小于0的值，则range_all往右移一点，直到两个range的start相同。
            for (start=0; range_all.compareEndPoints("StartToStart", range) < 0; start++)
                range_all.moveStart('character', 1);
            // 计算一下\n
            for (var i = 0; i <= start; i ++){
                if (textBox.value.charAt(i) == '\n')
                    start++;
            }                
            var range_all = document.body.createTextRange();
            range_all.moveToElementText(textBox);
            
            for (end = 0; range_all.compareEndPoints('StartToEnd', range) < 0; end ++)
                range_all.moveStart('character', 1);
            
                for (var i = 0; i <= end; i ++){
                    if (textBox.value.charAt(i) == '\n')
                        end ++;
                }
            }
        }
}
// 去掉字符串的头空格（左空格）
function LTrim(str){ 
    var i;
    for(i=0;i<str.length; i++) {
        if(str.charAt(i)!=" ") break;
    }
    str = str.substring(i,str.length);
    return str;
}
// 去掉字符串的尾空格（右空格）
function RTrim(str){
    var i;
    for(i=str.length-1;i>=0;i--){
        if(str.charAt(i)!=" ") break;
    }
    str = str.substring(0,i+1);
    return str;
}
// 去掉字符串的头尾空格（左右空格）
function trim(str){
    return LTrim(RTrim(str));
}

//验证电话号码
function checkTel(tel) {
   var mobile = /^\d{11}$/;
   var phone  = /^0\d{2,3}-?\d{7,8}$/;
   return mobile.test(tel) || phone.test(tel);
}

/**
 * 输入框输入数字
 * @param e
 */
function inputvalue(e) {
	var reg = /^\-?[0-9\,]*\.?\d*$/;
	if(!reg.test(e.value)) {
		e.value = e.value.slice(0, e.value.length-1);
	}
}

/**
 * 判断字符串返回非空串
 * @param e
 */
function isNull_0(string){
	string = $.trim(string);
	if(typeof string == 'undefined' || string == null){
		return "";
	}
	return string;
}

/**
 * 验证输入是否整数
 * @param oNum
 * @returns {Boolean}
 */
function isInteger(oNum){
  if(!oNum) return false;
  var strP=/^\d+$/; //正整数
  if(!strP.test(oNum)) return false;
  return true;
}

/**
 * 验证输入是否是数字
 * @param oNum
 * @returns {Boolean}
 */
function isNumber(oNum) { 
  if(!oNum) 
	  return false; 
  var strP = /^\d+(\.\d+)?$/; 
  if(!strP.test(oNum)) 
	  return false; 
  try{ 
	  if(parseFloat(oNum)!= oNum) 
		  return false; 
  } 
  catch(ex) 
  { 
	  return false; 
  } 
  return true; 
}
/**
 * 验证输入是否是浮点数
 * @param oNum 参数
 * @returns {Boolean}
 */
function isfloat(oNum){
	var s = /^[\+\-]?\d+(\.\d+)?$/;
	if (!s.test(oNum) ){
		return false;
	}
	//if(oNum.indexOf('.') != -1) {
	//	return false;
	//}
	return true;
}

/*
	创建元素
	eName = '元素名称
	例如(input option div)'
*/
function createElementByeName(eName) {
	return document.createElement(eName);
}
/*
	查找元素
	根据class查找 Ly(".id")，
	根据ID查找    Ly("#id")，
	根据节点查找  Ly("id");
*/
function Ly(id) {
	var str = id.substring(0,1);
	if(str == ".")
		return getElementsByClass(id.substring(1,id.length));
	else if(str == "#")
		return document.getElementById(id.substring(1,id.length));
	else {
		var tags = document.getElementsByTagName(id);
		return tags.length == 1 ? tags[0] : tags;
	}
}
//根据class查找元素
function getElementsByClass(searchClass) {
	var classElements = new Array();
	//获得文档的所有节点
	var els = document.getElementsByTagName("*");
	//正则表达式匹配节点中class的名字
	var pattern = new RegExp("\\b" + searchClass + "\\b");
	for(var i = 0,j = 0; i < els.length; i++){
		if( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}	

	return classElements.length == 1 ? classElements[0] : classElements;
 }

/*
	获取键盘按键值e == event
*/
function keypress(e) {
	e = window.event || e;
	var keyCode = e.keyCode || e.which;
	return keyCode;
}
/**
 * 检查文件名，是否为支持的图片格式
 * @param fileName
 * @returns {Boolean}
 */
function isRightPicture(fileName){
	var regexp = /.+.JPEG|JPG|GIF|PNG/i;
	if(regexp.test(fileName)){
		return true;
	}else{
		_E.window.show("目前只支持：.jpeg、.jpg、.gif、.png 格式的图片");
		return false;
	}
}

/**
 * 设置Cookie
 */
function setCookie(c_name, value, expiredays){
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

/**
 * 获取Cookie
 */
function getCookie(c_name){
	if (document.cookie.length>0){
		c_start=document.cookie.indexOf(c_name + "=")
		if (c_start!=-1){ 
			c_start=c_start + c_name.length+1 
			c_end=document.cookie.indexOf(";",c_start)
			if (c_end==-1) 
				c_end=document.cookie.length
			return unescape(document.cookie.substring(c_start,c_end))
		} 
	}
	return ""
}
/**
 * 删除Cookie
 */
function delCookie(name){
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null){
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	}
}
/**
 * 将数组转换为字串
 */
function convertArray2String(obj){
	var ret = "";
	for(var i=0; i<obj.length; i++){
		ret += obj[i] + ",";
	}
	return ret;
}