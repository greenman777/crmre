Ext.define('CRMRE.controller.Clients', {
    extend: 'Ext.app.Controller',
    stores: ['directory.InfoSource','directory.Occupation','directory.Sphere'],
    models: ['Clients'],
    views: ['clients.List','clients.Edit','clients.Details','clients.EditAuthor','clients.EditFilter'],
    refs: [
        {
            ref: 'filterWindow',
            xtype: 'appClientsEditFilter',
            selector: 'appClientsEditFilter',
            autoCreate: true
        },
        { ref: 'appTabPanel',selector: 'appTabPanel' }
    ],
    autoLoad: true,
    init: function() {
        this.control({
            'appClients':{
                beforerender: this.initClient
            },
        	'appClientsList':{
        		selectionchange: this.selectClient
        	},
            'appClientsList actioncolumn[action=edit]': {
                click: this.editRecord
            },
            'appClientsList actioncolumn[action=delete]': {
                click: this.deleteRecord
            }, 
            'appClientsList button[action=add]': {
            	click: this.addRecord
            },
            'appHeader button[action=clients_add]': {
            	click: {
                    fn : this.addRecord,
                    params : {
                        is_client: true
                    }
               }
            },
            'appHeader menuitem[action=partners_add]': {
            	click: {
                    fn : this.addRecord,
                    params : {
                        is_client: false
                    }
               }
            },
            'appClientsList button[action=change_author]': {
                click: this.changeAuthor
            },
            'appClientsList button[action=make_client]': {
                click: this.makeClient
            },
            'appClientsList button[action=info_client]': {
                click: this.infoClient
            },
            'appChangeClientAuthor button[action=select]': {
                click: this.saveNewAuthor
            },
            'appClientsEdit button[action=save]': {
                click: this.saveRecord
            },
            'appClientsEdit button[action=save_performer]': {
                click: this.saveRecordPerformer
            },
            'appClientsEdit button[action=cancel]': {
            	click: this.closeForm
            },
            'appChangeClientAuthor button[action=cancel]': {
                click: this.closeChangeUserForm
            },
            'appClientsList button[action=filter_add]': {
                click: this.onFilter
            },
            'appClientsList button[action=filter_delete]': {
                click: this.delFilter
            },
            'appClientsEditFilter button[action=filter]': {
                click: this.doFilter
            },
            'appClientsList pagingtoolbar': {
                change: this.changePage
            },
        });
        this.callParent(arguments);
    },

    changePage: function(pagingtoolbar, pageData, eOpts) {
        pagingtoolbar.up('grid').getSelectionModel().select(0);
    },

    onFilter: function (button) {
        var win = this.getFilterWindow();
        win.show();
    },
    
    delFilter: function (button) {
        var grid = button.up('appClientsList');
        var store = grid.getStore();
        store.clearFilter();
        button.blur();
    },
    
    doFilter: function (button) {
        var win = this.getFilterWindow();
        var grid = Ext.getCmp('tabpanel').getActiveTab().down('appClientsList');
        var store = grid.getStore();
        var values = win.down('form').getValues();
        var filters = [];
 
        for (var p in values) {
            var value = values[p];
            if (value.length!=0) {
                filters.push({ property: p, value: value, anyMatch: true});
            }
        };
        win.close();
        if (filters.length) {
            store.clearFilter(true);
            store.filter(filters);
        } 
        else {
            store.clearFilter();
        }
    },
    
    initClient: function(view, eOpts) {
        var type = view.typeapp;
        if (type.indexOf('partners_view') >= 0) {
            view.down('#add_order_buy').setVisible(false);
            view.down('#add_order_sale').setVisible(false);
            view.down('#add').setText('Создать контрагента');
        }
        else {
            view.down('#make_client').setVisible(false);
        }
    },
    
    selectClient: function(selections, model, options) {
        var select_client = selections.getSelection();
        if (select_client.length > 0) {
            var xtemp = Ext.getCmp('tabpanel').getActiveTab().down('appClientsDetails');
            xtemp.update(select_client[0].data);
            var client_id = select_client[0].get('id');
            var store_client_comments = Ext.getCmp('tabpanel').getActiveTab().down('appClientCommentsList').getStore();
            store_client_comments.getProxy().extraParams = {client: client_id};
            store_client_comments.load();
        }
    },
    editRecord: function(gridview, el, rowIndex, colIndex, e, record, rowEl) {
    	if (record.get('author')==parseInt(CRMRE.global.Vars.user_id)||
	       (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'can_change_all_clients')!=-1)) {
	        var view = Ext.widget('appClientsEdit');
            var type = gridview.up('appClients').typeapp;
	        if(record){
	        	form = view.down('form');
                if (type.indexOf('client') >= 0) {
		            form.down('#client_name').setFieldLabel('Клиент');
		            view.setTitle('Данные по клиенту');
		        }
		        else {
		            form.down('#client_name').setFieldLabel('Контрагент');
		            view.setTitle('Данные по контрагенту');
		            view.down('#edit_add_order_buy').hide();
        			view.down('#edit_add_order_sale').hide();
		        };
		        form.loadRecord(record);
	            view.show();
	      	}
	    }
        else {
            Ext.Msg.alert('Предупреждение', 'У Вас нет полномочий редактировать клиента!');    
        }
    },
    
    addRecord: function(button,e,eOpts) {
    	var view = Ext.widget('appClientsEdit');
        var form = view.down('form');
        if (button.getItemId()=='add') {
        	var type = button.up('appClients').typeapp;
        	if (type.indexOf('client') >= 0) {
        		is_client = true;
        	} else {
        		is_client = false;
        	}
        } else {
        	is_client = eOpts.params.is_client;
        };
        if (is_client) {
            form.down('#client_name').setFieldLabel('Клиент');
            view.setTitle('Данные по клиенту');
        }
        else {
            form.down('#client_name').setFieldLabel('Контрагент');
            view.setTitle('Данные по контрагенту');
            view.down('#edit_add_order_buy').hide();
        	view.down('#edit_add_order_sale').hide();
        };
        form.getForm().setValues({author: parseInt(CRMRE.global.Vars.user_id),create_date: new Date(),
                                      client_type: true, is_client: is_client});
        view.down('#edit_add_order_buy').setDisabled(true);
        view.down('#edit_add_order_sale').setDisabled(true);
        view.show();
    },
    
    makeClient: function(button){
        var grid_clients = button.up('appClientsList');
        var selection_clients = grid_clients.getSelectionModel().getSelection();
        // проверяем что клиент выбран
        if (selection_clients.length > 0) {
            if (selection_clients[0].get('author')==parseInt(CRMRE.global.Vars.user_id)||(Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'can_change_all_clients')!=-1)) {
                Ext.MessageBox.confirm('Подтвердите действие!', 'Вы действительно хотите сделать контрагента клиентом?', function(btn){
	                if (btn == 'yes') {
		                var store_clients = grid_clients.getStore();
		                // проверяем что клиент выбран
		                selection_clients[0].set('is_client',true);
		                store_clients.sync({
			                success : function(data_batch,controller) {
		                        store_clients.clearFilter(true);
                                var filters = [];
                                filters.push({ property: 'is_client', value: false, exactMatch: true});
                                store_clients.filter(filters);
				                record_last = store_clients.last();
				                if (record_last != undefined) {
				                    grid_clients.getSelectionModel().select(record_last);
				                }	                    
		                    },
		                    scope: this            
		                });
	                }
                });
            }
            else {
                Ext.Msg.alert('Предупреждение', 'У Вас нет полномочий на изменение создателя!');    
            }
        }
        else {
            Ext.Msg.alert('Предупреждение', 'Не выбран клиент!');    
        };
    },
    
    changeAuthor: function(button){
        var grid_clients = button.up('appClientsList');
        var selection_clients = grid_clients.getSelectionModel().getSelection();
        // проверяем что клиент выбран
        if (selection_clients.length > 0) {
            if (selection_clients[0].get('author')==parseInt(CRMRE.global.Vars.user_id)||(Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'can_change_all_clients')!=-1)) {
                var view_change_user = Ext.widget('appChangeClientAuthor');
                var form_change_user = view_change_user.down('form');
            }
            else {
                Ext.Msg.alert('Предупреждение', 'У Вас нет полномочий на изменение создателя!');    
            }
        }
        else {
            Ext.Msg.alert('Предупреждение', 'Не выбран клиент!');    
        };
    },
    
    infoClient: function(button){
        var grid_clients = button.up('appClientsList');
        var selection_clients = grid_clients.getSelectionModel().getSelection();
        // проверяем что клиент выбран
        if (selection_clients.length > 0) {
            var tabpanel = this.getAppTabPanel();
	        var itemId = selection_clients[0].get('represent')+" - "+selection_clients[0].get('index');
	        var tab = tabpanel.getComponent(itemId); // поиск закладки с itemId = data.id

	        if (tab) {
	            tab.show();
	            tab.focus();
	            return;
	        } // если закладка  существует, она открывается
	        
	        tabpanel.add({ // добавляем закладку
	           xtype: 'appInfoClient',
	           itemId: itemId,
	           title: itemId,
               autoScroll:true,
	           client_id: selection_clients[0].getId(),
	           iconCls: 'tabs',
	           closable: true
	        }).show();
        }
        else {
            Ext.Msg.alert('Предупреждение', 'Не выбран клиент!');    
        };
    },
    
    saveNewAuthor: function(button) {
        var view_change_user = button.up('appChangeClientAuthor');
        var form_change_user = view_change_user.down('form');
        if (form_change_user.isValid()) {
                var author = form_change_user.getValues().user;
                var grid_clients = Ext.getCmp('tabpanel').getActiveTab().down('appClientsList');
		        var selection_clients = grid_clients.getSelectionModel().getSelection();
                var store_clients = grid_clients.getStore();
		        // проверяем что клиент выбран
		        if (selection_clients.length > 0) {
                    selection_clients[0].set('author',author);
                    store_clients.sync();
                }
                view_change_user.close();
        }
        else {
            return;
        }
    },
    
    saveRecord: function(button) {
    	
    	var view = button.up('window');
        var form = view.down('form');
        var values = form.getValues();
        var record = form.getRecord();
        try {
            var grid = Ext.getCmp('tabpanel').getActiveTab().down('appClientsList');
            var store = grid.getStore();
        } catch (err) {
            var grid = null;
            var store = Ext.data.StoreManager.lookup('Clients');
        };
        if (form.isValid()) {
            if (values.id > 0) {
                record.set(values);
                store.sync({
                    success : function(data_batch,controller) {
                        if (grid) {
                        	var xtemp = Ext.getCmp('tabpanel').getActiveTab().down('appClientsDetails');
                        	xtemp.update(record.data);
	                        grid.getSelectionModel().select(record);
	                        grid.getView().focusRow(record);
	                    };
	                    form.loadRecord(record);
                        Ext.MessageBox.show({
		                     title: 'Сообщение',
		                     msg: 'Данные по клиенту изменены!',
		                     icon: Ext.MessageBox.INFO,
		                     buttons: Ext.Msg.OK
		                });
                    },
                    scope: this
                });
            } else {
                var record = Ext.create('CRMRE.model.Clients');
                record.set(values);
                if (grid){
                    typeapp = grid.up('tabpanel').getActiveTab().typeapp;
                };
                if ((grid)&&(((record.get('is_client')==true)&&(typeapp=='clients_view'))
                            ||((record.get('is_client')==false)&&(typeapp=='partners_view')))) {
                    flag_select = true;
                }
                else {
                    var store = Ext.data.StoreManager.lookup('Clients');
                    flag_select = false;
                }
                store.add(record);
                store.sync({
                    success : function(batch, options) {
                        if (flag_select) {
                            console.log(grid.up('tabpanel').getActiveTab().typeapp);
                            console.log(record.get('is_client'));
	                        store.currentPage = store.proxy.reader.rawData.page;
	                        id = record.getId();
                            store.load({
                                callback: function(){
                                    record_current = store.findRecord('id', id);
                                    grid.getView().focusRow(record_current);
	                                grid.getSelectionModel().select(record_current);
                                }
                            })
	                    };
	                    form.loadRecord(record);
                        view.down('#edit_add_order_buy').setDisabled(false);
        				view.down('#edit_add_order_sale').setDisabled(false);
        				Ext.MessageBox.show({
		                     title: 'Сообщение',
		                     msg: 'Данные по новому клиенту сохранены!',
		                     icon: Ext.MessageBox.INFO,
		                     buttons: Ext.Msg.OK
		                });
                    },
                    scope: this            
                });
            };
        }
	},
    saveRecordPerformer: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        var values = form.getValues();
        var store = Ext.data.StoreManager.lookup('Clients');
        if (form.isValid()) {
            if (values.id > 0) {
                record = store.getById(values.id);
                record.set(values);
                store.sync();
            };
            win.close();
        }
    },
	deleteRecord: function(gridview, el, rowIndex, colIndex, e, rec, rowEl) {
		if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'delete_clients')!=-1) {
	    	store = gridview.getStore();
	    	Ext.MessageBox.confirm('Подтвердите действие!', 'Вы действительно хотите удалить запись?', function(btn){
				if (btn == 'yes') {
		    		store.remove(rec);
		    		store.sync({
	                    success : function(data_batch,controller) {
	                        var store_comm = Ext.getCmp('tabpanel').getActiveTab().down('appClientCommentsList').getStore();
	                        store_comm.removeAll();
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
	    }
        else {
            Ext.Msg.alert('Предупреждение', 'У Вас нет полномочий на удаление клиента!');    
        }
    }, 
    closeForm: function(button) {
    	button.up('window').close();
    }, 
    closeChangeUserForm: function(button) {
        button.up('window').close();
    }
});