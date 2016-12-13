Ext.define('CRMRE.view.reports.Completed', {
    extend:'Ext.view.View',
    xtype:'appCompleted',
    itemSelector:'tplCompleted',
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
            '<h1>Отчет по совершенным сделкам: {orders_type} {object_category}</h1>',
            '<p>Период с <b>{date_start:date("d F Y")}</b> по <b>{date_stop:date("d F Y")}</b></p>',
            '<table border="1" cellpadding="5" style="font-size:10pt;text-align:center;vertical-align:middle" text-align="center">',
                '<tr>',
                    '<td><font size="1"><b>Агент</b></td>',
                    '<td><font size="1"><b>Дата_сделки</b></td>',
                    '<td><font size="1"><b>Клиент</b></td>',
                    '<td><font size="1"><b>№ заявки</b></td>',
                    '<td><font size="1"><b>Заголовок</b></td>',
                    '<td><font size="1"><b>Тип объекта</b></td>',
                    '<td><font size="1"><b>Операция</b></td>',
                    '<td><font size="1"><b>Адрес</b></td>',
                    '<td><font size="1"><b>Цена<br>(руб)</b></td>',
                    '<td><font size="1"><b>Выручка<br>(руб)</b></td>',
                    '<td><font size="1"><b>Способ оплаты</b></td>',
                    '<td><font size="1"><b>Банк</b></td>',
                    '<td><font size="1"><b>Заявка от</b></td>',
                    '<td><font size="1"><b>Стадия строительства</b></td>',
                    '<td><font size="1"><b>Застройщик</b></td>',
                    '<td><font size="1"><b>№ встречной заявки</b></td>',
                    '<td><font size="1"><b>Оценка</b></td>',
                    '<td><font size="1"><b>Примечание&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td>',
                '</tr>',
                '<tpl for="content">',
                    '<tr>',
                        '<td><font size="1">{performer}</font></td>',
                        '<td><font size="1">{date}</font></td>',
                        '<td><font size="1">{client}</font></td>',
                        '<td><font size="1">{index}</font></td>',
                        '<td><font size="1">{heading}</font></td>',
                        '<td><font size="1">{object_type}</font></td>',
                        '<td><font size="1">{transaction_type}</font></td>',
                        '<td><font size="1">{address}</font></td>',
                        '<td><font size="1">{price}</font></td>',
                        '<td><font size="1">{revenue}</font></td>',
                        '<td><font size="1">{method_payment}</font></td>',
                        '<td><font size="1">{bank}</font></td>',
                        '<td><font size="1">{author}</font></td>',
                        '<td><font size="1">{construction_stage}</font></td>',
                        '<td><font size="1">{construction_organization}</font></td>',
                        '<td><font size="1">{opposite_index}</font></td>',
                        '<td><font size="1">{rating}</font></td>',
                        '<td><font size="1">{comment}</font></td>',
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
        object_category = Ext.getCmp('tabpanel').getActiveTab().down("form").getValues().object_category;
        orders_type = Ext.getCmp('tabpanel').getActiveTab().down("form").getValues().orders_type;
        user = Ext.getCmp('tabpanel').getActiveTab().down("form").getValues().user;
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
                orders_type: orders_type,
                user: user,
                report_type: "completed"
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