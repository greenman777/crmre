Ext.define('CRMRE.view.EmailMessages', {
    extend: "Ext.panel.Panel",//наследуем родительский класс
    xtype:'appEmailMessages',
    layout: {
                type: 'hbox',
                align: 'stretch',
                padding:5
            }, 
    requires: [//подгружаем классы виджетов
        'CRMRE.view.sms_messages.List'
    ],
    //инициализируем свойства (конструктор объекта)
    initComponent: function () {
        Ext.apply(this, {
            items: [{
        		xtype: 'appEmailMessagesList',
        		flex:3
          	}]
        });
        //инициализируем родительский класс;
        this.callParent(arguments);
    }
});