Ext.define('CRMRE.view.Users', {
    extend: "Ext.panel.Panel",//наследуем родительский класс
    xtype:'appUsers',
    layout: {
                type: 'hbox',
                align: 'stretch',
                padding:5
            }, 
    requires: [//подгружаем классы виджетов
        'CRMRE.view.users.List',
        'CRMRE.view.users.Details'
    ],
    //инициализируем свойства (конструктор объекта)
    initComponent: function () {
        Ext.apply(this, {
            items: [{
        		xtype: 'appUsersList',
        		flex:3
    		},{
                title:'Подробности',
                xtype: 'panel',
                itemId:'panelUsersDetails',
                region: 'west',
                autoScroll:true,
                flex:1,
                items: [{
                    xtype: 'appUsersDetails'
                }]
          	}]
        });
        //инициализируем родительский класс;
        this.callParent(arguments);
    }
});