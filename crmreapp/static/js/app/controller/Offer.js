Ext.define('CRMRE.controller.Offer', {
    extend: 'Ext.app.Controller',
    stores: ['Offer','Documents'],
    models: ['Offer'],
 	views: ['offer_sale.List','offer_buy.List','Documents'],

    init: function() {
        this.control({
            'appOfferBuyList':{
                selectionchange: this.selectOffer
            },
            'appOfferSaleList':{
                selectionchange: this.selectOffer
            },
            'appOfferBuyList button[action=search]': {
                click: {
                    fn : this.searchObjects,
                    params : {
                        search_my: false
                    }
                }
            },
            'appOfferSaleList button[action=search]': {
                click: {
                    fn : this.searchObjects,
                    params : {
                        search_my: false
                    }
                }
            },
            'appOfferBuyList button[action=search_my]': {
                click: {
                    fn : this.searchObjects,
                    params : {
                        search_my: true
                    }
                }
            },
            'appOfferSaleList button[action=search_my]': {
                click: {
                    fn : this.searchObjects,
                    params : {
                        search_my: true
                    }
                }
            },
            'appOfferBuyList button[action=send]': {
                click: this.sendObjects
            },
            'appOfferSaleList button[action=send]': {
                click: this.sendObjects
            },
            'appOfferBuyList button[action=report]': {
                click: this.openReport
            },
            'appOfferSaleList button[action=report]': {
                click: this.openReport
            },
            'appOfferBuyList actioncolumn[action=delete]': {
                click: this.deleteRecord
            },
            'appOfferSaleList actioncolumn[action=delete]': {
                click: this.deleteRecord
            },
            'appOfferBuyList actioncolumn[action=info]': {
                click: this.infoRecord
            },
            'appOfferSaleList actioncolumn[action=info]': {
                click: this.infoRecord
            },
            'appOfferBuyList actioncolumn[action=info_photos]': {
                click: this.infoPhotos
            },
            'appOfferSaleList button[action=documents]': {
                click: this.editDocuments
            },
            'appOfferBuyList button[action=documents]': {
                click: this.editDocuments
            }
        });
        this.callParent(arguments);
    },
    selectOffer: function(selections, model, options) {
        var grid_hyst_offer = Ext.getCmp('tabpanel').getActiveTab().down('appHystoryOfferList');
        var grid_hyst_show = Ext.getCmp('tabpanel').getActiveTab().down('appHystoryShowList');
        var grid_hyst_service = Ext.getCmp('tabpanel').getActiveTab().down('appHystoryServiceList');
        var grid = Ext.getCmp('tabpanel').getActiveTab().down('grid');
        /*if (grid.getXType()=="appOrdersSaleList") {
            grid_hyst_offer.down('#add').setDisabled(true);
	        grid_hyst_offer.down('#edit').setVisible(false);
	        grid_hyst_offer.down('#delete').setVisible(false);
	        grid_hyst_show.down('#add').setDisabled(true);
	        grid_hyst_show.down('#edit').setVisible(false);
	        grid_hyst_show.down('#delete').setVisible(false);            
        }*/
        var store_hyst_offer = grid_hyst_offer.getStore();
        var store_hyst_show = grid_hyst_show.getStore();
        var store_hyst_service = grid_hyst_service.getStore();
        var select_offer = selections.getSelection();
        store_hyst_offer.loadData([],false);
        store_hyst_show.loadData([],false);
        store_hyst_service.loadData([],false);

        if (select_offer.length) {
            if (select_offer.slice(-1).pop().get("informed")){
	            offer_id = select_offer.slice(-1).pop().getId();
	            store_hyst_offer.getProxy().extraParams = {offer_id: offer_id};
                store_hyst_show.getProxy().extraParams = {offer_id: offer_id};
                store_hyst_service.getProxy().extraParams = {offer_id: offer_id};
                var hyst_item = 0;
	            store_hyst_offer.load({
		            scope: this,
		            callback: function(records, operation, success) {
                        store_hyst_show.load({
		                    scope: this,
		                    callback: function(records, operation, success) {
		                        if (store_hyst_show.getCount()>0){
                                    hyst_item++;	                            
		                        }
                                store_hyst_service.load({
		                            scope: this,
		                            callback: function(records, operation, success) {
		                                if (store_hyst_service.getCount()>0){
                                            hyst_item++;
		                                }
                                        Ext.getCmp('tabpanel').getActiveTab().down('#hystory_accord').items.items[hyst_item].expand();
		                            }
		                        });
		                    }
		                });
		            }
		        });
            };
        };
    },
    searchObjects: function(button, e, eOpts) {
        var grid = button.up('grid');
        var store = grid.getStore();
        var select_order = Ext.getCmp('tabpanel').getActiveTab().down('grid').getSelectionModel().getSelection();
        if (select_order.length) {
            order_id = select_order[0].getId();
            store.getProxy().extraParams = {order_type: grid.getXType(),order_id: order_id, search_my:  eOpts.params.search_my};
            store.load({url:"/offer_new/"});
        };
    },
    sendObjects: function(button) {
        var my = this;
        var grid = button.up('grid');
        if (grid.getXType()=="appOfferBuyList"){
        	textMessage = 'Вы действительно хотите сохранить и отправить все найденные предложения по объектам?';
        }
        else {
        	textMessage = 'Вы действительно хотите сохранить новые предложения по объекту?';
        }
        Ext.MessageBox.confirm('Подтвердите действие!', textMessage, function(btn){
            if (btn == 'yes') {
		        var store = grid.getStore();
		        store.getProxy().extraParams = {};
		        var select = grid.getSelectionModel().getSelection();
		        var arr_offer = [];
                var email_send = true;
		        if (select.length) {
		            select.forEach(function(record, index) {
		                if (!record.get("informed")){
		                    record.set("informed",true);
		                    store.getProxy().actionMethods = {update: 'POST'};
		                }
		                arr_offer.push([record.get('order_buy'),record.get('order_sale')]);
		            });
                    if (grid.getXType()=="appOfferBuyList"){
			            Ext.Ajax.request({
						    url: '/send_offer/',
				            params:{
				               arr_offer: Ext.JSON.encode(arr_offer)
				            },
					        success: function(response, opts) {
						 	    var obj = Ext.decode(response.responseText);
					            var failure_send_clients = obj.messages;
	                            if (failure_send_clients.length == 0) {
	                                Ext.Msg.alert('Извещение', 'Предложения успешно отправлены!');
	                            }
	                            else {
	                                Ext.Msg.alert('Извещение', 'Предложения отправлены!<br>'+'Агенты: '+
	                                failure_send_clients + "<br>не смогли получить письмо, известите их другим способом!");
	                            }
	                            
						    },
                            failure: function(rec, op){
                                Ext.Msg.alert("Ошибка","К сожалению, данные не могут быть сохранены.");
                            }
					    });
                    }
		            store.sync({
                        success : function(data_batch,controller) {
                        	data_batch.operations.forEach(function(operation, index) {
                        		var id = Ext.JSON.decode(operation.response.responseText).id;
                        		var record = operation.records[0];
                        		record.setId(id);
                                if (grid.getXType()=="appOfferSaleList"){
                                    Ext.create('CRMRE.store.OrdersBuy').load({params:{id: record.get('order_buy')}, callback: function(records, options, success) {
                                        if (success) {
                                            record_order_buy = records[0];
                                            var performer_buy = record_order_buy.get('performer');
                                            var index_buy = record_order_buy.get('index');
                                            my.fireEvent('addNotifications',performer_buy,'Для Вашей заявки № '+index_buy + ' есть новое предложение!');
                                        }
                                    }});
	                            }
                        	});
                            store.getProxy().actionMethods = {create:'POST',read:'GET',update:'PUT',destroy:'DELETE'};
                            store.sync();
                        },
                        scope: this            
                    });
		        }
		        else {
		            Ext.Msg.alert('Предупреждение', 'Нет выбранных предложений!');
		        }
            }
        });
    },
    openReport: function(button) {
        var my = this;
        var formPanel = Ext.create('Ext.form.Panel', {
            items: []
        });
        Ext.MessageBox.confirm('Подтвердите действие!', 'Вы действительно хотите открыть предложения?', function(btn){
            if (btn == 'yes') {
                var grid = button.up('grid');
		        var store = grid.getStore();
		        store.getProxy().extraParams = {};
		        var select = grid.getSelectionModel().getSelection();
		        var arr_offer = [];
		        if (select.length) {
		        	if (grid.getXType()=="appOfferSaleList"){
		        		arr_offer.push([select[0].get('order_buy'),select[0].get('order_sale')]);
		        	}
		        	else if (grid.getXType()=="appOfferBuyList"){
			            select.forEach(function(record, index) {
			                arr_offer.push([record.get('order_buy'),record.get('order_sale')]);
			            });
		        	};
                    console.log(arr_offer);
		        	formPanel.submit({
			            url: '/open_offer/',
			            timeout : 12000,
			            headers: { 'Content-Type': 'application/pdf' },
			            method: 'POST',
			            csrf_token: CRMRE.global.Vars.csrf_token,
			            standardSubmit: true,
			            target : '_blank',
			            params:{
			               arr_offer: Ext.JSON.encode(arr_offer)
			            }
			        });
		        }
		        else {
		            Ext.Msg.alert('Предупреждение', 'Нет выбранных предложений!');
		        }
            }
        });
    },
    deleteRecord: function(gridview, el, rowIndex, colIndex, e, rec, rowEl) {
    	var store = gridview.getStore();
        store.getProxy().extraParams = {};
    	Ext.MessageBox.confirm('Подтвердите действие!', 'Вы действительно хотите удалить запись?', function(btn){
			if (btn == 'yes') {
				if (rec.get("informed")) {
					store.remove(rec);
	    			store.sync();
	    			var grid_hyst_offer = Ext.getCmp('tabpanel').getActiveTab().down('appHystoryOfferList');
	    			var grid_hyst_show = Ext.getCmp('tabpanel').getActiveTab().down('appHystoryShowList');
	    			var grid_hyst_service = Ext.getCmp('tabpanel').getActiveTab().down('appHystoryServiceList')
			        grid_hyst_offer.getStore().loadData([],false);
			        grid_hyst_show.getStore().loadData([],false);
			        grid_hyst_service.getStore().loadData([],false);
				}
				else {
					Ext.Msg.alert('Предупреждение', 'Это предложение еще не отправлено!');	
				}
			}
		});
    },
    configFormBuy: function(object_category_name,form) {
    	
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
    configFormSale: function(object_category_name,form) {
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
            form.down('#house_apartment').setVisible(false);
            form.down('#house_number').setVisible(false);
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
            form.down('#house_number').setVisible(false);
		}
		else if (object_category_name == 'Загородная недвижимость') {
			form.down('tabpanel').remove(form.down('#objects_info_commercial'));
			form.down('tabpanel').remove(form.down('#objects_extend_commercial'));
			form.down('tabpanel').remove(form.down('#objects_info_earth'));
			form.down('tabpanel').remove(form.down('#objects_info_business'));
			form.down('tabpanel').remove(form.down('#info_structure'));
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
            form.down('#house_apartment').setVisible(false);
            form.down('#house_number').setVisible(false);
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
            form.down('#house_number').setVisible(false);
		}	
    },
    infoRecord: function(grid, el, rowIndex, colIndex, e, rec, rowEl) {
        var my = this;
        if (grid.up('appOfferSaleList')!=undefined){
        	Ext.create('CRMRE.store.OrdersBuy').load({params:{id: rec.get('order_buy')}, callback: function(records, options, success) {
                if (success) {
                    record = records[0];
                    var view = Ext.widget('appOrdersBuyEdit');
                    var form = view.down('form');
                    form.loadRecord(record);
                    var object_category_name = Ext.data.StoreManager.lookup('directory.ObjectCategory').getById(record.get('object_category')).get('name');
                    view.down('#orders_save').setVisible(false);
                    my.configFormBuy(object_category_name,form);
                    view.setTitle('Информация о предложении категории: ' +  object_category_name);
                    form.getForm().setValues({modification_date: new Date()});
                    view.show();
                }
                else {
                    Ext.Msg.alert('Предупреждение', 'Запись о заявке не найдена!');
                }
            }});
        }
        else if (grid.up('appOfferBuyList')!=undefined){

            Ext.create('CRMRE.store.OrdersSale').load({params:{id: rec.get('order_sale')}, callback: function(records, options, success) {
                if (success) {
                    record = records[0];
                    var view = Ext.widget('appOrdersSaleEdit');
                    form = view.down('form');
                    var object_category_name = Ext.data.StoreManager.lookup('directory.ObjectCategory').getById(record.get('object_category')).get('name');
                    view.down('#orders_save').setVisible(false);
                    my.configFormSale(object_category_name,form);
                    form.loadRecord(record);
                    view.setTitle('Информация о предложении категории: ' +  object_category_name);
                    form.getForm().setValues({modification_date: new Date()});
                    view.show();
                }
                else {
                    Ext.Msg.alert('Предупреждение', 'Запись о заявке не найдена!');
                }
            }});
        }
    },
    editDocuments: function(button) {
        var grid = button.up('grid');
        var record = grid.getSelectionModel().getSelection()[0];
        if(record){
            offer = record.data.id;
            var view = Ext.widget('appDocuments');
            form = view.down('form').getForm();
            form.setValues({offer:offer});
            view.show();
        }
    },
    infoPhotos: function(gridview, el, rowIndex, colIndex, e, rec, rowEl) {
        var record = gridview.getStore().getAt(rowIndex);
    	if(record){
    		object = record.get('order_sale');
    		var view = Ext.widget('appPhotos',{object:object});
    		view.typeapp = "info_photos";
        	form = view.down('form').getForm();
        	form.setValues({object:object});
        	view.down('#download').setVisible(false);
        	view.down('#description').setVisible(false);
        	view.down('#photo').setVisible(false);
        	view.show();
    	}
    }
});