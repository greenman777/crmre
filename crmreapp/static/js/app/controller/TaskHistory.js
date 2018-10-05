Ext.define('CRMRE.controller.TaskHistory', {
    extend: 'Ext.app.Controller',
    stores: ['TaskHistory'],
    models: ['TaskHistory'],
 	views: ['task_history.List','task_history.Edit'],
 	refs: [
 		{ ref: 'appTasksList',selector: 'appTasksList' }
 	],
    init: function() {
        this.control({
            'appTaskHistoryList actioncolumn[action=edit]': {
                click: this.editRecord
            },
            'appTaskHistoryList actioncolumn[action=delete]': {
                click: this.deleteRecord
            },
            'appTaskHistoryList button[action=add]': {
            	click: this.addRecord
            },
            'appTaskHistoryEdit button[action=save]': {
                click: this.saveRecord
            },
            'appTaskHistoryEdit button[action=cancel]': {
            	click: this.closeForm
            }
        });
        this.callParent(arguments);
    },
    //Редактируем историю задачи
    editRecord: function(gridview, el, rowIndex, colIndex, e, rec, rowEl) {
    	var view = Ext.widget('appTaskHistoryEdit');
    	var record = gridview.getStore().getAt(rowIndex);
 		if(record){
            if (record.get('corrector')==parseInt(CRMRE.global.Vars.user_id)) {
	    		var form = view.down('form');
	            form.loadRecord(record);
	            //скрываем изменение статуса при редактировании
	            form.down('#task_history_status').setVisible(false);
	            view.show();
            }
            else {
                Ext.Msg.alert('Предупреждение', 'Запись в истории может редактировать только автор!');    
            }
      	}
    },
    //Открываем форму для изменения статуса задачи  
    addRecord: function(button) {
        var store = button.up('appTaskHistoryList').getStore();
        var typeapp = Ext.getCmp('tabpanel').getActiveTab().typeapp;
        var view = Ext.widget('appTaskHistoryEdit');
        var grid_tasks = Ext.getCmp('tabpanel').getActiveTab().down('appTasksList');
        var selection_tasks = grid_tasks.getSelectionModel().getSelection();
        //запоминаем последнию запись
        var record_last = store.last();
        //запрещаем добавление новой записи для разных условий
        if (record_last != undefined) {
            var store_status = Ext.data.StoreManager.lookup('directory.TaskStatus');
            store_status.clearFilter(true);
            status_last = store_status.getById(record_last.get('status')).get('name'); 
            //задача выполнена, больше не редактируем
            if (status_last == 'выполнена'){
	            Ext.Msg.alert('Предупреждение', 'Задача завершена!');
	            return;
	        }
            //если на проверке, то закрываем для исполнителя
            else if ((status_last == 'на проверку')&&(typeapp == 'tasks_make')){
                Ext.Msg.alert('Предупреждение', 'Задача на проверке!');
                return;
            }
            //если на доработке, то запрещаем для автора
            else if ((status_last == 'отклонена')&&(typeapp == 'tasks_check')){
                Ext.Msg.alert('Предупреждение', 'Задача на исправлении!');
                return;
            }
        }
        else if (typeapp == 'tasks_check'){
            Ext.Msg.alert('Предупреждение', 'Задача в работе!');
            return;
        };
        //если выбрана задача, то открываем форму для изменения статуса
        //и заполняем обязательными данными
        if (selection_tasks.length > 0) {
            var form = view.down('form');
            form.getForm().setValues({task: selection_tasks[0].getId(),create_date: new Date(),
                                      corrector: parseInt(CRMRE.global.Vars.user_id)
                                    });
            view.show();
        }
        else {
            Ext.Msg.alert('Предупреждение', 'Не выбрана задача!');    
        }
    },
    //Сохраняем новый/измененный статус
    saveRecord: function(button) {
    	var win = button.up('window');
        var form = win.down('form');
        var record = form.getRecord();
        var values = form.getValues();
        var grid = Ext.getCmp('tabpanel').getActiveTab().down('appTaskHistoryList');
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
				var record = Ext.create('CRMRE.model.TaskHistory');
				record.set(values);
				store.add(record);
				store.sync({
	    			success : function(data_batch,controller) {
						grid.getView().focusRow(record);  
						grid.getSelectionModel().select(record);
	                    //изменяем статус задачи
	                    this.fireEvent('updateStatus',record.get('status')); 
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
            if (record.get('corrector')==parseInt(CRMRE.global.Vars.user_id)) {
		    	Ext.MessageBox.confirm('Подтвердите действие!', 'Вы действительно хотите удалить запись?', function(btn){
					if (btn == 'yes') {
			    		store.remove(record);
			    		store.sync({
	                        success : function(data_batch,controller) {
	                            //статус задачи как у последней записи в истории
	                            record_last = store.last();
	                            if (record_last != undefined) {
	                                me.fireEvent('updateStatus',record_last.get('status'));        
	                            }
	                            //или начальный, если записей нет
	                            else {
	                                var store_status = Ext.data.StoreManager.lookup('directory.TaskStatus');
	                                store_status.clearFilter(true);
	                                me.fireEvent('updateStatus',store_status.findRecord('name','в работе').getId());
	                            }
	                        },
	                        scope: this            
	                    });
					}
				});
            }
            else {
                Ext.Msg.alert('Предупреждение', 'Запись в истории может удалить только автор!');    
            }
        }
        else {
            Ext.Msg.alert('Предупреждение', 'Запись истории не является последней!');    
        }
    }, 
    //закрываем форму
    closeForm: function(button) {
    	button.up('window').close();
    }
});