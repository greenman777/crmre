Ext.define('CRMRE.view.orders_buy.List' ,{
    extend: 'Ext.grid.Panel',
    xtype: 'appOrdersBuyList',
    title: 'Заявки на покупку',
 	header: false,
    autoScroll:true,
    animate: false,
 	columnLines: true,
 	stateful: true,
    stateId: 'state_orders_buy',
    stateEvents: ['columnresize', 'columnmove', 'show', 'hide'],
    plugins: [{
        ptype: 'bufferedrenderer',
        variableRowHeight: false
    }],
    loadMask: true,
	viewConfig: {
		enableTextSelection: true,
        stripeRows: true,
        getRowClass: function (record, rowIndex, rowParams, store) {
            var store_status = Ext.data.StoreManager.lookup('directory.OrderStatus');
            store_status.clearFilter(true);
            var status_block = store_status.findRecord('name','выход на сделку').getId();
            var status_complet = store_status.findRecord('name','сделка завершена').getId();
            if (record.get('status')==status_block) {
                return  'green-overdue';
            }
            else if (record.get('status')==status_complet){
                return  'purple-overdue';
            }
            else {
                return '';
            }
        }
    },
    initComponent: function() {
    	this.store = Ext.create('CRMRE.store.OrdersBuy');
        this.columns = [
  			{	
                xtype:'rownumberer',
                stateId:  'column_orders_buy_rownumberer',
                width:30
            },{
                xtype:'actioncolumn',
                width:22,
                action:'client_info',
                stateId:  'column_orders_buy_client_info',
                items: [{
                    iconCls: 'icon-client_info',
                    tooltip: 'Информация о клиенте'
                }],
                listeners: {
                    scope:this,
                    'afterrender': function(action){
                        // var typeapp = Ext.getCmp('tabpanel').getActiveTab().typeapp;
                        // if ((typeapp.indexOf('_activ') >= 0)||(typeapp.indexOf('_brigadier') >= 0)||(typeapp.indexOf('_complet') >= 0)) {
                        //     action.hidden = true;
                        // }
                    }
                }
            },{
                xtype:'actioncolumn',
                width:22,
                action:'edit',
                stateId:  'column_orders_buy_edit',
                items: [{
                    iconCls: 'icon-edit',
                    tooltip: 'Редактировать заявку'
                }]
            },{
                header: 'Номер', 
                width: 70,
                dataIndex: 'index',
                stateId:  'column_orders_buy_index',
            },{	
                header: 'Заголовок',
                width: 150,
                dataIndex: 'heading',
                stateId:  'column_orders_buy_heading',
                renderer: function (value, meta, record) {
                    meta.tdAttr = 'data-qtip="' + value + '"';
                    return value;
                }
            },{
                header: 'Улица', 
                width: 200,
                dataIndex : 'street_name',
                stateId:  'column_orders_buy_street_name',
                renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                    
                    var store_list = Ext.data.StoreManager.lookup('ListStreet');
                    var store_dir = Ext.StoreManager.lookup('directory.Street');
                    arr = [];
                    store_list.clearFilter(true);
                    store_list.filter({ property: "orders", value: record.getId(), exactMatch: true});
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
                width: 200,
                dataIndex : 'microdistrict_name',
                stateId:  'column_orders_buy_microdistrict_name',
                renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                    
                    var store_list = Ext.data.StoreManager.lookup('ListMicrodistrict');
                    var store_dir = Ext.StoreManager.lookup('directory.Microdistrict');
                    arr = [];
                    store_list.clearFilter(true);
                    store_list.filter({ property: "orders", value: record.getId(), exactMatch: true});
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
                header: 'Район',
                width: 200,
                dataIndex : 'district_name',
                stateId:  'column_orders_buy_district_name',
                renderer: function(value, meta, record, rowIndex, colIndex, store, view) {

                    var store_list = Ext.data.StoreManager.lookup('ListDistrict');
                    var store_dir = Ext.StoreManager.lookup('directory.District');
                    arr = [];
                    store_list.clearFilter(true);
                    store_list.filter({ property: "orders", value: record.getId(), exactMatch: true});
                    store_list.each(function(rec) {
                        arr.push(store_dir.getById(rec.get('district')).get('name'));
                    });
                    store_list.clearFilter(true);
                    district_name = arr.join(", ");
                    meta.tdAttr = 'data-qtip="' + district_name + '"';
                    record.data.district_name = district_name;
                    return district_name;
                }
            },{
                header: 'Город', 
                width: 200,
                dataIndex : 'city_name',
                stateId:  'column_orders_buy_city_name',
                renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                    
                    var store_list = Ext.data.StoreManager.lookup('ListCity');
                    var store_dir = Ext.StoreManager.lookup('directory.City');
                    arr = [];
                    store_list.clearFilter(true);
                    store_list.filter({ property: "orders", value: record.getId(), exactMatch: true});
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
                width: 140,
                stateId:  'column_orders_buy_space',
                renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                    space = '';
                    space_from = record.data.space_from;
                    space_to = record.data.space_to;
                    if (space_from != null)
                    {
                        space += 'от '+space_from.toString();   
                    }
                    if (space_to != null)
                    {
                        space += ' до '+space_to.toString();    
                    }
                    meta.tdAttr = 'data-qtip="' + space + '"';
                    return space;
                }
            },{
                header: 'Цена',
                width: 140,
                stateId:  'column_orders_buy_price',
                renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                    price = '';
                    price_from = record.data.price_from;
                    price_to = record.data.price_to;
                    if (price_from != null)
                    {
                        price += 'от '+Math.round(price_from).toString();   
                    }
                    if (price_to != null)
                    {
                        price += ' до '+Math.round(price_to).toString();    
                    }
                    meta.tdAttr = 'data-qtip="' + price + '"';
                    return price; 
                }
            },{
                header: 'Кол-во комнат', 
                width: 100,
                dataIndex : 'number_rooms',
                stateId:  'column_orders_buy_number_rooms',
                renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                    
                    var store_list = Ext.data.StoreManager.lookup('ListRooms');
                    arr = [];
                    store_list.clearFilter(true);
                    store_list.filter({ property: "orders", value: record.getId(), exactMatch: true});
                    store_list.each(function(rec) {
                        arr.push(rec.get('number_rooms'));
                    }); 
                    store_list.clearFilter(true);
                    number_rooms = arr.join(", ");
                    meta.tdAttr = 'data-qtip="' + number_rooms + '"';
                    record.data.number_rooms = number_rooms;
                    return number_rooms;
                }
            },{
                header: 'Тип объекта', 
                width: 200,
                dataIndex : 'object_type_name',
                stateId:  'column_orders_buy_object_type_name',
                renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                    
                    var store_list = Ext.data.StoreManager.lookup('ListObjectType');
                    var store_dir = Ext.StoreManager.lookup('directory.ObjectType');
                    arr = [];
                    store_list.clearFilter(true);
                    store_list.filter({ property: "orders", value: record.getId(), exactMatch: true});
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
                text:'Операция',
                xtype:'booleancolumn',
                dataIndex:'transaction_type',
                stateId:  'column_orders_buy_transaction_type',
                trueText:'Да',
                falseText:'Нет',
                width: 60,
                renderer: function(value,meta) {
                    value=value? 'покупка' : 'аренда';
                    return value;
                }
            },{
                header: 'Статус', 
                width: 100,
                dataIndex : 'status_name',
                stateId:  'column_orders_buy_status_name',
                renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                    store = Ext.data.StoreManager.lookup('directory.OrderStatus');
                    status_rec = store.getById(record.get('status'));
                    if (status_rec != null){
                        status_name = status_rec.get('name');
                        record.data.status_name = status_name;
                        return status_name; 
                    }
                }
            },{
                header: 'Категория',
                width: 130,
                dataIndex : 'object_category_name',
                stateId:  'column_orders_buy_object_category_name',
                renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                    store = Ext.data.StoreManager.lookup('directory.ObjectCategory');
                    object_category_rec = store.getById(record.get('object_category'));
                    if (object_category_rec != null){
                        object_category_name = object_category_rec.get('name');
                        record.data.object_category_name = object_category_name;
                        meta.tdAttr = 'data-qtip="' + object_category_name + '"';
                        return object_category_name;
                    }
                }
            },{ 
                header: '№ дог.',
                width: 50,
                dataIndex: 'contract_number',
                stateId:  'column_orders_buy_contract_number',
                renderer: function (value, meta, record) {
                    meta.tdAttr = 'data-qtip="' + value + '"';
                    return value;
                }
            },{
                header: 'Тип договора', 
                width: 90,
                dataIndex : 'type_name',
                stateId:  'column_orders_buy_type_name',
                renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                    var store = Ext.data.StoreManager.lookup('directory.ContractType');
                    type_rec = store.getById(record.get('contract_type'));
                    if (type_rec != null){
                        type_name = type_rec.get('name');
                        record.data.type_name = type_name;
                        return type_name;
                    }
                }
            },{ 
                header: 'Дата дог.',
                width: 70,
                dataIndex: 'contract_date',
                stateId:  'column_orders_buy_contract_date',
                renderer: Ext.util.Format.dateRenderer('Y-m-d')
            },{ 
                header: 'Оконч. дог.',
                width: 70,
                dataIndex: 'contract_end_date',
                stateId:  'column_orders_buy_contract_end_date',
                renderer: Ext.util.Format.dateRenderer('Y-m-d')
            },{
                header: 'Дата создания', 
                width: 85,
                dataIndex: 'create_date',
                stateId:  'column_orders_buy_create_date',
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
            },{
                header: 'Заявка от',
                width: 120,
                dataIndex : 'author_name',
                stateId:  'column_orders_buy_author_name',
                renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                    store = Ext.data.StoreManager.lookup('Users');
                    user_rec = store.getById(record.get('author'));
                    if (user_rec != null){
                        author_name = user_rec.get('last_name')+" "+user_rec.get('first_name');
                        record.data.author_name = author_name;
                        meta.tdAttr = 'data-qtip="' + author_name + '"';
                        return author_name;
                    }
                }
            },{
                header: 'Исполнитель',
                width: 120,
                dataIndex : 'performer_name',
                stateId:  'column_orders_buy_performer_name',
                renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                    store = Ext.data.StoreManager.lookup('Users');
                    user_rec = store.getById(record.get('performer'));
                    if (user_rec != null){
                        performer_name = user_rec.get('last_name')+" "+user_rec.get('first_name');
                        record.data.performer_name = performer_name;
                        meta.tdAttr = 'data-qtip="' + performer_name + '"';
                        return performer_name;
                    }
                }
            },{
                header: 'Представитель', 
                width: 120,
                dataIndex : 'represent_name',
                stateId:  'column_orders_buy_represent_name',
                renderer: function (value, meta, record) {
                    meta.tdAttr = 'data-qtip="' + value + '"';
                    return value;
                }
            },{
                header: 'Клиент', 
                width: 120,
                dataIndex : 'client_name',
                stateId:  'column_orders_buy_client_name',
                renderer: function (value, meta, record) {
                    meta.tdAttr = 'data-qtip="' + value + '"';
                    return value;
                }
            },{
                header: 'Рекл.беспл.',
                stateId: 'column_orders_buy_classified_resources',
                width: 75,
                dataIndex: 'classified_resources',
                renderer: function(value) {
                    return "<input type='checkbox'" + (value ? "checked='checked'" : "") + ">";
                }
            },{
                header: 'Рекл.платн.',
                stateId: 'column_orders_buy_toll_resources',
                width: 75,
                dataIndex: 'toll_resources',
                renderer: function(value) {
                    return "<input type='checkbox'" + (value ? "checked='checked'" : "") + ">";
                }
            },{
                header: 'Дата модификации',
                width: 85,
                stateId: 'column_orders_buy_modification_date',
                dataIndex: 'modification_date',
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
            },{
                xtype:'actioncolumn',
                width:22,
                action:'delete',
                stateId:  'column_orders_buy_delete',
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
	            iconCls: 'icon-close_order',
	            itemId: 'close_order',
	            tooltip: 'Снять заявку',
	            text: 'Снять заявку',
	            action: 'close_order'
	        },{
	            iconCls: 'icon-user_change',
	            itemId: 'change_performer',
	            tooltip: 'Назначить исполнителя',
	            text: 'Назначить исполнителя',
	            action: 'change_performer'
	        },{
	            iconCls: 'icon-templatesdoc',
	            itemId: 'templatesdoc',
	            text: 'Шаблоны',
	            tooltip: 'Подготовить документ',
	            action: 'templatesdoc'
	        },{
	            iconCls: 'icon-lock',
	            itemId: 'lock',
	            tooltip: 'Заблокировать заявку',
	            action: 'lock'
	        },{
	            iconCls: 'icon-lock_open',
	            itemId: 'lock_open',
	            tooltip: 'Разблокировать заявку',
	            action: 'lock_open'
	        },{
                iconCls: 'icon-return_active',
                itemId: 'return_active',
                text: 'Вернуть в активные',
                tooltip: 'Вернуть в активные',
                action: 'return_active'
            },{
                iconCls: 'icon-rating',
                itemId: 'rating',
                text: 'Оценить агента',
                tooltip: 'Оценить агента',
                action: 'rating'
            },{
	            iconCls: 'icon-to_archive',
	            itemId: 'to_archive',
	            text: 'Поместить в архив',
	            tooltip: 'Поместить в архив',
	            action: 'to_archive'
	        }]
        },{
            xtype: 'pagingtoolbar',
            store: this.store,
            dock: 'bottom',
            itemId: 'orderbuy_pagingtoolbar',
            displayInfo: true,
            beforePageText: 'Страница',
            afterPageText: 'из {0}',
            displayMsg: 'Заявки {0} - {1} из {2}',
        }];
        this.callParent(arguments);
    }
});