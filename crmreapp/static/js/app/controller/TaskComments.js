Ext.define('CRMRE.controller.TaskComments', {
    extend: 'Ext.app.Controller',
    stores: ['TaskComments'],
    models: ['TaskComments'],
 	views: ['task_comments.List','task_comments.Edit'],
 	refs: [
 		{ ref: 'appTasksList',selector: 'appTasksList' }
 	],
    init: function() {
        this.control({
            'appTaskCommentsList actioncolumn[action=edit]': {
                click: this.editRecord
            },
            'appTaskCommentsList actioncolumn[action=delete]': {
                click: this.deleteRecord
            },
            'appTaskCommentsList button[action=add]': {
            	click: this.addRecord
            },
            'appTaskCommentsEdit button[action=save]': {
                click: this.saveRecord
            },
            'appTaskCommentsEdit button[action=cancel]': {
            	click: this.closeForm
            }
        });
        this.callParent(arguments);
    },
    //Редактируем комментарий
    editRecord: function(gridview, el, rowIndex, colIndex, e, rec, rowEl) {
    	var view = Ext.widget('appTaskCommentsEdit');
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
    //Открываем форму для изменения статуса задачи  
    addRecord: function(button) {
        var store = button.up('appTaskCommentsList').getStore();
        var view = Ext.widget('appTaskCommentsEdit');
        var grid_tasks = Ext.getCmp('tabpanel').getActiveTab().down('appTasksList');
        var selection_tasks = grid_tasks.getSelectionModel().getSelection();
        //если выбрана задача, то открываем форму для добавления комментария
        if (selection_tasks.length > 0) {
            var form = view.down('form');
            form.getForm().setValues({task: selection_tasks[0].getId(),create_date: new Date(),
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
        var grid = Ext.getCmp('tabpanel').getActiveTab().down('appTaskCommentsList');
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
				var record = Ext.create('CRMRE.model.TaskComments');
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