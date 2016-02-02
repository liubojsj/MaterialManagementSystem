Ext.require(['*']);

Ext.onReady(function() {
	var formAction = '';
	/**
	 * ********************定义Modle数据类型 ********************
	 */

	/*
	 * 部门成本支出模型(cost_expend)
	 */
	Ext.define('construction_repair', {
		extend : 'Ext.data.Model',
		fields : [{
					name : 'construction_repair_id',
					type : 'int'
				}, {
					name : 'construction_repair_name',
					type : 'string'
				}, {
					name : 'money_source',
					type : 'string'
				}, {
					name : 'repair_cause',
					type : 'string'
				}, {
					name : 'repair_model',
					type : 'string'
				}, {
					name : 'repair_price',
					type : 'int'
				}, {
					name : 'build_company',
					type : 'String'
				}, {
					name : 'repair_permit',
					type : 'String'
				}, {
					name : 'build_company_choose',
					type : 'string'
				}, {
					name : 'complete_date',
					type : 'string'
				}, {
					name : 'check_price',
					type : 'int'
				}, {
					name : 'evaluation_message',
					type : 'string'
				}, {
					name : 'cooperation_partner',
					type : 'string'
				}]
			// idProperty : 'control_item_id'
		});

	/*
	 * ===============定义部门Department模型===============
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
	/*
	 * ===============结束定义部门Department模型===============
	 */

	/**
	 * ********************定义Stroe数据类型 ********************
	 */
	/*
	 * 定义costExpendStore数据类型
	 */
	var constructionRepairStore = Ext.create('Ext.data.Store', {
				model : 'construction_repair',
				pageSize : 10,
				proxy : {
					type : 'ajax',
					url : './ConstructionRepairServlet',
					actionMethods : {
						read : 'POST'
					},
					extraParams : {
						'action' : 'list'
					},
					reader : {
						type : 'json',
						totalProperty : 'count',
						root : 'list'
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
	/*
	 * ==================定义供应商选择模式==================
	 */
	var moneySourceStore = Ext.create('Ext.data.Store', {
				fields : ['moneySourceID', 'moneySourceName'],
				data : [{
							"moneySourceID" : "0",
							"moneySourceName" : "成本列支"
						}, {
							"moneySourceID" : "1",
							"moneySourceName" : "自主权设改"
						}, {
							"moneySourceID" : "2",
							"moneySourceName" : "更新"
						}, {
							"moneySourceID" : "3",
							"moneySourceName" : "路局设改项目"
						}]
			});

	var repairModelStore = Ext.create('Ext.data.Store', {
				fields : ['repairModelID', 'repairModelName'],
				data : [{
							"repairModelID" : "0",
							"repairModelName" : "自修自建"
						}, {
							"repairModelID" : "1",
							"repairModelName" : "自采轻包"
						}, {
							"repairModelID" : "2",
							"repairModelName" : "委外修建"
						}]
			});

	var buildCompanyChooseStore = Ext.create('Ext.data.Store', {
				fields : ['buildCompanyChooseID', 'buildCompanyChooseName'],
				data : [{
							"buildCompanyChooseID" : "1",
							"buildCompanyChooseName" : "招投标"
						}, {
							"buildCompanyChooseID" : "2",
							"buildCompanyChooseName" : "竞争性谈判"
						}, {
							"buildCompanyChooseID" : "3",
							"buildCompanyChooseName" : "特殊资质限定厂家"
						}, {
							"buildCompanyChooseID" : "4",
							"buildCompanyChooseName" : "定额核准战略合作伙伴承担"
						}]
			});
	/*
	 * /* ======================结束定义=========================
	 */
	/**
	 * ********************结束Stroe定义********************
	 */
	constructionRepairStore.on('beforeload', function(constructionRepairStore,
					options) {
				var keyWord = Ext.getCmp('KeyWord').getValue();
				var new_params = {
					searchText : keyWord

				};
				Ext
						.apply(constructionRepairStore.proxy.extraParams,
								new_params);
			});

	var grid = Ext.create('Ext.grid.GridPanel', {
				// title :'成 本 支 出 公 示',
				// titleAlign:'center' ,
				store : constructionRepairStore,
				forceFit : true,
				frame : false,
				stripeRows : true,
				loadMask : true,
				broder : false,
				bodyStyle : 'border-width:1px 0 1px 0;',
				bodyStyle : 'border-width:1px 0 0 0; background:transparent',

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

								constructionRepairStore.load({
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
							handler : function() {
								constructionRepairFormPanel.getForm().reset();
								formAction = 'add';
								formWindow.setTitle('新增基建维修项目');
								formWindow.show();
							}

						}, '-', {
							xtype : 'button',
							text : '修改',
							id : 'btnUpdate',
							listeners : {
								"click" : function(btn) {
									var data = grid.getSelectionModel();
									if (!data.hasSelection()) {
										Ext.MessageBox.alert("提示",
												"请先选择您要操作的行!");
										return;
									} else {
										// costExpendFormPanel.getForm().reset()
										formAction = 'update';
										formWindow.setTitle('修改基建维修项目')
										formWindow.show();
										// updateGrid();
									}
								}
							}
						}, '-', {
							xtype : 'button',
							text : '删除',
							id : 'btnDelet',
							listeners : {
								"click" : function(btn) {

									delGrid();
								}
							}
						}],
				// defaultType : { //没作用
				// align : 'center'
				// },
				columns : [{
							xtype : "rownumberer",

							text : "序号",
							width : 50
						}, {
							header : '基建维修ID',
							dataIndex : 'construction_repair_id',
							sortable : true,
							hidden : true
						}, {
							header : '项目名称',
							dataIndex : 'construction_repair_name',
							sortable : true,
							hidden : false
						}, {
							header : '款源支撑',
							dataIndex : 'money_source',
							sortable : true,
							hidden : false
						}, {
							header : '修建原因',
							dataIndex : 'repair_cause',
							align : 'center',
							sortable : true,
							hidden : false
						}, {
							header : '修建方式',
							dataIndex : 'repair_model',
							align : 'center',
							sortable : true
						}, {
							header : '修建造价',
							dataIndex : 'repair_price',
							align : 'center',
							sortable : true
						}, {
							header : '修建批准',
							dataIndex : 'repair_permit',
							align : 'center',
							sortable : true
						}, {
							header : '承建单位',
							dataIndex : 'build_company',
							hidden : false,
							sortable : true
						}, {
							header : '承建单位选择方式',
							dataIndex : 'build_company_choose',
							sortable : true
						}, {
							header : '完成日期',
							dataIndex : 'complete_date',
							sortable : true,
							hidden : false
						}, {
							header : '验工计价',
							dataIndex : 'check_price',
							sortable : true,
							hidden : false
						}, {
							header : '评价留言',
							dataIndex : 'evaluation_message',
							sortable : true,
							hidden : false,
							renderer : function(value) {
								return "<a href='http://" + webPath
										+ "message_board.jsp?constructionRepairID="
										+ value.substring(3, 8)
										+ " 'target=_blank'>"
										+ value.substring(0, 2) + "</a>";
							}
						}, {
							header : '合作伙伴备案',
							dataIndex : 'cooperation_partner',
							sortable : true,
							hidden : false
						}],
				dockedItems : [{
							xtype : 'pagingtoolbar',
							dock : 'bottom',
							displayInfo : true,
							emptyMsg : "没有数据",
							displayMsg : "显示从{0}条数据到{1}条数据，共{2}条数据",
							store : constructionRepairStore
						}],
				renderTo : Ext.getBody()
			});

	/*
	 * =================选中表格内容后赋值给相应的表单=================
	 */

	grid.on('itemclick', function(view, record) {
				var form = constructionRepairFormPanel.getForm();
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
								var construction_repair_id = record
										.get('construction_repair_id');
								// 如果删除的是幻影数据，则id就不传递到后台了，直接在前台删除即可
								if (construction_repair_id) {
									ids.push(construction_repair_id);
								}

							});

					Ext.Ajax.request({
						url : './ConstructionRepairServlet',
						params : {
							'action' : 'delete',
							'construction_repair_id' : ids.join(',')
						},
						method : 'POST',
						timeout : 2000,//默认30秒
						success : function(response, opts) {

							// store.loadPage(1);

							var success = Ext.decode(response.responseText).success;
							// 当后台数据同步成功时
							if (success) {
								Ext.Array.each(data, function(record) {
											constructionRepairStore.remove(record);// 页面效果
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

	var constructionRepairFormPanel = Ext.create("Ext.form.Panel", {
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
					name : "construction_repair_id",
					fieldLabel : "基建维修ID",
					hidden : true
				}, {
					xtype : "textfield",
					name : "construction_repair_name",
					fieldLabel : "项目名称"
				}, {
					xtype : 'combobox',
					fieldLabel : '款源支撑',
					name : 'money_source',
					store : moneySourceStore,
					valueField : 'moneySourceID', // 需要提交的值
					displayField : 'moneySourceName', // 显示的值
					typeAhead : true,
					queryMode : 'local',
					emptyText : '请选择...',
					allowBlank : false,// 是否允许空
					blankText : '不能为空，请选择有效信息',// 错误提示信息
					msgTarget : 'qtip',// 在该组件的下面显示错误提示信息
					selectOnFocus : true

				}, {
					xtype : "textfield",
					name : "repair_cause",
					fieldLabel : "修建原因"
				}, {
					xtype : 'combobox',
					fieldLabel : '修建方式',
					name : 'repair_model',
					store : repairModelStore,
					valueField : 'repairModelID', // 需要提交的值
					displayField : 'repairModelName', // 显示的值
					typeAhead : true,
					queryMode : 'local',
					emptyText : '请选择...',
					allowBlank : false,// 是否允许空
					blankText : '不能为空，请选择有效信息',// 错误提示信息
					msgTarget : 'qtip',// 在该组件的下面显示错误提示信息
					selectOnFocus : true

				}, {
					xtype : "numberfield",
					name : "repair_price",
					fieldLabel : "修建造价"
				}, {
					xtype : "textfield",
					name : "repair_permit",
					fieldLabel : "修建批准"
				}, {
					xtype : "textfield",
					name : "build_company",
					fieldLabel : "承建单位"
				}, {
					xtype : 'combobox',
					fieldLabel : '承建单位选择方式',
					name : 'build_company_choose',
					store : buildCompanyChooseStore,
					valueField : 'buildCompanyChooseID', // 需要提交的值
					displayField : 'buildCompanyChooseName', // 显示的值
					typeAhead : true,
					queryMode : 'local',
					emptyText : '请选择...',
					allowBlank : false,// 是否允许空
					blankText : '不能为空，请选择有效信息',// 错误提示信息
					msgTarget : 'qtip',// 在该组件的下面显示错误提示信息
					selectOnFocus : true

				}, {
					xtype : "datefield",
					name : "complete_date",
					fieldLabel : "完成日期"
				}, {
					xtype : "numberfield",
					name : "check_price",
					fieldLabel : "验工计价"
				}, {
					xtype : "textfield",
					name : "cooperation_partner",
					fieldLabel : "合作伙伴备案",
					hidden : false
				}, {
					xtype : "hiddenfield",
					name : "evaluation_message",
					value : "评价"
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
								url : "./ConstructionRepairServlet",
								success : function(form, action) {
									Ext.Msg.alert('Success', action.result.msg);
									grid.getStore().reload();
									// 更新store内的数据
									// form.updateRecord(record);
									// costExpendStore.commitChanges();
									form.reset();
								},
								failure : function(form, action) {
									Ext.Msg.alert('Failed', action.result.msg);
								}
							});

						}

						formWindow.close();
					}

				}]

	});

	var formWindow = Ext.create("Ext.window.Window", {
				title : '',
				closeAction : "hide",// 设置该属性新增窗口关闭的时候是隐藏
				width : 400,
				items : constructionRepairFormPanel,
				layout : "fit"
			});

	var keyWord = Ext.getCmp('KeyWord').getValue();
	constructionRepairStore.load({
				params : {
					start : 0,
					limit : 10,
					foo : 'bar',
					searchText : keyWord
				}
			});
});