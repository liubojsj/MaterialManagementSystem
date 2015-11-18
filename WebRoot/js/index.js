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
									title : '工作台',
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

			/**
			 * 设置左侧项目栏
			 */
			var treePanel = Ext.create('Ext.tree.Panel', {
						title : '廉政监督',
						id : 'tree-panel',
						rootVisible : false,
						autoScroll : true,
						border : false,
						store : store

					});

			var accordionPanel = Ext.create('Ext.panel.Panel', {
						border : 0,
						title:'',  
                                width:'100%',  
                                height:600,  
                                x:0,   //设置Panel的位置  
                                y:0,  
                                layout:'accordion', //布局为accordion  
                                renderTo:Ext.getBody(),  
                                defaults: {   
                                    bodyStyle: 'padding:5px'      
                                },  
                                layoutConfig: {          
                                    titleCollapse: true,    //设置为点击整个标题栏都可以收缩     
                                    animate: true,  //开启默认动画效果         
                                    activeOnTop: true   //展开的面板总是在最顶层        
                                },       
 
 
						items : [treePanel, {
									title : 'Panel2',
									html : 'Panel Content2'
								}, {
									title : 'Panel3',
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
									title : '唐山站成本支出大项监管运用平台',
									height : 100,
									html : '<center><h1>唐山站成本支出大项监管运用平台</h1></center>'
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
