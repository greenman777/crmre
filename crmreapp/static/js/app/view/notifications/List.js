Ext.define('CRMRE.view.notifications.List' ,{
    extend: 'Ext.grid.Panel',
    xtype: 'appNotificationsList',
    columnLines: true,
    viewConfig: {
        getRowClass: function (record, rowIndex, rowParams, store) {
            if (! record.get('read') && record.get('sender')!=CRMRE.global.Vars.user_id) {
            	if (record.get('sender')==null) {
                    return  'blue-overdue';
                }
                else {
               	   return  'red-overdue';
                }
            }
			else {
                return '';
            }
        },
        listeners: {
        	/*
            render: function(gridview) {
            	var grid = Ext.getCmp('tabpanel').getActiveTab().down('grid');
            	var store = grid.getStore();
            	store.on('load', function() {	
					var expander = grid.getPlugin('rowexpand');
					store.each(function(record) {  
						if (record.get('read')==false){
							//expander.toggleRow(store.indexOf(record),record);	
						}
					});
				});
            },*/
            viewready: function(grid) {
                grid.focus();
                new Ext.util.DelayedTask(function(){
					grid.getSelectionModel().select(0);
					console.log(grid.getSelectionModel());
				}).delay(500);
            }
        }
    },
    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl : [
            '<p><b>Сообщение:</b> {message}</p>'
        ],
        pluginId: 'rowexpand',
    }],
    header: false,
    store: 'Notifications',

    initComponent: function() {
    	var sm = Ext.create('Ext.selection.CheckboxModel');
        this.selModel = sm,
        this.columns = [
      			{   xtype:'rownumberer',width:40},
				{
					header: 'Отправитель',
					flex: 2,
					dataIndex : 'sender_name',
					renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
						store = Ext.data.StoreManager.lookup('Users');
                        sender_rec = store.getById(record.get('sender'));
                        if (sender_rec != null){
                            sender_name = sender_rec.get('first_name')+" "+sender_rec.get('last_name');
                            record.data.sender_name = sender_name;
	                        meta.tdAttr = 'data-qtip="' + sender_name + '"';
	                    }
	                    else {
	                    	sender_name = "Система";	
	                    }
	                    return sender_name;
   					}
				},{
					header: 'Получатель',
					flex: 2,
					dataIndex : 'user_name',
					renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
						store = Ext.data.StoreManager.lookup('Users');
                        user_rec = store.getById(record.get('user'));
                        if (user_rec != null){
                            user_name = user_rec.get('first_name')+" "+user_rec.get('last_name');
                            record.data.user_name = user_name;
	                        meta.tdAttr = 'data-qtip="' + user_name + '"';
	                    }
	                    else {
	                    	user_name = "Система";	
	                    }
	                    return user_name;
   					}
				},{
                    header: 'Дата отправки', 
                    flex: 1,
                    dataIndex: 'date',
					renderer: Ext.util.Format.dateRenderer('Y-m-d')
                },{
	                header: 'Сообщение', 
	                dataIndex: 'message',
	                flex: 5,
	                renderer: renderMessage
	            },{
		            header: 'Прочитано',
		            xtype: 'booleancolumn',
		            dataIndex: 'read',
		            trueText:'Да',
		            falseText:'Нет',
		            flex: 1,
		            renderer: function(value,meta,o) {
		                var fontweight = value ? 'normal' : 'bold';
		                value=value? 'Да' : 'Нет';
		                meta.style='font-weight:'+fontweight;
		                return value;
		            }
		        },{
		        	xtype:'actioncolumn',
            		width:22,
            		action:'delete',
            		items: [{
            			iconCls: 'icon-delete',
            			tooltip: 'Удалить'
           			}]
           		}
            ];
        this.dockedItems = [{
            xtype: 'toolbar',
            items: [
            '->',{
	            iconCls: 'icon-email_send',
	            itemId: 'create_message',
	            tooltip: 'Создать сообщение',
	            text: 'Создать сообщение',
	            action: 'create_message'
            },{
	            iconCls: 'icon-delete',
	            itemId: 'del_select_message',
	            tooltip: 'Удалить выбранные сообщения',
	            text: 'Удалить выбранные сообщения',
	            action: 'del_select_message'
            },{
	            iconCls: 'icon-update',
	            itemId: 'update',
	            tooltip: 'Обновить',
	            action: 'update'
            }]
        }];
        this.callParent(arguments);
        function renderMessage(value, p, record) {
	        return Ext.String.format(
	            '{0}',
	            value
	        );
    	}
    }
});