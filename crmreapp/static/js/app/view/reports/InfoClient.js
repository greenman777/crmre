Ext.define('CRMRE.view.reports.InfoClient', {
    extend:'Ext.view.View',
    xtype:'appInfoClient',
    itemSelector:'tplInfoClient',
    padding: '10px 10px 10px 10px',
    listeners: {
        viewready: {
            fn: function(){ 
                my = this;
                Ext.Ajax.request({
		            url: '/reports/',
		            params: {
		                report_type: "info_client",
		                client: this.client_id,
		            },
		            success: function(response, opts) {
		                var obj = Ext.decode(response.responseText);
		                var data = obj.messages;
                        my.update(data);
		            }
		        });
            }
        }
    },
    config: {
	    itemTpl: new Ext.XTemplate(
	        '<tpl>',
	        '<h1>Информация по клиенту</h1>',
	        '<p>на дату: <b>{date_new:date("d F Y")}</b></p>',
	        '<table border="1" cellpadding="5" style="font-size:10pt;text-align:center;vertical-align:middle" text-align="center">',
	            '<tr>',
	                '<td><b>Номер заявки</b></td>',
					'<td><b>Тип объекта</b></td>',
	                '<td><b>Заголовок</b></td>',
					'<td><b>Цена</b></td>',
					'<td><b>Дата заявки</b></td>',
					'<td><b>Исполнитель</b></td>',
	                '<td><b>Статус</b></td>',
	            '</tr>',
                '<tpl for="content">',
		            '<tr>',
		                '<td><b>{order_index}</b></td>',
						'<td>{order_object_type}</td>',
		                '<td>{order_description}</td>',
						'<td>{order_price}</td>',
						'<td>{order_date}</td>',
						'<td>{order_performer}</td>',
		                '<td>{order_status}</td>',
		            '</tr>',
	            '</tpl>',
	        '</table>',
	        '</tpl>'
	     )
    }
});