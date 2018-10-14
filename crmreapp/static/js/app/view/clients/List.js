Ext.define('CRMRE.view.clients.List' ,{
    extend: 'Ext.grid.Panel',
    xtype: 'appClientsList',
    autoScroll:true,
    animate: false,
    itemId: 'Clients',
 	columnLines: true,
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
    	this.store = Ext.create('CRMRE.store.Clients');
        this.columns = [
      			{  
      				xtype:'rownumberer',
      			    width:40
      			},{
      				xtype:'actioncolumn',
           			width:22,
           			action:'edit',
           			items: [{
            			iconCls: 'icon-edit',
            			tooltip: 'Редактировать'
            		}]
        		},{
                    header: 'Номер', 
                    flex: 1,
                    dataIndex: 'index'
                },{
                    header: 'Клиент',
                    flex: 1,
                    dataIndex: 'represent',
                    renderer: function (value, meta, record) {
                        meta.tdAttr = 'data-qtip="' + value + '"';
                        return value;
                    }
                },{
                    header: 'Телефон 1',
                    flex: 1,
                    dataIndex: 'phone_represent'
                },{
                    header: 'Телефон 2',
                    flex: 1,
                    dataIndex: 'phone_main'
                },{
					header: 'Собственник',
                    itemId: 'client_name',
					flex: 1,
					dataIndex: 'client_name',
                    renderer: function (value, meta, record) {
                        meta.tdAttr = 'data-qtip="' + value + '"';
                        return value;
                    },
                    listeners: {
	                    scope:this,
	                    'afterrender': function(column){
	                        var typeapp = this.up('appClients').typeapp; 
	                        if (typeapp == 'legalentity_all'){
	                            column.setText('Наименование ю/л');
	                        }
	                    }
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
                    header: 'Дата создания', 
                    flex: 1, 
                    dataIndex: 'create_date',
                    renderer: Ext.util.Format.dateRenderer('Y-m-d')
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
            {
                iconCls: 'icon-filter_add',
                itemId: 'filter_add',
                tooltip: 'Отфильтровать данные',
                action: 'filter_add'
            },{
                iconCls: 'icon-filter_delete',
                itemId: 'filter_delete',
                tooltip: 'Сбросить фильтр',
                action: 'filter_delete'
            },'->',{
	            iconCls: 'icon-info_client',
	            itemId: 'info_client',
                tooltip: 'Информация по клиенту',
	            text: 'Информация о заявках',
	            action: 'info_client'
	        },{
	            iconCls: 'icon-order_buy_add',
	            itemId: 'add_order_buy',
                tooltip: 'Новый спрос',
	            text: 'Новый спрос',
	            action: 'add_order_buy'
	        },{
	            iconCls: 'icon-order_sale_add',
	            itemId: 'add_order_sale',
                tooltip: 'Новое предложение',
	            text: 'Новое предложение',
	            action: 'add_order_sale'
	        },'-',{
	            iconCls: 'icon-user_change',
	            itemId: 'change_author',
                tooltip: 'Сменить создателя',
	            text: 'Сменить создателя',
	            action: 'change_author'
	        },{
                iconCls: 'icon-client_make',
                itemId: 'make_client',
                tooltip: 'Сделать клиентом',
                text: 'Сделать клиентом',
                action: 'make_client'
            },{
                iconCls: 'icon-client_add',
                itemId: 'add',
                tooltip: 'Создать клиента',
                text: 'Создать клиента',
                action: 'add'
            }],
        },{
            xtype: 'pagingtoolbar',
            store: this.store,
            dock: 'bottom',
            displayInfo: true,
            beforePageText: 'Страница',
            afterPageText: 'из {0}',
            displayMsg: 'Клиенты {0} - {1} из {2}',
        }];
        this.callParent(arguments);
    }
});