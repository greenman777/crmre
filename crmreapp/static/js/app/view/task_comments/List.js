Ext.define('CRMRE.view.task_comments.List' ,{
    extend: 'Ext.grid.Panel',
    xtype: 'appTaskCommentsList',
    columnLines: true,
    title: '<b>Комментарии</b>',
    initComponent: function() {
        this.store = Ext.create('CRMRE.store.TaskComments');
        this.columns = [
  			{  xtype:'rownumberer',width:40},
			{
				header: 'Автор', 
				flex: 1,
				renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                    store = Ext.data.StoreManager.lookup('Users');
                    user_rec = store.getById(record.get('author'));
                    if (user_rec != null){
                        author_fullname = user_rec.get('first_name')+" "+user_rec.get('last_name');
                        meta.tdAttr = 'data-qtip="' + author_fullname + '"';
                        return author_fullname; 
                    }
                }
			},{
                header: 'Комментарий',
                dataIndex: 'comment',
                flex: 3,
                renderer: function (value, meta, record) {
                    meta.tdAttr = 'data-qtip="' + value + '"';
                    return value;
                }
            },{
                header: 'Дата создания', 
                dataIndex: 'create_date',
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
            },{xtype:'actioncolumn',
        		width:22,
        		action:'delete',
        		items: [{
        			iconCls: 'icon-delete',
        			tooltip: 'Удалить'
       			}]
       		},
       		{xtype:'actioncolumn',
       			width:22,
       			action:'edit',
       			items: [{
        			iconCls: 'icon-edit',
        			tooltip: 'Редактировать'
        		}]
    		}
        ];
        
        this.dockedItems = [{
            xtype: 'toolbar',
            items: 
            ['->',{
	            iconCls: 'icon-comments_add',
	            itemId: 'add',
	            text: 'Добавить комментарий',
	            action: 'add'
            }]
        }];
        
        this.callParent(arguments);
    }
});