Ext.require(['*']);
Ext.onReady(function() {
	Ext.define('MessageBoard', {
				extend : 'Ext.data.Model',
				fields : [{
							name : 'message_board_id',
							type : 'int'
						}, {
							name : 'cost_expend_id',
							type : 'int'
						}, {
							name : 'user_leave_message',
							type : 'string'
						}, {
							name : 'user_message_content',
							type : 'string'
						}, {
							name : "company_name",
							type : 'string'
						}, {
							name : "company_connect",
							type : 'string'
						}, {
							name : "investigate_reply",
							type : 'string'
						}, {
							name : 'user_ip',
							type : 'string'
						}, {
							name : 'user_date',
							type : 'string'
						}]
			});

	var messageBoardStore = Ext.create('Ext.data.Store', {
				model : 'MessageBoard',
				// autoLoad : true, 分页显示,不自动加载load
				pageSize : 6,
				proxy : {
					type : 'ajax',
					url : './MessageBoardServlet',
					actionMethods : {
						read : 'POST'
					},
					extraParams : {
						'cost_expen_id' : costExpenID,
						'action' : "list"
					},
					reader : {
						type : 'json',
						totalProperty : 'count',
						root : 'list'
					}
				}
			});
	messageBoardStore.load({
				params : {
					start : 0,
					limit : 6
				}
			});
	var grid = Ext.create('Ext.grid.GridPanel', {
		// Ext.define('KitchenSink.view.grid.RowExpander', { //自定义类 无法使用
		// grid.on函数
		extend : 'Ext.grid.Panel',
		id : 'message_board',
		xtype : 'row-expander-grid',
		store : messageBoardStore,
		// autoHeight : true, // 这样grid才能全部显示行，不用滚动

		forceFit : true, // 让grid的列自动填满grid的整个宽度，不用一列一列的设定宽度。

		height : 315,
		// bodyStyle : 'border-width:1px 0 1px 0;',
		// bodyStyle : 'border-width:1px 0 0 0; background:transparent',
		columns : [{
					xtype : "rownumberer",
					align : 'center',
					text : "序号",
					width : 50
				}, {
					text : "留言ID",

					dataIndex : 'message_board_id',
					hidden : true
				}, {
					text : "运作公示ID",
					dataIndex : 'cost_expend_id',
					hidden : true

				}, {
					text : "用户留言",
					flex : 1,
					dataIndex : 'user_leave_message'
				}, {
					text : "调查回应",
					flex : 2,
					dataIndex : 'investigate_reply'
				}],
		plugins : [{
			ptype : 'rowexpander',
			rowBodyTpl : new Ext.XTemplate(
					'<p><b>用户留言内容:</b> {user_message_content}</p> ',
					'<p><b>供应商名称:</b>{company_name}  <b>联系方式:</b>{company_connect}</p>',
					{})
		}],
		dockedItems : [{
					xtype : 'pagingtoolbar',
					dock : 'bottom',
					displayInfo : true,
					emptyMsg : "没有数据",
					displayMsg : "显示从{0}条数据到{1}条数据，共{2}条数据",
					store : messageBoardStore
				}],
		collapsible : false
	});

	var addCostMsgUserForm = Ext.create("Ext.form.Panel", {
		title : "添加新评价",
		// frame:true,
		border : false,
		// labelAlign : "right",
		labelWidth : 60,
		items : [{
			xtype : 'container',
			layout : 'hbox',
			margin : '0 0 10',
			items : [{
				xtype : 'fieldset',
				flex : 1,
				title : '您的选择是:',
				// defaultType : 'checkbox', // each item will be
				// a checkbox
				layout : 'anchor',
				defaults : {
					anchor : '100%',
					hideEmptyLabel : false
				},
				items : [{
							xtype : 'checkboxgroup',
							id : 'display_check',
							// fieldLabel : 'Single Column',
							// cls : 'x-check-group-alt',
							// Put all controls in a single column with width
							// 100%
							columns : 1,
							items : [{

										boxLabel : '单价过高',
										name : 'price_hight',
										inputValue : '单价过高',
										listeners : {
											// 根据不同选项 显示不同布局
											change : function(checked, check) {
												checkBoxDisplay(checked, check);
											}
										}
									}, {
										boxLabel : '规格不适用',
										name : 'specification_no_application',
										inputValue : '规格不适用',
										listeners : {
											// 根据不同选项 显示不同布局
											change : function(checked, check) {
												checkBoxDisplay(checked, check);
											}
										}
									}, {
										boxLabel : '质量不经用，需改进',
										name : 'quality_bad',
										inputValue : '质量不经用，需改进',
										listeners : {
											// 根据不同选项 显示不同布局
											change : function(checked, check) {
												checkBoxDisplay(checked, check);
											}
										}
									}]
						}, {
							xtype : 'checkbox',
							boxLabel : '对供应商的选定质疑',
							name : 'supplier_doubt',
							margin : '-5 5 5 4',
							inputValue : '对供应商的选定质疑',
							listeners : {
								// 根据不同选项 显示不同布局
								change : function(checked, check) {
//									console.log(checked.getValue());
									var form = this.up('form').getForm();
									if (checked.getValue()) {
//										console.log(checked.boxLabel);
										form.findField('user_leave_message')
												.setValue(checked.boxLabel);
									}
									var field = Ext.getCmp('leave_message')
											.getComponent('link');
									if (field)
										field[check ? 'show' : 'hide']();
									addCostMsgUserForm.doLayout();
								}
							}

						}]
			}, {
				xtype : 'component',
				width : 10
			}, {
				xtype : 'fieldset',
				id : 'leave_message',
				flex : 1,
				title : '评价留言:',
				defaultType : 'textareafield',
				layout : 'anchor',

				height : '100%',
				hidden : false,
				defaults : {
					anchor : '100%'
				},
				items : [{
							name : 'user_message_content',
							itemId : 'message_content',
							height : 65,
							value : "限定50字",
							hidden : true,
							emptyText : '请在此处输入内容...'

						}, {
							xtype : 'fieldcontainer',
							// fieldLabel : 'Your Name',
							itemId : 'link',
							labelStyle : 'font-weight:bold;padding:0;',
							layout : 'hbox',
							defaultType : 'textfield',
							hidden : true,
							fieldDefaults : {
								labelAlign : 'right',
								labelWidth : 70
							},

							items : [{
										flex : 3,
										name : 'company_name',
										itemId : 'firstName',
										// afterLabelTextTpl : required,
										fieldLabel : '推荐供应商:',
										allowBlank : true
									}, {
										flex : 2,
										name : 'company_connect',
										margins : '0 0 0 0',
										// afterLabelTextTpl : required,
										fieldLabel : '联系方式:',
										allowBlank : true

									}]
						}]
			}, {
				xtype : 'hiddenfield',
				name : 'cost_expend_id',
				value : costExpenID

			}, {
				xtype : 'hiddenfield',
				name : 'user_leave_message'

			}]
		}],
		buttons : [{
					text : '重置',
					handler : function() {
						this.up('form').getForm().reset();
					}
				}, {
					text : '提交',
					formBind : true, // only enabled once the form is valid
					disabled : true,
					handler : function() {

						var form = this.up('form').getForm();
						var record = form.getRecord();
						if (form.isValid()) {
							// 将checkboxGroup值写入隐藏域
							var msgValue = Ext.getCmp('display_check')
									.getChecked();
							var userLeaveMsg = '';
							Ext.Array.each(msgValue, function(item) {
										// userLeaveMsg += ',' + item.boxLabel ;

										userLeaveMsg = item.boxLabel + ' '
												+ userLeaveMsg;
									});
//							console.log(userLeaveMsg);
							if (Ext.util.Format.trim(userLeaveMsg) != '') {
								form
										.findField('user_leave_message')
										.setValue(userLeaveMsg
												+ form
														.findField('user_leave_message').value);
							}

							// ****************************
							form.submit({
										submitEmptyText : false,
										params : {
											'formJson' : Ext.JSON.encode(form
													.getValues()),
											'action' : 'add'
										},
										method : 'POST',
										url : "./MessageBoardServlet",
										success : function(form, action) {
											Ext.Msg.alert('提示',
													action.result.msg);
											messageBoardStore.reload();
											form.reset();
										},
										failure : function(form, action) {
											Ext.Msg.alert('提示',
													action.result.msg);
										}
									});
						}
					}
				}]

	});

	Ext.create("Ext.window.Window", {
				title : "商品评价",
				closeAction : "hide",
				border : 0,
				width : 900,
				height : 600,
				layout : "anchor",
				bodyPadding : 10,
				items : [grid, addCostMsgUserForm]
			}).show();

	function checkBoxDisplay() {
		var cbitems = Ext.getCmp('display_check');
		// console.log(cbitems.getChecked().length);
		var k = cbitems.getChecked().length;
		var field = Ext.getCmp('leave_message').getComponent('message_content');
		if (k > 0) {
			field.show();
			addCostMsgUserForm.doLayout();
		} else {
			field.hide();
			addCostMsgUserForm.doLayout();
		}
	}
});