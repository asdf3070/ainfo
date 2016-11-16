'use strict';

var appServer = "http://" + location.host + '/page/test/oss-in-browser-master/sts.json';
var bucket = 'user-portrait'; //'fs-profile'、'fs-dynamic'、'user-portrait'、'hp-oss-log'、'app-discovery'
var region = 'oss-cn-hangzhou';

var urllib = OSS.urllib;
var Buffer = OSS.Buffer;
var OSS = OSS.Wrapper;
var STS = OSS.STS;

document.getElementById("bucketId").innerText = bucket

// Play without STS. NOT SAFE! Because access key id/secret are
// exposed in web page.

// var client = new OSS({
//   region: 'oss-cn-hangzhou',
//   accessKeyId: '<access-key-id>',
//   accessKeySecret: '<access-key-secret>',
//   bucket: '<bucket-name>'
// });
//
// var applyTokenDo = function (func) {
//   return func(client);
// };
var currClient;
var applyTokenDo = function(func) {
		var url = appServer;
		return urllib.request(url, {
			method: 'GET'
		}).then(function(result) {
			var creds = JSON.parse(result.data).body;
			console.info("有效期至：" + transtateTimestamp(creds.expiration));
			var client = new OSS({
				region: region,
				accessKeyId: creds.accessKeyId,
				accessKeySecret: creds.accessKeySecret,
				stsToken: creds.securityToken,
				bucket: bucket
			});
			currClient = client;
			return func(client);
		});
	};

var progress = function(p) {
		return function(done) {
			var bar = document.getElementById('progress-bar');
			bar.style.width = Math.floor(p * 100) + '%';
			bar.innerHTML = Math.floor(p * 100) + '%';
			done();
		}
	};

var uploadFile = function(client) {
		var file = document.getElementById('file').files[0];
		var key = document.getElementById('object-key-file').value.trim() || 'object';
		console.log(file.name + ' => ' + key);

		return client.multipartUpload(key, file, {
			progress: progress
		}).then(function(res) {
			console.log('upload success: %j', res);
			return listFiles(client);
		}).catch(function(err){
			console.info("err:", err);
		});
	};

var uploadContent = function(client) {
		var content = document.getElementById('file-content').value.trim();
		var key = document.getElementById('object-key-content').value.trim() || 'object';
		console.log('content => ' + key);

		return client.put(key, new Buffer(content)).then(function(res) {
			return listFiles(client);
		});
	};

var listFiles = function(client) {
		var table = document.getElementById('list-files-table');
		console.log('list files');

		return client.list({
			'max-keys': 100
		}).then(function(result) {
			table.innerHTML="";
			if(typeof result.objects == 'undefined'){
				return;
			}
			var objects = result.objects.sort(function(a, b) {
				var ta = new Date(a.lastModified);
				var tb = new Date(b.lastModified);
				if (ta > tb) return -1;
				if (ta < tb) return 1;
				return 0;
			});
			var minCount = Math.min(3, objects.length);
			for (var i = 0; i < objects.length; i++) {
				var row = table.insertRow(table.rows.length);
				row.insertCell(0).innerHTML = objects[i].name;
				row.cells.item(0).setAttribute("style", "width:70%; font-family: Courier New;");
				
				row.insertCell(1).innerHTML = objects[i].size;
				row.cells.item(1).setAttribute("style", "width:10%");
				
				row.insertCell(2).innerHTML = transtateTimestamp(objects[i].lastModified);
				row.cells.item(2).setAttribute("style", "width:15%; font-size: 10px;");
				
				row.insertCell(3).innerHTML = '<img src="../../../images/site_images/u1424.png" onclick="delFile(\'' + objects[i].name + '\')"/>';
				row.cells.item(3).setAttribute("style", "width:5%");
			}
		});
	};

var delFile = function(keyName){
	return currClient.delete(keyName).then(function(result){
		console.info(JSON.stringify(result));
		applyTokenDo(listFiles);
	});
}

var downloadFile = function(client) {
		var object = document.getElementById('dl-object-key').value.trim();
		var filename = document.getElementById('dl-file-name').value.trim();
		console.log(object + ' => ' + filename);

		var result = client.signatureUrl(object, {
			response: {
				'content-disposition': 'attachment; filename="' + filename + '"'
			}
		});
		window.location = result;

		return result;
	};

function transtateTimestamp(timestamp) {
	if (typeof timestamp == "number") {
		timestamp = timestamp + "";
	}
	timestamp = timestamp.replace(/^\s+|\s+$/, '');
	if (/^\d{10}$/.test(timestamp)) {
		timestamp *= 1000;
	}
	
	var time = new Date(timestamp);
	var year = time.getFullYear();
	var month = (time.getMonth() + 1) > 9 && (time.getMonth() + 1) || ('0' + (time.getMonth() + 1))
	var date = time.getDate() > 9 && time.getDate() || ('0' + time.getDate())
	var hour = time.getHours() > 9 && time.getHours() || ('0' + time.getHours())
	var minute = time.getMinutes() > 9 && time.getMinutes() || ('0' + time.getMinutes())
	var second = time.getSeconds() > 9 && time.getSeconds() || ('0' + time.getSeconds())
	var YmdHis = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
	return YmdHis;
}

window.onload = function() {
	document.getElementById('file-button').onclick = function() {
		applyTokenDo(uploadFile);
	}

	document.getElementById('content-button').onclick = function() {
		applyTokenDo(uploadContent);
	}

	document.getElementById('list-files-button').onclick = function() {
		applyTokenDo(listFiles);
	}

	document.getElementById('dl-button').onclick = function() {
		applyTokenDo(downloadFile);
	}

	applyTokenDo(listFiles);
};