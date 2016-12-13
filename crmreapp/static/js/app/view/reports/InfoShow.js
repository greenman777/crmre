Ext.define('CRMRE.view.reports.InfoShow', {
    extend:'Ext.view.View',
    xtype:'appInfoShow',
    itemSelector:'tplInfoShow',
    padding: '10px 10px 10px 10px',
    listeners: {
        viewready: {
            fn: function(){ 
                my = this;
                Ext.Ajax.request({
		            url: '/reports/',
		            params: {
		                report_type: "info_show"
		            },
		            success: function(response, opts) {
		                var obj = Ext.decode(response.responseText);
		                var data = obj.messages;
                        my.update(data);
                        Ext.getBody().unmask();
		            }
		        });
            }
        }
    },
    config: {
	    itemTpl: new Ext.XTemplate(
	        '<tpl>',
	        '<h1>Статистика базы недвижимости</h1>',
	        '<p>на дату: <b>{date_new:date("d F Y")}</b></p>',
	        '<table border="1" cellpadding="5" style="font-size:10pt;text-align:center;vertical-align:middle" text-align="center">',
	            '<tr>',
	                '<td rowspan="2"><b>Тип недвижимости</b></td>',
	                '<td colspan="3"><b>Объектов на продажу</b></td>',
	                '<td colspan="3"><b>Объектов сдачи в аренду</b></td>',
	                '<td colspan="1"><b>Заявок на покупку</b></td>',
	                '<td colspan="1"><b>Спрос на аренду</b></td>',
	                '<td rowspan="2"><b>Всего</b></td>',
	            '</tr>',
	            '<tr>',
	                '<td><b>РН</b></td>',
	                '<td><b>Других<br>агенств</b></td>',
	                '<td><b>Всего</b></td>',
	                '<td><b>РН</b></td>',
	                '<td><b>Других<br>агенств</b></td>',
	                '<td><b>Всего</b></td>',
	                '<td><b>Всего</b></td>',
	                '<td><b>Всего</b></td>',
	            '</tr>',
                '<tpl for="content">',
		            '<tr>',
		                '<td><b>{category_name}</b></td>',
		                '<td>{object_sale_my}</td>',
		                '<td>{object_sale_other}</td>',
		                '<td>{object_sale_all}</td>',
		                '<td>{object_sale_my_rent}</td>',
                        '<td>{object_sale_other_rent}</td>',
                        '<td>{object_sale_all_rent}</td>',
		                '<td>{object_buy}</td>',
		                '<td>{object_buy_rent}</td>',
                        '<td>{object_all}</td>',
		            '</tr>',
	            '</tpl>',
	        '</table>',
	        '<p></p>',
	        '<p>РН - суммарно наши объекты и объекты собственников</p>',
	        '<p>Других агенств - объекты конкурентов</p>',
	        '</tpl>'
	     )
    }
});