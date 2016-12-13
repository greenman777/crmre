Ext.define('CRMRE.view.orders_buy.EditTemplates', {
    extend: 'Ext.window.Window',
    xtype: 'appChangeOrdersBuyTemplates',
    title: 'Выбор документа',
    width:750,
    modal : true,
    autoShow: true,
    initComponent: function() {
        this.items = [{
        	xtype: 'form',
        	frame: true,
            header: false,
        	defaults: {anchor: '100%',padding: '5 5 5 5'},
        	fieldDefaults: {msgTarget: 'side',labelWidth: 160},
            items: [
            {   xtype: 'combobox',
                name : 'order',
                hidden:true
            },{   xtype: 'combobox',
                name : 'order_type',
                hidden:true
            },{
                xtype: 'combobox',
                name : 'templatesdoc',
                autoSelect: true,
                valueField: 'id',
                displayField: 'name',
                fieldLabel: 'Имя шаблона документа',
                store: 'TemplatesDoc',
                editable: false,
                anchor: '100%',
                allowBlank:false,
                padding: '5 5 5 5'
            }]
        }];
        this.buttons = [{
            iconCls: 'icon-save',
        	text: 'Выбрать',
            handler: function() {
                var formPanel = Ext.create('Ext.form.Panel', {
                    items: []
                });
                var form = this.up('window').down('form').getForm();
                formPanel.submit({
                    url: '/uploading_templatesdoc/',
                    timeout : 12000,
                    headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
                    method: 'POST',
                    csrf_token: CRMRE.global.Vars.csrf_token,
                    standardSubmit: true,
                    //target : '_blank',
                    params:{
                        order_type: form.getValues().order_type,
                        order: form.getValues().order,
                        template: form.getValues().templatesdoc
                    }
                });
            }
        },{
        	text: 'Отмена',
            handler: function () { this.up('window').close(); }
        }];
        this.callParent(arguments);
    }
});