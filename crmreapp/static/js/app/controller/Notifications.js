Ext.define('CRMRE.controller.Notifications', {
    extend: 'Ext.app.Controller',
    stores: ['Notifications'],
    models: ['Notifications'],
 	views: ['Header','notifications.Edit'],

    init: function() {
        this.listen({
            controller: {
                '*': {
                   addNotifications: this.addNotifications
                }
            }
        });
        this.control({
            'appHeader':{
                beforerender: this.startTaskNotifications
            },
            'appNotificationsList':{
                selectionchange: this.selectNotifications
            },
            'appNotificationsList actioncolumn[action=delete]': {
                click: this.deleteRecord
            },
            'appNotificationsList button[action=create_message]': {
                click: this.createMessage
            },
            'appNotificationsList button[action=del_select_message]': {
                click: this.deleteSelectRecord
            },
            'appNotificationsEdit button[action=send]': {
                click: this.sendMessages
            },
            'appNotificationsList button[action=update]': {
                click: this.updateRecord
            }
        });
        this.callParent(arguments);
    },
    
    //Обнавляем список заявок на спрос
    updateRecord: function(button) {
        var grid = button.up('appNotificationsList');
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
    
    selectNotifications: function(selections, model, options) {
        var select = selections.getSelection();
        var store = selections.getStore();
        if (select.length > 0) {
            if (!(select[0].get('read'))){
                select[0].set('read',true);
	            var my = this;
	            store.sync({
	                success : function(data_batch,controller) {
	                	var grid = Ext.getCmp('tabpanel').getActiveTab().down('grid');
	                	grid.getView().focusRow(select[0]);
	                	var info = Ext.ComponentQuery.query('#notifications')[0];
	                    var count_news = my.countMessagesNew(grid);
	                    Ext.ComponentQuery.query('#notifications_new')[0].getStore().reload();
	                    if (count_news == 0) {
			                info.setText("Новых сообщений нет");
			            }
			            else {
			                info.setText("Новых собщений: <b>"+count_news.toString()); 
			            };
	                },
	                scope: this            
	            });                
            }
        }
    },
    createMessage: function(button) {
        var view = Ext.widget('appNotificationsEdit');
        view.show();
    },
    addNotifications: function (user,message) {
    	if (user == CRMRE.global.Vars.user_id) {
    		return;
    	};
        var store = Ext.data.StoreManager.lookup('Notifications');
        var record = Ext.create('CRMRE.model.Notifications');
        record.set('user',user);
        record.set('message',message);
        record.set('date',Ext.Date.format(new Date(), "Y-m-d"));
        store.add(record);
        var my = this;
        store.sync({
            success : function(data_batch,controller) {
                my.taskNotifications();
            },
            scope: this            
        });
        store.commitChanges();//фиксируем иначе накапливаются записи
    },
    countMessagesNew: function (grid){
    	var grid = grid;
    	var store = grid.getStore();
    	store.clearFilter();
    	store.filter('read',false);
    	var count = store.getCount();
    	store.clearFilter();
    	return count;
    },
    taskNotifications: function () {
        var info = Ext.ComponentQuery.query('#notifications')[0];
        var info_buy = Ext.ComponentQuery.query('#orders_buy_info')[0];
        var info_sale = Ext.ComponentQuery.query('#orders_sale_info')[0];
        Ext.Ajax.request({
		    url: '/notifications_news/',
            params: {
                user: CRMRE.global.Vars.user_id
            },
	        success: function(response, opts) {
		 	    
		 	    var obj = Ext.decode(response.responseText);
	            var count_news = obj.messages['count_news'];
                var count_free_buy = obj.messages['count_free_buy'];
                var count_free_sale = obj.messages['count_free_sale'];
                var count_complet_buy = obj.messages['count_complet_buy'];
                var count_complet_sale = obj.messages['count_complet_sale'];
                
                if (count_news == 0) {
	                info.setText("Новых сообщений нет");
	            }
	            else {
	                info.setText("Новых собщений: <b>"+count_news.toString()); 
	                Ext.data.StoreManager.lookup('Notifications').reload();
	                Ext.ComponentQuery.query('#notifications_new')[0].getStore().reload();
	            };
                info_buy.setText("Спрос: <b>"+count_free_buy.toString()+"/"+count_complet_buy.toString());
                info_sale.setText("Предложение: <b>"+count_free_sale.toString()+"/"+count_complet_sale.toString());
		    }
	    });
 	},
    
    startTaskNotifications: function(view, eOpts) {
        var runner = new Ext.util.TaskRunner();
	    var task = runner.start({
		     run: this.taskNotifications,
		     interval: 120000
		     //args: [view]
		});
    },
    //Удаляем соощение
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
    //Удаляем выбранные сообщения
    deleteSelectRecord: function(button) {
        var grid = button.up('appNotificationsList');
        var store = grid.getStore();
        Ext.MessageBox.confirm('Подтвердите действие!', 'Вы действительно хотите удалить выбранные сообщения?', function(btn){
            if (btn == 'yes') {
            	var select = grid.getSelectionModel().getSelection();
            	if (select.length) {
		            store.remove(select);
                    store.sync();
		        };
            }
        });
    },
    sendMessages: function(button) {
        var my = this;
        
        var win = button.up('window');
        var form = win.down('form');
        if (form.isValid()) {
        	Ext.Ajax.request({
	            url: '/send_notification/',
	            params:{
	               message: form.getValues().name,
	               sendsms: form.getValues().sendsms,
	               recipients: Ext.JSON.encode(form.getValues().recipients)
	            },
	            success: function(response, opts) {
	                var obj = Ext.decode(response.responseText);
	                var content = obj.messages;
	                Ext.Msg.alert('Извещение', content);
	                
	            }
        	});
            win.close();
        }
    },
});