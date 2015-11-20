Ext.require(['*']);

Ext.onReady(function() {
var store = Ext.create('Ext.data.TreeStore', {
    root: {
        expanded: true,
        children: [
            { text: "detention", leaf: true },
            { text: "homework", expanded: true, children: [
                { text: "book report", leaf: true },
                { text: "algebra", leaf: true}
            ] },
            { text: "buy lottery tickets", leaf: true }
        ]
    }
});

Ext.create('Ext.tree.Panel', {
    title: 'Simple Tree',
    width: '100%',
    height: '100%',
    store: store,
    rootVisible: false,
    renderTo: Ext.getBody()
});
});