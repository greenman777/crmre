Ext.define('CRMRE.view.Regulations', {
    extend: 'Ext.window.Window',
    xtype: 'appRegulations',
    modal : true,
    width:500,
    title: 'Список нормативных документов',
    initComponent: function() {
        this.items = [
        {
        	xtype: 'grid',
        	autoScroll: true,
        	height: 300,
        	store: this.getStoreDocuments().load(),
        	columns: [
      			{xtype:'rownumberer',width:30},
            	{
					header: 'Имя файла', dataIndex: 'name', flex: 1
				},{
            		header: 'Файл',
            		dataIndex: 'file',
					width: 50,
            		renderer:function(v){
            			return '<a href="'+v+'" target="_blank"><img src="/static/images/regulations_small.png"></a>';
            		}
            	}
            ]
        }],
        this.buttons = [{
        	text: 'Выход',
            handler: function () { this.up('window').close(); }
        }];
        this.callParent(arguments);
    },
    getStoreDocuments: function() {
    	store = Ext.create('CRMRE.store.Regulations');
    	return store;
    }
});