Ext.require(['*']);
var tabs;
Ext.onReady(function() {

	tabs = Ext.create('Ext.TabPanel', {
		id : 'tabpanel',
		frame : true,
		border : false,
		height : 600,
		minTabWidth : 115,
		tabWidth : 125,
		resizeTabs : true,
		activeTab : 0,
		enableTabScroll : true,
		defaults : {
			autoScroll : true
		},
		items : [{
			title : '首页',
			html : '<style type="text/css">'+
					'.set_location {' +
							'width: 900px;' +
							'height: 300px;' +
							'border: 3px #FFFFF dashed;' + //设置DIV边框为白色(背景色,好圈住文字不外跑)
							'margin:0px auto;' +
							'}'+
					
					'p.set_font {' +
							'text-indent: 2em;' +   //首行缩进2字符
							'text-align: left;' +   //文本左对齐
							'font-size: 26px;' +    //字体大小
							'font-family: "宋体";'+ //字体类型
							'color: #0080C0;' +     //字体颜色
							'line-height: 200%;'+   //行间距
							'}'+
					'</style>' +
					'<div style = "text-align:center; margin-top:70px ">'+ //用于单独兼容IE8以下浏览器
						'<div class = "set_location" >'+
							'<p class = "set_font" >' +
							'为探索、推行科学的成本管控方法，尊重全体干部职工参与管理，监督管理的热情，发动职工评价成本支出效'+
							'果，推荐更优比选方案，方便各管理部门共享信息查询资源，监督“权利”阳光运作，围绕除“招投标管理事项”'+
							'之外的“数量消耗相对较多，金额积累相对较多，采购相对呈现规律”的成本支出大项，进行“决策过程、采购过'+
							'程、购置效果”的网上公开管理，同时设“廉政质疑”功能，接受干部职工监督评价。' +
							'</p>' +
						'</div>' +
					'</div>'
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
		title : '采购管理',
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
								expanded:false,
								children:[{
										text:"添加用户",
										leaf:true
								},{
										text:"删除用户",
										leaf:true
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
								expaned:false,
								children:[{
									text:"增加权限",
									leaf:true
									
								},{
									text:"删除权限",
									leaf:true
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

	var accordionPanel = Ext.create('Ext.panel.Panel', {
				id:accordionPanel,
				height: 500,  
				width : '100%',
				autoHeight : true,
				layout : 'accordion', // 布局为accordion(手风琴布局?)
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

	var viewport = Ext.create('Ext.Viewport', {
		layout : {
			type : 'border',
			padding : 5
		},
		defaults : {
			split : true
		},
		items : [{
					region : 'north',
					collapsible : false,
					title : '当前登录:超级用户',
					height : 100,
					html : '<center><h1 class="STYLE2">唐山站"成本大项"监管运用平台</h1></center>'
				}, {
					region : 'west',
					collapsible : false,
					title : '项目',
					width : '20%',
					items : [accordionPanel]
				}, {
					region : 'center',
					items : tabs
				}]
	});

});

function menuLink(text, url, menu_id, hiddenNaviFlag) {

	var paraLink = "?";

	if (url.indexOf("?") > -1) {
		paraLink = "&";
	}
	if (hiddenNaviFlag != null && hiddenNaviFlag != "null"
			&& hiddenNaviFlag != "" && hiddenNaviFlag == "Y") {
		Ext.getCmp('westPanel').collapse();
	}
	var _url = adminPath + '/' + url;

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
