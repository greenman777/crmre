Ext.define('CRMRE.global.Vars', {
	singleton: true,
    user_id: Ext.get('user_id').dom.innerHTML,
    user_firstname: Ext.get('user_firstname').dom.innerHTML,
    user_lastname: Ext.get('user_lastname').dom.innerHTML,
    user_groups: Ext.decode(Ext.get('user_groups').dom.innerHTML),
    user_perms:  Ext.get('user_perms').dom.innerHTML.replace(new RegExp("u\'crmreapp.",'g'), "").replace(new RegExp("\'",'g'), "").slice(5,-2).split(', '),
    csrf_token: Ext.get('csrf_token').dom.innerHTML,
    media_url: Ext.get('media_url').dom.innerHTML,
    user_fullname: Ext.get('user_firstname').dom.innerHTML + ' ' + Ext.get('user_lastname').dom.innerHTML
}); 