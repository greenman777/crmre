Ext.define('CRMRE.controller.OrdersSale', {
    extend: 'Ext.app.Controller',
    stores: ['Users','Clients','OrdersBuy','OrdersSale','TemplatesDoc','directory.OrderStatus','directory.District',
             'directory.City','directory.Microdistrict','directory.Street','directory.Lease',
             'directory.MaterialWalls','directory.Planishing','directory.Refinishing','directory.Bathroom',
             'directory.Condition','directory.Heating','directory.Balcony','directory.LayoutRooms',
             'directory.ObjectCategory','directory.ObjectType','directory.ObjectAccessory',
             'directory.OwnershipType','directory.ContractType','directory.NdsType','directory.ContractType',
             'directory.MethodPayment','directory.Encumbrance','directory.Flooring','directory.Windows',
             'directory.CategoryEarth','directory.Road','directory.GreenPlantings','directory.Constructions',
             'directory.Fencing','directory.ConstructionOrganization'],
    models: ['OrdersSale'],
    views: ['orders_sale.List','orders_sale.Edit','Photos',
            'orders_sale.EditPerformer','orders_sale.EditCategory',
            'orders_sale.EditFilter','orders_sale.EditRating',
            'orders_sale.EditTemplates'],
    refs: [
        {
            ref: 'filterWindow',
            xtype: 'appOrdersSaleEditFilter',
            selector: 'appOrdersSaleEditFilter',
            autoCreate: true
        }
    ],
    init: function() {
        this.control({
        	'appOrdersSale':{
                beforerender: this.initOrdersSale
            },
            'appOrdersSaleEdit':{
            	beforerender: this.initOrdersSaleEdit
            },
        	'appOrdersSaleList':{
        		selectionchange: this.selectOrdersSale
        	},
            'appOrdersSaleList actioncolumn[action=edit]': {
                click: this.editRecord
            },
            'appOrdersSaleList actioncolumn[action=delete]': {
                click: this.deleteRecord
            },
            'appOrdersSaleList button[action=copy]': {
                click: this.copyRecord
            },
            'appOrdersSaleList actioncolumn[action=client_info]': {
                click: this.infoClient
            },
            'appOrdersSaleList button[action=filter_add]': {
                click: this.onFilter
            },
            'appOrdersSaleList button[action=filter_delete]': {
                click: this.delFilter
            },
            'appOrdersSaleEditFilter button[action=filter]': {
                click: this.doFilter
            },
            'appOrdersSaleList actioncolumn[action=photos]': {
                click: this.editPhotos
            },
            'appClientsList button[action=add_order_sale]': {
                click: this.selectCategory
            },
            'appClientsEdit button[action=add_order_sale]': {
                click: this.selectCategory
            },
            'appOrdersSaleList button[action=lock]': {
                click: this.lockOrders
            },
            'appOrdersSaleList button[action=to_archive]': {
                click: this.archiveOrders
            },
            'appOrdersSaleList button[action=return_active]': {
                click: this.returnActiveOrders
            },
            'appOrdersSaleList button[action=close_order]': {
                click: this.closeOrders
            },
            'appOrdersSaleList button[action=lock_open]': {
                click: this.lockopenOrders
            },
            'appOrdersSaleList button[action=change_performer]': {
                click: this.changePerformer
            },
            'appOrdersSaleList button[action=rating]': {
                click: this.changeRating
            },
            'appChangeOrdersSalePerformer button[action=select]': {
                click: this.saveNewPerformer
            },
            'appChangeOrdersSaleRating button[action=select]': {
                click: this.saveRating
            },
            'appOrdersSaleEditCategory button[action=select]': {
                click: this.addRecord
            },
            'appOrdersSaleEdit button[action=save]': {
                click: this.saveRecord
            },
            'appOrdersSaleEdit button[action=cancel]': {
            	click: this.closeForm
            },
            'appOrdersSaleEditCategory button[action=cancel]': {
                click: this.closeForm
            },
            'appChangeOrdersSalePerformer button[action=cancel]': {
                click: this.closeForm
            },
            'appChangeOrdersSaleRating button[action=cancel]': {
                click: this.closeForm
            },
            'appOrdersSaleList button[action=templatesdoc]': {
                click: this.selectTemplatesdoc
            },
            'appOrdersSaleList pagingtoolbar': {
                change: this.changePage
            },
        });
        this.callParent(arguments);
    }, 
    changePage: function(pagingtoolbar, pageData, eOpts) {
        pagingtoolbar.up('grid').getSelectionModel().select(0);
    },
    initOrdersSale: function(view, eOpts) {
        var type = view.typeapp;
        if (type.indexOf('_free') >= 0 || type.indexOf('_archive') >= 0 || type.indexOf('_activ') >= 0 || type.indexOf('_brigadier') >= 0){
            view.down('#to_archive').setVisible(false);
            view.down('#rating').setVisible(false);
        };
        if (type.indexOf('_complet') >= 0 || type.indexOf('_archive') >= 0 || type.indexOf('_activ') >= 0 || type.indexOf('_brigadier') >= 0){
            view.down('#copy_record').setVisible(false);
            view.down('#change_performer').setVisible(false);
        };
        if (type.indexOf('_free') >= 0 || type.indexOf('_activ') >= 0) {
        	view.down('#offer_sale_list').setVisible(false);
        	view.down('#lock').setVisible(false);
            view.down('#lock_open').setVisible(false);
            view.down('#close_order').setVisible(false);
        };
        if ((type.indexOf('_credit') >= 0)||(type.indexOf('_support') >= 0)||(type.indexOf('_completed') >= 0)||(type.indexOf('_brigadier') >= 0)) {
            view.down('#lock').setVisible(false);
            view.down('#lock_open').setVisible(false);
            view.down('#close_order').setVisible(false);
            view.down('#change_performer').setVisible(false);
            view.down('#to_archive').setVisible(false);
            view.down('#rating').setVisible(false);
            
            view.down('#report').setVisible(false);
            view.down('#send').setVisible(false);
            view.down('#search').setVisible(false);
            view.down("appHystoryOfferList").down('#add').setVisible(false);
            view.down("appHystoryShowList").down('#add').setVisible(false);
            view.down("appHystoryServiceList").down('#add').setVisible(false);
        };
        if (type.indexOf('_brigadier') >=0) {
            view.down('#lock').setVisible(true);
            view.down('#lock_open').setVisible(true);
            view.down('#close_order').setVisible(true);
            view.down('#change_performer').setVisible(true);
        };
        if (type.indexOf('_free') >= 0 || type.indexOf('_archive') >= 0 || type.indexOf('_activ') >= 0) {
            view.down('#lock').setVisible(false);
            view.down('#lock_open').setVisible(false);
            view.down('#close_order').setVisible(false);
            
            view.down('#report').setVisible(false);
            view.down('#send').setVisible(false);
            view.down('#search').setVisible(false);
            view.down("appHystoryOfferList").down('#add').setVisible(false);
            view.down("appHystoryShowList").down('#add').setVisible(false);
            view.down("appHystoryServiceList").down('#add').setVisible(false);
        }
        if (type.indexOf('_complet') >= 0) {
        	view.down('#lock').setVisible(false);
            view.down('#lock_open').setVisible(false);
            view.down('#close_order').setVisible(false);
            
            view.down('#report').setVisible(false);
            view.down('#send').setVisible(false);
            view.down('#search').setVisible(false);
        }
        else {
            view.down('#to_archive').setVisible(false);
            view.down('#return_active').setVisible(false);
            view.down('#rating').setVisible(false);
        };
    },
    
    initOrdersSaleEdit: function(view, eOpts) {
        //if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'change_advertising')==-1){
        //	view.down('tabpanel').remove(view.down('#advertising'));
        //}
    },
    
    onFilter: function (button) {
        var win = this.getFilterWindow();
        win.show();
    },
    
    delFilter: function (button) {
        var grid = button.up('appOrdersSaleList');
        var store = grid.getStore();
        store.clearFilter();
        button.blur();
        var selection = grid.getSelectionModel().getSelection();
        grid.getSelectionModel().deselectAll();
        grid.getSelectionModel().select(store.getAt(0));
        grid.getView().focusRow(store.getAt(0));
    },
    
    doFilter: function (button) {
        var win = this.getFilterWindow();
        var grid = Ext.getCmp('tabpanel').getActiveTab().down('appOrdersSaleList');
        var store = grid.getStore();
        var values = win.down('form').getValues();
        var filters = [];
 
        for (var p in values) {
            var value = values[p];
            if (value.length!=0) {
                filters.push({ property: p, value: value, exactMatch: true});
            }
        };
        win.close();
        if (filters.length) {
            store.clearFilter(true);
            store.filter(filters);
            if (store.getAt(0)) {
                grid.getSelectionModel().deselectAll();
                grid.getSelectionModel().select(store.getAt(0));
                grid.getView().focusRow(store.getAt(0));
            }
            else {
                var store_offer = Ext.getCmp('tabpanel').getActiveTab().down('#OfferList').getStore();
                var store_hyst_offer = Ext.getCmp('tabpanel').getActiveTab().down('appHystoryOfferList').getStore();
                var store_hyst_show = Ext.getCmp('tabpanel').getActiveTab().down('appHystoryShowList').getStore();
                var store_hyst_service = Ext.getCmp('tabpanel').getActiveTab().down('appHystoryServiceList').getStore();
                store_offer.loadData([],false);
                store_hyst_offer.loadData([],false);
                store_hyst_show.loadData([],false);
                store_hyst_service.loadData([],false);
            }
        }
        else {
            store.clearFilter();
        }
    },
    
    /*Подгружаем предложения при выборе заявки*/
    selectOrdersSale: function(selections, model, options) {

        var grid_order = Ext.getCmp('tabpanel').getActiveTab().down('appOfferSaleList');
    	var store_offer = grid_order.getStore();
        var select_order = selections.getSelection();
        
        var store_hyst_offer = Ext.getCmp('tabpanel').getActiveTab().down('appHystoryOfferList').getStore();
        var store_hyst_show = Ext.getCmp('tabpanel').getActiveTab().down('appHystoryShowList').getStore();
        var store_hyst_service = Ext.getCmp('tabpanel').getActiveTab().down('appHystoryServiceList').getStore();
        store_hyst_offer.loadData([],false);
        store_hyst_show.loadData([],false);
        store_hyst_service.loadData([],false);
        
        if (select_order.length) {
            var order_id = select_order[0].get('id');
            store_offer.getProxy().extraParams = {order_type:grid_order.getXType(),order_id: order_id};
            store_offer.load({
                scope: this,
                callback: function(records, operation, success) {
                    if (success) {
                        grid_order.getSelectionModel().deselectAll();
                        grid_order.getSelectionModel().select(0);
                        grid_order.getView().focusRow(0);
                    }
                }
            });
        };
    },

    configForm: function(object_category_name,form) {
	  	if (object_category_name == 'Жилая недвижимость') {
			form.down('tabpanel').remove(form.down('#objects_info_commercial'));
			form.down('tabpanel').remove(form.down('#objects_extend_commercial'));
			form.down('tabpanel').remove(form.down('#objects_info_earth'));
			form.down('tabpanel').remove(form.down('#objects_info_business'));
			form.down('#features_residential').remove(form.down('#flooring'));
			form.down('#features_residential').remove(form.down('#windows'));
			form.down('#nds_type').setVisible(false);
			form.down('#lease').setVisible(false);
			form.down('#transaction_type').flex = 3;
            form.down('#current_yield').setVisible(false);
            form.down('#current_expenses').setVisible(false);
            form.down('#founding_date').setVisible(false);
            form.down('#category_earth').setVisible(false);
        }
		else if (object_category_name == 'Коммерческая недвижимость') {
			form.down('tabpanel').remove(form.down('#objects_info_residential'));
			form.down('tabpanel').remove(form.down('#objects_extend_residential'));
			form.down('tabpanel').remove(form.down('#objects_info_earth'));
			form.down('tabpanel').remove(form.down('#objects_info_business'));
            form.down('#house_apartment').setVisible(false);
            form.down('#luxury_housing').setVisible(false);
            form.down('#number_rooms').setVisible(false);
            form.down('#living_space').setVisible(false);
            form.down('#kitchen_space').setVisible(false);
            form.down('#current_yield').setVisible(false);
            form.down('#current_expenses').setVisible(false);
            form.down('#founding_date').setVisible(false);
            form.down('#category_earth').setVisible(false);
		}
		else if (object_category_name == 'Загородная недвижимость') {
			form.down('tabpanel').remove(form.down('#objects_info_commercial'));
			form.down('tabpanel').remove(form.down('#objects_extend_commercial'));
			form.down('tabpanel').remove(form.down('#objects_info_earth'));
			form.down('tabpanel').remove(form.down('#objects_info_business'));
			//form.down('tabpanel').remove(form.down('#info_structure'));
			form.down('tabpanel').down('#objects_extend_residential').remove(form.down('#flooring_windows'));
            form.down('#lease').setVisible(false);
            form.down('#transaction_type').flex = 3;
            form.down('#nds_type').setVisible(false);
            form.down('#floor').setVisible(false);
            form.down('#layout_rooms').setVisible(false);
            form.down('#planishing').setVisible(false);
            form.down('#current_yield').setVisible(false);
            form.down('#current_expenses').setVisible(false);
            form.down('#founding_date').setVisible(false);
            form.down('#garbage_chute').setVisible(false);
            form.down('#laundry').setVisible(false);
            form.down('#category_earth').setVisible(false);
		}
		else if (object_category_name == 'Земля') {
			form.down('tabpanel').remove(form.down('#objects_info_commercial'));
			form.down('tabpanel').remove(form.down('#objects_extend_commercial'));
			form.down('tabpanel').remove(form.down('#objects_info_residential'));
			form.down('tabpanel').remove(form.down('#objects_extend_residential'));
			form.down('tabpanel').remove(form.down('#objects_info_business'));
			form.down('tabpanel').remove(form.down('#info_structure'));
			form.down('#house_number').setVisible(false);
            form.down('#house_apartment').setVisible(false);
            form.down('#nds_type').setVisible(false);
            form.down('#floor').setVisible(false);
            form.down('#floors').setVisible(false);
            form.down('#current_yield').setVisible(false);
            form.down('#current_expenses').setVisible(false);
            form.down('#founding_date').setVisible(false);
            form.down('#number_rooms').setVisible(false);
            form.down('#living_space').setVisible(false);
            form.down('#kitchen_space').setVisible(false);
		}
		else if (object_category_name == 'Готовый бизнес') {
			form.down('tabpanel').remove(form.down('#objects_info_commercial'));
			form.down('tabpanel').remove(form.down('#objects_extend_commercial'));
			form.down('tabpanel').remove(form.down('#objects_info_residential'));
			form.down('tabpanel').remove(form.down('#objects_extend_residential'));
			form.down('tabpanel').remove(form.down('#objects_info_earth'));
			form.down('tabpanel').remove(form.down('#info_structure'));
            form.down('#lease').setVisible(false);
            form.down('#living_space').setVisible(false);
            form.down('#kitchen_space').setVisible(false);
            form.down('#transaction_type').flex = 3;
            form.down('#number_rooms').setVisible(false);
            form.down('#floors').setVisible(false);
            form.down('#floor').setVisible(false);
            form.down('#luxury_housing').setVisible(false);
            form.down('#house_apartment').setVisible(false);
		}	
    },
    
    copyRecord: function(button) {
        var grid = button.up('appOrdersSaleList');
        var store = grid.getStore();
        var selection = grid.getSelectionModel().getSelection();
        if (selection.length > 0) {
            var record = selection[0];
	        if (record.get('performer')==parseInt(CRMRE.global.Vars.user_id)||
	           (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'change_all_orders-sale')!=-1)) {
	            var view = Ext.widget('appOrdersSaleEdit');
	            if(record){
	                form = view.down('form');
	                var object_category_name = Ext.data.StoreManager.lookup('directory.ObjectCategory').getById(record.get('object_category')).get('name');
	                var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
	                this.configForm(object_category_name,form);
	                form.loadRecord(record);
	                view.setTitle('Новая заявка в категории: ' +  object_category_name);
	                form.getForm().setValues({id:"",index:""});
	                view.show();
	            }
	        }
	        else {
	            Ext.Msg.alert('Предупреждение', 'У Вас нет полномочий копировать заявку!');    
	        }
        }
    },
    
    editRecord: function(gridview, el, rowIndex, colIndex, e, record, rowEl) {
        var view = Ext.widget('appOrdersSaleEdit');
 		if(record){
        	form = view.down('form');
            var object_category_name = Ext.data.StoreManager.lookup('directory.ObjectCategory').getById(record.get('object_category')).get('name');
            this.configForm(object_category_name,form);
            form.loadRecord(record);
            view.setTitle('Изменение заявки категории: ' +  object_category_name);
            var type = gridview.up('appOrdersSale').typeapp;
            if (type.indexOf('_activ') >= 0||type.indexOf('_brigadier') >= 0){
	            view.down('#orders_save').setVisible(false);
	            view.down('#house_number').setVisible(false);
	            view.down('#house_apartment').setVisible(false);
	        };
            if (type.indexOf('_complet') >= 0&&Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'change_all_orders-sale')==-1){
	            view.down('#orders_save').setVisible(false);
                view.down('#house_apartment').setVisible(false);
	        };
            view.show();
      	}
    },
    
    selectCategory: function(button) {
        if (button.getItemId()=='add_order_sale') {
	        var grid_clients = button.up('appClientsList');
	        var selection_clients = grid_clients.getSelectionModel().getSelection();
	        // проверяем что клиент выбран
	        if (selection_clients.length > 0) {
	            var view_category = Ext.widget('appOrdersSaleEditCategory');
	            var form_category = view_category.down('form');
	            form_category.getForm().setValues({client: selection_clients[0].getId()});
	        }
	        else {
	                Ext.Msg.alert('Предупреждение', 'Не выбран клиент!');    
	        };
	    } else {
	        var view_category = Ext.widget('appOrdersSaleEditCategory');
	        var form_category = view_category.down('form');
	        var view = button.up('appClientsEdit');
	        var form = view.down('form');
	        form_category.getForm().setValues({client: form.getRecord().getId()});
	        view.close();
	    }
    },
    
    addRecord: function(button) {
        
        var view_category = button.up('appOrdersSaleEditCategory');
        var form_category = view_category.down('form');
        if (form_category.isValid()) {
            var object_category = form_category.getValues().object_category;
            var client = form_category.getValues().client;
            view_category.close();
        }
        else {
            return;
        }
        var view_order_sale = Ext.widget('appOrdersSaleEdit');
        var form_order_sale = view_order_sale.down('form');
        //заполяем у формы обязательные поля
        var record_object_category = Ext.data.StoreManager.lookup('directory.ObjectCategory').getById(object_category);
        var object_category_name = record_object_category.get('name');
        var object_category_group = record_object_category.get('group');
        this.configForm(object_category_name,form_order_sale);
        view_order_sale.setTitle('Новая заявка категории: ' +  object_category_name);
        var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
        if ((Ext.Array.indexOf(CRMRE.global.Vars.user_groups,object_category_group)!=-1)&&(Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'create_order_active')!=-1)) {
            form_order_sale.getForm().setValues({client: client,author: parseInt(CRMRE.global.Vars.user_id),
                performer: parseInt(CRMRE.global.Vars.user_id),
                object_category: object_category,status: store_status.findRecord('name','активная').getId()        
            });
        }
        else {
            form_order_sale.getForm().setValues({client: client,author: parseInt(CRMRE.global.Vars.user_id),
                object_category: object_category,status: store_status.findRecord('name','свободная').getId()        
            });
        }
        view_order_sale.show();
    },
    
    editPhotos: function(gridview, el, rowIndex, colIndex, e, rec, rowEl) {
    	var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
        if (rec.get('status') != store_status.findRecord('name','свободная').getId()) {
            var record = gridview.getStore().getAt(rowIndex);
	    	if(record){
	    		object = record.data.id;
	    		var view = Ext.widget('appPhotos',{object:object});
	    		view.typeapp = "edit_photos";
	        	form = view.down('form').getForm();
	        	form.setValues({object:object});
	        	view.show();
	    	}
        }
        else {
        	Ext.Msg.alert('Предупреждение', 'У Вас нет полномочий на редактирование фотографий!');	
        }
    	
    },
    
    changePerformer: function(button){
        var grid_orders_sale = button.up('appOrdersSaleList');
        var selection_orders_sale = grid_orders_sale.getSelectionModel().getSelection();
        // проверяем что заявка выбрана
        if (selection_orders_sale.length > 0) {
            if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'share_orders-sale')!=-1) {
                var view_change_user = Ext.widget('appChangeOrdersSalePerformer');
                var form_change_user = view_change_user.down('form');
            }
            else {
                Ext.Msg.alert('Предупреждение', 'У Вас нет полномочий на назначение исполнителя!');    
            }
        }
        else {
            Ext.Msg.alert('Предупреждение', 'Не выбрана заявка!');    
        };
    },
    selectTemplatesdoc: function(button){
        var grid = button.up('appOrdersSaleList');
        var selection = grid.getSelectionModel().getSelection();
        // проверяем что заявка выбрана
        if (selection.length > 0) {
            var view = Ext.widget('appChangeOrdersSaleTemplates');
            var form = view.down('form');
            form.getForm().setValues({order_type: 'sale',order: selection[0].getId()});
        }
        else {
            Ext.Msg.alert('Предупреждение', 'Не выбрана заявка!');
        };
    },
    changeRating: function(button){
        var grid = button.up('appOrdersSaleList');
        var selection = grid.getSelectionModel().getSelection();
        // проверяем что заявка выбрана
        if (selection.length > 0) {
            var status_id = selection[0].get('status');
            var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
            var status_activ = store_status.findRecord('name','сделка завершена').getId();
            if (status_activ!=status_id){
                Ext.Msg.alert('Предупреждение', 'Заявка должна быть успешной!');
                return;
            }
            else if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'rating_agent')!=-1) {
                var view = Ext.widget('appChangeOrdersSaleRating');
                var form = view.down('form');
                var store_user = Ext.data.StoreManager.lookup('Users');
                var agent_id = selection[0].get('performer');
                var record_agent = store_user.getById(agent_id);
                agent_name = record_agent.get('last_name') + ' ' + record_agent.get('first_name'); 
                form.loadRecord(selection[0]);
                form.getForm().setValues({agent_name: agent_name});        
                view.show();
            }
            else {
                Ext.Msg.alert('Предупреждение', 'У Вас нет полномочий на оценку агента!');    
            }
        }
        else {
            Ext.Msg.alert('Предупреждение', 'Не выбрана заявка!');    
        };
    },
    saveNewPerformer: function(button) {
        var view_change_user = button.up('appChangeOrdersSalePerformer');
        var form_change_user = view_change_user.down('form');
        if (form_change_user.isValid()) {
                var performer = form_change_user.getValues().user;
                var grid_orders_sale = Ext.getCmp('tabpanel').getActiveTab().down('appOrdersSaleList');
                var selection_orders_sale = grid_orders_sale.getSelectionModel().getSelection();
                var store_orders_sale = grid_orders_sale.getStore();
                // проверяем что заявка выбрана
                if (selection_orders_sale.length > 0) {
                    var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
                    selection_orders_sale[0].set('performer',performer);
                    store_status.reload();
                    var my = this;
                    if (selection_orders_sale[0].get('status')== store_status.findRecord('name','свободная').getId()){
                        selection_orders_sale[0].set('status',store_status.findRecord('name','активная').getId());
                        store_orders_sale.sync({
                            success : function(data_batch,controller) {
	                        	Ext.create('CRMRE.store.Clients').load({params:{client_id: selection_orders_sale[0].get('client')}, callback: function(records, options, success) {
                                    if (success) {
                                        client = records[0];
                                        var message = 'Вам новая заявка № '+selection_orders_sale[0].get('index')+": "+selection_orders_sale[0].get('heading')+", от "+client.get('represent')+" т."+client.get('phone_represent');
                                        my.fireEvent('addNotifications',performer,message);
                                        //my.fireEvent('addTask',performer,'Отработать заявку № '+selection_orders_sale[0].get('index'),'Посмотреть, сфотографировать, заполнить данные заявки');
                                    }
                                }});
                            },
                            scope: this            
                        });
                        if (Ext.getCmp('tabpanel').getActiveTab().title=='Свободные заявки на продажу') {
                            store_orders_sale.clearFilter(true);
                            var filters = [];
                            filters.push({ property: 'status', value: store_status.findRecord('name','свободная').getId(), exactMatch: true});
                            store_orders_sale.filter(filters);
                            record_last = store_orders_sale.last();
                            if (record_last != undefined) {
                                grid_orders_sale.getSelectionModel().select(record_last);
                            }   
                        }
                    }
                    else {
                        store_orders_sale.sync({
                            success : function(data_batch,controller) {
	                        	Ext.create('CRMRE.store.Clients').load({params:{client_id: selection_orders_sale[0].get('client')}, callback: function(records, options, success) {
                                    if (success) {
                                        client = records[0];
                                        var message = 'Вам новая заявка № '+selection_orders_sale[0].get('index')+": "+selection_orders_sale[0].get('heading')+", от "+client.get('represent')+" т."+client.get('phone_represent');
                                        my.fireEvent('addNotifications',performer,message);
                                        //my.fireEvent('addTask',performer,'Отработать заявку № '+selection_orders_sale[0].get('index'),'Посмотреть, сфотографировать, заполнить данные заявки');
                                    }
                                }});
                            },
                            scope: this            
                        });
                    }
                }
                view_change_user.close();
        }
        else {
            return;
        }
    },
    saveRating: function(button) {
        var view_rating = button.up('appChangeOrdersSaleRating');
        var form_rating = view_rating.down('form');
        if (form_rating.isValid()) {
                var grid_orders_sale = Ext.getCmp('tabpanel').getActiveTab().down('appOrdersSaleList');
                var selection_orders_sale = grid_orders_sale.getSelectionModel().getSelection();
                var store_orders_sale = grid_orders_sale.getStore();
                // проверяем что заявка выбрана
                if (selection_orders_sale.length > 0) {
                    var rating = form_rating.getValues().rating;
                    var rating_comment = form_rating.getValues().rating_comment;
                    var store_user = Ext.data.StoreManager.lookup('Users');
                    var agent_id = selection_orders_sale[0].get('performer');
                    var record_agent = store_user.getById(agent_id);
                    agent_name = record_agent.get('last_name') + ' ' + record_agent.get('first_name');
                    var rating_old = selection_orders_sale[0].get('rating');
                    selection_orders_sale[0].set('rating',rating);
                    selection_orders_sale[0].set('rating_comment',rating_comment);
                    var my = this;
                    store_orders_sale.sync({
                        success : function(data_batch,controller) {
                            if ((rating <= 3)&(rating != rating_old)){
                                Ext.Ajax.request({
                                    url: '/manager/',
                                    params: {
                                        agent: selection_orders_sale[0].get('performer')
                                    },
                                    success: function(response, opts) {
                                        var obj = Ext.decode(response.responseText);
                                        var managers = obj.messages['managers'];
                                        if (managers != 0) {
                                            for (var i = 0; i < managers.length; i++) {
                                               my.fireEvent('addNotifications',managers[i],agent_name+' получил оценку: '+rating);
                                            }
                                        }
                                    }
                               });
                            }
                        },
                        failure: function (proxy, operations) {
                            // resume records
                            store_orders_sale.rejectChanges();
                        },
                        scope: this            
                    });
                }
                view_rating.close();
        }
        else {
            return;
        }
    },
    saveRecord: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        var record = form.getRecord();
        var values = form.getValues();
        if (form.isValid()) {
            if (values.id > 0) {
                var grid = Ext.getCmp('tabpanel').getActiveTab().down('appOrdersSaleList');
                var pagination = Ext.getCmp('tabpanel').getActiveTab().down('#pagingtoolbar');
                var store = grid.getStore();
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
                try {//выбираем если заявка скопирована
                    var grid = Ext.getCmp('tabpanel').getActiveTab().down('appOrdersSaleList');
		            var store = grid.getStore();
		        }
		        catch (e) {//выбираем если новая заявка
		          var store = this.getOrdersSaleStore();
		        }
                var record = Ext.create('CRMRE.model.OrdersSale');
                record.set(values);
                store.add(record);
                var my = this;
                store.sync({
                    success : function(data_batch,controller) {
                        if (record.get('performer')) {
                        	Ext.create('CRMRE.store.Clients').load({params:{client_id: record.get('client')}, callback: function(records, options, success) {
                                if (success) {
                                    client = records[0];
                                    var message = 'Вам новая заявка № '+record.get('index')+": "+record.get('heading')+", от "+client.get('represent')+" т."+client.get('phone_represent');
                                    my.fireEvent('addNotifications',record.get('performer'),message);
                                }
                            }});
                        };
                        if (grid) {
	                        store.currentPage = store.proxy.reader.rawData.page;
	                        id = record.getId();
                            store.load({
                                callback: function() {
                                    record_current = store.findRecord('id', id);
                                    grid.getView().focusRow(record_current);
                                    grid.getSelectionModel().select(record_current);
                                }
                            })
	                    } else {
                            Ext.MessageBox.show({
                                title: 'Заявка на продажу успешно создана!',
                                msg: 'Номер созданной заявки: '+record.get('index'),
                                icon: Ext.MessageBox.INFO,
                                buttons: Ext.Msg.OK
                            });
                        }
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
        if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'delete_orderssale')!=-1) {
            var store = gridview.getStore();
            Ext.MessageBox.confirm('Подтвердите действие!', 'Вы действительно хотите удалить запись?', function(btn){
                if (btn == 'yes') {
                    store.remove(rec);
                    store.sync({
                        success : function(data_batch,controller) {
                            var store_offer = Ext.getCmp('tabpanel').getActiveTab().down('appOfferSaleList').getStore();
                            var store_hyst_offer = Ext.getCmp('tabpanel').getActiveTab().down('appHystoryOfferList').getStore();
                            var store_hyst_show = Ext.getCmp('tabpanel').getActiveTab().down('appHystoryShowList').getStore();
                            var store_hyst_service = Ext.getCmp('tabpanel').getActiveTab().down('appHystoryServiceList').getStore();
                            store_offer.loadData([],false);
                            store_hyst_offer.loadData([],false);
                            store_hyst_show.loadData([],false);
                            store_hyst_service.loadData([],false);
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
            Ext.Msg.alert('Предупреждение', 'У Вас нет полномочий на удаление заявки!');    
        }
    }, 
    lockOrders: function(button){
        var grid = button.up('appOrdersSaleList');
        var store = grid.getStore();
        var selection = grid.getSelectionModel().getSelection();
        // проверяем что заявка выбрана
        if (selection.length > 0) {
            if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'lock_orders-sale')!=-1) {
                Ext.MessageBox.confirm('Подтвердите действие!', 'Вы действительно хотите заблокировать заявку?', function(btn){
                	if (btn == 'yes') {
		                var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
		                store_status.reload();
		                var my = this;
		                if (selection[0].get('status')== store_status.findRecord('name','активная').getId()){
		                    selection[0].set('status',store_status.findRecord('name','выход на сделку').getId());
		                    store.sync();
		                };
                	};
                });
            }
            else {
                Ext.Msg.alert('Предупреждение', 'У Вас нет полномочий блокировать заявку!');    
            }
        }
        else {
            Ext.Msg.alert('Предупреждение', 'Не выбрана заявка!');    
        };
    },
    lockopenOrders: function(button){
        var grid = button.up('appOrdersSaleList');
        var store = grid.getStore();
        var selection = grid.getSelectionModel().getSelection();
        // проверяем что заявка выбрана
        if (selection.length > 0) {
            if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'lock_orders-sale')!=-1) {
                Ext.MessageBox.confirm('Подтвердите действие!', 'Вы действительно хотите разблокировать заявку?', function(btn){
                	if (btn == 'yes') {
		                var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
		                store_status.reload();
		                var my = this;
		                if (selection[0].get('status')== store_status.findRecord('name','выход на сделку').getId()){
		                    selection[0].set('status',store_status.findRecord('name','активная').getId());
		                    store.sync();
		                };
                	};
                });
            }
            else {
                Ext.Msg.alert('Предупреждение', 'У Вас нет полномочий  разблокировать заявку!');    
            }
        }
        else {
            Ext.Msg.alert('Предупреждение', 'Не выбрана заявка!');    
        };
    },
    closeOrders: function(button){
        var grid = button.up('appOrdersSaleList');
        var store = grid.getStore();
        var selection = grid.getSelectionModel().getSelection();
        // проверяем что заявка выбрана
        if (selection.length > 0) {
            if (selection[0].get('performer')==parseInt(CRMRE.global.Vars.user_id)||
               (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'change_all_orders-sale')!=-1)) {
                Ext.MessageBox.confirm('Подтвердите действие!', 'Вы действительно хотите пометить заявку как отказную?', function(btn){
	                if (btn == 'yes') {
                		var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
	                    store_status.reload();
	                    selection[0].set('status',store_status.findRecord('name','отказная').getId());
	                    store.sync({
	                        success : function(data_batch,controller) {
	                            store.load();
	                        },
                            failure: function (proxy, operations) {
		                        // resume records
		                        store.rejectChanges();
		                    },
	                        scope: this            
	                    });
                	};
                });
            }
            else {
                Ext.Msg.alert('Предупреждение', 'У Вас нет полномочий на перемещение заявки в архив!');    
            }
        }
        else {
            Ext.Msg.alert('Предупреждение', 'Не выбрана заявка!');    
        };
    },
    archiveOrders: function(button){
        var grid = button.up('appOrdersSaleList');
        var store = grid.getStore();
        var selection = grid.getSelectionModel().getSelection();
        // проверяем что заявка выбрана
        if (selection.length > 0) {
            if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'lock_orders-sale')!=-1) {
                Ext.MessageBox.confirm('Подтвердите действие!', 'Вы действительно хотите поместить заявку в архив?', function(btn){
                	if (btn == 'yes') {
	                    var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
	                    store_status.reload();
	                    var my = this;
	                    selection[0].set('status',store_status.findRecord('name','архив').getId());
	                    store.sync({
	                        success : function(data_batch,controller) {
	                            if (Ext.getCmp('tabpanel').getActiveTab().title=='Завершенные заявки на продажу') {
	                                store.clearFilter(true);
	                                var filters = [];
                                    filters.push({ property: 'status', value: store_status.findRecord('name','сделка завершена').getId(), exactMatch: true});
                                    filters.push({ property: 'status', value: store_status.findRecord('name','отказная').getId(), exactMatch: true});
                                    store.filter(filters);
	                                record_last = store.last();
	                                if (record_last != undefined) {
	                                    grid.getSelectionModel().select(record_last);
	                                }   
	                            }
	                        },
                            failure: function (proxy, operations) {
		                        // resume records
		                        store.rejectChanges();
		                    },
	                        scope: this            
	                    });
                	};
                });
            }
            else {
                Ext.Msg.alert('Предупреждение', 'У Вас нет полномочий на перемещение заявки в архив!');    
            }
        }
        else {
            Ext.Msg.alert('Предупреждение', 'Не выбрана заявка!');    
        };
    },
    returnActiveOrders: function(button){
        var grid = button.up('appOrdersSaleList');
        var store = grid.getStore();
        var selection = grid.getSelectionModel().getSelection();
        // проверяем что заявка выбрана
        if (selection.length > 0) {
            if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'lock_orders-sale')!=-1) {
                Ext.MessageBox.confirm('Подтвердите действие!', 'Вы действительно хотите вернуть заявку в активные?', function(btn){
                	if (btn == 'yes') {
	                    var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
	                    store_status.reload();
	                    var my = this;
	                    selection[0].set('status',store_status.findRecord('name','активная').getId());
	                    store.sync({
	                        success : function(data_batch,controller) {
	                            if (Ext.getCmp('tabpanel').getActiveTab().title=='Завершенные заявки на продажу') {
	                                store.clearFilter(true);
	                                var filters = [];
                                    filters.push({ property: 'status', value: store_status.findRecord('name','сделка завершена').getId(), exactMatch: true});
                                    filters.push({ property: 'status', value: store_status.findRecord('name','отказная').getId(), exactMatch: true});
                                    store.filter(filters);
	                                record_last = store.last();
	                                if (record_last != undefined) {
	                                    grid.getSelectionModel().select(record_last);
	                                }
	                            }
	                        },
                            failure: function (proxy, operations) {
		                        // resume records
		                        store.rejectChanges();
		                    },
	                        scope: this
	                    });
                	};
                });
            }
            else {
                Ext.Msg.alert('Предупреждение', 'У Вас нет полномочий на возвращение заявки в активные!');
            }
        }
        else {
            Ext.Msg.alert('Предупреждение', 'Не выбрана заявка!');
        };
    },
    infoClient: function(view, el, rowIndex, colIndex, e, rec, rowEl) {
        var view = Ext.widget('appClientsEdit');
        var store_search = Ext.create('CRMRE.store.Clients');
        var client_id = rec.get('client');
        store_search.load({ 
            params: {client_id:client_id}, 
            scope: this,
            callback: function(records, operation, success) {
                if (success) {
                    var record = records[0];
                    var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
                    if(record){
			            if (((record.get('author')==parseInt(CRMRE.global.Vars.user_id))||
                            (rec.get('performer')==parseInt(CRMRE.global.Vars.user_id))||
                            (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'view_hidden_fields_clients')!=-1))||
                            (rec.get('status') == store_status.findRecord('name','свободная').getId())) {
                                form = view.down('form');
                                form.down('#client_name').setFieldLabel('Клиент');
                                console.log(Ext.getCmp('tabpanel').getActiveTab().typeapp);
                                if ((Ext.getCmp('tabpanel').getActiveTab().typeapp.indexOf('_my') == -1)&&
                                    (Ext.getCmp('tabpanel').getActiveTab().typeapp.indexOf('_completed') == -1)){
                                    view.down('#client_save').setVisible(false);
                                }
                                else {
                                    view.down('#client_save').action = "save_performer";
                                };
                                form.loadRecord(record);
                                view.setTitle('Данные по клиенту');
                                view.show();
			            }
			            else {
			                Ext.Msg.alert('Предупреждение', 'У Вас нет полномочий на просмотр данных о клиенте!');
			            }
			        }
			        else {
			            Ext.Msg.alert('Предупреждение', 'Запись о клиенте не найдена!');    
			        }
                }
            }
        });
    },
    closeForm: function(button) {
        button.up('window').close();
    }
});