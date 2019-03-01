Ext.define('CRMRE.view.buildings.PlanList' ,{
    extend: 'Ext.grid.Panel',
    xtype: 'appPlanList',
    autoScroll:true,
    animate: false,
 	columnLines: true,
 	store: "Plan",
	plugins: [{
        ptype: 'bufferedrenderer',
	    variableRowHeight: false
    }],
    loadMask: true,
    viewConfig: {
    	enableTextSelection: true,
        stripeRows: true,
    },
    initComponent: function() {
        this.columns = [
      			{  
      				xtype:'rownumberer',
      			    width:30
      			},{
      				xtype:'actioncolumn',
           			width:22,
           			action:'edit',
           			items: [{
            			iconCls: 'icon-edit',
            			tooltip: 'Редактировать'
            		}]
        		},{
                    header: 'Кол-во комнат', 
                    flex: 1,
                    dataIndex: 'number_rooms'
                },{
                    header: 'Площадь', 
                    flex: 1,
                    dataIndex: 'space'
                },{
                    header: 'Этаж', 
                    flex: 1,
                    dataIndex: 'floor'
                },{
                    header: 'Подъезд', 
                    flex: 1,
                    dataIndex: 'entrance'
                },{
                    header: 'Цена за кв.м. (руб)',
                    flex: 1,
                    dataIndex: 'price'
                },{
                    header: 'Цена квартиры (руб)',
                    flex: 1,
                    dataIndex: 'price_full'
                },{
                    header: '3D тур', 
                    flex: 1,
                    dataIndex: 'tour3d'
                },{
                    header: 'АВ,%',
                    flex: 1,
                    dataIndex: 'commission'
                },{
					header: 'Дата модификации',
					width: 85,
					stateId: 'column_plan_modification_date',
					dataIndex: 'modification_date',
					renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
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
                iconCls: 'icon-plan_add',
                itemId: 'add',
                tooltip: 'Новая планировка',
                text: 'Новая планировка',
                action: 'add'
            },{
                iconCls: 'icon-order_sale_add',
                itemId: 'order_sale_add',
                tooltip: 'Сформировать заявку',
                text: 'Сформировать заявку',
                action: 'order_sale_add'
            },{
	            iconCls: 'icon-update',
	            itemId: 'update',
	            tooltip: 'Обновить',
	            action: 'update'
        	}]
        }];
        this.callParent(arguments);
    }
});