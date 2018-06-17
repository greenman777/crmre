Ext.define('CRMRE.view.Header', {//заголовок и глобальноеменю
    extend: 'Ext.Container',
    requires: ['CRMRE.global.Vars','Ext.ux.form.SearchField'],
    xtype: 'appHeader',
    //store: ['ComboSearch'],
    height: 65,
    layout: {
        type: 'border',
        align: 'middle'
    },
    initComponent: function() {
        this.items = [{//логотип приложения
            xtype: 'component',
            region: "west",
            margins: '2 5 2 20',
            html: '<img src="/static/images/logo.png" alt="" width="166" height="60">'
        },{//группа кнопок меню
        	xtype: 'buttongroup',
        	region: "center",
        	margins: '2 0 2 20',
        	//autoScroll:true,
        	defaults: {
      			scale: "large",
      			iconAlign: "top",
      			autoWidth: true
    		},
    		items:[{
            		text: 'Пользователи', 
            		iconCls: 'icon-users', 
            		height: 60, 
            		action: 'users_view'
            	},{
            		text: 'Новостройки', 
            		iconCls: 'icon-buildings', 
            		height: 60, 
            		action: 'buildings_view'
            	},{
            		xtype:'splitbutton',
            		text: 'Новый клиент', 
            		tooltip: 'Добавить нового клиента',
            		iconCls: 'icon-client_add_32', 
            		height: 60, 
            		action: 'clients_add',
            		menu: [
                    { 
                        text: 'Новый клиент в резерве',
	            		action: 'partners_add'
                    }]
            	},{
                    xtype:'splitbutton',
            		text: 'Спрос',
            		tooltip: 'Заявки на покупку',
            		iconCls: 'icon-orders_buy_info', 
                    itemId: 'orders_buy_info',
                    height: 60,
                    menu: [
                    { 
                        text: 'Свободные',
                        itemId: 'orders_buy_free',
                        action: 'orders_buy_free_view'
                    },{ 
                        text: 'Завершенные',
                        itemId: 'orders_buy_complet',
                        action: 'orders_buy_complet_view'
                    },{ 
                        text: 'Все активные',
                        action: 'orders_buy_activ'
                    },{
                        text: 'Архивные',
                        itemId: 'orders_buy_archive',
                        action: 'orders_buy_archive_view'
                    }]
                },{
                    xtype:'splitbutton',
            		text: 'Предложение',
            		tooltip: 'Заявки на продажу',
            		iconCls: 'icon-orders_sale_info', 
                    itemId: 'orders_sale_info',
                    height: 60,
                    menu: [
                    { 
                        text: 'Свободные',
                        itemId: 'orders_sale_free',
                        action: 'orders_sale_free_view'
                    },{ 
                        text: 'Завершенные',
                        itemId: 'orders_sale_complet',
                        action: 'orders_sale_complet_view'
                    },{ 
                        text: 'Все активные',
                        action: 'orders_sale_activ'
                    },{
                        text: 'Архивные',
                        itemId: 'orders_sale_archive',
                        action: 'orders_sale_archive_view'
                    }]
                },{
                    xtype:'splitbutton',
            		text: 'Выгрузки', 
            		tooltip: 'Выгрузка объявлений',
            		iconCls: 'icon-uploading', 
                    itemId: 'uploading',
                    height: 60,
                    menu: [
                    { 
                        text: 'Выгрузка в газету ЯЖ',
                        action: 'uploading_yazh'
                    },{ 
                        text: 'Выгрузка в АН',
                        action: 'uploading_an'
                    },{
                        text: 'Выгрузка заявок',
                        //hidden: true,
                        itemId: 'uploading_orders',
                        action: 'uploading_orders_view'
                    }]
                },{
                    text: 'Книга',
                    iconCls: 'icon-regulations', 
                    itemId: 'regulations',
                    height: 60, 
                    action: 'regulations_view'
                },{
                    text: 'Новых сообщений нет', 
                    iconCls: 'icon-notifications', 
                    itemId: 'notifications',
                    height: 60, 
                    action: 'notifications_view'
                }
            ]
        },{
        	xtype: 'buttongroup',
        	region: "east",
        	margins: '2 2 2 0',
        	padding: '8px 5px 5px 5px',
        	defaults: {
      			scale: "large",
      			iconAlign: "center"
    		},
            items:[
                {
    			    xtype : 'button', 
                    html: '<p>Вход: <b>'+CRMRE.global.Vars.user_fullname+'</b></p>'
    			},{
        			iconCls: 'icon-change-password',handler: function() {
            		    window.location = '/accounts/change_password/';//смена пароля - переход по ссылке
        			}
        		},{
        			iconCls: 'icon-exit',
    				handler: function() {
            			window.location = '/accounts/logout/';//выход из системы - переход по ссылке
        			}
    			}]
        	}			
        ],
        this.callParent();
    }
});
