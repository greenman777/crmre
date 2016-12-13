Ext.define('CRMRE.controller.Plan', {
    extend: 'Ext.app.Controller',
    stores: ['Buildings','BuildingPhotos','Plan','PlanPhotos'],
    models: ['Plan'],
    views: ['buildings.BuildingsList','buildings.PlanEdit','buildings.PlanPhotos','buildings.PlanList'],
    init: function() {
        this.control({
        	'appPlanList':{
        		selectionchange: this.selectPlan
        	},
            'appPlanList actioncolumn[action=edit]': {
                click: this.editRecord
            },
            'appPlanList actioncolumn[action=delete]': {
                click: this.deleteRecord
            },
            'appPlanList button[action=add]': {
                click: this.addRecord
            },
            'appPlanList button[action=update]': {
                click: this.updateRecord
            },
            'appPlanEdit button[action=save]': {
                click: this.saveRecord
            },
            'appPlanEdit button[action=cancel]': {
            	click: this.closeForm
            },
            'appClientSelectEdit button[action=cancel]': {
            	click: this.closeForm
            },
            'appPlanList button[action=order_sale_add]': {
            	click: this.addOrderSale
            }
        });
        this.callParent(arguments);
    }, 
    
    
    /*Подгружаем фотографии при выборе планировки*/
    selectPlan: function(selections, model, options) {
        var grid_plan = Ext.getCmp('tabpanel').getActiveTab().down('appPlanList');
    	var store_plan= grid_plan.getStore();
        var select_plan = selections.getSelection();
        if (select_plan.length) {
            var plan = select_plan[0].getId();
            var form_photo = Ext.getCmp('tabpanel').getActiveTab().down('#plan_form_photo');
        	form_photo.getForm().setValues({plan: plan});
            Ext.getStore('PlanPhotos').load({params: {plan:plan}});
        };
    },
    //Обнавляем список заявок на предложение
    updateRecord: function(button) {
    	var grid_buildings = Ext.getCmp('tabpanel').getActiveTab().down('appBuildingsList');
        var selection_buildings = grid_clients.getSelectionModel().getSelection();
        if (selection_buildings.length > 0) {
	        var grid = button.up('appPlanList');
	        var store = grid.getStore();
	        grid.focus();
	        var selection = grid.getSelectionModel().getSelection();
	        store.reload({
	            scope: this,
	            callback: function(records, operation, success) {
	                if (success) {
	                    if (selection.length > 0) {
	                        var record_id = selection[0].getId();
	                        var record_select = store.getById(record_id);
	                        grid.getSelectionModel().deselectAll();
	                        grid.getSelectionModel().select(record_select);
	                        grid.getView().focusRow(record_select);
	                    }
	                    else {
	                        grid.getSelectionModel().deselectAll();
	                        grid.getSelectionModel().select(0);
	                        grid.getView().focusRow(0);
	                    }
	                }
	            }
	         });
	     }
    },    
    
    editRecord: function(gridview, el, rowIndex, colIndex, e, record, rowEl) {
    	if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'change_plan')!=-1) {
	        var view = Ext.widget('appPlanEdit');
	 		if(record){
	        	form = view.down('form');
	            form.loadRecord(record);
	            view.show();
	       	}
	    }
	    else {
            Ext.Msg.alert('Предупреждение', 'У Вас нет полномочий на редактирование планировки!');    
        }
    },
    
    addRecord: function(button) {
        if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'add_plan')!=-1) {
	        var view = Ext.widget('appPlanEdit');
	        var grid_buildings = Ext.getCmp('tabpanel').getActiveTab().down('appBuildingsList');
	        var selection_buildings = grid_buildings.getSelectionModel().getSelection();
	        if (selection_buildings.length > 0) {
	            var form = view.down('form');
	            form.getForm().setValues({building: selection_buildings[0].getId()});
	        	view.show();
	    	}
	    }
	    else {
            Ext.Msg.alert('Предупреждение', 'У Вас нет полномочий на добавление планировки!');    
        }
    },
    
    saveRecord: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        var record = form.getRecord();
        var values = form.getValues();
        var grid = Ext.getCmp('tabpanel').getActiveTab().down('appPlanList');
        var store = grid.getStore();
        if (form.isValid()) {
            if (values.id > 0) {
                record.set(values);
                store.sync({
	                success : function(data_batch,controller) {
	                    grid.getSelectionModel().select(record);
	                },
                    failure: function (proxy, operations) {
				        // resume records
				        store.rejectChanges();
				    },
	                scope: this            
	            });
            } else {
		        var store = this.getPlanStore();
                var record = Ext.create('CRMRE.model.Plan');
                record.set(values);
                store.add(record);
                var my = this;
                store.sync({
                    success : function(data_batch,controller) {
	                    grid.getView().focusRow(record);  
                        grid.getSelectionModel().select(record);
		                Ext.MessageBox.show({
		                     title: 'Внимание',
		                     msg: 'Планировка добавлена!',
		                     icon: Ext.MessageBox.INFO,
		                     buttons: Ext.Msg.OK
		                });
                    },
                    failure: function (proxy, operations) {
                        store.rejectChanges();
                    },
                    scope: this            
                });
            };
            win.close();
        }
    },
    
    deleteRecord: function(gridview, el, rowIndex, colIndex, e, rec, rowEl) {
        if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'delete_plan')!=-1) {
            var store = gridview.getStore();
            Ext.MessageBox.confirm('Подтвердите действие!', 'Вы действительно хотите удалить запись?', function(btn){
                if (btn == 'yes') {
                    store.remove(rec);
                    store.sync({
                        success : function(data_batch,controller) {
                            var record_last = store.last();
                            if (record_last != undefined) {
                                gridview.focusRow(record_last);  
                                gridview.getSelectionModel().select(record_last);    
                            }
                        },
                        failure: function (proxy, operations) {
	                        // resume records
	                        store.rejectChanges();
                        },
                        scope: this      
                    });
                }
            });
        }
        else {
            Ext.Msg.alert('Предупреждение', 'У Вас нет полномочий на удаление планировки!');    
        }
    }, 
    selectClient: function(button){
        var selection_plan = button.up('appPlanList').getSelectionModel().getSelection();
        // проверяем что новостройка выбрана
        if (selection_plan.length > 0) {
            var view_client_select = Ext.widget('appClientSelectEdit');
            var form_client_select = view_client_select.down('form');
        }
        else {
            Ext.Msg.alert('Предупреждение', 'Не выбрана планировка!');
        };
    },
    addOrderSale: function(button) {

        var selection_plan = button.up('appPlanList').getSelectionModel().getSelection();
        // проверяем что новостройка выбрана
        if (selection_plan.length == 0) {
            Ext.Msg.alert('Предупреждение', 'Не выбрана планировка!');
            return;
        }

        var view_order_sale = Ext.widget('appOrdersSaleEdit');
        var form_order_sale = view_order_sale.down('form');

        //заполяем у формы обязательные поля
        var object_category = Ext.data.StoreManager.lookup('directory.ObjectCategory').findRecord('name','Жилая недвижимость').getId();
        var object_type = Ext.data.StoreManager.lookup('directory.ObjectType').findRecord('name','квартира в новостройке').getId();
        var object_category_name = Ext.data.StoreManager.lookup('directory.ObjectCategory').findRecord('name','Жилая недвижимость').get('name');
        var object_category_group = Ext.data.StoreManager.lookup('directory.ObjectCategory').findRecord('name','Жилая недвижимость').get('group');
        var object_accessory = Ext.data.StoreManager.lookup('directory.ObjectAccessory').findRecord('name','собственика').getId();

        form_order_sale.down('tabpanel').remove(form_order_sale.down('#objects_info_commercial'));
        form_order_sale.down('tabpanel').remove(form_order_sale.down('#objects_extend_commercial'));
        form_order_sale.down('tabpanel').remove(form_order_sale.down('#objects_info_earth'));
        form_order_sale.down('tabpanel').remove(form_order_sale.down('#objects_info_business'));
        form_order_sale.down('#features_residential').remove(form_order_sale.down('#flooring'));
        form_order_sale.down('#features_residential').remove(form_order_sale.down('#windows'));
        form_order_sale.down('#nds_type').setVisible(false);
        form_order_sale.down('#lease').setVisible(false);
        form_order_sale.down('#transaction_type').flex = 3;
        form_order_sale.down('#current_yield').setVisible(false);
        form_order_sale.down('#current_expenses').setVisible(false);
        form_order_sale.down('#founding_date').setVisible(false);
        form_order_sale.down('#category_earth').setVisible(false);
        view_order_sale.setTitle('Новая заявка категории: ' +  object_category_name);

        var grid_buildings = Ext.getCmp('tabpanel').getActiveTab().down('appBuildingsList');
        var selection_buildings = grid_buildings.getSelectionModel().getSelection();

        var grid_plan = Ext.getCmp('tabpanel').getActiveTab().down('appPlanList');
        var selection_plan = grid_plan.getSelectionModel().getSelection();

        var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
        if ((Ext.Array.indexOf(CRMRE.global.Vars.user_groups,object_category_group)!=-1)&&(Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'create_order_active')!=-1)) {
            var performer = parseInt(CRMRE.global.Vars.user_id);
            var status = store_status.findRecord('name','активная').getId();
        }
        else {
            var status = store_status.findRecord('name','свободная').getId();
        }
        form_order_sale.getForm().setValues({
            client: Ext.data.StoreManager.lookup('directory.ConstructionOrganization').getById(selection_buildings[0].get('construction_organization')).get('client'),
            author: parseInt(CRMRE.global.Vars.user_id),
            performer: performer,
            object_category: object_category,
            object_type: object_type,
            object_accessory: object_accessory,
            status: status,
            number_rooms: selection_plan[0].get('number_rooms'),
            total_space: selection_plan[0].get('space'),
            price: selection_plan[0].get('space')*selection_plan[0].get('price'),
            encumbrance: false,
            city: selection_buildings[0].get('city'),
            district: selection_buildings[0].get('district'),
            microdistrict: selection_buildings[0].get('microdistrict'),
            street: selection_buildings[0].get('street'),
            house_number: selection_buildings[0].get('house_number'),
            construction_stage: selection_buildings[0].get('construction_stage'),
            construction_organization: selection_buildings[0].get('construction_organization'),
            delivery_period: selection_buildings[0].get('delivery_period'),
            material_walls: selection_buildings[0].get('material_walls'),
            commission: true,
            commission_type: true,
            commission_price: selection_buildings[0].get('commission')*2,
            coordinates_label: selection_buildings[0].get('coordinates_label'),
            contract_number: selection_buildings[0].get('contract_number'),
            contract_date: selection_buildings[0].get('contract_date'),
            developmentid: selection_buildings[0].get('developmentid'),
            contract_number: selection_buildings[0].get('contract_number'),
            floors: selection_buildings[0].get('floors'),
        });
        view_order_sale.show();
    },
    closeForm: function(button) {
        button.up('window').close();
    }
});