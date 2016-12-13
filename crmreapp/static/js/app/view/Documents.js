Ext.define('CRMRE.view.Documents', {
    extend: 'Ext.window.Window',
    xtype: 'appDocuments',
    modal : true,
    width:500,
    title: 'Список документов к сделке',
    initComponent: function() {
        this.items = [
        {
        	xtype: 'form',
        	id: 'documents_form',
        	frame: true,
        	defaults: {
            	anchor: '100%',
            	allowBlank: false,
            	msgTarget: 'side',
            	labelWidth: 80,
            	padding: '5 5 5 5'
        	},
        	items: [
        	{
        		xtype: 'hidden',
        		name: 'csrfmiddlewaretoken',
        		value: CRMRE.global.Vars.csrf_token
        	},{
        		xtype: 'hidden',
        		name: 'offer'
        	},{
	            xtype: 'textfield',
	            name: 'name',
	            itemId: 'name',
	            fieldLabel: 'Имя файла'
	        },{
	        	xtype: 'filefield',
	        	name: 'file',
	        	itemId: 'file',
	        	emptyText: 'Выберите документ',
				fieldLabel: 'Документ',
	        	msgTarget: 'side',
	        	allowBlank: false,
	        	anchor: '100%',
	        	buttonText: '',
				buttonConfig: {
					iconCls: 'icon-documents_add'
				}
			}]
        },{
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
            			return '<a href="'+v+'" target="_blank"><img src="/static/images/templatesdoc.png"></a>';
            		}
            	},{
            		xtype:'actioncolumn',
            		width:22,
            		action:'delete',
            		items: [{
            			iconCls: 'icon-delete',
            			tooltip: 'Удалить'
           			}]
           		}
            ]
        }],
        this.buttons = [{
        	view: this,
        	text: 'Загрузка',
        	itemId: 'download',
            iconCls: 'icon-documents_add',
        	handler: function() {
	            var form = this.view.down('form').getForm();
	            var store = this.view.down('grid').getStore();
	            if(form.isValid()){
	                form.submit({
	                    url: '/documents_upload/',
	                    waitMsg: 'Загрузка документа...',
	                    headers : {'Content-Type':'multipart/form-data; charset=UTF-8'},
	                    method : 'POST',
	                    waitMsg : 'Идет загрузка...',
	                    success: function(fp, o) {
	                        Ext.Msg.alert('Успешная операция', o.result.message);
	                        store.load();
	                        form.setValues({name:'', file:''});
	                    },
	                    failure: function(fp, o) {
	                        Ext.Msg.alert('Неудачная операция', o.result.message);
	                        form.setValues({name:'', file:''});
	                    }
	                });
	            }	
        	}   
        },{
        	text: 'Выход',
            action: 'cancel'
        }];
        this.callParent(arguments);
    },
    getStoreDocuments: function() {
    	store = Ext.create('CRMRE.store.Documents');
    	store.getProxy().extraParams = {offer: offer};
    	return store;
    }
});