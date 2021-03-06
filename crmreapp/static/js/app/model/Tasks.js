Ext.define('CRMRE.model.Tasks', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id', type:'auto'},
    	{name: 'description', type:'string'},
    	{name: 'author', type:'auto'},
    	{name: 'performer', type:'auto'},
    	{name: 'create_date', dateFormat: 'Y-m-d H:i', type:"datetime"},
    	{name: 'execution_date', dateFormat: 'Y-m-d H:i', type:"datetime"},
		{name: 'client', type:'auto'},
		{name: 'client_name', type:'string'},//клиент - имя
		{name: 'order_sale_index', type:'string'},
		{name: 'order_buy_index', type:'string'},
		{name: 'order_sale', type:'auto'},
		{name: 'order_buy', type:'auto'},
    	{name: 'priority', type:'auto'},
        {name: 'status', type:'auto'},
   ]
});
