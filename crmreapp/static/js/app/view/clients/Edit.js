Ext.define('CRMRE.view.clients.Edit', {
    extend: 'Ext.window.Window',
    xtype: 'appClientsEdit',
    store: ['Clients'],
    modal : true,
    width:700,
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
            {   xtype: 'textfield',name: 'is_client',hidden:true},
            {   xtype: 'datefield',name: 'create_date',format: 'Y-m-d',hidden: true},
            {   xtype: 'combobox', name: 'author',hidden: true},
  			{
				xtype: 'combo',
				fieldLabel: 'Тип клиента',
				store: [[true, 'физическое лицо'], [false, 'юридическое лицо']],
				name: 'client_type',
				triggerAction: 'all',
				editable: false,
				listeners:{
					change:{
						fn:function(combo, newValue, oldValue, eOpts) {
							if (newValue) {
								
								combo.up('form').down('#fullname_gen').setVisible(true);
					            combo.up('form').down('#occupation').setVisible(true);
					            combo.up('form').down('#tabpanel_clients').child('#passport_details').tab.show();
					    		combo.up('form').down('#sphere').setVisible(false);
					    		combo.up('form').down('#tabpanel_clients').child('#bank_details').tab.hide();
					    		combo.up('form').down('#tabpanel_clients').child('#director_details').tab.hide();
					    		
					    		combo.up('form').down('#tabpanel_clients').setActiveTab(combo.up('form').down('#passport_details'));
							} else {
								combo.up('form').down('#sphere').setVisible(true);
								combo.up('form').down('#tabpanel_clients').child('#bank_details').tab.show();
								combo.up('form').down('#tabpanel_clients').child('#director_details').tab.show();
								
								combo.up('form').down('#fullname_gen').setVisible(false);
					            combo.up('form').down('#occupation').setVisible(false);
					    		combo.up('form').down('#tabpanel_clients').child('#passport_details').tab.hide();
					    		
					    		combo.up('form').down('#tabpanel_clients').setActiveTab(combo.up('form').down('#bank_details'));
							}
						}
					}
				}
	        },{	
            	xtype:'fieldset',
            	collapsible: true,
            	title: 'Информация о представителе',
            	defaultType: 'textfield',
            	layout: 'anchor',
            	defaults: {
            		anchor: '100%',
            		padding: '5 5 5 5'
        		},
            	items :[{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    defaults: {
                        flex: 1
                    },
                    items:[
	                {	
	                    fieldLabel: 'Представитель',
                        labelWidth: 90,
	                    name: 'represent',
	                    maxLength: 80,
                        margin: '0 5 0 0',
	                    allowBlank:false
	                },{	
	                    fieldLabel: 'Телефон представителя',
                        labelWidth: 150,
	                    name: 'phone_represent',
	                    maxLength: 11,
	                    vtype: 'alphanum',
	                    allowBlank:false
	                }]
                }]
        	},{
            	xtype:'fieldset',
            	title: 'Основная информация',
            	collapsible: true,
            	defaultType: 'textfield',
            	layout: 'anchor',
            	defaults: {anchor: '100%',padding: '5 5 5 5'},
            	items :[
            	{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    defaults: {flex: 1,labelAlign: 'top'},
                    items:[
                    {   
	                    fieldLabel: 'Клиент',
	                    name: 'client_name',
	                    itemId: 'client_name',
	                    maxLength: 100,
                        margin: '0 5 0 0'
	                },{ 
	                    fieldLabel: 'ФИО в родит. пад.',
	                    name: 'fullname_gen',
	                    itemId: 'fullname_gen',
	                    maxLength: 100
	                }]
                },{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaultType: 'textfield',
					defaults: {flex: 1,labelAlign: 'top'},
            		items:[{
                		fieldLabel: 'Основной телефон',
                		name: 'phone_main',
                        maxLength: 11,
                        vtype: 'alphanum',
                		margin: '0 5 0 0'
            		},{
                		fieldLabel: 'Дополнительный телефон',
                		name: 'phone_additional',
                        maxLength: 11,
                        vtype: 'alphanum',
                		margin: '0 5 0 0'
            		},{
                		fieldLabel: 'Факс',
                		name: 'fax',
                        maxLength: 11,
                        vtype: 'alphanum'
            		}]
                },{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    defaults: {flex: 1,labelAlign: 'top'},
                    items:[
                    {
	                    fieldLabel: 'Адрес регистрации',
	                    name: 'address_registr',
	                    maxLength: 150,
                        margin: '0 5 0 0'
	                },{
	                    fieldLabel: 'Адрес фактический',
	                    name: 'address_actual',
	                    maxLength: 150
	                }
                    ]
                },{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaultType: 'textfield',
					defaults: {
            			flex: 1,
            			labelAlign: 'top'
        			},
            		items:[{
            			
                		fieldLabel: 'E-mail',
                		name: 'email',
                		margin: '0 5 0 0',
                        vtype: 'email'
            		},{
                		fieldLabel: 'Веб сайт',
                		name: 'www',
                        vtype: 'url'
            		}]
                },{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    defaults: {
                        flex: 1
                    },
                    items:[{
                    xtype: 'checkboxfield',
                    boxLabel: 'VIP клиент',
                    name: 'vip',
                    inputValue: true,
                    uncheckedValue: false
	                },{
	                    xtype: 'combobox',
	                    fieldLabel: 'Род занятий',
                        labelWidth: 90,
	                    name : 'occupation',
	                    itemId: 'occupation',
	                    autoSelect: true,
	                    editable: false,
	                    forceSelection:true,
	                    queryMode: 'local',
	                    displayField: 'name',
	                    valueField: 'id',
	                    store: 'directory.Occupation'
	                },{
	                    xtype: 'combobox',
	                    fieldLabel: 'Сфера деятельности',
                        labelWidth: 130,
	                    name : 'sphere',
	                    itemId: 'sphere',
	                    autoSelect: true,
	                    editable: false,
	                    forceSelection:true,
	                    queryMode: 'local',
	                    displayField: 'name',
	                    valueField: 'id',
	                    store: 'directory.Sphere',
                        listConfig: {
			                getInnerTpl: function(){
			                return '{name}<hr />';
			                }
                        }
	                }]
                }]
        	},{
            	xtype:'tabpanel',
                plain:true,
                itemId: 'tabpanel_clients',
                defaults:{anchor: '100%',padding: '5 5 5 5',frame: true},
            	items:[{
                	title: 'Банковские реквизиты',
                	itemId:'bank_details',
                	layout: 'anchor',
                	defaults:{
                		bodyPadding: 10,
                		anchor: '100%',
            			padding: '5 5 5 5'
            		},
                	defaultType: 'textfield',
            		items :[{
	                    xtype: 'fieldcontainer',
	                    layout: 'hbox',
	                    defaultType: 'textfield',
	                    defaults: {
	                        flex: 1,
	                        labelWidth: 65,
	                    },
	                    items:[{
	                        fieldLabel: 'ИНН',
	                        name: 'inn',
	                        vtype: 'alphanum',
	                        maxLength: 12,
	                        margin: '0 10 0 0'
	                    },{
                            fieldLabel: 'КПП',
                            name: 'kpp',
                            vtype: 'alphanum',
                            maxLength: 9
                        }]
	                },{
	                    xtype: 'fieldcontainer',
	                    layout: 'hbox',
	                    defaultType: 'textfield',
	                    defaults: {
	                        flex: 1,
	                        labelWidth: 65,
	                    },
	                    items:[{
	                        fieldLabel: 'Расч. счет',
                			name: 'set_account',
                        	vtype: 'alphanum',
                        	maxLength: 20,
                        	margin: '0 10 0 0'
	                    },{
                            fieldLabel: 'БИК',
                			name: 'bik',
                        	vtype: 'alphanum',
                        	maxLength: 9
                        }]
	                },{
	                    xtype: 'fieldcontainer',
	                    layout: 'hbox',
	                    defaultType: 'textfield',
	                    defaults: {
	                        flex: 1,
	                        labelWidth: 65,
	                    },
	                    items:[{
	                        fieldLabel: 'Кор.счет',
	                		name: 'kor_account',
	                        vtype: 'alphanum',
	                        maxLength: 20,
	                        margin: '0 10 0 0'
	                    },{
	                        fieldLabel: 'В банке',
	                		name: 'bank',
	                        maxLength: 100
                        }]
	                }]
        	},{
                	title: 'Паспортные данные',
                	itemId: 'passport_details',
                	layout: 'anchor',
                	defaults:{
                		bodyPadding: 10,
                		anchor: '100%',
            			padding: '5 5 5 5'
            		},
                	defaultType: 'textfield',
            		items :[{
                    	xtype: 'fieldcontainer',
                    	layout: 'hbox',
                    	defaultType: 'textfield',
						defaults: {
            				flex: 1,
            				labelAlign: 'top'
        				},
            			items:[{
                			fieldLabel: 'Серия',
                			name: 'passport_series',
                            vtype: 'alphanum',
                            maxLength: 4,
                			margin: '0 5 0 0'
            			},{
                			fieldLabel: 'Номер',
                			name: 'passport_number',
                            vtype: 'alphanum',
                            maxLength: 6
            			}
	            		]},{
	                		fieldLabel: 'Выдан',
	                		name: 'output_place',
	                        maxLength: 150
	            		},{
	            			xtype: 'datefield',
	            			format: 'Y-m-d',
	                		fieldLabel: 'Дата выдачи',
	                		name: 'date_issue'
	            		}]
	        	},{
	                title: 'Руководитель',
	                itemId: 'director_details',
	                layout: 'anchor',
	                defaults:{
	                	bodyPadding: 10,
	                	anchor: '100%',
	            		padding: '5 5 5 5'
	            		},
	                defaultType: 'textfield',
	            	items :[
	            	{
	                	fieldLabel: 'ФИО',
	                	name: 'position_name_im',
	                    maxLength: 100
	            	},{
	                	fieldLabel: 'ФИО в род.пад.',
	                	name: 'position_name_gen',
	                    maxLength: 100
	            	},
                    {
                        fieldLabel: 'Должность',
                        name: 'position',
                        maxLength: 50
                    },
	            	{
	                    xtype: 'fieldcontainer',
	                    layout: 'hbox',
	                    defaultType: 'textfield',
						defaults: {
	            			flex: 1,
	            			labelAlign: 'top'
	        			},
	            		items:[{
	            			
	                		fieldLabel: 'Телефон',
	                		name: 'phone_head',
	                        vtype: 'alphanum',
	                        maxLength: 11,
	                		margin: '0 5 0 0'
	            		},{
	                		fieldLabel: 'E-mail',
	                		name: 'email_head',
	                        vtype: 'email'
	            		}
	            	]}
	            	
	            	]
	        	},{
	                title: 'Личная информация',
	                layout: 'anchor',
	                defaults:{
	                	bodyPadding: 10,
	                	anchor: '100%',
	            		padding: '5 5 5 5'
	            		},
	                defaultType: 'textfield',
	            	items :[
	            	{
	            		xtype: 'datefield',
	            		format: 'Y-m-d',
	                	fieldLabel: 'Дата рождения',
	                	name: 'date_birth'
	            	},{
						xtype: 'combo',
						fieldLabel: 'Семейное положение',
	  					store: [[true, 'женат/замужем'], [false, 'холост/не замужем']],
	  					name: 'marital_status',
	  					triggerAction: 'all',
	  					editable: false
	            	},{
	                 	xtype: 'numberfield',
	                 	name : 'children_num',
	                 	fieldLabel: 'Количество детей',
                        editable: false,
	                    width: 50,
	                    maxValue: 10,
	        			minValue: 0,
	     				value: 0
	                },{
	                    xtype: 'fieldcontainer',
	                    layout: 'hbox',
	                    defaultType: 'textfield',
						defaults: {
	            			flex: 1,
	            			labelAlign: 'top'
	        			},
	            		items:[{
	                		fieldLabel: 'ICQ',
	                		name: 'icq',
	                        vtype: 'alphanum',
	                        maxLength: 14,
	                		margin: '0 5 0 0'
	            		},{
	                		fieldLabel: 'VK',
	                		name: 'vk',
	                        vtype: 'url',
	                		margin: '0 5 0 0'
	            		},{
	                		fieldLabel: 'Facebook',
	                		name: 'fb',
	                        vtype: 'url'
	            		}
	            	]}]
	        	},{
	                title: 'Рассылка',
	                layout:'column',
                    defaults:{bodyPadding: 10,anchor: '100%',padding: '5 5 5 5',frame: true},
                    //defaultType: 'checkboxfield',
		            items:[{
		                columnWidth:.5,
		                items: [{
		                    xtype: 'checkboxfield',
		                    boxLabel: 'Рассылка по E-mail 1',
		                    name: 'pkg_email_1',
                            value: true,
		                    inputValue: true,
		                    uncheckedValue: false
                        },{
                            xtype: 'checkboxfield',
                            boxLabel: 'Рассылка по E-mail 2',
                            name: 'pkg_email_2',
                            inputValue: true,
                            uncheckedValue: false
                        },{
                            xtype: 'checkboxfield',
                            boxLabel: 'Рассылка по E-mail 3',
                            name: 'pkg_email_3',
                            inputValue: true,
                            uncheckedValue: false
                        },{
                            xtype: 'checkboxfield',
                            boxLabel: 'Рассылка по E-mail 4',
                            name: 'pkg_email_4',
                            inputValue: true,
                            uncheckedValue: false
                        },{
                            xtype: 'checkboxfield',
                            boxLabel: 'Рассылка по E-mail 5',
                            name: 'pkg_email_5',
                            inputValue: true,
                            uncheckedValue: false
                        }]
		            },{
		                columnWidth:.5,
		                items: [{
                            xtype: 'checkboxfield',
                            boxLabel: 'Рассылка по SMS 1',
                            name: 'pkg_sms_1',
                            value: true,
                            inputValue: true,
                            uncheckedValue: false
                        },{
                            xtype: 'checkboxfield',
                            boxLabel: 'Рассылка по SMS 2',
                            name: 'pkg_sms_2',
                            inputValue: true,
                            uncheckedValue: false
                        },{
                            xtype: 'checkboxfield',
                            boxLabel: 'Рассылка по SMS 3',
                            name: 'pkg_sms_3',
                            inputValue: true,
                            uncheckedValue: false
                        },{
                            xtype: 'checkboxfield',
                            boxLabel: 'Рассылка по SMS 4',
                            name: 'pkg_sms_4',
                            inputValue: true,
                            uncheckedValue: false
                        },{
                            xtype: 'checkboxfield',
                            boxLabel: 'Рассылка по SMS 5',
                            name: 'pkg_sms_5',
                            inputValue: true,
                            uncheckedValue: false
                        }]
		            }]
	        	},{
	                title: 'Дополнительно',
	                layout: 'anchor',
	                defaults:{bodyPadding: 10,anchor: '100%',padding: '5 5 5 5'},
	                defaultType: 'textfield',
	                items :[{
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
	                    xtype: 'textareafield',
	                    name : 'information',
	                    fieldLabel: 'Комментарии',
	                    maxLength: 150
	                }]
                }]
        	}]
        }];
        this.buttons = [{
            iconCls: 'icon-save',
            itemId: 'client_save',
        	text: 'Сохранить',
            action: 'save'
        },{
            iconCls: 'icon-order_buy_add',
            itemId: 'edit_add_order_buy',
            tooltip: 'Новый спрос',
            text: 'Новый спрос',
            action: 'add_order_buy'
        },{
            iconCls: 'icon-order_sale_add',
            itemId: 'edit_add_order_sale',
            tooltip: 'Новое предложение',
            text: 'Новое предложение',
            action: 'add_order_sale'
        },{
        	text: 'Выход',
            action: 'cancel'
        }];
        this.callParent(arguments);
    }
});