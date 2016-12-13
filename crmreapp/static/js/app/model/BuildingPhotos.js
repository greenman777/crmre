Ext.define('CRMRE.model.BuildingPhotos', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type:'auto'},
    	{name: 'building', type:'auto'},
    	{ name:'description', type:'string'},
        { name:'photo', type:'string'}
   ]
});
