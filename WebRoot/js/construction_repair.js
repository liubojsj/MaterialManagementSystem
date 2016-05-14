Ext.require(['*']);

Ext.onReady(function() {
			var formAction = '';
			/**
			 * ********************定义Modle数据类型 ********************
			 */
			Ext.define('Ext.grid.column.Actiontextcolumn', {
						extend : 'Ext.grid.column.Column',
						alias : ['widget.actiontextcolumn'],
						// </locale>

						/**
						 * @cfg {Object} renderer
						 * @hide
						 */

						/**
						 * @cfg {Object} scope
						 * @hide
						 */

						defaultRenderer : function(value) {
							var me = this;
							prefix = Ext.baseCSSPrefix;
							scope = me.origScope || me;
							value = '<label ' + ' class="x-action-col-icon">'
									+ value + '</label>' // +
									// '<img role="button" src="'
							// + (me.icon || Ext.BLANK_IMAGE_URL) + '" class="'
							// + this.iconCls + ' x-action-col-icon"/>';
							return value;
						},

						processEvent : function(type, view, cell, recordIndex,
								cellIndex, e, record, row) {
							var me = this;
							if (type == 'click') {
								me.handler.call(me.scope || me.origScope || me,
										view, recordIndex, cellIndex, e,
										record, row);
							}
						}
					});
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
						fields : ['buildCompanyChooseID',
								'buildCompanyChooseName'],
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
			constructionRepairStore.on('beforeload', function(
							constructionRepairStore, options) {
						var keyWord = Ext.getCmp('KeyWord').getValue();
						var new_params = {
							searchText : keyWord

						};
						Ext.apply(constructionRepairStore.proxy.extraParams,
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
										var keyWord = Ext.getCmp('KeyWord')
												.getValue();

										constructionRepairStore.load({
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
									xtype : 'actiontextcolumn',
									stopSelection : false, // 点击按钮选中行
									align : 'center',
									dataIndex : 'evaluation_message',
									broder : true,
									floating : false,
									width : 50,
									text : '评价',
									// icon : 'images/pingjia.png',
									// iconCls :'background:
									// url(images/pingjia.png)
									tooltip : '点击进入评价',
									handler : function(grid, rowIndex, colIndex) {
										var rec = grid.getStore()
												.getAt(rowIndex);
										toMsg(rec.get('construction_repair_id'));
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

			var keyWord = Ext.getCmp('KeyWord').getValue();
			constructionRepairStore.load({
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

function toMsg(value) {
	window.open('http://' + webPath
			+ "construction_repair_message_board.jsp?constructionRepairID="
			+ value);

}