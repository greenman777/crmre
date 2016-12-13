Ext.define('CRMRE.view.reports.ObjectType', {
    extend:'Ext.view.View',
    xtype:'appObjectType',
    itemSelector:'tplObjectType',
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
            '<h1>Отчет по типам объектов недвижимости</h1>',
            '<p>Город/н.п.: <b>{city}</b> Микрорайон: <b>{microdistrict}</b> Всего объектов: <b>{objects_all_count}</b> <tpl if="values.transaction_type == true"><b>Продажа</b></tpl><tpl if="values.transaction_type == false"><b>Аренда</b></tpl></p>',
            '<table border="1" cellpadding="5" style="font-size:10pt;text-align:center;vertical-align:middle" text-align="center">',
                '<tr>',
                    '<td><b>Тип недвижимости/<br>тип объектов</b></td>',
                    '<td><b>Кол-во<br>объектов</b></td>',
                    '<td><b>Минимальная<br>площадь (м<sup>2</sup>)</b></td>',
                    '<td><b>Средняя<br>площадь (м<sup>2</sup>)</b></td>',
                    '<td><b>Максимальная<br>площадь (м<sup>2</sup>)</b></td>',
                    '<td><b>Минимальная<br>цена (руб)</b></td>',
                    '<td><b>Средняя<br>цена (руб)</b></td>',
                    '<td><b>Максимальная<br>цена (руб)</b></td>',
                    '<td><b>Ср.цена<br>за кв.м. (руб)</b></td>',
                '</tr>',
                '<tpl for="content">',
                    '<tr>',
                        '<tpl if="category_type == 1">',
                            '<td><b>{category_name}</b></td>',
                            '<td><b>{objects_count}</b></td>',
                            '<td><b>{space_min}</b></td>',
	                        '<td><b>{space_average}</b></td>',
	                        '<td><b>{space_max}</b></td>',
	                        '<td><b>{price_min}</b></td>',
	                        '<td><b>{price_average}</b></td>',
	                        '<td><b>{price_max}</b></td>',
                            '<td><b>{price_average_meter}</b></td>',
                        '</tpl>',
                        '<tpl if="category_type == 2">',
                            '<td>{category_name}</td>',
                            '<td>{objects_count}</td>',
	                        '<td>{space_min}</td>',
	                        '<td>{space_average}</td>',
	                        '<td>{space_max}</td>',
	                        '<td>{price_min}</td>',
	                        '<td>{price_average}</td>',
                            '<td>{price_max}</td>',
                            '<td>{price_average_meter}</td>',
                        '</tpl>',
                    '</tr>',
                '</tpl>',
            '</table>',
            '<p></p>',
            '</tpl>'
         )
    },
    updateReport: function() {
        city = Ext.getCmp('tabpanel').getActiveTab().down("form").getValues().city;
        microdistrict = Ext.getCmp('tabpanel').getActiveTab().down("form").getValues().microdistrict;
        transaction_type = Ext.getCmp('tabpanel').getActiveTab().down("form").getValues().transaction_type;
        my = this;
        Ext.getCmp('tabpanel').getActiveTab().down("form").down('#update').setDisabled(true);
        Ext.Ajax.request({
            url: '/reports/',
            params: {
            	city: city,
            	microdistrict: microdistrict,
            	transaction_type: transaction_type,
                report_type: "object_type"
            },
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                var data = obj.messages;
                my.update(data);
                Ext.getCmp('tabpanel').getActiveTab().down("form").down('#update').setDisabled(false);
            }
        });
    }
});