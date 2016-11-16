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
	showCharTable();
});



function setButtonLineSize(){
	var tp_content_width = $(".tp_content").width();
	var tpc_item_width   = $(".tpc_item").width();
	var tpc_item_count   = $(".tpc_item").length;
	var lineMaxCount = Math.floor(tp_content_width/tpc_item_width);
	var rowCount = Math.floor(tpc_item_count/lineMaxCount);
	var rowMod   = tpc_item_count%lineMaxCount;
	var rowHeight = 130;
	var rowCurrHeight = $(".total_panel").height();
	if(rowMod != 0){
		rowCount++;
	}
	if(rowCount > 1){
		rowCount--;
		rowHeight = rowCurrHeight + (rowHeight * rowCount);
		$(".total_panel").css("height", rowHeight + "px");
	}
}

function showCharTable(){
	$('#container').highcharts({
        title: {
            text: '数据统计',
            x: -20 //center
        },
        subtitle: {
            text: 'SOURCE BY: www.heipiaola.com',
            x: -20
        },
        xAxis: {
            categories: [
                '2015-02-11', 
                '2015-02-12', 
                '2015-02-13', 
                '2015-02-14', 
                '2015-02-15',
                '2015-02-16', 
                '2015-02-17', 
                '2015-02-18', 
                '2015-02-19', 
                '2015-02-20', 
                '2015-02-21', 
                '2015-02-22', 
                '2015-02-23', 
                '2015-02-24', 
                '2015-02-25',
                '2015-02-26', 
                '2015-02-27', 
                '2015-02-28', 
                '2015-02-29'],
            labels: {
                rotation: -45,
                align: 'right',
                style: {
                    fontSize: '12px',
                    fontFamily: 'Verdana, sans-serif',
                    textShadow: '0 0 0 black'
                }
            }
        },
        yAxis: {
            title: {
                text: '点击数(次)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: '访问量',
            data: [
                1608, 
                1760,
                1635, 
                1526, 
                1634, 
                1627, 
                1613, 
                1516, 
                1768, 
                1810, 
                1848, 
                1918, 
                1948, 
                1678, 
                1638, 
                1678, 
                1668, 
                1697, 
                1997]
        }]
    });
}
