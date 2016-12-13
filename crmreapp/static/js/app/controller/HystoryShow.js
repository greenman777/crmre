Ext.define('CRMRE.controller.HystoryShow', {
    extend: 'Ext.app.Controller',
    stores: ['HystoryShow','directory.ResultShow'],
    models: ['HystoryShow'],
    views: ['hystory_show.List','hystory_show.Edit'],
    init: function() {
        this.control({
            'appHystoryShowList actioncolumn[action=edit]': {
                click: this.editRecord
            },
            'appHystoryShowList actioncolumn[action=delete]': {
                click: this.deleteRecord
            }, 
            'appHystoryShowList button[action=add]': {
                click: this.addRecord
            },
            'appHystoryShowEdit button[action=save]': {
                click: this.saveRecord
            },
            'appHystoryShowEdit button[action=cancel]': {
                click: this.closeForm
            }
        });
        this.callParent(arguments);
    },
    //Редактируем просмотры
    editRecord: function(gridview, el, rowIndex, colIndex, e, record, rowEl) {
        var view = Ext.widget('appHystoryShowEdit');
        if(record){
                var form = view.down('form');
                form.loadRecord(record);
                //скрываем изменение статуса при редактировании
                var store = gridview.getStore();
                var record_last = store.last();
                if (record != record_last){
                    form.down('#result').setDisabled(true);
                }
                view.show();
        }
    },
    //Открываем форму для занесения просмотров объекта  
    addRecord: function(button) {
        var store = button.up('appHystoryShowList').getStore();
        var store_hyst_offer = Ext.getCmp('tabpanel').getActiveTab().down('appHystoryOfferList').getStore();
        var view = Ext.widget('appHystoryShowEdit');
        var grid_offer = Ext.getCmp('tabpanel').getActiveTab().down("#OfferList");
        var selection_offer = grid_offer.getSelectionModel().getSelection();
        //запоминаем последнию запись
        var record_last = store.last();
        var record_hyst_offer_last = store_hyst_offer.last();
        //запрещаем добавление новой записи для разных условий
        if (record_hyst_offer_last != undefined) {
        	var store_offer_result = Ext.data.StoreManager.lookup('directory.ResultSentence');
            store_offer_result.clearFilter(true);
            result_offer_last = store_offer_result.getById(record_hyst_offer_last.get('result')).get('name');
            if (result_offer_last == 'клиент заинтересовался'){
		        if (record_last != undefined) {
		            var store_result = Ext.data.StoreManager.lookup('directory.ResultShow');
		            store_result.clearFilter(true);
		            result_last = store_result.getById(record_last.get('result')).get('name');
		            //объект понравился, больше не редактируем
		            if (result_last == 'клиент одобрил'){
		                Ext.Msg.alert('Предупреждение', 'Клиент одобрил объект, больше не редактируем!');
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
            	Ext.Msg.alert('Предупреждение', 'Нет положительной реакции клиента!');
		        return;	
            }
        };
    },
    //Сохраняем новый/измененный просмотр
    saveRecord: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        var record = form.getRecord();
        var values = form.getValues();
        var grid = Ext.getCmp('tabpanel').getActiveTab().down('appHystoryShowList');
        var store = grid.getStore();
        var grid_offer = Ext.getCmp('tabpanel').getActiveTab().down('#OfferList');
        var store_offer = grid_offer.getStore();
        var my = this;
        var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
        var store_result = Ext.data.StoreManager.lookup('directory.ResultShow');
        var store_buy = Ext.data.StoreManager.lookup('OrdersBuy');
        var store_sale = Ext.data.StoreManager.lookup('OrdersSale');
        
        var my = this;
        //если форма заполнена корректно
        if (form.isValid()) {
            //если запись существует, изменяем запись
            if (values.id > 0) {
                record.set(values);
                store.sync({
                    success : function(data_batch,controller) {
                        grid.getView().focusRow(record);
                        grid.getSelectionModel().select(record);
                        result = store_result.getById(record.get('result')).get('name');
                        if (result=="клиент одобрил"){
                            record_offer = store_offer.getById(record.get('offer'));
                            record_offer.set("stage",3);
			    record_buy = store_buy.getById(record_offer.get('order_buy'));
                            record_sale = store_sale.getById(record_offer.get('order_sale'));
                            record_buy.set("status",store_status.findRecord('name','выход на сделку').getId());
                            record_sale.set("status",store_status.findRecord('name','выход на сделку').getId());
                            grid_order = Ext.getCmp('tabpanel').getActiveTab().down('grid');
                            store_order = grid_order.getStore();
                            select_order = grid_order.getSelectionModel().getSelection();
                            if (select_order.length) {
                            	select_order[0].set("status",store_status.findRecord('name','выход на сделку').getId());
                            	store_order.sync();
                            }
                            store_buy.sync();
                            store_sale.sync();
                        };
                        if (result=="клиент отказался"){
                            record_offer.set("stage",0);
                        };
                        store_offer.sync();
                    },
                    failure: function(rec, op){
                        Ext.Msg.alert("Ошибка","К сожалению, данные не могут быть сохранены.");
                    },
                    scope: this            
                });
            //если запись новая, сохраняем новую запись
            } else {        
                var record = Ext.create('CRMRE.model.HystoryShow');
                record.set(values);
                store.add(record);
                store.sync({
                    success : function(data_batch,controller) {
                        grid.getView().focusRow(record);  
                        grid.getSelectionModel().select(record);
                        result = store_result.getById(record.get('result')).get('name');
                        record_offer = store_offer.getById(record.get('offer'));
                        if (result=="клиент одобрил"){
                        	record_offer.set("stage",3);
                            record_buy = store_buy.getById(record_offer.get('order_buy'));
                            record_sale = store_sale.getById(record_offer.get('order_sale'));
                            record_buy.set("status",store_status.findRecord('name','выход на сделку').getId());
                            record_sale.set("status",store_status.findRecord('name','выход на сделку').getId());
                            grid_order = Ext.getCmp('tabpanel').getActiveTab().down('grid');
                            store_order = grid_order.getStore();
                            select_order = grid_order.getSelectionModel().getSelection();
                            if (select_order.length) {
                            	select_order[0].set("status",store_status.findRecord('name','выход на сделку').getId());
                            	store_order.sync();
                            }
                            store_buy.sync();
                            store_sale.sync();
                        }
                        if (result=="клиент отказался"){
                            record_offer.set("stage",0);
                        }
                        store_offer.sync();
                    },
                    scope: this            
                }); 
            };
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
        	store_hyst_service = Ext.getCmp('tabpanel').getActiveTab().down('appHystoryServiceList').getStore();
            if (store_hyst_service.count()==0) {
                if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'delete_hystoryshow')!=-1){
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
                Ext.Msg.alert('Предупреждение', 'По предложению уже есть операции!');
            }
        }
        else {
            Ext.Msg.alert('Предупреждение', 'Запись просмотра не является последней!');    
        }
    }, 
    //закрываем форму
    closeForm: function(button) {
        button.up('window').close();
    }
});