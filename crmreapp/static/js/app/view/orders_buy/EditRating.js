Ext.define('CRMRE.view.orders_buy.EditRating', {
    extend: 'Ext.window.Window',
    xtype: 'appChangeOrdersBuyRating',
    title: 'Поставить оценку работы',
    width:500,
    modal : true,
    autoShow: true,
    initComponent: function() {
        this.items = [{
        	xtype: 'form',
        	frame: true,
            header: false,
        	defaults: {anchor: '100%',padding: '5 5 5 5'},
        	fieldDefaults: {msgTarget: 'side',labelWidth: 140},
            items: [
            {   xtype: 'textfield',
                name : 'agent_name',
                disabled: true
            },{   
                xtype: 'numberfield',
                fieldLabel: 'Оценка',
                name: 'rating',
                minValue: 1,
                maxValue: 5
            },{  
                xtype: 'textareafield',
                name: 'rating_comment',
                fieldLabel: 'Комментарий к оценке',
                maxLength: 100,
                rows: 2
            }]
        }];
        this.buttons = [{
            iconCls: 'icon-save',
        	text: 'Оценить',
            action: 'select'
        },{
        	text: 'Отмена',
            action: 'cancel'
        }];
        this.callParent(arguments);
    }
});