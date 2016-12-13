Ext.define('CRMRE.model.HystoryShow', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id', type:'auto'},
    	{name: 'date', dateFormat: 'Y-m-d', type:"date"},
    	{name: 'number_act', type:'string'},
    	{name: 'offer', type:'auto'},
    	{name: 'result', type:'auto'},
    	{name: 'comment', type:'string'},
   ]
});
