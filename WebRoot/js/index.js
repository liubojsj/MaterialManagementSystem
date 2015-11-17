Ext.require(['*']);
var tabs;
Ext.onReady(function() {

			tabs = Ext.create('Ext.TabPanel', {
						id : 'tabpanel',
						frame : false,
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
									title : '主界面',
									html : '123456'
								}]
					});

			var store = Ext.create('Ext.data.TreeStore', {
						root : {
							expanded : false
						},
						proxy : {
							type : 'ajax',
							url : './js/tree-data.json'
						}
					});

			var treePanel = Ext.create('Ext.tree.Panel', {
						title: 'TreePanel',
						id : 'tree-panel',
						rootVisible : false,
						autoScroll : true,
						border : false,
						store : store

					});
			var accordionPanel = Ext.create('Ext.panel.Panel', {
						//设置边框,为0时不显示
						border:0,
						//title : 'Accordion and TreePanel',
						//设置收缩图标
						collapsible : false,
						layout : 'accordion',

						items : [treePanel, {
									title : 'Item 2',
									html : 'Some content'
								}, {
									title : '系统管理',
									html : 'Some content'
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
									title : '大额物资采购管理',
									height : 100,
									html : '<center><h1>大额物资采购管理</h1></center>'
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
