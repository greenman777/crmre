
Ext.define('CRMRE.view.buildings.PlanPhotos',{
	extend: 'Ext.panel.Panel',
	frame: true,
	id: 'plan-images-view',
    xtype: 'appPlanPhotos',
    //title: 'Фотографии',
    initComponent: function() {
        this.items = [
        {
        	xtype: 'form',
        	frame: true,
        	id: 'plan_form_photo',
        	title: "Новая фотография",
        	flex:1,
        	collapsible: true,
        	collapsed: true,
        	defaults: {
            	anchor: '100%',
            	allowBlank: false,
            	msgTarget: 'side',
            	padding: '5 5 5 5'
        	},
        	tools: 
        	[{
	        	type: 'save',
	            handler: function(event, toolEl, panel){
	                var form = this.up('form').getForm();
	                if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'add_planphotos')!=-1) {
				        if(form.isValid()){
				            form.submit({
				                url: '/plan_photo_upload/',
				                waitMsg: 'Загрузка фотографии...',
				                headers : {'Content-Type':'multipart/form-data; charset=UTF-8'},
				                method : 'POST',
				                waitMsg : 'Идет загрузка...',
				                success: function(fp, o) {
				                	Ext.Msg.alert('Успешная загрузка!', o.result.message);
				                    Ext.data.StoreManager.lookup('PlanPhotos').load({params: {plan:form.getValues().plan}}),
				                    form.setValues({description:'', photo:''});
				                },
				                failure: function(fp, o) {
				                    Ext.Msg.alert('Загрузка не удалась!', o.result.message);
				                    form.setValues({description:'', photo:''});
				                }
				            });
				        }
				    }
				    else {
				    	Ext.Msg.alert('Предупреждение', 'У Вас нет полномочий на добавление фотографий!');
				    }
	            }
	        },{
	        	type: 'close',
	            handler: function(event, toolEl, panel){
	            	if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'delete_planphotos')!=-1) {
		                var form = this.up('form').getForm();
		                if (typeof(form.select_records) != "undefined" && form.select_records.length) {
					        var store = Ext.data.StoreManager.lookup('PlanPhotos');
					        Ext.MessageBox.confirm('Подтвердите действие!', 'Вы действительно хотите удалить выбранные фотографии?', function(btn){
					            if (btn == 'yes') {
							        store.remove(form.select_records);
					                store.sync();
					            }
		        			});	
		                }
		                else {
		                	Ext.Msg.alert('Внимание!', "Нет выбранных фотографий для удаления!");	
		                }
		            }
		            else {
         			    Ext.Msg.alert('Предупреждение', 'У Вас нет полномочий на удаление фотографий!'); 
         			}
         		}   
            }],
        	items: [
        	{
        		xtype: 'hidden',
        		name: 'csrfmiddlewaretoken',
        		value: CRMRE.global.Vars.csrf_token
        	},{
        		xtype: 'hidden',
        		name: 'plan'
        	},{
	            xtype: 'textfield',
	            name: 'description',
	            flex: 1,
	            labelWidth: 60,
	            itemId: 'description',
	            fieldLabel: 'Заголовок'
	        },{
	        	xtype: 'filefield',
	        	name: 'photo',
	        	flex: 1,
	        	itemId: 'photo',
	        	emptyText: 'Выберите фотографию',
				//fieldLabel: 'Фотография',
	        	msgTarget: 'side',
	        	allowBlank: false,
	        	anchor: '100%',
	        	buttonText: '',
				buttonConfig: {
					iconCls: 'icon-upload'
				}
			}]
        },{
        	xtype: 'panel',
        	id: "plan_photo_list",
        	frame: true,
        	flex: 1,
        	items: Ext.create('Ext.view.View', {
	            store: Ext.data.StoreManager.lookup('PlanPhotos'),
	            tpl: [
	                '<tpl for=".">',
	                    '<div class="thumb-wrap" id="{description}">',
	                        '<div class="thumb">',
	                            '<img src="{photo}" height=75 width=100 title="{description}">',
	                        '</div>',
	                        '<span class="x-editable">{shortName}</span>',
	                    '</div>',
	                '</tpl>',
	                '<div class="x-clear"></div>',
	            ],
	            multiSelect: true,
	            trackOver: true,
	            overItemCls: 'x-item-over',
	            itemSelector: 'div.thumb-wrap',
	            emptyText: 'Нет фотографий для отображения',
	            plugins: [
	                Ext.create('Ext.ux.DataView.DragSelector', {}),
	                Ext.create('Ext.ux.DataView.LabelEditor', {dataIndex: 'description'})
	            ],
	            prepareData: function(data) {
	                Ext.apply(data, {
	                    shortName: Ext.util.Format.ellipsis(data.description, 15),
	                });
	                return data;
	            },
	            listeners: {
	                selectionchange: function(dv, nodes ){
	                    var l = nodes.length;
	                    var form = Ext.getCmp('tabpanel').getActiveTab().down('#plan_form_photo').getForm().select_records = nodes;
	                    this.up('panel').setTitle('(' + l + ' фото выбрано)');
	                },
	                itemdblclick: function (dv, record, item, index, e, eOpts) {
						var win = new Ext.Window({
						    html: '<img src="'+record.get("photo")+'" height=600 width=800  />',
						    height: 600,
						    width: 800
						});
						win.show();
					}
	            }
	        }),
        }],
        this.callParent(arguments);
    },
});