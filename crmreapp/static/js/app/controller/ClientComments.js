Ext.define('CRMRE.controller.ClientComments', {
    extend: 'Ext.app.Controller',
    stores: ['ClientComments'],
    models: ['ClientComments'],
 	views: ['client_comments.List','client_comments.Edit'],
 	refs: [
 		{ ref: 'appClientsList',selector: 'appClientsList' }
 	],
    init: function() {
        this.listen({
            controller: {
                '*': {
                   updateClients: this.updateRecord,
                   deleteClients: this.updateRecord
                }
            }
        });
        this.control({
            'appClientCommentsList actioncolumn[action=edit]': {
                click: this.editRecord
            },
            'appClientCommentsList actioncolumn[action=delete]': {
                click: this.deleteRecord
            }, 
            'appClientCommentsList button[action=update]': {
                click: this.updateRecord
            },
            'appClientCommentsList button[action=add]': {
            	click: this.addRecord
            },
            'appClientCommentsEdit button[action=save]': {
                click: this.saveRecord
            },
            'appClientCommentsEdit button[action=cancel]': {
            	click: this.closeForm
            }
        });
        this.callParent(arguments);
    },
    //Редактируем комментарий
    editRecord: function(gridview, el, rowIndex, colIndex, e, rec, rowEl) {
    	var view = Ext.widget('appClientCommentsEdit');
    	var record = gridview.getStore().getAt(rowIndex);
 		if(record){
            if (record.get('author')==parseInt(CRMRE.global.Vars.user_id)){
    		    var form = view.down('form');
                form.loadRecord(record);
                view.show();
            }
            else {
                Ext.Msg.alert('Предупреждение', 'Редактировать комментарий может только автор!');    
            }
      	}
    },
    //Обнавляем список комментариев
    updateRecord: function(button) {
        var grid_clients = Ext.getCmp('tabpanel').getActiveTab().down('appClientsList');
        var selection_clients = grid_clients.getSelectionModel().getSelection();
        var grid = Ext.getCmp('tabpanel').getActiveTab().down('appClientCommentsList');
        var store = grid.getStore();
        //если выбрана задача, то обновляем комментарии
        if (selection_clients.length > 0) {
	        grid.focus();
	        var selection = grid.getSelectionModel().getSelection();
	        store.load({
	            scope: this,
	            callback: function(records, operation, success) {
	                if (success) {
	                    if (selection.length > 0) {
                            var record_id = selection[0].getId();
	                        var record_select = store.getById(record_id);
                            grid.getSelectionModel().select(record_select);
                            grid.getView().focusRow(record_select);
	                    }
	                    else {
	                        grid.getSelectionModel().select(0);
                            grid.getView().focusRow(0);
	                    }
	                        
	                }
	            }
	         });
        }
    },
    //Открываем форму для изменения статуса задачи  
    addRecord: function(button) {
        var store = button.up('appClientCommentsList').getStore();
        var view = Ext.widget('appClientCommentsEdit');
        var grid_clients = Ext.getCmp('tabpanel').getActiveTab().down('appClientsList');
        var selection_clients = grid_clients.getSelectionModel().getSelection();
        //если выбрана задача, то открываем форму для добавления комментария
        if (selection_clients.length > 0) {
            var form = view.down('form');
            form.getForm().setValues({client: selection_clients[0].getId(),create_date: new Date(),
                                      author: parseInt(CRMRE.global.Vars.user_id)
                                    });
            view.show();
        }
        else {
            Ext.Msg.alert('Предупреждение', 'Не выбрана задача!');    
        }
    },
    //Сохраняем новый/измененный комментарий
    saveRecord: function(button) {
    	var win = button.up('window');
        var form = win.down('form');
        var record = form.getRecord();
        var values = form.getValues();
        var grid = Ext.getCmp('tabpanel').getActiveTab().down('appClientCommentsList');
        var store = grid.getStore();
        var my = this;
        //если форма заполнена корректно
        if (form.isValid()) {
	 		//если запись существует, изменяем запись
	        if (values.id > 0) {
				record.set(values);
				store.sync();
	            grid.getView().focusRow(record);
	            grid.getSelectionModel().select(record);
	        //если запись новая, сохраняем новую запись
			} else {		
				var record = Ext.create('CRMRE.model.ClientComments');
				record.set(values);
				store.add(record);
				store.sync({
	    			success : function(data_batch,controller) {
						grid.getView().focusRow(record);  
						grid.getSelectionModel().select(record);
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
        //разрешаем удалять только автору комметария
        if (record.get('author')==parseInt(CRMRE.global.Vars.user_id)) {
	    	Ext.MessageBox.confirm('Подтвердите действие!', 'Вы действительно хотите удалить запись?', function(btn){
				if (btn == 'yes') {
		    		store.remove(record);
		    		store.sync();
				}
			});
        }
        else {
            Ext.Msg.alert('Предупреждение', 'Комментарий может удалить только автор!');    
        }
    }, 
    //закрываем форму
    closeForm: function(button) {
    	button.up('window').close();
    }
});