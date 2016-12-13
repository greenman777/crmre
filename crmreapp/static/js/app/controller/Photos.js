Ext.define('CRMRE.controller.Photos', {
    extend: 'Ext.app.Controller',
    stores: ['Photos'],
    models: ['Photos'],
    views: ['Photos'],
    init: function() {
        this.control({
        	'appPhotos actioncolumn[action=delete]': {
                click: this.deleteRecord
            },
            'appPhotos button[action=cancel]': {
            	click: this.closeForm
            },
            'appPhotos':{
                destroy: this.destroyForm
            }
        });
        this.callParent(arguments);
    },
    deleteRecord: function(gridview, el, rowIndex, colIndex, e, rec, rowEl) {
    	store = gridview.getStore();
    	record = store.getAt(rowIndex); 
    	Ext.MessageBox.confirm('Подтвердите действие!', 'Вы действительно хотите удалить запись?', function(btn){
			if (btn == 'yes') {
	    		store.remove(record);
	    		store.sync();
			}
    	});	
    },
    closeForm: function(button) {
        button.up('window').close();
    },
    destroyForm: function(view, eOpts) {
        var store_photo = Ext.data.StoreManager.lookup('Photos');
        store_photo.reload({
            scope: this,
            callback: function(records, operation, success) {
                if (success) {
                	var grid_order = Ext.getCmp('tabpanel').getActiveTab().down('grid');
			        var store_order = grid_order.getStore();
			        var selection = grid_order.getSelectionModel().getSelection();
			        grid_order.getView().refreshNode(store_order.indexOfId(selection[0].getId()));
                }
            }
        });
    }
});