Ext.define('CRMRE.model.OrdersBuy', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id', type:'auto'},
    	{name: 'index', type:'string'},
    	{name: 'author', type:'auto'},
	    {name: 'performer', type:'auto'},
	    {name: 'create_date', dateFormat: 'Y-m-d H:i', type:"datetime"},
	    {name: 'modification_date', dateFormat: 'Y-m-d H:i', type:"datetime"},
	    {name: 'heading', type:'string'},
	    {name: 'description', type:'string'},
        {name: 'status', type:'auto'},
	    {name: 'object_category', type:'auto'},
	    {name: 'client', type:'auto'},
			{name: 'client_name', type:'string'},//клиент - имя
            {name: 'represent_name', type:'string'},//клиент - представитель
	    {name: 'contract_type', type:'auto'},
	    {name: 'contract_number', type:'string'},
	    {name: 'contract_date', dateFormat: 'Y-m-d', type:"date"},
	    {name: 'contract_end_date', dateFormat: 'Y-m-d', type:"date"},
        {name: 'rating', type:'integer'},
        {name: 'rating_comment', type:'string'},
        {name: 'flag_edit', type:'boolean'},
        {name: 'only_support', type:'boolean'},
        {name: 'show_support', type:'boolean'},
        {name: 'mortgage', type:'boolean'},
        {name: 'mortgage_old', type:'boolean'},
        {name: 'cash', type:'float'},
        {name: 'bank', type:'auto'},
	    {name: 'transaction_type', type:'boolean'},
	    {name: 'commission', type:'boolean'},
	    {name: 'commission_type', type:'boolean'},
	    {name: 'commission_price', type:'float'},
	    {name: 'other_agency', type:'boolean'},
	    {name: 'agency_commission', type:'boolean'},
	    {name: 'agency_commission_type', type:'boolean'},
	    {name: 'agency_commission_price', type:'float'},
        {name: 'price_from', type:'float'},
        {name: 'price_to', type:'float'},
        {name: 'space_from', type:'float'},
        {name: 'space_to', type:'float'},
	    {name: 'remoteness_from', type:'integer'},
	    {name: 'remoteness_to', type:'integer'},
	    {name: 'classified_resources', type:'boolean'},//Выгрузка в бесплатные ресурсы
        {name: 'toll_resources', type:'boolean'},//Выгрузка в платные ресурсы
        {name: 'comment', type:'string'}//дополнительная информация
   ]
});
