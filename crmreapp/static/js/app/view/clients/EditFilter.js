Ext.define('CRMRE.view.clients.EditFilter', {
    extend: 'Ext.window.Window',
    xtype: 'appClientsEditFilter',
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
				xtype: 'combo',
				fieldLabel: 'Тип клиента',
				store: [[true, 'физическое лицо'], [false, 'юридическое лицо']],
				name: 'client_type',
				triggerAction: 'all',
				editable: false
	        },{  
                name: 'index',
                fieldLabel: 'Номер клиента',
                vtype: 'alphanum',
                maxLength: 9
            },{ 
                fieldLabel: 'Имя представителя',
                name: 'represent',
                maxLength: 80
            },{ 
                fieldLabel: 'Телефон представителя',
                name: 'phone_represent',
                maxLength: 11,
                vtype: 'alphanum'
            },{   
                fieldLabel: 'Имя клиента',
                name: 'client_name',
                maxLength: 100
            },{
                fieldLabel: 'Телефон клиента',
                name: 'phone_main',
                maxLength: 11,
                vtype: 'alphanum'
            },{
                xtype: 'comboboxselect',
                "multiSelect": false,
                fieldLabel: 'Автор',
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