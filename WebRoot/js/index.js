Ext.require(['*']);
var tabs;
var iWidth;
var iHeight;
Ext.onReady(function() {
	// 取得当前网页的宽和高;

	iWidth = Ext.get('pageWidth').getWidth();
	iHeight = Ext.get('pageWidth').getHeight();
	/**
	 * 定义标签.
	 */
	tabs = Ext.create('Ext.TabPanel', {
				id : 'tabpanel',
				frame : true, // 不启用框架,启用框架只是为了在IE6/7/8浏览其中显示圆角边框
				border : false,
				height : iHeight - 144,
				minTabWidth : 115,
				tabWidth : 125,
				resizeTabs : true,
				activeTab : 0,
				enableTabScroll : true,
				defaults : {
					autoScroll : true
				},
				items : [{
					id : 'firstTab',
					title : '首页',
					border : 0,
					html : '<div style = "text-align:center; margin-top:70px ">'
							+ // 用于单独兼容IE8以下浏览器
							'<div class = "set_location" >'
							+ '<p class = "set_font" >'
							+ '为探索、推行科学的成本管控方法，尊重全体干部职工参与管理，监督管理的热情，发动职工评价成本支出效'
							+ '果，推荐更优比选方案，方便各管理部门共享信息查询资源，监督“权利”阳光运作，围绕除“招投标管理事项”'
							+ '之外的“数量消耗相对较多，金额积累相对较多，采购相对呈现规律”的成本支出大项，进行“决策过程、采购过'
							+ '程、购置效果”的网上公开管理，同时设“廉政质疑”功能，接受干部职工监督评价。'
							+ '</p>'
							+ '</div>' + '</div>',
					closable : true
				}]

			});
	/**
	 * 设置廉政监督管理菜单数据
	 */
	var store = Ext.create('Ext.data.TreeStore', {
				root : {
					expanded : false
				},
				proxy : {
					type : 'ajax',
					url : './js/tree-data.json'
				}
			});

	/**
	 * 设置廉政监督管理菜单
	 */
	var treePanel = Ext.create('Ext.tree.Panel', {
				title : '廉政监督',
				id : 'tree-panel',
				rootVisible : false,
				autoScroll : true,
				border : false,
				store : store

			});
	/**
	 * 设置评价管理树形菜单数据
	 */
	var materialsstore = Ext.create('Ext.data.TreeStore', {
				root : {
					expanded : false,

					children : [{
								text : "计划管理",
								leaf : true
							}, {
								text : "供应管理",
								expanded : false,
								children : [{
											text : "添加供应商",
											leaf : true
										}, {
											text : "删除供应商",
											leaf : true
										}]
							}, {
								text : "采购进度",
								leaf : true
							}]
				}
			});

	/**
	 * 设置评价管理树形菜单
	 */

	var materialstree = Ext.create('Ext.tree.Panel', {
		title : '监管运用',
		autoScroll : true,
		border : false,
		autoHeight : true,
		store : materialsstore,
		rootVisible : false
			// 是否显示根节点
		});

	/**
	 * 设置系统管理树形菜单数据
	 */
	var systemstore = Ext.create('Ext.data.TreeStore', {
				root : {
					expanded : false,

					children : [{
								text : "用户管理",
								expanded : false,
								children : [{
											text : "添加用户",
											leaf : true
										}, {
											text : "删除用户",
											leaf : true
										}]
							}, {
								text : "角色管理",
								expanded : false,
								children : [{
											text : "添加角色",
											leaf : true
										}, {
											text : "删除角色",
											leaf : true
										}]
							}, {
								text : "权限管理",
								expaned : false,
								children : [{
											text : "增加权限",
											leaf : true

										}, {
											text : "删除权限",
											leaf : true
										}]
							}]
				}
			});

	/**
	 * 设置系统管理树形菜单
	 */
	var systemtree = Ext.create('Ext.tree.Panel', {

		title : '系统管理',
		autoScroll : true,
		border : false,
		autoHeight : true,
		store : systemstore,
		rootVisible : false
			// 是否显示根节点

		})
	/**
	 * 设置左侧折叠面板
	 */
	var accordionPanel = Ext.create('Ext.panel.Panel', {
				id : accordionPanel,
				height : iHeight - 144, // 动态改变 accordionPanel 布局大小,避免栏目紧缩一起
				width : '100%',
				border : 0,
				autoHeight : true,
				layout : 'accordion', // 布局为accordion(手风琴布局)
				defaults : {
					bodyStyle : 'padding:5px' // 避免Panel中的子元素紧邻边框
				},
				layoutConfig : {

					multi : false, // 展开多个面板
					titleCollapse : true, // 设置为点击整个标题栏都可以收缩
					animate : true, // 开启默认动画效果
					activeOnTop : true
					// 展开的面板总是在最顶层
				},

				items : [treePanel, materialstree, systemtree]
			})
	/**
	 * 设置页面分割样式
	 */
	var viewport = Ext.create('Ext.Viewport', {
				layout : {
					type : 'border',
					padding : 1
				},
				defaults : {
					split : true
				},
				items : [{
							region : 'north',
							collapsible : true,
							title : '当前登录:超级用户',
							height : 100,
							html : '<center><h1>唐山站"成本大项"监管运用平台</h1></center>'
						}, {
							region : 'west',
							collapsible : true,
							title : '项目',
							width : '20%',
							items : [accordionPanel]
						}, {
							region : 'center',
							items : tabs
						}]
			});

});

Ext.define('Department', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'department_id',
						type : 'int'
					}, {
						name : 'department_name',
						type : 'string'
					}, {
						name : 'department_name_abbreviation',
						type : 'string'
					}, {
						name : 'leaf_department',
						type : 'boolean'
					}, {
						name : "root_department",
						type : 'boolean'
					}, {
						name : 'superior_department_id',
						type : 'int'
					}]
		});
var departmentStore = Ext.create('Ext.data.Store', {
	model : 'Department',
	data : Ext.decode(departmentJson)
		// proxy : {
		// type : 'ajax',
		// url : './DepartmentServlet?depValue=getAll',
		// reader : 'json'
		// },
		// autoLoad : true
	})

function openTab(url, menu_id, hiddenNaviFlag) {
	/*
	 * 设置默认打开标签
	 */
	var departmentArray = new Array();
	var records = departmentStore.getRange(0, (departmentStore.getCount() - 1));
	for (var i = 0; i < records.length; i++) {
		var record = records[i];
		//Ext.Msg.alert('', departmentJson);
		if (record.get('department_name') != "唐山站") {
			var tempArray = new Array();

			tempArray.push(record.get('department_name'));
			tempArray.push(record.get('department_name_abbreviation'));
			tempArray.push(record.get('department_id'));
			departmentArray.push(tempArray);
		}
	}
	var i, j;
	var paraLink = "?";
	if (url.indexOf("?") > -1) {
		paraLink = "&";
	}
	if (hiddenNaviFlag != null && hiddenNaviFlag != "null"
			&& hiddenNaviFlag != "" && hiddenNaviFlag == "Y") {
		Ext.getCmp('westPanel').collapse();
	}
	var _url = webPath + '/' + url;
	var currTab = Ext.get('tab' + menu_id);

	// 关闭第一个tab
	if (Ext.getCmp('firstTab') != null) {
		tabs.remove(Ext.getCmp('firstTab'));
	}
	for (i = 0; i < departmentArray.length; i++) {
		menu_id = departmentArray[i][1].toString() + ","
				+ departmentArray[i][2].toString();

		var flagActive = false;

		tabs.add({

			id : 'tab' + menu_id,
			title : departmentArray[i][0].toString(),
			html : '<iframe id=\'frame'
					+ menu_id
					+ '\' src='
					+ _url
					+ '?tabid='
					+ menu_id
					+ ' frameborder="0" width=100% height=100% scrolling="no" ></iframe>',
			/*
			 * 
			 * 
			 * loader : {
			 * 
			 * url : _url + '?tabid=' + menu_id, contentType : 'html', loadMask :
			 * '正在加载...', scripts : true }, listeners : { activate :
			 * function(tab) { tab.loader.load();
			 *  } },
			 */

			active : flagActive,
			closable : true

		});

		/**
		 * 设置当前活动标签 0为第一个标签(综合科) 1为第二个标签(房建科)
		 */
		/**
		 * 当i=1时第一个标签为什么不显示?原因见http://blog.sina.com.cn/s/blog_a5f093b4010176l3.html
		 */
		if (i == 0) {
			tabs.setActiveTab('tab' + menu_id);
		}
	}

	// tabs.activate(0);

}
// function Panel_Refesh(panelObj) {
// // panelObj是Ext.Panel
// panelObj.getUpdater().refresh();
// }
// function TabPanel_RefreshActiveTab() {
// tabs.getActiveTab().getUpdater().refresh();
// }
// function TabPanel_RefreshTab(panelID) {
// var x = tabs.getCmp(panelID);
// if (x) {
// tabs.setActiveTab(x);
// x.getUpdater().refresh();
// }
// }

function menuLink(text, url, menu_id, hiddenNaviFlag) {
	var paraLink = "?";
	if (url.indexOf("?") > -1) {
		paraLink = "&";
	}
	if (hiddenNaviFlag != null && hiddenNaviFlag != "null"
			&& hiddenNaviFlag != "" && hiddenNaviFlag == "Y") {
		Ext.getCmp('westPanel').collapse();
	}
	var _url = webPath + '/' + url;

	// 如果已打开同一窗口，则激活当前窗口并刷新
	var currTab = Ext.get('tab' + menu_id);
	if (currTab) {
		document.getElementById('frame' + menu_id).src = _url;
		tabs.setActiveTab('tab' + menu_id);
	}
	tabs.add({
		id : 'tab' + menu_id,
		title : text,
		html : '<iframe id=\'frame'
				+ menu_id
				+ '\' src='
				+ _url
				+ ' frameborder="0" width=100% height=100% scrolling="no" ></iframe>',
		closable : true
	}).show();

}
