Ext.define('CRMRE.view.clients.Details',{
	extend:'Ext.view.View',
	store:['Clients'],
	xtype:'appClientsDetails',
	itemSelector:'panelClientsDetails',
	padding: '10px 10px 10px 10px',
	tpl: new Ext.XTemplate(
        '<tpl>',
            '<p><i>Информация о представителе</i></p>',
            '<p><b>Клиент: </b>{represent}</p>',
            '<hr>',
        '</tpl>',
		'<tpl>',	
			'<p><i>Основная информация</i></p>',
            '<tpl if="values.client_type === true"',
			     '<p><b>Тип клиент: </b>физическое лицо<p>',
            '</tpl>',
            '<tpl if="values.client_type === false"',
                 '<p><b>Тип клиент: </b>юридическое лицо<p>',
            '</tpl>',
            '<p><b>Собственник: </b>{client_name}</p>',
			'<p><b>Телефон 1: </b>{phone_represent}</p>',
			'<p><b>Телефон 2: </b>{phone_main}</p>',
			'<p><b>Телефон 3: </b>{phone_additional}</p>',
			'<p><b>Телефон 4: </b>{fax}</p>',
			'<p><b>Адрес регистрации: </b>{address_registr}</p>',
			'<p><b>Адрес фактический: </b>{address_actual}</p>',
			'<p><b>E-mail: </b>{email}</p>',
			'<p><b>Веб сайт: </b>{www}</p>',
			'<tpl if="values.client_type === true">',
				'<p><b>Род зянятий: </b>{[this.getFieldName(values.occupation,"directory.Occupation")]}</p>',
			'</tpl>',
			'<tpl if="values.client_type === false">',
				'<p><b>Сфера деятельности: </b>{[this.getFieldName(values.sphere,"directory.Sphere")]}</p>',
			'</tpl>',
			'<tpl if="values.vip === true"',
			     '<p><b>VIP клиент</b><p>',
            '</tpl>',
			'<hr>',
		'</tpl>',
		'<tpl if="values.client_type === true">',
			'<p><i>Паспортные данные</i></p>',
			'<p><b>Серия: </b>{passport_series}, <b>Номер: </b>{passport_number}</p>',
			'<p><b>Выдан: </b>{output_place}</p>',
			'<p><b>Дата выдачи: </b>{date_issue}</p>',
			'<hr>',
		'</tpl>',
		'<tpl if="values.client_type === false">',
			'<p><i>Банковские реквизиты</i></p>',
			'<p><b>ИНН/КПП: </b>{inn}/{kpp}, <b>Расчетный счет: </b>{set_account}</p>',
			'<p><b>БИК: </b>{bik}, <b>Кор.счет: </b>{kor_account}</p>',
			'<p><b>В банке: </b>{bank}</p>',
			'<hr>',
		'</tpl>',
		'<tpl if="values.client_type === false">',
			'<p><i>Информация о руководителе</i></p>',
			'<p><b>ФИО: </b>{position_name_im}</p>',
			'<p><b>ФИО в род.пад.: </b>{position_name_gen}</p>',
            '<p><b>Должность: </b>{position}</p>',
			'<p><b>Телефон: </b>{phone_head}, <b>E-mail: </b>{email_head}</p>',
		'</tpl>',
		'<tpl if="values.client_type === true">',
			'<p><i>Личная информация</i></p>',
		'</tpl>',
		'<tpl>',
			'<p><b>Дата рождения: </b>{date_birth}</p>',
			'<tpl if="values.marital_status === true"',
			     '<p><b>Семейное положение: </b>женат<p>',
            '</tpl>',
            '<tpl if="values.marital_status === false"',
                 '<p><b>Семейное положение: </b>холост<p>',
            '</tpl>',
			'<p><b>Количество детей: </b>{children_num}</p>',
			'<p><b>ICQ: </b>{icq}, <b>VK: </b>{vk}, <b>Facebook: </b>{fb}</p>',
		'</tpl>',
		'<tpl>',
			'<p><i>Дополнительная информация</i></p>',
			'<p><b>Источник информации: </b>{[this.getFieldName(values.info_source,"directory.InfoSource")]}</p>',
			'<p><b>Комментарии: </b>{comment}</p>',
			'<hr>',
		'</tpl>',
		
		'<table>',
			'<p><i>Рассылка</i></p>',
            '<tr>',
                '<td>Номер</td>',
                '<td>По почте</td>',
                '<td>по SMS</td>',
            '</tr>',
            '<tr>',
                '<td>1</td>',
                '<td>{pkg_email_1}</td>',
                '<td>{pkg_sms_1}</td>',
            '</tr>',
            '<tr>',
                '<td>2</td>',
                '<td>{pkg_email_2}</td>',
                '<td>{pkg_sms_2}</td>',
            '</tr>',
            '<tr>',
                '<td>3</td>',
                '<td>{pkg_email_3}</td>',
                '<td>{pkg_sms_3}</td>',
            '</tr>',
            '<tr>',
                '<td>4</td>',
                '<td>{pkg_email_4}</td>',
                '<td>{pkg_sms_4}</td>',
            '</tr>',
            '<tr>',
                '<td>5</td>',
                '<td>{pkg_email_5}</td>',
                '<td>{pkg_sms_5}</td>',
            '</tr>',
        '</table>',
		{
	         getFieldName: function(field,store_name){
	         	store = Ext.data.StoreManager.lookup(store_name);
	         	store_rec = store.getById(field);
	            if (store_rec != null) {
                	field_name = store_rec.get('name');
                        return field_name;
	            }
	         }
        }
    )
});