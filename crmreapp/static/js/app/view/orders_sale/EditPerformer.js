Ext.define('CRMRE.view.orders_sale.EditPerformer', {
    extend: 'Ext.window.Window',
    xtype: 'appChangeOrdersSalePerformer',
    title: 'Выбор пользователя',
    width:400,
    modal : true,
    autoShow: true,
    initComponent: function() {
        this.items = [{
        	xtype: 'form',
        	frame: true,
            header: false,
        	defaults: {anchor: '100%',padding: '5 5 5 5'},
        	fieldDefaults: {msgTarget: 'side',labelWidth: 140},
            items: [
            {   xtype: 'combobox',
                name : 'user',
                autoSelect: true,
                displayTpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                        '{last_name} {first_name}', 
                                    '</tpl>'),
                valueField: 'id',
                fieldLabel: 'Пользователь',
                store: 'Users',
                editable: false,
                anchor: '100%',
                allowBlank:false,
                padding: '5 5 5 5',
                listConfig: {
                    getInnerTpl: function(){
                        return '{last_name} {first_name}';
                    }
                },
                listeners: {
                    select: function(combo, record, index) {
                        var info = this.up('form').down('#count_orders');
                        Ext.Ajax.request({
                            url: '/count_orders/',
                            params: {
                                user: combo.getValue()
                            },
                            success: function(response, opts) {
                                var obj = Ext.decode(response.responseText);
                                var count_orders = obj.messages['count_orders'];
                                if (count_orders == 0) {
                                    info.setValue('нет');
                                }
                                else {
                                    info.setValue(count_orders);                
                                }
                            }
                        });
                    }
                }
            },{ 
                xtype: 'textfield',
                itemId: 'count_orders',
                fieldLabel: 'Количество активных заявок'
            }]
        }];
        this.buttons = [{
            iconCls: 'icon-save',
        	text: 'Выбрать',
            action: 'select'
        },{
        	text: 'Отмена',
            action: 'cancel'
        }];
        this.callParent(arguments);
    }
});