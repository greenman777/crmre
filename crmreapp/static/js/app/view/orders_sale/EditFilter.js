Ext.define('CRMRE.view.orders_sale.EditFilter', {
    extend: 'Ext.window.Window',
    xtype: 'appOrdersSaleEditFilter',
    title: 'Выберите поля для фильтрации',
    width:650,
    layout: 'fit',
    resizable: false,
    closeAction: 'hide',
    modal : true,
    requires: [
        'Ext.ux.form.field.BoxSelect'
    ],
    initComponent: function() {
        this.items = [{
        	xtype: 'form',
        	layout: 'anchor',
            bodyStyle: {
                background: 'none',
                padding: '10px',
                border: '0'
            },
            defaults: {
                xtype: 'textfield',
                anchor: '100%'
            },
            fieldDefaults: {msgTarget: 'side',labelWidth: 140},
            items: [
            {
                xtype:'fieldset',
                title: 'Объект',
                collapsible: true,
                defaultType: 'textfield',
                layout: 'anchor',
                defaults: {anchor: '100%'},
                items :[
                {  
                    name: 'index',
                    fieldLabel: 'Номер заявки',
                    vtype: 'alphanum',
                    maxLength: 9
                },{
                    xtype: 'comboboxselect',
                    "multiSelect": false,
                    name : 'object_category',
                    fieldLabel: 'Категория объекта',
                    autoSelect: true,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    itemId: 'filter_object_category',
                    store: 'directory.ObjectCategory'
                },{
                    xtype: 'comboboxselect',
                    "multiSelect": false,
                    name : 'object_type',
                    fieldLabel: 'Тип объекта',
                    autoSelect: true,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    store: 'directory.ObjectType',
                    listeners: {
                        'expand': function(combo){
                            var object_category = combo.up('form').getValues().object_category;
                            store = combo.getStore();
                            store.clearFilter(true);
                            store.filter({ property: "object_category", value: object_category, exactMatch: true});
                        }
                    }
                    
                },{
	                xtype: 'fieldcontainer',
	                layout: 'hbox',
	                defaultType: 'textfield',
	                defaults: {flex: 1},
	                items:[{
                        xtype: 'comboboxselect',
                        "multiSelect": false,
                        fieldLabel: 'Тип договора',
                        name: 'contract_type',
                        autoSelect: true,
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        margin: '0 25 0 0',
                        store: 'directory.ContractType'
                    },{
                        xtype: 'checkboxfield',
                        labelWidth: 190,
                        fieldLabel: 'Заключен более 90 дней назад',
                        name: 'contract_old',
                        inputValue: true,
                        uncheckedValue: false,
                    }]
		        },{
	                xtype: 'comboboxselect',
	                "multiSelect": false,
	                fieldLabel: 'Тип сделки',
	                store: [[false, 'аренда'], [true, 'продажа']],
	                name: 'transaction_type',
	                triggerAction: 'all'
	            },{
                    xtype: 'numberfield',
                    fieldLabel: 'Заявки без действий в течении (дней)',
                    labelWidth: 240,
                    name: 'days_mod',
                    minValue: 0,
                    maxValue: 99999999,
                }]
            },{
                xtype:'fieldset',
                title: 'Адрес',
                collapsible: true,
                collapsed: true,
                defaultType: 'textfield',
                layout: 'anchor',
                defaults: {anchor: '100%'},
                items :[
                {
	                xtype: 'fieldcontainer',
	                layout: 'hbox',
	                defaultType: 'textfield',
	                defaults: {flex: 1},
	                items:[{
	                    xtype: 'comboboxselect',
	                    "multiSelect": false,
	                    fieldLabel: 'Район',
                        flex: 1.3,
                        margin: '0 5 0 0',
	                    name: 'district',
	                    autoSelect: true,
	                    queryMode: 'local',
	                    displayField: 'name',
	                    valueField: 'id',
	                    store: 'directory.District'
	                },{
		                xtype: 'comboboxselect',
		                "multiSelect": false,
		                fieldLabel: 'Город/н.п.',
		                name: 'city',
                        labelWidth: 70,
                        margin: '0 5 0 0',
		                autoSelect: true,
		                queryMode: 'local',
		                displayField: 'name',
		                valueField: 'id',
		                store: 'directory.City'
                    }]
		        },{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    defaults: {flex: 1},
                    items:[{
		                xtype: 'comboboxselect',
		                "multiSelect": false,
		                fieldLabel: 'Микрорайон',
		                name: 'microdistrict',
                        flex: 1.3,
                        margin: '0 5 0 0',
		                autoSelect: true,
		                queryMode: 'local',
		                displayField: 'name',
		                valueField: 'id',
		                store: 'directory.Microdistrict'
		            },{
		                xtype: 'comboboxselect',
		                "multiSelect": false,
		                fieldLabel: 'Улица',
		                name: 'street',
                        labelWidth: 70,
                        margin: '0 5 0 0',
		                autoSelect: true,
		                queryMode: 'local',
		                displayField: 'name',
		                valueField: 'id',
		                store: 'directory.Street'
                    }]
	            },{
                    fieldLabel: 'Дом №',
                    flex: 0.5,
                    name: 'house_number',
                    maxLength: 10
                }]
            },{
            	xtype: 'fieldcontainer',
            	layout: 'hbox',
            	defaultType: 'textfield',
            	defaults: {flex: 1},
    			items:[{   
	                xtype: 'numberfield',
	                fieldLabel: 'Цена (руб) от',
	                labelWidth: 150,
	                flex: 1.3,
	                name: 'price_from',
	                margin: '0 5 0 0',
	                minValue: 0,
	                maxValue: 99999999,
	                decimalPrecision : 2
    			},{   
	                xtype: 'numberfield',
	                fieldLabel: 'до',
	                name: 'price_to',
	                margin: '0 5 0 0',
	                labelWidth: 20,
	                minValue: 0,
	                maxValue: 99999999,
	                decimalPrecision : 2
    			}]
            },{
            	xtype: 'fieldcontainer',
            	layout: 'hbox',
            	defaultType: 'textfield',
            	defaults: {flex: 1},
    			items:[{   
	                xtype: 'numberfield',
	                fieldLabel: '<html>Общая площадь (м<sup>2</sup>) от</html>',
	                labelWidth: 150,
	                flex: 1.3,
	                name: 'space_from',
	                margin: '0 5 0 0',
	                minValue: 0,
	                maxValue: 1000,
	                decimalPrecision : 2
    			},{   
	                xtype: 'numberfield',
	                fieldLabel: 'до',
	                name: 'space_to',
	                margin: '0 5 0 0',
	                labelWidth: 20,
	                minValue: 0,
	                maxValue: 1000,
	                decimalPrecision : 2
    			}]
            },{
                fieldLabel: 'Кол-во комнат',
                xtype: 'numberfield',
                minValue: 0,
                maxValue: 50,
                name: 'number_rooms'
            },{
                xtype:'fieldset',
                title: 'Дополнительно',
                collapsible: true,
                collapsed: true,
                defaultType: 'textfield',
                layout: 'anchor',
                defaults: {anchor: '100%'},
                items :[{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    defaults: {flex: 1},
                    items:[{   
                        xtype: 'checkboxfield',
                        fieldLabel: 'Этаж, кроме первого',
                        name: 'floor_no_first',
                        inputValue: true,
                        uncheckedValue: false,
                        margin: '0 5 0 0'
                    },{   
                        xtype: 'checkboxfield',
                        fieldLabel: 'кроме последнего',
                        name: 'floor_no_last',
                        inputValue: true,
                        uncheckedValue: false,
                        margin: '0 5 0 0'
                    }]
                },{
	            	xtype: 'fieldcontainer',
	            	layout: 'hbox',
	            	defaultType: 'textfield',
	            	defaults: {flex: 1},
	    			items:[{   
		                xtype: 'numberfield',
		                fieldLabel: '<html>Жилая площадь (м<sup>2</sup>) от</html>',
		                flex: 1.3,
		                name: 'space_living_from',
		                margin: '0 5 0 0',
		                minValue: 0,
		                maxValue: 9999,
		                decimalPrecision : 2
	    			},{   
		                xtype: 'numberfield',
		                fieldLabel: 'до',
		                name: 'space_living_to',
		                margin: '0 5 0 0',
		                labelWidth: 20,
		                minValue: 0,
		                maxValue: 9999,
		                decimalPrecision : 2
	    			}]
	            },{
	            	xtype: 'fieldcontainer',
	            	layout: 'hbox',
	            	defaultType: 'textfield',
	            	defaults: {flex: 1},
	    			items:[{   
		                xtype: 'numberfield',
		                fieldLabel: '<html>Площадь кухни (м<sup>2</sup>) от</html>',
		                flex: 1.3,
		                name: 'space_kitchen_from',
		                margin: '0 5 0 0',
		                minValue: 0,
		                maxValue: 9999,
		                decimalPrecision : 2
	    			},{   
		                xtype: 'numberfield',
		                fieldLabel: 'до',
		                name: 'space_kitchen_to',
		                margin: '0 5 0 0',
		                labelWidth: 20,
		                minValue: 0,
		                maxValue: 9999,
		                decimalPrecision : 2
	    			}]
	            },{
                	xtype: 'fieldcontainer',
                	layout: 'hbox',
                	defaultType: 'textfield',
        			items:[{
	                    fieldLabel: 'Планировка',
	                    name: 'planishing',
	                    flex: 1.3,
	                    xtype: 'comboboxselect',
	                    "multiSelect": false,
	                    queryMode: 'local',
	                    margin: '0 5 0 0',
	                    displayField: 'name',
	                    valueField: 'id',
	                    store: 'directory.Planishing'
	                },{
	                    fieldLabel: 'Санузел',
	                    name: 'bathroom',
	                    flex: 1,
	                    xtype: 'comboboxselect',
	                    "multiSelect": false,
	                    labelWidth: 65,
                        margin: '0 5 0 0',
	                    queryMode: 'local',
	                    displayField: 'name',
	                    valueField: 'id',
	                    store: 'directory.Bathroom'
	                }]
                },{
                	xtype: 'fieldcontainer',
                	layout: 'hbox',
                	defaultType: 'textfield',
        			items:[{
	                    fieldLabel: 'Материал стен',
	                    name: 'material_walls',
	                    xtype: 'comboboxselect',
	                    flex: 1.3,
	                    "multiSelect": false,
	                    margin: '0 5 0 0',
	                    queryMode: 'local',
	                    displayField: 'name',
	                    valueField: 'id',
	                    store: 'directory.MaterialWalls'
	                },{
	                    fieldLabel: 'Состояние',
	                    name: 'condition',
	                    xtype: 'comboboxselect',
	                    flex: 1,
	                    labelWidth: 65,
                        margin: '0 5 0 0',
	                    "multiSelect": false,
	                    queryMode: 'local',
	                    displayField: 'name',
	                    valueField: 'id',
	                    store: 'directory.Condition'
	                }]
                }]
            },{
                xtype:'fieldset',
                title: 'Клиент',
                collapsible: true,
                collapsed: true,
                defaultType: 'textfield',
                layout: 'anchor',
                defaults: {anchor: '100%'},
                items :[
                {
                    name: 'client_index',
                    fieldLabel: 'Номер клиента',
                    vtype: 'alphanum',
                    maxLength: 9
                },{
	                xtype: 'fieldcontainer',
	                layout: 'hbox',
	                defaultType: 'textfield',
	                defaults: {flex: 1},
	                items:[
	                {
                        name: 'client_name',
                        flex: 2.5,
                        fieldLabel: 'Имя клиента',
                        margin: '0 5 0 0',
                        maxLength: 100
                    },{
                        name: 'phone_main',
                        labelWidth: 65,
                        fieldLabel: 'Телефон',
                        vtype: 'alphanum',
                        maxLength: 11
                    }]
		        },{
	                xtype: 'fieldcontainer',
	                layout: 'hbox',
	                defaultType: 'textfield',
	                defaults: {flex: 1},
	                items:[
	                {
                        name: 'represent',
                        flex: 2.5,
                        fieldLabel: 'Имя представителя',
                        margin: '0 5 0 0',
                        maxLength: 80
                    },{
                        name: 'phone_represent',
                        labelWidth: 65,
                        fieldLabel: 'Телефон',
                        vtype: 'alphanum',
                        maxLength: 11
                    }]
		        },{
                    xtype: 'combobox',
                    name : 'info_source',
                    autoSelect: true,
                    editable: false,
                    forceSelection:true,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    fieldLabel: 'Источник информации',
                    store: 'directory.InfoSource'
                },{
                    xtype: 'checkboxfield',
                    boxLabel: 'VIP клиент',
                    name: 'vip',
                    inputValue: true,
                    uncheckedValue: false
                }]
            },{
                xtype:'fieldset',
                title: 'Служебные',
                collapsible: true,
                collapsed: true,
                defaultType: 'textfield',
                layout: 'anchor',
                defaults: {anchor: '100%'},
                items :[{
                    xtype: 'comboboxselect',
                    "multiSelect": false,
                    fieldLabel: 'Статус',
                    name: 'status',
                    autoSelect: true,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    store: 'directory.OrderStatus'
                },{
                    xtype: 'comboboxselect',
                    "multiSelect": false,
                    fieldLabel: 'Исполнитель',
                    name: 'performer',
                    autoSelect: true,
                    queryMode: 'local',
                    labelTpl: "{last_name} {first_name}",
                    displayField: 'last_name',
                    listConfig: {
                        getInnerTpl: function(){
                            return '{last_name} {first_name}';
                        }
                    },
                    valueField: 'id',
                    store: 'Users'
                },{
                    xtype: 'comboboxselect',
                    "multiSelect": false,
                    fieldLabel: 'Заявка от',
                    name: 'author',
                    autoSelect: true,
                    queryMode: 'local',
                    labelTpl: "{last_name} {first_name}",
                    displayField: 'last_name',
                    listConfig: {
                        getInnerTpl: function(){
                            return '{last_name} {first_name}';
                        }
                    },
                    valueField: 'id',
                    store: 'Users'
                }]
            }]
        }];
        this.buttons = [{
            iconCls: 'icon-filter',
        	text: 'Применить',
            action: 'filter'
        },{
            text: 'Сбросить',
            handler: function () { this.up('window').down('form').getForm().reset(); }
        },
        {
            text: 'Отмена',
            handler: function () { this.up('window').close(); }
        }];
        this.callParent(arguments);
    }
});