Ext.apply(Ext.form.field.VTypes, {
        СoordinatesYandex: function (value) {
          return /^\d[\d.,]*$/.test(value);
        },
        СoordinatesYandexText: 'Допустимая форма ввода: 56.3784,44.0048'
});
Ext.define('CRMRE.view.buildings.BuildingsEdit', {
    extend: 'Ext.window.Window',
    xtype: 'appBuildingsEdit',
    modal : true,
    title: "Изменение новостройки",
    width:850,
    initComponent: function() {
        this.items = [{
        	xtype: 'form',
        	frame: true,
        	header: false,
        	defaults: {anchor: '100%',padding: '5 5 5 5'},
        	fieldDefaults: {
            	msgTarget: 'side',labelWidth: 140},
            items: [
            {	xtype: 'combobox',name : 'id',hidden:true},
            {   xtype: 'textfield',name : 'index',hidden:true},
	        {
            	xtype:'fieldset',
            	title: 'Основная информация',
            	collapsible: true,
            	defaultType: 'textfield',
            	layout: 'anchor',
            	defaults: {anchor: '100%',padding: '5 5 5 5'},
            	items :[
            	{   
                    fieldLabel: 'Название',
                    name: 'heading',
                    itemId: 'heading',
                    maxLength: 80,
                    allowBlank:false,
                },{ 
		            xtype: 'htmleditor',
	                name: 'description',
	                fieldLabel: 'Описание',
	                maxLength: 6000,
	                height: 200,
                    itemId: 'description',
                    listeners :  { 
					    change: function (editor, newValue, oldValue )  { 
					        if  (newValue.length > editor.maxLength )  { 
					            editor.setValue(oldValue); 
					        } 
					    } 
					}
                },{
	                xtype: 'comboboxselect',
	                "multiSelect": false,
	                fieldLabel: 'Жилой комплекс',
	                name: 'residential_complex',
	                autoSelect: true,
	                queryMode: 'local',
	                displayField: 'name',
	                valueField: 'id',
	                store: 'directory.ResidentialComplex'
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
	            }]
        	},{
            	xtype:'tabpanel',
                plain:true,
                defaults:{anchor: '100%',padding: '5 5 5 5',frame: true},
            	items:[
            	{
            		/*Вкладка "Координаты"*/
                	title: 'Координаты',
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
                            labelWidth: 140,
                			name: 'street',
                            itemId: 'street',
                			xtype: 'combobox',
                			autoSelect: true,
                			queryMode: 'local',
            				displayField: 'name',
            				valueField: 'id',
                            flex: 3.5,
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
                            fieldLabel: 'Этажей',
                            xtype: 'numberfield',
                            labelWidth: 50,
                            itemId: 'floors',
                            minValue: 0,
                            maxValue: 150,
                            name: 'floors',
                            margin: '0 10 0 0'
                        },{
                            fieldLabel: 'Подъездов',
                            xtype: 'numberfield',
                            labelWidth: 70,
                            itemId: 'number_entrances',
                            minValue: 0,
                            maxValue: 15,
                            name: 'number_entrances'
                        }]
                    },{
						xtype: 'fieldcontainer',
						layout: 'hbox',
						defaultType: 'textfield',
						defaults: {flex: 1},
						items:[
						{
							fieldLabel: 'Координаты Yandex',
							name: 'coordinates_label',
							itemId: 'coordinates_label',
							maxLength: 15,
							flex: 6,
							vtype: 'СoordinatesYandex',
							margin: '0 10 0 0'
						},{
							iconCls: 'icon-coordinates',
							xtype : 'button',
							text: 'Получить',
							handler: function() {
								window.open('http://webmap-blog.ru/tools/getlonglat-ymap2.html','_blank','toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=0,width=700,height=600');
							}
						}]
					}]
        		},{
                    /*Вкладка "О строительстве"*/
                    title: 'О строительстве',
                    layout: 'anchor',
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
                    	xtype: 'fieldcontainer',
                    	layout: 'hbox',
                    	defaultType: 'textfield',
						defaults: {flex: 1},
            			items:[
						{
							xtype: 'textfield',
							name: 'contract_number',
							fieldLabel: '№ договора',
							labelWidth: 100,
							inputWidth: 70,
							maxLength: 20,
							margin: '0 10 0 0'
                        },{
                            xtype: 'datefield',
                            name: 'contract_date',
                            format: 'Y-m-d',
                            fieldLabel: 'Дата договора',
							labelWidth: 90,
							inputWidth: 80,
							margin: '0 10 0 0'
                        },{
							xtype: 'numberfield',
							fieldLabel: '% комиссии',
							name: 'commission',
							minValue: 0,
							maxValue: 999999,
							decimalPrecision : 2,
							labelWidth: 75,
							inputWidth: 50,
							margin: '0 10 0 0'
						},{
							fieldLabel: 'Код Авито',
							labelWidth: 80,
							maxLength: 30,
							inputWidth: 80,
							name: 'developmentid'
						}]
                    }]
                },{
	                title: 'Описание объекта',
	                layout: 'anchor',
	                defaults:{anchor: '100%'},
	                defaultType: 'textfield',
	            	items :[
	            	{
                        xtype: 'combobox',
                        fieldLabel: 'Материал стен',
                        name: 'material_walls',
                        autoSelect: true,
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        labelWidth: 180,
                        store: 'directory.MaterialWalls'
                    },{   
		                fieldLabel: 'Назначение объекта',
		                name: 'purpose',
		                itemId: 'purpose',
		                labelWidth: 180,
		                maxLength: 500,
		            },{   
		                fieldLabel: 'Технология строительства',
		                name: 'technology',
		                itemId: 'technology',
		                labelWidth: 180,
		                maxLength: 500,
		            },{   
		                fieldLabel: 'Отделка',
		                name: 'finish',
		                itemId: 'finish',
		                labelWidth: 180,
		                maxLength: 1000,
		            }]
        		},{
	                title: 'Дополнительно',
	                layout: 'anchor',
	                defaults:{anchor: '100%'},
	                defaultType: 'textfield',
	            	items :[
	            	{   
		                fieldLabel: 'Коммуникации',
		                name: 'communication',
		                itemId: 'communication',
		                labelWidth: 240,
		                maxLength: 500,
		            },{   
		                fieldLabel: 'Траспортная и пешеходная доступность',
		                name: 'accessibility',
		                itemId: 'accessibility',
		                labelWidth: 240,
		                maxLength: 500,
		            },{   
		                fieldLabel: 'Инфраструктура района',
		                name: 'infrastructure',
		                itemId: 'infrastructure',
		                labelWidth: 240,
		                maxLength: 500,
		            },{   
		                fieldLabel: 'Особенности',
		                name: 'features',
		                itemId: 'features',
		                labelWidth: 240,
		                maxLength: 500,
		            }]
        		},{
	                title: 'Служебные',
	                layout: 'anchor',
	                defaults:{anchor: '100%'},
	                defaultType: 'textfield',
	            	items :[
	            	{   
	                    xtype: 'textfield',
					    name: 'tour3d',
					    fieldLabel: '3D тур',
					    vtype: 'url',
					    labelWidth: 100,
	                },{
		                fieldLabel: 'Подпись 1',
		                name: 'caption1',
		                itemId: 'caption1',
		                labelWidth: 100,
		                maxLength: 50,
		            },{   
		                fieldLabel: 'Подпись 2',
		                name: 'caption2',
		                itemId: 'caption2',
		                labelWidth: 100,
		                maxLength: 50,
		            },{
                    	xtype: 'container',
                    	defaults:{bodyPadding: 10,anchor: '100%',padding: '2 2 2 2',frame: true},
                    	layout: 'hbox',
                    	defaultType: 'textfield',
	            			items:[{
	                        xtype: 'checkboxfield',
	                        boxLabel: 'Печать 1',
	                        name: 'stamp1',
	                        inputValue: 'true',
	                        margin: '0 40 0 0',
	                        uncheckedValue: 'false'
	                    },{
	                        xtype: 'checkboxfield',
	                        boxLabel: 'Печать 2',
	                        name: 'stamp2',
	                        inputValue: 'true',
	                        margin: '0 40 0 0',
	                        uncheckedValue: 'false'
	                    },{
	                        xtype: 'checkboxfield',
	                        boxLabel: 'Горячее предложение',
	                        name: 'hot_offer',
	                        inputValue: 'true',
	                        margin: '0 40 0 0',
	                        uncheckedValue: 'false'
	                    },{
	                        xtype: 'numberfield',
	                        fieldLabel: 'Приоритет',
	                        name: 'priority',
	                        minValue: 0,
	                        maxValue: 20,
	                        labelWidth: 70,
							margin: '0 10 0 0'
	                    },{
							xtype: 'numberfield',
							fieldLabel: 'Доступно квартир',
							name: 'apartments',
							minValue: 0,
							maxValue: 9999,
							labelWidth: 75,
							inputWidth: 50
						}]
                    }]
        		},{
	                title: 'Реклама',
	                layout: 'anchor',
	                defaults:{anchor: '100%'},
	                defaultType: 'textfield',
	            	items :[
	            	{
		                fieldLabel: 'Реклама 1',
		                name: 'reclame1',
		                itemId: 'reclame1',
		                labelWidth: 100,
		                maxLength: 90,
		            },{
		                fieldLabel: 'Реклама 2',
		                name: 'reclame2',
		                itemId: 'reclame2',
		                labelWidth: 100,
		                maxLength: 90,
		            },{
		                fieldLabel: 'Реклама 3',
		                name: 'reclame3',
		                itemId: 'reclame3',
		                labelWidth: 100,
		                maxLength: 90,
		            }]
        		},]
        	}]
        }];
        this.buttons = [{
            iconCls: 'icon-save',
            itemId: 'building_save',
        	text: 'Сохранить',
            action: 'save'
        },{
        	text: 'Выход',
            action: 'cancel'
        }];
        this.callParent(arguments);
    }
});