Ext.define('CRMRE.model.HystoryService', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id', type:'auto'},
    	{name: 'date', dateFormat: 'Y-m-d', type:"date"},
    	{name: 'offer', type:'auto'},
    	{name: 'operation', type:'auto'},
    	{name: 'comment', type:'string'},
        {name: 'result_operation', type:'auto'},
   ]
});
