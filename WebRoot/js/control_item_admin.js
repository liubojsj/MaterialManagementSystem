Ext.require(['*']);
var formAction = '';
Ext.onReady(function() {

	/**
	 * ********************定义Modle数据类型 ********************
	 */

	/*
	 * 部门Control_item模型
	 */
	Ext.define('Control_item', {
		extend : 'Ext.data.Model',
		fields : [{
					name : 'control_item_id',
					type : 'int'
				}, {
					name : 'control_item_name',
					type : 'string'
				}, {
					name : 'department_id',
					type : 'int'
				}, {
					name : 'department_name',
					type : 'String'
				}, {
					name : 'cont_feature',
					type : 'string'
				}, {
					name : 'plan_cost',
					type : 'int'
				}, {
					name : 'dynamic_expend',
					type : 'int'
				}, {
					name : 'cutting_down_expenditures_sum',
					type : 'int'
				}]
			// idProperty : 'control_item_id'
		});

	/*
	 * 部门Department模型
	 */
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
	/**
	 * ********************结束Modle定义 ********************
	 */

	/**
	 * ********************定义Stroe数据类型 ********************
	 */
	/*
	 * 定义ControlItemStore数据类型
	 */
	var controlItemStore = Ext.create('Ext.data.Store', {
				model : 'Control_item',
				pageSize : 10,
				proxy : {
					type : 'ajax',
					url : './ControlItemServlet',
					actionMethods : {
						read : 'POST'
					},
					extraParams : {
						action : "list",
						'department_id' : department_id
					},
					reader : {
						type : 'json',
						totalProperty : 'accountCount',
						root : 'accountList'
					}
				}
			});
	/*
	 * 定义departmentStore数据类型
	 */
	var departmentStore = Ext.create('Ext.data.Store', {
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

	/**
	 * ********************结束Stroe定义********************
	 */
	controlItemStore.on('beforeload', function(controlItemStore, options) {
				var keyWord = Ext.getCmp('KeyWord').getValue();
				var new_params = {
					searchText : keyWord
				};
				Ext.apply(controlItemStore.proxy.extraParams, new_params);
			});

	var grid = Ext.create('Ext.grid.GridPanel', {
		store : controlItemStore,
		id : 'myGridPanel',
		forceFit : true,
		frame : false,
		stripeRows : true,
		loadMask : true,
		tbar : [{
					xtype : 'label',
					text : '请输入关键词：'
				}, {
					xtype : 'textfield',
					id : 'KeyWord'
				}, {
					text : '搜索',
					handler : function() {
						var keyWord = Ext.getCmp('KeyWord').getValue();

						controlItemStore.load({
									params : {
										start : 0,
										limit : 10,
										foo : 'bar',
										searchText : keyWord

									}
								});
					}
				}, '->', {
					xtype : 'button',
					text : '新增',
					id : 'btnAdd',
					hidden : !userRole,
					handler : function() {
						controlItemFormPanel.getForm().reset();
						formAction = 'add';
						formWindow.setTitle('新增受控事项');
						formWindow.show();
					}

				}, '-', {
					xtype : 'button',
					text : '修改',
					id : 'btnUpdate',
					hidden : !userRole,
					listeners : {
						"click" : function(btn) {
							var data = grid.getSelectionModel();
							if (!data.hasSelection()) {
								Ext.MessageBox.alert("提示", "请先选择您要操作的行!");
								return;
							} else {
								// costExpendFormPanel.getForm().reset()
								formAction = 'update';
								formWindow.setTitle('修改公示项目')
								formWindow.show();
								// updateGrid();
							}
						}
					}
				}, '-', {
					xtype : 'button',
					text : '删除',
					id : 'btnDelet',
					hidden : !userRole,
					listeners : {
						"click" : function(btn) {

							delGrid();
						}
					}
				}],
		columns : [{
					xtype : "rownumberer",
					align : 'center',
					text : "序号",
					width : 50
				}, {
					header : '控制项目ID',
					dataIndex : 'control_item_id',
					sortable : true,
					hidden : true
				}, {
					header : '责任科室ID',
					dataIndex : 'department_id',
					sortable : true,
					hidden : true
				}, {
					header : '责任科室',
					dataIndex : 'department_name',
					sortable : true,
					hidden : true
				}, {
					header : '受控事项',
					dataIndex : 'control_item_name',
					sortable : true
				}, {
					header : '管控特征',
					dataIndex : 'cont_feature',
					sortable : true,
					renderer : function(value) {
						if (value == "敏感问题") {
							return "<a onclick='javascript:parent.openTabConstructionRepair(\"construction_repair.jsp\",\"construction_repair\")' >"
									+ value + "</a>";
						} else {
							return value;
						}
					}
				}, {
					header : '计划成本',
					dataIndex : 'plan_cost',
					hidden : true,
					sortable : true
				}, {
					header : '动态支出',
					dataIndex : 'dynamic_expend',
					sortable : true
				}, {
					header : '节支金额',
					dataIndex : 'cutting_down_expenditures_sum',
					sortable : true,
					hidden : true
				}],
		dockedItems : [{
					xtype : 'pagingtoolbar',
					dock : 'bottom',
					displayInfo : true,
					emptyMsg : "没有数据",
					displayMsg : "显示从{0}条数据到{1}条数据，共{2}条数据",
					store : controlItemStore
				}],
		renderTo : Ext.getBody()
	});
	grid.on('itemclick', function(view, record) {
				var form = controlItemFormPanel.getForm();
				// console.log(record.get('cost_expend_name')) ;
				form.loadRecord(record);
			});

	function delGrid() {
		var data = grid.getSelectionModel().getSelection()
		// alert(data );
		if (data.length == 0) {
			Ext.MessageBox.show({
				title : "提示",
				msg : "请先选择您要操作的行!"
					// icon: Ext.MessageBox.INFO
				});
			return;
		} else {
			Ext.Msg.confirm("请确认", "是否真的要删除数据？", function(button, text) {
				if (button == "yes") {
					var ids = [];
					Ext.Array.each(data, function(record) {
								var control_item_id = record
										.get('control_item_id');
								// 如果删除的是幻影数据，则id就不传递到后台了，直接在前台删除即可
								if (control_item_id) {
									ids.push(control_item_id);
								}

							});

					Ext.Ajax.request({
						url : './ControlItemServlet',
						params : {
							action : 'delete',
							control_item_id : ids.join(',')
						},
						method : 'POST',
						// timeout : 2000,//默认30秒
						success : function(response, opts) {

							// store.loadPage(1);

							var success = Ext.decode(response.responseText).success;
							// 当后台数据同步成功时
							if (success) {
								Ext.Array.each(data, function(record) {
											controlItemStore.remove(record);// 页面效果
										});
								Ext.MessageBox.alert('提示', '数据删除成功!');
							} else {
								Ext.MessageBox.alert('提示', '数据删除失败!');
							}

						}
					});
				}
			});

		}

	}

	var controlItemFormPanel = Ext.create("Ext.form.Panel", {
		autoHeight : true,
		width : '100%',
		bodyPadding : 10,
		border : false,
		defaults : {
			anchor : '100%',
			labelWidth : 100
		},
		items : [{
					xtype : "numberfield",
					name : "control_item_id",
					readOnly : true,
					hidden : true,
					fieldLabel : "控制项目ID"
				}, {
					xtype : "textfield",
					name : "control_item_name",
					fieldLabel : "受控事项"
				}, {
					xtype : 'combobox',
					fieldLabel : '责任科室',
					name : 'department_name',
					store : departmentStore,
					valueField : 'department_namne',
					displayField : 'department_name',
					typeAhead : true,
					queryMode : 'local',
					emptyText : '请选择部门...',
					allowBlank : false, // 是否允许空
					blankText : '不能为空，请选择有效信息',// 错误提示信息
					msgTarget : 'qtip', // 在该组件的下面显示错误提示信息
					// selectOnFocus : true,
					listeners : {
						select : function(combo, record, index) {
							var form = this.up('form').getForm();
							form.findField('department_id').setValue(record[0]
									.get('department_id'));
							form.findField('department_name')
									.setValue(record[0].get('department_name'));
							// alert(form.findField('department_name').getValue());
						}
					}

				}, {
					xtype : "hiddenfield",
					name : "department_id"
				}, {

					xtype : 'fieldset',
					flex : 1,
					title : '管控特征:',
					defaultType : 'checkbox', // each item will be
					// a checkbox
					layout : 'anchor',
					defaults : {
						anchor : '100%'// ,
						// hideEmptyLabel : false
					},
					items : [{
								boxLabel : '数量相对较多',
								name : 'count_quantity',
								inputValue : '数量相对较多'
							}, {
								boxLabel : '数额相对固定',
								name : 'amount_fixation',
								inputValue : '数额相对固定'
							}, {
								boxLabel : '支出较有规律',
								name : 'expend_law',
								inputValue : '支出较有规律'
							}]
				}, {
					xtype : "numberfield",
					name : "plan_cost",
					fieldLabel : "计划成本"
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
								method : 'POST',
								params : {
									'formJson' : Ext.JSON.encode(form
											.getValues()),
									'action' : formAction
								},
								waitTitle : '请稍后',
								waitMsg : '正在提交中...',
								url : "./ControlItemServlet",
								success : function(form, action) {
									grid.getStore().reload();
									form.reset();
									Ext.Msg.alert('Success', action.result.msg);

								},
								failure : function(form, action) {
									Ext.Msg.alert('Failed', action.result.msg);
								}
							});
							// 更新store内的数据
							// form.updateRecord(record);
							// controlItemStore.commitChanges();

						}

						formWindow.close();
					}

				}]

	});
	var formWindow = Ext.create("Ext.window.Window", {
				title : "",
				closeAction : "hide",// 设置该属性新增窗口关闭的时候是隐藏
				width : 400,
				// height : 300,
				items : controlItemFormPanel,
				layout : "fit"
			});

	var keyWord = Ext.getCmp('KeyWord').getValue();
	controlItemStore.load({
				params : {
					start : 0,
					limit : 10,
					foo : 'bar',
					searchText : keyWord
				}
			});

	/*
	 * 自动缩放表格
	 */
	Ext.EventManager.onWindowResize(function() {
				grid.getView().refresh()
			})
});