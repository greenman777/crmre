Ext.define('CRMRE.view.orders_buy.Edit', {
    extend: 'Ext.window.Window',
    requires: [
        'Ext.ux.form.field.BoxSelect'
    ],
    xtype: 'appOrdersBuyEdit',
    title: 'Редактирование заявки',
    width:920,
    modal : true,
    initComponent: function() {
        this.items = [{
        	xtype: 'form',
        	frame: true,
            header: false,
        	defaults: {anchor: '100%',padding: '5 5 5 5'},
        	fieldDefaults: {msgTarget: 'side',labelWidth: 170},
            items: [
            {	xtype: 'combobox',name : 'id',hidden:true},
            {   xtype: 'textfield',name : 'index',hidden:true},
            {	xtype: 'combobox',name: 'object_category',hidden:true},
            {	xtype: 'combobox',name: 'author',hidden:true},
            {   xtype: 'combobox',name: 'performer',hidden:true},
            {   xtype: 'combobox',name: 'status',hidden:true},
            {   xtype: 'combobox',name: 'client',hidden:true},
            {   xtype: 'comboboxselect',name: 'object_type_old',valueField: 'id',store: 'directory.ObjectType',hidden:true},
            {   xtype: 'comboboxselect',name: 'city_old',valueField: 'id',store: 'directory.City',hidden:true},
            {   xtype: 'comboboxselect',name: 'district_old',valueField: 'id',store: 'directory.District',hidden:true},
            {   xtype: 'comboboxselect',name: 'microdistrict_old',valueField: 'id',store: 'directory.Microdistrict',hidden:true},
            {   xtype: 'comboboxselect',name: 'street_old',valueField: 'id',store: 'directory.Street',hidden:true},
            {   xtype: 'comboboxselect',name: 'number_rooms_old',valueField: 'id',store:[1,2,3,4,5,6,7,8,9,10],hidden:true},
            {   xtype: 'datefield',name: 'modification_date',hidden:true},
            {   xtype: 'datefield',name: 'create_date',hidden:true},
            {	xtype: 'checkboxfield',name: 'mortgage_old',hidden:true},
            {
        		xtype:'fieldset',
        		title: 'Основная информация',
        		collapsible: true,
        		defaultType: 'textfield',
        		layout: 'anchor',
        		defaults: {anchor: '100%'},
        		items :[
                {	
                    name: 'heading',
                    fieldLabel: 'Заголовок',
                    maxLength: 80,
                    rows: 1,
                    allowBlank:false
	        	},{	
	        		xtype: 'textareafield',
                    name: 'description',
                    fieldLabel: 'Описание',
                    maxLength: 1200,
                    rows: 1
                    
	        	},{
	    			xtype: 'comboboxselect',
	    			name : 'object_type',
	    			fieldLabel: 'Тип объекта недвижимости',
                    pinList: false,
                    filterPickList: true,
                    queryMode: 'remote',//чтоб успели подгрузиться типы
                    displayField: 'name',
                    valueField: 'id',
                    allowBlank:false,
                    listeners: {
                        'beforerender': function(combo){
					        var object_category = combo.up('form').getValues().object_category;
                            store = Ext.create('CRMRE.store.directory.ObjectType');
					        store.getProxy().extraParams = {object_category: object_category};
					        store.load(); 
                            combo.store = store;
                        }
                    }
	    		},{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    defaults: {flex: 1},
                    items:[
                    {
                        xtype: 'comboboxselect',
                        itemId: 'number_rooms',
                        name : 'number_rooms',
                        flex: 2.3,
                        labelWidth: 170,
                        pinList: false,
                        filterPickList: true,
                        fieldLabel: 'Количество комнат',
                        margin: '0 10 0 0',
                        store:[1,2,3,4,5,6,7,8,9,10]
                    },{   
                        xtype: 'combo',
                        fieldLabel: 'Тип сделки',
                        store: [[false, 'аренда'], [true, 'покупка']],
                        itemId: 'transaction_type',
                        name: 'transaction_type',
                        flex: 1,
                        labelWidth: 170,
                        triggerAction: 'all',
                        editable: false,
                        allowBlank:false,
                        value: true,
                    }]
                },{
                    xtype:'fieldset',
                    //title: 'Характеристики',
                    layout:'column',
                    defaults:{bodyPadding: 5,anchor: '100%',padding: '2 2 2 2',frame: true},
                    fieldDefaults: {msgTarget: 'side',labelWidth: 120},
                    items:[{
                        title: 'от',
                        columnWidth:.25,
                        items: [
                        {   
	                        xtype: 'numberfield',
	                        fieldLabel: 'Цена(руб)',
	                        name: 'price_from',
	                        inputWidth: 80,
	                        minValue: 0,
	                        maxValue: 999999999,
	                        decimalPrecision : 2
                        },{   
	                        xtype: 'numberfield',
                            itemId:'space_from',
	                        fieldLabel: '<html>Площадь(м<sup>2</sup>)</html>',
	                        name: 'space_from',
	                        inputWidth: 80,
	                        minValue: 0,
	                        maxValue: 999999,
	                        decimalPrecision : 2
                        },{   
	                        xtype: 'numberfield',
	                        itemId:'remoteness_from',
                            fieldLabel: 'Удал. от центра(км)',
	                        name: 'remoteness_from',
	                        inputWidth: 80,
	                        minValue: 0,
	                        maxValue: 999999
                        }]
                    },{
                        title: 'до',
                        columnWidth:.10,
                        items: [
                        {
	                        xtype: 'numberfield',
	                        name: 'price_to',
	                        minValue: 0,
	                        maxValue: 999999999,
	                        inputWidth: 75,
	                        decimalPrecision : 2
                        },{
	                        xtype: 'numberfield',
                            itemId:'space_to',
	                        name: 'space_to',
	                        inputWidth: 75,
	                        minValue: 0,
	                        maxValue: 999999,
	                        decimalPrecision : 2
                        },{
	                        xtype: 'numberfield',
                            itemId:'remoteness_to',
	                        name: 'remoteness_to',
	                        inputWidth: 75,
	                        minValue: 0,
	                        maxValue: 999999
                        }]
                    },{
                        title: 'Ипотека',
                        columnWidth:.32,
                        items: [
                        {
	                        xtype: 'checkboxfield',
	                        boxLabel: 'Требует ипотечного кредита',
	                        name: 'mortgage',
	                        inputValue: 'true',
	                        uncheckedValue: 'false'
	                    },{   
	                        xtype: 'numberfield',
	                        fieldLabel: 'Сумма наличн.(руб)',
	                        name: 'cash',
	                        labelWidth: 145,
	                        inputWidth: 105,
	                        minValue: 0,
	                        maxValue: 99999999,
	                        decimalPrecision : 2
	                    },{
	                        xtype: 'comboboxselect',
                            "multiSelect": false,
	                        name : 'bank',
	                        labelWidth: 145,
	                        inputWidth: 105,
	                        displayField: 'name',
	                        valueField: 'id',
	                        fieldLabel: 'Банк',
	                        autoSelect: true,
	                        forceSelection:true,
	                        queryMode: 'local',
	                        store: 'directory.Bank'
	                    }]
                    },{
                        title: 'Договор',
                        columnWidth:.33,
                        items: [
                        {
	                    	xtype: 'container',
	                    	defaults:{bodyPadding: 10,anchor: '100%',padding: '2 2 2 2',frame: true},
	                    	layout: 'hbox',
	                    	defaultType: 'textfield',
	            			items:[{
	            				xtype: 'textfield',
	                            name: 'contract_number',
	                            fieldLabel: '№',
	                            maxLength: 20,
	                            labelWidth: 30,
	                            inputWidth: 80
	                        },{
	                        	xtype: 'combobox',
	                            name : 'contract_type',
	                            fieldLabel: 'Тип',
	                            autoSelect: true,
	                            queryMode: 'local',
	                            displayField: 'name',
	                            valueField: 'id',
	                            labelWidth: 30,
	                            inputWidth: 115,
	                            store: 'directory.ContractType'
	                        }]
                        },{
                            xtype: 'container',
                            defaults:{bodyPadding: 10,anchor: '100%',padding: '2 2 4 2',frame: true},
                            layout: 'hbox',
                            defaultType: 'textfield',
                            items:[{
                                xtype: 'datefield',
                                name: 'contract_date',
                                fieldLabel: 'Дата',
                                format: 'Y-m-d',
                                labelWidth: 30,
                                inputWidth: 80
                            },{
                                xtype: 'datefield',
                                name : 'contract_end_date',
                                fieldLabel: 'Окончание',
                                format: 'Y-m-d',
                                labelWidth: 65,
                                inputWidth: 80
                            }]
                        },{
                            xtype: 'container',
                            defaults:{bodyPadding: 10,anchor: '100%',padding: '2 2 2 2',frame: true},
                            layout: 'hbox',
                            defaultType: 'textfield',
                            items:[{
                                xtype: 'checkboxfield',
	                            boxLabel: 'Только сопровожд.',
	                            name: 'only_support',
	                            inputValue: 'true',
	                            uncheckedValue: 'false'
                            },{
                                xtype: 'checkboxfield',
	                            boxLabel: 'Показать юристу',
	                            name: 'show_support',
	                            inputValue: 'true',
	                            uncheckedValue: 'false'
                            }]
                        }]
	                }]
                }]
            },{//Tab панель данных
                xtype:'tabpanel',
                plain:true,
                defaults:{anchor: '100%',padding: '5 5 5 5',frame: true},
                items:[
                {
                    /*Вкладка "Местоположение"*/
                    title: 'Желаемое местоположение',
                    id: 'orders_buy_location',
                    items :[
                    {
                        xtype:'fieldset',
                        layout: 'anchor',
                        defaults: {anchor: '100%'},
                        title: 'Список объектов поиска',
                        items:[
                        {
		                    xtype: 'comboboxselect',
		                    name : 'district',
                            pinList: false,
                            filterPickList: true,
		                    queryMode: 'local',
		                    displayField: 'name',
		                    valueField: 'id',
		                    fieldLabel: 'Список районов',
		                    store: 'directory.District'
                        },{
                            xtype: 'comboboxselect',
                            name : 'city',
                            pinList: false,
                            filterPickList: true,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'id',
                            fieldLabel: 'Список городов',
                            store: 'directory.City'
                        },{
                            xtype: 'comboboxselect',
                            name : 'microdistrict',
                            itemId:'microdistrict',
                            pinList: false,
                            filterPickList: true,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'id',
                            fieldLabel: 'Список микрорайонов',
                            store: 'directory.Microdistrict'
                        },{
                            xtype: 'comboboxselect',
                            name : 'street',
                            itemId:'street',
                            pinList: false,
                            filterPickList: true,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'id',
                            fieldLabel: 'Список улиц',
                            store: 'directory.Street'
                        }]
                    }]
                },{
                    title: 'Реклама',
                    layout: 'anchor',
                    itemId: 'advertising',
                    defaultType: 'textfield',
                    defaults:{bodyPadding: 10,anchor: '100%',padding: '10 10 10 10',frame: true},
                    items :[
                        {
                            xtype: 'checkboxfield',
                            boxLabel: 'Выгрузка в бесплатные ресурсы',
                            name: 'classified_resources',
                            name: 'free_resources',
                            inputValue: 'true',
                            uncheckedValue: 'false'
                        },{
                            xtype: 'checkboxfield',
                            boxLabel: 'Выгрузка в платные ресурсы',
                            name: 'toll_resources',
                            inputValue: 'true',
                            uncheckedValue: 'false'
                        }
                    ]
                },{
                    /*Вкладка "Комиссионные"*/
                    title: 'Комиссионные',
                    layout: 'anchor',
                    defaultType: 'textfield',
                    defaults:{anchor: '100%'},
                    items :[
                    {
                        xtype:'fieldset',
                        title: 'Комиссионные',
                        fieldDefaults: {msgTarget: 'side',labelWidth: 70},
                        layout: 'anchor',
                        items:[
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaultType: 'textfield',
                            defaults: {flex: 1},
                            items:[
                            {
                                xtype: 'checkboxfield',
                                flex: 2,
                                boxLabel: 'Включать коммиссионные',
                                name: 'commission',
                                inputValue: 'true',
                                uncheckedValue: 'false',
                                margin: '0 5 0 0'
                            },{   
                                xtype: 'combo',
                                fieldLabel: 'Тип',
                                store: [[false, '%'], [true, 'фикс.величина']],
                                name: 'commission_type',
                                triggerAction: 'all',
                                editable: false,
                                margin: '0 5 0 0'
                            },{
                                xtype: 'numberfield',
                                fieldLabel: 'Значение',
                                name: 'commission_price',
                                minValue: 0,
                                maxValue: 999999,
                                decimalPrecision : 2
                            }]
                        }]
                    },{
                        xtype:'fieldset',
                        title: 'Другие агенства',
                        fieldDefaults: {msgTarget: 'side',labelWidth: 70},
                        layout: 'anchor',
                        items:[
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaultType: 'textfield',
                            defaults: {flex: 1},
                            items:[
                            {
                                xtype: 'checkboxfield',
                                boxLabel: 'Задействовать другие агенства',
                                name: 'other_agency',
                                inputValue: 'true',
                                uncheckedValue: 'false'
                            },{
                                xtype: 'checkboxfield',
                                boxLabel: 'Включать коммиссионные',
                                name: 'agency_commission',
                                inputValue: 'true',
                                uncheckedValue: 'false'
                            },{   
                                xtype: 'combo',
                                fieldLabel: 'Тип',
                                store: [[false, '%'], [true, 'фикс.величина']],
                                name: 'agency_commission_type',
                                triggerAction: 'all',
                                editable: false,
                                margin: '0 5 0 0'
                            },{
                                xtype: 'numberfield',
                                fieldLabel: 'Значение',
                                name: 'agency_commission_price',
                                minValue: 0,
                                maxValue: 999999,
                                decimalPrecision : 2
                            }]
                        }]
                    }]
                },{
                	title: 'Комментарии',
                	layout: 'anchor',
                	defaultType: 'textfield',
                	defaults:{anchor: '100%'},
            		items :[
            			{
            				xtype: 'textareafield',
            				fieldLabel: 'Комментарий',
            				maxLength: 300,
            				rows: 5,
            				name: 'comment'
            			}
               		]
	            }]
            }]
        }];
        this.buttons = [{
            iconCls: 'icon-save',
            id: 'buttonSaveOrdersBuy',
            itemId: 'orders_save',
        	text: 'Сохранить',
            action: 'save',
            disabled: true
        },{
        	text: 'Отмена',
            action: 'cancel'
        }];
        this.callParent(arguments);
    },
    
    show: function(component, eOpts) {
        this.callParent(arguments);
        this.ListLoadCount = 0;
        var order_id = this.down('form').getValues().id;
        if (order_id>0) {
            this.setListLocal(order_id,'ListObjectType','object_type','object_type_old');
	        this.setListLocal(order_id,'ListDistrict','district','district_old');
	        this.setListLocal(order_id,'ListCity','city','city_old');
	        this.setListLocal(order_id,'ListMicrodistrict','microdistrict','microdistrict_old');
	        this.setListLocal(order_id,'ListStreet','street','street_old');
	        this.setListLocal(order_id,'ListRooms','number_rooms','number_rooms_old');
        }
        else {
            Ext.getCmp('buttonSaveOrdersBuy').enable();    
        }
    },
    
    setListLocal: function(order_id,store,field,field_old) {
        
        var store_list = Ext.data.StoreManager.lookup(store);
		arr = [];
		store_list.clearFilter(true);
		store_list.filter({ property: "orders", value: order_id, exactMatch: true});
        store_list.each(function(rec) {
        	arr.push(rec.get(field));
    	});
        console.log(store_list,order_id,arr);
		store_list.clearFilter(true);
    	this.down('form').getForm().setValues([{id:field,value:arr.sort()}]);
        this.down('form').getForm().setValues([{id:field_old,value:arr.sort()}]);
		this.ListLoadCount += 1;
        if (this.ListLoadCount >= 6) {
            Ext.getCmp('buttonSaveOrdersBuy').enable();
        }
    }
});