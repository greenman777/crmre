Ext.define('CRMRE.view.tasks.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'appTasksEdit',
    title: 'Редактирование задачи',
    modal : true,
    titleHide : true,
    width:400,
    initComponent: function() {
        this.items = [{
        	xtype: 'form',
        	frame: true,
        	defaults: {anchor: '100%',padding: '5 5 5 5'},
            items: [
            {   xtype: 'combobox',name: 'id',hidden: true},
            {   xtype: 'datefield',name: 'create_date',format: 'Y-m-d H:i',hidden: true},
            {   xtype: 'combobox',name: 'author',hidden: true},
            {   xtype: 'combobox',name: 'client',hidden: true},
            {   xtype: 'combobox',name: 'order_sale',hidden: true},
            {   xtype: 'combobox',name: 'order_buy',hidden: true},
            {   xtype: 'combobox',name: 'performer',hidden: true},
            {   xtype: 'combobox',name: 'status',hidden: true},
            {
                xtype: 'textareafield',
                name: 'description',
                fieldLabel: 'Описание',
                maxLength: 200,
                allowBlank:false
            },{
                xtype: 'datefield',
                name: 'execution_date',
                fieldLabel: 'Дата выполнения',
                format: 'Y-m-d H:i',
                allowBlank:false
            },{
                xtype: 'combobox',
                name: 'priority',
                fieldLabel: 'Приоритет',
                queryMode: 'local',
                editable: false,
                forceSelection:true,
                displayField: 'name',
                valueField: 'id',
                store: 'directory.Priority',
                allowBlank:false,
                //Заполняем приоритет по умолчанию
                listeners: {
                    'afterrender': function(combo){
                        var selectedRecord = combo.getStore().findRecord('name','средний').getId();
                        if (!combo.getValue()) {
                            combo.setValue(selectedRecord);
                        }        
                    }
                }
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