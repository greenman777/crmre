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
	                header: 'Жилой комплекс',
	                width: 80,
	                stateId: 'column_buildings_residential_complex',
	                dataIndex : 'residential_complex_name',
	                renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
	                    var store = Ext.data.StoreManager.lookup('directory.ResidentialComplex');
	                    residential_complex_rec = store.getById(record.get('residential_complex'));
	                    if (residential_complex_rec != null){
	                        residential_complex_name = residential_complex_rec.get('name');
	                        record.data.residential_complex_name = residential_complex_name;
	                        meta.tdAttr = 'data-qtip="' + residential_complex_name + '"';
	                        return residential_complex_name;
	                    }
	                }
	            },{
	                header: 'Улица', 
	                width: 120,
	                stateId: 'column_buildings_street',
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
	                stateId: 'column_buildings_house_number',
	                dataIndex: 'house_number',
	            },{
	                header: 'Микрорайон', 
	                width: 80,
	                stateId: 'column_buildings_microdistrict_name',
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
	                stateId: 'column_buildings_city_name',
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
	                stateId: 'column_buildings_construction_organization_name',
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
                    header: 'Приоритет',
				    width: 70,
                    dataIndex: 'priority'
                },{
					header: 'Дата создания',
					width: 85,
					stateId: 'column_buildings_create_date',
					dataIndex: 'create_date',
					renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
				},{
					header: 'Дата модификации',
					width: 85,
					stateId: 'column_buildings_modification_date',
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