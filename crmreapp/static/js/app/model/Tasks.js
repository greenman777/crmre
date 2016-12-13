Ext.define('CRMRE.model.Tasks', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id', type:'auto'},
    	{name: 'heading', type:'string'},
    	{name: 'description', type:'string'},
    	{name: 'author', type:'auto'},
    	{name: 'performer', type:'auto'},
    	{name: 'create_date', dateFormat: 'Y-m-d', type:"date"},
    	{name: 'execution_date', dateFormat: 'Y-m-d', type:"date"},
    	{name: 'priority', type:'auto'},
        {name: 'status', type:'auto'},
   ]
});
