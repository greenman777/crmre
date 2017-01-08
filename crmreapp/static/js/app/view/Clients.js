Ext.define('CRMRE.view.Clients', {
    extend: "Ext.panel.Panel",//наследуем родительский класс
    xtype:'appClients',
    layout: 'border', 
    requires: [//подгружаем классы виджетов
        'CRMRE.view.clients.List',
        'CRMRE.view.clients.Details',
        'CRMRE.view.client_comments.List',
    ],
    //инициализируем свойства (конструктор объекта)
    initComponent: function () {
        this.compet = true;
        Ext.apply(this, {
            items: [{
            	region: 'center',
        		xtype: 'appClientsList',
        		flex:4
    		},{
            	region: 'east',
    			xtype: 'panel',
    			title:'Подробности',
                collapsible: true,
                split: true,
				autoScroll:true,
        		flex:1,
        		items: [{
        			xtype: 'appClientsDetails',
    			}]
          	},{
                region: 'south',
                xtype: 'panel',
                flex:2,
                collapsible: true,
                collapsed: true,
                split: true,
                title:'История взаимодействия',
	            xtype: 'appClientCommentsList',
            }]
        });
        //инициализируем родительский класс;
        this.callParent(arguments);
    }
});