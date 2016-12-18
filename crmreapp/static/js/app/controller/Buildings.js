Ext.define('CRMRE.controller.Buildings', {
    extend: 'Ext.app.Controller',
    stores: ['Buildings','BuildingPhotos','Plan','PlanPhotos'],
    models: ['Buildings'],
    views: ['buildings.BuildingsList','buildings.BuildingsEdit','buildings.BuildingPhotos','buildings.PlanList'],
    init: function() {
        this.control({
        	'appBuildings':{
                beforerender: this.initBuildings
            },
        	'appBuildingsList':{
        		selectionchange: this.selectBuildings
        	},
            'appBuildingsList actioncolumn[action=edit]': {
                click: this.editRecord
            },
            'appBuildingsList actioncolumn[action=delete]': {
                click: this.deleteRecord
            },
            'appBuildingsList button[action=add]': {
                click: this.addRecord
            },
            'appBuildingsList button[action=update]': {
                click: this.updateRecord
            },
            'appBuildingsEdit button[action=save]': {
                click: this.saveRecord
            },
            'appBuildingsEdit button[action=cancel]': {
            	click: this.closeForm
            }
        });
        this.callParent(arguments);
    }, 
    
    initBuildings: function(view, eOpts) {
		//Действия при инициализацци формы
    },
    
    /*Подгружаем планировки при выборе заявки*/
    selectBuildings: function(selections, model, options) {
        var grid_plan = Ext.getCmp('tabpanel').getActiveTab().down('appPlanList');
    	var store_plan= grid_plan.getStore();
        var select_building = selections.getSelection();
        if (select_building.length) {
            var building = select_building[0].getId();
            var form_photo = Ext.getCmp('tabpanel').getActiveTab().down('#building_form_photo');
        	form_photo.getForm().setValues({building: building});
            Ext.getStore('BuildingPhotos').load({params: {building:building}});
            store_plan.getProxy().extraParams = {building: building};
            store_plan.load({
                scope: this,
                callback: function(records, operation, success) {
                    if (success) {
                    	if (records.length){
                    		grid_plan.getSelectionModel().deselectAll();
                        	grid_plan.getSelectionModel().select(0);	
                    	}
                    	else{
                    		Ext.getStore('PlanPhotos').loadData([],false);
                    	}
                    		
                    }
                }
            });
        };
    },
    //Обнавляем список заявок на предложение
    updateRecord: function(button) {
        var grid = button.up('appBuildingsList');
        var store = grid.getStore();
        grid.focus();
        var selection = grid.getSelectionModel().getSelection();
        store.reload({
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
	    if(record){
	    	var view = Ext.widget('appBuildingsEdit');
	    	if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'change_buildings')==-1) {
		        view.down('#building_save').setVisible(false);
		 		
		    }
        	form = view.down('form');
            form.loadRecord(record);
            view.show();
       	}
    },
    
    addRecord: function(button) {
        if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'add_buildings')!=-1) {
	        var view = Ext.widget('appBuildingsEdit');
	        var form = view.down('form');
	        view.show();
	    }
	    else {
            Ext.Msg.alert('Предупреждение', 'У Вас нет полномочий на добавление новостройки!');    
        }
    },
    
    saveRecord: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        var record = form.getRecord();
        var values = form.getValues();
        var grid = Ext.getCmp('tabpanel').getActiveTab().down('appBuildingsList');
        var store = grid.getStore();
        if (form.isValid()) {
            if (values.id > 0) {
                record.set(values);
                store.sync({
	                success : function(data_batch,controller) {
	                    grid.getSelectionModel().select(record);
	                    grid.getView().focusRow(record);
	                },
                    failure: function (proxy, operations) {
				        // resume records
				        store.rejectChanges();
				    },
	                scope: this            
	            });
            } else {
                
		        var store = this.getBuildingsStore();
                var record = Ext.create('CRMRE.model.Buildings');
                record.set(values);
                store.add(record);
                var my = this;
                store.sync({
                    success : function(data_batch,controller) {
		                grid.getView().focusRow(record);  
                        grid.getSelectionModel().select(record);
		                Ext.MessageBox.show({
		                     title: 'Новостройка добавлена!',
		                     msg: 'Номер новостройки: '+record.get('index'),
		                     icon: Ext.MessageBox.INFO,
		                     buttons: Ext.Msg.OK
		                });
                    },
                    failure: function (proxy, operations) {
                        store.rejectChanges();
                    },
                    scope: this            
                });
            };
            win.close();
        }
    },
    
    deleteRecord: function(gridview, el, rowIndex, colIndex, e, rec, rowEl) {
        if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'delete_buildings')!=-1) {
            var store = gridview.getStore();
            Ext.MessageBox.confirm('Подтвердите действие!', 'Вы действительно хотите удалить запись?', function(btn){
                if (btn == 'yes') {
                    store.remove(rec);
                    store.sync({
                        success : function(data_batch,controller) {
                            var store_plan = Ext.getCmp('tabpanel').getActiveTab().down('appPlanList').getStore();
                            store_plan.loadData([],false);
                            var record_last = store.last();
                            if (record_last != undefined) {
                                gridview.focusRow(record_last);  
                                gridview.getSelectionModel().select(record_last);    
                            }
                        },
                        failure: function (proxy, operations) {
	                        // resume records
	                        store.rejectChanges();
                        },
                        scope: this      
                    });
                }
            });
        }
        else {
            Ext.Msg.alert('Предупреждение', 'У Вас нет полномочий на удаление новостройки!');    
        }
    },
    
    closeForm: function(button) {
        button.up('window').close();
    }
});