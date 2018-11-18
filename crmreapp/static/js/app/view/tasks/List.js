Ext.define('CRMRE.view.tasks.List' ,{
	extend: 'Ext.grid.Panel',
    xtype: 'appTasksList',
    autoScroll:true,
 	header: false,
 	animate: false,
 	columnLines: true,
    plugins: [{
        ptype: 'bufferedrenderer',
        variableRowHeight: false
    },{
        ptype: 'rowexpander',
        rowBodyTpl : [
            '<p><b>Описание:</b> {description}</p>'
        ],
        pluginId: 'rowexpand',
    }],
    viewConfig: {
	    enableTextSelection: true,
        stripeRows: true,
        getRowClass: function (record, rowIndex, rowParams, store) {
            store_status = Ext.data.StoreManager.lookup('directory.TaskStatus');
            store_status.clearFilter(true);
            status_id = store_status.findRecord('name','выполнена').getId();
            if ((new Date(record.get('execution_date')) < new Date())&&(record.get('status')!=status_id)) {
                return  'red-overdue';
            }
            else {
                return '';
            }
            
        }
    },
    initComponent: function() {
    	this.store = Ext.create('CRMRE.store.Tasks');
        this.columns = [
  			{xtype:'rownumberer',width:40},
        	{
                header: 'Описание',
                flex: 1,
                dataIndex: 'description',
                renderer: function (value, meta, record) {
                    meta.tdAttr = "data-qtip='" + value + "'";
                    return value;
                }
            },{
				header: 'Создатель', 
				flex: 1,
				dataIndex : 'author_fullname',
				renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                    store = Ext.data.StoreManager.lookup('Users');
					user_rec = store.getById(record.get('author'));
					if (user_rec != null){
						author_fullname = user_rec.get('first_name')+" "+user_rec.get('last_name');
               			record.data.author_fullname = author_fullname;
                        meta.tdAttr = 'data-qtip="' + author_fullname + '"';
               			return author_fullname; 
            		}
				}
			},{
				header: 'Исполнитель',
				flex: 1,
				dataIndex : 'performer_fullname',
				renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
					store = Ext.data.StoreManager.lookup('Users');
                    user_rec = store.getById(record.get('performer'));
                    if (user_rec != null){
                        performer_fullname = user_rec.get('first_name')+" "+user_rec.get('last_name');
                        record.data.performer_fullname = performer_fullname;
                        meta.tdAttr = 'data-qtip="' + performer_fullname + '"';
                        return performer_fullname; 
                    }
                }
			},{
                header: 'Дата создания',
                dataIndex: 'create_date',
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
            },{
                header: 'Дата выполнения',
                dataIndex: 'execution_date',
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
            },{
				header: 'Клиент',
				dataIndex : 'client_name',
			},{
				header: 'Заявка на продажу',
				dataIndex : 'order_sale_index',
			},{
				header: 'Заявка на покупку',
				dataIndex : 'order_buy_index',
			},{
				header: 'Приоритет', 
				dataIndex : 'priority_name',
				renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
					store = Ext.data.StoreManager.lookup('directory.Priority');
                    priority_rec = store.getById(record.get('priority'));
                    if (priority_rec != null){
                        priority_name = priority_rec.get('name');
                        record.data.priority_name = priority_name;
                        return priority_name; 
                    }
				}
			},{
                header: 'Статус', 
                dataIndex : 'status_name',
                renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                    store = Ext.data.StoreManager.lookup('directory.TaskStatus');
                    status_rec = store.getById(record.get('status'));
                    if (status_rec != null){
                        status_name = status_rec.get('name');
                        record.data.status_name = status_name;
                        return status_name; 
                    }
                }
            },{
                xtype:'actioncolumn',
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
                        if ((typeapp == 'tasks_make') || (typeapp =='tasks_all')) {
                            action.hidden = true;
                        }
                    }
                }
       		},{
                xtype:'actioncolumn',
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
                        if ((typeapp =='tasks_make') || (typeapp =='tasks_all')) {
                            action.hidden = true;
                        }
                    }
                }
    		}
        ];
        this.dockedItems = [{
            xtype: 'toolbar',
            items: [
            '->',{
	            iconCls: 'icon-tasks_complet',
	            itemId: 'filter_status',
	            text: 'Показать ' + (true ? 'выполненные' : 'рабочие') + ' заявки',
	            action: 'filter_status',
	            handler: function (button, state) {
	                var activ_tab = Ext.getCmp('tabpanel').getActiveTab(); 
	                if (activ_tab.complet == undefined) {
	                    activ_tab.complet = true;
	                };
	                activ_tab.complet = (!activ_tab.complet);
	                text = 'Показать ' + (activ_tab.complet ? 'выполненные' : 'рабочие') + ' заявки';
	                button.setText(text);
	            }
	        }]
        },{
            xtype: 'pagingtoolbar',
            store: this.store,
            dock: 'bottom',
            displayInfo: true,
            beforePageText: 'Страница',
            afterPageText: 'из {0}',
            displayMsg: 'Задачи {0} - {1} из {2}',
        }];
        this.callParent(arguments);
    }
});