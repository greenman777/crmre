Ext.define('CRMRE.controller.Interface', {
    extend: 'Ext.app.Controller',
    stores: ['MenuTree'],
 	views: ['Header','MenuPanel'],
 	refs: [
 		{ ref: 'appHeader',selector: 'appHeader' },
        { ref: 'appMenuPanel',selector: 'appMenuPanel' },
        { ref: 'appTabPanel',selector: 'appTabPanel' }
    ], 
    init: function() {
        this.control({
        	'appMenuPanel treepanel': {
        		selectionchange: this.addTabPanel        	        	
        	},
            'appTabPanel': {
                render: this.infoAllShow,
                tabchange: this.activTabPanel
            },
            'appHeader':{
                beforerender: this.initHeader
            },
            'appHeader button[action=users_view]': {
            	click: this.viewUsers
            },
            'appHeader button[action=buildings_view]': {
            	click: this.viewBuildings
            },
            'appHeader button[action=notifications_view]': {
            	click: this.viewNotifications
            },
            'appHeader button[action=regulations_view]': {
            	click: this.viewRegulations
            },
            'appHeader menuitem[action=orders_buy_free_view]': {
                click: this.viewOrdersBuyFree
            },
            'appHeader menuitem[action=orders_sale_free_view]': {
                click: this.viewOrdersSaleFree
            },
            'appHeader menuitem[action=orders_buy_complet_view]': {
                click: this.viewOrdersBuyComplet
            },
            'appHeader menuitem[action=orders_sale_complet_view]': {
                click: this.viewOrdersSaleComplet
            },
            'appHeader menuitem[action=orders_buy_archive_view]': {
                click: this.viewOrdersBuyArchive
            },
            'appHeader menuitem[action=orders_sale_archive_view]': {
                click: this.viewOrdersSaleArchive
            },
            'appHeader menuitem[action=orders_buy_activ]': {
                click: this.viewOrdersBuyActiv
            },
            'appHeader menuitem[action=orders_sale_activ]': {
                click: this.viewOrdersSaleActiv
            },
            'appHeader menuitem[action=uploading_yazh]': {
                click: this.uploading
            },
            'appHeader menuitem[action=uploading_an]': {
                click: this.uploading
            },
            'appHeader menuitem[action=uploading_orders_view]': {
                click: this.viewUploadingOrders
            }
        });
    },
    initHeader: function(view, eOpts) {
        if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'view_free_orders-sale')==-1) {
            view.down('#orders_sale_free').setVisible(false);
            //view.down('#orders_sale_complet').setVisible(false);
        };
        if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'view_free_orders-buy')==-1) {
            view.down('#orders_buy_free').setVisible(false);
            //view.down('#orders_buy_complet').setVisible(false);
        };
        if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'uploading_orders-sale')==-1) {
            view.down('#uploading').setVisible(false);
        };
        if (Ext.Array.indexOf(CRMRE.global.Vars.user_perms,'uploading_orders-all')==-1) {
            view.down('#uploading_orders').setVisible(false);
        };
    },
    addTabPanel: function(view, rec, opts) {
        if (rec[0] && rec[0].data.children==null) {  // на всякий случай проверка наличия выделения
            var data=rec[0].data;
        	var tabpanel = this.getAppTabPanel();
        	var app = data.app;
            var typeapp = data.typeapp;
        	var id = data.app+data.typeapp;
            var filterapp = Ext.JSON.decode(data.filterapp);
        	var itemId = id;
        	var tab = tabpanel.getComponent(itemId); // поиск закладки с itemId = data.id
            //снимаем выделение с элемента дерева
            view.deselect(rec);
        	if (tab) {
                 tab.show();
                 tab.focus();
             	 return;
             } // если закладка  существует, она открывается
  			
             tabpanel.add({ // добавляем закладку
             	xtype: app,
             	id:id,
                itemId:itemId,
                typeapp:typeapp,
                title:data.title,
                iconCls: 'tabs',
                closable: true
             }).show();
             try {
                tabpanel.setActiveTab(itemId);
                var grid = tabpanel.getActiveTab().down('grid');
                var store = grid.getStore();
             }
             catch (e) {
                return;
             }
             store.getProxy().extraParams = filterapp;
    		 store.load({
    		 	scope: this,
    			callback: function(records, operation, success) {
        			if (success) {
        				new Ext.util.DelayedTask(function(){
    						grid.getSelectionModel().select(0);
						}).delay(1000);
        			}
    			}
			});
        }
	},
	viewUsers: function(button) {
        var itemId = 'users_view';
        var tabpanel = this.getAppTabPanel();
		var tab = tabpanel.getComponent(itemId); // поиск закладки с itemId = data.id
        if (tab) {
             tab.show();
             tab.focus();
             return;
         } // если закладка  существует, она открывается
        
         tabpanel.add({ // добавляем закладку
            xtype: 'appUsers',
            itemId:'users_view',
            title:'Список пользователей',
            iconCls: 'tabs',
            closable: true
         }).show();
         tabpanel.setActiveTab();
         var grid = tabpanel.getActiveTab().down('grid');
         var store = grid.getStore();
         store.getProxy().extraParams = {};
         store.load({
            scope: this,
            callback: function(records, operation, success) {
                if (success) {
                    new Ext.util.DelayedTask(function(){
						grid.getSelectionModel().select(0);
					}).delay(1000);
                }
                return;
            }
        });
	},
	viewBuildings: function(button) {
        var itemId = 'buildings_view';
        var tabpanel = this.getAppTabPanel();
		var tab = tabpanel.getComponent(itemId); // поиск закладки с itemId = data.id
        if (tab) {
             tab.show();
             tab.focus();
             return;
         } // если закладка  существует, она открывается
        
         tabpanel.add({ // добавляем закладку
            xtype: 'appBuildings',
            itemId:'buildings_view',
            title:'Новостройки',
            iconCls: 'tabs',
            closable: true
         }).show();
         tabpanel.setActiveTab();
         var grid = tabpanel.getActiveTab().down('grid');
         var store = grid.getStore();
         store.getProxy().extraParams = {};
         store.load({
            scope: this,
            callback: function(records, operation, success) {
                if (success) {
                    new Ext.util.DelayedTask(function(){
						grid.getSelectionModel().select(0);
					}).delay(1000);
                }
                return;
            }
        });
	},
	viewClients: function(button, e, eOpts) {
		var is_client = eOpts.params.is_client;
		if (is_client){
			var itemId = 'clients_view';
			var title = 'Список клиентов';
		}
		else {
			var itemId = 'partners_view';
			var title = 'Список контрагентов';
		}
        var tabpanel = this.getAppTabPanel();
		var tab = tabpanel.getComponent(itemId); // поиск закладки с itemId = data.id
        if (tab) {
             tab.show();
             tab.focus();
             return;
         } // если закладка  существует, она открывается
        
         tabpanel.add({ // добавляем закладку
            xtype: 'appClients',
            itemId: itemId,
            typeapp: itemId,
            title: title,
            iconCls: 'tabs',
            closable: true
         }).show();
         tabpanel.setActiveTab();
         var grid = tabpanel.getActiveTab().down('grid');
         var store = grid.getStore();
         store.getProxy().extraParams = {is_client:is_client};
         store.currentPage = 1;
         store.load({
            params: { start: 0, page: 1},
            scope: this,
            callback: function(records, operation, success) {
                if (success) {
                    new Ext.util.DelayedTask(function(){
						grid.getSelectionModel().select(0);
					}).delay(1000);
                }
                return;
            }
        });
	},
	viewNotifications: function(button) {
        
        var itemId = 'notifications_view';
        var tabpanel = this.getAppTabPanel();
		var tab = tabpanel.getComponent(itemId); // поиск закладки с itemId = data.id
        if (tab) {
             tab.show();
             tab.focus();
             return;
         } // если закладка  существует, она открывается
        
         tabpanel.add({ // добавляем закладку
            xtype: 'appNotifications',
            itemId:'notifications_view',
            title:'Сообщения',
            iconCls: 'tabs',
            closable: true
         }).show();
         tabpanel.setActiveTab();/*
         var grid = tabpanel.getActiveTab().down('grid');
         var store = grid.getStore();
         /*store.load({
            scope: this,
            callback: function(records, operation, success) {
                if (success) {
                	grid.focus();
                    new Ext.util.DelayedTask(function(){
						grid.getSelectionModel().select(0);
					}).delay(500);
                }
                return;
            }
        });*/
	},

    viewOrdersBuyFree: function(button) {
        
    	var tabpanel = this.getAppTabPanel();
    	var title = "Свободные заявки на покупку";
    	var app = "appOrdersBuy";
    	var id = app+'orders_buy_free';
        var typeapp = 'orders_buy_free';
    	var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
    	var status_free_id = store_status.findRecord('name','свободная').getId();
        var filterapp = {status: status_free_id};
    	var itemId = id;
    	var tab = tabpanel.getComponent(itemId); // поиск закладки с itemId = data.id
        //снимаем выделение с элемента дерева
    	if (tab) {
             tab.show();
             tab.focus();
         	 return;
         } // если закладка  существует, она открывается
		
         tabpanel.add({ // добавляем закладку
         	xtype: app,
         	id:id,
            itemId:itemId,
            title:title,
            typeapp:typeapp,
            iconCls: 'tabs',
            closable: true
         }).show();
         tabpanel.setActiveTab(itemId);
         var grid = tabpanel.getActiveTab().down('grid');
         var store = grid.getStore();
         store.getProxy().extraParams = filterapp;
		 store.load({
		 	scope: this,
			callback: function(records, operation, success) {
    			if (success) {
                    new Ext.util.DelayedTask(function(){
						grid.getSelectionModel().select(0);
						grid.getView().focusRow(0);
					}).delay(1000);
    			}
			}
		});
	},
    
	viewOrdersSaleFree: function(button) {
        var tabpanel = this.getAppTabPanel();
    	var title = "Свободные заявки на продажу";
    	var app = "appOrdersSale";
    	var id = app+'orders_sale_free';
        var typeapp = 'orders_sale_free';
    	var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
    	var status_free_id = store_status.findRecord('name','свободная').getId();
        var filterapp = {status: status_free_id};
    	var itemId = id;
    	var tab = tabpanel.getComponent(itemId); // поиск закладки с itemId = data.id
        //снимаем выделение с элемента дерева
    	if (tab) {
             tab.show();
             tab.focus();
         	 return;
         } // если закладка  существует, она открывается
		
         tabpanel.add({ // добавляем закладку
         	xtype: app,
         	id:id,
            typeapp: typeapp,
            itemId:itemId,
            title:title,
            iconCls: 'tabs',
            closable: true
         }).show();
         tabpanel.setActiveTab(itemId);
         var grid = tabpanel.getActiveTab().down('grid');
         var store = grid.getStore();
         store.getProxy().extraParams = filterapp;
		 store.load({
		 	scope: this,
			callback: function(records, operation, success) {
    			if (success) {
                    new Ext.util.DelayedTask(function(){
						grid.getSelectionModel().select(0);
						grid.getView().focusRow(0);
					}).delay(1000);
                    
    			}
			}
		});
	},
    
    viewOrdersBuyComplet: function(button) {
        
        var tabpanel = this.getAppTabPanel();
        var title = "Завершенные заявки на покупку";
        var app = "appOrdersBuy";
        var id = app+'orders_buy_complet';
        var typeapp = 'orders_buy_complet';
        var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
        var status_free_id = store_status.findRecord('name','сделка завершена').getId();
        var status_close_id = store_status.findRecord('name','отказная').getId();
        var filterapp = {status: [status_free_id,status_close_id]};
        var itemId = id;
        var tab = tabpanel.getComponent(itemId); // поиск закладки с itemId = data.id
        //снимаем выделение с элемента дерева
        if (tab) {
             tab.show();
             tab.focus();
             return;
         } // если закладка  существует, она открывается
        
         tabpanel.add({ // добавляем закладку
            xtype: app,
            id:id,
            itemId:itemId,
            title:title,
            typeapp:typeapp,
            iconCls: 'tabs',
            closable: true
         }).show();
         tabpanel.setActiveTab(itemId);
         var grid = tabpanel.getActiveTab().down('grid');
         var store = grid.getStore();
         store.getProxy().extraParams = filterapp;
         store.load({
            scope: this,
            callback: function(records, operation, success) {
                if (success) {
                    new Ext.util.DelayedTask(function(){
						grid.getSelectionModel().select(0);
						grid.getView().focusRow(0);
					}).delay(1000);
                    
                }
            }
        });
    },
    
    viewOrdersSaleComplet: function(button) {
        var tabpanel = this.getAppTabPanel();
        var title = "Завершенные заявки на продажу";
        var app = "appOrdersSale";
        var id = app+'orders_sale_complet';
        var typeapp = 'orders_sale_complet';
        var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
        var status_free_id = store_status.findRecord('name','сделка завершена').getId();
        var status_close_id = store_status.findRecord('name','отказная').getId();
        var filterapp = {status: [status_free_id,status_close_id]};
        var itemId = id;
        var tab = tabpanel.getComponent(itemId); // поиск закладки с itemId = data.id
        //снимаем выделение с элемента дерева
        if (tab) {
             tab.show();
             tab.focus();
             return;
         } // если закладка  существует, она открывается
        
         tabpanel.add({ // добавляем закладку
            xtype: app,
            id:id,
            typeapp: typeapp,
            itemId:itemId,
            title:title,
            iconCls: 'tabs',
            closable: true
         }).show();
         tabpanel.setActiveTab(itemId);
         var grid = tabpanel.getActiveTab().down('grid');
         var store = grid.getStore();
         store.getProxy().extraParams = filterapp;
         store.load({
            scope: this,
            callback: function(records, operation, success) {
                if (success) {
                    new Ext.util.DelayedTask(function(){
						grid.getSelectionModel().select(0);
						grid.getView().focusRow(0);
					}).delay(1000);
                    
                }
            }
        });
    },

    viewOrdersBuyArchive: function(button) {
        var tabpanel = this.getAppTabPanel();
        var title = "Архивные заявки на покупку";
        var app = "appOrdersBuy";
        var id = app+'orders_buy_archive';
        var typeapp = 'orders_buy_archive';
        var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
        var status_archive_id = store_status.findRecord('name','архив').getId();
        var filterapp = {status: [status_archive_id]};
        var itemId = id;
        var tab = tabpanel.getComponent(itemId); // поиск закладки с itemId = data.id
        //снимаем выделение с элемента дерева
        if (tab) {
             tab.show();
             tab.focus();
             return;
         } // если закладка  существует, она открывается

         tabpanel.add({ // добавляем закладку
            xtype: app,
            id:id,
            itemId:itemId,
            title:title,
            typeapp:typeapp,
            iconCls: 'tabs',
            closable: true
         }).show();
         tabpanel.setActiveTab(itemId);
         var grid = tabpanel.getActiveTab().down('grid');
         var store = grid.getStore();
         store.getProxy().extraParams = filterapp;
         store.load({
            scope: this,
            callback: function(records, operation, success) {
                if (success) {
                    new Ext.util.DelayedTask(function(){
						grid.getSelectionModel().select(0);
						grid.getView().focusRow(0);
					}).delay(1000);

                }
            }
        });
    },

    viewOrdersSaleArchive: function(button) {
        var tabpanel = this.getAppTabPanel();
        var title = "Архивные заявки на продажу";
        var app = "appOrdersSale";
        var id = app+'orders_sale_archive';
        var typeapp = 'orders_sale_archive';
        var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
        var status_archive_id = store_status.findRecord('name','архив').getId();
        var filterapp = {status: [status_archive_id]};
        var itemId = id;
        var tab = tabpanel.getComponent(itemId); // поиск закладки с itemId = data.id
        //снимаем выделение с элемента дерева
        if (tab) {
             tab.show();
             tab.focus();
             return;
         } // если закладка  существует, она открывается

         tabpanel.add({ // добавляем закладку
            xtype: app,
            id:id,
            itemId:itemId,
            title:title,
            typeapp:typeapp,
            iconCls: 'tabs',
            closable: true
         }).show();
         tabpanel.setActiveTab(itemId);
         var grid = tabpanel.getActiveTab().down('grid');
         var store = grid.getStore();
         store.getProxy().extraParams = filterapp;
         store.load({
            scope: this,
            callback: function(records, operation, success) {
                if (success) {
                    new Ext.util.DelayedTask(function(){
						grid.getSelectionModel().select(0);
						grid.getView().focusRow(0);
					}).delay(1000);

                }
            }
        });
    },

    viewOrdersSaleActiv: function(button) {
        var tabpanel = this.getAppTabPanel();
        var title = "Все активные заявки на продажу";
        var app = "appOrdersSale";
        var id = app+'orders_sale_activ';
        var typeapp = 'orders_sale_activ';
        var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
        var status_activ = store_status.findRecord('name','активная').getId();
        var status_block = store_status.findRecord('name','выход на сделку').getId();
        var filterapp = {status: [status_activ,status_block]};
        var itemId = id;
        var tab = tabpanel.getComponent(itemId); // поиск закладки с itemId = data.id
        //снимаем выделение с элемента дерева
        if (tab) {
             tab.show();
             tab.focus();
             return;
         } // если закладка  существует, она открывается
        
         tabpanel.add({ // добавляем закладку
            xtype: app,
            id:id,
            typeapp: typeapp,
            itemId:itemId,
            title:title,
            iconCls: 'tabs',
            closable: true
         }).show();
         tabpanel.setActiveTab(itemId);
         var grid = tabpanel.getActiveTab().down('grid');
         var store = grid.getStore();
         store.getProxy().extraParams = filterapp;
         store.load({
            scope: this,
            callback: function(records, operation, success) {
                if (success) {
                    new Ext.util.DelayedTask(function(){
                        grid.getSelectionModel().select(0);
                        grid.getView().focusRow(0);
                    }).delay(1000);
                    
                }
            }
        });
    },
    
    viewOrdersBuyActiv: function(button) {
        var tabpanel = this.getAppTabPanel();
        var title = "Все активные заявки на покупку";
        var app = "appOrdersBuy";
        var id = app+'orders_buy_activ';
        var typeapp = 'orders_buy_activ';
        var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
        var status_activ = store_status.findRecord('name','активная').getId();
        var status_block = store_status.findRecord('name','выход на сделку').getId();
        var filterapp = {status: [status_activ,status_block]};
        var itemId = id;
        var tab = tabpanel.getComponent(itemId); // поиск закладки с itemId = data.id
        //снимаем выделение с элемента дерева
        if (tab) {
             tab.show();
             tab.focus();
             return;
         } // если закладка  существует, она открывается
        
         tabpanel.add({ // добавляем закладку
            xtype: app,
            id:id,
            typeapp: typeapp,
            itemId:itemId,
            title:title,
            iconCls: 'tabs',
            closable: true
         }).show();
         tabpanel.setActiveTab(itemId);
         var grid = tabpanel.getActiveTab().down('grid');
         var store = grid.getStore();
         store.getProxy().extraParams = filterapp;
         store.load({
            scope: this,
            callback: function(records, operation, success) {
                if (success) {
                    new Ext.util.DelayedTask(function(){
                        grid.getSelectionModel().select(0);
                        grid.getView().focusRow(0);
                    }).delay(1000);
                    
                }
            }
        });
    },
    
    infoAllShow: function(tabp) {
        
        var tabpanel = tabp;
        var itemId = 'appInfoShowinfo_all_show';
        var tab = tabpanel.getComponent(itemId); // поиск закладки с itemId = data.id
        if (tab) {
            tab.show();
            tab.focus();
            return;
        } // если закладка  существует, она открывается
        
        tabpanel.add({ // добавляем закладку
           xtype: 'appInfoShow',
           itemId:'appInfoShowinfo_all_show',
           title:'Статистика',
           iconCls: 'tabs',
           closable: true
        }).show();
    },
    uploading: function(button) {
        var formPanel = Ext.create('Ext.form.Panel', {
            items: []
        });
        formPanel.submit({
            url: '/uploading/',
            timeout : 12000,
            headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
            method: 'POST',
            csrf_token: CRMRE.global.Vars.csrf_token,
            standardSubmit: true,
            //target : '_blank',
            params:{
               type_uploading: button.text
            }
        }); 
    },
    viewUploadingOrders: function(button) {
        var view = Ext.widget('appEditUploadOrders');
        view.show();
    },
    activTabPanel: function(tabPanel, newCard, oldCard, eOpts) {
        try {
		    var grid = newCard.down('grid');
		    var selection = grid.getSelectionModel().getSelection();
        }
		catch (e) {
		  return;
        }
        if (selection.length > 0) {
            grid.getSelectionModel().deselect(selection[0]);
            grid.getSelectionModel().select(selection[0]);
        }
    },
    viewRegulations: function(button){
        var view = Ext.widget('appRegulations');
        view.show();
    }
});