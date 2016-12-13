Ext.define('CRMRE.store.Offer', {
    extend: 'Ext.data.Store',
    model: 'CRMRE.model.Offer',
    proxy: {
        type: 'rest',
        actionMethods : {
		    create: 'POST',
            read: 'GET',
            update: 'PUT',
            destroy: 'DELETE'
	    },
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: 'offer',
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