Ext.define('CRMRE.model.HystoryOffer', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id', type:'auto'},
    	{name: 'date', dateFormat: 'Y-m-d', type:"date"},
    	{name: 'offer', type:'auto'},
    	{name: 'result', type:'auto'},
    	{name: 'comment', type:'string'},
   ]
});
