Ext.define('CRMRE.model.TaskComments', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id', type:'auto'},
    	{name: 'task', type:'auto'},
    	{name: 'author', type:'auto'},
    	{name: 'comment', type:'string'},
    	{name: 'create_date', dateFormat: 'Y-m-d H:i', type:"datetime"},
   ]
});
