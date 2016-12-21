Ext.define('CRMRE.view.orders_sale.List' ,{
    extend: 'Ext.grid.Panel',
    xtype: 'appOrdersSaleList',
    title: 'Заявки на продажу',
 	header: false,
    autoScroll:true,
    animate: false,
 	columnLines: true,
 	stateful: true,
    stateId: 'state_orders_sale',
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
        this.store = Ext.create('CRMRE.store.OrdersSale');
        this.columns = [
  			{  
                xtype:'rownumberer',
                stateId: 'column_orders_sale_rownumberer',
                width:30
            },{
                xtype:'actioncolumn',
                stateId: 'column_orders_sale_client_info',
                width:22,
                action:'client_info',
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
                stateId: 'column_orders_sale_edit',
                action:'edit',
                items: [{
                    iconCls: 'icon-edit',
                    tooltip: 'Редактировать заявку'
                }]
            },{
                xtype:'actioncolumn',
                width:22,
                stateId: 'column_orders_sale_client_photos',
                action:'photos',
                items: [{
                    iconCls: 'icon-photos',
                    tooltip: 'Фотографии'
                }]
            },{ 
                header: 'Фотография', 
                stateId: 'column_orders_sale_photo',
                dataIndex: 'photo', 
                width:44,
                renderer: function (value, meta, record){
                    var store_photo = Ext.data.StoreManager.lookup('Photos');
                    record_photo = store_photo.findRecord('object',record.getId(),0,false,true,true);
                    if (record_photo != null){
                        return '<a href="'+record_photo.get('photo')+'" target="_blank"><img src="'+record_photo.get('photo')+'" height=24 width=32/></a>';
                    }
                    else {
                        return '<img src="'+CRMRE.global.Vars.media_url+'no_pictures.png'+'" height=24 width=32/>';
                    }
                }
            },{
                header: 'Номер',
                width: 70,
                stateId: 'column_orders_sale_index',
                dataIndex: 'index'
            },{ 
                header: 'Заголовок',
                width: 150,
                stateId: 'column_orders_sale_heading',
                dataIndex: 'heading',
                renderer: function (value, meta, record) {
                    meta.tdAttr = 'data-qtip="' + value + '"';
                    return value;
                }
            },{
                header: 'Улица', 
                width: 120,
                stateId: 'column_orders_sale_street',
                dataIndex : 'street_name',
                renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                    var store = Ext.data.StoreManager.lookup('directory.Street');
                    street_rec = store.getById(record.get('street'));
                    if (street_rec != null){
                        street_name = street_rec.get('name');
                        record.data.street_name = street_name;
                        meta.tdAttr = 'data-qtip="' + street_name + '"';
                        return street_name;
                    }
                }
            },{
                header: 'Дом №', 
                width: 50,
                stateId: 'column_orders_sale_house_number',
                dataIndex: 'house_number',
            },{
                header: 'Микрорайон', 
                width: 120,
                stateId: 'column_orders_sale_microdistrict_name',
                dataIndex : 'microdistrict_name',
                renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                    var store = Ext.data.StoreManager.lookup('directory.Microdistrict');
                    microdistrict_rec = store.getById(record.get('microdistrict'));
                    if (microdistrict_rec != null){
                        microdistrict_name = microdistrict_rec.get('name');
                        record.data.microdistrict_name = microdistrict_name;
                        meta.tdAttr = 'data-qtip="' + microdistrict_name + '"';
                        return microdistrict_name;
                    }
                }
            },{
                header: 'Район',
                width: 120,
                stateId: 'column_orders_sale_district_name',
                dataIndex : 'district_name',
                renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                    var store = Ext.data.StoreManager.lookup('directory.District');
                    district_rec = store.getById(record.get('district'));
                    if (district_rec != null){
                        district_name = district_rec.get('name');
                        record.data.district_name = district_name;
                        meta.tdAttr = 'data-qtip="' + district_name + '"';
                        return district_name;
                    }
                }
            },{
                header: 'Город', 
                width: 120,
                stateId: 'column_orders_sale_city_name',
                dataIndex : 'city_name',
                renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                    var store = Ext.data.StoreManager.lookup('directory.City');
                    city_rec = store.getById(record.get('city'));
                    if (city_rec != null){
                        city_name = city_rec.get('name');
                        record.data.city_name = city_name;
                        meta.tdAttr = 'data-qtip="' + city_name + '"';
                        return city_name;
                    }
                }
            },{
                header: 'Площадь', 
                stateId: 'column_orders_sale_total_space',
                width: 80,
                dataIndex: 'total_space',
            },{
                header: 'Цена', 
                stateId: 'column_orders_sale_price',
                width: 80,
                dataIndex: 'price',
            },{
                header: 'Кол-во комнат', 
                width: 100,
                stateId: 'column_orders_sale_number_rooms',
                dataIndex: 'number_rooms',
            },{
                header: 'Тип объекта', 
                width: 100,
                stateId: 'column_orders_sale_object_type',
                dataIndex : 'object_type_name',
                renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                    store = Ext.StoreManager.lookup('directory.ObjectType');
                    object_type_rec = store.findRecord('id',record.get('object_type'),0,false,true,true);
                    if (object_type_rec != null){
                        object_type_name = object_type_rec.get('name');
                        record.data.object_type_name = object_type_name;
                        meta.tdAttr = 'data-qtip="' + object_type_name + '"';
                        return object_type_name; 
                    }
                }
            },{
                header: 'Исполнитель',
                width: 120,
                stateId: 'column_orders_performer',
                dataIndex : 'performer_name',
                renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                    var store = Ext.data.StoreManager.lookup('Users');
                    user_rec = store.getById(record.get('performer'));
                    if (user_rec != null){
                        performer_name = user_rec.get('last_name')+" "+user_rec.get('first_name');
                        record.data.performer_name = performer_name;
                        meta.tdAttr = 'data-qtip="' + performer_name + '"';
                        return performer_name;
                    }
                }
            },{
                text:'Операция',
                stateId: 'column_orders_sale_transaction',
                xtype:'booleancolumn',
                dataIndex:'transaction_type',
                trueText:'Да',
                falseText:'Нет',
                width: 60,
                renderer: function(value,meta) {
                    value=value? 'продажа' : 'аренда';
                    return value;
                }
            },{
                header: 'Статус', 
                width: 100,
                stateId: 'column_orders_sale_status',
                dataIndex : 'status_name',
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
                stateId: 'column_orders_sale_object_category',
                dataIndex : 'object_category_name',
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
                stateId: 'column_orders_sale_contract_number',
                dataIndex: 'contract_number',
                renderer: function (value, meta, record) {
                    meta.tdAttr = 'data-qtip="' + value + '"';
                    return value;
                }
            },{
                header: 'Тип договора', 
                width: 90,
                stateId: 'column_orders_sale_type_name',
                dataIndex : 'type_name',
                renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                    store = Ext.data.StoreManager.lookup('directory.ContractType');
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
                stateId: 'column_orders_sale_create_date',
                dataIndex: 'contract_date',
                renderer: Ext.util.Format.dateRenderer('Y-m-d')
            },{ 
                header: 'Оконч. дог.',
                width: 70,
                stateId: 'column_orders_sale_contract_end_date',
                dataIndex: 'contract_end_date',
                renderer: Ext.util.Format.dateRenderer('Y-m-d')
            },{
                header: 'Дата создания', 
                width: 85,
                stateId: 'column_orders_sale_create_date',
                dataIndex: 'create_date',
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
            },{
                header: 'Заявка от',
                width: 120,
                stateId: 'column_orders_sale_author_name',
                dataIndex : 'author_name',
                renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
                    var store = Ext.data.StoreManager.lookup('Users');
                    user_rec = store.getById(record.get('author'));
                    if (user_rec != null){
                        author_name = user_rec.get('last_name')+" "+user_rec.get('first_name');
                        record.data.author_name = author_name;
                        meta.tdAttr = 'data-qtip="' + author_name + '"';
                        return author_name;
                    }
                }
            },{
                header: 'Клиент', 
                width: 120,
                stateId: 'column_orders_sale_client_name',
                dataIndex : 'client_name',
            },{
                header: 'Представитель', 
                width: 120,
                stateId: 'column_orders_sale_represent_name',
                dataIndex : 'represent_name',
            },{
                header: 'Рекл.беспл.',
                stateId: 'column_orders_sale_classified_resources',
                width: 75,
                dataIndex: 'classified_resources',
                renderer: function(value) {
                    return "<input type='checkbox'" + (value ? "checked='checked'" : "") + ">";
                }
            },{
                header: 'Рекл.платн.',
                stateId: 'column_orders_sale_toll_resources',
                width: 75,
                dataIndex: 'toll_resources',
                renderer: function(value) {
                    return "<input type='checkbox'" + (value ? "checked='checked'" : "") + ">";
                }
            },{
                header: 'Рекл.горяч.',
                stateId: 'column_orders_sale_hot_offer',
                width: 75,
                dataIndex: 'hot_offer',
                renderer: function(value) {
                    return "<input type='checkbox'" + (value ? "checked='checked'" : "") + ">";
                }
            },{
                header: 'Рекл.элитн.',
                stateId: 'column_orders_sale_luxury_housing',
                width: 75,
                dataIndex: 'luxury_housing',
                renderer: function(value) {
                    return "<input type='checkbox'" + (value ? "checked='checked'" : "") + ">";
                }
            },{
                header: 'Дата модификации',
                width: 85,
                stateId: 'column_orders_sale_modification_date',
                dataIndex: 'modification_date',
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
            },{
                xtype:'actioncolumn',
                width:22,
                stateId: 'column_orders_sale_delete',
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
	            iconCls: 'icon-copy_record',
	            itemId: 'copy_record',
	            tooltip: 'Скопировать заявку',
	            text: 'Скопировать заявку',
	            action: 'copy'
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
            itemId: 'ordersale_pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            beforePageText: 'Страница',
            afterPageText: 'из {0}',
            displayMsg: 'Заявки {0} - {1} из {2}',
        }];
        this.callParent(arguments);
    }
});