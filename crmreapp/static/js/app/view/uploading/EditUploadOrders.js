Ext.define('CRMRE.view.uploading.EditUploadOrders', {
    extend: 'Ext.window.Window',
    xtype: 'appEditUploadOrders',
    title: 'Заполните параметры запроса',
    width:650,
    layout: 'fit',
    resizable: false,
    closeAction: 'hide',
    modal : true,
    requires: [
        'Ext.ux.form.field.BoxSelect'
    ],
    initComponent: function() {
        this.items = [{
        	xtype: 'form',
        	layout: 'anchor',
            bodyStyle: {
                background: 'none',
                padding: '10px',
                border: '0'
            },
            defaults: {
                xtype: 'textfield',
                anchor: '100%'
            },
            fieldDefaults: {msgTarget: 'side',labelWidth: 140},
            items: [
            {
                xtype:'fieldset',
                title: 'Параметры',
                collapsible: true,
                defaultType: 'textfield',
                layout: 'anchor',
                defaults: {anchor: '100%'},
                items :[
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    items:[
                    {
                        xtype: 'datefield',
                        name: 'date_start',
                        //labelWidth: 100,
                        format: 'Y-m-d',
                        margin: '0 10 0 0',
                        fieldLabel: 'Начало периода',
                        value: Ext.Date.add(new Date(), Ext.Date.MONTH, -1),
                        format: 'Y-m-d',
                        allowBlank:false
                    },{
                        xtype: 'datefield',
                        name: 'date_stop',
                        //labelWidth: 150,
                        format: 'Y-m-d',
                        fieldLabel: 'Окончание периода',
                        value: new Date(),
                        format: 'Y-m-d',
                        allowBlank:false
                    }]
                },{
                    xtype: 'comboboxselect',
                    "multiSelect": true,
                    name : 'order_status',
                    fieldLabel: 'Статус заявки',
                    autoSelect: true,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    store: 'directory.OrderStatus',
                    allowBlank:false
                },{
                    xtype: 'radiogroup',
                    width: 210,
                    defaults: {anchor: '100%',labelWidth: 80},
                    items: [
                    {
                        boxLabel: 'предложение',
                        name: 'order_type',
                        checked:'true',
                        inputValue: 1
                    },{
                        boxLabel: 'спрос',
                        name: 'order_type',
                        inputValue: 2
                    }]
                }]
            }]
        }];
        this.buttons = [{
            view: this,
            iconCls: 'icon-search_orders_my',
        	text: 'Отправить запрос',
            handler: function() {
	            var form = this.view.down('form').getForm();
                console.log(Ext.JSON.encode(form.getValues().order_status));
	            if(form.isValid()){
	                form.submit({
                        url: '/uploading_orders/',
                        timeout : 12000,
                        headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
                        method: 'POST',
                        csrf_token: CRMRE.global.Vars.csrf_token,
                        standardSubmit: true,
                        //target : '_blank',
                        params:{
                            date_start: form.getValues().date_start,
                            date_stop: form.getValues().date_stop,
                            order_status: Ext.JSON.encode(form.getValues().order_status),
                            order_type: form.getValues().order_type
                        },
	                    success: function(fp, o) {
	                        this.up('window').close();
	                    },
	                    failure: function(fp, o) {
	                        this.up('window').close();
                            Ext.Msg.alert('Неудачная операция!');
	                    }
                    });
	            }	
        	}
        },{
            text: 'Сбросить',
            handler: function () { this.up('window').down('form').getForm().reset(); }
        },
        {
            text: 'Отмена',
            handler: function () { this.up('window').close(); }
        }];
        this.callParent(arguments);
    }
});