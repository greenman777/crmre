Ext.define('CRMRE.view.Tasks', {
    extend: "Ext.panel.Panel",//наследуем родительский класс
    xtype:'appTasks',
    layout: 'border',
    requires: [//подгружаем классы виджетов
        'CRMRE.view.tasks.List',
        'CRMRE.view.task_history.List',
        'CRMRE.view.task_comments.List'
    ],
    //инициализируем свойства (конструктор объекта)
    initComponent: function () {
        this.compet = true;
        Ext.apply(this, {
            items: [{
                region: 'center',
        		xtype: 'appTasksList',
        		flex:3,
        		//collapsible: true,
                split: true,
    		},{
                region: 'south',
        		xtype: 'panel',
        		flex:2,
        		//collapsible: true,
                split: true,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
	                xtype: 'appTaskHistoryList',
                    flex:3
	            },{
	                flex:2,
	                title:'Комментарии',
	                xtype: 'appTaskCommentsList'
	            }]
          	}]
        });
        //инициализируем родительский класс;
        this.callParent(arguments);
    }
});