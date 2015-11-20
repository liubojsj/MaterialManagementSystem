Ext.onReady(function(){
	var BodyH = document.documentElement.clientHeight;
	Ext.define('account', {  
         extend: 'Ext.data.Model',  
         fields: [  
             {name: 'serialNumber',  type: 'string'},  
             {name: 'accountNumber',  type: 'string'},  
             {name: 'accountName',     type: 'string'},  
             {name: 'usedepartment',  type: 'string'},  
             {name: 'classificationName',  type: 'string'},  
             {name: 'registerTime', type: 'string'} 
         ]  
     });  
	
	var store = Ext.create('Ext.data.Store',{            
          model: 'account',  
          pageSize:10,
          proxy:{  
          type: 'ajax',  
            url:'./js/appraise-data.json',  
            reader:{  
                type:'json',  
                totalProperty:'accountCount',    
                root:'accountList'              
            }                
          }  
	});   
    store.on('beforeload', function (store, options) {    
        var keyWord=Ext.getCmp('KeyWord').getValue();  
        var new_params = { searchText:keyWord };    
        Ext.apply(store.proxy.extraParams, new_params);    
    }); 

	var grid = Ext.create('Ext.grid.GridPanel',{
		store: store,  
        id:'myGridPanel',  
        forceFit : true,  
        frame: true, 
        stripeRows:true,
        loadMask : true,
        tbar: [{xtype:'label',text:'请输入关键词：'},  
               {xtype:'textfield',id:'KeyWord'},  
               {text:'搜索',handler:function(){  
                    var keyWord = Ext.getCmp('KeyWord').getValue();  
                    store.load({params:{start:0,limit:10,foo:'bar',searchText:keyWord}});  
                    }  
                }  
            ],columns: [  
                {header:'序号',dataIndex:'serialNumber',sortable : true},  
                {header:'品名',dataIndex:'accountNumber',sortable : true},
                {header:'采购部门',dataIndex:'accountName',sortable : true},
                {header:'使用部门',dataIndex:'usedepartment',sortable : true}, 
                {header:'评价',dataIndex:'classificationName',sortable : true},  
                {header:'评价时间',dataIndex:'registerTime',sortable : true}
            ],dockedItems:[{
	            xtype: 'pagingtoolbar',  
	            dock: 'bottom',  
	            displayInfo: true, 
	            emptyMsg:"没有数据",  
	            displayMsg:"显示从{0}条数据到{1}条数据，共{2}条数据",  
	            store:store  
	         }],  
	         renderTo: Ext.getBody() 
	});
	var keyWord=Ext.getCmp('KeyWord').getValue();  
    store.load({params:{start:0,limit:10,foo:'bar',searchText:keyWord}}); 
});