Ext.define('CRMRE.view.OrdersBuy', {
    extend: "Ext.panel.Panel",//наследуем родительский класс
    xtype:'appOrdersBuy',
    layout: 'border',
    requires: [//подгружаем классы виджетов
        'CRMRE.view.notifications.ListNew'
    ],
    //инициализируем свойства (конструктор объекта)
    initComponent: function () {
        Ext.apply(this, {
            items: [
            {
            	region: 'center',
                xtype: 'appOrdersBuyList',
                flex:3.5,
                //collapsible: true,
                split: true,
            },{
    			region: 'south',
    			itemId: 'offer_buy_list',
    			xtype: 'panel',
                flex:3,
                split: true,
                layout: 'border',
 				items:
 				[{   		
	        		xtype: 'appOfferBuyList',
                    region: 'center',
                    split: true,
	        		flex:2,
	          	},{
                    xtype: 'panel',
                    itemId: 'hystory_accord',
                    region: 'east',
                    split: true,
                    flex:1,
                    layout:'accordion',
                    items: 
                    [{
                        xtype: 'appHystoryOfferList',
                        flex:1
                    },{
                        xtype: 'appHystoryShowList',
                        flex:1
                    },{
                        xtype: 'appHystoryServiceList',
                        flex:1
                    }]
                }]
    		}]
        });
        //инициализируем родительский класс;
        this.callParent(arguments);
    }
});