Ext.define('CRMRE.store.Photos', {
    extend: 'Ext.data.Store',
    model: 'CRMRE.model.Photos',
    autoLoad: true,
    //autoSync: true,
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: 'photos',
        actionMethods: {
            destroy:'DELETE',
            create: 'PUT',
            update: 'PUT',
            read: 'GET'
        },
        reader: {
        	totalProperty: 'count',
            type: 'json',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            //writeAllFields: false  // commented out as you said

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