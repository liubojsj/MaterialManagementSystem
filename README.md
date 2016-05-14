# MaterialManagementSystem项目说明

#MyEclipse
	->preferences
		->Team
			->Git
				->Configuration
					->repository Setting
#git pull配置:
##############################################################
[core]
	repositoryformatversion = 0
	filemode = false
	logallrefupdates = true
	autocrlf = false

  
 [branch "master"]
	remote = origin
	merge = refs/heads/master
	
[remote "origin"]
	url = git@github.com:liubojsj/MaterialManagementSystem.git
	fetch = +refs/heads/*:refs/remotes/origin/*
	push = refs/heads/master:refs/heads/master
##############################################################
#######################项目更新日志############################
1.增加数据库
2.完成数据库连接类
3.测试Servlet,学习知识
4.修改web.xml配置文件
5.增减首页说明
6.增减零小维修页面显示
7.重构首页寄语显示格式,兼容IE8以下浏览器
8.调整首页寄语格式和文字.
9.调整网站页面布局,分离CSS样式表
10.更改标签页显示方式,实现按部门显示.
11.修改树形菜单显示,解决标签默认激活问题(还有疑问).完成布局图
12.连接数据库完成项目控制
13.完成查询分页
14.增加插入删除功能
15.完成CRUD功能,细节待完善:
	#2015-12-18
	-Insert模块未解决中文乱码问题,可参见Update模块
	-Update模块中文乱码已处理,影子数据Bug未修改
	-Insert模块、Update模块部门显示编码，未显示部门名称，（修改control_item_tb表,增加字段depart_name字段）
	-调整ControlItemServlet判断拦截方式,待进一步优化
##############################################################
阶段完成