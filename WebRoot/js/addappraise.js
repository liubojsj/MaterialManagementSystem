Ext.onReady(function() {
    
    var form = Ext.create("Ext.form.Panel", {
    width: 500,
    height: 300,
    margin: 20,
    title: "添加评价",
    renderTo: Ext.getBody(),
    collapsible: false,  //可折叠
    autoScroll: true,   //自动创建滚动条
    defaultType: 'textfield',
    defaults: {
        anchor: '100%'
    },
    fieldDefaults: {
        labelWidth: 80,
        labelAlign: "left",
        flex: 1,
        margin: 5
    },
    items: [
        {
            xtype: "container",
            layout: "hbox",
            items: [
                { xtype: "textfield", name: "sn", fieldLabel: "序号", allowBlank: false },
                { xtype: "textfield", name: "accountnumber", fieldLabel: "品名", decimalPrecision: 0, vtype: "age" }
            ]
        },
        {
            xtype: "container",
            layout: "hbox",
            items: [
                { xtype: "textfield", name: "accountnumber", fieldLabel: "采购部门", allowBlank: false },
                { xtype: "textfield", name: "age", fieldLabel: "使用部门", decimalPrecision: 0, vtype: "time" }
            ]
        },
        {
            xtype: "textareafield",
            name: "remark",
            fieldLabel: "评价内容",
            height: 50
        }
    ],
    buttons: [
        { xtype: "button", text: "保存" },
        { xtype: "button",text:"取消"}
    ]
});
    });
