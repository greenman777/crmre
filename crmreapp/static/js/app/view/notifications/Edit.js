Ext.define('CRMRE.view.notifications.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'appNotificationsEdit',
    title: 'Редактирование сообщения',
    modal : true,
    width:600,
    initComponent: function() {
        this.items = [{
        	xtype: 'form',
        	frame: true,
        	defaults: {anchor: '100%',padding: '5 5 5 5'},
            items: [
            {   xtype: 'textfield',name : 'id',hidden:true},
            {  
                xtype: 'textareafield',
                name: 'name',
                fieldLabel: 'Сообщение',
                maxLength: 150,
                allowBlank:false,
                rows: 6
            },{
                xtype: 'comboboxselect',
                fieldLabel: 'Получатели',
                name: 'recipients',
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
            	xtype: 'checkbox',
                boxLabel: 'Отправить SMS',
                name: 'sendsms',
                checked:false,
                inputValue: 'true',
                uncheckedValue: 'false'
            }]
        }];
        this.buttons = [{
            iconCls: 'icon-email_send',
        	text: 'Отправить',
            action: 'send'
        },{
        	text: 'Отмена',
            action: 'cancel',
            handler: function () { this.up('.window').close(); }
        }];
        this.callParent(arguments);
    }
});