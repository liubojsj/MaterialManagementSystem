Ext.require(['*']);
var dateViewWindow;
var imageTpl;
var imagesStore
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
					value = '<label ' + ' class="x-action-col-icon">' + value
							+ '</label>' // +
							// '<img role="button" src="'
					// + (me.icon || Ext.BLANK_IMAGE_URL) + '" class="'
					// + this.iconCls + ' x-action-col-icon"/>';
					return value;
				},

				processEvent : function(type, view, cell, recordIndex,
						cellIndex, e, record, row) {
					var me = this;
					if (type == 'click') {
						me.handler.call(me.scope || me.origScope || me, view,
								recordIndex, cellIndex, e, record, row);
					}
				}
			});

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
							name : 'product_id',
							type : 'int'
						}, {
							name : 'product_name',
							type : 'string'
						}, {
							name : 'department_id',
							type : 'int'
						}, {
							name : 'department_name',
							type : 'string'
						}, {
							name : 'control_item_id',
							type : 'int'
						}, {
							name : 'control_item_name',
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
						}],
				idProperty : 'cost_expend_id'
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

	Ext.define('Product', {
		extend : 'Ext.data.Model',
		fields : [{
					name : 'product_id',
					type : 'int'
				}, {
					name : 'control_item_id',
					type : 'int'
				}, {
					name : 'control_item_name',
					type : 'String'
				}, {
					name : 'product_name',
					type : 'string'
				}, {
					name : 'specification',
					type : 'string'
				}, {
					name : 'unit',
					type : 'string'
				}, {
					name : 'use_restriction',
					type : 'string'
				}, {
					name : 'manufacturer',
					type : 'string'
				}, {
					name : 'product_img',
					type : 'string'
				}]
			// idProperty : 'control_item_id'
		});
	Ext.define('Image', {
				extend : 'Ext.data.Model',
				fields : [{
							name : 'product_img',
							type : 'string'
						}, {
							name : 'product_name',
							type : 'string'
						}]
			});

	imagesStore = Ext.create('Ext.data.Store', {
				model : 'Image',
				proxy : {
					type : 'ajax',
					url : './ProductServlet',
					actionMethods : {
						read : 'POST'
					},
					reader : {
						type : 'json',
						// totalProperty : 'count',
						root : 'data'
					}
				},
				autoLoad : false
			});

	imageTpl = new Ext.XTemplate(
			'<tpl for=".">',
			'<div style="margin: 10px 20px;" class="thumb-wrap">',
			'<img src="./upload/images/{product_img}" style="width:150px;height:150px;"/>',
			'<br/><span>{product_name}</span>', '</div>', '</tpl>');
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
	var productStore = Ext.create('Ext.data.Store', {
				model : 'Product',
				// pageSize : 10,
				proxy : {
					type : 'ajax',
					url : './ProductServlet',
					actionMethods : {
						read : 'POST'
					},
					reader : {
						type : 'json',
						totalProperty : 'count',
						root : 'list'
					}
				},
				autoLoad : false
			});
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

	var costExpendGrid = Ext.create('Ext.grid.GridPanel', {
				// title :'成 本 支 出 公 示',
				// titleAlign:'center' ,
				store : costExpendStore,
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
						}, {
							header : '成本支出ID',
							dataIndex : 'cost_expend_id',
							sortable : true,
							hidden : true
						}, {
							header : '成本支出名称',
							dataIndex : 'cost_expend_name',
							sortable : true,
							width : 150
						}, {
							header : '物品名称',
							dataIndex : 'product_name',
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
							xtype : 'actiontextcolumn',
							stopSelection : false, // 点击按钮选中行
							align : 'center',
							dataIndex : 'evaluation_message',
							broder : true,
							floating : false,
							width : 50,
							text : '评价',
							// icon : 'images/pingjia.png',
							// iconCls :'background: url(images/pingjia.png)
							tooltip : '点击进入评价',
							handler : function(grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex);
								toMsg(rec.get('cost_expend_id'));
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

	var keyWord = Ext.getCmp('KeyWord').getValue();
	costExpendStore.load({
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
				costExpendGrid.getView().refresh()
			})

});

function toMsg(value) {
	window.open('http://' + webPath + "message_board.jsp?costExpenID=" + value);

}