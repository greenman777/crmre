Ext.define('CRMRE.controller.HystoryService', {
    extend: 'Ext.app.Controller',
    stores: ['HystoryService','directory.OperationType','directory.ResultOperation'],
    models: ['HystoryService'],
    views: ['hystory_service.List','hystory_service.Edit'],
    init: function() {
        this.control({
            'appHystoryServiceList actioncolumn[action=edit]': {
                click: this.editRecord
            },
            'appHystoryServiceList actioncolumn[action=delete]': {
                click: this.deleteRecord
            }, 
            'appHystoryServiceList button[action=add]': {
                click: this.addRecord
            },
            'appHystoryServiceEdit button[action=save]': {
                click: this.saveRecord
            },
            'appHystoryServiceEdit button[action=cancel]': {
                click: this.closeForm
            }
        });
        this.callParent(arguments);
    },
    //Редактируем операцию
    editRecord: function(gridview, el, rowIndex, colIndex, e, record, rowEl) {
        var view = Ext.widget('appHystoryServiceEdit');
        if(record){
                var form = view.down('form');
                form.loadRecord(record);
                //скрываем изменение статуса при редактировании
                form.down('#operation').setDisabled(true);
                view.show();
        }
    },
    //Открываем форму для занесения реакции клиента  
    addRecord: function(button) {
        var store = button.up('appHystoryServiceList').getStore();
        var store_hyst_show = Ext.getCmp('tabpanel').getActiveTab().down('appHystoryShowList').getStore();
        var view = Ext.widget('appHystoryServiceEdit');
        var grid_offer = Ext.getCmp('tabpanel').getActiveTab().down("#OfferList");
        var selection_offer = grid_offer.getSelectionModel().getSelection();
        //запоминаем последнию запись
        var record_last = store.last();
        var record_hyst_show_last = store_hyst_show.last();
        if (record_hyst_show_last != undefined) {
            var store_show_result = Ext.data.StoreManager.lookup('directory.ResultShow');
            store_show_result.clearFilter(true);
            result_show_last = store_show_result.getById(record_hyst_show_last.get('result')).get('name');
		    if (result_show_last == 'клиент одобрил'){
                //запрещаем добавление новой записи для разных условий
		        if (record_last != undefined) {
		            var store_result = Ext.data.StoreManager.lookup('directory.OperationType');
		            store_result.clearFilter(true);
		            result_last = store_result.getById(record_last.get('operation')).get('name');
		            //сделка завершена, больше не редактируем
		            if (result_last == 'сделка завершена'){
		                Ext.Msg.alert('Предупреждение', 'Сделка завершена, больше не редактируем!');
		                return;
		            };
		        };
                //если выбрано предложение, то открываем форму для добавления реакции
                //и заполняем обязательными данными
                if ((selection_offer.length > 0) && (selection_offer[0].get("informed"))) {
                    var form = view.down('form');
                    form.getForm().setValues({offer: selection_offer[0].getId(),date: new Date()});
                    view.show();
                }
                else {
                    Ext.Msg.alert('Предупреждение', 'Не выбрано или не послано предложение!');    
                };
            }
            else {
                Ext.Msg.alert('Предупреждение', 'Нет успешных просмотров!');
                return; 
            }
        };
    },
    //Сохраняем новую/измененную реакцию
    saveRecord: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        var record = form.getRecord();
        var values = form.getValues();
        var grid = Ext.getCmp('tabpanel').getActiveTab().down('appHystoryServiceList');
        var store = grid.getStore();
        var grid_offer = Ext.getCmp('tabpanel').getActiveTab().down('#OfferList');
        var store_offer = grid_offer.getStore();
        var my = this;
        var store_operation = Ext.data.StoreManager.lookup('directory.OperationType');
        var store_result = Ext.data.StoreManager.lookup('directory.ResultOperation');
        var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
        var status_complet = store_status.findRecord('name','сделка завершена').getId();
        var status_active = store_status.findRecord('name','активная').getId();
        var status_output = store_status.findRecord('name','выход на сделку').getId();
        var store_buy = Ext.data.StoreManager.lookup('OrdersBuy');
        var store_sale = Ext.data.StoreManager.lookup('OrdersSale');
        //если форма заполнена корректно
        if (form.isValid()) {
            //если запись существует, изменяем запись
            if (values.id > 0) {
                record.set(values);
            }
            //если запись новая, сохраняем новую запись
            else {        
                var record = Ext.create('CRMRE.model.HystoryService');
                record.set(values);
                store.add(record);
            }
            store.sync({
                success : function(data_batch,controller) {
                    grid.getView().focusRow(record);  
                    grid.getSelectionModel().select(record);
                    operation = store_operation.getById(record.get('operation')).get('name');
                    result = store_result.getById(record.get('result_operation')).get('name');
                    if (operation=="4. регистрация") {
                    	record_offer = store_offer.getById(record.get('offer'));
                    	record_buy = store_buy.getById(record_offer.get('order_buy'));
                        record_sale = store_sale.getById(record_offer.get('order_sale'));
                        grid_order = Ext.getCmp('tabpanel').getActiveTab().down('grid');
                        store_order = grid_order.getStore();
                        select_order = grid_order.getSelectionModel().getSelection();
                        if (result=="успешная") {
                    		record_offer.set("stage",4);
                            if (select_order.length) {
                            	select_order[0].set("status",status_complet);
                                store_order.sync({
	                                success : function(data_batch,controller) {
	                                    store_order.clearFilter(true);
	                                    store_order.filter(function(r) {
	                                        var value = r.get('status');
	                                        return ((value == status_active)||(value == status_output));
	                                    });
	                                    record_last = store_order.last();
	                                    if (record_last != undefined) {
	                                        grid_order.getSelectionModel().select(record_last);
	                                        grid_order.view.bufferedRenderer.scrollTo(store_order.indexOf(record_last),true);
	                                    }   
	                                },
	                                failure: function (proxy, operations) {
	                                    // resume records
	                                    store_order.rejectChanges();
	                                },
	                                scope: this            
	                            });
                            };
                            record_buy.set("status",status_complet);
                        	record_sale.set("status",status_complet);
                    	};
                    	if (result=="отказная") {
                        	record_offer.set("stage",0);
                            if (select_order.length) {
                                select_order[0].set("status",status_active);
                                store_order.sync();
                            }
                            record_buy.set("status",status_active);
                            record_sale.set("status",status_active);
                        }
                        if (result!="в работе") {
                            store_buy.sync();
                            store_sale.sync();
                        };
                        store_offer.sync();
                    }
                },
                failure: function(rec, op){
                    Ext.Msg.alert("Ошибка","К сожалению, данные не могут быть сохранены.");
                },
                scope: this            
            });
            win.close();
        };
    },
    //Удаляем запись
    deleteRecord: function(gridview, el, rowIndex, colIndex, e, rec, rowEl) {
        var store = gridview.getStore();
        var record = store.getAt(rowIndex); 
        me = this;
        //разрешаем удалять только последнюю запись
        if (record == store.last()) {
            if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'delete_hystoryservice')!=-1){
	            Ext.MessageBox.confirm('Подтвердите действие!', 'Вы действительно хотите удалить запись?', function(btn){
	                if (btn == 'yes') {
	                    store.remove(record);
	                    store.sync();
	                }
	            });
            }
            else {
                Ext.Msg.alert('Предупреждение', 'Вы не можете удалять историю!');    
            }
        }
        else {
            Ext.Msg.alert('Предупреждение', 'Запись операции не является последней!');    
        }
    }, 
    //закрываем форму
    closeForm: function(button) {
        button.up('window').close();
    }
});