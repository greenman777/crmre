Ext.define('CRMRE.view.reports.ReportDynamics', {
    extend:'Ext.panel.Panel',
    xtype:'appReportDynamics',
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
                        itemId: 'date_start',
                        labelWidth: 120,
                        format: 'Y-m-d',
                        margin: '0 15 0 0',
                        fieldLabel: 'Начало периода',
                        value: Ext.Date.add(new Date(), Ext.Date.DAY, -7),
                        format: 'Y-m-d'
                    },{
                        xtype: 'datefield',
                        name: 'date_stop',
                        itemId: 'date_stop',
                        labelWidth: 120,
                        format: 'Y-m-d',
                        margin: '0 15 0 0',
                        fieldLabel: 'Окончание периода',
                        value: new Date(),
                        format: 'Y-m-d'
                    },{
                        xtype: 'radiogroup',
                        width: 330,
                        defaults: {anchor: '100%',labelWidth: 100},
                        items: [
                        {
                            boxLabel: 'все заявки',
                            name: 'orders_type',
                            inputValue: 1,
                            checked:'true'
                        },{
                            boxLabel: 'спрос',
                            name: 'orders_type',
                            inputValue: 2
                        },{
                            boxLabel: 'предложение',
                            name: 'orders_type',
                            inputValue: 3
                        }]
                    }]
                },{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    defaults: {flex: 1},
                    items:[
                    {
                        xtype: 'comboboxselect',
                        "multiSelect": false,
                        flex: 1.6,
                        fieldLabel: 'Тип',
                        labelWidth: 40,
                        name: 'object_category',
                        margin: '0 15 0 0',
                        autoSelect: true,
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        store: 'directory.ObjectCategory'
                    },{
                        fieldLabel: 'Группа',
                        xtype: 'numberfield',
                        itemId: 'brigade',
                        flex: 0.8,
                        minValue: 0,
                        maxValue: 50,
                        labelWidth: 50,
                        name: 'brigade',
                        margin: '0 15 0 0',
                    },{
                        xtype: 'comboboxselect',
                        flex: 3,
                        fieldLabel: 'Агент',
                        labelWidth: 45,
                        name: 'user',
                        margin: '0 15 0 0',
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
                        margin: '0 15 0 0',
                        items: [
                        {
                            boxLabel: 'Дневная',
                            name: 'date_type',
                            inputValue: 1,
                            margin: '0 15 0 0',
                            checked:'true'
                        },{
                            boxLabel: 'Месячная',
                            name: 'date_type',
                            margin: '0 15 0 0',
                            inputValue: 0
                        }],
                        listeners: {
                            change: function (field, newValue, oldValue) {
				                if (parseInt(newValue['date_type'])){
				                    this.up('form').down('#date_stop').setValue(new Date());
                                    this.up('form').down('#date_start').setValue(Ext.Date.add(new Date(), Ext.Date.DAY, -7));
                                }
                                else {
                                    this.up('form').down('#date_stop').setValue(new Date());
                                    this.up('form').down('#date_start').setValue(Ext.Date.add(new Date(), Ext.Date.MONTH, -6));
                                }
                            }
                        }
                    },{
                        xtype: 'button',
                        text: 'Обновить',
                        itemId: 'update',
                        padding: '2px 2px 2px 2px',
                        iconCls: 'icon-update',
                        handler: function() {
                            this.up('appReportDynamics').updateReport();
                        }
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
                items: [{
                    xtype: 'chart',
                    width: 1050,
   					height: 420,
		            animate: true,
                    style: 'background:#fff',
                    shadow: true,
		            theme: 'Base',
                    margin: '20 20 20 20',
                    store: new Ext.data.ArrayStore(
                    {
                        fields:
                        [
                            {name:'orders_all_counts'},
                            {name:'orders_agent_counts'},
                            {name:'contracts'},
                            {name:'shows_acts'},
                            {name:'transactions'},
                            {name:'orders_retired'},
                            {name:'date'}
                         ]
                    }),
                    legend: {
		                position: 'right'
		            },
                    axes: [
				        {
                            title: 'Кол-во',
                            type: 'Numeric',
				            position: 'left',
				            fields: ['orders_all_counts','orders_agent_counts','contracts','shows_acts','transactions','orders_retired'],
				            minimum: 0
				        },
				        {
				            title: 'Дата',
				            type: 'Time',
				            position: 'bottom',
				            fields: ['date'],
				            dateFormat: 'Y-m-d'
				        }
				    ],
				    series: [
				        {
			                type: 'line',
                            stacked: true,
                            showInLegend: true,
			                xField: 'date',
			                yField: 'orders_all_counts',
                            title: 'поступившие заявки',
			                tips: {
			                  trackMouse: true,
			                  width: 230,
			                  height: 30,
			                  renderer: function(storeItem, item) {
			                    this.setTitle(storeItem.get('orders_all_counts') + ' поступ. заявок на: ' + storeItem.get('date'));
			                  }
			                },
		                    markerConfig: {
                                type: 'circle',
                                size: 4,
                                radius: 4,
                                'stroke-width': 0
                            }
                        },{
                            type: 'line',
                            stacked: true,
                            showInLegend: true,
                            xField: 'date',
                            yField: 'orders_agent_counts',
                            title: 'заявки принесены агентами',
			                tips: {
			                  trackMouse: true,
			                  width: 230,
			                  height: 30,
			                  renderer: function(storeItem, item) {
			                    this.setTitle(storeItem.get('orders_agent_counts') + ' заявок агентов на: ' + storeItem.get('date'));
			                  }
			                },
                            markerConfig: {
                                type: 'circle',
                                size: 4,
                                radius: 4,
                                'stroke-width': 0
                            }  
                        },{
                            type: 'line',
                            stacked: true,
                            showInLegend: true,
                            xField: 'date',
                            yField: 'contracts',
                            title: 'заключенные договора',
			                tips: {
			                  trackMouse: true,
			                  width: 230,
			                  height: 30,
			                  renderer: function(storeItem, item) {
			                    this.setTitle(storeItem.get('contracts') + ' договоров на: ' + storeItem.get('date'));
			                  }
			                },
                            markerConfig: {
                                type: 'circle',
                                size: 4,
                                radius: 4,
                                'stroke-width': 0
                            }  
                        },{
                            type: 'line',
                            stacked: true,
                            showInLegend: true,
                            xField: 'date',
                            yField: 'shows_acts',
                            title: 'показы',
			                tips: {
			                  trackMouse: true,
			                  width: 230,
			                  height: 30,
			                  renderer: function(storeItem, item) {
			                    this.setTitle(storeItem.get('shows_acts') + ' показов на: ' + storeItem.get('date'));
			                  }
			                },
                            markerConfig: {
                                type: 'circle',
                                size: 4,
                                radius: 4,
                                'stroke-width': 0
                            }  
                        },{
                            type: 'line',
                            stacked: true,
                            showInLegend: true,
                            xField: 'date',
                            yField: 'transactions',
                            title: 'успешные заявки',
			                tips: {
			                  trackMouse: true,
			                  width: 230,
			                  height: 30,
			                  renderer: function(storeItem, item) {
			                    this.setTitle(storeItem.get('transactions') + ' успешных заявок на: ' + storeItem.get('date'));
			                  }
			                },
                            markerConfig: {
                                type: 'circle',
                                size: 4,
                                radius: 4,
                                'stroke-width': 0
                            }  
                        },{
                            type: 'line',
                            stacked: true,
                            showInLegend: true,
                            xField: 'date',
                            yField: 'orders_retired',
                            title: 'отказные заявки',
			                tips: {
			                  trackMouse: true,
			                  width: 230,
			                  height: 30,
			                  renderer: function(storeItem, item) {
			                    this.setTitle(storeItem.get('orders_retired') + ' отказных заявок на: ' + storeItem.get('date'));
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
        object_category = Ext.getCmp('tabpanel').getActiveTab().down("form").getValues().object_category;
        orders_type = Ext.getCmp('tabpanel').getActiveTab().down("form").getValues().orders_type;
        date_type = Ext.getCmp('tabpanel').getActiveTab().down("form").getValues().date_type;
        user = Ext.getCmp('tabpanel').getActiveTab().down("form").getValues().user;
        brigade = Ext.getCmp('tabpanel').getActiveTab().down("form").getValues().brigade;
        if (user=='') {user=[];};
        if (Ext.Date.parse(date_start, "Y-m-d")>=Ext.Date.parse(date_stop, "Y-m-d")) {
            Ext.Msg.alert('Предупреждение', 'Не верно указан диапазон дат!'); 
            return;
        };

        if (this.down("form").isValid()) {
            my = this;
            this.down("form").down('#update').setDisabled(true);
            Ext.Ajax.request({
                url: '/reports/',
                params: {
                    date_start: date_start,
                    date_stop: date_stop,
                    object_category: object_category,
                    orders_type: orders_type,
                    date_type: date_type,
                    user: user,
                    brigade: brigade,
                    report_type: "dynamics"
                },
                success: function (response, opts) {
                    var obj = Ext.decode(response.responseText);
                    var data = obj.messages;
                    my.down('chart').store.loadData(data);
                    my.down("form").down('#update').setDisabled(false);
                }
            });
        };
    }
});