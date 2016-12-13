Ext.define('CRMRE.view.Photos', {
    extend: 'Ext.window.Window',
    xtype: 'appPhotos',
    modal : true,
    width:500,
    title: 'Фотографии объекта',
    initComponent: function() {
        this.items = [
        {
        	xtype: 'form',
        	id: 'photos_form',
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
        		name: 'object'
        	},{
	            xtype: 'textfield',
	            name: 'description',
	            itemId: 'description',
	            fieldLabel: 'Заголовок'
	        },{
	        	xtype: 'filefield',
	        	name: 'photo',
	        	itemId: 'photo',
	        	emptyText: 'Выберите фотографию',
				fieldLabel: 'Фотография',
	        	msgTarget: 'side',
	        	allowBlank: false,
	        	anchor: '100%',
	        	buttonText: '',
				buttonConfig: {
					iconCls: 'icon-upload'
				}
			}]
        },{
        	xtype: 'grid',
        	autoScroll: true,
        	height: 300,
        	store: this.getStorePhotos().load(),
        	columns: [
      			{xtype:'rownumberer',width:30},
            	{header: 'Заголовок', dataIndex: 'description', flex: 1},
            	{	
            		header: 'Фотография', 
            		dataIndex: 'photo', 
            		renderer:function(v){
            			return '<a href="'+v+'" target="_blank"><img src="'+v+'" height=75 width=100/></a>';
            		}
            	},{
            		xtype:'actioncolumn',
            		width:22,
            		action:'delete',
            		items: [{
            			iconCls: 'icon-delete',
            			tooltip: 'Удалить'
           			}],
           			listeners: {
	                    scope:this,
	                    'afterrender': function(action){
	                        var typeapp = this.typeapp; 
                            var typemainapp = Ext.getCmp('tabpanel').getActiveTab().typeapp;
	                        if (typeapp =='info_photos' || typemainapp.indexOf('_activ') >= 0 || typemainapp.indexOf('_brigadier') >= 0) {
	                            action.hidden = true;
	                        }
	                    }
	                }
           		}
            ]
        }],
        this.buttons = [{
        	view: this,
        	text: 'Загрузка',
        	itemId: 'download',
            iconCls: 'icon-photos_add',
        	handler: function() {
	            var form = this.view.down('form').getForm();
	            var store = this.view.down('grid').getStore();
	            if(form.isValid()){
	                form.submit({
	                    url: '/photo_upload/',
	                    waitMsg: 'Загрузка фотографии...',
	                    headers : {'Content-Type':'multipart/form-data; charset=UTF-8'},
	                    method : 'POST',
	                    waitMsg : 'Идет загрузка...',
	                    success: function(fp, o) {
	                        Ext.Msg.alert('Успешная операция', o.result.message);
	                        store.load();
	                        form.setValues({description:'', photo:''});
	                    },
	                    failure: function(fp, o) {
	                        Ext.Msg.alert('Неудачная операция', o.result.message);
	                        form.setValues({description:'', photo:''});
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
    getStorePhotos: function() {
    	store = Ext.create('CRMRE.store.Photos');
    	store.getProxy().extraParams = {object: object};
    	return store;
    }
});