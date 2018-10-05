Ext.define('CRMRE.model.TaskHistory', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id', type:'auto'},
    	{name: 'task', type:'auto'},
    	{name: 'corrector', type:'auto'},
    	{name: 'comment', type:'string'},
    	{name: 'create_date', dateFormat: 'Y-m-d H:i', type:"datetime"},
    	{name: 'status', type:'auto'},
   ]
});
