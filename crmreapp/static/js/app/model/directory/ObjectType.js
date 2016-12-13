Ext.define('CRMRE.model.directory.ObjectType', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id', type:'auto'},
    	{name: 'name', type:'string'},
    	{name: 'object_category', type:'auto'},
        {name: 'avito_category', type:'auto'},
        {name: 'yandex_category', type:'auto'},
        {name: 'avito_type', type:'auto'}
    ]
});