Ext.onReady(function() {
    
    var form = Ext.create("Ext.form.Panel", {
    width: 800,
    height: 500,
    margin: 20,
    title: "添加物品",
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
                { xtype: "textfield", name: "accountnumber", fieldLabel: "名称", decimalPrecision: 0, vtype: "age" }
            ]
        },
        {
            xtype: "container",
            layout: "hbox",
            items: [
                { xtype: "textfield", name: "accountnumber", fieldLabel: "数量", allowBlank: false },
                { xtype: "textfield", name: "age", fieldLabel: "单价", decimalPrecision: 0, vtype: "time" }
            ]
        },
        {
            xtype: "container",
            layout: "hbox",
            items: [
                { xtype: "textfield", name: "accountnumber", fieldLabel: "金额", allowBlank: false },
                { xtype: "textfield", name: "age", fieldLabel: "入库时间", decimalPrecision: 0, vtype: "time" }
            ]
        },
        {
            xtype: "container",
            layout: "hbox",
            items: [
                { xtype: "textfield", name: "phone", fieldLabel: "供应商", allowBlank: false, emptyText: "请填入供应商" },
                { xtype: "textfield", name: "phone", fieldLabel: "供货方式", allowBlank: false, emptyText: "局供、地采" }
            ]
        },
        {
            xtype: "textareafield",
            name: "remark",
            fieldLabel: "备注",
            height: 50
        }
    ],
    buttons: [
        { xtype: "button", text: "保存" },
        { xtype: "button",text:"取消"}
    ]
});
    });
