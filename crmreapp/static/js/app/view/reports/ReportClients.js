Ext.define('CRMRE.view.reports.ReportClients', {
    extend:'Ext.panel.Panel',
    xtype:'appReportClients',
    layout: 'border',
    listeners: {
        afterrender: {
            fn: function(){ 
                this.updateReport();
            }
        }
    },
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
                    items:[
                    {
                        xtype: 'datefield',
                        name: 'date_start',
                        labelWidth: 200,
                        format: 'Y-m-d',
                        margin: '0 20 0 0',
                        fieldLabel: 'Начало периода',
                        value: Ext.Date.add(new Date(), Ext.Date.MONTH, -1),
                        format: 'Y-m-d'
                    },{
                        xtype: 'datefield',
                        name: 'date_stop',
                        labelWidth: 200,
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
                            this.up('appReportClients').updateReport();
                        }
                    }]
                },{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    items:[
                    {
                        xtype: 'textfield',
                        name: 'clients_start',
                        itemId: 'clients_start',
                        labelWidth: 200,
                        readOnly: true,
                        margin: '0 20 0 0',
                        fieldLabel: 'Клиентов на начало периода'
                    },{
                        xtype: 'textfield',
                        name: 'clients_sещз',
                        itemId: 'clients_stop',
                        labelWidth: 200,
                        readOnly: true,
                        margin: '0 20 0 0',
                        fieldLabel: 'Клиентов на окончание периода'
                    }]
                }]
            },{
                xtype: 'panel',
                region: 'center',
                split: true,
                autoScroll:true,
                tbar: [{
		            text: 'Сохранить диаграмму',
		            iconCls: 'icon-save',
		            handler: function() {
		            	my = this;
		                Ext.MessageBox.confirm('Подтвердите сохранение', 'Вы действительно хотите сохранить диаграмму?', function(choice){
		                    if(choice == 'yes'){
		                        my.up('panel').down('chart').save({
		                            type: 'image/png',
		                            url: '/svg_to_png/'
		                        });
		                    }
		                });
		            }
		        }],
                items: [
                {
                    xtype: 'chart',
                    width: 1050,
   					height: 420,
		            animate: true,
                    style: 'background:#fff',
                    shadow: true,
		            theme: 'Category1',
                    margin: '20 20 20 20',
                    store: new Ext.data.ArrayStore(
                    {
                        fields:
                        [
                            {name:'clients'},
                            {name:'date'}
                         ]
                    }),
                    legend: {
		                position: 'right'
		            },
                    axes: [
				        {
                            title: 'Кол-во',
				            grid: true,
                            type: 'Numeric',
				            position: 'left',
				            fields: ['clients'],
				            minimum: 0
				        },
				        {
				            title: 'Дата',
                            grid: true,
				            type: 'Time',
				            position: 'bottom',
				            fields: ['date'],
				            dateFormat: 'Y-m-d'
				        }
				    ],
				    series: [
				        {   
                            title: 'клиенты',
                            type: 'line',
                            showInLegend: true,
                            xField: 'date',
                            yField: 'clients',
                            tips: {
			                  trackMouse: true,
			                  width: 230,
			                  height: 30,
			                  renderer: function(storeItem, item) {
			                    this.setTitle(storeItem.get('clients') + ' новых клиентов на: ' + storeItem.get('date'));
			                  }
			                },
                            markerConfig: {
					            type: 'circle',
					            size: 4,
					            radius: 4,
					            'stroke-width': 0
					        }
                        }
				    ]
                }]
            }]
        });
        //инициализируем родительский класс;
        this.callParent(arguments);
    },
    updateReport: function() {
        date_start = Ext.getCmp('tabpanel').getActiveTab().down("form").getValues().date_start;
        date_stop = Ext.getCmp('tabpanel').getActiveTab().down("form").getValues().date_stop;
        if (Ext.Date.parse(date_start, "Y-m-d")>=Ext.Date.parse(date_stop, "Y-m-d")) {
            Ext.Msg.alert('Предупреждение', 'Не верно указан диапазон дат!'); 
            return;
        };
        my = this;
        this.down("form").down('#update').setDisabled(true);
        Ext.Ajax.request({
            url: '/reports/',
            params: {
                date_start: date_start,
                date_stop: date_stop,
                report_type: "clients"
            },
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                var data = obj.messages;
                my.down('chart').store.loadData(data);
                my.down("form").down('#update').setDisabled(false);
                my.down("form").down('#clients_start').setValue(obj.clients_start);
                my.down("form").down('#clients_stop').setValue(obj.clients_stop);
            }
        });
    }
});