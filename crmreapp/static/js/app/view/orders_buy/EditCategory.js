Ext.define('CRMRE.view.orders_buy.EditCategory', {
    extend: 'Ext.window.Window',
    xtype: 'appOrdersBuyEditCategory',
    title: 'Выбор категории объекта',
    width:400,
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
            {   xtype: 'combobox',name : 'client',hidden:true},
        	{
    			xtype: 'combobox',
    			name : 'object_category',
    			autoSelect: true,
    			displayField: 'name',
    			valueField: 'id',
    			fieldLabel: 'Тип объекта недвижимости',
    			store: 'directory.ObjectCategory',
                allowBlank:false,
                listeners: {
                    'expand': function(combo){
                        store = combo.getStore();
                        store.clearFilter(true);
                        console.log("Фильтр!");
                        store.filter(([{filterFn: function(item) { return item.get("id") != 5; }}]));
                    }
                }
    		}]
        }];
        this.buttons = [{
            iconCls: 'icon-save',
        	text: 'Выбрать',
            action: 'select'
        },{
        	text: 'Отмена',
            action: 'cancel'
        }];
        this.callParent(arguments);
    }
});