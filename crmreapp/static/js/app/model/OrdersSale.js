Ext.define('CRMRE.model.OrdersSale', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id', type:'auto'},
        {name: 'index', type:'string'},
    	{name: 'author', type:'auto'},//создатель
    	{name: 'performer', type:'auto'},//исполнитель
    	{name: 'heading', type:'string'},//заголовок
    	{name: 'description', type:'string'},//описание
    	{name: 'create_date', dateFormat: 'Y-m-d H:i', type:"datetime"},//дата создания
    	{name: 'modification_date', dateFormat: 'Y-m-d H:i', type:"datetime"},//дата модификации
    	{name: 'object_category', type:'auto'},//категория объекта
    	{name: 'object_type', type:'auto'},//тип объекта
    	{name: 'object_accessory', type:'auto'},//принадлежность объекта
    	{name: 'status', type:'auto'},//статус объекта
    	{name: 'client', type:'auto'},//клиент
        {name: 'client_name', type:'string'},//клиент - имя
        {name: 'represent_name', type:'string'},//клиент - представитель
    	{name: 'total_space', type:'float'},//общая площадь
        {name: 'price',type:'float'},//цена
        {name: 'only_support', type:'boolean'},
        {name: 'show_support', type:'boolean'},
    	{name: 'contract_type', type:'auto'},//тип договора
        {name: 'contract_number', type:'string'},//номер договора
        {name: 'contract_date', dateFormat: 'Y-m-d', type:"date"},//дата договора
        {name: 'contract_end_date', dateFormat: 'Y-m-d', type:"date"},//дата окончания договора
		{name: 'transaction_type', type:'boolean'},//тип сделки
		
        {name: 'rating', type:'integer'},//оценка
        {name: 'rating_comment', type:'string'},//комментарий к оценке
        
        {name: 'commission', type:'boolean'},//комиссионные Да/Нет
        {name: 'commission_type', type:'boolean'},//тип комиссионных
        {name: 'commission_price', type:'float'},//значение комиссионных
        {name: 'other_agency', type:'boolean'},//задействовать другие агенства
        {name: 'agency_commission', type:'boolean'},//комиссионные Да/Нет
        {name: 'agency_commission_type', type:'boolean'},//тип комиссионных
        {name: 'agency_commission_price', type:'float'},//значение комиссионных

        {name: 'coordinates_label', type:'string'},//координаты метки
        {name: 'city', type:'auto'},//город
        {name: 'district', type:'auto'},//район
        {name: 'area', type:'string'},//район
        {name: 'microdistrict', type:'auto'},//микрорайон
        {name: 'street', type:'auto'},//улица
        {name: 'house_number', type:'string'},//номер дома
        {name: 'house_apartment', type:'string'},//номер квартиры
        {name: 'remoteness_center', type:'integer'},//удаленность от центра
        {name: 'nds_type', type:'auto'},//тип НДС
        {name: 'auction', type:'boolean'},//торг
        {name: 'hot_offer', type:'boolean'},//горячее предложение
        {name: 'encumbrance', type:'auto'},//обременение
        {name: 'certificate_title', type:'string'},//свидетельство о праве собственности
        {name: 'certificate_date', dateFormat: 'Y-m-d', type:"date"},//дата свидетельства
        {name: 'cadastre_number', type:'string'},//кадастровый номер
        {name: 'location', type:'string'},//место расположения
        {name: 'access_redline', type:'boolean'},//выход на красную линию
        {name: 'method_payment', type:'auto'},//метод оплаты
        {name: 'comment', type:'string'},//дополнительная информация
        {name: 'construction_stage', type:'boolean'},//стадия строительства
        //{name: 'delivery_period', type:'string'},//Срок сдачи

        {name: 'quarter', type:'integer', useNull: true, defaultValue: null}, //квартал сдачи
		{name: 'year', type:'integer', useNull: true, defaultValue: null}, //год сдачи

        {name: 'number_rooms', type:'integer'},//количество комнат
        {name: 'floors', type:'integer'},//всего этажей
        {name: 'floor', type:'integer'},//этаж
        {name: 'material_walls', type:'auto'},//материал стен
        {name: 'planishing', type:'auto'},//планировка
        {name: 'refinishing', type:'auto'},//отделка
        {name: 'condition', type:'auto'},//состояние
        {name: 'heating', type:'auto'},//отопление
        {name: 'hot_water', type:'auto'},//горячая вода
        {name: 'living_space', type:'float'},//жилая площадь
        {name: 'kitchen_space', type:'float'},//площадь кухни
        {name: 'balcony', type:'auto'},//балкон
        {name: 'balcony_space', type:'float'},//плащадь балкона
        {name: 'landplot_space', type:'float'},//площадь земельного участка
        {name: 'landplot_property', type:'boolean'},//земля в собственности
        {name: 'layout_rooms', type:'auto'},//расположение комнат
        {name: 'bathroom', type:'auto'},//санузел
        {name: 'flooring', type:'auto'},//пол
        {name: 'ceiling_height', type:'float'},//высота потолка
        {name: 'windows', type:'auto'},//окна
        {name: 'lift', type:'boolean'},//лифт
        {name: 'garbage_chute', type:'boolean'},//мусоропровод
        {name: 'laundry', type:'boolean'},//прачечная
        {name: 'garage', type:'boolean'},//гараж
        {name: 'property', type:'string'},//имущество
        {name: 'construction_organization', type:'auto'},//строительная организация
        {name: 'developmentid', type:'string'},//окружение
        {name: 'environment', type:'string'},//окружение
        {name: 'ownership_type', type:'auto'},//вид права
        {name: 'ventilation', type:'boolean'},//вентиляция
        {name: 'firefighting', type:'boolean'},//пожаротушение
        {name: 'number_loading_zones', type:'integer'},//количество зон загрузки
        {name: 'electric_power', type:'integer'},//электрическая мощность
        {name: 'sanitation', type:'boolean'},//водопровод и канализация
        {name: 'branch_line', type:'boolean'},//железнодорожная ветка
        {name: 'rampant', type:'boolean'},//пандус
        {name: 'handling_equipment', type:'boolean'},//погрузочное оборудование
        {name: 'area_maneuvering', type:'boolean'},//площадка для маневрирования
        {name: 'parking', type:'boolean'},//парковка
        {name: 'telephone_communication', type:'boolean'},//телефонная связь
        {name: 'internet', type:'boolean'},//интернет
        {name: 'lease', type:'auto'},//срок аренды
        {name: 'category_earth', type:'auto'},//категория земли
        {name: 'road', type:'auto'},//дорога
        {name: 'gasification', type:'boolean'},//газификация
        {name: 'plumbing', type:'boolean'},//водопровод
        {name: 'well', type:'boolean'},//скважина
        {name: 'sewerage', type:'boolean'},//канализация
        {name: 'reclamation', type:'boolean'},//мелиорация
        {name: 'pond', type:'boolean'},//водоем
        {name: 'green_plantings', type:'auto'},//зеленые насаждения
        {name: 'constructions', type:'auto'},//постройки
        {name: 'fencing', type:'auto'},//ограждение
        {name: 'resources', type:'string'},//ресурсы
        {name: 'current_yield', type:'float'},//текущая доходность
        {name: 'current_expenses', type:'float'},//текущие затраты
        {name: 'founding_date', dateFormat: 'Y-m-d', type:"date"},//дата основания
        {name: 'classified_resources', type:'boolean'},//Выгрузка в бесплатные ресурсы
        {name: 'toll_resources', type:'boolean'},//Выгрузка в платные ресурсы
        {name: 'toll_resources_date', dateFormat: 'Y-m-d', type:"date"},//дата выгрузки
        {name: 'toll_resources_date_end', dateFormat: 'Y-m-d', type:"date"},//дата окончания выгрузки
        {name: 'luxury_housing', type:'boolean'},//Выгрузка в платные ресурсы
        {name: 'tour3d', type:'auto'},
        {name: 'apartments', type:'integer'},
        {name: 'secured', type:'boolean'}
   ]
});