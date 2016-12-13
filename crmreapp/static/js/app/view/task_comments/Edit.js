Ext.define('CRMRE.view.task_comments.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'appTaskCommentsEdit',
    title: 'Редактирование комментария',
    modal : true,
    width:400,
    initComponent: function() {
        this.items = [{
        	xtype: 'form',
        	frame: true,
        	defaults: {anchor: '100%',padding: '5 5 5 5'},
            items: [
            {   xtype: 'combobox',name : 'id',hidden:true},
            {   xtype: 'combobox',name : 'task',hidden:true},
            {   xtype: 'combobox',name : 'author',hidden:true},
			{   xtype: 'datefield',name : 'create_date',format: 'Y-m-d',hidden:true},
            {
                xtype: 'textareafield',
                name : 'comment',
                fieldLabel: 'Комментарий',
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