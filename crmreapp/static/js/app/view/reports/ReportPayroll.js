Ext.define('CRMRE.view.reports.ReportPayroll', {
    extend:'Ext.panel.Panel',
    xtype:'appReportPayroll',
    layout: 'border',
    requires: [//подгружаем классы виджетов
        'CRMRE.view.reports.Payroll'
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
                        value: new Date(this.getDateMonthPrevious().getFullYear(),this.getDateMonthPrevious().getMonth(),1),
                        format: 'Y-m-d'
                    },{
                        xtype: 'datefield',
                        name: 'date_stop',
                        labelWidth: 120,
                        format: 'Y-m-d',
                        margin: '0 20 0 0',
                        fieldLabel: 'Окончание периода',
                        value: new Date(this.getDateMonthPrevious().getFullYear(),this.getDateMonthPrevious().getMonth(),new Date(this.getDateMonthPrevious().getFullYear() , this.getDateMonthPrevious().getMonth()+1, 0).getDate()),
                        format: 'Y-m-d'
                    },{
                        xtype: 'comboboxselect',
                        "multiSelect": false,
                        flex: 1.6,
                        allowBlank:false,
                        fieldLabel: 'Группа',
                        labelWidth: 50,
                        name: 'object_category',
                        margin: '0 20 0 0',
                        autoSelect: true,
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        store: 'directory.ObjectCategory'
                    },{
                        xtype: 'button',
                        text: 'Обновить',
                        itemId: 'update',
                        padding: '2px 2px 2px 2px',
                        iconCls: 'icon-update',
					    handler: function() {
					        Ext.getCmp('tabpanel').getActiveTab().down('appPayroll').updateReport();
					    }
                    }]
                }]
            },{
                xtype: 'panel',
                region: 'center',
                split: true,
                autoScroll:true,
                items: [{
                    xtype: 'appPayroll'
                }]
            }]
        });
        //инициализируем родительский класс;
        this.callParent(arguments);
    },
    getDateMonthPrevious: function(){
    	return Ext.Date.add(new Date(), Ext.Date.MONTH, -1);	
    }
});