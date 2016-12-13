Ext.define('CRMRE.view.clients.EditAuthor', {
    extend: 'Ext.window.Window',
    xtype: 'appChangeClientAuthor',
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
                anchor: '100%',
                allowBlank:false,
                padding: '5 5 5 5',
                listConfig: {
                    getInnerTpl: function(){
                        return '{last_name} {first_name}';
                    }
                }
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