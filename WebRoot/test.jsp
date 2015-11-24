<%@ page language="java" pageEncoding="UTF-8"%>
<html>
    <head>
 
        <title>Accordion布局菜单</title>
        <link rel="stylesheet" type="text/css" href="ExtJS4.2.1/resources/css/ext-all.css">
		<script type="text/javascript" src="ExtJS4.2.1/bootstrap.js"></script>
		<script type="text/javascript" src="ExtJS4.2.1/locale/ext-lang-zh_CN.js"></script>
		
        <style type="text/css">
            .icon-accordion{
                background-image: url(/Accordion/images/accordion.gif) !important;
            }
            .icon-panel{
                background-image: url(/Accordion/images/panel.png) !important;
            }
        </style>
        <script type="text/javascript">
        var ajax = function(config) { //封装、简化AJAX
            Ext.Ajax.request({
                url : config.url, //请求地址
                params : config.params, //请求参数
                method : 'post', //方法
                callback : function(options, success, response) {
                    config.callback(Ext.JSON.decode(response.responseText));
                    //调用回调函数
                }
            });
            return false;
        };
        Ext.onReady(function() {
            var win = Ext.create("Ext.window.Window", {
                title : "Accordion布局动态菜单",
                width : 300,
                height : 500,
                iconCls : "icon-accordion",
                autoScroll : false,
                layout : 'accordion',
                layoutConfig : {
                    animate : true
                }
            });
            win.show();
            ajax({
                url : "/Accordion/accordion",//获取面板的地址
                params : {
                    action : "list"
                },
                callback : addTree
            });
            function addTree(data){
                for ( var i = 0; i < data.length; i++) {
                    win.add(Ext.create("Ext.tree.Panel", {
                        title : data[i].title,
                        iconCls : data[i].iconCls,
                        autoScroll : true,
                        rootVisible : false,
                        viewConfig : {
                            loadingText : "正在加载..."
                        },
                        store : createStore(data[i].id),
                        listeners : {
                            afterlayout : function(){
                                if(this.getView().el){
                                    var el = this.getView().el;
                                    var table = el.down("table.x-grid-table");
                                    if(table){
                                        table.setWidth(el.getWidth());
                                    }
                                }
                            }
                        }
                    }));
                    win.doLayout();
                     
                }
            }
            var model = Ext.define("TreeModel", { //定义树节点数据模型
                extend : "Ext.data.Model",
                fields : [ {name : "id",type : "string"},
                           {name : "text",type : "string"}, 
                           {name : "iconCls",type : "string"}, 
                           {name : "leaf",type : "boolean"} 
                         ]
            });
           var createStore  =  function(id){ //创建树面板数据源
               var me = this;
               return Ext.create("Ext.data.TreeStore",{
                   defaultRootId : id, //默认的根节点id
                   model : model,
                   proxy : {
                       type : "ajax", //获取方式
                       url : "/Accordion/accordion?action=node" //获取树节点的地址
                   },
                   clearOnLoad : true,
                   nodeParam : "id"//设置传递给后台的参数名,值是树节点的id属性
               });
           };
        });
</script>
    </head>
    <body>
    </body>
</html>