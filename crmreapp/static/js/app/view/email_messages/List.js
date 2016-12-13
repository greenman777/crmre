Ext.define('CRMRE.view.email_messages.List' ,{
    extend: 'Ext.ux.LiveSearchGridPanel',
    xtype: 'appEmailMessagesList',
    columnLines: true,
    title: '<b>E-mail рассылка</b>',
    store: 'EmailMessages',
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
                flex: 4
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
                text: 'Выполнить E-mail рассылку',
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