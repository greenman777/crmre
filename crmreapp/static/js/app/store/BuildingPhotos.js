Ext.define('CRMRE.store.BuildingPhotos', {
    extend: 'Ext.data.Store',
    model: 'CRMRE.model.BuildingPhotos',
    storeId: 'BuildingPhotos',
    autoLoad: false,
    actionMethods: {
                destroy:'DELETE',
                create: 'PUT',
                update: 'PUT',
                read: 'GET'
            },
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: 'building_photos',
        reader: {
        	totalProperty: 'count',
            type: 'json',
            successProperty: 'success'
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