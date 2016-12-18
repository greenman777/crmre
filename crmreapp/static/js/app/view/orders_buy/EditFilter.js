Ext.define('CRMRE.view.orders_buy.EditFilter', {
    extend: 'Ext.window.Window',
    xtype: 'appOrdersBuyEditFilter',
    title: 'Выберите поля для фильтрации',
    width:400,
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
                name: 'client_index',
                fieldLabel: 'Номер клиента',
                vtype: 'alphanum',
                maxLength: 9
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