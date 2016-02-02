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
							name : 'user_connect',
							type : 'string'
						}, {
							name : 'provider_connect',
							type : 'string'
						}, {
							name : "incorrupt_connect",
							type : 'string'
						}, {
							name : "department_connect",
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
						'costExpenID' : costExpenID,
						'action' : "list"
					},
					reader : {
						type : 'json',
						totalProperty : 'accountCount',
						root : 'accountList'
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
							flex : 1,
							dataIndex : 'message_board_id',
							hidden : true
						}, {
							text : "运作公示ID",
							dataIndex : 'cost_expend_id',
							hidden : true

						}, {
							text : "用户留言",
							dataIndex : 'user_connect'
						}, {
							text : "推荐供应商",
							dataIndex : 'provider_connect'
						}, {
							text : "廉政质疑留言",
							dataIndex : 'incorrupt_connect'
						}, {
							text : "部门调查回应",
							// renderer : Ext.util.Format.dateRenderer('m/d/Y'),
							dataIndex : 'department_connect'
						}],
				plugins : [{
					ptype : 'rowexpander',
					rowBodyTpl : new Ext.XTemplate(
							'<p><b>推荐供应商:</b> {provider_connect}</p> ',
							'<p><b>廉政质疑留言:</b>{incorrupt_connect}</p>',
							'<p><b>部门调查回应:</b> {department_connect}</p>', {

							})
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
	/*
	 * =================选中表格内容后赋值给相应的表单=================
	 */

	grid.on('itemclick', function(view, record) {
				var form = Ext.getCmp('addMegForm').getForm();
				form.loadRecord(record);
			});
	var addCostMsgAdminForm = Ext.create("Ext.form.Panel", {
		id : 'addMegForm',
		title : "添加管理留言",
		// frame:true,
		border : false,
		// labelAlign : "right",
		labelWidth : 60,
		items : [{
					xtype : 'hidden',
					name : 'message_board_id'
				}, {
					xtype : 'container',
					layout : 'hbox',
					margin : '0 0 10',
					items : [{
						xtype : 'fieldset',
						flex : 1,
						title : '添加廉政质疑留言',
						defaultType : 'textareafield',
						layout : 'anchor',
						defaults : {
							anchor : '100%',
							hideEmptyLabel : true,
							listeners : {
								focus : function(field, newVal, oldVal) {
									// console.log(newVal);
									var data = grid.getSelectionModel();
									if (!data.hasSelection()) {
										Ext.MessageBox.alert("提示",
												"请先选择您要操作的行!");
										return;
									}
								}
							}
						},
						items : [{
							name : 'incorrupt_connect'// ,
								// fieldLabel : 'Alignment Test'
							}]
					}, {
						xtype : 'component',
						width : 10
					}, {
						xtype : 'fieldset',
						flex : 1,
						title : '添加部门调查回应',
						defaultType : 'textareafield',
						layout : 'anchor',
						defaults : {
							anchor : '100%',
							hideEmptyLabel : true,
							listeners : {
								focus : function(field, newVal, oldVal) {
									// console.log(newVal);
									var data = Ext.getCmp('message_board')
											.getSelectionModel().getSelection()
									var form = Ext.getCmp('addMegForm')
											.getForm();

									if (data.length == 0) {
										Ext.MessageBox.alert("提示",
												"请先选择您要操作的行!");
										return;
									}
								}
							}
						},
						items : [{
							name : 'department_connect'// ,
								// fieldLabel : 'Alignment Test'
							}]
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
						var record = this.up('form').getRecord();
						var form = this.up('form').getForm();
						if (form.isValid()) {

							form.submit({
								submitEmptyText : false,
								params : {
									'action' : 'updateDepartmentMessage',
									'costExpenID' : costExpenID
								},
								method : 'POST',
								url : "./MessageBoardServlet",
								success : function(form, action) {
									Ext.Msg.alert('Success', action.result.msg);
									messageBoardStore.reload();
									form.reset();
								},
								failure : function(form, action) {
									Ext.Msg.alert('Failed', action.result.msg);
								}
							});
						}
					}
				}]

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
						defaultType : 'checkbox', // each item will be
						// a checkbox
						layout : 'anchor',
						defaults : {
							anchor : '100%',
							hideEmptyLabel : false
						},
						items : [{

									boxLabel : '单价过高',
									name : 'price_hight',
									inputValue : '单价过高'
								}, {
									boxLabel : '规格不适用',
									name : 'specification_no_application',
									inputValue : '规格不适用'
								}, {
									boxLabel : '质量不经用，需改进',
									name : 'quality_bad',
									inputValue : '质量不经用，需改进'
								}, {
									boxLabel : '对供应商的选定质疑',
									name : 'supplier_doubt',
									inputValue : '对供应商的选定质疑',
									listeners : {
										// 根据不同选项 显示不同布局
										change : function(checked, check) {
											var field = Ext
													.getCmp('choose_supplier');
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
//						id : 'choose_supplier',
						flex : 1,
						title : '推荐供应商:',
						defaultType : 'textareafield',
						layout : 'anchor',

						height : '100%',
						hidden : true,
						defaults : {
							anchor : '100%'
						},
						items : [{
									name : 'choose_my_supplier',
									height : 'auto',
									value : "",
									emptyText : '请在此处输入内容...'

								}]
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
						var record = this.up('form').getRecord();
						var form = this.up('form').getForm();
						if (form.isValid()) {

							form.submit({
								submitEmptyText : false,
								params : {
									'action' : 'add',
									'costExpenID' : costExpenID
								},
								method : 'POST',
								url : "./MessageBoardServlet",
								success : function(form, action) {
									Ext.Msg.alert('Success', action.result.msg);
									messageBoardStore.reload();
									addMsgForm.getForm().reset();
								},
								failure : function(form, action) {
									Ext.Msg.alert('Failed', action.result.msg);
								}
							});
						}
					}
				}]

	});

	var addConstructionMsgUserForm = Ext.create("Ext.form.Panel", {
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
						defaultType : 'checkbox', // each item will be
						// a checkbox
						layout : 'anchor',
						defaults : {
							anchor : '100%',
							hideEmptyLabel : false
						},
						items : [{

									boxLabel : '不必要委外',
									name : ' ',
									inputValue : '不必要委外'
								}, {

									boxLabel : '造价过高',
									name : 'price_hight',
									inputValue : '造价过高'
								}, {
									boxLabel : '承建单位选定质疑',
									name : 'specification_no_application',
									inputValue : '承建单位选定质疑'
								}, {
									boxLabel : '质量不好',
									name : 'quality_bad',
									inputValue : '质量不好'
								}, {
									boxLabel : '我要推荐承建单位',
									name : 'supplier_doubt',
									inputValue : '我要推荐承建单位',
									listeners : {
										// 根据不同选项 显示不同布局
										change : function(checked, check) {
											var field = Ext
													.getCmp('choose_supplier');
											if (field)
												field[check ? 'show' : 'hide']();
											addConstructionMsgUserForm.doLayout();
										}
									}
								}]
					}, {
						xtype : 'component',
						width : 10
					}, {
						xtype : 'fieldset',
						id : 'choose_supplier',
						flex : 1,
						title : '推荐承建商:',
						defaultType : 'textareafield',
						layout : 'anchor',

						height : '100%',
						hidden : true,
						defaults : {
							anchor : '100%'
						},
						items : [{
									name : 'choose_my_supplier',
									height : 'auto',
									value : "",
									emptyText : '请在此处输入内容...'

								}]
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
						var record = this.up('form').getRecord();
						var form = this.up('form').getForm();
						if (form.isValid()) {

							form.submit({
								submitEmptyText : false,
								params : {
									'action' : 'add',
									'costExpenID' : costExpenID
								},
								method : 'POST',
								url : "./MessageBoardServlet",
								success : function(form, action) {
									Ext.Msg.alert('Success', action.result.msg);
									messageBoardStore.reload();
									form.reset();
								},
								failure : function(form, action) {
									Ext.Msg.alert('Failed', action.result.msg);
								}
							});
						}
					}
				}]

	});
	var tmpFrom;
	if (userRole) {
		tmpFrom = addCostMsgAdminForm;
	} else {
		tmpFrom = addCostMsgUserForm;
	};

	Ext.create("Ext.window.Window", {
				title : "商品评价",
				closeAction : "hide",
				border : 0,
				width : 900,
				height : 600,
				layout : "anchor",
				bodyPadding : 10,
				items : [grid, tmpFrom]
			}).show();
});