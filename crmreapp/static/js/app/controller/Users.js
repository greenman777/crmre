Ext.define('CRMRE.controller.Users', {
    extend: 'Ext.app.Controller',
    stores: ['Users'],
    models: ['Users'],
    init: function() {
        this.control({
            'appUsersList':{
                selectionchange: this.selectUser
            },
            'appUsersList button[action=update]': {
                click: this.updateRecord
            }
        });
        this.callParent(arguments);
    },
    //При выборе пользователя отображаем подробности
    selectUser: function(selections, model, options) {
        var xtemp = Ext.getCmp('tabpanel').getActiveTab().down('appUsersDetails');
        xtemp.update(selections.getLastSelected().data);
    },
    //обновляем таблицу пользователей
    updateRecord: function(button) {
        var grid = button.up('appUsersList');
        grid.focus();
        var store = grid.getStore();
        var selection = grid.getSelectionModel().getSelection();
        store.load({
            scope: this,
            callback: function(records, operation, success) {
                if (success) {
                    if (selection.length > 0) {
                        grid.getView().focusRow(selection[0]);
                        grid.getSelectionModel().select(selection);
                    }
                    else {
                        grid.getView().focusRow(0);
                        grid.getSelectionModel().select(0);
                    }
                        
                }
            }
         });
    }
});