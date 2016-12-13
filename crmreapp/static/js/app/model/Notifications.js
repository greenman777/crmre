Ext.define('CRMRE.model.Notifications', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id', type:'auto'},
    	{name: 'sender', type:'auto'},
		{name: 'user', type:'auto'},
		{name: 'date', dateFormat: 'Y-m-d', type:"date"},
    	{name: 'message', type:'string'},
        {name: 'read', type:'boolean'},
        {name: 'sendsms', type:'boolean'}
   ]
});