Ext.define('CRMRE.view.OrdersSale', {
    extend: "Ext.panel.Panel",//наследуем родительский класс
    xtype:'appOrdersSale',
    layout: 'border',
    requires: [//подгружаем классы виджетов
        'CRMRE.view.orders_sale.List',
        'CRMRE.view.offer_sale.List',
        'CRMRE.view.hystory_offer.List',
        'CRMRE.view.hystory_show.List',
        'CRMRE.view.hystory_service.List'
    ],
    //инициализируем свойства (конструктор объекта)
    initComponent: function () {
        Ext.apply(this, {
            items: [
            {
            	region: 'center',
                xtype: 'appOrdersSaleList',
                flex:3.5,
                //collapsible: true,
                split: true,
            },{
                region: 'south',
                itemId: 'offer_sale_list',
                xtype: 'panel',
                flex:3,
                split: true,
                layout: 'border',
                items:
                [{
                    xtype: 'appOfferSaleList',
                    region: 'center',
                    split: true,
                    flex:2
                },{
                    xtype: 'panel',
                    region: 'east',
                    itemId: 'hystory_accord',
                    flex:1,
                    split: true,
                    layout:'accordion',
                    items: 
                    [{
                        xtype: 'appHystoryOfferList',
                        split: true,
                        flex:1
                    },{
                        xtype: 'appHystoryShowList',
                        split: true,
                        flex:1
                    },{
                        xtype: 'appHystoryServiceList',
                        split: true,
                        flex:1
                    }]
                }]
            },{
                region: 'south',
                flex:2,
                xtype: 'appClientCommentsList',
                title: 'История взаимодействия',
                split: true,
                collapsible: true,
                collapsed: true,
                autoScroll: true,
            }]
        });
        //инициализируем родительский класс;
        this.callParent(arguments);
    }
});