Ext.define('CRMRE.view.reports.KPI', {
    extend:'Ext.view.View',
    xtype:'appKPI',
    itemSelector:'tplKPI',
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
            '<h1>Отчет по KPI</h1>',
            '<p>Период с <b>{date_start:date("d F Y")}</b> по <b>{date_stop:date("d F Y")}</b></p>',
            '<table border="1" cellpadding="5" style="font-size:10pt;text-align:center;vertical-align:middle" text-align="center">',
                '<tr>',
                    '<td rowspan="2"><b></b></td>',
                    '<td colspan="5"><b>Заявки: предложение/спрос</b></td>',
                    '<td colspan="3"><b>Договоры: предложение/спрос</b></td>',
                    '<td colspan="2"><b>Показы</b></td>',
                    '<td colspan="2"><b>Сделки</b></td>',
                '</tr>',
                '<tr>',
                    '<td><b>Всего<br>на конец<br>периода<br>в работе</b></td>',
                    '<td><b>Прирост<br>за<br>период<br>всего</b></td>',
                    '<td><b>Прирост<br>за<br>период<br>от агента</b></td>',
                    '<td><b>Норма<br>прироста</b></td>',
                    '<td><b>Выбыло<br>за<br>период</b></td>',
                    '<td><b>Всего<br>сейчас в<br>работе</b></td>',
                    '<td><b>Прирост<br>за<br>период</b></td>',
                    '<td><b>Норма<br>прироста</b></td>',
                    '<td><b>Актов<br>за<br>период</b></td>',
                    '<td><b>Норма</b></td>',
                    '<td><b>Сделок за<br>период</b></td>',
                    '<td><b>Норма</b></td>',
                '</tr>',
                '<tpl for="content">',
                    '<tr>',
                        '<tpl if="category_type == 1">',
                            '<td><b>{category_name}</b></td>',
                            '<td><b>{orders_all}</b></td>',
	                        '<td><b>{orders_growth}</b></td>',
	                        '<td><b>{orders_growth_agent}</b></td>',
	                        '<td><font color="gray">{rate_growth_orders}</font></td>',
	                        '<td><b>{orders_retired}</b></td>',
	                        '<td><b>{orders_contract_all}</b></td>',
	                        '<td><b>{orders_contract_growth}</b></td>',
	                        '<td><font color="gray">{rate_growth_contracts}</font></td>',
	                        '<td><b>{shows_acts_all}</b></td>',
	                        '<td><font color="gray">{rate_shows}</font></td>',
	                        '<td><b>{transactions}</b></td>',
	                        '<td><font color="gray">{rate_transactions}</font></td>',
                        '</tpl>',
                        '<tpl if="category_type == 2">',
                            '<td>{category_name}</td>',
                            '<td>{orders_all}</td>',
	                        '<td>{orders_growth}</td>',
	                        '<td>{orders_growth_agent}</td>',
	                        '<td><font color="gray">{rate_growth_orders}</font></td>',
	                        '<td>{orders_retired}</td>',
	                        '<td>{orders_contract_all}</td>',
	                        '<td>{orders_contract_growth}</td>',
	                        '<td><font color="gray">{rate_growth_contracts}</font></td>',
	                        '<td>{shows_acts_all}</td>',
	                        '<td><font color="gray">{rate_shows}</font></td>',
	                        '<td>{transactions}</td>',
	                        '<td><font color="gray">{rate_transactions}</font></td>',
                        '</tpl>',
                        '<tpl if="category_type == 3">',
                            '<td><font size="1">{category_name}</font></td>',
                            '<td><font size="1">{orders_all}</font></td>',
                            '<td><font size="1">{orders_growth}</font></td>',
                            '<td><font size="1">{orders_growth_agent}</font></td>',
                            '<td><font size="1" color="gray">{rate_growth_orders}</font></td>',
                            '<td><font size="1">{orders_retired}</font></td>',
                            '<td><font size="1">{orders_contract_all}</font></td>',
                            '<td><font size="1">{orders_contract_growth}</font></td>',
                            '<td><font size="1" color="gray">{rate_growth_contracts}</font></td>',
                            '<td><font size="1">{shows_acts_all}</font></td>',
                            '<td><font size="1" color="gray">{rate_shows}</font></td>',
                            '<td><font size="1">{transactions}</font></td>',
                            '<td><font size="1" color="gray">{rate_transactions}</font></td>',
                        '</tpl>',
                        '<tpl if="category_type == 4">',
                            '<td><font size="3">{category_name}</font></td>',
                            '<td><font size="3">{orders_all}</font></td>',
                            '<td><font size="3">{orders_growth}</font></td>',
                            '<td><font size="3">{orders_growth_agent}</font></td>',
                            '<td><font size="3" color="gray">{rate_growth_orders}</font></td>',
                            '<td><font size="3">{orders_retired}</font></td>',
                            '<td><font size="3">{orders_contract_all}</font></td>',
                            '<td><font size="3">{orders_contract_growth}</font></td>',
                            '<td><font size="3" color="gray">{rate_growth_contracts}</font></td>',
                            '<td><font size="3">{shows_acts_all}</font></td>',
                            '<td><font size="3" color="gray">{rate_shows}</font></td>',
                            '<td><font size="3">{transactions}</font></td>',
                            '<td><font size="3" color="gray">{rate_transactions}</font></td>',
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
                report_type: "kpi"
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