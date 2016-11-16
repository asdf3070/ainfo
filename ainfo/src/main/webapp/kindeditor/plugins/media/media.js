/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('media', function(K) {
	var self = this, name = 'media', lang = self.lang(name + '.'),
		allowMediaUpload = K.undef(self.allowMediaUpload, true),
		allowFileManager = K.undef(self.allowFileManager, false),
		formatUploadUrl = K.undef(self.formatUploadUrl, true),
		extraParams = K.undef(self.extraFileUploadParams, {}),
		filePostName = K.undef(self.filePostName, 'imgFile'),
		uploadJson = K.undef(self.uploadJson, self.basePath + 'php/upload_json.php');
		self.plugin.media = {
			edit : function() {
				/*
					备份 2014-1-8 刘勇
					1	var html = [
					2		'<div style="padding:20px;">',
					3		//url
					4		'<div class="ke-dialog-row">',
					5		'<label for="keUrl" style="width:60px;">' + lang.url + '</label>',
					6		'<input class="ke-input-text" type="text" id="keUrl" name="url" value="" style="width:330px;" /> &nbsp;',
					7		'<input type="button" class="ke-upload-button" value="' + lang.upload + '" /> &nbsp;',
					8		'<span class="ke-button-common ke-button-outer">',
					9		'<input type="button" class="ke-button-common ke-button" name="viewServer" value="' + lang.viewServer + '" />',
					10		'</span>',
					11		'</div>',
					12		//width
					13		'<div class="ke-dialog-row">',
					14		'<label for="keWidth" style="width:60px;display:none">' + lang.width + '</label>',
					15		'<input type="text" id="keWidth" style="display:none" class="ke-input-text ke-input-number" name="width" value="320" maxlength="4" />',
					16		'</div>',
					17		//height
					18		'<div class="ke-dialog-row">',
					19		'<label for="keHeight" style="width:60px;display:none">' + lang.height + '</label>',
					20		'<input type="text" id="keHeight" style="display:none" class="ke-input-text ke-input-number" name="height" value="300" maxlength="4" />',
					21		'</div>',
					22		//autostart
					23		'<div class="ke-dialog-row">',
					24		'<label for="keAutostart" style="display:none">' + lang.autostart + '</label>',
					25		'<input type="checkbox" id="keAutostart" name="autostart" value="" style="display:none" /> ',
					26		'</div>',
					27		'</div>'
					28	].join('');
				*/
				/*
					备份 2015-09-13 耿金鹏
					// 禁用上传按钮。刘勇修改于2014-1-8
					// 删除了line 7、9
					1	var html = [
					2		'<div style="padding:20px;">',
					3		//url
					4		'<div class="ke-dialog-row">',
					5		'<label for="keUrl" style="width:60px;">' + lang.url + '</label>',
					6		'<input class="ke-input-text" type="text" id="keUrl" name="url" value="" style="width:330px;" /> &nbsp;',
					7		'<span class="ke-button-common ke-button-outer">',
					8		'</span>',
					9		'</div>',
					10		//width
					11		'<div class="ke-dialog-row">',
					12		'<label for="keWidth" style="width:60px;display:none">' + lang.width + '</label>',
					13		'<input type="text" id="keWidth" style="display:none" class="ke-input-text ke-input-number" name="width" value="320" maxlength="4" />',
					14		'</div>',
					15		//height
					16		'<div class="ke-dialog-row">',
					17		'<label for="keHeight" style="width:60px;display:none">' + lang.height + '</label>',
					18		'<input type="text" id="keHeight" style="display:none" class="ke-input-text ke-input-number" name="height" value="300" maxlength="4" />',
					19		'</div>',
					20		//autostart
					21		'<div class="ke-dialog-row">',
					22		'<label for="keAutostart" style="display:none">' + lang.autostart + '</label>',
					23		'<input type="checkbox" id="keAutostart" name="autostart" value="" style="display:none" /> ',
					24		'</div>',
					25		'</div>'
					26	].join('');
				*/
				
				var chooseType = function(o){
					console.info(JSON.stringify(o));	
				}
				
				var html = [
					'<div style="padding:20px;">',
						//输入视音频链接
						'<div class="ke-dialog-row">',
							'<label for="keUrl" style="width:60px;">' + lang.url + '</label>',
							'<input class="ke-input-text" type="text" id="keUrl" name="url" value="" style="width:330px;" onblur="getDuration()"/> &nbsp;',
							'<span class="ke-button-common ke-button-outer">',
							'</span>',
						'</div>',
						//输入视频图片
						'<div class="ke-dialog-row">',
							'<label for="keIMg" style="width:60px;">' + lang.img + '</label>',
							'<input class="ke-input-text" type="text" id="keIMg" name="keIMg" value="" placeholder="仅适用于视频时！" style="width:330px;" /> &nbsp;',
							'<span class="ke-button-common ke-button-outer">',
							'</span>',
						'</div>',
						//输入音频名称
						'<div class="ke-dialog-row">',
							'<label for="keName" style="width:60px;">' + lang.name + '</label>',
							'<input class="ke-input-text" type="text" id="keName" name="keName" value="" placeholder="仅适用于音频时！" style="width:330px;" /> &nbsp;',
							'<span class="ke-button-common ke-button-outer">',
							'</span>',
						'</div>',
						//autostart
						'<div class="ke-dialog-row">',
							'<label for="keAutostart" style="display:none">' + lang.autostart + '</label>',
							'<input type="checkbox" id="keAutostart" name="autostart" value="" style="display:none" /> ',
						'</div>',
					'</div>'
				].join('');
				var dialog = self.createDialog({
					name : name,
					width : 450,
					height : 200,
					title : self.lang(name),
					body : html,
					yesBtn : {
						name : self.lang('yes'),
						click : function(e) {
							var url = K.trim(urlBox.val()),
								width = widthBox.val(),
								height = heightBox.val();
							if (url == 'http://' || K.invalidUrl(url)) {
								alert(self.lang('invalidUrl'));
								urlBox[0].focus();
								return;
							}
							if (!/^\d*$/.test(width)) {
								alert(self.lang('invalidWidth'));
								widthBox[0].focus();
								return;
							}
							if (!/^\d*$/.test(height)) {
								alert(self.lang('invalidHeight'));
								heightBox[0].focus();
								return;
							}
							var html = K.mediaImg(self.themesPath + 'common/blank.gif', {
									src : url,
									aName: K.trim(nameBox.val()),
									vImg: K.trim(imgBox.val()),
									type : K.mediaType(url),
									width : width,
									height : height,
									autostart : autostartBox[0].checked ? 'true' : 'false',
									loop : 'true'
								});
							self.insertHtml(html).hideDialog().focus();
						}
					}
				}),
				div = dialog.div,
				urlBox = K('[name="url"]', div),
				viewServerBtn = K('[name="viewServer"]', div),
				widthBox = K('[name="width"]', div),
				heightBox = K('[name="height"]', div),
				autostartBox = K('[name="autostart"]', div);
				nameBox = K('[name="keName"]', div);
				imgBox = K('[name="keIMg"]', div);
				//刘勇修改于2014-03-14
				urlBox.val('http://player.youku.com/embed/').focus(function(){
					//EIMP.window.show('视频文件只支持优酷视频，请直接输入优酷视频ID');
					EIMP.window.show('音频需要输入显示名称，视频需要输入图片路径！');
				});
				
	
				if (allowMediaUpload) {
					var uploadbutton = K.uploadbutton({
						button : K('.ke-upload-button', div)[0],
						fieldName : filePostName,
						extraParams : extraParams,
						url : K.addParam(uploadJson, 'dir=media'),
						afterUpload : function(data) {
							dialog.hideLoading();
							if (data.error === 0) {
								var url = data.url;
								if (formatUploadUrl) {
									url = K.formatUrl(url, 'absolute');
								}
								urlBox.val(url);
								if (self.afterUpload) {
									self.afterUpload.call(self, url, data, name);
								}
								alert(self.lang('uploadSuccess'));
							} else {
								alert(data.message);
							}
						},
						afterError : function(html) {
							dialog.hideLoading();
							self.errorDialog(html);
						}
					});
					uploadbutton.fileBox.change(function(e) {
						dialog.showLoading(self.lang('uploadLoading'));
						uploadbutton.submit();
					});
				} else {
					K('.ke-upload-button', div).hide();
				}
	
				if (allowFileManager) {
					viewServerBtn.click(function(e) {
						self.loadPlugin('filemanager', function() {
							self.plugin.filemanagerDialog({
								viewType : 'LIST',
								dirName : 'media',
								clickFn : function(url, title) {
									if (self.dialogs.length > 1) {
										K('[name="url"]', div).val(url);
										if (self.afterSelectFile) {
											self.afterSelectFile.call(self, url);
										}
										self.hideDialog();
									}
								}
							});
						});
					});
				} else {
					viewServerBtn.hide();
				}
	
				var img = self.plugin.getSelectedMedia();
				if (img) {
					var attrs = K.mediaAttrs(img.attr('data-ke-tag'));
					urlBox.val(attrs.src);
					widthBox.val(K.removeUnit(img.css('width')) || attrs.width || 0);
					heightBox.val(K.removeUnit(img.css('height')) || attrs.height || 0);
					autostartBox[0].checked = (attrs.autostart === 'true');
				}
				urlBox[0].focus();
				urlBox[0].select();
			},
			'delete' : function() {
				self.plugin.getSelectedMedia().remove();
				// [IE] 删除图片后立即点击图片按钮出错
				self.addBookmark();
			}
		};
	self.clickToolbar(name, self.plugin.media.edit);
});
