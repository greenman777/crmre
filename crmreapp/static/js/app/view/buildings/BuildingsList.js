Ext.define('CRMRE.view.buildings.BuildingsList' ,{
    extend: 'Ext.grid.Panel',
    xtype: 'appBuildingsList',
    autoScroll:true,
    animate: false,
 	columnLines: true,
 	store: "Buildings",
	plugins: [{
        ptype: 'bufferedrenderer',
	    variableRowHeight: false
    }],
    loadMask: true,
    viewConfig: {
    	enableTextSelection: true,
        stripeRows: true,
    },
    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl : [
            '<p><b>Описание:</b> {description}</p>'
        ],
        pluginId: 'rowexpand',
    }],
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
                    header: 'Номер', 
                    width: 70,
                    dataIndex: 'index'
                },{
                    header: 'Заголовок', 
                    flex: 1,
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
	                width: 80,
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
	                header: 'Город', 
	                width: 80,
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
	                header: 'Застройщик',
	                width: 80,
	                stateId: 'column_construction_organization_name',
	                dataIndex : 'construction_organization_name',
	                renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
	                    var store = Ext.data.StoreManager.lookup('directory.ConstructionOrganization');
	                    construction_organization_rec = store.getById(record.get('construction_organization'));
	                    if (construction_organization_rec != null){
	                        construction_organization_name = construction_organization_rec.get('name');
	                        record.data.construction_organization_name = construction_organization_name;
	                        meta.tdAttr = 'data-qtip="' + construction_organization_name + '"';
	                        return construction_organization_name;
	                    }
	                }
	            },{
	                header: 'Срок сдачи',
	                width: 70,
	                stateId: 'column_delivery_period',
	                dataIndex: 'delivery_period',
	            },{
                    header: 'Приоритет',
				    width: 70,
                    dataIndex: 'priority'
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
                iconCls: 'icon-building_add',
                itemId: 'add',
                tooltip: 'Добавить новостройку',
                text: 'Добавить новостройку',
                action: 'add'
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