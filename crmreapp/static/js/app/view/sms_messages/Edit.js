Ext.define('CRMRE.view.sms_messages.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'appSmsMessagesEdit',
    title: 'Редактирование SMS сообщение',
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
                maxLength: 300,
                allowBlank:false,
                rows: 6
            },{
                xtype: 'combobox',
                name : 'type',
                fieldLabel: 'Тип сообщения',
                itemId: 'type',
                queryMode: 'local',
                editable: false,
                forceSelection:true,
                displayField: 'name',
                valueField: 'id',
                allowBlank:false,
                store: 'directory.MessageType'
            }]
        }];
        this.buttons = [{
            iconCls: 'icon-save',
        	text: 'Сохранить',
            action: 'save'
        },{
        	text: 'Отмена',
            action: 'cancel'
        }];
        this.callParent(arguments);
    }
});