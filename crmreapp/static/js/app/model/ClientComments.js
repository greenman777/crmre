Ext.define('CRMRE.model.ClientComments', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id', type:'auto'},
    	{name: 'client', type:'auto'},
    	{name: 'author', type:'auto'},
    	{name: 'comment', type:'string'},
    	{name: 'create_date', dateFormat: 'Y-m-d', type:"date"},
   ]
});
