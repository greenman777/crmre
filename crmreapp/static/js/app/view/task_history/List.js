Ext.define('CRMRE.view.task_history.List' ,{
    extend: 'Ext.ux.LiveSearchGridPanel',
    xtype: 'appTaskHistoryList',
    columnLines: true,
    title: '<b>История задачи</b>',
    initComponent: function() {
        this.store = Ext.create('CRMRE.store.TaskHistory');
        this.columns = [
  			{  xtype:'rownumberer',width:40},
			{
				header: 'Корректор', 
				flex: 1,
				renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                    store = Ext.data.StoreManager.lookup('Users');
                    user_rec = store.getById(record.get('corrector'));
                    if (user_rec != null){
                        corrector_fullname = user_rec.get('first_name')+" "+user_rec.get('last_name');
                        meta.tdAttr = 'data-qtip="' + corrector_fullname + '"';
                        return corrector_fullname; 
                    }
                }
			},{
                header: 'Комментарий',
                dataIndex: 'comment',
                flex: 3,
                renderer: function (value, meta, record) {
                    meta.tdAttr = "data-qtip='" + value + "'";
                    return value;
                }
            },{
                header: 'Дата создания', 
                dataIndex: 'create_date',
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
            },{
				header: 'Статус задачи', 
				renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                    store = Ext.data.StoreManager.lookup('directory.TaskStatus');
                    status_rec = store.getById(record.get('status'));
                    if (status_rec != null){
                        status_name = status_rec.get('name');
                        return status_name; 
                    }
                }
			},
			{xtype:'actioncolumn',
        		width:22,
        		action:'delete',
        		items: [{
        			iconCls: 'icon-delete',
        			tooltip: 'Удалить'
       			}],
                listeners: {
                    scope:this,
                    'afterrender': function(action){
                        var typeapp = this.up('appTasks').typeapp; 
                        if (typeapp =='tasks_all') {
                            action.hidden = true;
                        }
                    }
                }
       		},
       		{xtype:'actioncolumn',
       			width:22,
       			action:'edit',
       			items: [{
        			iconCls: 'icon-edit',
        			tooltip: 'Редактировать'
        		}],
                listeners: {
                    scope:this,
                    'afterrender': function(action){
                        var typeapp = this.up('appTasks').typeapp; 
                        if (typeapp =='tasks_all') {
                            action.hidden = true;
                        }
                    }
                }
    		}
        ];

        this.callParent(arguments);
        
        this.getDockedItems('toolbar')[0].add(
        ['->',{
            iconCls: 'icon-task_history_add',
            itemId: 'add',
            text: 'Добавить запись',
            action: 'add',
            listeners: {
                scope:this,
                'afterrender': function(action){
                    var typeapp = this.up('appTasks').typeapp; 
                    if (typeapp =='tasks_all') {
                        action.hidden = true;
                    }
                }
            }
        }]);
    }
});