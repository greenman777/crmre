Ext.define('CRMRE.store.directory.Occupation', {
    extend: 'Ext.data.Store',
    model: 'CRMRE.model.directory.Occupation',
    autoLoad:true,
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: 'occupation',
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