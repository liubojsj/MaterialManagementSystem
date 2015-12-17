Ext.onReady(function() {
			var BodyH = document.documentElement.clientHeight;
			Ext.define('Bussiness', {
						extend : 'Ext.data.Model',
						fields : [{
									name : 'work_order_id',
									type : 'string'
								}, {
									name : 'facilities_id',
									type : 'string'
								}, {
									name : 'facilities_name',
									type : 'string'
								}, {
									name : 'user_department_name',
									type : 'string'
								}, {
									name : 'maintain_department_name',
									type : 'string'
								}, {
									name : 'maintain_personnel_name',
									type : 'string'
								}, {
									name : 'check_item',
									type : 'string'
								}, {
									name : 'failure_cause',
									type : 'string'
								}, {
									name : 'accessory',
									type : 'string'
								}, {
									name : 'maintain_data',
									type : 'string'
								}, {
									name : 'complete_status',
									type : 'string'
								}, {
									name : 'feedback_appraisement',
									type : 'string'
								}, {
									name : 'maintain_department_leader',
									type : 'string'
								}]
					});

			var store = Ext.create('Ext.data.Store', {
						model : 'Bussiness',
						pageSize : 10,
						proxy : {
							type : 'ajax',
							url : './js/wee_maintain_list.json',
							reader : {
								type : 'json',
								totalProperty : 'recordCount',
								root : 'recordList'
							}
						}
					});
			store.on('beforeload', function(store, options) {
						var keyWord = Ext.getCmp('KeyWord').getValue();
						var new_params = {
							searchText : keyWord
						};
						Ext.apply(store.proxy.extraParams, new_params);
					});
			var combostore = Ext.create('Ext.data.ArrayStore', {
						// store configs
						storeId : 'myStore',
						// reader configs
						fields : ['安技科','办公室','客运科','人事科','劳资科']
					});
			var combo = Ext.create('Ext.form.field.ComboBox', {
						hideLabel : true,
						store : ['百货大楼','华润万家','胜华批发','铁鑫商贸','路局招标'],
						displayField : 'state',
						typeAhead : true,
						queryMode : 'local',
						triggerAction : 'all',
						emptyText : '请选择供货商...',
						selectOnFocus : true,
						width : 135
					});
			var partcombo = Ext.create('Ext.form.field.ComboBox', {
						hideLabel : true,
						store : ['安技科', '客运科', '办公室', '计财科', '劳人科'],
						displayField : 'state',
						typeAhead : true,
						queryMode : 'local',
						triggerAction : 'all',
						emptyText : '请选择部门...',
						selectOnFocus : true,
						width : 135
					});

			var grid = Ext.create('Ext.grid.GridPanel', {
						store : store,
						id : 'myGridPanel',
						forceFit : true,
						frame : true,
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
										var keyWord = Ext.getCmp('KeyWord')
												.getValue();
										store.load({
													params : {
														start : 0,
														limit : 10,
														foo : 'bar',
														searchText : keyWord
													}
												});
									}
								},{xtype : 'label',
									text : '供应商：'}, combo,
									{xtype : 'label',
									text : '部门：'},partcombo],
						columns : [{
									header : '工单号',
									dataIndex : 'work_order_id',
									sortable : true
								}, {
									header : '设施编号',
									dataIndex : 'facilities_id',
									sortable : true
								}, {
									header : '设施名称',
									dataIndex : 'facilities_name',
									sortable : true
								}, {
									header : '使用部门',
									dataIndex : 'user_department_name',
									sortable : true
								}, {
									header : '维修部门',
									dataIndex : 'maintain_department_name',
									sortable : true
								}, {
									header : '维修人员',
									dataIndex : 'maintain_personnel_name',
									sortable : true
								}, {
									header : '检查项目',
									dataIndex : 'check_item',
									sortable : true
								}, {
									header : '故障原因',
									dataIndex : 'failure_cause',
									sortable : true
								}, {
									header : '更换配件',
									dataIndex : 'accessory',
									sortable : true
								}, {
									header : '维修日期',
									dataIndex : 'maintain_data',
									sortable : true
								}, {
									header : '完成情况',
									dataIndex : 'complete_status',
									sortable : true
								}, {
									header : '反馈评价',
									dataIndex : 'feedback_appraisement',
									sortable : true
								}, {
									header : '部门负责人',
									dataIndex : 'maintain_department_leader',
									sortable : true
								}],
						dockedItems : [{
									xtype : 'pagingtoolbar',
									dock : 'bottom',
									displayInfo : true,
									emptyMsg : "没有数据",
									displayMsg : "显示从{0}条数据到{1}条数据，共{2}条数据",
									store : store
								}],
						renderTo : Ext.getBody()
					});
			var keyWord = Ext.getCmp('KeyWord').getValue();
			store.load({
						params : {
							start : 0,
							limit : 10,
							foo : 'bar',
							searchText : keyWord
						}
					});
		});