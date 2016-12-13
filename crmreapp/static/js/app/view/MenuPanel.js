Ext.define('CRMRE.view.MenuPanel', {//древовидное меню приложения
    extend: "Ext.panel.Panel",
    xtype:'appMenuPanel',
    id:'menupanel',
    requires: [//подгружаем классы виджетов
        'CRMRE.view.orders_buy.List',
    ],
    initComponent: function() {
        Ext.apply(this, {
            xtype:'panel',
            title:'Разделы',
            width: 206,
            split: true,
            collapsible:true,
            autoScroll:true,
            items: [{
                xtype: 'treepanel',
                border: false,
                margin:'5 4 0 4',
                height: '98%',                  
                rootVisible: false,
                store: 'MenuTree'
            },{
                xtype: 'appNotificationsListNew',
                border: false,
                margin:'5 4 0 4',
            }]
        });
        this.callParent(arguments);
    }
});