Ext.define('CRMRE.controller.SmsMessages', {
    extend: 'Ext.app.Controller',
    stores: ['SmsMessages','directory.MessageType'],
    models: ['SmsMessages','directory.MessageType'],
    views: ['sms_messages.List','sms_messages.Edit'],
    init: function() {
        this.control({
            'appSmsMessagesList actioncolumn[action=edit]': {
                click: this.editRecord
            },
            'appSmsMessagesList actioncolumn[action=delete]': {
                click: this.deleteRecord
            },
            'appSmsMessagesList button[action=update]': {
                click: this.updateRecord
            },
            'appSmsMessagesList button[action=add_message]': {
                click: this.addRecord
            },
            'appSmsMessagesList button[action=send_messages]': {
                click: this.sendMessages
            },
            'appSmsMessagesEdit button[action=save]': {
                click: this.saveRecord
            },
            'appSmsMessagesEdit button[action=cancel]': {
            	click: this.closeForm
            }
        });
        this.callParent(arguments);
    }, 
    //Обнавляем список заявок на предложение
    updateRecord: function(button) {
        var grid = button.up('appSmsMessagesList');
        var store = grid.getStore();
        grid.focus();
        var selection = grid.getSelectionModel().getSelection();
        store.load({
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
    },    
    editRecord: function(gridview, el, rowIndex, colIndex, e, record, rowEl) {
        var view = Ext.widget('appSmsMessagesEdit');
 		if(record){
        	form = view.down('form');
        	form.loadRecord(record);
            view.show();
      	}
    },
    addRecord: function(button) {
        var view = Ext.widget('appSmsMessagesEdit');
        view.show();
    },
    saveRecord: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        var record = form.getRecord();
        var values = form.getValues();
        var grid = Ext.getCmp('tabpanel').getActiveTab().down('appSmsMessagesList');
        var store = grid.getStore();
        if (form.isValid()) {
        	if (values.id > 0) {
	            record.set(values);
	        } else {		
				var record = Ext.create('CRMRE.model.SmsMessages');
				record.set(values);
				store.add(record);
			};
			store.sync({
                success : function(data_batch,controller) {
                    grid.getSelectionModel().select(record);
                    grid.getView().focusRow(record);
                },
                scope: this            
            });
            win.close();
        }
    },
    sendMessages: function(button) {
        var my = this;
        var grid = button.up('grid');
        messages_arr = [];
        Ext.MessageBox.confirm('Подтвердите действие!', 'Вы действительно хотите сделать рассылку выбранных сообщений?', function(btn){
            if (btn == 'yes') {
                var store = grid.getStore();
                store.getProxy().extraParams = {};
                var select = grid.getSelectionModel().getSelection();
                if (select.length) {
                    select.forEach(function(record, index) {
                        messages_arr.push([record.get('type'),record.get('name')]);
                    });
                    Ext.Ajax.request({
                        url: '/send_messages/',
                        params:{
                           messages_type: 'sms',
                           messages_arr: Ext.JSON.encode(messages_arr)
                        },
                        success: function(response, opts) {
                            var obj = Ext.decode(response.responseText);
                            var content = obj.messages;
                            Ext.Msg.alert('Извещение', content);
                            
                        }
                    });
                }
                else {
                    Ext.Msg.alert('Предупреждение', 'Нет выбранных сообщений!');
                }
            }
        });
    },
    deleteRecord: function(gridview, el, rowIndex, colIndex, e, rec, rowEl) {
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
                    scope: this      
                });
            }
        });
    },
    closeForm: function(button) {
        button.up('window').close();
    },
});