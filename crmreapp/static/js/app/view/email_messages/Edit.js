Ext.define('CRMRE.view.email_messages.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'appEmailMessagesEdit',
    title: 'Редактирование E-mail сообщение',
    modal : true,
    width:700,
    initComponent: function() {
        this.items = [{
        	xtype: 'form',
        	frame: true,
        	defaults: {anchor: '100%',padding: '5 5 5 5'},
            items: [
            {   xtype: 'textfield',name : 'id',hidden:true},
            {  
                xtype: 'htmleditor',
                name: 'name',
                fieldLabel: 'Сообщение',
                maxLength: 1500,
                height: 350,
                allowBlank:false
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