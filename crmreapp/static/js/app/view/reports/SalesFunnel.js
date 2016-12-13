Ext.define('CRMRE.view.reports.SalesFunnel', {
    extend:'Ext.view.View',
    xtype:'appSalesFunnel',
    itemSelector:'tplSalesFunnel',
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
            '<h1>Воронка продаж</h1>',
            '<p>Период с <b>{date_start:date("d F Y")}</b> по <b>{date_stop:date("d F Y")}</b></p>',
            '<p><b><font color="green">Зеленый - </font></b>число удачных заявок за период (по которым состоялись сделки)</p>',
            '<p><b><font color="red">Красный - </font></b>число отказных (выбывших) заявок за период</p>',
            '<table border="1" cellpadding="5" style="font-size:10pt;text-align:center;vertical-align:middle" text-align="center">',
                '<tr>',
                    '<td><b>Вид операции/агент</b></td>',
                    '<td><b>Продажа</b></td>',
                    '<td><b>Сдача в аренду</b></td>',
                    '<td><b>Покупка</b></td>',
                    '<td><b>Поиск в аренду</b></td>',
                    '<td><b>Всего</b></td>',
                    '<td><b>Выручка, руб.</b></td>',
                '</tr>',
                '<tpl for="content">',
                    '<tr>',
                        '<tpl if="category_type == 1">',
                            '<td><b>{category_name}</b></td>',
                            '<td><b><font color="green">{orders_sale}</font></b></td>',
	                        '<td><b><font color="green">{orders_sale_rent}</font></b></td>',
	                        '<td><b><font color="green">{orders_buy}</font></b></td>',
	                        '<td><b><font color="green">{orders_buy_rent}</font></b></td>',
	                        '<td><b><font color="green">{orders_all}</font></b></td>',
	                        '<td><b><font color="green">{orders_gain}</font></b></td>',
                        '</tpl>',
                        '<tpl if="category_type == 2">',
                            '<td>{category_name}</td>',
                            '<td><font color="green">{orders_sale}</font></td>',
	                        '<td><font color="green">{orders_sale_rent}</font></td>',
	                        '<td><font color="green">{orders_buy}</font></td>',
	                        '<td><font color="green">{orders_buy_rent}</font></td>',
	                        '<td><font color="green">{orders_all}</font></td>',
	                        '<td><font color="green">{orders_gain}</font></td>',
                        '</tpl>',
                        '<tpl if="category_type == 3">',
                            '<td><font size="1">{category_name}</font></td>',
                            '<td><font size="1" color="green">{orders_sale}</font></td>',
                            '<td><font size="1" color="green">{orders_sale_rent}</font></td>',
                            '<td><font size="1" color="green">{orders_buy}</font></td>',
                            '<td><font size="1" color="green">{orders_buy_rent}</font></td>',
                            '<td><font size="1" color="green">{orders_all}</font></td>',
                            '<td><font size="1" color="green">{orders_gain}</font></td>',
                        '</tpl>',
                    '</tr>',
                '</tpl>',
            '</table>',
            '<p></p>',
            '</tpl>'
         )
    },
    updateReport: function() {
        date_start = Ext.getCmp('tabpanel').getActiveTab().down("form").getValues().date_start;
        date_stop = Ext.getCmp('tabpanel').getActiveTab().down("form").getValues().date_stop;
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
                report_type: "sales_funnel"
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