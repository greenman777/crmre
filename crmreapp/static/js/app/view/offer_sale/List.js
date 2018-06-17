Ext.define('CRMRE.view.offer_sale.List' ,{
    extend: 'Ext.grid.Panel',
    xtype: 'appOfferSaleList',
    title: '<b>Предложения</b>',
    itemId: 'OfferList',
    columnLines: true,
    plugins: [{
        ptype: 'bufferedrenderer',
        variableRowHeight: false
    }],
    viewConfig: {
    	enableTextSelection: true,
        getRowClass: function (record, rowIndex, rowParams, store) {
            if (record.get('stage')==0) {
                return  'grey-overdue';
            }
            else if (record.get('stage')==2){
                return  'blue-overdue';
            }
            else if (record.get('stage')==3){
                return  'green-overdue';
            }
            else if (record.get('stage')==4){
                return  'purple-overdue';
            }
            else {
                return '';
            }
        }
    },
    initComponent: function() {
        this.store = Ext.create('CRMRE.store.Offer');
        var sm = Ext.create('Ext.selection.CheckboxModel');
        this.selModel = sm,
        this.columns = [
      			{
                    xtype:'rownumberer',
                    width:40
                },{
                    xtype:'actioncolumn',
                    width:22,
                    action:'info',
                    items: [{
                        iconCls: 'icon-info',
                        tooltip: 'Информация о предложении'
                    }]
                },{
                    header: 'Заголовок', 
                    width: 150,
                    dataIndex: 'order_buy_heading',
                    renderer: function (value, meta, record) {
                        meta.tdAttr = 'data-qtip="' + value + '"';
                        return value;
                    }
                },{
                    header: 'Улица', 
                    filter: true,
                    width: 200,
                    dataIndex : 'street_name',
                    renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                        var store_list = Ext.data.StoreManager.lookup('ListStreet');
                        var store_dir = Ext.StoreManager.lookup('directory.Street');
                        arr = [];
                        store_list.clearFilter(true);
                        store_list.filter({ property: "orders", value: record.get('order_buy'), exactMatch: true});
                        store_list.each(function(rec) {
                            arr.push(store_dir.getById(rec.get('street')).get('name'));
                        }); 
                        store_list.clearFilter(true);
                        street_name = arr.join(", ");
                        meta.tdAttr = 'data-qtip="' + street_name + '"';
                        record.data.street_name = street_name;
                        return street_name;
                    }
                },{
                    header: 'Микрорайон', 
                    filter: true,
                    width: 200,
                    dataIndex : 'microdistrict_name',
                    renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                        var store_list = Ext.data.StoreManager.lookup('ListMicrodistrict');
                        var store_dir = Ext.StoreManager.lookup('directory.Microdistrict');
                        arr = [];
                        store_list.clearFilter(true);
                        store_list.filter({ property: "orders", value: record.get('order_buy'), exactMatch: true});
                        store_list.each(function(rec) {
                            arr.push(store_dir.getById(rec.get('microdistrict')).get('name'));
                        }); 
                        store_list.clearFilter(true);
                        microdistrict_name = arr.join(", ");
                        meta.tdAttr = 'data-qtip="' + microdistrict_name + '"';
                        record.data.microdistrict_name = microdistrict_name;
                        return microdistrict_name;
                    }
                },{
                    header: 'Город', 
                    filter: true,
                    width: 200,
                    dataIndex : 'city_name',
                    renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                        var store_list = Ext.data.StoreManager.lookup('ListCity');
                        var store_dir = Ext.StoreManager.lookup('directory.City');
                        arr = [];
                        store_list.clearFilter(true);
                        store_list.filter({ property: "orders", value: record.get('order_buy'), exactMatch: true});
                        store_list.each(function(rec) {
                            arr.push(store_dir.getById(rec.get('city')).get('name'));
                        }); 
                        store_list.clearFilter(true);
                        city_name = arr.join(", ");
                        meta.tdAttr = 'data-qtip="' + city_name + '"';
                        record.data.city_name = city_name;
                        return city_name;
                    }
                },{
                    header: 'Площадь',
                    width:140,
                    dataIndex: 'order_buy_space',
                    renderer: function (value, meta, record) {
                        meta.tdAttr = 'data-qtip="' + value + '"';
                        return value;
                    }
                },{
                    header: 'Цена',
                    width:140,
                    dataIndex: 'order_buy_price',
                    renderer: function (value, meta, record) {
                        meta.tdAttr = 'data-qtip="' + value + '"';
                        return value;
                    }
                },{
                    header: 'Тип объекта', 
                    width: 160,
                    dataIndex : 'object_type_name',
                    renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                        var store_list = Ext.data.StoreManager.lookup('ListObjectType');
                        var store_dir = Ext.StoreManager.lookup('directory.ObjectType');
                        arr = [];
                        store_list.clearFilter(true);
                        store_list.filter({ property: "orders", value: record.get('order_buy'), exactMatch: true});
                        store_list.each(function(rec) {
                            arr.push(store_dir.getById(rec.get('object_type')).get('name'));
                        }); 
                        store_list.clearFilter(true);
                        object_type_name = arr.join(", ");
                        meta.tdAttr = 'data-qtip="' + object_type_name + '"';
                        record.data.object_type_name = object_type_name;
                        return object_type_name;
                    }
                },{
                    header: 'Исполнитель', 
                    width: 100,
                    dataIndex : 'order_buy_performer_name',
                    renderer: function (value, meta, record) {
                        meta.tdAttr = 'data-qtip="' + value + '"';
                        return value;
                    }
                },{
                    header: 'Тел. исп-ля',
                    width: 80,
                    dataIndex : 'order_buy_performer_phone',
                    renderer: function (value, meta, record) {
                        meta.tdAttr = 'data-qtip="' + value + '"';
                        return value;
                    }
                },{
                    header: 'Клиент',
                    width: 100,
                    dataIndex : 'order_buy_client_name',
                    renderer: function (value, meta, record) {
                        meta.tdAttr = 'data-qtip="' + value + '"';
                        return value;
                    }
                },{
                    text:'Извещ.',
                    xtype:'booleancolumn',
                    dataIndex:'informed',
                    trueText:'Да',
                    falseText:'Нет',
                    width: 50,
                    renderer: function(value,meta) {
                        var fontweight = value ? 'bold' : 'normal';
                        value=value? 'Да' : 'Нет';
                        meta.style='font-weight:'+fontweight;
                        return value;
                    }
                },{
                    header: 'Дата создания', 
                    width: 85,
                    dataIndex: 'order_buy_create_date',
                    renderer: function (value, meta, record) {
                        meta.tdAttr = 'data-qtip="' + value + '"';
                        return value;
                    }
                },{
                    header: 'Номер',
                    width: 70,
                    dataIndex: 'order_buy_index',
                    renderer: function (value, meta, record) {
                        meta.tdAttr = 'data-qtip="' + value + '"';
                        return value;
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
                            var typeapp = Ext.getCmp('tabpanel').getActiveTab().typeapp; 
                            if ((typeapp.indexOf('_credit') >= 0)||(typeapp.indexOf('_support') >= 0)||(typeapp.indexOf('_complet') >= 0)||(typeapp.indexOf('_activ') >= 0)||(typeapp.indexOf('_brigadier') >= 0)) {
                                action.hidden = true;
                            }
                        }
                    }
                }
            ];
        this.dockedItems = [{
            xtype: 'toolbar',
            items: [
            '->',
            {
                iconCls: 'icon-documents',
                itemId: 'documents',
                text: 'Док-ты к сделке',
                action: 'documents'
            },{
                iconCls: 'icon-open_report',
                itemId: 'report',
                text: 'Открыть',
                action: 'report'
            },{
                iconCls: 'icon-email_send',
                itemId: 'send',
                text: 'Отправить/сохранить',
                action: 'send'
            },{
                iconCls: 'icon-search_orders_my',
                itemId: 'search_my',
                text: 'Найти мои новые',
                action: 'search_my'
            },{
                iconCls: 'icon-search_orders',
                itemId: 'search',
                text: 'Найти все новые',
                action: 'search'
            }]
        }];
        this.callParent(arguments);
    }
});