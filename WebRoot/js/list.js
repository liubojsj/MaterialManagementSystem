Ext.onReady(function(){
	var BodyH = document.documentElement.clientHeight;
	Ext.define('Bussiness', {  
         extend: 'Ext.data.Model',  
         fields: [  
        	 {name: 'serialNumber',  type: 'string'},
             {name: 'userName',  type: 'string'},  
             {name: 'password',  type: 'string'},  
             {name: 'price',     type: 'string'},  
             {name: 'roleName',  type: 'string'},  
             {name: 'regitime',  type: 'string'},  
             {name: 'loginTime', type: 'string'},
             {name: 'supplyMode', type: 'string'} 
         ]  
     });  
	
	var store = Ext.create('Ext.data.Store',{            
          model: 'Bussiness',  
          pageSize:10,
          proxy:{  
          type: 'ajax',  
            url:'./js/user-data.json',  
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
            	{header:'序号',dataIndex:'serialNumber',sortable : true},
                {header:'名称',dataIndex:'userName',sortable : true},  
                {header:'数量',dataIndex:'password',sortable : true},
                {header:'单价',dataIndex:'price',sortable : true},
                {header:'金额',dataIndex:'roleName',sortable : true}, 
                {header:'入库时间',dataIndex:'regitime',sortable : true},  
                {header:'供应商',dataIndex:'loginTime',sortable : true},
                {header:'供货方式',dataIndex:'supplyMode',sortable : true}
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