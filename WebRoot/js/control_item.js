Ext.require(['*']);
var formAction = '';
Ext.onReady(function() {
	var iWidth = Ext.get('pageSize').getWidth();
	var iHeight = Ext.get('pageSize').getHeight();
	var rowNum = Math.floor((iHeight -120)/18) ;
	
//	console.log(rowNum) ;
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
				pageSize : rowNum,
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
		layout : 'fit',
		// autoheight:true ,
		height : iHeight-110,
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
		renderTo : 'pageSize'
	});
	// Ext.create('Ext.Panel', {
	// renderTo : 'page',
	// border : false,
	// id : 'pnmrg',
	// layout : 'fit',
	// // autoheight :true ,
	// height : '100%',
	// items : [grid]
	// });
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