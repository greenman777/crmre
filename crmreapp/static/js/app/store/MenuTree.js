Ext.define('CRMRE.store.MenuTree', {
    extend: 'Ext.data.TreeStore',
    fields: ['text', 'app','filterapp','typeapp','title'],
    id: 'menutree_store',
    proxy: {
        type: 'rest',
        url: 'menutree',
        reader: {
            type: 'json',
            successProperty: 'success'
        },
        headers : {
		    'accept': 'application/json'		    
		},
		extraParams: {
      		//typetree: 'tasks'
    	},
    	actionMethods: {
                read: 'GET'
            }
    },
    root: {
      text: 'Tree',
      id: 'src',
      expanded: true
  	}
});