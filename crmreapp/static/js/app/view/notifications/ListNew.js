Ext.define('CRMRE.view.notifications.ListNew' ,{
    extend: 'Ext.grid.Panel',
    xtype: 'appNotificationsListNew',
    columnLines: true,
    hideHeaders : true,
    id:'notifications_new',
    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl : [
            '<p><b>Сообщение:</b> {message}</p>'
        ],
        pluginId: 'rowexpand',
    }],
    title: 'Новые сообщения',
	viewConfig: {
		loadMask: false,
	},
    initComponent: function() {
    	//this.store = Ext.data.StoreManager.lookup('Notifications');
    	this.store = Ext.create('CRMRE.store.Notifications');
    	this.store.filter([{ property: 'read', value: false, exactMatch: true},
        				   { filterFn: function(item) {return item.get("sender")!=CRMRE.global.Vars.user_id;} }]);
        this.columns = [
				{
	                header: 'Сообщение', 
	                dataIndex: 'message',
	                flex: 1,
	                renderer: renderMessage
	            }
            ];
        this.callParent(arguments);
        function renderMessage(value, p, record) {
	        return Ext.String.format(
	            '<b>{0}</b>',
	            value
	        );
    	}
    }
});