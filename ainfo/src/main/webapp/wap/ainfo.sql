/*
Navicat SQL Server Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 90000
Source Host           : 127.0.0.1:1433
Source Database       : ainfo
Source Schema         : dbo

Target Server Type    : SQL Server
Target Server Version : 90000
File Encoding         : 65001

Date: 2016-09-25 17:33:22
*/


-- ----------------------------
-- Table structure for sysdiagrams
-- ----------------------------
DROP TABLE [dbo].[sysdiagrams]
GO
CREATE TABLE [dbo].[sysdiagrams] (
[name] sysname NOT NULL ,
[principal_id] int NOT NULL ,
[diagram_id] int NOT NULL IDENTITY(1,1) ,
[version] int NULL ,
[definition] varbinary(MAX) NULL 
)


GO

-- ----------------------------
-- Records of sysdiagrams
-- ----------------------------
SET IDENTITY_INSERT [dbo].[sysdiagrams] ON
GO
SET IDENTITY_INSERT [dbo].[sysdiagrams] OFF
GO

-- ----------------------------
-- Table structure for t_api_task_schedule_job
-- ----------------------------
DROP TABLE [dbo].[t_api_task_schedule_job]
GO
CREATE TABLE [dbo].[t_api_task_schedule_job] (
[job_id] bigint NOT NULL ,
[create_time] datetime NULL ,
[update_time] datetime NULL ,
[job_name] nvarchar(255) NULL ,
[job_group] nvarchar(255) NULL ,
[job_status] nvarchar(255) NULL ,
[cron_expression] nvarchar(255) NOT NULL ,
[description] nvarchar(255) NULL ,
[bean_class] nvarchar(255) NULL ,
[is_concurrent] nvarchar(255) NULL ,
[spring_id] nvarchar(255) NULL ,
[method_name] nvarchar(255) NOT NULL 
)


GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_api_task_schedule_job', 
'COLUMN', N'is_concurrent')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'1'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_api_task_schedule_job'
, @level2type = 'COLUMN', @level2name = N'is_concurrent'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'1'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_api_task_schedule_job'
, @level2type = 'COLUMN', @level2name = N'is_concurrent'
GO

-- ----------------------------
-- Records of t_api_task_schedule_job
-- ----------------------------
INSERT INTO [dbo].[t_api_task_schedule_job] ([job_id], [create_time], [update_time], [job_name], [job_group], [job_status], [cron_expression], [description], [bean_class], [is_concurrent], [spring_id], [method_name]) VALUES (N'13', N'2016-08-02 20:03:11.000', N'2016-08-15 10:04:53.000', N'超时订单job', N'order', N'0', N'0 0 0/1 * * ? ', N'清理超过２４小时未支付', N'', N'1', N'orderJob', N'outTimeOrder')
GO
GO
INSERT INTO [dbo].[t_api_task_schedule_job] ([job_id], [create_time], [update_time], [job_name], [job_group], [job_status], [cron_expression], [description], [bean_class], [is_concurrent], [spring_id], [method_name]) VALUES (N'14', N'2016-08-03 20:01:32.000', N'2016-08-15 10:06:58.000', N'商品统计job', N'goods', N'0', N'0 0 0 1/1 * ? ', N'商品销量统计', N'', N'1', N'goodsJob', N'salesVolume')
GO
GO

-- ----------------------------
-- Table structure for t_cp_group
-- ----------------------------
DROP TABLE [dbo].[t_cp_group]
GO
CREATE TABLE [dbo].[t_cp_group] (
[f_id] int NOT NULL ,
[f_name] nvarchar(50) NULL ,
[f_create_time] datetime NULL ,
[f_create_user] nvarchar(255) NULL ,
[f_update_time] datetime NULL ,
[f_update_user] nvarchar(255) NULL ,
[f_status] nchar(1) NULL 
)


GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_group', 
NULL, NULL)) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'群组表'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_group'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'群组表'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_group'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_group', 
'COLUMN', N'f_id')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'主键'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_group'
, @level2type = 'COLUMN', @level2name = N'f_id'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'主键'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_group'
, @level2type = 'COLUMN', @level2name = N'f_id'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_group', 
'COLUMN', N'f_name')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'群组名称'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_group'
, @level2type = 'COLUMN', @level2name = N'f_name'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'群组名称'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_group'
, @level2type = 'COLUMN', @level2name = N'f_name'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_group', 
'COLUMN', N'f_create_time')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'群组创建时间'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_group'
, @level2type = 'COLUMN', @level2name = N'f_create_time'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'群组创建时间'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_group'
, @level2type = 'COLUMN', @level2name = N'f_create_time'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_group', 
'COLUMN', N'f_create_user')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'创建用户:用户id'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_group'
, @level2type = 'COLUMN', @level2name = N'f_create_user'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'创建用户:用户id'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_group'
, @level2type = 'COLUMN', @level2name = N'f_create_user'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_group', 
'COLUMN', N'f_update_time')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'群组状态更新时间-包括群组名称更改,群组状态修改等'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_group'
, @level2type = 'COLUMN', @level2name = N'f_update_time'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'群组状态更新时间-包括群组名称更改,群组状态修改等'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_group'
, @level2type = 'COLUMN', @level2name = N'f_update_time'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_group', 
'COLUMN', N'f_update_user')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'修改用户'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_group'
, @level2type = 'COLUMN', @level2name = N'f_update_user'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'修改用户'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_group'
, @level2type = 'COLUMN', @level2name = N'f_update_user'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_group', 
'COLUMN', N'f_status')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'群组状态 : 1正常  0不正常'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_group'
, @level2type = 'COLUMN', @level2name = N'f_status'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'群组状态 : 1正常  0不正常'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_group'
, @level2type = 'COLUMN', @level2name = N'f_status'
GO

-- ----------------------------
-- Records of t_cp_group
-- ----------------------------
INSERT INTO [dbo].[t_cp_group] ([f_id], [f_name], [f_create_time], [f_create_user], [f_update_time], [f_update_user], [f_status]) VALUES (N'1', N'黑漂市场部', null, N'admin', null, null, N'1')
GO
GO
INSERT INTO [dbo].[t_cp_group] ([f_id], [f_name], [f_create_time], [f_create_user], [f_update_time], [f_update_user], [f_status]) VALUES (N'2', N'黑漂运营部', null, N'admin', null, null, N'1')
GO
GO
INSERT INTO [dbo].[t_cp_group] ([f_id], [f_name], [f_create_time], [f_create_user], [f_update_time], [f_update_user], [f_status]) VALUES (N'3', N'黑漂研发部', null, N'admin', null, null, N'1')
GO
GO

-- ----------------------------
-- Table structure for t_cp_group_user_relevance
-- ----------------------------
DROP TABLE [dbo].[t_cp_group_user_relevance]
GO
CREATE TABLE [dbo].[t_cp_group_user_relevance] (
[f_userid] int NOT NULL ,
[f_groupid] int NOT NULL 
)


GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_group_user_relevance', 
NULL, NULL)) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'用户群组映射表'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_group_user_relevance'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'用户群组映射表'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_group_user_relevance'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_group_user_relevance', 
'COLUMN', N'f_userid')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'用户id'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_group_user_relevance'
, @level2type = 'COLUMN', @level2name = N'f_userid'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'用户id'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_group_user_relevance'
, @level2type = 'COLUMN', @level2name = N'f_userid'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_group_user_relevance', 
'COLUMN', N'f_groupid')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'群组id'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_group_user_relevance'
, @level2type = 'COLUMN', @level2name = N'f_groupid'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'群组id'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_group_user_relevance'
, @level2type = 'COLUMN', @level2name = N'f_groupid'
GO

-- ----------------------------
-- Records of t_cp_group_user_relevance
-- ----------------------------
INSERT INTO [dbo].[t_cp_group_user_relevance] ([f_userid], [f_groupid]) VALUES (N'19950421', N'1')
GO
GO
INSERT INTO [dbo].[t_cp_group_user_relevance] ([f_userid], [f_groupid]) VALUES (N'19950421', N'3')
GO
GO
INSERT INTO [dbo].[t_cp_group_user_relevance] ([f_userid], [f_groupid]) VALUES (N'20160622', N'1')
GO
GO
INSERT INTO [dbo].[t_cp_group_user_relevance] ([f_userid], [f_groupid]) VALUES (N'20160622', N'2')
GO
GO
INSERT INTO [dbo].[t_cp_group_user_relevance] ([f_userid], [f_groupid]) VALUES (N'20160622', N'3')
GO
GO

-- ----------------------------
-- Table structure for t_cp_model
-- ----------------------------
DROP TABLE [dbo].[t_cp_model]
GO
CREATE TABLE [dbo].[t_cp_model] (
[f_id] int NOT NULL ,
[f_p_id] int NULL ,
[f_code] nvarchar(50) NULL ,
[f_name] nvarchar(50) NULL ,
[f_url] nvarchar(500) NULL 
)


GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_model', 
NULL, NULL)) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'权限模块表'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_model'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'权限模块表'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_model'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_model', 
'COLUMN', N'f_id')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'模块主键 '
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_model'
, @level2type = 'COLUMN', @level2name = N'f_id'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'模块主键 '
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_model'
, @level2type = 'COLUMN', @level2name = N'f_id'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_model', 
'COLUMN', N'f_p_id')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'上级模块主键 '
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_model'
, @level2type = 'COLUMN', @level2name = N'f_p_id'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'上级模块主键 '
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_model'
, @level2type = 'COLUMN', @level2name = N'f_p_id'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_model', 
'COLUMN', N'f_code')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'模块编码 '
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_model'
, @level2type = 'COLUMN', @level2name = N'f_code'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'模块编码 '
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_model'
, @level2type = 'COLUMN', @level2name = N'f_code'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_model', 
'COLUMN', N'f_name')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'模块名称 '
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_model'
, @level2type = 'COLUMN', @level2name = N'f_name'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'模块名称 '
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_model'
, @level2type = 'COLUMN', @level2name = N'f_name'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_model', 
'COLUMN', N'f_url')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'模块路径 '
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_model'
, @level2type = 'COLUMN', @level2name = N'f_url'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'模块路径 '
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_model'
, @level2type = 'COLUMN', @level2name = N'f_url'
GO

-- ----------------------------
-- Records of t_cp_model
-- ----------------------------
INSERT INTO [dbo].[t_cp_model] ([f_id], [f_p_id], [f_code], [f_name], [f_url]) VALUES (N'1', N'0', N'board', N'数据看版', N'/page/board/index.html')
GO
GO
INSERT INTO [dbo].[t_cp_model] ([f_id], [f_p_id], [f_code], [f_name], [f_url]) VALUES (N'2', N'0', N'trem', N'团队管理', N'/page/team/index.html')
GO
GO
INSERT INTO [dbo].[t_cp_model] ([f_id], [f_p_id], [f_code], [f_name], [f_url]) VALUES (N'3', N'0', N'users', N'会员管理', N'/page/users/index.html')
GO
GO
INSERT INTO [dbo].[t_cp_model] ([f_id], [f_p_id], [f_code], [f_name], [f_url]) VALUES (N'4', N'0', N'users/partner', N'合伙人库', N'/page/partner/index.html')
GO
GO
INSERT INTO [dbo].[t_cp_model] ([f_id], [f_p_id], [f_code], [f_name], [f_url]) VALUES (N'5', N'0', N'sites', N'钓场管理', N'/page/site/index.html')
GO
GO
INSERT INTO [dbo].[t_cp_model] ([f_id], [f_p_id], [f_code], [f_name], [f_url]) VALUES (N'6', N'0', N'system', N'系统设置', N'/page/system/index.html')
GO
GO
INSERT INTO [dbo].[t_cp_model] ([f_id], [f_p_id], [f_code], [f_name], [f_url]) VALUES (N'7', N'0', N'account', N'财务管理', N'/page/finance/index.html')
GO
GO
INSERT INTO [dbo].[t_cp_model] ([f_id], [f_p_id], [f_code], [f_name], [f_url]) VALUES (N'8', N'0', N'content', N'内容管理', N'/page/content/index.html')
GO
GO
INSERT INTO [dbo].[t_cp_model] ([f_id], [f_p_id], [f_code], [f_name], [f_url]) VALUES (N'9', N'0', N'sell', N'营销管理', N'/page/sell/index.html')
GO
GO
INSERT INTO [dbo].[t_cp_model] ([f_id], [f_p_id], [f_code], [f_name], [f_url]) VALUES (N'10', N'0', N'ad', N'广告管理', N'/page/ad/index.html')
GO
GO
INSERT INTO [dbo].[t_cp_model] ([f_id], [f_p_id], [f_code], [f_name], [f_url]) VALUES (N'11', N'0', N'feedback', N'用户反馈', N'/page/feedback/index.html')
GO
GO
INSERT INTO [dbo].[t_cp_model] ([f_id], [f_p_id], [f_code], [f_name], [f_url]) VALUES (N'12', N'0', N'warning', N'预警管理', N'/page/warning/index.html')
GO
GO
INSERT INTO [dbo].[t_cp_model] ([f_id], [f_p_id], [f_code], [f_name], [f_url]) VALUES (N'13', N'0', N'inform', N'通知管理', N'/page/inform/index.html')
GO
GO
INSERT INTO [dbo].[t_cp_model] ([f_id], [f_p_id], [f_code], [f_name], [f_url]) VALUES (N'14', N'0', N'log', N'日志管理', N'/page/log/index.html')
GO
GO
INSERT INTO [dbo].[t_cp_model] ([f_id], [f_p_id], [f_code], [f_name], [f_url]) VALUES (N'15', N'0', N'forms', N'报表中心', N'/page/forms/index.html')
GO
GO

-- ----------------------------
-- Table structure for t_cp_model_user_relevance
-- ----------------------------
DROP TABLE [dbo].[t_cp_model_user_relevance]
GO
CREATE TABLE [dbo].[t_cp_model_user_relevance] (
[f_uid] int NOT NULL ,
[f_model_id] int NOT NULL ,
[f_model_code] nvarchar(20) NULL 
)


GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_model_user_relevance', 
NULL, NULL)) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'用户权限模板映射表'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_model_user_relevance'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'用户权限模板映射表'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_model_user_relevance'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_model_user_relevance', 
'COLUMN', N'f_uid')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'用户id'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_model_user_relevance'
, @level2type = 'COLUMN', @level2name = N'f_uid'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'用户id'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_model_user_relevance'
, @level2type = 'COLUMN', @level2name = N'f_uid'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_model_user_relevance', 
'COLUMN', N'f_model_id')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'模块ID'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_model_user_relevance'
, @level2type = 'COLUMN', @level2name = N'f_model_id'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'模块ID'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_model_user_relevance'
, @level2type = 'COLUMN', @level2name = N'f_model_id'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_model_user_relevance', 
'COLUMN', N'f_model_code')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'模块code'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_model_user_relevance'
, @level2type = 'COLUMN', @level2name = N'f_model_code'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'模块code'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_model_user_relevance'
, @level2type = 'COLUMN', @level2name = N'f_model_code'
GO

-- ----------------------------
-- Records of t_cp_model_user_relevance
-- ----------------------------
INSERT INTO [dbo].[t_cp_model_user_relevance] ([f_uid], [f_model_id], [f_model_code]) VALUES (N'20160622', N'1', N'board')
GO
GO
INSERT INTO [dbo].[t_cp_model_user_relevance] ([f_uid], [f_model_id], [f_model_code]) VALUES (N'20160622', N'2', N'trem')
GO
GO
INSERT INTO [dbo].[t_cp_model_user_relevance] ([f_uid], [f_model_id], [f_model_code]) VALUES (N'1', N'3', N'users')
GO
GO
INSERT INTO [dbo].[t_cp_model_user_relevance] ([f_uid], [f_model_id], [f_model_code]) VALUES (N'20160622', N'3', N'users')
GO
GO
INSERT INTO [dbo].[t_cp_model_user_relevance] ([f_uid], [f_model_id], [f_model_code]) VALUES (N'20160622', N'4', N'users/partner')
GO
GO
INSERT INTO [dbo].[t_cp_model_user_relevance] ([f_uid], [f_model_id], [f_model_code]) VALUES (N'20160622', N'5', N'sites')
GO
GO
INSERT INTO [dbo].[t_cp_model_user_relevance] ([f_uid], [f_model_id], [f_model_code]) VALUES (N'20160622', N'6', N'system')
GO
GO
INSERT INTO [dbo].[t_cp_model_user_relevance] ([f_uid], [f_model_id], [f_model_code]) VALUES (N'20160622', N'7', N'account')
GO
GO
INSERT INTO [dbo].[t_cp_model_user_relevance] ([f_uid], [f_model_id], [f_model_code]) VALUES (N'20160622', N'8', N'content')
GO
GO

-- ----------------------------
-- Table structure for t_cp_operate_log
-- ----------------------------
DROP TABLE [dbo].[t_cp_operate_log]
GO
CREATE TABLE [dbo].[t_cp_operate_log] (
[f_id] int NOT NULL IDENTITY(1,1) ,
[f_user_id] int NOT NULL ,
[f_nickname] nvarchar(50) NULL ,
[f_time] datetime NULL ,
[f_content] nvarchar(1000) NULL ,
[f_interface] nvarchar(1000) NULL ,
[f_ip] nvarchar(20) NULL 
)


GO
DBCC CHECKIDENT(N'[dbo].[t_cp_operate_log]', RESEED, 45)
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_operate_log', 
NULL, NULL)) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'Ainfo参数表'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_operate_log'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'Ainfo参数表'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_operate_log'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_operate_log', 
'COLUMN', N'f_id')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'主键id'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_operate_log'
, @level2type = 'COLUMN', @level2name = N'f_id'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'主键id'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_operate_log'
, @level2type = 'COLUMN', @level2name = N'f_id'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_operate_log', 
'COLUMN', N'f_user_id')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'操作人id'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_operate_log'
, @level2type = 'COLUMN', @level2name = N'f_user_id'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'操作人id'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_operate_log'
, @level2type = 'COLUMN', @level2name = N'f_user_id'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_operate_log', 
'COLUMN', N'f_nickname')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'操作人'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_operate_log'
, @level2type = 'COLUMN', @level2name = N'f_nickname'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'操作人'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_operate_log'
, @level2type = 'COLUMN', @level2name = N'f_nickname'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_operate_log', 
'COLUMN', N'f_time')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'操作时间'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_operate_log'
, @level2type = 'COLUMN', @level2name = N'f_time'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'操作时间'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_operate_log'
, @level2type = 'COLUMN', @level2name = N'f_time'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_operate_log', 
'COLUMN', N'f_content')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'操作内容'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_operate_log'
, @level2type = 'COLUMN', @level2name = N'f_content'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'操作内容'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_operate_log'
, @level2type = 'COLUMN', @level2name = N'f_content'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_operate_log', 
'COLUMN', N'f_interface')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'操作功能'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_operate_log'
, @level2type = 'COLUMN', @level2name = N'f_interface'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'操作功能'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_operate_log'
, @level2type = 'COLUMN', @level2name = N'f_interface'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_operate_log', 
'COLUMN', N'f_ip')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'操作ip'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_operate_log'
, @level2type = 'COLUMN', @level2name = N'f_ip'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'操作ip'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_operate_log'
, @level2type = 'COLUMN', @level2name = N'f_ip'
GO

-- ----------------------------
-- Records of t_cp_operate_log
-- ----------------------------
SET IDENTITY_INSERT [dbo].[t_cp_operate_log] ON
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'1', N'0', N'', N'1900-01-01 00:00:00.000', N'', N'', N'')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'2', N'19950421', N'admin', N'2016-09-25 12:11:02.683', null, N'/main', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'3', N'19950421', N'admin', N'2016-09-25 12:11:11.697', null, N'/sys/param', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'4', N'19950421', N'admin', N'2016-09-25 12:11:15.960', null, N'/api/token/oss_sts', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'5', N'19950421', N'admin', N'2016-09-25 12:11:16.110', null, N'/api/region/list', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'6', N'19950421', N'admin', N'2016-09-25 12:11:29.737', null, N'/user/logout', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'7', N'19950421', N'admin', N'2016-09-25 13:26:14.167', null, N'/main', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'8', N'19950421', N'admin', N'2016-09-25 13:26:14.340', null, N'/sys/param', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'9', N'19950421', N'admin', N'2016-09-25 13:26:14.827', null, N'/api/token/oss_sts', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'10', N'19950421', N'admin', N'2016-09-25 13:26:14.900', null, N'/api/region/list', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'11', N'19950421', N'admin', N'2016-09-25 13:26:26.440', null, N'/js/global/lib/promise-6.1.0/promise-6.1.0.js.map', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'12', N'19950421', N'admin', N'2016-09-25 13:27:50.980', null, N'/main', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'13', N'19950421', N'admin', N'2016-09-25 13:27:52.237', null, N'/sys/param', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'14', N'19950421', N'admin', N'2016-09-25 13:27:56.617', null, N'/js/global/lib/promise-6.1.0/promise-6.1.0.js.map', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'15', N'19950421', N'admin', N'2016-09-25 13:27:58.540', null, N'/main', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'16', N'19950421', N'admin', N'2016-09-25 13:27:58.867', null, N'/sys/param', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'17', N'19950421', N'admin', N'2016-09-25 13:28:44.913', null, N'/main', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'18', N'19950421', N'admin', N'2016-09-25 13:28:45.327', null, N'/sys/param', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'19', N'19950421', N'admin', N'2016-09-25 13:28:52.183', null, N'/main', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'20', N'19950421', N'admin', N'2016-09-25 13:28:52.523', null, N'/sys/param', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'21', N'19950421', N'admin', N'2016-09-25 13:28:56.130', null, N'/js/global/lib/promise-6.1.0/promise-6.1.0.js.map', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'22', N'19950421', N'admin', N'2016-09-25 13:29:08.307', null, N'/main', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'23', N'19950421', N'admin', N'2016-09-25 13:29:09.943', null, N'/sys/param', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'24', N'19950421', N'admin', N'2016-09-25 13:51:47.150', null, N'/user/login', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'25', N'19950421', N'admin', N'2016-09-25 13:51:47.610', null, N'/main', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'26', N'19950421', N'admin', N'2016-09-25 13:51:47.917', null, N'/sys/param', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'27', N'19950421', N'admin', N'2016-09-25 13:51:54.433', null, N'/user/login', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'28', N'19950421', N'admin', N'2016-09-25 13:51:54.653', null, N'/main', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'29', N'19950421', N'admin', N'2016-09-25 13:51:54.737', null, N'/sys/param', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'30', N'19950421', N'admin', N'2016-09-25 13:52:04.440', null, N'/user/login', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'31', N'19950421', N'admin', N'2016-09-25 13:52:04.463', null, N'/main', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'32', N'19950421', N'admin', N'2016-09-25 13:52:04.577', null, N'/sys/param', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'33', N'19950421', N'admin', N'2016-09-25 13:52:17.150', null, N'/user/login', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'34', N'19950421', N'admin', N'2016-09-25 13:52:17.530', null, N'/main', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'35', N'19950421', N'admin', N'2016-09-25 13:52:17.707', null, N'/sys/param', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'36', N'19950421', N'admin', N'2016-09-25 15:38:05.983', null, N'/main', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'37', N'19950421', N'admin', N'2016-09-25 15:41:41.673', null, N'/sys/param', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'38', N'19950421', N'admin', N'2016-09-25 15:42:27.853', null, N'/user/login', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'39', N'19950421', N'admin', N'2016-09-25 15:42:41.943', null, N'/main', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'40', N'19950421', N'admin', N'2016-09-25 15:42:42.923', null, N'/sys/param', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'41', N'19950421', N'admin', N'2016-09-25 15:46:03.613', null, N'/team/query', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'42', N'19950421', N'admin', N'2016-09-25 15:48:36.183', null, N'/team/query', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'43', N'19950421', N'admin', N'2016-09-25 16:01:15.633', null, N'/main', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'44', N'19950421', N'admin', N'2016-09-25 16:01:15.903', null, N'/sys/param', N'0:0:0:0:0:0:0:1')
GO
GO
INSERT INTO [dbo].[t_cp_operate_log] ([f_id], [f_user_id], [f_nickname], [f_time], [f_content], [f_interface], [f_ip]) VALUES (N'45', N'19950421', N'admin', N'2016-09-25 16:01:20.990', null, N'/user/logout', N'0:0:0:0:0:0:0:1')
GO
GO
SET IDENTITY_INSERT [dbo].[t_cp_operate_log] OFF
GO

-- ----------------------------
-- Table structure for t_cp_user
-- ----------------------------
DROP TABLE [dbo].[t_cp_user]
GO
CREATE TABLE [dbo].[t_cp_user] (
[f_id] int NOT NULL IDENTITY(1,1) ,
[f_username] nvarchar(50) NULL ,
[f_realname] nvarchar(24) NULL ,
[f_password] nvarchar(50) NULL ,
[f_phonenum] nvarchar(11) NULL ,
[f_email] nvarchar(32) NULL ,
[f_sex] nchar(1) NULL ,
[f_register_time] datetime NULL ,
[f_portriat] nvarchar(4000) NULL ,
[f_remarks] nvarchar(128) NULL ,
[f_last_logintime] datetime NULL ,
[f_status] nchar(1) NULL 
)


GO
DBCC CHECKIDENT(N'[dbo].[t_cp_user]', RESEED, 20160622)
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_user', 
NULL, NULL)) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'用户表-员工表'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_user'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'用户表-员工表'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_user'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_user', 
'COLUMN', N'f_id')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'主键id'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_user'
, @level2type = 'COLUMN', @level2name = N'f_id'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'主键id'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_user'
, @level2type = 'COLUMN', @level2name = N'f_id'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_user', 
'COLUMN', N'f_username')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'用户名'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_user'
, @level2type = 'COLUMN', @level2name = N'f_username'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'用户名'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_user'
, @level2type = 'COLUMN', @level2name = N'f_username'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_user', 
'COLUMN', N'f_realname')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'真实姓名'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_user'
, @level2type = 'COLUMN', @level2name = N'f_realname'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'真实姓名'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_user'
, @level2type = 'COLUMN', @level2name = N'f_realname'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_user', 
'COLUMN', N'f_password')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'密码'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_user'
, @level2type = 'COLUMN', @level2name = N'f_password'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'密码'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_user'
, @level2type = 'COLUMN', @level2name = N'f_password'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_user', 
'COLUMN', N'f_phonenum')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'手机号码'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_user'
, @level2type = 'COLUMN', @level2name = N'f_phonenum'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'手机号码'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_user'
, @level2type = 'COLUMN', @level2name = N'f_phonenum'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_user', 
'COLUMN', N'f_email')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'电子邮件'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_user'
, @level2type = 'COLUMN', @level2name = N'f_email'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'电子邮件'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_user'
, @level2type = 'COLUMN', @level2name = N'f_email'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_user', 
'COLUMN', N'f_sex')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'性别，1代表男，0代表女'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_user'
, @level2type = 'COLUMN', @level2name = N'f_sex'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'性别，1代表男，0代表女'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_user'
, @level2type = 'COLUMN', @level2name = N'f_sex'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_user', 
'COLUMN', N'f_register_time')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'CP平台-注册时间'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_user'
, @level2type = 'COLUMN', @level2name = N'f_register_time'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'CP平台-注册时间'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_user'
, @level2type = 'COLUMN', @level2name = N'f_register_time'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_user', 
'COLUMN', N'f_portriat')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'头像url'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_user'
, @level2type = 'COLUMN', @level2name = N'f_portriat'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'头像url'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_user'
, @level2type = 'COLUMN', @level2name = N'f_portriat'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_user', 
'COLUMN', N'f_remarks')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'备注信息'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_user'
, @level2type = 'COLUMN', @level2name = N'f_remarks'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'备注信息'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_user'
, @level2type = 'COLUMN', @level2name = N'f_remarks'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_user', 
'COLUMN', N'f_last_logintime')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'最后登录时间'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_user'
, @level2type = 'COLUMN', @level2name = N'f_last_logintime'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'最后登录时间'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_user'
, @level2type = 'COLUMN', @level2name = N'f_last_logintime'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_cp_user', 
'COLUMN', N'f_status')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'用户状态,1代表可登录，0代表禁用 , 2代表离职'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_user'
, @level2type = 'COLUMN', @level2name = N'f_status'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'用户状态,1代表可登录，0代表禁用 , 2代表离职'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_cp_user'
, @level2type = 'COLUMN', @level2name = N'f_status'
GO

-- ----------------------------
-- Records of t_cp_user
-- ----------------------------
SET IDENTITY_INSERT [dbo].[t_cp_user] ON
GO
INSERT INTO [dbo].[t_cp_user] ([f_id], [f_username], [f_realname], [f_password], [f_phonenum], [f_email], [f_sex], [f_register_time], [f_portriat], [f_remarks], [f_last_logintime], [f_status]) VALUES (N'19950421', N'admin', N'admin', N'35a73214f7ac0d437da28db53a1f92d5244657e2', N'13912341234', N'admin', N'1', N'2016-06-22 15:29:40.000', N'19950421.jpg', N'系统管理员', N'2016-06-22 15:29:40.000', N'1')
GO
GO
INSERT INTO [dbo].[t_cp_user] ([f_id], [f_username], [f_realname], [f_password], [f_phonenum], [f_email], [f_sex], [f_register_time], [f_portriat], [f_remarks], [f_last_logintime], [f_status]) VALUES (N'20160622', N'root', N'root', N'35a73214f7ac0d437da28db53a1f92d5244657e2', N'13912341234', N'root', N'1', N'2016-06-22 15:29:40.000', N'20160622.jpg', N'系统管理员', N'2016-06-22 15:29:40.000', N'1')
GO
GO
SET IDENTITY_INSERT [dbo].[t_cp_user] OFF
GO

-- ----------------------------
-- Table structure for t_param
-- ----------------------------
DROP TABLE [dbo].[t_param]
GO
CREATE TABLE [dbo].[t_param] (
[id] int NOT NULL IDENTITY(1,1) ,
[p_name] varchar(255) NOT NULL ,
[p_value] int NOT NULL DEFAULT ((0)) 
)


GO
DBCC CHECKIDENT(N'[dbo].[t_param]', RESEED, 8)
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_param', 
'COLUMN', N'id')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'主键标识'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_param'
, @level2type = 'COLUMN', @level2name = N'id'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'主键标识'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_param'
, @level2type = 'COLUMN', @level2name = N'id'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_param', 
'COLUMN', N'p_name')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'名称'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_param'
, @level2type = 'COLUMN', @level2name = N'p_name'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'名称'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_param'
, @level2type = 'COLUMN', @level2name = N'p_name'
GO
IF ((SELECT COUNT(*) from fn_listextendedproperty('MS_Description', 
'SCHEMA', N'dbo', 
'TABLE', N't_param', 
'COLUMN', N'p_value')) > 0) 
EXEC sp_updateextendedproperty @name = N'MS_Description', @value = N'值'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_param'
, @level2type = 'COLUMN', @level2name = N'p_value'
ELSE
EXEC sp_addextendedproperty @name = N'MS_Description', @value = N'值'
, @level0type = 'SCHEMA', @level0name = N'dbo'
, @level1type = 'TABLE', @level1name = N't_param'
, @level2type = 'COLUMN', @level2name = N'p_value'
GO

-- ----------------------------
-- Records of t_param
-- ----------------------------
SET IDENTITY_INSERT [dbo].[t_param] ON
GO
INSERT INTO [dbo].[t_param] ([id], [p_name], [p_value]) VALUES (N'1', N'功能一', N'1')
GO
GO
INSERT INTO [dbo].[t_param] ([id], [p_name], [p_value]) VALUES (N'2', N'功能二', N'0')
GO
GO
INSERT INTO [dbo].[t_param] ([id], [p_name], [p_value]) VALUES (N'3', N'功能三', N'0')
GO
GO
INSERT INTO [dbo].[t_param] ([id], [p_name], [p_value]) VALUES (N'4', N'功能四', N'0')
GO
GO
INSERT INTO [dbo].[t_param] ([id], [p_name], [p_value]) VALUES (N'5', N'功能五', N'0')
GO
GO
INSERT INTO [dbo].[t_param] ([id], [p_name], [p_value]) VALUES (N'6', N'功能六', N'0')
GO
GO
INSERT INTO [dbo].[t_param] ([id], [p_name], [p_value]) VALUES (N'7', N'功能七', N'0')
GO
GO
INSERT INTO [dbo].[t_param] ([id], [p_name], [p_value]) VALUES (N'8', N'功能八', N'0')
GO
GO
SET IDENTITY_INSERT [dbo].[t_param] OFF
GO

-- ----------------------------
-- Indexes structure for table sysdiagrams
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table sysdiagrams
-- ----------------------------
ALTER TABLE [dbo].[sysdiagrams] ADD PRIMARY KEY ([diagram_id])
GO

-- ----------------------------
-- Uniques structure for table sysdiagrams
-- ----------------------------
ALTER TABLE [dbo].[sysdiagrams] ADD UNIQUE ([principal_id] ASC, [name] ASC)
GO

-- ----------------------------
-- Indexes structure for table t_api_task_schedule_job
-- ----------------------------
CREATE UNIQUE INDEX [name_group] ON [dbo].[t_api_task_schedule_job]
([job_name] ASC, [job_group] ASC) 
WITH (IGNORE_DUP_KEY = ON, STATISTICS_NORECOMPUTE = ON)
GO

-- ----------------------------
-- Primary Key structure for table t_api_task_schedule_job
-- ----------------------------
ALTER TABLE [dbo].[t_api_task_schedule_job] ADD PRIMARY KEY ([job_id])
GO

-- ----------------------------
-- Indexes structure for table t_cp_group
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table t_cp_group
-- ----------------------------
ALTER TABLE [dbo].[t_cp_group] ADD PRIMARY KEY ([f_id])
GO

-- ----------------------------
-- Indexes structure for table t_cp_group_user_relevance
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table t_cp_group_user_relevance
-- ----------------------------
ALTER TABLE [dbo].[t_cp_group_user_relevance] ADD PRIMARY KEY ([f_userid], [f_groupid])
GO

-- ----------------------------
-- Indexes structure for table t_cp_model
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table t_cp_model
-- ----------------------------
ALTER TABLE [dbo].[t_cp_model] ADD PRIMARY KEY ([f_id])
GO

-- ----------------------------
-- Indexes structure for table t_cp_model_user_relevance
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table t_cp_model_user_relevance
-- ----------------------------
ALTER TABLE [dbo].[t_cp_model_user_relevance] ADD PRIMARY KEY ([f_model_id], [f_uid])
GO

-- ----------------------------
-- Indexes structure for table t_cp_operate_log
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table t_cp_operate_log
-- ----------------------------
ALTER TABLE [dbo].[t_cp_operate_log] ADD PRIMARY KEY ([f_id])
GO

-- ----------------------------
-- Indexes structure for table t_cp_user
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table t_cp_user
-- ----------------------------
ALTER TABLE [dbo].[t_cp_user] ADD PRIMARY KEY ([f_id])
GO

-- ----------------------------
-- Indexes structure for table t_param
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table t_param
-- ----------------------------
ALTER TABLE [dbo].[t_param] ADD PRIMARY KEY ([id])
GO
