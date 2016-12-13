Ext.define('CRMRE.view.hystory_service.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'appHystoryServiceEdit',
    title: 'Редактирование операции',
    modal : true,
    width:400,
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            frame: true,
            defaults: {anchor: '100%',padding: '5 5 5 5'},
            items: [
            {   xtype: 'combobox',name : 'id',hidden:true},
            {   xtype: 'combobox',name : 'offer',hidden:true},
            {   
                xtype: 'datefield',
                fieldLabel: 'Дата операции',
                name : 'date',
                format: 'Y-m-d',
                allowBlank:false
            },{
                xtype: 'combobox',
                name : 'operation',
                fieldLabel: 'Тип операции',
                itemId: 'operation',
                queryMode: 'local',
                editable: false,
                forceSelection:true,
                displayField: 'name',
                valueField: 'id',
                allowBlank:false,
                store: 'directory.OperationType'
            },{
                xtype: 'combobox',
                name : 'result_operation',
                displayField: 'name',
                valueField: 'id',
                fieldLabel: 'Результат операции',
                autoSelect: true,
                editable: false,
                forceSelection:true,
                queryMode: 'local',
                store: 'directory.ResultOperation',
                allowBlank:false,
                //Заполняем результат по умолчанию
                listeners: {
                    'afterrender': function(combo){
                    	if (!combo.getValue()){
							var selectedRecord = combo.getStore().findRecord('name','в работе').getId();
                        	combo.setValue(selectedRecord);                    		
                    	}
                    }
                }
            },{
                xtype: 'textareafield',
                name : 'comment',
                fieldLabel: 'Комментарий',
                maxLength: 100
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