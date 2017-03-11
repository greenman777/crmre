Ext.define('CRMRE.view.hystory_service.List' ,{
    extend: 'Ext.grid.Panel',
    xtype: 'appHystoryServiceList',
    title: '<b>3. История операций по сделке</b>',
 	store: 'HystoryService',
    initComponent: function() {
        this.columns = [
      			{xtype:'rownumberer',width:40},
            	{
	                header: 'Дата',
	                width:70,
	                dataIndex: 'date',
					renderer: Ext.util.Format.dateRenderer('Y-m-d')
	            },{
					header: 'Тип операции',
					flex: 1,
					dataIndex : 'operation_name',
					renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
						store = Ext.data.StoreManager.lookup('directory.OperationType');
	                    operation_rec = store.getById(record.get('operation'));
	                    if (operation_rec != null){
	                        operation_name = operation_rec.get('heading');
	                        record.data.operation_name = operation_name;
	                        return operation_name; 
	                    }
					}
				},{
	                header: 'Комментарий',
	                flex: 1,
	                dataIndex: 'comment',
	                renderer: function (value, meta, record) {
	                    meta.tdAttr = "data-qtip='" + value + "'";
	                    return value;
	                }
            	},{
                    text:'Результат',
                    flex: 1,
                    dataIndex:'result_operation_name',
                    renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                        store = Ext.data.StoreManager.lookup('directory.ResultOperation');
                        result_operation_rec = store.getById(record.get('result_operation'));
                        if (result_operation_rec != null){
                            result_operation_name = result_operation_rec.get('heading');
                            record.data.result_operation_name = result_operation_name;
                            meta.tdAttr = "data-qtip='" + result_operation_name + "'";
                            return result_operation_name; 
                        }
                    }
                },{
	            	xtype:'actioncolumn',
            		width:22,
            		action:'delete',
            		itemId:'delete',
            		items: [{
            			iconCls: 'icon-delete',
            			tooltip: 'Удалить'
           			}],
           			listeners: {
                    scope:this,
	                    'afterrender': function(action){
	                        var typeapp = Ext.getCmp('tabpanel').getActiveTab().typeapp; 
	                        if ((typeapp.indexOf('_credit') >= 0)||(typeapp.indexOf('_support') >= 0)||(typeapp.indexOf('_complet') >= 0)||(typeapp.indexOf('_activ') >= 0)||(typeapp.indexOf('_brigadier') >= 0)) {
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
	                        var typeapp = Ext.getCmp('tabpanel').getActiveTab().typeapp; 
	                        if ((typeapp.indexOf('_credit') >= 0)||(typeapp.indexOf('_support') >= 0)||(typeapp.indexOf('_completed') >= 0)||(typeapp.indexOf('_activ') >= 0)||(typeapp.indexOf('_brigadier') >= 0)) {
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
                iconCls: 'icon-service',
                itemId: 'add',
                text: 'Новая операция',
                action: 'add'
            }]
        }]; 
        this.callParent(arguments);
    }
});