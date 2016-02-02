Ext.require(['*']);

Ext.onReady(function() {

	/**
	 * ********************定义Modle数据类型 ********************
	 */

	/*
	 * 部门成本支出模型(cost_expend)
	 */
	Ext.define('Cost_expend', {
		extend : 'Ext.data.Model',
		fields : [{
					name : 'cost_expend_id',
					type : 'int'
				}, {
					name : 'cost_expend_name',
					type : 'string'
				}, {
					name : 'specification',
					type : 'string'
				}, {
					name : 'price',
					type : 'int'
				}, {
					name : 'count',
					type : 'int'
				}, {
					name : 'sum',
					type : 'int'
				}, {
					name : 'providerd',
					type : 'string'
				}, {
					name : 'providerd_choose',
					type : 'string'
				}, {
					name : 'check_date',
					type : 'string'
				}, {
					name : 'details',
					type : 'string'
				}, {
					name : 'evaluation_message',
					type : 'string'
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
	 * 定义costExpendStore数据类型
	 */
	var costExpendStore = Ext.create('Ext.data.Store', {
				model : 'Cost_expend',
				pageSize : 10,
				proxy : {
					type : 'ajax',
					url : './CostExpendServlet?conItValue=' + tabid,
					actionMethods : {
						read : 'POST'
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
				data : Ext.decode(departmentJson)
			})

	/**
	 * ********************结束Stroe定义********************
	 */
	costExpendStore.on('beforeload', function(costExpendStore, options) {
				var keyWord = Ext.getCmp('KeyWord').getValue();
				var new_params = {
					searchText : keyWord
				};
				Ext.apply(costExpendStore.proxy.extraParams, new_params);
			});

	var grid = Ext.create('Ext.grid.GridPanel', {
				store : costExpendStore,
				id : 'myGridPanel',
				forceFit : true,
				// frame : true,
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

								costExpendStore.load({
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
							hidden : true ,
							handler : function() {
								addFormPanel.getForm().reset();
								addWindow.show();
							}

						}, {
							xtype : 'button',
							text : '修改',
							id : 'btnUpdate',
							hidden : true ,
							listeners : {
								"click" : function(btn) {
									updateFormPanel.getForm().reset()
									updateWindow.show();
									updateGrid();

								}
							}
						}, {
							xtype : 'button',
							text : '删除',
							id : 'btnDelet',
							hidden : true ,
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
							header : '成本支出ID',
							dataIndex : 'cost_expend_id',
							sortable : true,
							hidden : true
						}, {
							header : '成本支出名称',
							dataIndex : 'cost_expend_name',
							sortable : true,
							hidden : false
						}, {
							header : '规格',
							dataIndex : 'specification',
							sortable : true,
							hidden : false
						}, {
							header : '单价',
							dataIndex : 'price',
							align : 'center',
							sortable : true,
							hidden : false,
							width : 40
						}, {
							header : '数量',
							dataIndex : 'count',
							align : 'center',
							sortable : true,
							width : 40
						}, {
							header : '金额',
							dataIndex : 'sum',
							align : 'center',
							sortable : true,
							width : 60
						}, {
							header : '供应商',
							dataIndex : 'providerd',
							hidden : false,
							sortable : true
						}, {
							header : '供应商选择方式',
							dataIndex : 'providerd_choose',
							sortable : true
						}, {
							header : '点收日期',
							dataIndex : 'check_date',
							sortable : true,
							hidden : false
						}, {
							header : '详情查看',
							dataIndex : 'details',
							sortable : true,
							hidden : true ,
							renderer : function(value) {
								return "<a href='http://" + value
										+ "' target='_blank'>"
										+ value.substring(0, 2) + "</a>";
							}
						}, {
							header : '评价留言',
							dataIndex : 'evaluation_message',
							sortable : true,
							hidden : false,
							renderer : function(value) {
								console.log(value);
								return "<a href='http://" + webPath
										+ "message_board.jsp?costExpenID="
										+ value.substring(3, 8)
										+ " 'target=_blank'>"
										+ value.substring(0, 2) + "</a>";
							}
						}],
				dockedItems : [{
							xtype : 'pagingtoolbar',
							dock : 'bottom',
							displayInfo : true,
							emptyMsg : "没有数据",
							displayMsg : "显示从{0}条数据到{1}条数据，共{2}条数据",
							store : costExpendStore
						}],
				renderTo : Ext.getBody()
			});

	var addFormPanel = Ext.create("Ext.form.Panel", {
		layout : 'anchor',
		defaults : {
			anchor : '100%'
		},

		items : [{
					xtype : "numberfield",
					name : "control_item_id",
					fieldLabel : "控制项目ID",
					hidden : true
				}, {
					xtype : "textfield",
					name : "control_item_name",
					fieldLabel : "受控事项"
				}, {
					xtype : 'combobox',
					fieldLabel : '责任科室',
					name : 'department_id',
					store : departmentStore,
					valueField : 'department_id',
					displayField : 'department_name',
					typeAhead : true,
					queryMode : 'local',
					emptyText : '请选择部门...',
					allowBlank : false,// 是否允许空
					blankText : '不能为空，请选择有效信息',// 错误提示信息
					msgTarget : 'qtip',// 在该组件的下面显示错误提示信息
					selectOnFocus : true

				}, {
					xtype : "textfield",
					name : "department_name",
					fieldLabel : "责任科室名称",
					hidden : true
				}, {
					xtype : "textfield",
					name : "cont_feature",
					fieldLabel : "管控特征"
				}, {
					xtype : "numberfield",
					name : "plan_cost",
					fieldLabel : "计划成本"
				}, {
					xtype : "numberfield",
					name : "dynamic_expend",
					fieldLabel : "动态支出"
				}, {
					xtype : "numberfield",
					name : "cutting_down_expenditures_sum",
					fieldLabel : "节支金额"
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
								url : "./CostExpendServlet?conItValue=add",
								success : function(form, action) {

									Ext.Msg.alert('Success', action.result.msg);
									grid.getStore().reload();
								},
								failure : function(form, action) {
									Ext.Msg.alert('Failed', action.result.msg);
								}
							});

						}
						addWindow.close();

					}

				}]

	});

	// 新增窗口
	var addWindow = Ext.create("Ext.window.Window", {
				title : "公示项目评价",
				closeAction : "hide",
				border : 0,
				width : 600,
				height : 400,
				layout : "anchor",
				bodyPadding : 10,
				items : addFormPanel
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
								var cost_expend_id = record
										.get('control_item_id');
								// 如果删除的是幻影数据，则id就不传递到后台了，直接在前台删除即可
								if (cost_expend_id) {
									ids.push(cost_expend_id);
								}

							});

					Ext.Ajax.request({
						url : './CostExpendServlet?conItValue=del',
						params : {
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
											CostExpendStore.remove(record);// 页面效果
										});
								Ext.MessageBox.show({
											title : "提示",
											msg : "数据删除成功!"
										});
							} else {
								Ext.MessageBox.show({
									title : "提示",
									msg : "数据删除失败!"
										// icon: Ext.MessageBox.INFO
									});
							}

						}
					});
				}
			});

		}

	}

	var updateFormPanel = Ext.create("Ext.form.Panel", {
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
					name : 'department_id',
					store : costExpendStore,
					valueField : 'department_id',
					displayField : 'department_name',
					typeAhead : true,
					readOnly : true,// 控件不可修改
					queryMode : 'local',
					emptyText : '请选择部门...'

				}, {
					xtype : "textfield",
					name : "department_name",
					fieldLabel : "责任科室名称",
					hidden : true
				}, {
					xtype : "textfield",
					name : "cont_feature",
					fieldLabel : "管控特征"
				}, {
					xtype : "numberfield",
					name : "plan_cost",
					fieldLabel : "计划成本"
				}, {
					xtype : "numberfield",
					name : "dynamic_expend",
					fieldLabel : "动态支出"
				}, {
					xtype : "numberfield",
					name : "cutting_down_expenditures_sum",
					fieldLabel : "节支金额"
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
								url : "./ControlItemServlet?conItValue=update",
								success : function(form, action) {
									Ext.Msg.alert('Success', action.result.msg);
									// grid.getStore().reload();
								},
								failure : function(form, action) {
									Ext.Msg.alert('Failed', action.result.msg);
								}
							});
							// 更新store内的数据
							form.updateRecord(record);
							costExpendStore.commitChanges();

						}

						updateWindow.close();
					}

				}]

	});
	var updateWindow = Ext.create("Ext.window.Window", {
				title : "修改受控事项",
				closeAction : "hide",// 设置该属性新增窗口关闭的时候是隐藏
				width : 400,
				height : 400,
				items : updateFormPanel,
				layout : "fit"
			});

	function updateGrid() {
		var data = grid.getSelectionModel().getSelection()
		var form = updateFormPanel.getForm();

		if (data.length == 0) {
			updateWindow.close();
			Ext.MessageBox.alert("提示", "请先选择您要操作的行!");
			return;
		} else {
			// 把选择的grid行也就是store的的record.放在form里面
			form.loadRecord(data[0]);

		}
	}

	var keyWord = Ext.getCmp('KeyWord').getValue();
	costExpendStore.load({
				params : {
					start : 0,
					limit : 10,
					foo : 'bar',
					searchText : keyWord
				}
			});
});