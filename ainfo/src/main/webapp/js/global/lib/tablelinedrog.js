function tablelinedrog() {
	//记录用户拖拽的位置。
	var flag;
	
	//绑定事件
	var addEvent = document.addEventListener ? function(el,type,callback){
	  el.addEventListener( type, callback, !1 );
	} : function(el,type,callback){
	  el.attachEvent( "on" + type, callback );
	}
	//移除事件
	var removeEvent = document.removeEventListener ? function(el,type,callback){
	  el.removeEventListener( type, callback );
	} : function(el,type,callback){
	  el.detachEvent( "on" + type, callback);
	}
	//精确获取样式
	var getStyle = document.defaultView ? function(el,style){
	  return document.defaultView.getComputedStyle(el, null).getPropertyValue(style)
	} : function(el,style){
	  style = style.replace(/\-(\w)/g, function($, $1){
		return $1.toUpperCase();
	  });
	  return el.currentStyle[style];
	}
	var dragManager = {
	  clientY:0,
	  draging:function(e){//mousemove时拖动行
		var dragObj = dragManager.dragObj;
		if(dragObj){
		  e = e || event;
		  if(window.getSelection){//w3c
			window.getSelection().removeAllRanges();
		  }else  if(document.selection){
			document.selection.empty();//IE
		  }
		  var y = e.clientY;
		  var down = y > dragManager.clientY;//是否向下移动
		  var tr = document.elementFromPoint(e.clientX,e.clientY);
		  if(tr.parentNode.firstChild.firstChild) {
			  if(tr && tr.nodeName == "TD"){
					tr = tr.parentNode
					dragManager.clientY = y;
					if( dragObj !== tr){
					  tr.parentNode.insertBefore(dragObj, (down ? tr.nextSibling : tr));
					}
			  };
		  }
		}
	  },
	  dragStart:function(e){
		e = e || event;
		var target = e.target || e.srcElement;
		var input = target.parentNode.firstChild.firstChild;
		if(input) {
			if(target.nodeName === "TD"){
			  target = target.parentNode;
			  
			  //保存用户点击的行的对象
			  tr = target;
			  var index = getIndexByTr();
			  //保存用户拖拽的位置
			  flag = index;
			  navigation_obj = NAVIGATION_ARRAY.items[index];
			  
			  dragManager.dragObj = target;
			  if(!target.getAttribute("data-background")){
				var background = getStyle(target,"background-color");
				target.setAttribute("data-background",background);
			  }
			  //显示为可移动的状态
			  target.style.backgroundColor = "#89C9EE";
			  target.style.cursor = "pointer";
			  dragManager.clientY = e.clientY;
			  if(json.pid == 999999999 && json.search != '') {
				  EIMP.window.show('搜索结果不能调换位置');
			  } else {
				  addEvent(document,"mousemove",dragManager.draging);
				  addEvent(document,"mouseup",dragManager.dragEnd);
			  }
			}
		}
		
	  },
	  dragEnd:function(e){
		var dragObj = dragManager.dragObj;
		if (dragObj) {
		  e = e || event;
		  var target = e.target || e.srcElement;
		  if(target.nodeName === "TD"){
			target = target.parentNode;
			
			dragManager.dragObj = null;
			removeEvent(document,"mousemove",dragManager.draging);
			removeEvent(document,"mouseup",dragManager.dragEnd);
			//获取当前行拖拽的位置
			var index = getIndexByTr();
			if(index != flag && index != -1) {
				if(NAVIGATION_ARRAY.items.length > 1) {
					index = json.pagesize*(json.pagenum-1) + index;
					//调换位置
					AJAX.channelmgr.navigation.order({'id':navigation_obj.id,'sortorder':index+1},function(){
						initpage(json.pagesize, json.pagenum, json.pid, json.search);
					});
				}
			}
		  }
		}
	  },
	  main:function(el){
		addEvent(el,"mousedown",dragManager.dragStart);
	  }
	}
	var el = document.getElementById("drog");
	dragManager.main(el);
}