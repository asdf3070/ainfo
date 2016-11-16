
var util = {
    $: function(sId) { return document.getElementById(sId); },
    addEventHandler: function(elem, type, handler) {
        if (elem.addEventListener) {
            elem.addEventListener(type, handler, false);
        }
        else {
            elem.attachEvent("on" + type, handler);
        }
    },
    removeEventHandler: function(elem, type, handler) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handler, false);
        }
        else {
            elem.detachEvent("on" + type, handler);
        }
    },
    getComputedStyle: function(elem) {
        if (elem.currentStyle)
            return elem.currentStyle;
        else {
            return document.defaultView.getComputedStyle(elem, null);
        }
    },

    getElementsByClassName: function(className, parentElement) {
        var elems = (parentElement || document.body).getElementsByTagName("*");
        var result = [];
        for (i = 0; j = elems[i]; i++) {
            if ((" " + j.className + " ").indexOf(" " + className + " ") != -1) {
                result.push(j);
            }
        }
        return result;
    },
    getEventObj: function(event) {
        return event = event || window.event;
    },
    getEventTarget: function(event) {
        return event.target || event.srcElement;
    },
    getCurrentPosition: function(elem) {
		//top 负数为向上，0 为向下
        var pos = { left: 0, top: -225 };

        while (elem !== document.body) {

            pos.left += elem.offsetLeft;
            pos.top += elem.offsetTop;
            elem = elem.offsetParent;
        }
        return pos;
    },
    extend: function(destination, source) {
        for (var name in source) {
            destination[name] = source[name];
        }
        return destination;
    },
    bindFunction: function(fun, obj) {
        return function() {
            fun.apply(obj, arguments);
        }
    },
    emptyFunction: function() {

    }
}

var SortTable = (function() {
    return function(sTableId, options) {
		this.init(sTableId, options);
    }
})();

SortTable.prototype = (function() {
    var dragCol = []; //拖动列结点数组
    var dragTable;
    var dragTr;
    var isDragCol = false;
    var isDragsRow = false;
    var dragingIndex;

    /* 点击位置相对于元素位置的位置对象 */
    var relPos = {
        left: 0,
        top: 0,
        updatePos: function(left, top) {
            this.left = left;
            this.top = top;
        }
    };

    /* 设定索引和左位置值 */
    var setIndexAndPos = function(elems, dir) {
        dir = dir || 'left';

        for (var i = 0, len = elems.length; i < len; i++) {
            elems[i].index = i;
            if (dir == 'left') {
                elems[i].posLeft = util.getCurrentPosition(elems[i]).left;
            }
            else if (dir == 'top') {
                elems[i].posTop = util.getCurrentPosition(elems[i]).top;
            }
        }
    };
    /* 设置新结点的样式 */
    var setNewNodeStyle = function(newNode, nodeToClone) {
        var newStyle = newNode.style;
        var oldStyle = util.getComputedStyle(nodeToClone);
        newStyle.paddingLeft = oldStyle.paddingLeft;
        newStyle.paddingRight = oldStyle.paddingRight;
        newStyle.paddingTop = oldStyle.paddingTop;
        newStyle.paddingBottom = oldStyle.paddingBottom;
        newStyle.width = nodeToClone.clientWidth - parseInt(newStyle.paddingLeft) - parseInt(newStyle.paddingRight) + 'px';
        newStyle.height = nodeToClone.clientHeight - parseInt(newStyle.paddingTop) - parseInt(newStyle.paddingBottom) + 'px';
    }

    /* 把点击列整列结点复制到数组 */
    var copyCol = function(index, rows, dragingClass, oTable) {
        var newNode;
        var nodeToClone;
        var newTr;
        var newBody;

        dragTable = oTable.cloneNode(false);
        newBody = document.createElement('TFOOT');   //ie下tr必须包在thead tbody或tfoot里
        dragTable.appendChild(newBody);

        dragTable.className += ' ' + dragingClass;
        for (var i = 0, len = rows.length; i < len; i++) {
            newTr = document.createElement('TR');

            nodeToClone = rows[i].cells[index];
            newNode = nodeToClone.cloneNode(true);
            newTr.appendChild(newNode);
            newBody.appendChild(newTr);
        }
        document.body.appendChild(dragTable);
    }

    /* 复制行 */
    var copyRow = function(oTr, dragingClass, oTable) {
        var newTd;
        var oldTd;
        var newBody;
        var dragTr;

        dragTable = oTable.cloneNode(false);
        newBody = document.createElement('TFOOT');
        dragTable.appendChild(newBody);

        dragTr = oTr.cloneNode(true);
        newBody.appendChild(dragTr);


        dragTable.className += ' ' + dragingClass;
        for (var i = 0, len = dragTr.cells.length; i < len; i++) {
            newTd = dragTr.cells[i];
            oldTd = oTr.cells[i];
            setNewNodeStyle(newTd, oldTd);
        }
        document.body.appendChild(dragTable);
    }
    /* 拖动列时更新位置 */
    var updateDragingPosition = function(left, top) {

        dragTable.style.left = left + 'px';
        dragTable.style.top = top + 'px';

    }
    /* 放置拖动列的所有结点 */

    var placeAllColCells = function(index, rows) {
        for (var i = 0, len = rows.length; i < len; i++) {
            var parent = rows[i].cells[0].parentNode;
            if (index == rows[i].cells.length) {
                parent.appendChild(rows[i].cells[dragingIndex]);
            }
            else {
                parent.insertBefore(rows[i].cells[dragingIndex], rows[i].cells[index]);
            }
        }
    }
    /* 放置拖动列 */
    var placeCol = function(left, headers, rows) {
        var halfDistant;
        var parent = headers[0].parent;
        var len = headers.length;

        if (left < headers[0].posLeft) {
            placeAllColCells(0, rows);
            return;
        }
        else {
            for (var i = 0; i < len; i++) {
                halfDistant = headers[i].posLeft + (headers[i].clientWidth / 2);
                if (left >= headers[i].posLeft && left < halfDistant) {
                    placeAllColCells(i, rows);
                    return;
                }
                else if (left >= halfDistant && left < headers[i].posLeft + headers[i].clientWidth) {
                    placeAllColCells(i + 1, rows);
                    return;
                }
            }
            placeAllColCells(i, rows);
        }
    };
    /* 放置拖动行 */
    var placeRow = function(top, rows) {
        var halfDistant;
        var parent = rows[0].parentNode;
        var len = rows.length;

        if (top < rows[0].posTop) {
            parent.insertBefore(rows[dragingIndex], rows[0]);
            return;
        }
        else {
            for (var i = 0; i < len; i++) {
                halfDistant = rows[i].posTop + (rows[i].clientHeight / 2);
                if (top >= rows[i].posTop && top < halfDistant) {
                    parent.insertBefore(rows[dragingIndex], rows[i]);
                    return;
                }
                else if (top >= halfDistant && top < rows[i].posTop + rows[i].clientHeight) {
                    i + 1 < len ? parent.insertBefore(rows[dragingIndex], rows[i + 1]) : parent.appendChild(rows[dragingIndex]);
                    return;
                }
            }
            parent.appendChild(rows[dragingIndex]);
        }
    };

    /* 删除拖动幻影列 */
    var removeShadowArray = function() {
        document.body.removeChild(dragTable);
    };

    /* 鼠标按下事件处理程序 */
    var downHandler = function(rows, dragingClass, oTable, onBeginDrag) {
        return function(event) {
            var _elemPosition;
            var event = util.getEventObj(event);
            var target = util.getEventTarget(event);
            var selectedTr;

            if (target.tagName !== 'TH' && target.tagName !== 'TD' && target.parentNode.tagName !== 'TH') {
                return;
            }
            else {
                onBeginDrag();
                if (target.tagName == 'TH') {
                    dragingIndex = target.index;
                    _elemPosition = util.getCurrentPosition(target);
                    relPos.updatePos(event.clientX - _elemPosition.left, event.clientY - _elemPosition.top);
                    copyCol(dragingIndex, rows, dragingClass, oTable);
                    isDragCol = true;
                }
                else if (target.tagName == 'TD') {
                    selectedTr = target.parentNode;
                    dragingIndex = selectedTr.index;
                    _elemPosition = util.getCurrentPosition(selectedTr);
                    relPos.updatePos(event.clientX - _elemPosition.left, event.clientY - _elemPosition.top);
                    copyRow(selectedTr, dragingClass, oTable);
                    isDragsRow = true;
                }
                updateDragingPosition(event.clientX - relPos.left, event.clientY - relPos.top);
            }
        }
    };

    /* 鼠标拖动事件处理程序 */
    var moveHandler = function(oTable, onDraging) {
        return function(event) {
            var event = util.getEventObj(event);
            var target = util.getEventTarget(event);

            if (isDragCol || isDragsRow) {
                onDraging();
                updateDragingPosition(event.clientX - relPos.left, event.clientY - relPos.top, oTable);
            }
        }
    };

    /* 鼠标松开事件处理程序 */
    var upHandler = function(headers, rows, tBodyRows, onEndDrag) {
        return function(event) {
            var event = util.getEventObj(event);
            var target = util.getEventTarget(event);
            if (!isDragCol && !isDragsRow) {
                return;
            }
            else {
                if (isDragCol) {

                    placeCol(event.clientX, headers, rows);
                    isDragCol = false;
                    setIndexAndPos(headers, 'left');
                }
                else if (isDragsRow) {
                    placeRow(event.clientY - relPos.top, tBodyRows);
                    isDragsRow = false;
                    setIndexAndPos(tBodyRows, 'top');
                }
                removeShadowArray();
                onEndDrag();
            }
        }
    }
    /* 为事件添加处理程序 */
    var addDragHandler = function(rows, dragingClass, oTable, headers, tBodyRows, onBeginDrag, onEndDrag, onDraging) {
        util.addEventHandler(document, 'mousedown', downHandler(rows, dragingClass, oTable, onBeginDrag));
        util.addEventHandler(document, 'mousemove', moveHandler(oTable, onDraging));
        util.addEventHandler(document, 'mouseup', upHandler(headers, rows, tBodyRows, onEndDrag));

    };

    return {
        /* 初始化 */
        init: function(sTableId, options) {
            var defaults = {
                dragingClass: 'draging',
                onBeginDrag: util.emptyFunction,
                onEndDrag: util.emptyFunction,
                onDraging: util.emptyFunction
            };
            util.extend(defaults, options);
            this.oTable = util.$(sTableId);
            this.rows = this.oTable.rows;
            this.tHead = this.oTable.tFoot;
            this.tBody = this.oTable.tBodies[0];
            this.headers = this.tHead.rows[0].cells;
            this.dragingClass = defaults.dragingClass;
            this.onBeginDrag = util.bindFunction(defaults.onBeginDrag);
            this.onEndDrag = util.bindFunction(defaults.onEndDrag);
            this.onDraging = util.bindFunction(defaults.onDraging);

            setIndexAndPos(this.headers, 'left');
            setIndexAndPos(this.tBody.rows, 'top');

            addDragHandler(this.rows, this.dragingClass, this.oTable, this.headers, this.tBody.rows, this.onBeginDrag, this.onEndDrag, this.onDraging);
        }
    }
})();

