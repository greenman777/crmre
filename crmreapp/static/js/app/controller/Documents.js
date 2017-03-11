Ext.define('CRMRE.controller.Documents', {
    extend: 'Ext.app.Controller',
    stores: ['Documents'],
    models: ['Documents'],
    views: ['Documents'],
    init: function() {
        this.control({
        	'appDocuments actioncolumn[action=delete]': {
                click: this.deleteRecord
            },
            'appDocuments button[action=cancel]': {
            	click: this.closeForm
            }
        });
        this.callParent(arguments);
    },
    deleteRecord: function(gridview, el, rowIndex, colIndex, e, rec, rowEl) {
    	store = gridview.getStore();
    	record = store.getAt(rowIndex); 
    	Ext.MessageBox.confirm('Подтвердите действие!', 'Вы действительно хотите удалить документ?', function(btn){
			if (btn == 'yes') {
	    		store.remove(record);
	    		store.sync();
			}
    	});	
    },
    closeForm: function(button) {
        button.up('window').close();
    }
});