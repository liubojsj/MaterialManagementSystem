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
						}, '->', {
							xtype : 'button',
							text : '新增',
							id : 'btnAdd',
							hidden : !userRole,
							handler : function() {
								costExpendFormPanel.getForm().reset();
								formAction = 'add';
								formWindow.setTitle('新增公示项目');
								formWindow.show();
							}

						}, '-', {
							xtype : 'button',
							text : '修改',
							id : 'btnUpdate',
							hidden : !userRole,
							listeners : {
								"click" : function(btn) {
									var data = costExpendGrid
											.getSelectionModel();
									if (!data.hasSelection()) {
										Ext.MessageBox.alert("提示",
												"请先选择您要操作的行!");
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
							header : '品牌名称',
							dataIndex : 'product_name',
							sortable : true,
							hidden : false
						}, {
							header : '规格',
							dataIndex : 'specification',
							sortable : true,
							hidden : false
						}, {
							header : '单价(含税)',
							dataIndex : 'price',
							align : 'center',
							sortable : true,
							hidden : false,
							width : 60
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
							dataIndex : 'details',
							broder : true,
							floating : false,
							width : 50,
							text : '详情',
							// icon : 'images/pingjia.png',
							// iconCls :'background: url(images/pingjia.png)
							tooltip : '点击查看详情',
							handler : function(grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex);
								// alert("Edit " + rec.get('product_name'));
								openDateView(rec);
							}
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

	/*
	 * =================选中表格内容后赋值给相应的表单=================
	 */

	costExpendGrid.on('itemclick', function(view, record) {
				var form = costExpendFormPanel.getForm();
				// record = costExpendGrid.getSelectionModel()
				// .getLastSelected();
				// data = record.get('cost_expend_id');
				// console.log(data_cost_expend_id);
				// console.log(record.get('cost_expend_name')) ;
				form.loadRecord(record);
			});

	function delGrid() {
		var data = costExpendGrid.getSelectionModel().getSelection()
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
										.get('cost_expend_id');
								// 如果删除的是幻影数据，则id就不传递到后台了，直接在前台删除即可
								if (cost_expend_id) {
									ids.push(cost_expend_id);
								}

							});
					// alert(ids.join(',')) ;
					Ext.Ajax.request({
						url : './CostExpendServlet',
						params : {
							cost_expend_id : ids.join(','),
							action : 'delete'
						},
						method : 'POST',
						// timeout : 2000,//默认30秒
						success : function(response, opts) {

							// store.loadPage(1);

							var success = Ext.decode(response.responseText).success;
							// 当后台数据同步成功时
							if (success) {
								Ext.Array.each(data, function(record) {
											costExpendStore.remove(record);// 页面效果
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

	var costExpendFormPanel = Ext.create("Ext.form.Panel", {
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
					name : "cost_expend_id",
					fieldLabel : "成本支出ID",
					hidden : true
				}, {
					xtype : "textfield",
					name : "cost_expend_name",
					fieldLabel : "成本支出名称"
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
					allowBlank : false, // 是否允许空
					blankText : '不能为空，请选择有效信息',// 错误提示信息
					msgTarget : 'qtip', // 在该组件的下面显示错误提示信息
					// selectOnFocus : true,
					listeners : {
						select : function(combo, record, index) {
							var form = this.up('form').getForm();
							form.findField('department_name')
									.setValue(record[0].get('department_name'));
							var conitem = Ext.getCmp('product_id');
							conitem.clearValue();
							conitem.store.load({
										params : {
											action : 'combox_list',
											department_id : combo.getValue()

										}
									});
						}
					}
				},{
					xtype : 'combobox',
					fieldLabel : '物品名称',
					id : 'product_id',
					name : 'product_id',
					store : productStore,
					valueField : 'product_id',
					displayField : 'product_name',
					typeAhead : true,
					queryMode : 'local',
					emptyText : '请选择物品...',
					allowBlank : false, // 是否允许空
					blankText : '不能为空，请选择有效信息',// 错误提示信息
					msgTarget : 'qtip', // 在该组件的下面显示错误提示信息
					selectOnFocus : true,
					listeners : {
						select : function(combo, record, index) {
							var form = this.up('form').getForm();
							form.findField('specification').setValue(record[0]
									.get('specification'));
							form.findField('product_name').setValue(record[0]
									.get('product_name'));
							form.findField('control_item_id')
									.setValue(record[0].get('control_item_id'));
							form.findField('control_item_name')
									.setValue(record[0]
											.get('control_item_name'));
							// alert(form.findField('department_name').getValue());
						}
					}
				}, {
					xtype : "textfield",
					name : "specification",
					fieldLabel : "规格"
				}, {
					xtype : "numberfield",
					name : "count",
					fieldLabel : "数量",
					listeners : {
						change : function(field, value) {
							var form = this.up('form').getForm();
							var count = value;
							form.findField('sum').setValue(count
									* form.findField('price').value);
							// value = parseInt(value, 10);
							// field.setValue(value + value % 2);
						}
					}
				}, {
					xtype : "numberfield",
					name : "price",
					fieldLabel : "单价",
					listeners : {
						change : function(field, value) {
							var form = this.up('form').getForm();
							var price = value;
							form.findField('sum').setValue(price
									* form.findField('count').value);
							// value = parseInt(value, 10);
							// field.setValue(value + value % 2);
						}
					}
				}, {
					xtype : "numberfield",
					name : "sum",
					fieldLabel : "金额"
				}, {
					xtype : "textfield",
					name : "providerd",
					fieldLabel : "供应商"
				}, {
					xtype : 'combobox',
					fieldLabel : '供应商选择方式',
					name : 'providerd_choose',
					store : providerdStore,
					valueField : 'chooseName', // 需要提交的值
					displayField : 'chooseName', // 显示的值
					typeAhead : true,
					queryMode : 'local',
					emptyText : '请选择...',
					allowBlank : false,// 是否允许空
					blankText : '不能为空，请选择有效信息',// 错误提示信息
					msgTarget : 'qtip',// 在该组件的下面显示错误提示信息
					selectOnFocus : true

				},  {
					xtype : "datefield",
					name : "check_date",
					fieldLabel : "点收日期",
					hidden : false
				}, {
					xtype : "hiddenfield",
					name : "details",
					value : '详细'
				}, {
					xtype : "hiddenfield",
					name : "product_name"
				}, {
					xtype : "hiddenfield",
					name : "department_name"
				}, {
					xtype : "hiddenfield",
					name : "evaluation_message",
					value : "评价"
				}, {
					xtype : "hiddenfield",
					name : "control_item_id"
				}, {
					xtype : "hiddenfield",
					name : "control_item_name"
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
								// headers : {
								// 'Content-Type' :
								// 'application/json;charset=utf-8'
								// },
								params : {
									'formJson' : Ext.JSON.encode(form
											.getValues()),
									'action' : formAction
								},
								waitTitle : '请稍后',
								waitMsg : '正在提交中...',
								url : "./CostExpendServlet",
								success : function(form, action) {
									Ext.Msg.alert('Success', action.result.msg);
									costExpendGrid.getStore().reload();
									// 更新store内的数据
									// form.updateRecord(record);
									// costExpendStore.commitChanges();
									costExpendFormPanel.getForm().reset();
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
	var dataViewFormPanel = Ext.create("Ext.form.Panel", {
				id : 'dataViewFormPanel',
				autoHeight : true,
				width : '100%',
				// bodyPadding : 10,
				// margin :'10 10 10 10' ,
				border : false,
				layout : 'column',
				defaults : {
					layout : {
						type : 'vbox',
						align : 'stretch'
					},

					defaults : {
						anchor : '100%'
					}
				},
				items : [{
							columnWidth : .5,
							margin : '5 20 5 10',
							border : true,
							items : [{
										xtype : "displayfield",
										name : "cost_expend_id",
										fieldLabel : "成本支出ID",
										hidden : true
									}, {
										xtype : "displayfield",
										name : "cost_expend_name",
										fieldLabel : "成本支出名称"
									}, {
										xtype : "displayfield",
										name : "product_id",
										fieldLabel : "产品编号:"
									}, {
										xtype : "displayfield",
										name : "specification",
										fieldLabel : "规格:"
									}, {
										xtype : "displayfield",
										name : "count",
										fieldLabel : "数量"
									}, {
										xtype : "displayfield",
										name : "price",
										fieldLabel : "单价",
										renderer : function(value) {
											return value + '元';
										}
									}, {
										xtype : "displayfield",
										name : "sum",
										fieldLabel : "金额",
										renderer : function(value) {
											return value + '元';
										}
									}]
						}, {
							columnWidth : .5,
							margin : '5 10 5 20',
							border : true,
							items : [{
										xtype : "displayfield",
										name : "providerd",
										fieldLabel : "供应商"
									}, {
										xtype : "displayfield",
										name : "providerd_choose",
										fieldLabel : "供应商选择:"
									}, {
										xtype : "displayfield",
										name : "check_date",

										fieldLabel : "点收日期:"
									}, {
										xtype : "displayfield",
										name : "department_name",
										fieldLabel : "采购部门:"
									}, {
										xtype : "displayfield",
										name : "use_department",
										fieldLabel : "使用部门:"
									}]
						}]

			});
	var formWindow = Ext.create("Ext.window.Window", {
				title : '',
				closeAction : "hide",// 设置该属性新增窗口关闭的时候是隐藏
				width : 400,
				height : 400,
				items : costExpendFormPanel,
				layout : "fit"
			});

	var dataViewExt = Ext.create('Ext.view.View', {
				store : imagesStore,
				tpl : imageTpl,
				itemSelector : 'div.thumb-wrap',
				emptyText : 'No images available'
			});
	dateViewWindow = Ext.create("Ext.window.Window", {
				title : '公 示 详 情',
				closeAction : "hide",// 设置该属性新增窗口关闭的时候是隐藏
				width : 500,
				height : 500,
				constrain : true,
				modal : true,
				items : [dataViewExt, dataViewFormPanel],
				layout : "anchor"
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

function openDateView(record) {
	var form = Ext.getCmp('dataViewFormPanel').getForm();
	form.loadRecord(record);
	imagesStore.load({
				params : {
					action : 'img',
					product_id : record.get('product_id')

				}
			});
	dateViewWindow.show();

}
function toMsg(value) {
	window.open('http://' + webPath + "message_board_admin.jsp?costExpenID="
			+ value);

}