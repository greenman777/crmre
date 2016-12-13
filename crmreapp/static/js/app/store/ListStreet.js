Ext.define('CRMRE.store.ListStreet', {
    extend: 'Ext.data.Store',
    model: 'CRMRE.model.ListStreet',
    autoLoad: true,
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: 'list_street',
        reader: {
        	totalProperty: 'count',
            type: 'json',
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
    }
});