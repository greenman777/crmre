Ext.define('CRMRE.model.Users', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id', type:'auto'},
        {name: 'is_superuser', type:'boolean'},
        {name: 'username', type:'string'},
        {name: 'first_name', type:'string'},
        {name: 'last_name', type:'string'},
        {name: 'email', type:'auto'},
        {name: 'is_staff', type:'boolean'},
        {name: 'is_active', type:'boolean'},
        {name: 'date_joined', dateFormat: 'Y-m-d H:i', type:"datetime"},
        {name: 'phone', type:'string'},
        {name: 'phone_other', type:'string'},
        {name: 'phone_swap', type:'string'},
        {name: 'phone_short', type:'string'},
        {name: 'organization_name', type:'string'},
        {name: 'organization_phone', type:'string'},
        {name: 'organization_fax', type:'string'},
        {name: 'business_address', type:'string'},
        {name: 'position', type:'string'},
        {name: 'rating', type:'integer'},
        {name: 'birthday', dateFormat: 'Y-m-d', type:"date"},
        {name: 'photo', type:'string'},
        {name: 'brigade', type: 'auto'}
   ]
});
