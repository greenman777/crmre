Ext.define('CRMRE.view.client_comments.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'appClientCommentsEdit',
    title: 'Редактирование действия',
    modal : true,
    width:500,
    initComponent: function() {
        this.items = [{
        	xtype: 'form',
        	frame: true,
        	defaults: {anchor: '100%',padding: '5 5 5 5'},
            items: [
            {   xtype: 'textfield',name : 'id',hidden:true},
            {   xtype: 'textfield',name : 'client',hidden:true},
            {   xtype: 'combobox',name : 'author',hidden:true},
			{   xtype: 'datefield',name : 'create_date',format: 'Y-m-d',hidden:true},
            {
                xtype: 'textareafield',
                name : 'comment',
                fieldLabel: 'Действие',
                maxLength: 300,
                allowBlank:false
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