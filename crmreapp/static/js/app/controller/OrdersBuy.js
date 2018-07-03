Ext.define('CRMRE.controller.OrdersBuy', {
    extend: 'Ext.app.Controller',
    stores: ['Clients','OrdersBuy','OrdersSale','TemplatesDoc','directory.OrderStatus','ListObjectType','ListDistrict',
             'ListCity','ListMicrodistrict','ListStreet','ListRooms',
             'directory.District','directory.City','directory.Microdistrict','directory.ContractType',
             'directory.Street','directory.ObjectCategory','directory.ObjectType','directory.Bank'],
    models: ['OrdersBuy'],
 	views: ['orders_buy.List','orders_buy.Edit','orders_buy.EditCategory',
            'orders_buy.EditPerformer','orders_buy.EditFilter',
            'orders_buy.EditTemplates','orders_buy.EditRating'],
    refs: [
        {
            ref: 'filterWindow',
            xtype: 'appOrdersBuyEditFilter',
            selector: 'appOrdersBuyEditFilter',
            autoCreate: true
        }
    ],
    init: function() {
        this.control({
        	'appOrdersBuy':{
                beforerender: this.initOrdersBuy
            },
        	'appOrdersBuyList':{
        		selectionchange: this.selectOrdersBuy
        	},
            'appOrdersBuyList actioncolumn[action=edit]': {
                click: this.editRecord
            },
            'appOrdersBuyList actioncolumn[action=delete]': {
                click: this.deleteRecord
            },
            'appOrdersBuyList actioncolumn[action=client_info]': {
                click: this.infoClient
            },
            'appOrdersBuyList button[action=filter_add]': {
                click: this.onFilter
            },
            'appOrdersBuyList button[action=filter_delete]': {
                click: this.delFilter
            },
            'appOrdersBuyEditFilter button[action=filter]': {
                click: this.doFilter
            },
            'appClientsList button[action=add_order_buy]': {
            	click: this.selectCategory
            },
            'appClientsEdit button[action=add_order_buy]': {
                click: this.selectCategory
            },
            'appOrdersBuyList button[action=lock]': {
                click: this.lockOrders
            },
            'appOrdersBuyList button[action=to_archive]': {
                click: this.archiveOrders
            },
            'appOrdersBuyList button[action=return_active]': {
                click: this.returnActiveOrders
            },
            'appOrdersBuyList button[action=close_order]': {
                click: this.closeOrders
            },
            'appOrdersBuyList button[action=lock_open]': {
                click: this.lockopenOrders
            },
            'appOrdersBuyList button[action=change_performer]': {
                click: this.changePerformer
            },
            'appOrdersBuyList button[action=rating]': {
                click: this.changeRating
            },
            'appChangeOrdersBuyPerformer button[action=select]': {
                click: this.saveNewPerformer
            },
            'appChangeOrdersBuyRating button[action=select]': {
                click: this.saveRating
            },
            'appOrdersBuyEditCategory button[action=select]': {
                click: this.addRecord
            },
            'appOrdersBuyEdit button[action=save]': {
                click: this.saveRecord
            },
            'appOrdersBuyEdit button[action=cancel]': {
            	click: this.closeForm
            },
            'appOrdersBuyEditCategory button[action=cancel]': {
                click: this.closeForm
            },
            'appChangeOrdersBuyPerformer button[action=cancel]': {
                click: this.closeForm
            },
            'appOrdersBuyList button[action=templatesdoc]': {
                click: this.selectTemplatesdoc
            },
            'appChangeOrdersBuyRating button[action=cancel]': {
                click: this.closeForm
            },
            'appOrdersBuyList pagingtoolbar': {
                change: this.changePage
            }
        });
        this.callParent(arguments);
    },

    changePage: function(pagingtoolbar, pageData, eOpts) {
        pagingtoolbar.up('grid').getSelectionModel().select(0);
    },

    initOrdersBuy: function(view, eOpts) {
        var type = view.typeapp;
        if (type.indexOf('_free') >= 0 || type.indexOf('_archive') >= 0 || type.indexOf('_activ') >= 0 || type.indexOf('_brigadier') >= 0){
            view.down('#to_archive').setVisible(false);
            view.down('#rating').setVisible(false);
        };
        if (type.indexOf('_complet') >= 0 || type.indexOf('_archive') >= 0 || type.indexOf('_activ') >= 0 || type.indexOf('_brigadier') >= 0){
            view.down('#change_performer').setVisible(false);
        };
        if (type.indexOf('_free') >= 0 || type.indexOf('_activ') >= 0){
        	view.down('#offer_buy_list').setVisible(false);
        	view.down('#lock').setVisible(false);
            view.down('#lock_open').setVisible(false);
            view.down('#close_order').setVisible(false);
        };
        if ((type.indexOf('_credit') >= 0)||(type.indexOf('_support') >= 0)||(type.indexOf('_completed') >= 0) || (type.indexOf('_brigadier') >= 0)) {
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
        if (type.indexOf('_archive') >= 0) {
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
        else if (type.indexOf('_complet') >= 0) {
            view.down('#lock').setVisible(false);
            view.down('#lock_open').setVisible(false);
            view.down('#close_order').setVisible(false);
            
            view.down('#report').setVisible(false);
            view.down('#send').setVisible(false);
            view.down('#search').setVisible(false);
        }
        if (type.indexOf('orders_buy_free') >= 0||type.indexOf('orders_buy_complet') >= 0||type.indexOf('orders_buy_archive') >= 0||type.indexOf('orders_buy_activ') >= 0) {
        	view.down('#templatesdoc').setVisible(false);
        }
        else {
            view.down('#to_archive').setVisible(false);
            view.down('#return_active').setVisible(false);
            view.down('#rating').setVisible(false);
        };
    },
    
    onFilter: function (button) {
        var win = this.getFilterWindow();
        win.show();
    },
    
    delFilter: function (button) {
        var grid = button.up('appOrdersBuyList');
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
        var grid = Ext.getCmp('tabpanel').getActiveTab().down('appOrdersBuyList');
		var store = grid.getStore();
        var values = win.down('form').getValues();
        var filters = [];
 
        for (var p in values) {
            var value = values[p];
            if (value.length!=0) {
                filters.push({ property: p, value: value, exactMatch: true});
            }
        }
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
                var store_client_comments = Ext.getCmp('tabpanel').getActiveTab().down('appClientCommentsList').getStore();

                store_offer.loadData([],false);
                store_hyst_offer.loadData([],false);
                store_hyst_show.loadData([],false);
                store_hyst_service.loadData([],false);
                store_client_comments.loadData([],false);
            }
        } 
        else {
            store.clearFilter();
        }
    },
    
    /*Подгружаем предложения при выборе заявки*/
    selectOrdersBuy: function(selections, model, options) {
        var grid_order = Ext.getCmp('tabpanel').getActiveTab().down('appOfferBuyList');
        var store_offer = grid_order.getStore();
        var select_order = selections.getSelection();
        
        var store_hyst_offer = Ext.getCmp('tabpanel').getActiveTab().down('appHystoryOfferList').getStore();
        var store_hyst_show = Ext.getCmp('tabpanel').getActiveTab().down('appHystoryShowList').getStore();
        var store_hyst_service = Ext.getCmp('tabpanel').getActiveTab().down('appHystoryServiceList').getStore();
        var store_client_comments = Ext.getCmp('tabpanel').getActiveTab().down('appClientCommentsList').getStore();

        store_hyst_offer.loadData([],false);
        store_hyst_show.loadData([],false);
        store_hyst_service.loadData([],false);
        store_client_comments.loadData([],false);
        
        if (select_order.length) {
            order_id = select_order[0].get('id');
            var client_id = select_order[0].get('client');
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
            store_client_comments.load({params:{client: client_id}});
        };
    },

    configForm: function(object_category_name,form) {
    	
    	if (object_category_name == 'Коммерческая недвижимость') {
		    form.down('#number_rooms').setVisible(false); 
        }
        else if (object_category_name == 'Жилая недвижимость') {
            form.down('#transaction_type').labelWidth = 80; 
        }
        else if (object_category_name == 'Готовый бизнес') {
            form.down('#number_rooms').setVisible(false); 
            form.down('#space_from').setVisible(false);
            form.down('#remoteness_from').setVisible(false);
            form.down('#space_to').setVisible(false);
            form.down('#remoteness_to').setVisible(false);
            form.down('#microdistrict').setVisible(false);
            form.down('#street').setVisible(false);
            
        }
        else if (object_category_name == 'Загородная недвижимость') {
            form.down('#number_rooms').setVisible(false);
        }
        else if (object_category_name == 'Земля') {
            form.down('#number_rooms').setVisible(false);
        } 	
    },
    
    editRecord: function(gridview, el, rowIndex, colIndex, e, record, rowEl) {
        var view = Ext.widget('appOrdersBuyEdit');
 		if(record){
        	var form = view.down('form');
        	form.loadRecord(record);
            var object_category_name = Ext.data.StoreManager.lookup('directory.ObjectCategory').getById(record.get('object_category')).get('name');
	        this.configForm(object_category_name,form);
	        view.setTitle('Изменение заявки категории: ' +  object_category_name);
            var type = gridview.up('appOrdersBuy').typeapp;
            if ((type.indexOf('_archive') >= 0)||(type.indexOf('_credit') >= 0)||(type.indexOf('_support') >= 0)||(type.indexOf('_activ') >= 0)||(type.indexOf('_brigadier') >= 0)){
	            view.down('#orders_save').setVisible(false);
	        };
            if (type.indexOf('_complet') >= 0&&Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'change_all_orders-buy')==-1){
	            view.down('#orders_save').setVisible(false);
	        };
        	view.show();
        }
    },
    
    selectCategory: function(button) {
        if (button.getItemId()=='add_order_buy') {
	        var grid_clients = button.up('appClientsList');
	        var selection_clients = grid_clients.getSelectionModel().getSelection();
	        // проверяем что клиент выбран
	        if (selection_clients.length > 0) {
		        var view_category = Ext.widget('appOrdersBuyEditCategory');
		        var form_category = view_category.down('form');
	            form_category.getForm().setValues({client: selection_clients[0].getId()});
	        }
	        else {
	                Ext.Msg.alert('Предупреждение', 'Не выбран клиент!');    
	        };
	    }
	    else {
	        var view_category = Ext.widget('appOrdersBuyEditCategory');
	        var form_category = view_category.down('form');
	        var view = button.up('appClientsEdit');
	        var form = view.down('form');
	        form_category.getForm().setValues({client: form.getRecord().getId()});
	        view.close();	
	    }
    },
    
    addRecord: function(button) {
        
        var view_category = button.up('appOrdersBuyEditCategory');
        var form_category = view_category.down('form');
        if (form_category.isValid()) {
	        var object_category = form_category.getValues().object_category;
            var client = form_category.getValues().client;
            view_category.close();
        }
        else {
            return;
        }
        var view_order_buy = Ext.widget('appOrdersBuyEdit');
        var form_order_buy = view_order_buy.down('form');
        //заполяем у формы обязательные поля
        var record_object_category = Ext.data.StoreManager.lookup('directory.ObjectCategory').getById(object_category);
        var object_category_name = record_object_category.get('name');
        var object_category_group = record_object_category.get('group');
        
        this.configForm(object_category_name,form_order_buy);
        view_order_buy.setTitle('Новая заявка категории: ' +  object_category_name);
        store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
        if ((Ext.Array.indexOf(CRMRE.global.Vars.user_groups,object_category_group)!=-1)&&(Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'create_order_active')!=-1)) {
	        form_order_buy.getForm().setValues({client: client,author: parseInt(CRMRE.global.Vars.user_id),
                performer: parseInt(CRMRE.global.Vars.user_id),
	            object_category: object_category,status: store_status.findRecord('name','активная').getId()        
	        });
        }
        else {
            form_order_buy.getForm().setValues({client: client,author: parseInt(CRMRE.global.Vars.user_id),
                object_category: object_category,status: store_status.findRecord('name','свободная').getId()        
            });
        }
        view_order_buy.show();
    },
    changePerformer: function(button){
        var grid_orders_buy = button.up('appOrdersBuyList');
        var selection_orders_buy = grid_orders_buy.getSelectionModel().getSelection();
        // проверяем что заявка выбрана
        if (selection_orders_buy.length > 0) {
            if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'share_orders-buy')!=-1) {
                var view_change_user = Ext.widget('appChangeOrdersBuyPerformer');
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
        var grid = button.up('appOrdersBuyList');
        var selection = grid.getSelectionModel().getSelection();
        // проверяем что заявка выбрана
        if (selection.length > 0) {
            var view = Ext.widget('appChangeOrdersBuyTemplates');
            var form = view.down('form');
            form.getForm().setValues({order_type: 'buy',order: selection[0].getId()});
        }
        else {
            Ext.Msg.alert('Предупреждение', 'Не выбрана заявка!');
        };
    },
    changeRating: function(button){
        var grid = button.up('appOrdersBuyList');
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
                var view = Ext.widget('appChangeOrdersBuyRating');
                var form = view.down('form');
                form.getForm().reset();
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
        var view_change_user = button.up('appChangeOrdersBuyPerformer');
        var form_change_user = view_change_user.down('form');
        if (form_change_user.isValid()) {
                var performer = form_change_user.getValues().user;
                var grid_orders_buy = Ext.getCmp('tabpanel').getActiveTab().down('appOrdersBuyList');
                var selection_orders_buy = grid_orders_buy.getSelectionModel().getSelection();
                var store_orders_buy = grid_orders_buy.getStore();
                // проверяем что заявка выбрана
                if (selection_orders_buy.length > 0) {
                    var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
                    selection_orders_buy[0].set('performer',performer);
                    store_status.reload();
                    var my = this;
                    if (selection_orders_buy[0].get('status')== store_status.findRecord('name','свободная').getId()){
                        selection_orders_buy[0].set('status',store_status.findRecord('name','активная').getId());
                        store_orders_buy.sync({
		                    success : function(data_batch,controller) {
		                        Ext.create('CRMRE.store.Clients').load({params:{client_id: selection_orders_buy[0].get('client')}, callback: function(records, options, success) {
                                    if (success) {
                                        client = records[0];
                                        var message = 'Вам новая заявка № '+selection_orders_buy[0].get('index')+": "+selection_orders_buy[0].get('heading')+", от "+client.get('represent')+" т."+client.get('phone_represent');
                                        my.fireEvent('addNotifications',performer,message.slice(0,150));
                                        //my.fireEvent('addTask',performer,'Отработать заявку № '+selection_orders_buy[0].get('index'),'Посмотреть, сфотографировать, заполнить данные заявки');
                                    }
                                }});
		                    },
                            failure: function (proxy, operations) {
		                        // resume records
		                        store_orders_buy.rejectChanges();
		                    },
		                    scope: this            
		                });
                        if (Ext.getCmp('tabpanel').getActiveTab().title=='Свободные заявки на покупку') {
					        store_orders_buy.clearFilter(true);
					        var filters = [];
                            filters.push({ property: 'status', value: store_status.findRecord('name','свободная').getId(), exactMatch: true});
                            store_orders_buy.filter(filters);
					        record_first = store_orders_buy.first();
					        if (record_first != undefined) {
					            grid_orders_buy.getSelectionModel().select(record_first);
					            grid_orders_buy.getView().focusRow(record_first);
					        }   
	                    }
                    }
                    else {
                        store_orders_buy.sync({
                            success : function(data_batch,controller) {
                                Ext.create('CRMRE.store.Clients').load({params:{client_id: selection_orders_buy[0].get('client')}, callback: function(records, options, success) {
                                    if (success) {
                                        client = records[0];
                                        var message = 'Вам новая заявка № '+selection_orders_buy[0].get('index')+": "+selection_orders_buy[0].get('heading')+", от "+client.get('represent')+" т."+client.get('phone_represent');
                                        my.fireEvent('addNotifications',performer,message.slice(0,150));
                                    }
                                }});
                            },
                            failure: function (proxy, operations) {
		                        // resume records
		                        store_orders_buy.rejectChanges();
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
        var view_rating = button.up('appChangeOrdersBuyRating');
        var form_rating = view_rating.down('form');
        if (form_rating.isValid()) {
                var grid_orders_buy = Ext.getCmp('tabpanel').getActiveTab().down('appOrdersBuyList');
                var selection_orders_buy = grid_orders_buy.getSelectionModel().getSelection();
                var store_orders_buy = grid_orders_buy.getStore();
                // проверяем что заявка выбрана
                if (selection_orders_buy.length > 0) {
                    var rating = form_rating.getValues().rating;
                    var rating_comment = form_rating.getValues().rating_comment;
                    var store_user = Ext.data.StoreManager.lookup('Users');
	                var agent_id = selection_orders_buy[0].get('performer');
	                var record_agent = store_user.getById(agent_id);
	                agent_name = record_agent.get('last_name') + ' ' + record_agent.get('first_name');
                    var rating_old = selection_orders_buy[0].get('rating');
                    selection_orders_buy[0].set('rating',rating);
                    selection_orders_buy[0].set('rating_comment',rating_comment);
                    var my = this;
                    store_orders_buy.sync({
                        success : function(data_batch,controller) {
                            if ((rating <= 3)&(rating != rating_old)){
	                            Ext.Ajax.request({
			                        url: '/manager/',
                                    params: {
						                agent: selection_orders_buy[0].get('performer')
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
                            };

                            //После выставления оценки перемещаем заявку в архив
                            var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
                            store_status.reload();
                            var my = this;
                            selection_orders_buy[0].set('status',store_status.findRecord('name','архив').getId());
                            store_orders_buy.sync({
                            success : function(data_batch,controller) {
                                if (Ext.getCmp('tabpanel').getActiveTab().title=='Завершенные заявки на покупку') {
                                        store_orders_buy.reload();
                                        record_first = store_orders_buy.first();
                                        if (record_first != undefined) {
                                            grid_orders_buy.getSelectionModel().select(record_first);
                                            grid_orders_buy.getView().focusRow(record_first);
                                        }
                                    }
                            },
                            failure: function (proxy, operations) {
                                    // resume records
                                    store_orders_buy.rejectChanges();
                                },
                            scope: this
                            });

                        },
                        failure: function (proxy, operations) {
                            // resume records
                            store_orders_buy.rejectChanges();
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
	            var grid = Ext.getCmp('tabpanel').getActiveTab().down('appOrdersBuyList');
	            var store = grid.getStore();
                var mortgage_old = record.get('mortgage');
				var my = this;
                record.set(values);
                record.set('flag_edit',!record.get('flag_edit'));
	            //сохраняем изменения поиске по местоположению
	            var order_id = record.getId();
                store.sync({
	                success : function(data_batch,controller) {
			            this.saveEditLocal(store,grid,record,'ListObjectType','object_type',values.object_type,values.object_type_old);
		                this.saveEditLocal(store,grid,record,'ListDistrict','district',values.district,values.district_old);
		                this.saveEditLocal(store,grid,record,'ListCity','city',values.city,values.city_old);
		                this.saveEditLocal(store,grid,record,'ListMicrodistrict','microdistrict',values.microdistrict,values.microdistrict_old);
		                this.saveEditLocal(store,grid,record,'ListStreet','street',values.street,values.street_old);
		                this.saveEditLocal(store,grid,record,'ListRooms','number_rooms',values.number_rooms,values.number_rooms_old);
                        grid.getSelectionModel().select(record);
	                    grid.getView().focusRow(record);
	                },
                    failure: function (proxy, operations) {
                        // resume records
                        store.rejectChanges();
                    },
	                scope: this            
                });
                if (record.get('mortgage') && !(mortgage_old)) {
                	Ext.Ajax.request({
					    url: '/credit_manager/',
				        success: function(response, opts) {
					 	    var obj = Ext.decode(response.responseText);
				            var credit_manager = obj.messages['credit_manager'];
				            if (credit_manager != 0) {
				                my.fireEvent('addNotifications',credit_manager,'Для Вас новая задача!<br>Проработать оформление кредита по заявке № '+record.get('index'));
                    			my.fireEvent('addTask',credit_manager,'Проработать оформление кредита по заявке № '+record.get('index'),'Проработать оформление кредита по заявке № '+record.get('index'));
				            }
					    }
					});
                }
			} else {
	            var store = this.getOrdersBuyStore();
				var record = Ext.create('CRMRE.model.OrdersBuy');
				record.set(values);
				store.add(record);
                var my = this;
				store.sync({
	    			success : function(data_batch,controller) {
                        if (record.get('object_type')) this.saveNewLocal(record.getId(),record.get('object_type'),'ListObjectType','object_type');
	                    if (record.get('district')) this.saveNewLocal(record.getId(),record.get('district'),'ListDistrict','district');
	                    if (record.get('city')) this.saveNewLocal(record.getId(),record.get('city'),'ListCity','city');
	                    if (record.get('microdistrict')) this.saveNewLocal(record.getId(),record.get('microdistrict'),'ListMicrodistrict','microdistrict');
	                    if (record.get('street')) this.saveNewLocal(record.getId(),record.get('street'),'ListStreet','street');
	                    if (record.get('number_rooms')) this.saveNewLocal(record.getId(),record.get('number_rooms'),'ListRooms','number_rooms');
	    			    if (record.get('performer')) {
	    			        Ext.create('CRMRE.store.Clients').load({params:{client_id: record.get('client')}, callback: function(records, options, success) {
                                if (success) {
                                    client = records[0];
                                    var message = 'Вам новая заявка № '+record.get('index')+": "+record.get('heading')+", от "+client.get('represent')+" т."+client.get('phone_represent');
                                    my.fireEvent('addNotifications',record.get('performer'),message.slice(0,150));
                                    var message = 'Вам новая заявка № '+record.get('index')+": "+record.get('heading')+", от "+client.get('represent')+" т."+client.get('phone_represent');
                                    my.fireEvent('addNotifications',record.get('performer'),message.slice(0,150));
                                    //my.fireEvent('addTask',record.get('performer'),'Отработать заявку № '+record.get('index'),'Посмотреть, сфотографировать, заполнить данные заявки');
                                }
                            }});
                        }
                        if (record.get('mortgage')) {
                            Ext.Ajax.request({
							    url: '/credit_manager/',
						        success: function(response, opts) {
							 	    var obj = Ext.decode(response.responseText);
						            var credit_manager = obj.messages['credit_manager'];
						            if (credit_manager != 0) {
						                my.fireEvent('addNotifications',credit_manager,'Для Вас новая задача!<br>Проработать оформление кредита по заявке № '+record.get('index'));
		                    			my.fireEvent('addTask',credit_manager,'Проработать оформление кредита по заявке № '+record.get('index'),'Проработать оформление кредита по заявке № '+record.get('index'));
						            }
							    }
							});    
                        };
	                    Ext.MessageBox.show({
		                     title: 'Заявка на покупку успешно создана!',
		                     msg: 'Номер созданной заявки: '+record.get('index'),
		                     icon: Ext.MessageBox.INFO,
		                     buttons: Ext.Msg.OK
		                });    
                    },
                    failure: function (proxy, operations) {
                        // resume records
                        store.rejectChanges();
                    },
	    			scope: this            
				});
			};
	    	win.close();
        }
	},
    /*Создаем новые значения местоположения
     *поиска для вновь создаваемой записи*/
    saveNewLocal: function(order_id,arr_new,store_name,field){
    	console.log(order_id,arr_new,store_name,field);
    	var store_list = Ext.data.StoreManager.lookup(store_name);
    	arr_new.forEach(function(item, index) {
            var record = Ext.create('CRMRE.model.'+store_name);
            record.set('orders',parseInt(order_id));
            record.set(field,item);
            store_list.add(record);
        });
        store_list.sync();
        store_list.commitChanges();
    },

    /*Сравниваем массивы и возвращаем массив
     * для удаления и массив для добавления*/
    comparison_arr: function(arr_new,arr_old){
        var arr_del=[];
        var arr_add=[];
        arr_old.forEach(function(item, index) {
            if (Ext.Array.indexOf(arr_new,item) == -1){
                arr_del.push(item);
            }
        });
        arr_new.forEach(function(item, index) {
            if (Ext.Array.indexOf(arr_old,item) == -1){
                arr_add.push(item);  
            }
        });
        return [arr_del,arr_add];
    },
    
    /*Сохраняем измененые значения местоположения
     *поиска для редактируемой записи*/    
    saveEditLocal: function(store,grid,record,store_name,field,arr_new,arr_old){
        
        var order_id = record.getId();
        var store_list = Ext.data.StoreManager.lookup(store_name);
		if (arr_new=='') {arr_new=[];};
        if (arr_old=='') {arr_old=[];};
		
    	var variables_local = this.comparison_arr(arr_new,arr_old); 
        //удаляем записи в цикле
        variables_local[0].forEach(function(item, index) {
            var index_del = store_list.findBy(function(rec) {
                return ((rec.get('orders') == order_id) && (rec.get(field) == String(item)));
            });
            store_list.removeAt(index_del);
        });
        //добавляем записи в цикл
        variables_local[1].forEach(function(item, index) {
            var record_add = Ext.create('CRMRE.model.'+store_name);
            record_add.set('orders',parseInt(order_id));record_add.set(field,item);
            store_list.add(record_add);
        });
        store_list.sync({
            success : function(data_batch,controller) {
                store_list.load();
                grid.reconfigure();    
            },
            failure: function (proxy, operations) {
                // resume records
                store_list.rejectChanges();
            },
            scope: this            
        });
        store_list.commitChanges();
    },
    
	deleteRecord: function(gridview, el, rowIndex, colIndex, e, rec, rowEl) {
        if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'delete_ordersbuy')!=-1) {
	    	var store = gridview.getStore();
	    	Ext.MessageBox.confirm('Подтвердите действие!', 'Вы действительно хотите удалить запись?', function(btn){
				if (btn == 'yes') {
		    		store.remove(rec);
		    		store.sync({
                        success : function(data_batch,controller) {
                            var store_offer = Ext.getCmp('tabpanel').getActiveTab().down('appOfferBuyList').getStore();
                            var store_hyst_offer = Ext.getCmp('tabpanel').getActiveTab().down('appHystoryOfferList').getStore();
					        var store_hyst_show = Ext.getCmp('tabpanel').getActiveTab().down('appHystoryShowList').getStore();
					        var store_hyst_service = Ext.getCmp('tabpanel').getActiveTab().down('appHystoryServiceList').getStore();
					        var store_client_comments = Ext.getCmp('tabpanel').getActiveTab().down('appClientCommentsList').getStore();

					        store_offer.loadData([],false);
                            store_hyst_offer.loadData([],false);
					        store_hyst_show.loadData([],false);
					        store_hyst_service.loadData([],false);
					        store_client_comments.loadData([],false);

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
        var grid = button.up('appOrdersBuyList');
        var store = grid.getStore();
        var selection = grid.getSelectionModel().getSelection();
        // проверяем что заявка выбрана
        if (selection.length > 0) {
            if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'lock_orders-buy')!=-1) {
                Ext.MessageBox.confirm('Подтвердите действие!', 'Вы действительно хотите заблокировать заявку?', function(btn){
		            if (btn == 'yes') {
		                var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
		                store_status.reload();
		                var my = this;
		                if (selection[0].get('status')== store_status.findRecord('name','активная').getId()){
		                    selection[0].set('status',store_status.findRecord('name','выход на сделку').getId());
		                    store.sync();
		                }
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
        var grid = button.up('appOrdersBuyList');
        var store = grid.getStore();
        var selection = grid.getSelectionModel().getSelection();
        // проверяем что заявка выбрана
        if (selection.length > 0) {
            if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'lock_orders-buy')!=-1) {
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
        var grid = button.up('appOrdersBuyList');
        var store = grid.getStore();
        var selection = grid.getSelectionModel().getSelection();
        // проверяем что заявка выбрана
        if (selection.length > 0) {

            var store_user = Ext.data.StoreManager.lookup('Users');
            var agent_id = selection[0].get('performer');
            var record_agent = store_user.getById(agent_id);
            brigade = record_agent.get('brigade')

            if (selection[0].get('performer')==parseInt(CRMRE.global.Vars.user_id)||
                ((brigade==parseInt(CRMRE.global.Vars.user_brigade))&&(Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'view_hidden_clients_brigade')!=-1))||
               (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'change_all_orders-buy')!=-1)) {
                Ext.MessageBox.confirm('Подтвердите действие!', 'Вы действительно хотите пометить заявку как отказную?', function(btn){
                    if (btn == 'yes') {
	                    var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
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
        var grid = button.up('appOrdersBuyList');
        var store = grid.getStore();
        var selection = grid.getSelectionModel().getSelection();
        // проверяем что заявка выбрана
        if (selection.length > 0) {
            if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'lock_orders-buy')!=-1) {
                Ext.MessageBox.confirm('Подтвердите действие!', 'Вы действительно хотите поместить заявку в архив?', function(btn){
	                if (btn == 'yes') {
	                    var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
	                    store_status.reload();
	                    var my = this;
	                    selection[0].set('status',store_status.findRecord('name','архив').getId());
	                    store.sync({
	                        success : function(data_batch,controller) {
	                            if (Ext.getCmp('tabpanel').getActiveTab().title=='Завершенные заявки на покупку') {
		                            store.reload();
		                            record_first = store.first();
		                            if (record_first != undefined) {
		                                grid.getSelectionModel().select(record_first);
		                                grid.getView().focusRow(record_first);
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
        var grid = button.up('appOrdersBuyList');
        var store = grid.getStore();
        var selection = grid.getSelectionModel().getSelection();
        // проверяем что заявка выбрана
        if (selection.length > 0) {
            if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'lock_orders-buy')!=-1) {
                Ext.MessageBox.confirm('Подтвердите действие!', 'Вы действительно хотите вернуть заявку в активные?', function(btn){
	                if (btn == 'yes') {
	                    var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
	                    store_status.reload();
	                    var my = this;
	                    selection[0].set('status',store_status.findRecord('name','активная').getId());
	                    store.sync({
	                        success : function(data_batch,controller) {
	                            if (Ext.getCmp('tabpanel').getActiveTab().title=='Завершенные заявки на покупку') {
		                            store.clearFilter(true);
		                            var filters = [];
                                    filters.push({ property: 'status', value: store_status.findRecord('name','сделка завершена').getId(), exactMatch: true});
                                    filters.push({ property: 'status', value: store_status.findRecord('name','отказная').getId(), exactMatch: true});
                                    store.filter(filters);
		                            record_first = store.first();
		                            if (record_first != undefined) {
		                                grid.getSelectionModel().select(record_first);
		                                grid.getView().focusRow(record_first);
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

			            var store_user = Ext.data.StoreManager.lookup('Users');
                        var agent_id = rec.get('performer');
                        var record_agent = store_user.getById(agent_id);
                        brigade = record_agent.get('brigade')

			            if (((record.get('author')==parseInt(CRMRE.global.Vars.user_id))||
                            (rec.get('performer')==parseInt(CRMRE.global.Vars.user_id))||
                            ((brigade==parseInt(CRMRE.global.Vars.user_brigade))&&(Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'view_hidden_clients_brigade')!=-1))||
                            (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'view_hidden_fields_clients')!=-1))||
                            (rec.get('status') == store_status.findRecord('name','свободная').getId())){
                                form = view.down('form');
                                form.down('#client_name').setFieldLabel('Клиент');
                                if ((Ext.getCmp('tabpanel').getActiveTab().typeapp.indexOf('_my') == -1)&&
                                    (Ext.getCmp('tabpanel').getActiveTab().typeapp.indexOf('_completed') == -1)&&
                                    (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'can_change_all_clients') == -1)){
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