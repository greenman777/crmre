Ext.define('CRMRE.view.orders_buy.EditFilter', {
    extend: 'Ext.window.Window',
    xtype: 'appOrdersBuyEditFilter',
    title: 'Выберите поля для фильтрации',
    width:650,
    layout: 'fit',
    resizable: false,
    closeAction: 'hide',
    modal : true,
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
                    name: 'index',
                    fieldLabel: 'Номер заявки',
                    vtype: 'alphanum',
                    maxLength: 9
            },{   
                xtype: 'comboboxselect',
                "multiSelect": false,
                fieldLabel: 'Тип сделки',
                store: [[false, 'аренда'], [true, 'продажа']],
                name: 'transaction_type',
                triggerAction: 'all'
            },{
                xtype: 'comboboxselect',
                "multiSelect": false,
                fieldLabel: 'Статус',
                name: 'status',
                autoSelect: true,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                store: 'directory.OrderStatus'
            },{
                xtype: 'numberfield',
                fieldLabel: 'Заявки без действий в течении (дней)',
                labelWidth: 240,
                name: 'days_mod',
                minValue: 0,
                maxValue: 99999999,
            },{
                xtype: 'comboboxselect',
                "multiSelect": false,
                fieldLabel: 'Исполнитель',
                name: 'performer',
                autoSelect: true,
                queryMode: 'local',
                labelTpl: "{last_name} {first_name}",
                displayField: 'last_name',
                listConfig: {
                    getInnerTpl: function(){
                        return '{last_name} {first_name}';
                    }
                },
                valueField: 'id',
                store: 'Users'
            },{
                xtype: 'comboboxselect',
                "multiSelect": false,
                fieldLabel: 'Заявка от',
                name: 'author',
                autoSelect: true,
                queryMode: 'local',
                labelTpl: "{last_name} {first_name}",
                displayField: 'last_name',
                listConfig: {
                    getInnerTpl: function(){
                        return '{last_name} {first_name}';
                    }
                },
                valueField: 'id',
                store: 'Users'
            },{
                xtype:'fieldset',
                title: 'Клиент',
                collapsible: true,
                collapsed: true,
                defaultType: 'textfield',
                layout: 'anchor',
                defaults: {anchor: '100%'},
                items :[
                {
                    name: 'client_index',
                    fieldLabel: 'Номер клиента',
                    vtype: 'alphanum',
                    maxLength: 9
                },{
	                xtype: 'fieldcontainer',
	                layout: 'hbox',
	                defaultType: 'textfield',
	                defaults: {flex: 1},
	                items:[
	                {
                        name: 'client_name',
                        flex: 2.5,
                        fieldLabel: 'Имя клиента',
                        margin: '0 5 0 0',
                        maxLength: 100
                    },{
                        name: 'phone_main',
                        labelWidth: 65,
                        fieldLabel: 'Телефон',
                        vtype: 'alphanum',
                        maxLength: 11
                    }]
		        },{
	                xtype: 'fieldcontainer',
	                layout: 'hbox',
	                defaultType: 'textfield',
	                defaults: {flex: 1},
	                items:[
	                {
                        name: 'represent',
                        flex: 2.5,
                        fieldLabel: 'Имя представителя',
                        margin: '0 5 0 0',
                        maxLength: 80
                    },{
                        name: 'phone_represent',
                        labelWidth: 65,
                        fieldLabel: 'Телефон',
                        vtype: 'alphanum',
                        maxLength: 11
                    }]
		        },{
                    xtype: 'combobox',
                    name : 'info_source',
                    autoSelect: true,
                    editable: false,
                    forceSelection:true,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    fieldLabel: 'Источник информации',
                    store: 'directory.InfoSource'
                },{
                    xtype: 'checkboxfield',
                    boxLabel: 'VIP клиент',
                    name: 'vip',
                    inputValue: true,
                    uncheckedValue: false
                }]
            }]
        }];
        this.buttons = [{
            iconCls: 'icon-filter',
        	text: 'Применить',
            action: 'filter'
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