Ext.require(['*']);

Ext.onReady(function() {
	var formAction = '';
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
				},{
					name : 'department_id',
					type : 'string'
				}, {
					name : 'department_name',
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
				}, {
					name : 'cooperation_partner',
					type : 'string'
				}],
			 idProperty : 'control_item_id'
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
	var costExpendStore = Ext.create('Ext.data.Store', {
				model : 'Cost_expend',
				pageSize : 10,
				proxy : {
					type : 'ajax',
					url : './CostExpendServlet',
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
	/*
	 * ==================定义供应商选择模式==================
	 */
	var providerdStore = Ext.create('Ext.data.Store', {
				fields : ['chooseId', 'chooseName'],
				data : [{
							"chooseId" : "0",
							"chooseName" : "多家竞价"
						}, {
							"chooseId" : "1",
							"chooseName" : "询价比价"
						}, {
							"chooseId" : "2",
							"chooseName" : "战略合作"
						}]
			});
	/*
	 * ======================结束定义=========================
	 */
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
				forceFit : true,
				frame : false,
				stripeRows : true,
				loadMask : true,
				broder :false ,
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

								costExpendStore.load({
											params : {

												start : 0,
												limit : 10,
												foo : 'bar',
												searchText : keyWord

											}
										});
							}
						}],
				columns : [{
							xtype : "rownumberer",
							align : 'center',
							text : "序号",
							width : 50
						},{
							header : '成本支出ID',
							dataIndex : 'cost_expend_id',
							sortable : true,
							hidden : true
						}, {
							header : '品名',
							dataIndex : 'cost_expend_name',
							sortable : true,
							hidden : false
						}, {
							header : '质量参数/规格',
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
							header : '应用限制说明',
							dataIndex : 'providerd',
							hidden : false,
							sortable : true
						},{
							header : '需求部门',
							dataIndex : 'providerd',
							hidden : false,
							sortable : true
						},{
							header : '需求提报日期',
							dataIndex : 'providerd',
							hidden : false,
							sortable : true
						},{
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
							hidden : false,
							renderer : function(value) {

								return "<a href='http://" + value
										+ "' target='_blank'>"
										+ value.substring(0, 2) + "</a>";
							}
						}, {
							header : '合作伙伴备案',
							dataIndex : 'cooperation_partner',
							sortable : true
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