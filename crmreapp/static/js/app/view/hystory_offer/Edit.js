Ext.define('CRMRE.view.hystory_offer.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'appHystoryOfferEdit',
    title: 'Редактирование истории предложения',
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
                xtype: 'combobox',
                name : 'result',
                fieldLabel: 'Реакция клиента',
                itemId: 'result',
                queryMode: 'local',
                editable: false,
                forceSelection:true,
                displayField: 'name',
                valueField: 'id',
                allowBlank:false,
                store: 'directory.ResultSentence'
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