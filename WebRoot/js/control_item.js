Ext.onReady(function() {
	// var BodyH = document.documentElement.clientHeight;
	// alert(tabid);
	Ext.define('control_item', {
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
						}],
						idProperty : 'control_item_id'
			});

	var store = Ext.create('Ext.data.Store', {
				model : 'control_item',
				pageSize : 10,
				proxy : {
					type : 'ajax',
					url : './ControlItemServlet?conItValue=' + tabid,
					reader : {
						type : 'json',
						totalProperty : 'accountCount',
						root : 'accountList'
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
	// var combo = Ext.create('Ext.form.field.ComboBox', {
	// hideLabel : true,
	// store : ['安技科', '客运科', '办公室', '计财科', '劳人科'],
	// displayField : 'state',
	// typeAhead : true,
	// queryMode : 'local',
	// triggerAction : 'all',
	// emptyText : '请选择部门...',
	// selectOnFocus : true,
	// width : 135
	// });

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
								var keyWord = Ext.getCmp('KeyWord').getValue();
								// alert(keyWord)
								store.load({
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
							listeners : {
								"click" : function(btn) {
									addFormPanel.getForm().reset();// 新增前清空表格内容
									addWindow.show();
								}
							}

						}, '-', {
							xtype : 'button',
							text : '修改',
							id : 'btnUpdate',
							listeners : {
								"click" : function(btn) {

									updateGrid();
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
						}
				// ,{xtype : 'label',
				// text : '部门：'}, combo
				],
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
							header : '责任科室',
							dataIndex : 'department_id',
							sortable : true,
							hidden : true
						}, {
							header : '受控事项',
							dataIndex : 'control_item_name',
							sortable : true
						}, {
							header : '管控特征',
							dataIndex : 'cont_feature',
							sortable : true
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
							store : store
						}],
				renderTo : Ext.getBody()
			});

	var addFormPanel = Ext.create("Ext.form.Panel", {
		items : [{
					xtype : "numberfield",
					name : "control_item_id",
					fieldLabel : "控制项目ID"
				}, {
					xtype : "textfield",
					name : "control_item_name",
					fieldLabel : "受控事项"
				}, {
					xtype : "textfield",
					name : "department_id",
					fieldLabel : "责任科室"

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
						var form = this.up('form').getForm();
						if (form.isValid()) {

							form.submit({
								url : "./ControlItemServlet?conItValue=add",
								success : function(form, action) {
									Ext.Msg.alert('Success', action.result.msg);
								},
								failure : function(form, action) {
									Ext.Msg.alert('Failed', action.result.msg);
								}
							});

						}
						addWindow.close();
						grid.getStore().reload();
					}

				}]

	});

	// 新增窗口
	var addWindow = Ext.create("Ext.window.Window", {
		title : "新增受控事项",
		closeAction : "hide",// 设置该属性新增窗口关闭的时候是隐藏
		width : 400,
		height : 400,
		items : addFormPanel,
		layout : "fit"
			// bbar : {
			// xtype : "toolbar",
			// items : [ {
			// xtype : "button",
			// text : "保存",
			// listeners : {
			// "click" : function(btn) {
			// var form = addFormPanel.getForm();
			// var control_item_idVal =
			// form.findField("control_item_id").getValue();
			// var control_item_nameVal =
			// form.findField("control_item_name").getValue();
			// var department_idVal =
			// form.findField("department_id").getValue();
			// var cont_featureVal = form.findField("cont_feature").getValue();
			// var plan_costVal = form.findField("plan_cost").getValue();
			// var dynamic_expendVal =
			// form.findField("dynamic_expend").getValue();
			// var cutting_down_expenditures_sumVal =
			// form.findField("cutting_down_expenditures_sum").getValue();
			// // Ext.Msg.alert("新增的数据", "{" + control_item_idVal + ":" +
			// control_item_nameVal + ":" + department_idVal + ":" +
			// cont_featureVal + ":"
			// // + plan_costVal + ":" + dynamic_expendVal + ":" +
			// cutting_down_expenditures_sumVal + "}");
			// var store = grid.getStore();
			// store.insert(0, {
			// control_item_id : control_item_idVal,
			// control_item_name : control_item_nameVal,
			// department_id : department_idVal,
			// cont_feature : cont_featureVal,
			// plan_cost : plan_costVal,
			// dynamic_expend : dynamic_expendVal,
			// cutting_down_expenditures_sum:cutting_down_expenditures_sumVal
			// });
			// btn.ownerCt.ownerCt.close();
			// }
			// }
			// }, {
			// xtype : "button",
			// text : "取消",
			// listeners : {
			// "click" : function(btn) {
			// btn.ownerCt.ownerCt.close();
			// }
			// }
			// } ]
			// }

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
								var control_item_id = record.get('control_item_id');
								// 如果删除的是幻影数据，则id就不传递到后台了，直接在前台删除即可
								if (control_item_id) {
									ids.push(control_item_id);
								}

							});

					Ext.Ajax.request({
						url : './ControlItemServlet?conItValue=del',
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
											store.remove(record);// 页面效果
										});
								Ext.MessageBox.show({
									title : "提示",
									msg : "数据删除成功!"});
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
	
//	function updateGri() {  
//        var records = store.getUpdatedRecords();// 获取修改的行的数据，无法获取幻影数据  
//        var phantoms=store.getNewRecords( ) ;//获得幻影行  
//        records=records.concat(phantoms);//将幻影数据与真实数据合并  
//        if (records.length == 0) {  
//            Ext.MessageBox.show({  
//                title : "提示",  
//                msg : "没有任何数据被修改过!"  
//                    // icon: Ext.MessageBox.INFO  
//                });  
//            return;  
//        } else {  
//            Ext.Msg.confirm("请确认", "是否真的要修改数据？", function(button, text) {  
//                if (button == "yes") {  
//                    var data = [];  
//                    // alert(records);  
//                    Ext.Array.each(records, function(record) {  
//                        data.push(record.data);  
//                            // record.commit();// 向store提交修改数据，页面效果  
//                        });  
//  
//                    Ext.Ajax.request({  
//                        url : 'alterUsers.action',  
//                        params : {  
//                            alterUsers : Ext.encode(data)  
//                        },  
//                        method : 'POST',  
//                        timeout : 2000,  
//  
//                        success : function(response, opts) {  
//                            var success = Ext.decode(response.responseText).success;  
//                            // 当后台数据同步成功时  
//                            if (success) {  
//                                Ext.Array.each(records, function(record) {  
//                                            // data.push(record.data);  
//                                            record.commit();// 向store提交修改数据，页面效果  
//                                        });  
//                            } else {  
//                                Ext.MessageBox.show({  
//                                    title : "提示",  
//                                    msg : "数据修改失败!"  
//                                        // icon: Ext.MessageBox.INFO  
//                                    });  
//                            }  
//                        }  
//                    });  
//                }  
//            });  
//  
//        }  
//  
//    }  
	var updateFormPanel = Ext.create("Ext.form.Panel", {
		items : [{
					xtype : "numberfield",
					name : "control_item_id",
					fieldLabel : "控制项目ID"
				}, {
					xtype : "textfield",
					name : "control_item_name",
					fieldLabel : "受控事项"
				}, {
					xtype : "textfield",
					name : "department_id",
					fieldLabel : "责任科室"

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
						var form = this.up('form').getForm();
						if (form.isValid()) {

							form.submit({
								url : "./ControlItemServlet?conItValue=add",
								success : function(form, action) {
									Ext.Msg.alert('Success', action.result.msg);
								},
								failure : function(form, action) {
									Ext.Msg.alert('Failed', action.result.msg);
								}
							});

						}
						addWindow.close();
						grid.getStore().reload();
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
		// alert(data );
		if (data.length == 0) {
			Ext.MessageBox.show({
				title : "提示",
				msg : "请先选择您要操作的行!"
					// icon: Ext.MessageBox.INFO
				});
			return;
		} else {
			Ext.Array.each(data, function(record) {
								var control_item_id = record.get('control_item_id');
								// 如果删除的是幻影数据，则id就不传递到后台了，直接在前台删除即可
								if (control_item_id) {
									ids.push(control_item_id);
								}

							})
		
			updateFormPanel.getForm().reset();// 新增前清空表格内容
			updateWindow.show();
		
		}
	}
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