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
                name : 'object_category',
                fieldLabel: 'Категория объекта',
                autoSelect: true,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                itemId: 'filter_object_category',
                store: 'directory.ObjectCategory'
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
                "multiSelect": true,
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
                xtype: 'fieldcontainer',
                layout: 'hbox',
                defaultType: 'textfield',
                defaults: {flex: 1},
                items:[{
                    xtype: 'datefield',
                    fieldLabel: 'Сделки за период от',
                    flex: 1.3,
                    name: 'datereg_from',
                    format: 'Y-m-d',
                    margin: '0 5 0 0',
                },{
                    xtype: 'datefield',
                    fieldLabel: 'до',
                    labelWidth: 20,
                    name: 'datereg_to',
                    format: 'Y-m-d',
                    margin: '0 5 0 0',
                }]
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
                    xtype: 'comboboxselect',
                    "multiSelect": true,
                    name : 'info_source',
                    autoSelect: true,
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
            },{
                xtype: 'fieldcontainer',
                layout: 'hbox',
                defaultType: 'textfield',
                defaults: {flex: 1},
                items:[{
                    xtype: 'numberfield',
                    fieldLabel: 'С даты создания заявки (дней)',
                    labelWidth: 240,
                    flex: 1.3,
                    name: 'create_date_from',
                    margin: '0 5 0 0',
                    minValue: 0,
                    maxValue: 999,
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'до',
                    name: 'create_date_to',
                    margin: '0 5 0 0',
                    labelWidth: 20,
                    minValue: 0,
                    maxValue: 999,
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