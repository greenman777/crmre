Ext.define('CRMRE.store.Clients', {
    extend: 'Ext.data.Store',
    model: 'CRMRE.model.Clients',
    autoLoad: false,
    remoteFilter: true,
    pageSize: 50,
    proxy: {
        type: 'rest',
        pageParam: 'page',
        startParam: false,
        limitParam: 'limit',
        url: 'clients',
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
            'exception': function(proxy, response, operation){
                Ext.MessageBox.show({
                     title: 'Ошибка изменения данных!',
                     msg: JSON.stringify(Ext.JSON.decode(response.responseText)),
                     icon: Ext.MessageBox.ERROR,
                     buttons: Ext.Msg.OK
                });
            }
        }
    },
    listeners: {
        load: function (store, records, options) {
            //Ext.getBody().unmask();
        },
    },
});