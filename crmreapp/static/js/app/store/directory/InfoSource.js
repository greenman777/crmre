Ext.define('CRMRE.store.directory.InfoSource', {
    extend: 'Ext.data.Store',
    model: 'CRMRE.model.directory.InfoSource',
    autoLoad:true,
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: 'info_source',
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