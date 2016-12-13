Ext.define('CRMRE.util.ShowEvents', {
    requires: ['Ext.util.Observable'],
    onClassMixedIn: function (cls) {
        cls.prototype.fireEvent = function () {
            console.log.apply(console, arguments);
            Ext.util.Observable.prototype.fireEvent.apply(this, arguments);
        };
    }
});