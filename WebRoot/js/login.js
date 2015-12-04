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
		});
		