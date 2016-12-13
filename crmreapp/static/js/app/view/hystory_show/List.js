Ext.define('CRMRE.view.hystory_show.List' ,{
    extend: 'Ext.grid.Panel',
    xtype: 'appHystoryShowList',
    title: '<b>2. История просмотров</b>',
 	store: 'HystoryShow',
    initComponent: function() {
        this.columns = [
      			{xtype:'rownumberer',width:40},
            	{
	                header: 'Дата',
	                width:70,
	                dataIndex: 'date',
					renderer: Ext.util.Format.dateRenderer('Y-m-d')
	            },{
                    header: 'Номер акта',
                    flex: 1,
                    dataIndex: 'number_act',
                    renderer: function (value, meta, record) {
                        meta.tdAttr = "data-qtip='" + value + "'";
                        return value;
                    }
                },{
					header: 'Результат',
					flex: 1,
					dataIndex : 'result_name',
					renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
						store = Ext.data.StoreManager.lookup('directory.ResultShow');
	                    result_rec = store.getById(record.get('result'));
	                    if (result_rec != null){
	                        result_name = result_rec.get('name');
	                        record.data.result_name = result_name;
	                        return result_name; 
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
	            	xtype:'actioncolumn',
            		width:22,
            		action:'delete',
                    itemId: 'delete',
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
                    itemId: 'edit',
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
                iconCls: 'icon-show',
                itemId: 'add',
                text: 'Новый просмотр',
                action: 'add'
            }]
        }]; 
        this.callParent(arguments);
    }
});