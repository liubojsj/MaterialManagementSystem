Ext.require(['*']);
Ext.onReady(function() {
		var loginPanel = Ext.create('Ext.form.Panel', {
						width : 250,
						height : 250,
						title : "用户登录",
						layout : 'form',
						renderTo : 'login_form',
						bodyPadding : 2,
						defaultType : 'textfield',
						xtype:{
							autoRender:true
						},
						items : [{
									allowBlank : false,
									fieldLabel : '用户名:',
									name : 'user',
									emptyText : '请输入用户名...'
								}, {
									allowBlank : false,
									fieldLabel : '密   码:',
									name : 'pass',
									emptyText : '请输入密码...',
									inputType : 'password'
								}, {
									xtype : 'checkbox',
									fieldLabel : '记住密码:',
									name : 'remember'
								}],

						buttons : [{
									text : '注册'
									
								}, {
									text : '登录',
									handler:login
								}]
					});
		function login() {
                loginform.getForm().submit({
                    url:'../services/Login.ashx',
                    method: 'post',
                    waitMsg: "正在登录......",
                    success: function(form, action) {
                    
                        var loginResult = action.result.success;
                        if (loginResult === false) {
                            Ext.Msg.alert('提示', action.result.msg);
                        }
                        else {
                            if (loginResult === true) {
                                window.location.href = 'Main.htm';
                            }
                        }
                    },
                    failure: function(form, action) {
                        form.reset();
                        //Ext.Msg.alter("失败");
                        switch (action.failureType) {
                            case Ext.form.Action.CLIENT_INVALID:
                                Ext.Msg.alert("错误1", "提交的表单数据无效,请检查!");
                                break;
                            case Ext.form.Action.CONNECT_FAILURE:
                                Ext.Msg.alert("错误2", "请求失败");
                                break;
                            case Ext.form.Action.SERVER_INVALID:
                                //  Ext.Msg.alert("Failure", action.result.msg);
                                Ext.Msg.alert("账号或密码错误！", action.result.msg);
                        }

                    }
                });
            }
        var accordionPanel = Ext.create('Ext.panel.Panel', {
			    title: '栏目列表',
			    width: 250,
			    height: 600,
			    defaults: {
			        // applied to each contained panel
			        bodyStyle: 'padding:15px'
			    },
			    layout: {
			        // layout-specific configs go here
			        type: 'accordion',
			        titleCollapse: true,
			        animate: true,
			        activeOnTop: true
			    },
			    items: [{
			        title: '受控事项',
			        html:	'<li>消防年检</li>' +
			        		'<li>空调制冷保养</li>' +
			        		'<li>空调制热保养</li>' +
			        		'<li>压力表检测</li>' +
			        		'<li>电梯维修</li>' +
			        		'<li>消防维修</li>' +
			        		'<li>空调机组维修</>' +
			        		'<li>基建维修</li>' +
			        		'<li>旅客公用手纸</li>' +
			        		'<li>洗地机盘刷</li>' +
			        		'<li>洗地机刮条</li>' +
			        		'<li>保洁机具维修</li>' +
			        		'<li>劳动保护用品</li>' +
			        		'<li>打印纸</li>' +
			        		'<li>打印机墨粉</li>' +
			        		'<li>保洁机具电池组</li>' +
			        		'<li>保洁清洗剂</li>' +
			        		'<li>尘推罩</li>' +
			        		'<li>不锈钢光亮剂</li>' +
			        		'<li>旅客公用洗手液</li>'
			        		
			    },{
			        title: '运作公示',
			        html: 'Panel content!'
			    },{
			        title: '评价监督',
			        html: 'Panel content!'
			    }],
			    renderTo: 'accordion_view'
			});
	var tabs2 = Ext.widget('tabpanel', {
		        renderTo: 'menu',
		        activeTab: 0,
		        width: 745,
		        height: 850,
		        plain: true,
		        defaults :{
		            autoScroll: true,
		            bodyPadding: 10
		        },
		        items: [{
		                title: '首页',
		                html: '<style type="text/css">'+
					'.set_location {' +
							'width: 740px;' +
							'height: 600px;' +
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
		            },{
		                title: '安技科',
		                loader: {
		                    url: 'anjike_list.jsp',
		                    contentType: 'html',
		                    loadMask: true
		                },
		                listeners: {
		                    activate: function(tab) {
		                        tab.loader.load();
		                    }
		                }
		            },{
		                title: '房建科',
		                loader: {
		                    url: 'fangjianke_list.jsp',
		                    contentType: 'html',
		                    loadMask: true
		                },
		                listeners: {
		                    activate: function(tab) {
		                        tab.loader.load();
		                    }
		                }
		            },{
		                title: '客运科',
		                listeners: {
		                    activate: function(tab){
		                        setTimeout(function() {
		                            alert(tab.title + ' was activated.');
		                        }, 1);
		                    }
		                },
		                html: "I am tab 4's content. I also have an event listener attached."
		            },{
		                title: 'Disabled Tab',
		                disabled: true,
		                html: "Can't see me cause I'm disabled"
		            }
		        ]
		    });
//	var toolbarPanel = Ext.create('Ext.toolbar.Toolbar', {
//		    id:toolbarPanel,
//		    renderTo: 'menu',
//		    width   : 745,
//		    height :35 ,
//		    items: [{
//		    xtype:'menu',	
//		    text :'部门'
//		    } ,
//		        {
//		            xtype: 'splitbutton',
//		            text : 'Split Button'
//		        },
//		        '->',
//		        {
//		            xtype    : 'textfield',
//		            name     : 'field1',
//		            emptyText: 'enter search term'
//		        }
//		    ]
//		});
	var menuPanel = Ext.create('Ext.menu.Menu', {
		    width: 100,
		    plain: true,
		    floating: false ,  // usually you want this set to True (default)
		   // renderTo: Ext.getCmp('toolbarPanel'),  // usually rendered by it's containing component
		    items: [{
		        text: 'plain item 1'
		    },{
		        text: 'plain item 2'
		    },{
		        text: 'plain item 3'
		    }]
});
		});