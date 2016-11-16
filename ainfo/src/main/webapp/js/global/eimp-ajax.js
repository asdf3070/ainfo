
/************ajax请求后台访问统一路径**************/
var AJAX_URL = {
	'users'                     : '/api/users',
	'users.user'                : '/api/users/user',
	'users.modify.label'        : '/api/users/modify/label',
	'users.modify.black'        : '/api/users/modify/black',
	'users.partner.like'        : '/api/users/partner/like',
	'users.partner.area'        : '/api/users/partner/area',
	'users.partner.applys'      : '/api/users/partner/applys',
	'users.partner.check'       : '/api/users/partner/check',
	'users.partner.fishsite'    : '/api/users/partner/fishsite',
	'users.partner.add'         : '/api/users/partner/add',
	'users.partner.region'      : '/api/users/partner/region',
	'users.partner.modification': '/api/users/partner/modification',
	'users.remark'              : '/api/users/modify/remark',
	'users.like'                : '/api/users',
	'users.partner.id'          : '/api/users/partner',
	'user.authUser'             : '/api/users/user/authUser',
		
	'sites.status'              : '/api/sites/status',
	'sites.remark'              : '/api/sites/remark',
	'sites.like'                : '/api/sites/like',
	'sites.region'              : '/api/sites/region',
	'sites.authentication'      : '/api/sites/authentication',

	'sites.site.check'          : '/api/sites/site/check',
	'sites.site.flag'           : '/api/sites/site/flag',
	'sites.site.get'            : '/api/sites/site',
	'sites.site.create'         : '/api/sites/site/create',
	'sites.site.modification'   : '/api/sites/site/modification',
	
	'sites.pond.list'           : '/api/sites/pond/list',
	'sites.pond.create'         : '/api/sites/pond/create',
	'sites.pond.modification'   : '/api/sites/pond/modification',
	'sites.pond.removel'        : '/api/sites/pond/removel',
	
	'sites.list.partnerIdIsNull': '/api/sites/list/partnerIdIsNull',
	
	'dicts'                     : '/api/dicts',
	
	'region.list'               : '/api/region/list',
	'region.menulist'           : '/api/region/menulist',
	
	'deposits.ranking'          : '/api/deposits',
	'deposits.records'          : '/api/deposits/records',
	'deposits.list'             : '/api/deposits/list',
	
	'account.user.list'         : '/api/account/list',
	'account.site.list'         : '/api/account/list/site',
	'account.list.site'         : '/api/account/site',
	
	'token.oss_sts'             : '/api/token/oss_sts',
	
	'team.list'					: '/team/findList',
	'team.userInfo'				: '/team/userInfo',
	'team.permission'			: '/team/permission',
	'team.save'					: '/team/update',
	'team.status'               : '/team/status',
	'team.search'               : '/team/search',
	'team.add'                  : '/team/adds',
	'team.pwd'                  : '/team/updatePwd',

	'staff.list'                : '/staff/list',
	'staff.add'                 : '/staff/add/@',
	'staff.update'              : '/staff/update/@',
	'staff.del'                 : '/staff/delete/@',

	'terminal.list'             : '/terminal/list',
	'terminal.add'              : '/terminal/add/@',
	'terminal.update'           : '/terminal/update/@',
	'terminal.del'              : '/terminal/delete/@',

	'dicts.query'                 : '/dicts/get',
	
	'aparam.query'              : '/aparam/query',
	
	'system.message'            : '/sys/message/'	//获取系统信息	--  cp服务器
	/*'system.message0'           : 'http://cp.heipiaola.com/nginx_status'*/	//获取系统信息   --  nginx服务器
};

/*
 * 封装AJAX所有模块的请求
 * */
var AJAX = (function(){
	var users = {'modify':{}, 'partner':{}};
	var sites = {'site': {}, 'pond': {}, 'list': {}};
	var dicts = {};
	var region = {};
	var deposits = {};
	var account = {'user':{}, 'site':{}};
	var token = {};
	var team = {};
	var system = {};
	var staff = {};
	var terminal = {};
	var aparam = {};
	

	//
	aparam.query = function (_paramPath, _callback, _callback2) {
		ajax({}, _callback, _callback2, 'get', 'aparam.query', null, _paramPath);
	};

	/**==================================================
	 *                    会员管理
	 *==================================================*/
	users.query = function (_param, _callback, _callback2) {
		switch(_param.type){
		case 0://分页查询会员信息列表
			ajax({}, _callback, _callback2, 'get', 'users', null, '/' + _param.pagenum + '/' + _param.pagesize + '/' + _param.orderRule);
			break;
		case 1://根据用户名或手机号匹配查询用户
			//ajax({}, _callback, _callback2, 'get', 'users', null, '/' + _param.pagenum + '/' + _param.pagesize + '/' + _param.keyword);
			//ajax({}, _callback, _callback2, 'get', 'users', null, '/' + _param.keyword + '/' + _param.orderRule);
			ajax({}, _callback, _callback2, 'get', 'users', null, '/' + _param.keyword + '/' + _param.pagenum + '/' + _param.pagesize);
			break;
		case 2://1.	通过ID用户查询
			ajax({}, _callback, _callback2, 'get', 'users.user', null, '/' + _param.uid);
			break;
		}
	};
	//贴标签/去标签
	users.modify.label = function (_paramPath, _callback, _callback2, _param) {
		ajax(JSON.stringify(_param), _callback, _callback2, 'put', 'users.modify.label', null, _paramPath);
	};
	//拉黑/取消拉黑
	users.modify.black = function (_paramPath, _callback, _callback2, _param) {
		ajax(JSON.stringify(_param), _callback, _callback2, 'put', 'users.modify.black', null, _paramPath);
	};
	//合伙人查询
	users.partner.qurey = function (_param, _callback, _callback2) {
		switch(_param.type){
		case 0://根据合伙人管理区查询合伙人                                         /{region}/{start}/{size}
			ajax({}, _callback, _callback2, 'get', 'users.partner.area', null, '/' + _param.regionId + '/' + _param.uesrpagestart + '/' + _param.uesrpagesize);
			break;
		case 1://根据昵称或手机号匹配查询合伙人                               /{conditions}/{start}/{size}
			ajax({}, _callback, _callback2, 'get', 'users.partner.like', null, '/' + _param.keyword + '/' + _param.uesrpagestart + '/' + _param.uesrpagesize);
			break;
		case 13://查询申请合伙人列表                                                          /{status}/{start}/{size}
			ajax({}, _callback, _callback2, 'get', 'users.partner.applys', null, '/' + _param.status + '/' + _param.uesrpagestart + '/' + _param.uesrpagesize);
			break;
		}
	}
	//合伙人签约钓场查询/分配钓场/取消分配的钓场
	users.partner.fishsite = function (_param, _callback, _callback2) {
		switch(_param.siteType){
		case 0://分页查询合伙人签约钓场                                             /{partnerId}/{start}/{size}
			ajax({}, _callback, _callback2, 'get', 'users.partner.fishsite', null, '/' + _param.partnerId + '/' + _param.sitepagestart + '/' + _param.sitepagesize);
			break;
		case 1://合伙人分配钓场    {"partnerId":0,"siteId":0}
			var param = {
				"partnerId": _param.partnerId,
				"siteId"   : _param.fishSiteId
			}
			ajax(JSON.stringify(param), _callback, _callback2, 'post', 'users.partner.fishsite', null, '');
			break;
		case 2://取消合伙人分配的钓场                                             /{partnerId}/{siteId}
			ajax({}, _callback, _callback2, 'delete', 'sites.pond.removel', null, '/' + _param.partnerId + '/' + _param.fishSiteId);
			break;
		}
	};
	//添加合伙人
	users.partner.add = function (_paramPath, _callback, _callback2, _param) {
		ajax(JSON.stringify(_param), _callback, _callback2, 'post', 'users.partner.add', null, _paramPath);
	};
	//修改合伙人信息
	users.partner.modification = function (_paramPath, _callback, _callback2, _param) {
		ajax(JSON.stringify(_param), _callback, _callback2, 'put', 'users.partner.modification', null, _paramPath);
	};
	//合伙人审核
	users.partner.check = function (_paramPath, _callback, _callback2, _param) {
		ajax(JSON.stringify(_param), _callback, _callback2, 'put', 'users.partner.check', null, _paramPath);
	};
	//修改用户备注信息
	users.remark = function (_paramPath, _callback, _callback2, _param) {
		ajax(JSON.stringify(_param), _callback, _callback2, 'put', 'users.remark', null, _paramPath);
	};
	//模糊查询用户列表
	users.like = function (_param, _callback, _callback2){
		ajax({}, _callback, _callback2, 'get', 'users.like', null, "/" + _param.param + "/" + _param.start + "/" + _param.size );
	};
	//根据用户Id查询合伙人
	users.partner.id = function (_param, _callback, _callback2){
		ajax({}, _callback, _callback2, 'get', 'users.partner.id', null, _param);
	};
	//实名认证
	users.authUser = function(_param, _callback, _callback2){
		ajax(JSON.stringify(_param), _callback, _callback2, 'put', 'user.authUser', null);
	};
	//添加合伙人地区查询
	users.partner.region = function(_callback){
		ajax({}, _callback, null , 'get', 'users.partner.region', null);
	}
	
	/**==================================================
	 *                    钓场管理
	 *==================================================*/
	/**
	 *  查询钓场列表
	 */
	sites.query = function (_param, _callback, _callback2) {
		switch(_param.type){
		case 0: // 待审核                                                                 /status/{status}/{currentPage}/{size}
			ajax({}, _callback, _callback2, 'get', 'sites.status', null, '/0/' + _param.pagenum + '/' + _param.pagesize);
			break;
		case 1: // 默认显示（全部钓场、正常、上架） /status/{status}/{currentPage}/{size}
			ajax({}, _callback, _callback2, 'get', 'sites.status', null, '/1/' + _param.pagenum + '/' + _param.pagesize);
			break;
		case 2: // 审核未通过                                                        /status/{status}/{currentPage}/{size}
			ajax({}, _callback, _callback2, 'get', 'sites.status', null, '/2/' + _param.pagenum + '/' + _param.pagesize);
			break;
		case 3: // 下架                                                                       /status/{status}/{currentPage}/{size}
			ajax({}, _callback, _callback2, 'get', 'sites.status', null, '/3/' + _param.pagenum + '/' + _param.pagesize);
			break;
		case 4: // 黑名单                                                                  /status/{status}/{currentPage}/{size}
			ajax({}, _callback, _callback2, 'get', 'sites.status', null, '/4/' + _param.pagenum + '/' + _param.pagesize);
			break;
		case 5: // 通过名称或是联络号钓场搜索                /like/{status}/{condition}/{start}/{size}
			ajax({}, _callback, _callback2, 'get', 'sites.like', null, '/' + _param.status + '/' + _param.keyword + '/' + _param.pagenum + '/' + _param.pagesize);
			break;
		case 6: // 通过区域查询钓场                                         /region/{category}{regionId}/{start}/{size}
			ajax({}, _callback, _callback2, 'get', 'sites.region', null, '/' + _param.category + '/' + _param.regionId + '/' + _param.pagenum + '/' + _param.pagesize);
			break;
		}
	};
	//设置钓场备注
	sites.remark = function (_paramPath, _callback, _callback2, _param) {
		ajax(JSON.stringify(_param), _callback, _callback2, 'put', 'sites.remark', null, _paramPath);
	};
	//指定塘主
	sites.authentication = function (_paramPath, _callback, _callback2, _param) {
		ajax(JSON.stringify(_param), _callback, _callback2, 'put', 'sites.authentication', null, _paramPath);
	};
	
	
	
	//设置标星钓场
	sites.site.flag = function (_paramPath, _callback, _callback2, _param) {
		ajax(JSON.stringify(_param), _callback, _callback2, 'put', 'sites.site.flag', null, _paramPath);
	};
	//设置钓场列表  0-待审核 , 1-正常(上架), 2-审核未通过 , 3-下架  ,4-黑名单
	sites.site.check = function (_paramPath, _callback, _callback2, _param) {
		ajax(JSON.stringify(_param), _callback, _callback2, 'put', 'sites.site.check', null, _paramPath);
	};
	//通过ID查询钓场
	sites.site.get = function (_paramPath, _callback, _callback2) {
		ajax({}, _callback, _callback2, 'get', 'sites.site.get', null, _paramPath);
	};
	//新建钓场
	sites.site.create = function (_paramPath, _callback, _callback2, _param) {
		ajax(JSON.stringify(_param), _callback, _callback2, 'post', 'sites.site.create', null, _paramPath);
	};
	//编辑钓场
	sites.site.modification = function (_paramPath, _callback, _callback2, _param) {
		ajax(JSON.stringify(_param), _callback, _callback2, 'put', 'sites.site.modification', null, _paramPath);
	};
	
	//通过钓场查询鱼塘列表
	sites.pond.list = function (_paramPath, _callback, _callback2) {
		ajax({}, _callback, _callback2, 'get', 'sites.pond.list', null, _paramPath);
	};
	//新建鱼塘
	sites.pond.create = function (_paramPath, _callback, _callback2, _param) {
		ajax(JSON.stringify(_param), _callback, _callback2, 'post', 'sites.pond.create', null, _paramPath);
	};
	//编辑鱼塘
	sites.pond.modification = function (_paramPath, _callback, _callback2, _param) {
		ajax(JSON.stringify(_param), _callback, _callback2, 'put', 'sites.pond.modification', null, _paramPath);
	};
	//删除鱼塘
	sites.pond.removel = function (_paramPath, _callback, _callback2) {
		ajax({}, _callback, _callback2, 'delete', 'sites.pond.removel', null, _paramPath);
	};
	
	//查询为合伙人指定钓场的钓场列表
	sites.list.partner = function (_paramPath, _callback, _callback2) {
		ajax({}, _callback, _callback2, 'get', 'sites.list.partnerIdIsNull', null, _paramPath);
	};
	/**==================================================
	 *                    数据字典
	 *==================================================*/
	//查询某类型数据
	dicts.get = function (_paramPath, _callback, _callback2) {
		ajax({}, _callback, _callback2, 'get', 'dicts', null, _paramPath);
	};

	/**==================================================
	 *                    区域
	 *==================================================*/
	
	//查询省、市、区三层数据
	region.list = function (_paramPath, _callback, _callback2) {
		ajax({}, _callback, _callback2, 'get', 'region.list', null, _paramPath);
	};
	//查询省、市两层及钓场数量
	region.menulist = function (_paramPath, _callback, _callback2) {
		ajax({}, _callback, _callback2, 'get', 'region.menulist', null, _paramPath);
	};

	/**==================================================
	 *                    存鱼
	 *==================================================*/
	/**
	 * 查询整合
	 */
	deposits.query = function (_param, _callback, _callback2) {
		switch(_param.type){
		case 1://查询某钓场的存鱼排行           /{siteId}
			ajax({}, _callback, _callback2, 'get', 'deposits.ranking', null, '/' + _param.fishSiteId + '/' + _param.startId + '/' + _param.pagesize);
			break;
		case 2://查询某钓场的存鱼流水            /records/{siteId}/{start}/{size}
			ajax({}, _callback, _callback2, 'get', 'deposits.records', null, '/' + _param.fishSiteId + '/' + _param.startId + '/' + _param.pagesize);
			break;
		case 3://查询某用户的存鱼情况           /{siteId}
			ajax({}, _callback, _callback2, 'get', 'deposits.list', null, '/' + _param.uid + '/' + _param.startId + '/' + _param.pagesize);
			break;
		case 4://查询某用户的存鱼流水            /records/{siteId}/{start}/{size}
			//ajax({}, _callback, _callback2, 'get', 'deposits.records', null, '/' + _param.fishSiteId + '/' + _param.startId + '/' + _param.pagesize);
			break;
		}
	};

	/**==================================================
	 *                    财务信息
	 *==================================================*/
	/**
	 * 整合查询财务信息
	 */
	account.query = function (_param, _callback, _callback2) {
		switch(_param.type){
		case 0://查询钓场财务首页信息                                                                                                                   /{start}/{size}
			ajax({}, _callback, _callback2, 'get', 'account.site.list', null, '/' + _param.pagenum + '/' + _param.pagesize);
			break;
		case 1://查询用户财务首页信息                                                                                                                  /{start}/{size}
			ajax({}, _callback, _callback2, 'get', 'account.user.list', null, '/' + _param.pagenum + '/' + _param.pagesize);
			break;	
		}
	};
	/**
	 * 整合查询财务信息->记录
	 * 0:查询钓场财务首页信息->交易记录
	 * 1:查询用户财务首页信息->漂币记录
	 */
	account.list = function (_param, _callback, _callback2) {
		switch(_param.type){
		case 0://                                                              /{siteId}/{start}/{size}
			ajax({}, _callback, _callback2, 'get', 'account.list.site', null, '/' + _param.siteId + '/' + _param.pagenum + '/' + _param.pagesize);
			break;
		case 1://                                                              /{uid}/{start}/{size}/{source}
			ajax({}, _callback, _callback2, 'get', 'account.user.list', null, '/' + _param.uid  + '/' + _param.pagenum + '/' + _param.pagesize + '/1/' + _param.qtype + '');
			break;	
		}
	};

	/**==================================================
	 *                    OSS STS TOKEN 获取
	 *==================================================*/
	token.oss_sts = function(_callback , _callback2){
		var params={
			'roleSessionName': 'CP_' + window.top.version
		}
		ajax(JSON.stringify(params), _callback, _callback2, 'post', 'token.oss_sts', null, null);
	};


	/**==================================================
	 *                    团队管理
	 *==================================================*/
	team.list = function(_paramPath, _callback, _callback2){
		ajax({}, _callback, _callback2, 'get', 'team.list', null, _paramPath);
	};
	team.userInfo =  function(_paramPath, _callback, _callback2){
		ajax({}, _callback, _callback2, 'get', 'team.userInfo', null, _paramPath);
	};
	team.permission = function(_paramPath, _callback, _callback2){
		ajax({}, _callback, _callback2, 'get', 'team.permission', null, _paramPath);
	};
	team.save = function( params , _callback , _callback2){
		ajax(params, _callback, _callback2, 'post', 'team.save', null, null);
	};
	team.status = function(_paramPath, _callback, _callback2){
		ajax({}, _callback, _callback2, 'post', 'team.status', null, _paramPath);
	};
	team.search = function(_paramPath, _callback, _callback2){
		ajax({}, _callback, _callback2, 'get', 'team.search', null, _paramPath);
	};
	team.add = function( params , _callback , _callback2){
		ajax(params, _callback, _callback2, 'post', 'team.add', null, null);
	};
	team.pwd = function( params , _callback){
		ajax( params, _callback , null , 'post', 'team.pwd', null, null );
	};

	/**==================================================
	 *                    员工
	 *==================================================*/
	//查询员工列表
	staff.list = function(_paramPath, _callback, _callback2){
		ajax({}, _callback, _callback2, 'get', 'staff.list', null, '/' + _paramPath.status + '/' + _paramPath.pagenum + "/" + _paramPath.pagesize);
	};
	//添加员工
	staff.add = function(_paramPath, _callback, _callback2, _param){
		ajax(JSON.stringify(_param), _callback, _callback2, 'post', 'staff.add', null, _paramPath);
	};
	//修改员工
	staff.update = function (_paramPath, _callback, _callback2, _param) {
		ajax(JSON.stringify(_param), _callback, _callback2, 'put', 'staff.update', null, _paramPath);
	};
	//删除员工
	staff.del = function (_paramPath, _callback, _callback2, _param) {
		ajax(JSON.stringify(_param), _callback, _callback2, 'post', 'staff.del', null, _paramPath);
	};
	
	/**==================================================
	 *                    终端
	 *==================================================*/
	//查询终端列表
	terminal.list = function(_paramPath, _callback, _callback2){
		ajax({}, _callback, _callback2, 'get', 'terminal.list', null, '/' + _paramPath.status + '/' + _paramPath.pagenum + "/" + _paramPath.pagesize);
	};
	//添加员工
	terminal.add = function(_paramPath, _callback, _callback2, _param){
		ajax(JSON.stringify(_param), _callback, _callback2, 'post', 'terminal.add', null, _paramPath);
	};
	//修改员工
	terminal.update = function (_paramPath, _callback, _callback2, _param) {
		ajax(JSON.stringify(_param), _callback, _callback2, 'put', 'terminal.update', null, _paramPath);
	};
	//删除员工
	terminal.del = function (_paramPath, _callback, _callback2, _param) {
		ajax(JSON.stringify(_param), _callback, _callback2, 'post', 'terminal.del', null, _paramPath);
	};
	
	/**==================================================
	 *                    字典
	 *==================================================*/
	dicts.query = function(_paramPath, _callback, _callback2){
		ajax({}, _callback, _callback2, 'get', 'dicts.query', null, _paramPath);
	};
	
	/**==================================================
	 *                    获取系统信息
	 *==================================================*/
	system.message =  function(_paramPath, _callback, _callback2){
		ajax({}, _callback, _callback2, 'get', 'system.message', null, _paramPath);
	};
	/*system.message0 = function(_paramPath, _callback, _callback2){
		ajax({}, _callback, _callback2, 'get', 'system.message0', null, _paramPath);
	};*/

	/*****************处理AJAX请求***********************/
	var ajax = function (_param, _callback, _callback2, _type, _url, _dataType, _paramPath) {
		_E.window.progress();
		if(typeof _param === 'function') {
			_callback2 = _callback;
			_callback = _param;
			_param = '';
		}
		
		if(typeof _dataType == 'undefined' || _dataType == null) {
			_dataType = 'json';
		}
		
		if(typeof _paramPath == 'undefined' || _paramPath == null){
			_url = AJAX_URL[_url];
		}else{
			_url = AJAX_URL[_url] + _paramPath;
		}
		var _processData = true;
		var _contentType = "application/x-www-form-urlencoded";
		if(_type.toUpperCase() == "PUT" && _type.toUpperCase() == "POST"){
			_processData = false;
			_contentType = "application/json; charset=UTF-8";
		}
		
		var dueError = function(dt, ul){
			//encodeURIComponent(_url)
			var LAST_DATA = getCookie("LAST_DATA");
			if(LAST_DATA == ""){
				LAST_DATA = "[]";
			}
			var cookieErrorDatas = JSON.parse(LAST_DATA);
			if(dt == undefined || dt == null){
				dt={};
			}
			dt.url = ul;
			dt.time = Math.round(new Date());
			cookieErrorDatas.push(dt);
			setCookie("LAST_DATA", JSON.stringify(cookieErrorDatas));
			window.top.location.href="/";
		}
		
		/**
		 * 图片路径拦截器过滤
		 */
		var imageInterceptor = function (d, u){
			if(d.body == undefined) return;
			var interceptorScope = [
			    "/team/findList", 
			    "/team/userInfo", 
			    "/team/search",
			    "/account/list/site", 
			    "/account/list", 
			    "/sites/status",
			    "/sites/like",
			    "/sites/list/partnerIdIsNull",
			    "/partner/fishsite",
			    "/users", 
			    "/deposits"
			];
			var interceptor = "";
			for(var i=0; i<interceptorScope.length; i++){
				if(u.indexOf(interceptorScope[i]) != -1){
					interceptor = interceptorScope[i];
					break;
				}
			}
			var convert2RightImg = function(item, header, defaultImg){
				if(item == undefined || item.length == 0){
					item = defaultImg;
				}else{
					item = header + item;
				}
				return item;
			};
			if(interceptor.length > 0){
				console.info("In imageInterceptor flow-[%s]!", interceptor);
				var data = d.body;
				if(data.length == undefined){
					data = d.body.data;
					if(data == undefined){
						data = d.body;
					}
				}
				if(data.length == undefined){
					//data.portriat = convert2RightImg(data.portriat, RES_PORT_URL, "../../images/main_images/u192_mouseOver.png");
				}else{
					for(var i=0; i<data.length; i++){
						//data[i].portriat = convert2RightImg(data[i].portriat, RES_PORT_URL, "../../images/main_images/u192_mouseOver.png");
						data[i].mainImg = convert2RightImg(data[i].mainImg, RES_PROC_URL, "../../images/frame_images/p65.png");
					}
				}
			}
		}
		
		$.ajax({
			type 	: _type,
			url  	: _url,
			data 	: _param,
			dataType: _dataType,
			processData: _processData,
			contentType: _contentType,
			success	: function(data,status,xhr) {
				if(data != null){
					if(typeof data == "string"){
						var tmp = JSON.parse(data);
						if(typeof tmp == "object"){
							data = tmp;
						}
					}
					_E.window.progress('close');
					if((typeof data.status == 'undefined') || data.status == 0) { //表示成功
						imageInterceptor(data, _url);
						_callback(data,status,xhr);
					} else {
						_E.window.show(data);
						if((typeof data.status == 'undefined') || (typeof data.errMsg == 'undefined')){
							dueError(data, _url);
						}
						if(typeof _callback2 === 'function') {
							_callback2(data,status,xhr);
						}
					}
				}else{
					_E.window.progress('close');
					_E.window.show(data);
					dueError(data, _url);
				}
			},
			error	: function (XMLHttpRequest, textStatus, errorThrown) {
				_E.window.progress('close');
				if(textStatus == "parsererror" && XMLHttpRequest.responseText.indexOf("login.js")!= -1) {
					dueError(null, _url);
				} else {
					_E.window.show('数据加载失败: ' + textStatus);
				}
			}
		});
		
		//ajax结束
	};

	/*****************同步处理AJAX请求***********************/
	var ajaxAsync = function (_param, _callback, _callback2, _type, _url, _dataType) {
		_E.window.progress();
		if(typeof _param === 'function') {
			_callback2 = _callback;
			_callback = _param;
			_param = '';
		}
		if(typeof _dataType === 'undefined') {
			_dataType = 'json';
		}
		
		$.ajax({
			type 	: _type,
			url  	: AJAX_URL[_url],
			data 	: _param,
			async   : false,
			dataType: _dataType,
			success	: function(data,status,xhr) {
				_E.window.progress('close');
				if((typeof data._code === 'undefined') || data._code == 0) {
					_callback(data,status,xhr);
				}
				else {
					_E.window.show(data);
					if(typeof _callback2 === 'function') {
						_callback2(data,status,xhr);
					} 
				}
			},
			error	: function (XMLHttpRequest, textStatus, errorThrown) {
				_E.window.progress('close');
				if(XMLHttpRequest.status == 404) {
					location.href = '/console/404.html';
				} else {
					_E.window.show('数据加载失败: ' + textStatus);
				}
			}
		});
	};

	/***************AJAX图片上传*******************/
	var imgUpload = function (_callback, e) {
		lrz(e.files[0], function (results) {
            setTimeout(function () {
            	$.ajax({
					'type'		: 'post',
					'url'		: '/fodder/upPcPicture',
					'data'		: {'picture': results.base64.split(',')[1]},
					'datatype'	: 'json',
					'async'		: true,
					'success'	: function(d) {		
						_callback(d);
					}
				});
            }, 100);
        });
	};
		
	var imgUploads = function (_callback, e) {
		lrz(e.files[0], function (results) {
            setTimeout(function () {
            	$.ajax({
					'type'		: 'post',
					'url'		: '/fodder/upPcPicture',
					'data'		: {'picture': results.base64.split(',')[1]},
					'datatype'	: 'json',
					'async'		: true,
					'success'	: function(d) {		
						_callback(d);
					}
				});
            }, 100);
        });
	};
		
	var imgUploades = function (_callback, e,_width,_height) {
		lrz(e.files[0], {width:_width,height:_height,quality:0.7}, function (results) {
            setTimeout(function () {
            	$.ajax({
					'type'		: 'post',
					'url'		: '/fodder/upPcPicture',
					'data'		: {'picture': results.base64.split(',')[1]},
					'datatype'	: 'json',
					'async'		: true,
					'success'	: function(d) {		
						_callback(d);
					}
				});
            }, 100);
        });
	};
	
	return {
		users   : users,
		sites   : sites,
		dicts   : dicts,
		region  : region,
		deposits: deposits,
		account : account,
		token   : token,
		team	: team,
		system  : system,
		staff   : staff,
		terminal: terminal,
		aparam  : aparam
	};
}());

/**
 * _E消息提示窗口*/
var _E = (function () {
	var window = {};
	
	/*底部弹出,常用*/
	window.show = function (_msg) {
		if(typeof _msg == 'object') {
			_msg = _E_EOOROR.MSG(_msg);
		}
		_msg = "<font color='#32A4E6'>" + _msg + "</font>";
		$.messager.show({
			title   : '提示',
			msg	    : _msg,
			timeout : 2000,
			showType: 'slide',
			style:{
				right:'',
				bottom:''
			}
		});
		var showObj = $("body > div.panel.window > div.messager-body.panel-body.panel-body-noborder.window-body");
		//showObj.css("height", "100px");
	};
	
	/*正常提示*/
	window.alert = function (_msg, _callback) {
		if(typeof _msg === 'object') {
			_msg = _E_EOOROR.MSG(_msg);
		}
		$.messager.alert('提示信息', _msg, 'info', _callback);
	};
	
	/*错误提示*/
	window.error = function (_msg, _callback) {
		if(typeof _msg === 'object') {
			_msg = _E_EOOROR.MSG(_msg);
		}
		_msg = "<font color='red'>" + _msg + "</font>";
		$.messager.alert('错误信息', _msg, 'error', _callback);
	};
	
	/*加载*/
	window.progress = function(_msg, showMsg) {
		if(typeof _msg == 'undefined' || _msg == null) {
			if(typeof showMsg != 'undefined'){
				$.messager.progress({title:'请稍后', msg:showMsg});
			}else{
				$.messager.progress({title:'请稍后', msg:'亲，正在努力执行中...'});
			}
		} else {
			$.messager.progress(_msg);
		}
	};
	
	/*确认窗口*/
	window.confirm = function (_msg, _func, _func1) {
		_msg = "<font color='#919100'>" + _msg + "</font>";
		$.messager.confirm("提示", _msg, function(r) {
			if(r) {
				_func();
			} else {
				if(typeof _func1 === 'function') {
					_func1();
				}
			}
		});
	};
	
	return {
		window : window
	};
}());

/**************_E错误提示信息*****************/
var _E_EOOROR = (function() {
	var MSG;
	
	MSG = function (data) {
		if(data == null || data.status === undefined) {
			return '服务器没有返回状态值，请与管理员联系!';
		}
		var _msg = '';
		switch (data.status) {
		case 2002 :
			_msg = "此用户已设置为塘主，请重新选择！";
			break;
		case 2005 :
			_msg = "此钓场已设置塘主，不可重复设置！";
			break;
		case 4000 :
			_msg = "服务器ERROR!";
			break;
		case 4001 :
			_msg = "字段值为空或值错误";
			break;
		default  :
			_msg = data.errMsg;
			break;
		}
		
		return _msg;
	};
	
	return {
		MSG : MSG
	};
}());
