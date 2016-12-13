Ext.define('CRMRE.view.reports.Payroll', {
    extend:'Ext.view.View',
    xtype:'appPayroll',
    itemSelector:'tplPayroll',
    padding: '10px 10px 10px 10px',
    listeners: {
        viewready: {
            fn: function(){ 
                my = this;
                this.updateReport();
            }
        }
    },
    config: {
	    itemTpl: new Ext.XTemplate(
            '<tpl>',
            '<h1>Ведомость по ЗП</h1>',
            '<p>Период с <b>{date_start:date("d F Y")}</b> по <b>{date_stop:date("d F Y")}</b></p>',
            '<table border="1" cellpadding="5" style="font-size:10pt;text-align:center;vertical-align:middle" text-align="center">',
                '<tr>',
                    '<td><b>Агент</b></td>',
                    '<td><b>Выручка от<br>новостройки, руб.</b></td>',
                    '<td><b>Выручка от<br>вторички и др., руб.</b></td>',
                    '<td><b>ЗП по<br>новостройке, руб.</b></td>',
                    '<td><b>ЗП по<br>вторичке и др., руб.</b></td>',
                    '<td><b>ЗП итого, руб.</b></td>',
                    '<td><b>Примечание</b></td>',
                '</tr>',
                '<tpl for="content">',
                    '<tr>',
                        '<td>{agent}</td>',
                        '<td>{revenue_new}</font></td>',
                        '<td>{revenue_second}</font></td>',
                        '<td>{salary_new}</font></td>',
                        '<td>{salary_second}</font></td>',
                        '<td>{salary_all}</font></td>',
                        '<td>{note}</font></td>',
                    '</tr>',
                '</tpl>',
            '</table>',
            '<p></p>',
            '</tpl>'
         )
    },
    updateReport: function() {
    	var form = Ext.getCmp('tabpanel').getActiveTab().down("form");
    	if (form.isValid()) {
	        date_start = form.getValues().date_start;
	        date_stop = form.getValues().date_stop;
	        object_category = form.getValues().object_category;
	        if (Ext.Date.parse(date_start, "Y-m-d")>=Ext.Date.parse(date_stop, "Y-m-d")) {
	            Ext.Msg.alert('Предупреждение', 'Не верно указан диапазон дат!'); 
	            return;
	        };
	        my = this;
	        Ext.getCmp('tabpanel').getActiveTab().down("form").down('#update').setDisabled(true);
	        Ext.Ajax.request({
	            url: '/reports/',
	            params: {
	                date_start: date_start,
	                date_stop: date_stop,
	                object_category: object_category,
	                report_type: "payroll"
	            },
	            success: function(response, opts) {
	                var obj = Ext.decode(response.responseText);
	                var data = obj.messages;
	                my.update(data);
	                Ext.getCmp('tabpanel').getActiveTab().down("form").down('#update').setDisabled(false);
	            }
	        });
	    }
	    else {
	    	return;
	    }
    }
});