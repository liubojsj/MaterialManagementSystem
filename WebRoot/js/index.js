Ext.require(['*']);
var tabs;
var iWidth;
var iHeight;
var departmentStore;
var formWindow;
var repairStore;
Ext.onReady(function() {
	repairStore = Ext.create('Ext.data.Store', {
				fields : ['repairId', 'repairName'],
				data : [{
							"repairId" : "0",
							"repairName" : "基建维修公示"
						}]
			});
	// 取得当前网页的宽和高;
	if (Ext.BLANK_IMAGE_URL.substring(0, 4) != "data") {
		Ext.BLANK_IMAGE_URL = "./images/s.gif";
	}
	iWidth = Ext.get('pageWidth').getWidth();
	iHeight = Ext.get('pageWidth').getHeight();
//	console.log(iHeight);
	/**
	 * 定义标签.
	 */
	tabs = Ext.create('Ext.TabPanel', { 
				id : 'tabpanel',
				frame : false, // 填充框架内部颜色
				// border : false,
				// layout: 'fit' ,
				height : iHeight ,//- 144
				minTabWidth : 115,
				tabWidth : 125,
				resizeTabs : true,
				activeTab : 0,
				enableTabScroll : true,
//				bodyStyle : 'border-width:0px 0 0px 0;',
//				bodyStyle : 'border-width:0px 0 0 0; background:transparent',
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
			expanded : true,

			children : [{
				text : "部门录入",
				leaf : false,
				children : [{
					id : 'control_item',
					text : "受控事项",
					leaf : true,
					href : 'javascript:openTabAdmin(\'control_item_admin.jsp\',\'control_item_admin\')'
				}, {
					id : 'cost_expend',
					text : "公示评价",
					leaf : true,
					href : 'javascript:openTabAdmin(\'cost_expend_admin.jsp\',\'cost_expend_admin\')'
				}, {
					id : 'construction_repair_admin',
					text : "基建维修",
					leaf : true,
					href : 'javascript:openTabConstructionRepair(\'construction_repair_admin.jsp\',\'construction_repair_admin\')'
				}]

			},
					// {
					// text : "权利监督",
					// expanded : false,
					// leaf : true,
					// href :
					// 'javascript:openTabAdmin(\'department_supervise_of_cost_expend.jsp\',\'department_supervise_of_cost_expend\')'
					// },
					{
						text : "数据维护",
						expanded : false,
						leaf : true,
						href : 'javascript:openTabAdmin(\'material_manage.jsp\',\'material_manage\')'
					}]
		}
	});

	/**
	 * 设置评价管理树形菜单
	 */

	var materialstree = Ext.create('Ext.tree.Panel', {
		title : '信息录入',
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
				rootVisible : false,
				hidden : true
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
							id : 'northPanel',
							collapsible : true,
							title : login_username,
							height : 100,
							html : '<center><h1>唐山站"成本大项"监管运用平台</h1></center>'
						}, {
							region : 'west',
							id : 'westPanel',
							collapsible : true,
							title : '项目',
							width : '15%',
							items : [accordionPanel]
						}, {
							region : 'center',
							items : tabs
						}]
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
	departmentStore = Ext.create('Ext.data.Store', {
				model : 'Department',
				proxy : {

					type : 'ajax',
					url : './DepartmentServlet',
					extraParams : {
						"action" : "getAll"
					},
					actionMethods : {
						read : 'POST'
					},
					reader : {
						type : 'json',
						root : 'date'
					}
				},
				autoLoad : true
			})

	loginForm = Ext.create("Ext.form.Panel", {

		frame : false,
		width : 320,
		border : false,
		bodyPadding : 10,
		defaultType : 'textfield',
		defaults : {
			anchor : '100%',
			labelWidth : 50,
			labelAlign : "right"
		},
		items : [{
					allowBlank : false,
					fieldLabel : '用户名',
					name : 'UserName',
					emptyText : '用户名'
				}, {
					allowBlank : false,
					fieldLabel : '密        码',
					name : 'Password',
					emptyText : '密码',
					inputType : 'password'
				}// ,
		// {
		// xtype: 'checkbox',
		// fieldLabel: '记住我',
		// name: 'remember'
		// }
		],
		buttons : [{
					text : '重置',
					handler : function() {
						this.up('form').getForm().reset();
					}
				}, {
					text : '登录',
					formBind : true, // only enabled once the form is valid
					disabled : true,
					handler : function() {
						var form = this.up('form').getForm();
						if (form.isValid()) {
							form.submit({
								method : 'POST',
								params : {
									// 'formJson' : Ext.JSON.encode(form
									// .getValues()),
									'action' : 'login'
								},
								waitTitle : '请稍后',
								waitMsg : '正在提交中...',
								url : "./ActionServlet",
								success : function(form, action) {
									userRole = true;
									Ext.Msg.alert('Success', action.result.msg);
									loginForm.getForm().reset();
//									console.log( action.result.username) ;
//									console.log(Ext.getCmp('northPanel').title) ;
									Ext.getCmp('northPanel').setTitle("当前登录:"+action.result.username) ;
								},
								failure : function(form, action) {
									Ext.Msg.alert('Failed', action.result.msg);
								}
							});

						}

						formWindow.close();
					}

				}]
			// renderTo: "container"
	});

	var formWindow = Ext.create("Ext.window.Window", {
				id : 'loginformWindow',
				title : '用户登陆',
				closeAction : "hide",// 设置该属性新增窗口关闭的时候是隐藏
				modal : true, // 在最上层,其他页面不可点击
				width : 400,
				// height : 400,
				items : loginForm,
				layout : "fit"
			});

});
function openTab(url, menu_id, hiddenNaviFlag) {
	// hiddenNaviFlag为"Y"时收缩左面板
	if (hiddenNaviFlag != null && hiddenNaviFlag != "null"
			&& hiddenNaviFlag != "" && hiddenNaviFlag == "Y") {
		Ext.getCmp('westPanel').collapse();
	}
	var _url = webPath + '/' + url;
	// 如果标签已经存在则关闭 重新打开.
	var ltemTabLenght = tabs.items.length;
	if (ltemTabLenght > 0) {
		for (var i = 0; i < ltemTabLenght; i++) {
			var tabobj = tabs.items.get(0);
			tabs.remove(tabobj);
		}
	}
	departmentStore.each(function(record) {
		if (record.get('leaf_department')) {

			var flagActive = false;
			tabs.add({
				id : 'tab' + record.get('department_id'),
				title : record.get('department_name'),
				html : '<iframe id=\'frame'
						+ menu_id
						+ '\' src='
						+ _url
						+ '?department_id='
						+ record.get('department_id')
						+ ' frameborder="0" width=100% height=100% scrolling="no" ></iframe>',
				active : flagActive,
//				autoScroll : true,
				closable : false

			});
		}

			/**
			 * 设置当前活动标签 0为第一个标签(综合科) 1为第二个标签(房建科)
			 */
			/**
			 * 当i=1时第一个标签为什么不显示?原因见http://blog.sina.com.cn/s/blog_a5f093b4010176l3.html
			 */

	});

	tabs.setActiveTab(0);

}

function openTabAdmin(url, menu_id, hiddenNaviFlag) {
	// alert(userRole);
	if (userRole) {

		if (hiddenNaviFlag != null && hiddenNaviFlag != "null"
				&& hiddenNaviFlag != "" && hiddenNaviFlag == "Y") {
			Ext.getCmp('westPanel').collapse();
		}
		var _url = webPath + '/' + url;
		// 如果标签已经存在则关闭 重新打开.
		var ltemTabLenght = tabs.items.length;
		if (ltemTabLenght > 0) {
			for (var i = 0; i < ltemTabLenght; i++) {
				var tabobj = tabs.items.get(0);
				tabs.remove(tabobj);
			}
		}
		departmentStore.each(function(record) {
			if (record.get('leaf_department')) {
				var flagActive = false;
				tabs.add({
					id : 'tab' + record.get('department_id'),
					title : record.get('department_name'),
					html : '<iframe id=\'frame'
							+ menu_id
							+ '\' src='
							+ _url
							+ '?department_id='
							+ record.get('department_id')
							+ ' frameborder="0" width=100% height=100% scrolling="no" ></iframe>',
					active : flagActive,
					closable : false

				});
			}

				/**
				 * 设置当前活动标签 0为第一个标签(综合科) 1为第二个标签(房建科)
				 */
				/**
				 * 当i=1时第一个标签为什么不显示?原因见http://blog.sina.com.cn/s/blog_a5f093b4010176l3.html
				 */

		});

		tabs.setActiveTab(0);

	} else {
		Ext.getCmp('loginformWindow').show();
	}
}
function openTabConstructionRepair(url, menu_id) {

	/*
	 * 设置默认打开标签
	 */
	var departmentArray = new Array();
	var records = repairStore.getRange(0, (repairStore.getCount() - 1));

	for (var i = 0; i < records.length; i++) {
		var record = records[i];
		// Ext.Msg.alert('', departmentJson);
		if (record.get('department_name') != "唐山站") {
			var tempArray = new Array();

			tempArray.push(record.get('repairName'));
			tempArray.push(record.get('repairId'));
			departmentArray.push(tempArray);
		}
	}
	var _url = webPath + '/' + url;
	// 如果标签已经存在则关闭 重新打开.
	var ltemTabLenght = tabs.items.length;
	if (ltemTabLenght > 0) {
		for (var i = 0; i < ltemTabLenght; i++) {
			var tabobj = tabs.items.get(0);
			tabs.remove(tabobj);
		}
	}
	for (i = 0; i < departmentArray.length; i++) {
		menu_id = departmentArray[i][0].toString() + ","
				+ departmentArray[i][1].toString();
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
			closable : false
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

}