Ext.define('CRMRE.view.reports.ReportSalesFunnel', {
    extend:'Ext.panel.Panel',
    xtype:'appReportSalesFunnel',
    layout: 'border',
    requires: [//подгружаем классы виджетов
        'CRMRE.view.reports.SalesFunnel'
    ],
    initComponent: function() {
        Ext.apply(this, {
            items: [{
                region: 'north',
                xtype: 'form',
	            frame: true,
	            defaults: {anchor: '100%',padding: '5 5 5 5'},
	            items: [
	            {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    items:[
                    {
                        xtype: 'datefield',
                        name: 'date_start',
                        labelWidth: 100,
                        format: 'Y-m-d',
                        margin: '0 15 0 0',
                        fieldLabel: 'Начало периода',
                        value: Ext.Date.add(new Date(), Ext.Date.MONTH, -1),
                        format: 'Y-m-d'
                    },{
                        xtype: 'datefield',
                        name: 'date_stop',
                        labelWidth: 120,
                        format: 'Y-m-d',
                        margin: '0 20 0 0',
                        fieldLabel: 'Окончание периода',
                        value: new Date(),
                        format: 'Y-m-d'
                    },{
                        xtype: 'button',
                        text: 'Обновить',
                        itemId: 'update',
                        padding: '2px 2px 2px 2px',
                        iconCls: 'icon-update',
					    handler: function() {
					        Ext.getCmp('tabpanel').getActiveTab().down('appSalesFunnel').updateReport();
					    }
                    }]
                }]
            },{
                xtype: 'panel',
                region: 'center',
                split: true,
                autoScroll:true,
                items: [{
                    xtype: 'appSalesFunnel'
                }]
            }]
        });
        //инициализируем родительский класс;
        this.callParent(arguments);
    }
});