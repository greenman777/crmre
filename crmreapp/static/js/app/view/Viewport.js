Ext.define('CRMRE.view.Viewport', {//создаем первичный контейнер Viewport, занимающий все окно браузера
    extend: 'Ext.container.Viewport',//наследуем родительский класс
    layout: 'border',//тип слоя border (делит страницу на пять областей center, north, south, west, east) 
    requires: [//подгружаем классы виджетов
        'CRMRE.view.TabPanel',
        'CRMRE.view.Header',
        'CRMRE.view.MenuPanel',
        'CRMRE.view.Tasks',
        'CRMRE.view.Clients',
        'CRMRE.view.Photos',
        'CRMRE.view.Documents',
        'CRMRE.view.Regulations',
        'CRMRE.view.OrdersBuy',
        'CRMRE.view.OrdersSale',
        'CRMRE.view.Users',
        'CRMRE.view.Notifications',
        'CRMRE.view.reports.InfoShow',
        'CRMRE.view.reports.InfoClient',
        'CRMRE.view.reports.ReportKPI',
        'CRMRE.view.reports.ReportSalesFunnel',
        'CRMRE.view.reports.ReportObjectType',
        'CRMRE.view.reports.ReportDynamics',
        'CRMRE.view.reports.ReportClients',
        'CRMRE.view.reports.ReportCompleted',
        'CRMRE.view.reports.ReportPayroll',
        'CRMRE.view.SmsMessages',
        'CRMRE.view.EmailMessages',
        'CRMRE.view.Buildings',
        'CRMRE.util.ShowEvents',
        'CRMRE.view.uploading.EditUploadOrders'
    ],
    //инициализируем свойства (конструктор объекта)
    initComponent: function () {
        Ext.apply(this, {
            items: [{//заголовок
        		region: 'north',
        		xtype: 'appHeader'
    		},{//меню приложения
            	region: 'west',
        		xtype: 'appMenuPanel'
          	},{//панель вкладок для таблиц
            	region: 'center',
                xtype: 'appTabPanel'
            }]
        });
        //инициализируем родительский класс;
        this.callParent(arguments);
    }
});