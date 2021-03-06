Ext.define('CRMRE.view.reports.ReportKPI', {
    extend:'Ext.panel.Panel',
    xtype:'appReportKPI',
    layout: 'border',
    requires: [//подгружаем классы виджетов
        'CRMRE.view.reports.KPI'
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
                        xtype: 'radiogroup',
                        width: 210,
                        defaults: {anchor: '100%',labelWidth: 80},
                        items: [
                        {
                            boxLabel: 'по типу',
                            name: 'group_type',
                            checked:'true',
                            inputValue: 1
                        },{
                            boxLabel: 'по группам',
                            name: 'group_type',
                            inputValue: 2
                        }]
                    },{
                        xtype: 'button',
                        text: 'Обновить',
                        itemId: 'update',
                        padding: '2px 2px 2px 2px',
                        iconCls: 'icon-update',
					    handler: function() {
					        Ext.getCmp('tabpanel').getActiveTab().down('appKPI').updateReport();
					    }
                    }]
                }]
            },{
                xtype: 'panel',
                region: 'center',
                split: true,
                autoScroll:true,
                items: [{
                    xtype: 'appKPI'
                }]
            }]
        });
        //инициализируем родительский класс;
        this.callParent(arguments);
    }
});