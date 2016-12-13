Ext.define('CRMRE.view.sms_messages.List' ,{
    extend: 'Ext.ux.LiveSearchGridPanel',
    xtype: 'appSmsMessagesList',
    columnLines: true,
    title: '<b>SMS рассылка</b>',
    store: 'SmsMessages',
    header: false,
    columnLines: true,
    initComponent: function() {
        var sm = Ext.create('Ext.selection.CheckboxModel');
        this.selModel = sm;
        this.columns = [
  			{  xtype:'rownumberer',width:40},
			{
                header: 'Сообщение',
                dataIndex: 'name',
                flex: 4,
                renderer: function (value, meta, record) {
                    meta.tdAttr = 'data-qtip="' + value + '"';
                    return value;
                }
            },{
				header: 'Тип сообщения',
				flex: 1,
				dataIndex : 'type_name',
				renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
					store = Ext.data.StoreManager.lookup('directory.MessageType');
                    type_rec = store.getById(record.get('type'));
                    if (type_rec != null){
                        type_name = type_rec.get('name');
                        record.data.type_name = type_name;
                        return type_name; 
                    }
				}
			},{   
                xtype:'actioncolumn',
        		width:22,
        		action:'delete',
        		items: [{
        			iconCls: 'icon-delete',
        			tooltip: 'Удалить'
       			}]
       		},{
                xtype:'actioncolumn',
       			width:22,
       			action:'edit',
       			items: [{
        			iconCls: 'icon-edit',
        			tooltip: 'Редактировать'
        		}]
    		}
        ];
        
        this.callParent(arguments);
        this.getDockedItems('toolbar')[0].add(
            ['->',{
                iconCls: 'icon-message_add',
                itemId: 'add_message',
                text: 'Добавить новое сообщение',
                action: 'add_message'
            },{
                iconCls: 'icon-send_messages',
                itemId: 'send_messages',
                text: 'Выполнить SMS рассылку',
                action: 'send_messages'
            },{
                iconCls: 'icon-update',
                itemId: 'update',
                tooltip: 'Обновить',
                action: 'update'
            }]
        );
    }
});