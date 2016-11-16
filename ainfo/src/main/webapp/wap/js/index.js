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
	getdata();
});


function getdata(){
	var intervalId = setInterval(function(){
		$.ajax({
			url        : '/aparam/query',
			type       : 'get',
			datatype   : 'json',  
			async      : false,
			contentType: 'application/json; charset=utf-8',
			success    : function(data, status, obj){
				var html = '';
				var imgArray=['001-home.png', '002-home2.png', '003-home3.png', '004-office.png', '005-newspaper.png', '006-pencil.png', '007-pencil2.png', '008-quill.png'];
				var colArray=['#337ab7', '#a94442', '#5BD445', '#BED445', '#D44545', '#B745D4', '#999DA7', '#99A7A7'];
				for(var i=0; i<data.body.length; i++){
					var row = data.body[i];
					html += '<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 r t-item" onclick="writeParam(' + row.id + ', ' + row.pValue + ')">';
					html += '	<div class="t-item-i" style="background: ' + colArray[i] + '">';
					html += '		<div class="tpc_item_up">';
					html += '			<img src="images/icon/' + imgArray[i] + '"/>';
					html += '			<span>' + row.pName + '</span>';
					html += '		</div>';
					html += ' 		<div class="tpc_item_dw">';
					html += '			' + row.pValue + '';
					html += '		</div>';
					html += '	</div>';
					html += '</div>';
				}
				$(".t-conetnt").html(html);
				console.info("set system params is done. %o", data.body);
			},
			error       : function(data){
				clearInterval(intervalId);
				console.info("clearInterval%o", data);
			}
		});
	}, 500);
	
}

function writeParam(pid, pValue){
	pValue = pValue==1 ? 0 : 1;
	$.ajax({
		url        : '/aparam/write/' + pid + "/" + pValue,
		type       : 'get',
		datatype   : 'json', 
		contentType: 'application/json; charset=utf-8',
		success    : function(data, status, obj){
			
		},
		error       : function(data){
			
		}
	});
}

function setMainIframeSize(){
	
}