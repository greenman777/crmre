Ext.define('CRMRE.model.Offer', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id', type:'auto'},
        {name: 'informed', type:'boolean'},
        {name: 'stage', type:'auto'},

    	{name: 'order_sale', type:'auto'},
        {name: 'order_sale_client_name', type:'string'},
    	{name: 'order_sale_heading', type:'string'},
        {name: 'order_sale_space', type:'auto'},
        {name: 'order_sale_price', type:'float'},
        {name: 'order_sale_street_name', type:'string'},
        {name: 'order_sale_house_number', type:'string'},
        {name: 'order_sale_microdistrict_name', type:'string'},
        {name: 'order_sale_city_name', type:'string'},
        {name: 'order_sale_object_type_name', type:'string'},
        {name: 'order_sale_performer_name', type:'string'},
        {name: 'order_sale_create_date', dateFormat: 'Y-m-d H:i', type:"datetime"},
        {name: 'order_sale_index', type:'string'},

        {name: 'order_buy', type:'auto'},
        {name: 'order_buy_client_name', type:'string'},
        {name: 'order_buy_heading', type:'string'},
        {name: 'order_buy_space', type:'string'},
        {name: 'order_buy_price', type:'string'},
        {name: 'order_buy_performer_name', type:'string'},
        {name: 'order_buy_create_date', dateFormat: 'Y-m-d H:i', type:"datetime"},
        {name: 'order_buy_index', type:'string'}
   ]
});
