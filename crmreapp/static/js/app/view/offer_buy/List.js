Ext.define('CRMRE.view.offer_buy.List' ,{
    extend: 'Ext.grid.Panel',
    xtype: 'appOfferBuyList',
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
      			{	xtype:'rownumberer',
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
                    xtype:'actioncolumn',
                    width:22,
                    action:'info_photos',
                    items: [{
                        iconCls: 'icon-photos',
                        tooltip: 'Фотографии'
                    }]
                },{ 
	                header: 'Фотография', 
	                dataIndex: 'photo', 
	                width:44,
	                renderer: function (value, meta, record){
	                    var store_photo = Ext.data.StoreManager.lookup('Photos');
	                    record_photo = store_photo.findRecord('object',record.get('order_sale'),0,false,true,true);
	                    if (record_photo != null){
	                        return '<a href="'+record_photo.get('photo')+'" target="_blank"><img src="'+record_photo.get('photo')+'" height=24 width=32/></a>';
	                    }
                        else {
                            return '<img src="'+CRMRE.global.Vars.media_url+'no_pictures.png'+'" height=24 width=32/>';
                        }
	                }
            	},{
                    header: 'Клиент', 
                    width: 100,
                    dataIndex : 'order_sale_client_name',
                    renderer: function (value, meta, record) {
                        meta.tdAttr = 'data-qtip="' + value + '"';
                        return value;
                    }
                },{
                    header: 'Заголовок', 
                    width: 120,
                    dataIndex: 'order_sale_heading',
                    renderer: function (value, meta, record) {
                        meta.tdAttr = 'data-qtip="' + value + '"';
                        return value;
                    }
                },{
                    header: 'Улица', 
                    width: 120,
                    dataIndex : 'order_sale_street_name',
                    renderer: function (value, meta, record) {
                        meta.tdAttr = 'data-qtip="' + value + '"';
                        return value;
                    }
                },{
                    header: 'Дом №', 
                    width: 50,
                    dataIndex: 'order_sale_house_number',
                    renderer: function (value, meta, record) {
                        meta.tdAttr = 'data-qtip="' + value + '"';
                        return value;
                    }
                },{
                    header: 'Микрорайон', 
                    width: 120,
                    dataIndex : 'order_sale_microdistrict_name',
                    renderer: function (value, meta, record) {
                        meta.tdAttr = 'data-qtip="' + value + '"';
                        return value;
                    }
                },{
                    header: 'Город', 
                    width: 120,
                    dataIndex : 'order_sale_city_name',
                    renderer: function (value, meta, record) {
                        meta.tdAttr = 'data-qtip="' + value + '"';
                        return value;
                    }
                },{
                    header: 'Площадь',
                    width: 70,
                    dataIndex : 'order_sale_space',
                    renderer: function (value, meta, record) {
                        meta.tdAttr = 'data-qtip="' + value + '"';
                        return value;
                    }
                },{
                    header: 'Цена',
                    width: 70,
                    dataIndex : 'order_sale_price',
                    renderer: function (value, meta, record) {
                        meta.tdAttr = 'data-qtip="' + value + '"';
                        return value;
                    }
                },{
                    header: 'Тип объекта', 
                    width: 90,
                    dataIndex : 'order_sale_object_type_name',
                    renderer: function (value, meta, record) {
                        meta.tdAttr = 'data-qtip="' + value + '"';
                        return value;
                    }
                },{
	                header: 'Исполнитель', 
	                width: 100,
	                dataIndex : 'order_sale_performer_name',
                    renderer: function (value, meta, record) {
                        meta.tdAttr = 'data-qtip="' + value + '"';
                        return value;
                    }
                },{
                    text:'Извещ.',
                    xtype:'booleancolumn',
                    dataIndex:'informed',
                    width: 50,
                    trueText:'Да',
                    falseText:'Нет',
                    renderer: function(value,meta) {
                        var fontweight = value ? 'bold' : 'normal';
                        value=value? 'Да' : 'Нет';
                        meta.style='font-weight:'+fontweight;
                        return value;
                    }
                },{
                    header: 'Дата создания', 
                    width: 85,
                    dataIndex : 'order_sale_create_date',
                    renderer: function (value, meta, record) {
                        meta.tdAttr = 'data-qtip="' + value + '"';
                        return value;
                    }
                },{
                    header: 'Номер', 
                    width: 70,
                    dataIndex: 'order_sale_index',
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
                text: 'Документы',
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