Ext.require(['*']);
Ext.onReady(function() {
		var loginPanel = Ext.create('Ext.form.Panel', {
						width : 500,
						height : 300,
						title : "用户登录",
						layout : 'form',
						renderTo : 'login_form_location',
						bodyPadding : 5,
						defaultType : 'textfield',
						layout:{
						
						},
						url:'./index.jsp',
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
									handler:function(){
										var form = this.up('form').getForm();
										if(form.isValid()){
											form.submit({
												success:function(form,action){
													Ext.Msg.alert('Success',action.result.msg);
												},
												failure:function(form,action){
													Ext.Msg.alert('Failed',action.result.msg);
												}
											})
										}else{
											Ext.Msg.alert('Invalid Data', 'Please correct form errors.')
										}
									}
								}]
					});
					loginPanel.render("main");  
					
		});
		