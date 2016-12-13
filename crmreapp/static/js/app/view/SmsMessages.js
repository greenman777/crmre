Ext.define('CRMRE.view.SmsMessages', {
    extend: "Ext.panel.Panel",//наследуем родительский класс
    xtype:'appSmsMessages',
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
        		xtype: 'appSmsMessagesList',
        		flex:3
          	}]
        });
        //инициализируем родительский класс;
        this.callParent(arguments);
    }
});