Ext.apply(Ext.form.field.VTypes, {
        IntervalNumber: function (value) {
          return /^\d[\d-,]*$/.test(value);
        },
        IntervalNumberText: 'Допустимая форма ввода: 1-3 1,2,3'
});
Ext.define('CRMRE.view.buildings.PlanEdit', {
    extend: 'Ext.window.Window',
    xtype: 'appPlanEdit',
    modal : true,
    title: "Изменение планировки",
    width:400,
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
            {   xtype: 'combobox',name : 'building',hidden:true},
	        {
            	xtype:'fieldset',
            	title: 'Основная информация',
            	collapsible: true,
            	defaultType: 'textfield',
            	layout: 'anchor',
            	defaults: {anchor: '100%',padding: '5 5 5 5'},
            	fieldDefaults: {msgTarget: 'side',labelWidth: 120},
            	items :[
            	{
                    fieldLabel: 'Кол-во комнат',
                    xtype: 'numberfield',
                    minValue: 0,
                    maxValue: 99,
                    itemId: 'number_rooms',
                    name: 'number_rooms',
                },{   
                    xtype: 'numberfield',
                    fieldLabel: '<html>Общая площадь(м<sup>2</sup>)</html>',
                    name: 'space',
                    itemId: 'space',
                    minValue: 0,
                    maxValue: 999999,
                    decimalPrecision : 2,
                    allowBlank:false
                },{
                    fieldLabel: 'Этаж',
                    maxLength: 30,
                    itemId: 'floor',
                    name: 'floor',
                    vtype: 'IntervalNumber'
                },{
                    fieldLabel: 'Подъезд',
                    maxLength: 30,
                    itemId: 'entrance',
                    name: 'entrance',
                    vtype: 'IntervalNumber'
                },{   
                    xtype: 'numberfield',
                    fieldLabel: 'Цена (руб)',
                    name: 'price',
                    minValue: 0,
                    maxValue: 99999999,
                    decimalPrecision : 2,
                    allowBlank:false
                },{
                    fieldLabel: 'Подсказка',
                    name: 'prompt',
                    itemId: 'prompt',
                    maxLength: 75,
                },{
                    xtype: 'textfield',
				    name: 'tour3d',
				    fieldLabel: '3D тур',
				    vtype: 'url'
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'АВ,%',
                    name: 'commission',
                    minValue: 0,
                    maxValue: 99,
                    decimalPrecision : 2,
                }]
        	}]
        }];
        this.buttons = [{
            iconCls: 'icon-save',
            itemId: 'client_save',
        	text: 'Сохранить',
            action: 'save'
        },{
        	text: 'Выход',
            action: 'cancel'
        }];
        this.callParent(arguments);
    }
});