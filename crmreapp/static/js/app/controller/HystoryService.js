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
                if ((selection_offer.length > 0) && (selection_offer.slice(-1).pop().get("informed"))) {
                    var form = view.down('form');
                    form.getForm().setValues({offer: selection_offer.slice(-1).pop().getId(),date: new Date()});
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
        var store_operation = Ext.data.StoreManager.lookup('directory.OperationType');
        var store_result = Ext.data.StoreManager.lookup('directory.ResultOperation');
        var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
        var status_complet = store_status.findRecord('name','сделка завершена').getId();
        var status_active = store_status.findRecord('name','активная').getId();
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
                    var operation = store_operation.getById(record.get('operation')).get('name');
                    var result = store_result.getById(record.get('result_operation')).get('name');

                    var record_offer = store_offer.getById(record.get('offer'));
                    var grid_order = Ext.getCmp('tabpanel').getActiveTab().down('grid');
                    var store_order = grid_order.getStore();
                    var select_order = grid_order.getSelectionModel().getSelection();

                    if (operation=="4. регистрация") {
                        if (result == "успешная") {
                            record_offer.set("stage", 4);
                            store_offer.sync();
                            var status_order = status_complet;
                            if (select_order.length) {
                                select_order.slice(-1).pop().set("status", status_order);
                                store_order.sync({
                                    success : function(data_batch,controller) {
                                        store_order.reload();
                                    }
                                });
                            }
                        };
                        if (result == "неуспешная") {
                            record_offer.set("stage", 0);
                            store_offer.sync();
                            var status_order = status_active;
                            if (select_order.length) {
                                select_order.slice(-1).pop().set("status", status_order);
                                store_order.sync();
                            }

                        };
                        if (result != "в работе") {
                            store_order_buy = Ext.create('CRMRE.store.OrdersBuy');
                            store_order_buy.load({
                                params: {id: record_offer.get('order_buy')},
                                callback: function (records, options, success) {
                                    if (success) {
                                        record_order_buy = records[0];
                                        record_order_buy.set("status", status_order);
                                        store_order_buy.sync();
                                    }
                                }
                            });
                            store_order_sale = Ext.create('CRMRE.store.OrdersSale');
                            store_order_sale.load({
                                params: {id: record_offer.get('order_sale')},
                                callback: function (records, options, success) {
                                    if (success) {
                                        record_order_sale = records[0];
                                        record_order_sale.set("status", status_order);
                                        store_order_sale.sync();
                                    }
                                }
                            });
                        }
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