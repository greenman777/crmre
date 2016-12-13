Ext.define('CRMRE.store.Plan', {
    extend: 'Ext.data.Store',
    model: 'CRMRE.model.Plan',
    //remoteFilter: true,
    autoLoad: false,
    proxy: {
        type: 'rest',
        //pageParam: 'page',
        //startParam: 'start',
        //limitParam: 'limit',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: 'plan',
        reader: {
        	totalProperty: 'count',
            type: 'json',
            //root: 'results',
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