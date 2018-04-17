Ext.apply(Ext.form.field.VTypes, {
        СoordinatesYandex: function (value) {
          return /^\d[\d.,]*$/.test(value);
        },
        СoordinatesYandexText: 'Допустимая форма ввода: 56.3784,44.0048'
});
Ext.apply(Ext.form.field.VTypes, {
        CadastreNumber: function (value) {
          return /^\d[\d:]*$/.test(value);
        },
        CadastreNumberText: 'Допустимая форма ввода: 47:14:1203001:814'
});
Ext.define('CRMRE.view.orders_sale.Edit', {
    extend: 'Ext.window.Window',
    requires: [
        'Ext.ux.form.field.BoxSelect'
    ],
    xtype: 'appOrdersSaleEdit',
    title: 'Редактирование заявки',
    width:920,
    modal : true,
    initComponent: function() {
        this.items = [{
        	xtype: 'form',
        	frame: true,
            header: false,
        	defaults: {anchor: '100%',padding: '5 5 5 5'},
        	fieldDefaults: {msgTarget: 'side',labelWidth: 120},
            items: [
                {   xtype: 'combobox',name : 'id',hidden:true},
	            {   xtype: 'textfield',name : 'index',hidden:true},
                {   xtype: 'combobox',name: 'object_category',hidden:true},
	            {   xtype: 'combobox',name: 'author',hidden:true},
	            {   xtype: 'combobox',name: 'performer',hidden:true},
	            {   xtype: 'combobox',name: 'status',hidden:true},
	            {   xtype: 'combobox',name: 'client',hidden:true},
	            {   xtype: 'datefield',name: 'modification_date',hidden:true},
	            {   xtype: 'datefield',name: 'create_date',hidden:true},
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
	                    allowBlank:false
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaultType: 'textfield',
                        defaults: {flex: 1},
                        items:[{
		                    xtype: 'combobox',
		                    name : 'object_type',
                            flex: 3,
		                    fieldLabel: 'Тип объекта',
		                    queryMode: 'local',
		                    displayField: 'name',
	                        autoSelect: true,
	                        editable: false,
	                        forceSelection:true,
		                    valueField: 'id',
		                    allowBlank: false,
                            margin: '0 15 0 0',
	                        store: 'directory.ObjectType',
		                    listeners: {
		                        'beforerender': function(combo){
		                            var object_category = combo.up('form').getValues().object_category;
	                                store = combo.getStore();
		                            store.clearFilter(true);
	                                store.filter({ property: "object_category", value: object_category, exactMatch: true});
		                        }
		                    }
                        },{
                            xtype: 'combobox',
                            fieldLabel: 'Чей объект',
                            name: 'object_accessory',
                            autoSelect: true,
                            allowBlank:false,
                            labelWidth: 80,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'id',
                            store: 'directory.ObjectAccessory'
                        }]  
                    },{
                    	xtype: 'fieldcontainer',
                    	layout: 'hbox',
                    	defaultType: 'textfield',
                        fieldDefaults: {msgTarget: 'side',labelWidth: 80},
						defaults: {flex: 1},
            			items:[
            			{   
	                        xtype: 'comboboxselect',
                			"multiSelect": false,
                            labelWidth: 120,
                            flex: 1.5,
                            itemId: 'transaction_type',
	                        fieldLabel: 'Тип сделки',
	                        store: [[false, 'аренда'], [true, 'продажа']],
	                        name: 'transaction_type',
	                        allowBlank:false,
                            triggerAction: 'all',
	                        value: true,
	                        margin: '0 5 0 0'
                        },{	
            				xtype: 'comboboxselect',
                			"multiSelect": false,
            				flex: 1.5,
            				itemId: 'lease',
  							fieldLabel: 'Срок аренды',
  							valueField: 'id',
                            displayField: 'name',
                            store: 'directory.Lease',
  							name: 'lease',
                            pinList: false,
		                    filterPickList: true,
		                    queryMode: 'local',
            			}]
            		}]
        		},{
                    xtype: 'container',
                    //title: 'Характеристики',
                    layout:'column',
                    defaults:{bodyPadding: 10,anchor: '100%',padding: '2 2 2 2',frame: true},
                    fieldDefaults: {msgTarget: 'side',labelWidth: 100},
                    items:[{
                        columnWidth:.33,
                        itemId: 'residential_property',
                        items: [
                        {
                            fieldLabel: 'Кол-во комнат',
                            xtype: 'numberfield',
                            minValue: 0,
                            maxValue: 99,
                            itemId: 'number_rooms',
                            name: 'number_rooms'
                        },{   
                            xtype: 'numberfield',
                            fieldLabel: '<html>Общая площадь(м<sup>2</sup>)</html>',
                            name: 'total_space',
                            itemId: 'total_space',
                            minValue: 0,
                            maxValue: 999999,
                            decimalPrecision : 2
                        },{
	                		fieldLabel: 'Категория земли',
	                		name: 'category_earth',
	                		itemId: 'category_earth',
	                		xtype: 'combobox',
	                		autoSelect: true,
	                		queryMode: 'local',
	            			displayField: 'name',
	            			valueField: 'id',
	            			store: 'directory.CategoryEarth'
	            		},{
                            xtype: 'numberfield',
                            fieldLabel: '<html>Жилая площадь(м<sup>2</sup>)</html>',
                            itemId: 'living_space',
                            minValue: 0,
                            maxValue: 999999,
                            decimalPrecision : 2,
                            name: 'living_space'
                        },{
                            xtype: 'numberfield',
                            fieldLabel: '<html>Площадь кухни(м<sup>2</sup>)</html>',
                            itemId: 'kitchen_space',
                            minValue: 0,
                            maxValue: 999999,
                            decimalPrecision : 2,
                            name: 'kitchen_space'
                        },{
	                    	xtype: 'container',
	                    	defaults:{bodyPadding: 10,anchor: '100%',padding: '2 2 2 2',frame: true},
	                    	layout: 'hbox',
	                    	defaultType: 'textfield',
	            			items:[{
	                            fieldLabel: 'Всего этажей',
	                            xtype: 'numberfield',
                                itemId: 'floors',
	                            minValue: 0,
	                            maxValue: 150,
	                            inputWidth: 50,
	                            name: 'floors'
	                        },{
	                            fieldLabel: 'Этаж',
	                            xtype: 'numberfield',
                                itemId: 'floor',
	                            minValue: 0,
	                            maxValue: 150,
	                            labelWidth: 35,
	                            inputWidth: 45,
	                            name: 'floor'
	                        }]
                        },{
                            fieldLabel: 'Текущая доходность',
                            name: 'current_yield',
                            itemId: 'current_yield',
                            minValue: 0,
                            maxValue: 99999999,
                            decimalPrecision : 2,
                            xtype: 'numberfield'
                        },{
                            fieldLabel: 'Текущие затраты',
                            name: 'current_expenses',
                            itemId: 'current_expenses',
                            minValue: 0,
                            maxValue: 99999999,
                            decimalPrecision : 2,
                            xtype: 'numberfield'
                        },{
                            fieldLabel: 'Дата основания',
                            name: 'founding_date',
                            itemId: 'founding_date',
                            format: 'Y-m-d',
                            xtype: 'datefield'
                        }]
	                },{
                        columnWidth:.33,
                        items: [
                        {   
                            xtype: 'numberfield',
                            fieldLabel: 'Цена (руб)',
                            name: 'price',
                            minValue: 0,
                            maxValue: 999999999,
                            decimalPrecision : 2
                        },{
                            fieldLabel: 'Способ оплаты',
                            name: 'method_payment',
                            xtype: 'combobox',
                            autoSelect: true,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'id',
                            store: 'directory.MethodPayment'
                        },{
	                    	xtype: 'container',
	                    	defaults:{bodyPadding: 10,anchor: '100%',padding: '2 2 2 2',frame: true},
	                    	layout: 'hbox',
	                    	defaultType: 'textfield',
		            			items:[{
	                            xtype: 'checkboxfield',
	                            boxLabel: 'Торг',
	                            name: 'auction',
	                            inputValue: 'true',
	                            margin: '0 80 0 0',
	                            uncheckedValue: 'false'
	                        }]
                        },{
                            fieldLabel: 'Тип НДС',
                            name: 'nds_type',
                            xtype: 'combobox',
                            itemId: 'nds_type',
                            autoSelect: true,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'id',
                            store: 'directory.NdsType'
                        },{
                            xtype: 'combobox',
                            name : 'encumbrance',
                            displayField: 'name',
                            valueField: 'id',
                            fieldLabel: 'Обременение',
                            autoSelect: true,
                            editable: false,
                            forceSelection:true,
                            queryMode: 'local',
                            store: 'directory.Encumbrance',
                            //Заполняем обременение по умолчанию
                            listeners: {
                                'afterrender': function(combo){
                                    var selectedRecord = combo.getStore().findRecord('name','нет').getId();
                                    combo.setValue(selectedRecord);  
                                }
                            }
                        }]
                    },{
                        //title: 'Договор',
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
                                fieldLabel: '№ дог',
                                maxLength: 20,
                                labelWidth: 42,
                                inputWidth: 70
                            },{
                                xtype: 'combobox',
                                name : 'contract_type',
                                fieldLabel: 'Тип',
                                autoSelect: true,
                                queryMode: 'local',
                                displayField: 'name',
                                valueField: 'id',
                                labelWidth: 28,
                                inputWidth: 110,
                                store: 'directory.ContractType'
                            }]
                        },{
                            xtype: 'datefield',
                            name: 'contract_date',
                            format: 'Y-m-d',
                            fieldLabel: 'Дата договора'
                        },{
                            xtype: 'datefield',
                            name: 'contract_end_date',
                            format: 'Y-m-d',
                            fieldLabel: 'Дата оконч. дог.'
                        },{
                            xtype: 'combobox',
                            fieldLabel: 'Вид права',
                            name: 'ownership_type',
                            autoSelect: true,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'id',
                            store: 'directory.OwnershipType'
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
	            },{//Tab панель данных
	            	xtype:'tabpanel',
	            	plain:true,
	            	defaults:{anchor: '100%',padding: '2 2 2 2',frame: true},
	            	items:[{
	            		/*Вкладка "Координаты"*/
	                	title: 'Координаты',
	                	itemId: 'objects_coordinates',
	                	layout: 'anchor',
	                	defaultType: 'textfield',
	                	defaults:{bodyPadding: 10,anchor: '100%',padding: '2 2 2 2',frame: true},
	                	items :[{
                            fieldLabel: 'Район',
                            name: 'district',
                            itemId: 'district',
                            xtype: 'combobox',
                            autoSelect: true,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'id',
                            store: 'directory.District'
                        },{
	                		fieldLabel: 'Город/н.п.',
	                		name: 'city',
                            itemId: 'city',
	                		xtype: 'combobox',
	                		autoSelect: true,
	                		queryMode: 'local',
	            			displayField: 'name',
	            			valueField: 'id',
	            			store: 'directory.City'
	            		},{
	                		fieldLabel: 'Микрорайон',
	                		name: 'microdistrict',
	                		itemId: 'microdistrict',
	                		xtype: 'combobox',
	                		autoSelect: true,
	                		queryMode: 'local',
	            			displayField: 'name',
	            			valueField: 'id',
	            			store: 'directory.Microdistrict'
	            		},{
	                    	xtype: 'fieldcontainer',
	                    	layout: 'hbox',
	                    	defaultType: 'textfield',
							defaults: {flex: 1},
	            			items:[
                            {
	                			fieldLabel: 'Улица',
                                labelWidth: 120,
	                			name: 'street',
                                itemId: 'street',
	                			xtype: 'combobox',
	                			autoSelect: true,
	                			queryMode: 'local',
	            				displayField: 'name',
	            				valueField: 'id',
                                flex: 2,
	            				store: 'directory.Street',
	                			margin: '0 10 0 0'
		            		},{
	                            fieldLabel: 'Дом',
	                            name: 'house_number',
	                            itemId: 'house_number',
                                labelWidth: 30,
                                maxLength: 10,
	                            margin: '0 10 0 0'
	                        },{
                                fieldLabel: 'Квартира',
                                name: 'house_apartment', 
                                itemId: 'house_apartment',
                                labelWidth: 60,
                                vtype: 'alphanum',
                                maxLength: 5,
                                margin: '0 10 0 0'
                            },{
                                xtype: 'numberfield',
		                        fieldLabel: 'Удаленность (км)',
		                        name: 'remoteness_center',
		                        minValue: 0,
		                        maxValue: 999999,
                                labelWidth: 110
	                        }]
                        },{
	                    	xtype: 'fieldcontainer',
	                    	layout: 'hbox',
	                    	defaultType: 'textfield',
							defaults: {flex: 1},
	            			items:[
                            {
	                			fieldLabel: 'Координаты Yandex',
                                labelWidth: 120,
	                			name: 'coordinates_label',
                                itemId: 'coordinates_label',
                                maxLength: 15,
                                flex: 4,
                                vtype: 'СoordinatesYandex',
	                			margin: '0 10 0 0'
		            		},{
                                iconCls: 'icon-coordinates',
                                xtype : 'button',
                                text: 'Получить',
                                margin: '0 10 0 0',
                                handler: function() {
                                    window.open('http://webmap-blog.ru/tools/getlonglat-ymap2.html','_blank','toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=0,width=700,height=600');
                                }
                            },{
	                			fieldLabel: 'Кадастровый номер',
                                labelWidth: 120,
	                			name: 'cadastre_number',
                                itemId: 'cadastre_number',
                                maxLength: 50,
                                flex: 4,
                                vtype: 'CadastreNumber',
	                			margin: '0 10 0 0'
		            		}]
                        }]
	                /*Вкладка "Descriptions" для жилой недвижимости*/
	        		},{
		                title: 'Описание',
		                itemId: 'objects_descriptions',
		                layout: 'anchor',
		                defaults:{anchor: '100%'},
		                defaultType: 'textfield',
		            	items :[{
                            xtype: 'htmleditor',
                            name: 'description',
                            fieldLabel: 'Описание: <br><br>Внимание! Проверь и убери лишние тэги, нажав на "Исходный код"',
                            maxLength: 6000,
                            height: 150,
                            itemId: 'description',
                            enableColors: false,
                            enableAlignments: false,
                            enableFont: false,
                            enableFontSize: false,
                            enableLinks: false,
                            listeners :  {
                                change: function (editor, newValue, oldValue )  {
                                    if  (newValue.length > editor.maxLength )  {
                                        editor.setValue(oldValue);
                                    }
                                }
                            }
                        }]
	        		},{
		                title: 'Характеристики объекта',
		                itemId: 'objects_info_residential',
		                layout: 'anchor',
		                defaults:{anchor: '100%'},
		                defaultType: 'textfield',
		            	items :[
		            	{
		                    xtype:'fieldset',
		                    //title: 'Характеристики',
		                    layout:'column',
                            fieldDefaults: {msgTarget: 'side',labelWidth: 95},
		                    defaults:{bodyPadding: 10,anchor: '100%',padding: '0 0 0 0',frame: true},
		                    items:[{
		                        columnWidth:.33,
		                        itemId:'features_residential',
		                        items: [
		                        {
	                                fieldLabel: 'Планировка',
	                                name: 'planishing',
	                                xtype: 'combobox',
                                    itemId: 'planishing',
	                                autoSelect: true,
	                                queryMode: 'local',
	                                displayField: 'name',
	                                valueField: 'id',
	                                store: 'directory.Planishing'
	                            },{
                                    fieldLabel: 'Распол. комнат',
                                    name: 'layout_rooms',
                                    xtype: 'combobox',
                                    itemId: 'layout_rooms',
                                    autoSelect: true,
                                    queryMode: 'local',
                                    displayField: 'name',
                                    valueField: 'id',
                                    store: 'directory.LayoutRooms'
                                },{
	                                fieldLabel: 'Отделка',
	                                name: 'refinishing',
	                                xtype: 'combobox',
	                                autoSelect: true,
	                                queryMode: 'local',
	                                displayField: 'name',
	                                valueField: 'id',
	                                store: 'directory.Refinishing'
	                            },{
	                                fieldLabel: 'Состояние',
	                                name: 'condition',
	                                xtype: 'combobox',
	                                autoSelect: true,
	                                queryMode: 'local',
	                                displayField: 'name',
	                                valueField: 'id',
	                                store: 'directory.Condition'
	                            },{
	                                fieldLabel: 'Пол',
	                                name: 'flooring',
                                    itemId: 'flooring',
	                                xtype: 'combobox',
	                                autoSelect: true,
	                                queryMode: 'local',
	                                displayField: 'name',
	                                valueField: 'id',
	                                store: 'directory.Flooring'
	                            },{
	                                fieldLabel: 'Окна',
	                                name: 'windows',
	                                xtype: 'combobox',
	                                itemId: 'windows',
                                    autoSelect: true,
	                                queryMode: 'local',
	                                displayField: 'name',
	                                valueField: 'id',
	                                store: 'directory.Windows'
	                            }]
	                        },{
                                columnWidth:.33,
                                items: [
                                {
                                    fieldLabel: 'Материал стен',
                                    name: 'material_walls',
                                    xtype: 'combobox',
                                    autoSelect: true,
                                    queryMode: 'local',
                                    displayField: 'name',
                                    valueField: 'id',
                                    store: 'directory.MaterialWalls'
                                },{
                                    fieldLabel: 'Отопление',
                                    name: 'heating',
                                    xtype: 'combobox',
                                    autoSelect: true,
                                    queryMode: 'local',
                                    displayField: 'name',
                                    valueField: 'id',
                                    store: 'directory.Heating'
                                },{
                                    fieldLabel: 'Горячая вода',
                                    name: 'hot_water',
                                    xtype: 'combobox',
                                    autoSelect: true,
                                    queryMode: 'local',
                                    displayField: 'name',
                                    valueField: 'id',
                                    store: 'directory.Heating'
                                },{
		                            fieldLabel: 'Санузел',
		                            name: 'bathroom',
		                            xtype: 'combobox',
		                            autoSelect: true,
		                            queryMode: 'local',
		                            displayField: 'name',
		                            valueField: 'id',
		                            store: 'directory.Bathroom'
		                        }]
                            },{
                                columnWidth:.33,
                                items: [
                                {
	                                fieldLabel: 'Балкон',
	                                name: 'balcony',
	                                xtype: 'combobox',
	                                autoSelect: true,
	                                queryMode: 'local',
	                                displayField: 'name',
	                                valueField: 'id',
	                                store: 'directory.Balcony'
	                            },{
	                                fieldLabel: 'Площадь балк.',
	                                xtype: 'numberfield',
	                                minValue: 0,
	                                maxValue: 9999,
	                                decimalPrecision : 2,
	                                name: 'balcony_space'
	                            },{
	                                xtype: 'checkboxfield',
	                                boxLabel: 'Земельный участок',
	                                name: 'landplot_property',
	                                inputValue: 'true',
	                                uncheckedValue: 'false'
	                            },{
	                                fieldLabel: 'Площадь уч.',
	                                xtype: 'numberfield',
	                                minValue: 0,
	                                maxValue: 999999,
	                                name: 'landplot_space'
	                            }]
                            }]
		            	}]
	        		},{
                        /*Вкладка "Дополнительно" для жилой недвижимости*/
	                	title: 'Дополнительно',
	                	layout: 'anchor',
	                	defaultType: 'textfield',
	                	itemId: 'objects_extend_residential',
	                	defaults:{bodyPadding: 10,anchor: '100%',padding: '5 5 5 5',frame: true},
	            		items :[
	            		{
	                        xtype: 'fieldcontainer',
	                        layout: 'hbox',
	                        itemId: 'flooring_windows',
	                        defaultType: 'textfield',
	                        defaults: {flex: 1},
	                        items:[{
		                		fieldLabel: 'Пол',
		                		name: 'flooring',
                                itemId: 'flooring_ext',
		                		xtype: 'combobox',
		                		autoSelect: true,
		                		queryMode: 'local',
		            			displayField: 'name',
		            			valueField: 'id',
		            			store: 'directory.Flooring',
                                margin: '0 20 0 0'
		            		},{
		                		fieldLabel: 'Окна',
		                		name: 'windows',
		                		itemId: 'windows_ext',
                                xtype: 'combobox',
		                		autoSelect: true,
		                		queryMode: 'local',
		            			displayField: 'name',
		            			valueField: 'id',
		            			store: 'directory.Windows'
		            	    }]
                        
                        },{
		                    xtype: 'fieldcontainer',
		                    layout: 'hbox',
		                    defaultType: 'textfield',
							defaults:{bodyPadding: 10,anchor: '100%',padding: '5 5 5 5',frame: true},
		            		items:[
		            		{
		                		fieldLabel: 'Высота потолка',
		                		xtype: 'numberfield',
		                		minValue: 0,
		            			maxValue: 10,
		            			decimalPrecision : 2,
		                		name: 'ceiling_height',
		                		inputWidth: 99,
		                		margin: '0 5 0 0'
		            		},{
		            			xtype: 'checkboxfield',
		            			boxLabel: 'Мусоропровод',
                                itemId: 'garbage_chute',
		            			name: 'garbage_chute',
		            			inputValue: 'true',
		   						uncheckedValue: 'false',
		   						margin: '0 5 0 0'
		        			},{
		            			xtype: 'checkboxfield',
		            			boxLabel: 'Прачечная',
                                itemId: 'laundry',
		            			name: 'laundry',
		            			inputValue: 'true',
		   						uncheckedValue: 'false',
		   						margin: '0 5 0 0'
		        			},{
		            			xtype: 'checkboxfield',
		            			boxLabel: 'Гараж',
		            			name: 'garage',
		            			inputValue: 'true',
		   						uncheckedValue: 'false',
		        			    margin: '0 5 0 0'
                            }]
	        			},{
                            fieldLabel: 'Имущество',
                            name: 'property',
                            maxLength: 120
                        },{
                            fieldLabel: 'Окружение',
                            name: 'environment',
                            maxLength: 150
                        },{   
		                    xtype: 'textfield',
						    name: 'tour3d',
						    fieldLabel: '3D тур',
						    vtype: 'url'
		                }]
	               	/*Вкладка "Описание объекта" коммерческая недвижимость*/
	               	},{
		                title: 'Характеристики объекта',
		                itemId: 'objects_info_commercial',
		                layout: 'anchor',
		                defaults:{anchor: '100%'},
		                defaultType: 'textfield',
		            	items :[
		            	{
                            xtype:'fieldset',
                            layout:'column',
                            fieldDefaults: {msgTarget: 'side',labelWidth: 100},
                            defaults:{hideEmptyLabel: false,bodyPadding: 10,anchor: '100%',padding: '5 5 5 5',frame: true},
                            items:[{
                                columnWidth:.33,
                                items: [
                                {
	                                fieldLabel: 'Отделка',
	                                name: 'refinishing',
	                                xtype: 'combobox',
	                                autoSelect: true,
	                                queryMode: 'local',
	                                displayField: 'name',
	                                valueField: 'id',
	                                store: 'directory.Refinishing'
	                            },{
	                                fieldLabel: 'Состояние',
	                                name: 'condition',
	                                xtype: 'combobox',
	                                autoSelect: true,
	                                queryMode: 'local',
	                                displayField: 'name',
	                                valueField: 'id',
	                                store: 'directory.Condition'
	                            },{
                                    fieldLabel: 'Материал стен',
                                    name: 'material_walls',
                                    xtype: 'combobox',
                                    autoSelect: true,
                                    queryMode: 'local',
                                    displayField: 'name',
                                    valueField: 'id',
                                    store: 'directory.MaterialWalls'
                                },{
                                    fieldLabel: 'Пол',
                                    name: 'flooring',
                                    xtype: 'combobox',
                                    autoSelect: true,
                                    queryMode: 'local',
                                    displayField: 'name',
                                    valueField: 'id',
                                    store: 'directory.Flooring'
                                }]
                            },{
                                columnWidth:.33,
                                items: [
                                {
                                    fieldLabel: 'Высота потолка',
                                    xtype: 'numberfield',
                                    minValue: 0,
                                    maxValue: 10,
                                    decimalPrecision : 2,
                                    name: 'ceiling_height'
                                },{
                                    fieldLabel: 'Окна',
                                    name: 'windows',
                                    xtype: 'combobox',
                                    autoSelect: true,
                                    queryMode: 'local',
                                    displayField: 'name',
                                    valueField: 'id',
                                    store: 'directory.Windows'
                                },{
                                    fieldLabel: 'Отопление',
                                    name: 'heating',
                                    xtype: 'combobox',
                                    autoSelect: true,
                                    queryMode: 'local',
                                    displayField: 'name',
                                    valueField: 'id',
                                    store: 'directory.Heating'
                                },{
	                                fieldLabel: 'Горячая вода',
	                                name: 'hot_water',
	                                xtype: 'combobox',
	                                autoSelect: true,
	                                queryMode: 'local',
	                                displayField: 'name',
	                                valueField: 'id',
	                                store: 'directory.Heating'
                                }]
                            },{
                                columnWidth:.33,
                                items: [
                                {
                                    xtype: 'checkboxfield',
                                    boxLabel: 'Выход на красную линию',
                                    name: 'access_redline',
                                    inputValue: 'true',
                                    uncheckedValue: 'false'
                                },{
								      fieldLabel: '', xtype: 'displayfield',value: '&nbsp;'
								},{
                                    xtype: 'checkboxfield',
                                    boxLabel: 'Земельный участок',
                                    name: 'landplot_property',
                                    inputValue: 'true',
                                    uncheckedValue: 'false'
                                },{
                                    fieldLabel: 'Площадь уч.',
                                    xtype: 'numberfield',
                                    minValue: 0,
                                    maxValue: 999999,
                                    decimalPrecision : 2,
                                    name: 'landplot_space'
                                }]
                            }]
		            	}]
		            /*Вкладка "Дополнительно" коммерческая недвижимость*/
	        		},{
	                	title: 'Дополнительно',
	                	layout: 'anchor',
	                	itemId: 'objects_extend_commercial',
	                	defaultType: 'textfield',
	                	defaults:{anchor: '100%'},
	            		items :[
	            		{
                            xtype:'fieldset',
                            layout:'column',
                            fieldDefaults: {msgTarget: 'side',labelWidth: 120},
                            defaults:{bodyPadding: 2,anchor: '100%',padding: '2 2 2 2',frame: true},
                            items:[
                            {
                                columnWidth:.25,
                                items: [
                                {
                                    xtype: 'checkboxfield',
                                    boxLabel: 'Пандус',
                                    name: 'rampant',
                                    inputValue: 'true',
                                    uncheckedValue: 'false'
                                },{
                                    fieldLabel: 'Кол-во зон загрузки',
                                    xtype: 'numberfield',
                                    minValue: 0,
                                    maxValue: 99,
                                    inputWidth: 70,
                                    name: 'number_loading_zones'
                                },{
                                    xtype: 'checkboxfield',
                                    boxLabel: 'Погрузочное оборудование',
                                    name: 'handling_equipment',
                                    inputValue: 'true',
                                    uncheckedValue: 'false'
                                }]
                            },{
                                columnWidth:.25,
                                items: [
                                {
                                    xtype: 'checkboxfield',
                                    boxLabel: 'Железнодорожная ветка',
                                    name: 'branch_line',
                                    inputValue: 'true',
                                    uncheckedValue: 'false'
                                },{
                                    xtype: 'checkboxfield',
                                    boxLabel: 'Парковка для легкового авт.',
                                    name: 'parking',
                                    inputValue: 'true',
                                    uncheckedValue: 'false'
                                },{
                                    xtype: 'checkboxfield',
                                    boxLabel: 'Площадка для маневрир. фур',
                                    name: 'area_maneuvering',
                                    inputValue: 'true',
                                    uncheckedValue: 'false'
                                }]
                            },{
                                columnWidth:.25,
                                items: [
                                {
                                    xtype: 'checkboxfield',
                                    boxLabel: 'Водопровод и канализация',
                                    name: 'sanitation',
                                    inputValue: 'true',
                                    uncheckedValue: 'false'
                                },{
                                    xtype: 'checkboxfield',
                                    boxLabel: 'Вентиляция',
                                    name: 'ventilation',
                                    inputValue: 'true',
                                    uncheckedValue: 'false'
                                },{
                                    fieldLabel: 'Эл. мощность (кВт)',
                                    xtype: 'numberfield',
                                    minValue: 0,
                                    maxValue: 99999,
                                    inputWidth: 70,
                                    name: 'electric_power'
                                }]
                            },{
                                columnWidth:.25,
                                items: [
                                {
                                    xtype: 'checkboxfield',
                                    boxLabel: 'Телефонная связь',
                                    name: 'telephone_communication',
                                    inputValue: 'true',
                                    uncheckedValue: 'false'
                                },{
                                    xtype: 'checkboxfield',
                                    boxLabel: 'Интернет',
                                    name: 'internet',
                                    inputValue: 'true',
                                    uncheckedValue: 'false'
                                },{
                                    xtype: 'checkboxfield',
                                    boxLabel: 'Система пожаротушения',
                                    name: 'firefighting',
                                    inputValue: 'true',
                                    uncheckedValue: 'false'
                                }]
                            }]
                        },{
                            fieldLabel: 'Имущество',
                            name: 'property',
                            maxLength: 120
                        },{
                            fieldLabel: 'Окружение',
                            name: 'environment',
                            maxLength: 150
                        }]
	               	},{
                        /*Вкладка "Описание объекта" земля*/
	                	title: 'Характеристики объекта',
	                	layout: 'anchor',
	                	itemId: 'objects_info_earth',
	                	defaultType: 'textfield',
	                	defaults:{bodyPadding: 2,anchor: '100%',padding: '2 2 2 2',frame: true},
	            		items :[
	            		{
	                		fieldLabel: 'Дорога',
	                		name: 'road',
	                		xtype: 'combobox',
	                		autoSelect: true,
	                		queryMode: 'local',
	            			displayField: 'name',
	            			valueField: 'id',
	            			store: 'directory.Road'
	            		},{
	                		fieldLabel: 'Зеленые насаждения',
	                		name: 'green_plantings',
	                		xtype: 'combobox',
	                		autoSelect: true,
	                		queryMode: 'local',
	            			displayField: 'name',
	            			valueField: 'id',
	            			store: 'directory.GreenPlantings'
	            		},{
	                		fieldLabel: 'Постройки',
	                		name: 'constructions',
	                		xtype: 'combobox',
	                		autoSelect: true,
	                		queryMode: 'local',
	            			displayField: 'name',
	            			valueField: 'id',
	            			store: 'directory.Constructions'
	            		},{
	                		fieldLabel: 'Ограждение',
	                		name: 'fencing',
	                		xtype: 'combobox',
	                		autoSelect: true,
	                		queryMode: 'local',
	            			displayField: 'name',
	            			valueField: 'id',
	            			store: 'directory.Fencing'
	            		},{
		                    xtype: 'fieldcontainer',
		                    layout: 'hbox',
		                    defaultType: 'textfield',
							defaults: {flex: 1,padding: '0 0 0 0'},
		            		items:[
		            		{
		            			xtype: 'checkboxfield',
		            			boxLabel: 'Газификация',
		            			name: 'gasification',
		            			inputValue: 'true',
		   						uncheckedValue: 'false'
		        			},{
		            			xtype: 'checkboxfield',
		            			boxLabel: 'Водопровод',
		            			name: 'plumbing',
		            			inputValue: 'true',
		   						uncheckedValue: 'false'
		        			},{
		            			xtype: 'checkboxfield',
		            			boxLabel: 'Скважина',
		            			name: 'well',
		            			inputValue: 'true',
		   						uncheckedValue: 'false'
		        			},{
		            			xtype: 'checkboxfield',
		            			boxLabel: 'Канализация',
		            			name: 'sewerage',
		            			inputValue: 'true',
		   						uncheckedValue: 'false'
		        			},{
		            			xtype: 'checkboxfield',
		            			boxLabel: 'Мелиорация',
		            			name: 'reclamation',
		            			inputValue: 'true',
		   						uncheckedValue: 'false'
		        			},{
		            			xtype: 'checkboxfield',
		            			boxLabel: 'Водоем',
		            			name: 'pond',
		            			inputValue: 'true',
		   						uncheckedValue: 'false'
		        			}]
	        			}]
	        		/*Вкладка "Описание объекта" готовый бизнес*/
	               	},{
	                	title: 'Характеристики объекта',
	                	layout: 'anchor',
	                	itemId: 'objects_info_business',
	                	defaultType: 'textfield',
	                	defaults:{bodyPadding: 10,anchor: '100%',padding: '5 5 5 5',frame: true},
	            		items :[
	            		{
                            xtype: 'textareafield',
                            fieldLabel: 'Ресурсы',
                            rows: 2,
                            name: 'resources',
                            maxLength: 120
                        },{
                            xtype: 'textareafield',
                            fieldLabel: 'Имущество',
                            rows: 1,
                            name: 'property',
                            maxLength: 120
                        }]
	               	},{
                        /*Вкладка "О строительстве"*/
                        title: 'О строительстве',
                        layout: 'anchor',
                        itemId: 'info_structure',
                        defaultType: 'textfield',
                        defaults:{bodyPadding: 10,anchor: '100%',padding: '5 5 5 5',frame: true},
                        items :[
                        {
                            xtype: 'combo',
                            fieldLabel: 'Стадия строительства',
                            labelWidth: 180,
                            store: [[false, 'строящийся'], [true, 'готовый']],
                            name: 'construction_stage',
                            value: true,
                            triggerAction: 'all',
                            editable: false
                        },{
                            xtype: 'combobox',
                            fieldLabel: 'Строительная организация',
                            name: 'construction_organization',
                            labelWidth: 180,
                            autoSelect: true,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'id',
                            store: 'directory.ConstructionOrganization'
                        },{
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaultType: 'textfield',
                            defaults: {flex: 1},
                            items:[
                            {
                                fieldLabel: 'Год постройки объекта',
                                xtype: 'numberfield',
                                name: 'year',
                                itemId: 'year',
                                labelWidth: 180,
                                minValue: 2000,
                                maxValue: 2099,
                                margin: '0 10 0 0'
                            },{
                                fieldLabel: 'Квартал сдачи',
                                xtype: 'numberfield',
                                name: 'quarter',
                                itemId: 'quarter',
                                labelWidth: 140,
                                minValue: 1,
                                maxValue: 4,
                                margin: '0 10 0 0'
                            }]
                        },{
							fieldLabel: 'Код новостройки Авито',
							labelWidth: 180,
							maxLength: 30,
							name: 'developmentid',
						}]
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
                                inputValue: 'true',
                                uncheckedValue: 'false'
                            },{
                                xtype: 'checkboxfield',
                                boxLabel: 'Выгрузка на Avito',
                                name: 'toll_resources',
                                itemId: 'toll_resources',
                                inputValue: 'true',
                                uncheckedValue: 'false'
                            },{
	                            xtype: 'checkboxfield',
	                            boxLabel: 'Горячее предлож.',
	                            name: 'hot_offer',
	                            inputValue: 'true',
                                itemId: 'hot_offer',
	                            uncheckedValue: 'false'
	                        },{
	                            xtype: 'checkboxfield',
	                            itemId: 'luxury_housing',
	                            boxLabel: 'Элитное жилье',
	                            name: 'luxury_housing',
	                            inputValue: 'true',
	                            uncheckedValue: 'false'
	                        }
                        ]
                    },{
	                	title: 'Комментарии',
	                	layout: 'anchor',
	                	itemId: 'objects_comment',
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
		            }]//end Tab items
        		}]//end all items
        }];
        this.buttons = [{
            iconCls: 'icon-save',
            itemId: 'orders_save',
            text: 'Сохранить',
            action: 'save'
        },{
            text: 'Отмена',
            action: 'cancel'
        }];
        this.callParent(arguments);
    }
});