Ext.define('CRMRE.view.reports.ReportCompleted', {
    extend:'Ext.panel.Panel',
    xtype:'appReportCompleted',
    layout: 'border',
    requires: [//подгружаем классы виджетов
        'CRMRE.view.reports.Completed'
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
                        labelWidth: 110,
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
                        xtype: 'comboboxselect',
                        "multiSelect": false,
                        flex: 1.6,
                        fieldLabel: 'Группа',
                        labelWidth: 50,
                        name: 'object_category',
                        margin: '0 20 0 0',
                        autoSelect: true,
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        store: 'directory.ObjectCategory'
                    }]
                },{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    items:[
                    {
	                        xtype: 'comboboxselect',
	                        flex: 2,
	                        fieldLabel: 'Агент',
	                        labelWidth: 45,
	                        name: 'user',
	                        margin: '0 20 0 0',
	                        autoSelect: true,
	                        queryMode: 'local',
	                        valueField: 'id',
	                        store: 'Users',
	                        listConfig: {
	                            getInnerTpl: function(){
	                                return '{last_name} {first_name}';
	                            }
	                        },
	                        "labelTpl": Ext.create('Ext.XTemplate',
	                        '<tpl for=".">',
	                            '{last_name} {first_name}', 
	                        '</tpl>')
	                },{
                        xtype: 'radiogroup',
                        width: 210,
                        defaults: {anchor: '100%',labelWidth: 80},
                        items: [
                        {
                            boxLabel: 'предложение',
                            name: 'orders_type',
                            checked:'true',
                            inputValue: 1
                        },{
                            boxLabel: 'спрос',
                            name: 'orders_type',
                            inputValue: 2
                        }]
                    },{
                        xtype: 'button',
                        text: 'Обновить',
                        itemId: 'update',
                        padding: '2px 2px 2px 2px',
                        iconCls: 'icon-update',
					    handler: function() {
					        Ext.getCmp('tabpanel').getActiveTab().down('appCompleted').updateReport();
					    }
                    }]
                }]
            },{
                xtype: 'panel',
                region: 'center',
                split: true,
                autoScroll:true,
                items: [{
                    xtype: 'appCompleted'
                }]
            }]
        });
        //инициализируем родительский класс;
        this.callParent(arguments);
    }
});