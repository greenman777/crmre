Ext.define('CRMRE.model.Plan', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id', type:'auto'},
    	{name: 'building', type:'auto'},
    	{name: 'number_rooms', type:'integer'},
    	{name: 'space', type: 'float'},
    	{name: 'floor', type:'string'},
    	{name: 'entrance', type:'string'},
    	{name: 'price', type: 'float' },
		{name: 'price_full', type: 'float' },
    	{name: 'tour3d', type:'auto'},
		{name: 'prompt', type:'string'},
		{name: 'commission', type: 'float' },
		{name: 'modification_date', dateFormat: 'Y-m-d H:i', type:"datetime"}
   ]
});
