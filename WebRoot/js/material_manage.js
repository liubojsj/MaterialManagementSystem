Ext.require(['*']);
var dateViewWindow;
var imageTpl;
Ext.onReady(function() {
	var formAction = '';
	console.log(department_id);

	/**
	 * ********************定义Modle数据类型 ********************
	 */

	/*
	 * 部门成本支出模型(cost_expend)
	 */
	Ext.define('Product', {
		extend : 'Ext.data.Model',
		fields : [{
					name : 'product_id',
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

	/*
	 * ===============定义受控事项模型===============
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
	 * ===============定义图例模型===============
	 */
	Ext.define('Image', {
				extend : 'Ext.data.Model',
				fields : [{
							name : 'src',
							type : 'string'
						}, {
							name : 'caption',
							type : 'string'
						}]
			});

	imageTpl = new Ext.XTemplate('<tpl for=".">',
			'<div style="margin-bottom: 10px;" class="thumb-wrap">',
			'<img src="{src}" />', '<br/><span>{caption}</span>', '</div>',
			'</tpl>');

	/**
	 * ********************定义Stroe数据类型 ********************
	 */

	/*
	 * 定义图例数据类型
	 */
	var imagesStore = Ext.create('Ext.data.Store', {
				model : 'Image',
				data : [{
							src : './images/wsz.bmp',
							caption : ''
						}]
			});
	/*
	 * 定义costExpendStore数据类型
	 */
	var productStore = Ext.create('Ext.data.Store', {
				model : 'Product',
				pageSize : 10,
				proxy : {
					type : 'ajax',
					url : './ProductServlet',
					actionMethods : {
						read : 'POST'
					},
					extraParams : {
						action : "getAll" 
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
	 * 定义ControlItemStore数据类型
	 */
	var controlItemStore = Ext.create('Ext.data.Store', {
				model : 'Control_item',
				// pageSize : 10,
				proxy : {
					type : 'ajax',
					url : './ControlItemServlet',
					actionMethods : {
						read : 'POST'
					},
					reader : {
						type : 'json',
						totalProperty : 'accountCount',
						root : 'accountList'
					}
				},
				autoLoad : false
			});
	/**
	 * ********************结束Stroe定义********************
	 */
	productStore.on('beforeload', function(productStore, options) {
				var keyWord = Ext.getCmp('KeyWord').getValue();
				var new_params = {
					searchText : keyWord,
					department_id:department_id

				};
				Ext.apply(productStore.proxy.extraParams, new_params);
			});

	var grid = Ext.create('Ext.grid.GridPanel', {
				// title :'成 本 支 出 公 示',
				// titleAlign:'center' ,
				store : productStore,
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

								productStore.load({
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
								productFormPanel.getForm().reset();
								formAction = 'add';
								formWindow.setTitle('新增物资');
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
										Ext.MessageBox.alert("提示",
												"请先选择您要操作的行!");
										return;
									} else {
										// costExpendFormPanel.getForm().reset()
										formAction = 'update';
										formWindow.setTitle('修改物资')
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
							header : '编号',
							dataIndex : 'product_id',
							sortable : true,
							hidden : true
						}, {
							header : '所属事项',
							dataIndex : 'control_item_name',
							sortable : true,
							hidden : false
						}, {
							header : '品牌名称',
							dataIndex : 'product_name',
							sortable : true,
							hidden : false
						}, {
							header : '规格',
							dataIndex : 'specification',
							align : 'center',
							sortable : true,
							hidden : false,
							width : 40
						}, {
							header : '单位',
							dataIndex : 'unit',
							align : 'center',
							sortable : true,
							width : 40
						}, {
							header : '应用限制',
							dataIndex : 'use_restriction',
							align : 'center',
							sortable : true,
							width : 60
						}, {
							header : '制造商',
							dataIndex : 'manufacturer',
							hidden : false,
							sortable : true
						}, {
							header : '图片',
							dataIndex : 'product_img',
							sortable : true
						}],
				dockedItems : [{
							xtype : 'pagingtoolbar',
							dock : 'bottom',
							displayInfo : true,
							emptyMsg : "没有数据",
							displayMsg : "显示从{0}条数据到{1}条数据，共{2}条数据",
							store : productStore
						}],
				renderTo : Ext.getBody()
			});

	/*
	 * =================选中表格内容后赋值给相应的表单=================
	 */

	grid.on('itemclick', function(view, record) {
				var form = productFormPanel.getForm();

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
								var product_id = record.get('product_id');
								// 如果删除的是幻影数据，则id就不传递到后台了，直接在前台删除即可
								if (product_id) {
									ids.push(product_id);
								}

							});
					// alert(ids.join(',')) ;
					Ext.Ajax.request({
						url : './ProductServlet',
						params : {
							product_id : ids.join(','),
							action : "delete"
						},
						method : 'POST',
						// timeout : 2000,//默认30秒
						success : function(response, opts) {

							// store.loadPage(1);

							var success = Ext.decode(response.responseText).success;
							// 当后台数据同步成功时
							if (success) {
								Ext.Array.each(data, function(record) {
											productStore.remove(record);// 页面效果
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
	var fileUploadFormPanel = Ext.create("Ext.form.Panel", {
				autoHeight : true,
				width : '100%',
				border : false,
				defaults : {
					anchor : '100%',
					labelWidth : 100
				},
				defaultType : "textfield",
				items : [{
					xtype : 'filefield',

					emptyText : '请选择图片...',
					fieldLabel : '产品图片',
					name : 'file',
					buttonText : '浏览...',
					listeners : {
						change : function(filefield, value, eOpts) {
							var form = this.up('form').getForm();
							if (form.isValid()) {
								form.submit({
											// params : {
											// 'action' : 'upload'
											// },
											waitTitle : '请稍后',
											waitMsg : '正在上传图片...',
											timeout : 2000,
											url : "./UploadServlet",
											method : "POST",
											success : function(form, action) {
												productFormPanel
														.getForm()
														.findField("product_img")
														.setValue(action.result.data);
												form.findField("file")
														.setRawValue("已上传");
												Ext.Msg.alert('成功',
														action.result.msg);

											},
											failure : function(form, action) {
												Ext.Msg.alert('失败',
														action.result.msg);
											}
										});

							}

						}
					}
				}]
			})

	var productFormPanel = Ext.create("Ext.form.Panel", {
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
							name : "product_id",
							fieldLabel : "编号",
							hidden : true
						}, {
							xtype : "textfield",
							name : "product_name",
							fieldLabel : "名称"
						}, {
							xtype : "textfield",
							name : "specification",
							fieldLabel : "规格"
						}, {
							xtype : "textfield",
							name : "unit",
							fieldLabel : "单位"
						}, {
							xtype : "textfield",
							name : "use_restriction",
							fieldLabel : "应用限制"
						}, {
							xtype : "textfield",
							name : "manufacturer",
							fieldLabel : "制造商"
						}, fileUploadFormPanel, {
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
							listeners : {
								select : function(combo, record, index) {
									var form = this.up('form').getForm();
									form.findField('department_name')
											.setValue(record[0]
													.get('department_name'));
									// form.findField('department_name')
									// .setValue(record[0].get('department_name'));
									var conitem = Ext.getCmp('control_item_id');
									conitem.clearValue();
									conitem.store.load({
												params : {
													action : 'list',
													department_id : combo
															.getValue()

												}
											});
								}
							}
						}, {
							xtype : 'combobox',
							fieldLabel : '受控事项名称',
							id : 'control_item_id',
							name : 'control_item_id',
							store : controlItemStore,
							valueField : 'control_item_id', // 需要提交的值
							displayField : 'control_item_name', // 显示的值
							typeAhead : true,
							queryMode : 'local',
							emptyText : '请选择...',
							allowBlank : false,// 是否允许空
							blankText : '不能为空，请选择有效信息',// 错误提示信息
							msgTarget : 'qtip',// 在该组件的下面显示错误提示信息
							selectOnFocus : true,
							listeners : {
								select : function(combo, record, index) {
									var form = this.up('form').getForm();
									form.findField('control_item_name')
											.setValue(record[0]
													.get('control_item_name'));
								
											
								}
							}

						}, {
							xtype : "hiddenfield",
							name : "department_name"
							// 隐藏域传参数
					}	, {
							xtype : "hiddenfield",
							name : "product_img"
							// 隐藏域传参数
					}	, {
							xtype : "hiddenfield",
							name : "control_item_name"
							// 隐藏域传参数
					}],
				buttons : [{
							text : '重置',
							handler : function() {
								this.up('form').getForm().reset();
							}
						}, {
							text : '提交',
							formBind : true, // only enabled once the form is
							// valid
							disabled : true,
							handler : function() {
								var form = productFormPanel.getForm();
								if (form.isValid()) {
									Ext.Ajax.request({
												params : {
													'formJson' : Ext.JSON
															.encode(form
																	.getValues()),
													'action' : formAction
												},
												waitTitle : '请稍后',
												waitMsg : '正在提交中...',
												timeout : 2000,
												url : "./ProductServlet",
												method : "POST",
												success : function(response,
														config) {
													// alert(config.url+","+config.method);
													Ext.Msg
															.alert(
																	"提示",
																	response.responseText);
													grid.getStore().reload();
													form.reset();
												},
												failure : function(form, action) {
													Ext.Msg
															.alert(
																	"提示",
																	response.responseText);
												}
											});

								}

								formWindow.close();
							}

						}]

			});
	var dataViewFormPanel = Ext.create("Ext.form.Panel", {
				autoHeight : true,
				width : '100%',
				bodyPadding : 10,
				border : false,
				defaults : {
					anchor : '100%',
					labelWidth : 100
				},
				items : [{
							xtype : "displayfield",
							name : "cost_expend_id",
							fieldLabel : "成本支出ID",
							hidden : true
						}, {
							xtype : "displayfield",
							name : "cost_expend_name",
							fieldLabel : "成本支出名称",
							value : "卫生纸"
						}, {
							xtype : "displayfield",
							name : "specification",
							fieldLabel : "产品编号:",
							value : "SY-003"
						}, {
							xtype : "displayfield",
							name : "specification",
							fieldLabel : "规格:",
							value : "10mm*1mm"
						}, {
							xtype : "displayfield",
							name : "count",
							fieldLabel : "数量",
							value : "20"
						}, {
							xtype : "displayfield",
							name : "price",
							fieldLabel : "单价",
							value : "2"
						}, {
							xtype : "displayfield",
							name : "sum",
							fieldLabel : "金额",
							value : "40"
						}, {
							xtype : "displayfield",
							name : "providerd",
							fieldLabel : "供应商",
							value : "八方购物广场"
						}, {
							xtype : "displayfield",
							name : "check_date",
							fieldLabel : "点收日期:",
							value : "2014-11-6"
						}, {
							xtype : "displayfield",
							name : "check_date",
							fieldLabel : "采购部门:",
							value : "综合科"
						}, {
							xtype : "displayfield",
							name : "check_date",
							fieldLabel : "使用部门:",
							value : "客运车间"
						}]

			});
	var formWindow = Ext.create("Ext.window.Window", {
				title : '',
				closeAction : "hide",// 设置该属性新增窗口关闭的时候是隐藏
				width : 400,
				// height : 400,
				items : [productFormPanel],
				layout : "anchor"
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
	productStore.load({
				params : {
					start : 0,
					limit : 10,
					foo : 'bar',
					searchText : keyWord
				}
			});

});

function openDateView(value) {
	dateViewWindow.show();

}