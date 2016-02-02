Ext.require(['*']);
var dateViewWindow;
var imageTpl;
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
				}, {
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

	var imagesStore = Ext.create('Ext.data.Store', {
				model : 'Image',
				data : [{
							src : './images/wsz.bmp',
							caption : ''
						}]
			});

	imageTpl = new Ext.XTemplate('<tpl for=".">',
			'<div style="margin-bottom: 10px;" class="thumb-wrap">',
			'<img src="{src}" />', '<br/><span>{caption}</span>', '</div>',
			'</tpl>');
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
							hidden : false,
							renderer : function(value) {

								return "<a onclick='javascript:openDateView("
										+ value.substring(3, 8) + ")' >"
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

	/*
	 * =================选中表格内容后赋值给相应的表单=================
	 */

	grid.on('itemclick', function(view, record) {
				var form = costExpendFormPanel.getForm();

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
								var cost_expend_id = record
										.get('cost_expend_id');
								// 如果删除的是幻影数据，则id就不传递到后台了，直接在前台删除即可
								if (cost_expend_id) {
									ids.push(cost_expend_id);
								}

							});
					// alert(ids.join(',')) ;
					Ext.Ajax.request({
						url : './CostExpendServlet?conItValue=del',
						params : {
							cost_expend_id : ids.join(',')
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
					xtype : "textfield",
					name : "specification",
					fieldLabel : "规格"
				}, {
					xtype : "numberfield",
					name : "count",
					fieldLabel : "数量"
				}, {
					xtype : "numberfield",
					name : "price",
					fieldLabel : "单价"
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
					name : "department_id"
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
								// headers : {
								// 'Content-Type' :
								// 'application/json;charset=utf-8'
								// },
								params : {
									'formJson' : Ext.JSON.encode(form
											.getValues()),
									'conItValue' : formAction
								},
								waitTitle : '请稍后',
								waitMsg : '正在提交中...',
								url : "./CostExpendServlet",
								success : function(form, action) {
									Ext.Msg.alert('Success', action.result.msg);
									grid.getStore().reload();
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

});

function openDateView(value) {
	dateViewWindow.show();

}