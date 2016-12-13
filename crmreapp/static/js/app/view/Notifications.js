Ext.define('CRMRE.view.Notifications', {
    extend: "Ext.panel.Panel",//наследуем родительский класс
    xtype:'appNotifications',
    layout: {
                type: 'hbox',
                align: 'stretch',
                padding:5
            }, 
    requires: [//подгружаем классы виджетов
        'CRMRE.view.notifications.List'
    ],
    //инициализируем свойства (конструктор объекта)
    initComponent: function () {
        Ext.apply(this, {
            items: [{
        		xtype: 'appNotificationsList',
        		flex:3
    		}]
        });
        //инициализируем родительский класс;
        this.callParent(arguments);
    }
});