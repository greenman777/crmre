Ext.define('CRMRE.controller.HystoryOffer', {
    extend: 'Ext.app.Controller',
    stores: ['HystoryOffer','directory.ResultSentence'],
    models: ['HystoryOffer'],
 	views: ['hystory_offer.List','hystory_offer.Edit'],
    init: function() {
        this.control({
            'appHystoryOfferList':{
                itemclick: function(view, record, item, index, e, eOpts){
                    panel = view.up('panel');
                    panel.flex = 1.5;
                    panel.up('panel').doLayout();
                }
            },
            'appHystoryOfferList actioncolumn[action=edit]': {
                click: this.editRecord
            },
            'appHystoryOfferList actioncolumn[action=delete]': {
                click: this.deleteRecord
            }, 
            'appHystoryOfferList button[action=add]': {
                click: this.addRecord
            },
            'appHystoryOfferEdit button[action=save]': {
                click: this.saveRecord
            },
            'appHystoryOfferEdit button[action=cancel]': {
                click: this.closeForm
            }
        });
        this.callParent(arguments);
    },
    //Редактируем реакцию
    editRecord: function(gridview, el, rowIndex, colIndex, e, record, rowEl) {
        var view = Ext.widget('appHystoryOfferEdit');
        if(record){
                var form = view.down('form');
                form.loadRecord(record);
                //скрываем изменение статуса при редактировании
                form.down('#result').setDisabled(true);
                view.show();
        }
    },
    //Открываем форму для занесения реакции клиента  
    addRecord: function(button) {
        var store = button.up('appHystoryOfferList').getStore();
        var view = Ext.widget('appHystoryOfferEdit');
        var grid_offer = Ext.getCmp('tabpanel').getActiveTab().down("#OfferList");
        var selection_offer = grid_offer.getSelectionModel().getSelection();
        //запоминаем последнию запись
        var record_last = store.last();
        //запрещаем добавление новой записи для разных условий
        if (record_last != undefined) {
            var store_result = Ext.data.StoreManager.lookup('directory.ResultSentence');
            store_result.clearFilter(true);
            result_last = store_result.getById(record_last.get('result')).get('name');
            //клиент заинтересовался, больше не редактируем
            if (result_last == 'клиент заинтересовался'){
                Ext.Msg.alert('Предупреждение', 'Клиент заинтересовался, больше не редактируем!');
                return;
            }
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
        }
    },
    //Сохраняем новую/измененную реакцию
    saveRecord: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        var record = form.getRecord();
        var values = form.getValues();
        var grid = Ext.getCmp('tabpanel').getActiveTab().down('appHystoryOfferList');
        var store = grid.getStore();
        var my = this;
        //если форма заполнена корректно
        //Проверяем, является ли дата позднее 4 дней от текущей и есть ли соотвтетствующее разрешение, если нет то выходим
        if (!Ext.Date.between(new Date(), Ext.Date.parse(values.date, "Y-m-d"), Ext.Date.add(Ext.Date.parse(values.date, "Y-m-d"), Ext.Date.DAY, 4)) &&
            Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'lock_orders-sale')==-1) {
            Ext.Msg.alert('Предупреждение', 'Вы не можете ставить дату задним числом со сроком более 4 дней назад от текущей!');
            return;
        };
        if (form.isValid()) {
            //если запись существует, изменяем запись
            if (values.id > 0) {
                record.set(values);
                store.sync();
                grid.getView().focusRow(record);
                grid.getSelectionModel().select(record);
            //если запись новая, сохраняем новую запись
            } else {        
                var record = Ext.create('CRMRE.model.HystoryOffer');
                record.set(values);
                store.add(record);
                store.sync({
                    success : function(data_batch,controller) {
                        grid.getView().focusRow(record);  
                        grid.getSelectionModel().select(record);
                        
                        var store_result = Ext.data.StoreManager.lookup('directory.ResultSentence');
                        var store_offer = Ext.getCmp('tabpanel').getActiveTab().down('#OfferList').getStore();
			            store_result.clearFilter(true);
			            var result_name = store_result.getById(record.data.result).get('name');
                        var record_offer = store_offer.getById(record.data.offer);
                        if (result_name == 'клиент заинтересовался'){
                            my.fireEvent('addNotifications',record_offer.get('order_sale_performer_id'),'Заявкой №'+record_offer.get('order_sale_index')+" заинтересовались, сделайте просмотр");
                            if (record_offer.get('order_sale_performer_id') != record_offer.get('order_buy_performer_id')) {
                                my.fireEvent('addNotifications',record_offer.get('order_buy_performer_id'),'Заявкой №'+record_offer.get('order_sale_index')+" заинтересовались, сделайте просмотр");
                            };
                            record_offer.set("stage",2);
                        };
                        if (result_name=="клиенту это не интересно"){
                            record_offer.set("stage",0);
                        }
                        store_offer.sync();
                    },
                    failure: function(rec, op){
                        Ext.Msg.alert("Ошибка","К сожалению, данные не могут быть сохранены.");
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
            store_hyst_show = Ext.getCmp('tabpanel').getActiveTab().down('appHystoryShowList').getStore();
            if (store_hyst_show.count()==0) {
                if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'delete_hystoryoffer')!=-1){
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
                Ext.Msg.alert('Предупреждение', 'По предложению уже есть назначенные/успешные просмотры!');
            }
        }
        else {
            Ext.Msg.alert('Предупреждение', 'Запись реакции не является последней!');    
        }
    }, 
    //закрываем форму
    closeForm: function(button) {
        button.up('window').close();
    }
});