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
									title : '系统说明',
									html :    '<style type="text/css">'+
												'.STYLE1 {'+
													'font-family: "新宋体";'+
													'color: #0080FF;'+
												'}'+
												'.STYLE2 {color: #0080C0}+'+
												
												    '</style>'+
									'<h2 align="center">&nbsp;</h2>'+ 
									'<h2 align="center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="STYLE2">为探索推行科学的成本管控方法,尊重全部干部职工参与管理，监督管理的热性，发动职工评价成本支出</span></h2>'+
  											'<h2 align="center" class="STYLE2">效果，推荐更优比选方案。方便各管理部门共享信息查询资源，监督“权利”阳光运作，围绕除招投标管理事</h2>'+
  											'<h2 align="center" class="STYLE2">项之外的“数量消耗相对较多，安全积累相对较多，采购相对有规律”的成本支出大项，进行决策过程、采购</h2>'+
  											'<h2 align="left"><span class="STYLE2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
  											'过程、支出效果的网上公开管理，同时设廉政质疑功能，接受干部和职工监督评价。</span></h2>'
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
// var materialsstore = Ext.create('Ext.data.TreeStore', {
// root : {
// expanded : true,
//
// children : [{
// text : "评价查询",
// leaf : true
// }, {
// text : "评价管理",
// expanded : false,
// children : [{
// text : "添加评价",
// leaf : true
// }, {
// text : "删除评价",
// leaf : true
// }]
// }, {
// text : "物资评价",
// leaf : true
// }]
// }
// });
//
// /**
// * 设置评价管理树形菜单
// */
//
// var materialstree = Ext.create('Ext.tree.Panel', {
// title : '评价管理',
// // width : '100%',
// // height : '100%',
// expanded : false,
// autoScroll : true,
// border : false,
// autoHeight : true,
// store : materialsstore,
// rootVisible : false,
// renderTo : Ext.getBody()
// });

			var accordionPanel = Ext.create('Ext.panel.Panel', {
						border : 0,
						title : '',
						// width : '100%',
						// height : 600,
						x : 0, // 设置Panel的位置
						y : 0,
						layout : 'accordion',                    // 布局为accordion
						renderTo : Ext.getBody(),
						defaults : {
							bodyStyle : 'padding:5px'            // 避免Panel中的子元素紧邻边框
						},
						layoutConfig : {
							multi: false,                        // 展开多个面板
							titleCollapse : true,                // 设置为点击整个标题栏都可以收缩
							animate : true,                      // 开启默认动画效果
							activeOnTop : true
							                                     // 展开的面板总是在最顶层
						},

						items : [treePanel, {
									title : '采购管理',
									html : 'Panel Content3'},
									{
									title : '系统管理',
									html : 'Panel Content3'
								}]
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
