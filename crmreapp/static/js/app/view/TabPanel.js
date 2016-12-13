Ext.define('CRMRE.view.TabPanel', {//панель вкладок
    extend: "Ext.tab.Panel",
    requires: [
    'Ext.ux.TabReorderer'
	],
    xtype:'appTabPanel',
    id:'tabpanel',
    resizeTabs: true,
    enableTabScroll: true,
    defaults: {
        bodyPadding: 0
    },
    initComponent : function() {
        Ext.apply(this, {
            plugins : Ext.create('Ext.ux.TabReorderer')
        })
        this.callParent()
    }
});