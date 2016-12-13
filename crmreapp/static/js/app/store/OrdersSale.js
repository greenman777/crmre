Ext.define('CRMRE.store.OrdersSale', {
    extend: 'Ext.data.Store',
    model: 'CRMRE.model.OrdersSale',
    autoLoad: false,
    remoteFilter: true,
    pageSize: 10,
    proxy: {
        type: 'rest',
        pageParam: 'page',
        startParam: false,
        limitParam: 'limit',
        url: 'orders_sale',
        reader: {
        	totalProperty: 'count',
            type: 'json',
            root: 'results',
            successProperty: 'success'
        },
        writer: {
        		writeAllFields: true,
            	encode: false, 
                type: 'json'
        },
        headers : {
		    'accept': 'application/json'		    
		},
		listeners: {
            exception: function(proxy, response, operation){
                Ext.MessageBox.show({
                     title: 'Ошибка изменения данных!',
                     msg: JSON.stringify(Ext.JSON.decode(response.responseText)),
                     icon: Ext.MessageBox.ERROR,
                     buttons: Ext.Msg.OK
                 });
            }
        }
    },
    //mixins: ['CRMRE.util.ShowEvents'],
});