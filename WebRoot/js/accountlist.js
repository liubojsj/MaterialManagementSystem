Ext.onReady(function(){
	var BodyH = document.documentElement.clientHeight;
	Ext.define('Bussiness', {  
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
          model: 'Bussiness',  
          pageSize:10,
          proxy:{  
          type: 'ajax',  
            url:'./js/account-data.json',  
            reader:{  
                type:'json',  
                totalProperty:'recordCount',    
                root:'recordList'              
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
                {header:'序号',dataIndex:'userName',sortable : true},  
                {header:'科目号',dataIndex:'password',sortable : true},
                {header:'科目名称',dataIndex:'price',sortable : true},
                {header:'使用部门',dataIndex:'roleName',sortable : true}, 
                {header:'类别',dataIndex:'regitime',sortable : true},  
                {header:'启用期间',dataIndex:'loginTime',sortable : true}
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