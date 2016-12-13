Ext.define('CRMRE.store.directory.ResultShow', {
    extend: 'Ext.data.Store',
    model: 'CRMRE.model.directory.ResultShow',
    autoLoad:true,
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: 'result_show',
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
            }
        }
    }
});