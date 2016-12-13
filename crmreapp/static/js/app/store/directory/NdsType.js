Ext.define('CRMRE.store.directory.NdsType', {
    extend: 'Ext.data.Store',
    model: 'CRMRE.model.directory.NdsType',
    autoLoad:true,
    proxy: {
        type: 'rest',
        pageParam: false,
        startParam: false,
        limitParam: false,
        url: 'nds_type',
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