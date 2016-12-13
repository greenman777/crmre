Ext.define('CRMRE.view.Buildings', {
    extend: "Ext.panel.Panel",//наследуем родительский класс
    xtype:'appBuildings',
    layout: 'border', 
    requires: [//подгружаем классы виджетов
        'CRMRE.view.buildings.BuildingsList',
        'CRMRE.view.buildings.PlanList',
        'CRMRE.view.buildings.BuildingPhotos',
        'CRMRE.view.buildings.PlanPhotos',
    ],
    //инициализируем свойства (конструктор объекта)
    initComponent: function () {
        this.compet = true;
        Ext.apply(this, {
            items: [{
            	region: 'center',
        		xtype: 'appBuildingsList',
        		flex:4
    		},{
            	region: 'east',
    			xtype: 'panel',
    			frame: true,
    			autoScroll:true,
        		width: 250,
        		items: [{
        			xtype: 'appBuildingPhotos',
        			frame: true,
        			flex:1,
    			}]
          	},{
                region: 'south',
                xtype: 'panel',
                flex:3.5,
                split: true,
                //title:'Планировки',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [
                {
        			xtype: 'appPlanList',
        			flex:4,
    			},{
    				autoScroll:true,
    				frame: true,
        			width: 250,
        			xtype: 'appPlanPhotos',
    			}]
            }]
        });
        //инициализируем родительский класс;
        this.callParent(arguments);
    }
});