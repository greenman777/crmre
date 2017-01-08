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
        var grid = Ext.getCmp('tabpanel').getActiveTab().down('appClientCommentsList');
        var store = grid.getStore();
        try {//если мы находимся в клиентах
            var grid_parrent = Ext.getCmp('tabpanel').getActiveTab().down('appClientsList');
            var selection_parrent = grid_parrent.getSelectionModel().getSelection();
            var client_id = 'id';
        }
        catch (e) {
            try {//если мы находимся в предложениях
                var grid_parrent = Ext.getCmp('tabpanel').getActiveTab().down('appOrdersSaleList');
                var selection_parrent = grid_parrent.getSelectionModel().getSelection();
                var client_id = 'client';
            }
            catch (e) {//если мы находимся в спросе
                var grid_parrent = Ext.getCmp('tabpanel').getActiveTab().down('appOrdersBuyList');
                var selection_parrent = grid_parrent.getSelectionModel().getSelection();
                var client_id = 'client';
            }
        }
        if (selection_parrent.length > 0) {
            store.load({params:{client: selection_parrent[0].get(client_id)}});
        }
    },
    //Открываем форму для добавления нового взаимодействия
    addRecord: function(button) {
        var store = button.up('appClientCommentsList').getStore();
        var view = Ext.widget('appClientCommentsEdit');
        try {//если мы находимся в клиентах
            var grid_parrent = Ext.getCmp('tabpanel').getActiveTab().down('appClientsList');
            var selection_parrent = grid_parrent.getSelectionModel().getSelection();
            var client_id = 'id';
        }
        catch (e) {
            try {//если мы находимся в предложениях
                var grid_parrent = Ext.getCmp('tabpanel').getActiveTab().down('appOrdersSaleList');
                var selection_parrent = grid_parrent.getSelectionModel().getSelection();
                var client_id = 'client';
            }
            catch (e) {//если мы находимся в спросе
                var grid_parrent = Ext.getCmp('tabpanel').getActiveTab().down('appOrdersBuyList');
                var selection_parrent = grid_parrent.getSelectionModel().getSelection();
                var client_id = 'client';
            }
        }
        if (selection_parrent.length > 0) {
            var form = view.down('form');
            form.getForm().setValues({client: selection_parrent[0].get(client_id),create_date: new Date(), author: parseInt(CRMRE.global.Vars.user_id)});
            view.show();
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