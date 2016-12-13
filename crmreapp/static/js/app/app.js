var splashscreen;

Ext.onReady(function() {
    //Ext.override(Ext.data.proxy.Ajax, { timeout: 360000 });
    Ext.Ajax.timeout= 600000;
    Ext.data.Connection.disableCaching = true;
    Ext.data.proxy.Server.prototype.noCache = true;
    Ext.Ajax.disableCaching = true;
    Ext.override(Ext.form.Basic, { timeout: Ext.Ajax.timeout / 1000 });
    Ext.override(Ext.data.proxy.Server, { timeout: Ext.Ajax.timeout });
    Ext.override(Ext.data.Connection, { timeout: Ext.Ajax.timeout });
    Ext.QuickTips.init();
    // Start the mask on the body and get a reference to the mask
    splashscreen = Ext.getBody().mask('Загрузка приложения', 'splashscreen');
    // Add a new class to this mask as we want it to look different from the default.
    splashscreen.addCls('splashscreen');
    
    // Insert a new div before the loading icon where we can place our logo.
    Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
        cls: 'x-splash-icon'
    });
    
    Ext.util.Format.decimalSeparator = '.';
});

Ext.Loader.setPath('Ext.ux', 'static/js/ext/examples/ux');
Ext.application({
	requires: ['CRMRE.global.Vars','Ext.container.Viewport'],//подсказываем какие классы загрузить при старте
	name: 'CRMRE',//глобальная переменная области видимости приложения
	appFolder: 'static/js/app',//путь к приложению
	controllers: [//подключаем контроллеры
    	'Interface',
    	'Tasks',
    	'TaskHistory',
        'TaskComments',
        'ClientComments',
    	'Users',
    	'Clients',
    	'OrdersSale',
    	'Photos',
    	'OrdersBuy',
    	'Offer',
    	'HystoryOffer',
    	'HystoryShow',
    	'HystoryService',
    	'Notifications',
        'SmsMessages',
        'EmailMessages',
        'Buildings',
        'Plan',
        'Documents'
    ],
    launch: function() {
    	Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
    	Ext.Component.prototype.stateful = false;
        // Setup a task to fadeOut the splashscreen
        var task = new Ext.util.DelayedTask(function() {
            // Fade out the body mask
            splashscreen.fadeOut({
                duration: 1000000,
                remove:true
            });
            /*
            Ext.getBody().unmask({
                duration: 500,
                remove: true
            });*/
            // Fade out the icon and message
            splashscreen.next().fadeOut({
                duration: 1000000,
                remove:true,
                listeners: {
                    afteranimate: function() {
                        // Set the body as unmasked after the animation
                        Ext.getBody().unmask();
                    }
                }
            });
        });
        // Run the fade 500 milliseconds after launch.
        task.delay(500);
    },
	autoCreateViewport: true//Viewport создаем автоматичекски
});
