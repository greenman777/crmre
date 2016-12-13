Ext.define('CRMRE.view.reports.ReportObjectType', {
    extend:'Ext.panel.Panel',
    xtype:'appReportObjectType',
    layout: 'border',
    requires: [//подгружаем классы виджетов
        'CRMRE.view.reports.ObjectType'
    ],
    initComponent: function() {
        Ext.apply(this, {
            items: [{
                region: 'north',
                xtype: 'form',
	            frame: true,
	            defaults: {anchor: '100%',padding: '5 5 5 5',labelWidth: 100},
	            items: [
	            {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    defaults: {flex: 1},
                    items:[
                    {
                        xtype: 'comboboxselect',
                        "multiSelect": false,
                        fieldLabel: 'Город/н.п.',
                        name: 'city',
                        margin: '0 20 0 0',
                        autoSelect: true,
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        store: 'directory.City'
                    },{
                        xtype: 'comboboxselect',
                        "multiSelect": false,
                        fieldLabel: 'Микрорайон',
                        name: 'microdistrict',
                        margin: '0 20 0 0',
                        autoSelect: true,
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        store: 'directory.Microdistrict'
                    },{
			            xtype: 'radiogroup',
			            items: [
			            {
			            	boxLabel: 'Продажа',
			            	name: 'transaction_type',
			            	inputValue: 1,
			            	margin: '0 20 0 0',
			            	checked:'true'
			            },{
			            	boxLabel: 'Аренда',
			            	name: 'transaction_type',
			            	margin: '0 20 0 0',
			            	inputValue: 0
			            }]
		            },{
                        xtype: 'button',
                        text: 'Обновить',
                        itemId: 'update',
                        padding: '2px 2px 2px 2px',
                        iconCls: 'icon-update',
					    handler: function() {
					        Ext.getCmp('tabpanel').getActiveTab().down('appObjectType').updateReport();
					    }
                    }]
                }]
            },{
                xtype: 'panel',
                region: 'center',
                split: true,
                autoScroll:true,
                items: [{
                    xtype: 'appObjectType'
                }]
            }]
        });
        //инициализируем родительский класс;
        this.callParent(arguments);
    }
});