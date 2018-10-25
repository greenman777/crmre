Ext.define('CRMRE.view.Photos', {
    extend: 'Ext.window.Window',
    xtype: 'appPhotos',
    modal : true,
    id: 'app_photos',
    width:480,
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
	            xtype: 'combobox',
	            name: 'description',
                hidden:true,
	            itemId: 'description',
	        },
                {
		   xtype: 'filefield',
		   name: 'photo',
		   fieldLabel: '',
			labelWidth: 50,
		   fieldStyle:'color:black',
			buttonOnly : true,
		   labelWidth: '',
		   msgTarget: 'side',
		   allowBlank: true,
		   anchor: '100%',
		   buttonText: 'Загрузка фотографий',
				buttonConfig: {
					iconCls: 'icon-upload'
			},
			regex: (/.(jpg|jpeg)$/i),
			regexText: 'Можно загружать только графические файлы',
		   listeners: {
			   change: function (fld, value) {
				   var upload = fld.fileInputEl.dom;
				   var files = upload.files;
				   var names = [];
				   var names2 = [];

				   if (files) {
					   for (var i = 0; i < files.length; i++) {
						   names.push(files[i].name);
						   names2.push({archivo: files[i].name})
						   files_names = names.join(', ')
					   };
					   Ext.ComponentQuery.query("#description")[0].setValue(files_names);

					   fld.setRawValue(files_names);

					   var form = Ext.ComponentQuery.query("#photos_form")[0].getForm();
                       var store = Ext.ComponentQuery.query("#photos_grid")[0].getStore();
                       if(form.isValid()){
                            form.submit({
                                url: '/photo_upload/',
                                waitMsg: 'Загрузка фотографии...',
                                headers : {'Content-Type':'multipart/form-data; charset=UTF-8'},
                                method : 'POST',
                                waitMsg : 'Идет загрузка...',
                                success: function(fp, o) {
                                    Ext.Msg.alert('Успешная загрузка', o.result.message);
                                    store.load();
                                    form.setValues({description:'', photo:''});
                                },
                                failure: function(fp, o) {
                                    Ext.Msg.alert('Неудачная загрузка', o.result.message);
                                    form.setValues({description:'', photo:''});
                                }
                            });
	                   }
				   }
				   //this.up('grid').getStore().loadData(names2);

			   },
			   afterrender: function (cmp) {
				   cmp.fileInputEl.set({
					   multiple: 'multiple',
				   });
			   }
		   }}]
        },{
        	xtype: 'grid',
        	autoScroll: true,
            id: 'photos_grid',
        	height: 420,
			anchor: '100%',
        	store: this.getStorePhotos().load(),
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 2,
                    pluginId: 'cellEditing',
					listeners: {
					edit: function(editor, e) {
                        if (e.value !== e.originalValue) {
                        	store = Ext.ComponentQuery.query("#photos_grid")[0].getStore();
                        	store.sync({
								success : function(data_batch,controller) {
									store.load();
								},
								scope: this
							});
                        }
                    },
					validateedit: function(editor, e) {
                        if ((e.value == "") || (e.value == 'undefined')) {
							e.cancel = true;
							e.record.data[e.field] = e.value;
						}
					},
				}
                })
            ],
        	columns: [
      			{xtype:'rownumberer',width:30},
            	{header: 'Заголовок', dataIndex: 'description', flex: 1,
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                    },
                },{
            		header: 'Фотография', 
            		dataIndex: 'photo',
					width: 120,
            		renderer:function(v){
            			return '<a href="'+v+'" target="_blank"><img src="'+v+'" height=90/></a>';
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