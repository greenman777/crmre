Ext.define('CRMRE.controller.Tasks', {
    extend: 'Ext.app.Controller',
    stores: ['Tasks','directory.Priority','directory.TaskStatus'],
    models: ['Tasks'],
 	views: ['Tasks','tasks.List','tasks.Edit'],
    init: function() {
        this.listen({
            controller: {
                '*': {
                   updateStatus: this.updateStatus,
                   addTask: this.saveReceivedRecord
                }
            },
            store: {
                 '#tasks_store': {
                     load: this.filterShow
                 }
             }
        });
        this.control({
        	'appTasksList':{
        		selectionchange: this.selectTask
        	},
            'appTasksList actioncolumn[action=edit]': {
                click: this.editRecord
            },
            'appTasksList actioncolumn[action=delete]': {
                click: this.deleteRecord
            },
            'appTasksList button[action=filter_status]': {
                click: this.filterRecord
            },
            'appUsersList button[action=task_add]': {
                click: this.addRecord
            },
            'appTasksEdit button[action=save]': {
                click: this.saveRecord
            },
            'appTasksEdit button[action=cancel]': {
            	click: this.closeForm
            },
            'appTasksList pagingtoolbar': {
                change: this.changePage
            },
        });
        this.callParent(arguments);
    }, 
    //Подгружаем историю и комментарии для выбранной задачи    
    selectTask: function(selections, model, options) {
        var store_task_history = Ext.getCmp('tabpanel').getActiveTab().down('appTaskHistoryList').getStore();
        var store_task_comments = Ext.getCmp('tabpanel').getActiveTab().down('appTaskCommentsList').getStore();
        var select_task = selections.getSelection();
        if (select_task.length > 0) {
            var task_id = select_task[0].get('id');
            store_task_history.getProxy().extraParams = {task: task_id};
            store_task_history.load();
            store_task_comments.getProxy().extraParams = {task: task_id};
            store_task_comments.load();
        };
    },
    //Редактируем задачу
    editRecord: function(gridview, el, rowIndex, colIndex, e, rec, rowEl) {
        var view = Ext.widget('appTasksEdit');
        var record = gridview.getStore().getAt(rowIndex);
 		if(record){
        	view.down('form').loadRecord(record);
            view.show();
      	}
    },
    //Открываем форму для назначения задачи пользователю    
    addRecord: function(button) {
        var view_tasks = Ext.widget('appTasksEdit');
        var grid_users = button.up('appUsersList');
        var selection_users = grid_users.getSelectionModel().getSelection();
        // проверяем что пользователь выбран
        if (selection_users.length > 0) {
            var form_tasks = view_tasks.down('form');
            //заполяем у формы обязательные поля
            store_status = Ext.data.StoreManager.lookup('directory.TaskStatus');
            store_status.clearFilter(true);
            form_tasks.getForm().setValues({performer: selection_users[0].getId(),create_date: new Date(),
                                      author: parseInt(CRMRE.global.Vars.user_id),
                                      status: store_status.findRecord('name','в работе').getId()        
                                    });
            view_tasks.show();
        }
        else {
            Ext.Msg.alert('Предупреждение', 'Не выбран пользователь!');    
        }
    },
    //Сохраняем полученную от системы задачу
    saveReceivedRecord: function(performer,heading,description){
        //добавляем новую задачу в в базу
        var store = Ext.data.StoreManager.lookup('Tasks');
        var record = Ext.create('CRMRE.model.Tasks');
        record.set('priority',Ext.data.StoreManager.lookup('directory.Priority').findRecord('name','средний').getId());
        record.set('status',Ext.data.StoreManager.lookup('directory.TaskStatus').findRecord('name','в работе').getId());
        record.set('author',parseInt(CRMRE.global.Vars.user_id));
        record.set('create_date',Ext.Date.format(new Date(), "Y-m-d H:i"));
        record.set('execution_date',Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, 3), "Y-m-d H:i"));
        record.set('performer',performer);
        record.set('description',description);
        store.add(record);
        var my = this;
        store.sync({
            success : function(data_batch,controller) {
                my.fireEvent('addNotifications',performer,'Для Вас новая задача!: '+heading);
            },
            scope: this            
        });
    },
    //Сохранияем задачу
    saveRecord: function(button) {
    	var win = button.up('window');
        var form = win.down('form');
        var record = form.getRecord();
        var values = form.getValues();
        //если форма заполнена корректно
        if (form.isValid()) {
	        //если запись уже существует, обновляем
	 		if (values.id > 0) {
	            var grid = Ext.getCmp('tabpanel').getActiveTab().down('appTasksList');
	            var store = grid.getStore();
				record.set(values);
				store.sync();
	            //устанавливаем курсор на измененную задачу
	            grid.getView().focusRow(record);
	            grid.getSelectionModel().select(record);
			} else {
	            //если задача новая, то добавляем ее в базу
	            var store = this.getTasksStore();
				var record = Ext.create('CRMRE.model.Tasks');
				record.set(values);
				store.add(record);
                var my = this;
				store.sync({
                    success : function(data_batch,controller) {
                        my.fireEvent('addNotifications',record.get('performer'),'Для Вас новая задача!: '+record.get('heading'));
                    },
                    scope: this            
                });
			};
            win.close();
        };
	},
    //Удаляем задачу
	deleteRecord: function(gridview, el, rowIndex, colIndex, e, rec, rowEl) {
        var store = gridview.getStore();
    	var record = store.getAt(rowIndex); 
    	Ext.MessageBox.confirm('Подтвердите действие!', 'Вы действительно хотите удалить запись?', function(btn){
			if (btn == 'yes') {
	    		store.remove(record);
	    		store.sync({
                    success : function(data_batch,controller) {
                        var store_hyst = Ext.getCmp('tabpanel').getActiveTab().down('appTaskHistoryList').getStore();
                        var store_comm = Ext.getCmp('tabpanel').getActiveTab().down('appTaskCommentsList').getStore();
                        store_hyst.loadData([],false);
                        store_comm.loadData([],false);
                        var record_last = store.last();
                        if (record_last != undefined) {
                            gridview.focusRow(record_last);  
                            gridview.getSelectionModel().select(record_last);    
                        };
                    },
                    scope: this            
                });
			}
    	});	
    }, 
    //Обновляем статус текущей задачи
    updateStatus: function(status_id) {
        var grid = Ext.getCmp('tabpanel').getActiveTab().down('appTasksList');
        var store = grid.getStore();
        var selection = grid.getSelectionModel().getSelection();
        if (selection.length > 0) {
            var record = selection[0];
            record.set('status',status_id);
            store.sync({
                success : function(data_batch,controller) {
                    var complet = Ext.getCmp('tabpanel').getActiveTab().complet;
			        if (complet == undefined) {
			            complet = true;
			        }
                    this.filterStore(grid.down('#filter_status'),!complet);
                },
                scope: this            
            });
        }
    },
    //Закрываем форму
    closeForm: function(button) {
    	button.up('window').close();
    },
    //фильтруем записи при старте
    filterShow: function(store) {
        //this.filterStore(Ext.getCmp('tabpanel').getActiveTab().down('appTasksList').down('#filter_status'),false);
    },
    //фильтр при нажатии кнопки фильтрации
    filterRecord: function(button) {
        var complet = button.up('appTasks').complet;
        if (complet == undefined) {
            complet = true;
        }
        this.filterStore(button,complet);
    },
    //фильтруем записи
    filterStore: function(button,complet) {
        var grid = button.up('gridpanel');
        var store = grid.getStore();
        store.clearFilter(true);
        var my = this;
        if (complet) {
            store.filter(function(r) {
                var value = r.get('status');
                return (value == my.idStatus('выполнена'));
            });
        }
        else {
            store.filter(function(r) {
                var value = r.get('status');
                return (value == my.idStatus('в работе') || value == my.idStatus('на проверку') || value == my.idStatus('отклонена'));
            });
        };
        record_last = store.last();
        if (record_last != undefined) {
            grid.getSelectionModel().select(record_last);
        }   
        else {
            var store_hyst = grid.up('tabpanel').down('appTaskHistoryList').getStore();
            var store_comm = grid.up('tabpanel').down('appTaskCommentsList').getStore();
            store_hyst.loadData([],false);
            store_comm.loadData([],false);
        }
    },
    //возвращаем id статуса задачи по названию
    idStatus: function(status_name) {
        var store_status = Ext.data.StoreManager.lookup('directory.TaskStatus');
        store_status.clearFilter(true);
        status_id = store_status.findRecord('name',status_name).getId(); 
        return status_id;
    },
    changePage: function(pagingtoolbar, pageData, eOpts) {
        pagingtoolbar.up('grid').getSelectionModel().select(0);
    },
});