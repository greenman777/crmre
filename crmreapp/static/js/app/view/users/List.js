Ext.define('CRMRE.view.users.List' ,{
    extend: 'Ext.grid.Panel',
    xtype: 'appUsersList',
    autoScroll:true,
    animate: false,
 	columnLines: true,
	plugins: [{
        ptype: 'bufferedrenderer',
	    variableRowHeight: false
    }],
    loadMask: true,
    viewConfig: {
    	enableTextSelection: true,
        stripeRows: true,
    },
    initComponent: function() {
    	this.store = Ext.create('CRMRE.store.Users');
        this.columns = [
      			{   xtype:'rownumberer',width:40},
				{ 
	                header: 'Фотография', 
	                dataIndex: 'photo', 
	                width:57,
	                renderer: function (value, meta, record){
	                    if (value){
                            return '<a href="'+value+'" target="_blank"><img src="'+value+'" height=60 width=45/></a>';
	                    }
	                    else {
	                        return '<img src="'+CRMRE.global.Vars.media_url+'user.png'+'" height=60 width=45/>';
	                    }
	                }
	            },{
				    header: 'Фамилия', 
					flex: 1,
					dataIndex: 'last_name'
				},{
                    header: 'Имя', 
                    flex: 1,
                    dataIndex: 'first_name'
                },{
                    header: 'Дата рождения', 
                    flex: 1,
                    dataIndex: 'birthday'
                },{
                    header: 'E-mail', 
                    flex: 1,
                    dataIndex: 'email',
                    renderer: function (value, meta, record) {
                        meta.tdAttr = "data-qtip='" + value + "'";
                        return value;
                    }
                },{
                    header: 'Телефон', 
                    flex: 1,
                    dataIndex: 'phone'
                },{
                    header: 'Телефон доп.', 
                    flex: 1,
                    dataIndex: 'phone_other'
                },{
                    header: 'Внутр. номер', 
                    flex: 1,
                    dataIndex: 'phone_short'
                },{
                    header: 'Организация', 
                    flex: 1,
                    dataIndex: 'organization_name',
                    renderer: function (value, meta, record) {
                        meta.tdAttr = "data-qtip='" + value + "'";
                        return value;
                    }
                },{
                    header: 'Должность', 
                    flex: 1,
                    filter: true,
                    dataIndex: 'position',
                    renderer: function (value, meta, record) {
                        meta.tdAttr = "data-qtip='" + value + "'";
                        return value;
                    }
                },{
                    header: 'Группа',
                    flex: 1,
                    filter: true,
                    dataIndex: 'brigade',
                    renderer: function (value, meta, record) {
                        meta.tdAttr = "data-qtip='" + value + "'";
                        return value;
                    }
                }
            ];
        this.dockedItems = [{
            xtype: 'toolbar',
            items: 
	        ['->',{
	            iconCls: 'icon-task_add',
	            itemId: 'task_add',
	            text: 'Дать задание',
	            action: 'task_add'
	        },{
	            iconCls: 'icon-update',
	            itemId: 'update',
	            tooltip: 'Обновить',
	            action: 'update'
	        }]
	    }];
        this.callParent(arguments);
    }
});