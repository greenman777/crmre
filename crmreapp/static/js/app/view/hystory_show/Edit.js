Ext.define('CRMRE.view.hystory_show.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'appHystoryShowEdit',
    title: 'Запланированный просмотр',
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
                fieldLabel: 'Дата',
                name : 'date',
                format: 'Y-m-d',
                allowBlank:false
            },{
                xtype: 'textfield',
                name : 'number_act',
                fieldLabel: 'Номер акта',
                maxLength: 20
            },{
                xtype: 'comboboxselect',
                "multiSelect": false,
                name : 'result',
                fieldLabel: 'Реакция клиента',
                itemId: 'result',
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                store: 'directory.ResultShow',
                allowBlank:false
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