#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os,datetime
from django.db import models
from crmre import settings
from django.db.models.signals import pre_save,post_save,pre_delete
from django.contrib.auth.models import Group
from imagekit.models import ProcessedImageField
from pilkit.processors import ResizeToFit
from crmreapp import watermark
from tinymce.models import HTMLField
from django.utils.crypto import get_random_string
import re
from rapidsms.router import send, lookup_connections

TRANSACTION_TYPE = (
    (True, u"Продажа"),
    (False, u"Аренда"),
)

CONSTRUCTION_STAGE = (
    (True, u"Готовый"),
    (False, u"Строящийся"),
)

LEASE = (
    (True, u"Год"),
    (False, u"Квартал"),
)

ORDERS_TYPE = (
    (True, u"Покупка"),
    (False, u"Продажа"),
)

COMMISSION_TYPE = (
    (False, u"Процент"),
    (True, u"Фиксированный"),
)
"""
Start models directory
"""
class AvitoCategory(models.Model):
    name = models.CharField(max_length=50,verbose_name=u'Категория объекта Avito')
    def __unicode__(self):
        return unicode(self.name) or 'u'
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Avito категория объекта недвижимости"

class YandexCategory(models.Model):
    name = models.CharField(max_length=50,verbose_name=u'Категория объекта Yandex')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Yandex категория объекта недвижимости"

class AvitoType(models.Model):
    name = models.CharField(max_length=50,verbose_name=u'Тип объекта Avito',blank=True)
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Avito тип объекта недвижимости"

class ObjectCategory(models.Model):
    name = models.CharField(max_length=40,verbose_name=u'Наименование')
    group = models.ForeignKey(Group,verbose_name=u'Ответственный отдел')
    rate_growth_orders = models.IntegerField(verbose_name=u'Норма прироста заявок')
    rate_growth_contracts = models.IntegerField(verbose_name=u'Норма прироста договоров')
    rate_shows = models.IntegerField(verbose_name=u'Норма показов')
    rate_transactions = models.IntegerField(verbose_name=u'Норма сделок')
     
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Категория объекта недвижимости"

class ObjectType(models.Model):
    name = models.CharField(max_length=50,verbose_name=u'Наименование')
    avito_category = models.ForeignKey(AvitoCategory,blank=True,null=True)
    yandex_category = models.ForeignKey(YandexCategory,blank=True,null=True)
    avito_type = models.ForeignKey(AvitoType,blank=True,null=True)
    object_category = models.ForeignKey(ObjectCategory)
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Тип объекта недвижимости"

class AvitoCity(models.Model):
    name = models.CharField(max_length=40,verbose_name=u'Наименование')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Avito город"

class AvitoDistrict(models.Model):
    name = models.CharField(max_length=40,verbose_name=u'Наименование')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Avito район"

class City(models.Model):
    name = models.CharField(max_length=40,verbose_name=u'Наименование')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Город"

class Street(models.Model):
    name = models.CharField(max_length=40,verbose_name=u'Наименование')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Улица"

class ResidentialComplex(models.Model):
    name = models.CharField(max_length=40,verbose_name=u'Жилой комплекс')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Жилой комплекс"

class Priority(models.Model):
    name = models.CharField(max_length=30,verbose_name=u'Приоритет')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Пиоритет задачи"

class TaskStatus(models.Model):
    name = models.CharField(max_length=30,verbose_name=u'Статус задачи')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Статус задачи"

class InfoSource(models.Model):
    name = models.CharField(max_length=50,verbose_name=u'Источник информации')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Источники информации"

class ObjectAccessory(models.Model):
    name = models.CharField(max_length=30,verbose_name=u'Принадлежность объекта')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Принадлежность объекта"

class ContractType(models.Model):
    name = models.CharField(max_length=30,verbose_name=u'Тип договора')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Тип договора"

class OrderStatus(models.Model):
    name = models.CharField(max_length=30,verbose_name=u'Статус заявки')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Статус заявки"

class NdsType(models.Model):
    name = models.CharField(max_length=20,verbose_name=u'Тип НДС')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Тип НДС"

class MethodPayment(models.Model):
    name = models.CharField(max_length=20,verbose_name=u'Способ оплаты')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Способ оплаты"

class District(models.Model):
    name = models.CharField(max_length=40,verbose_name=u'Район')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Район"

class Microdistrict(models.Model):
    name = models.CharField(max_length=40,verbose_name=u'Микрорайон')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Микрорайон"

class MaterialWalls(models.Model):
    name = models.CharField(max_length=30,verbose_name=u'Материал стен')
    avito_housetype = models.CharField(max_length=30,verbose_name=u'Тип дома Avito',blank=True)
    avito_wallstype = models.CharField(max_length=30,verbose_name=u'Материал стен Avito',blank=True)
    
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Материал стен"

class Planishing(models.Model):
    name = models.CharField(max_length=30,verbose_name=u'Планировка')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Планировка"

class Condition(models.Model):
    name = models.CharField(max_length=30,verbose_name=u'Состояние')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Состояние"

class Refinishing(models.Model):
    name = models.CharField(max_length=30,verbose_name=u'Отделка')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Отделка"
        
class Heating(models.Model):
    name = models.CharField(max_length=30,verbose_name=u'Отопление')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Отопление"

class Balcony(models.Model):
    name = models.CharField(max_length=30,verbose_name=u'Балкон')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Балкон"
        
class LayoutRooms(models.Model):
    name = models.CharField(max_length=30,verbose_name=u'Расположение комнат')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Расположение комнат"

class Bathroom(models.Model):
    name = models.CharField(max_length=30,verbose_name=u'Санузел')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Санузел"

class Flooring(models.Model):
    name = models.CharField(max_length=30,verbose_name=u'Пол')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Пол"

class Windows(models.Model):
    name = models.CharField(max_length=30,verbose_name=u'Окна')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Окна"

class CategoryEarth(models.Model):
    name = models.CharField(max_length=50,verbose_name=u'Категория земли')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Категория земли"

class Road(models.Model):
    name = models.CharField(max_length=30,verbose_name=u'Дорога')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Дорога"

class GreenPlantings(models.Model):
    name = models.CharField(max_length=30,verbose_name=u'Зеленые насаждения')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Зеленые насаждения"

class Constructions(models.Model):
    name = models.CharField(max_length=30,verbose_name=u'Постройки')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Постройки"

class Fencing(models.Model):
    name = models.CharField(max_length=30,verbose_name=u'Оградение')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Ограждение"

class OwnershipType(models.Model):
    name = models.CharField(max_length=30,verbose_name=u'Вид права')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Вид права"

class ResultSentence(models.Model):
    name = models.CharField(max_length=30,verbose_name=u'Результат предложения')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Результат предложеня"

class ResultShow(models.Model):
    name = models.CharField(max_length=30,verbose_name=u'Результат показа')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Результат показа"

class OperationType(models.Model):
    name = models.CharField(max_length=40,verbose_name=u'Название операции')
    heading = models.CharField(max_length=40, verbose_name=u'Краткое описание')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Тип операции"

class Occupation(models.Model):
    name = models.CharField(max_length=50,verbose_name=u'Род занятий')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Род занятий"

class Sphere(models.Model):
    name = models.CharField(max_length=110,verbose_name=u'Сфера деятельности')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Сфера деятельности"

class Encumbrance(models.Model):
    name = models.CharField(max_length=20,verbose_name=u'Обременение')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Обременение"

class Bank(models.Model):
    name = models.CharField(max_length=20,verbose_name=u'Банк')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Банки"

class Lease(models.Model):
    name = models.CharField(max_length=20,verbose_name=u'Срок аренды')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Срок аренды"

class ResultOperation(models.Model):
    name = models.CharField(max_length=40,verbose_name=u'Результат операции')
    heading = models.CharField(max_length=40, verbose_name=u'Краткое описание')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Результат операции"

class MessageType(models.Model):
    name = models.CharField(max_length=30,verbose_name=u'Тип сообщения')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Тип сообщения"
"""
Stop models directory
"""

class DocumentTemplates(models.Model):
    name = models.CharField(max_length=50,verbose_name=u'Наименование шаблона')
    content = HTMLField(verbose_name=u'Содержание')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Шаблоны документов"

class Clients(models.Model):
    index = models.CharField(max_length=9,verbose_name=u'Номер', blank=True, unique=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL,verbose_name=u'Автор')
    create_date = models.DateField(verbose_name=u'Дата создания')
    represent = models.CharField(max_length=80,verbose_name=u'Представитель')
    phone_represent = models.CharField(max_length=11, verbose_name=u'Телефон представителя')
    client_type = models.BooleanField(default=None,verbose_name=u'Тип клиента')
    is_client = models.BooleanField(default=None,verbose_name=u'Является клиентом')
    client_name = models.CharField(max_length=100, verbose_name=u'Клиент',blank=True)
    address_registr = models.CharField(max_length=150, verbose_name=u'Адрес регистрации',blank=True)
    address_actual = models.CharField(max_length=150, verbose_name=u'Адрес фактический',blank=True)
    phone_main = models.CharField(max_length=11, verbose_name=u'Телефон основной',blank=True)
    phone_additional = models.CharField(max_length=11, verbose_name=u'Телефон дополнительный',blank=True)
    fax = models.CharField(max_length=11, verbose_name=u'Факс',blank=True)
    email = models.EmailField(verbose_name=u'E-mail',blank=True)
    www = models.URLField(verbose_name=u'Веб сайт',blank=True) 
    icq = models.CharField(max_length=14, verbose_name=u'ICQ',blank=True)
    vk = models.URLField(verbose_name=u'Vk',blank=True)
    fb = models.URLField(verbose_name=u'fb',blank=True)
    date_birth = models.DateField(verbose_name=u'Дата рождения',blank=True,null=True)
    marital_status = models.BooleanField(default=None,verbose_name=u'Семейное положение',blank=True)
    children_num = models.IntegerField(verbose_name=u'Количество несовершеннолетних детей',blank=True,null=True)
    info_source = models.ForeignKey(InfoSource,verbose_name=u'Источник информации',blank=True,null=True)
    information = models.CharField(max_length=150, verbose_name=u'Дополнительная информация',blank=True)
    fullname_gen = models.CharField(max_length=100, verbose_name=u'ФИО в родительном падеже',blank=True)
    passport_series = models.CharField(max_length=4, verbose_name=u'Серия паспорта',blank=True)
    passport_number = models.CharField(max_length=6, verbose_name=u'Номер паспорта',blank=True)
    output_place = models.CharField(max_length=150, verbose_name=u'Место выдачи паспорта',blank=True)
    date_issue = models.DateField(verbose_name=u'Дата выдачи паспорта',blank=True,null=True)
    inn = models.CharField(max_length=12, verbose_name=u'ИНН',blank=True)
    kpp = models.CharField(max_length=9, verbose_name=u'КПП',blank=True)
    set_account = models.CharField(max_length=20, verbose_name=u'Расчетный счет',blank=True)
    bik = models.CharField(max_length=9, verbose_name=u'БИК',blank=True)
    kor_account = models.CharField(max_length=20, verbose_name=u'Кор. счет',blank=True)
    bank = models.CharField(max_length=100, verbose_name=u'Банк',blank=True)
    position_name_im = models.CharField(max_length=100, verbose_name=u'ФИО в именительном падеже',blank=True)
    position_name_gen = models.CharField(max_length=100, verbose_name=u'ФИО в родительном падеже',blank=True)
    position = models.CharField(max_length=50,verbose_name=u'Должность руководителя',blank=True)
    phone_head = models.CharField(max_length=11, verbose_name=u'Телефон руководителя',blank=True) 
    email_head = models.EmailField(verbose_name=u'E-mail руководителя',blank=True)
    vip = models.BooleanField(default=False,verbose_name=u'VIP клиент')
    occupation = models.ForeignKey(Occupation,verbose_name=u'Род занятий',blank=True,null=True)
    sphere = models.ForeignKey(Sphere,verbose_name=u'Сфера деятельности',blank=True,null=True)
    pkg_email_1 = models.BooleanField(default=True,verbose_name=u'Рассылка по E-mail 1')
    pkg_email_2 = models.BooleanField(default=False,verbose_name=u'Рассылка по E-mail 2')
    pkg_email_3 = models.BooleanField(default=False,verbose_name=u'Рассылка по E-mail 3')
    pkg_email_4 = models.BooleanField(default=False,verbose_name=u'Рассылка по E-mail 4')
    pkg_email_5 = models.BooleanField(default=False,verbose_name=u'Рассылка по E-mail 5')
    pkg_sms_1 = models.BooleanField(default=True,verbose_name=u'Рассылка по SMS 1')
    pkg_sms_2 = models.BooleanField(default=False,verbose_name=u'Рассылка по SMS 2')
    pkg_sms_3 = models.BooleanField(default=False,verbose_name=u'Рассылка по SMS 3')
    pkg_sms_4 = models.BooleanField(default=False,verbose_name=u'Рассылка по SMS 4')
    pkg_sms_5 = models.BooleanField(default=False,verbose_name=u'Рассылка по SMS 5')
    
    def __unicode__(self):
        return unicode(" ".join((self.index,self.client_name)))
    
    class Meta:
        ordering = ['client_name','represent']
        verbose_name_plural = u"Клиенты"
        permissions = (
            ("view_hidden_fields_clients", "View hidden fields clients"),
            ("view_hidden_clients_brigade", "View hidden clients brigade"),
            ("can_change_all_clients", "Can change all clients"),
        )
    
    def save(self, force_insert=False, force_update=False, using=None):
        if (self._state.adding):
            self.index = get_random_string(9,'123456789')
            while Clients.objects.filter(index=self.index):
                self.index = get_random_string(9,'123456789')
        super(Clients, self).save()

class ClientComments(models.Model):
    client = models.ForeignKey(Clients,verbose_name=u'Клиент')
    author = models.ForeignKey(settings.AUTH_USER_MODEL,verbose_name=u'Автор')
    comment = models.CharField(max_length=300,verbose_name=u'Комментарий')
    create_date = models.DateField(verbose_name=u'Дата создания')
    def __unicode__(self):
        return unicode(self.comment) or u''
    class Meta:
        ordering = ['pk']
        verbose_name_plural = u"Комментарии к клиенту"

class ConstructionOrganization(models.Model):
    name = models.CharField(max_length=60,verbose_name=u'Строительная организация')
    client = models.ForeignKey(Clients, verbose_name=u'Описание клиента')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Строительная организация"

class Buildings(models.Model):
    index = models.CharField(max_length=9,verbose_name=u'Номер', blank=True, unique=True)
    heading = models.CharField(max_length=80,verbose_name=u'Название новостройки')
    description = models.CharField(max_length=6000, verbose_name=u'Описание новостройки',blank=True)
    residential_complex = models.ForeignKey(ResidentialComplex,verbose_name=u'Жилой комплекс',blank=True,null=True)
    performer = models.ForeignKey(settings.AUTH_USER_MODEL,verbose_name=u'Исполнитель',blank=True,null=True)
    create_date = models.DateTimeField(auto_now_add=True, verbose_name=u'Дата создания')
    modification_date = models.DateTimeField(auto_now=True,verbose_name=u'Дата последней модификации')
    coordinates_label = models.CharField(max_length=15, verbose_name=u'Координаты метки',blank=True)
    city = models.ForeignKey(City,verbose_name=u'Город',blank=True,null=True)
    district = models.ForeignKey(District,verbose_name=u'Район',blank=True,null=True)
    microdistrict = models.ForeignKey(Microdistrict,verbose_name=u'Микрорайон',blank=True,null=True)
    street = models.ForeignKey(Street,verbose_name=u'Город',blank=True,null=True)
    house_number = models.CharField(max_length=10,verbose_name=u'Номер дома',blank=True)
    construction_organization = models.ForeignKey(ConstructionOrganization,verbose_name=u'Строительная организация',blank=True,null=True)
    construction_stage = models.BooleanField(default=True,verbose_name=u'Стадия строительства')
    #delivery_period = models.CharField(max_length=30, verbose_name=u'Срок сдачи',blank=True)
    quarter = models.IntegerField(verbose_name=u'Квартал сдачи дома',blank=True,null=True)
    year = models.IntegerField(verbose_name=u'Год сдачи дома', blank=True, null=True)
    floors = models.IntegerField(verbose_name=u'Этажей',blank=True,null=True)
    number_entrances = models.IntegerField(verbose_name=u'Количество подъездов',blank=True,null=True)
    material_walls = models.ForeignKey(MaterialWalls,verbose_name=u'Материал стен',blank=True,null=True)
    purpose = models.CharField(max_length=500, verbose_name=u'Назначение объекта',blank=True)
    technology = models.CharField(max_length=500, verbose_name=u'Технология строительства',blank=True)
    finish = models.CharField(max_length=1000, verbose_name=u'Отделка',blank=True)
    communication = models.CharField(max_length=500, verbose_name=u'Коммуникации',blank=True)
    accessibility = models.CharField(max_length=500, verbose_name=u'Транспортная и пешеходная доступность',blank=True)
    infrastructure = models.CharField(max_length=500, verbose_name=u'Инфраструктура района',blank=True)
    features = models.CharField(max_length=500, verbose_name=u'Особенности',blank=True)
    caption1 = models.CharField(max_length=50, verbose_name=u'Подпись 1',blank=True)
    caption2 = models.CharField(max_length=50, verbose_name=u'Подпись 2',blank=True)
    stamp1 = models.BooleanField(default=False,verbose_name=u'Печать 1')
    stamp2 = models.BooleanField(default=False,verbose_name=u'Печать 2') 
    hot_offer = models.BooleanField(default=False,verbose_name=u'Печать 2') 
    priority = models.IntegerField(default=20,verbose_name=u'Приоритет',blank=True,null=True)
    tour3d = models.URLField(verbose_name=u'3D тур',blank=True)
    reclame1 = models.CharField(max_length=90, verbose_name=u'Реклама 1',blank=True)
    reclame2 = models.CharField(max_length=90, verbose_name=u'Реклама 2',blank=True)
    reclame3 = models.CharField(max_length=90, verbose_name=u'Реклама 3',blank=True)
    contract_number = models.CharField(max_length=20, verbose_name=u'Номер договора', blank=True)
    contract_date = models.DateField(verbose_name=u'Дата договора', blank=True, null=True)
    commission = models.DecimalField(max_digits=8, decimal_places=2, verbose_name=u'Значение коммисионных', blank=True,null=True)
    developmentid = models.CharField(max_length=30, verbose_name=u'Код новостройки Авито', blank=True)
    apartments = models.IntegerField(verbose_name=u'Количество квартир', blank=True, null=True)

    def __unicode__(self):
        return unicode(self.heading) or u''
    class Meta:
        ordering = ['create_date']
        verbose_name_plural = u"Новостройки"
    
    def save(self, force_insert=False, force_update=False, using=None):
        if (self._state.adding):
            self.index = get_random_string(9,'123456789')
            while Buildings.objects.filter(index=self.index):
                self.index = get_random_string(9,'123456789')
        super(Buildings, self).save()

class Watermark(object):
    water = os.path.join(settings.MEDIA_ROOT,"water_img.png")
    water_image = watermark.ImageWatermark(water,
                                           position=('center','center'),
                                           repeat=False,
                                           opacity=0.4)
    def process(self,image):
        image = self.water_image.process(image)
        return image

def get_building_photo_name(instance, filename):
    ext = filename.split('.')[-1].lower()
    rec =  Buildings.objects.get(id=instance.building.id)
    filename = "%s_%s.%s" % (rec.index, get_random_string(4,'123456789'), ext)
    while BuildingPhotos.objects.filter(photo=os.path.join(instance.directory_string_var, filename)):
        filename = "%s_%s.%s" % (rec.index, get_random_string(4,'123456789'), ext)
    return os.path.join(instance.directory_string_var, filename)

class BuildingPhotos(models.Model):
    
    building = models.ForeignKey(Buildings,verbose_name=u'Новостройка')
    description = models.CharField(max_length=60, verbose_name=u'Описание')
    photo = ProcessedImageField(upload_to=get_building_photo_name,processors=[ResizeToFit(width=None, height=600, upscale=True, mat_color=None)],
                                format='JPEG',options={'quality': 60})
    directory_string_var = 'photos_building'
    
    def __unicode__(self):
        return unicode(self.description) or u''
    class Meta:
        ordering = ['description']
        verbose_name_plural = u"Фотографии планировок"

class Plan(models.Model):
    building = models.ForeignKey(Buildings,verbose_name=u'Новостройка')
    number_rooms = models.IntegerField(verbose_name=u'Количество комнат',blank=True,null=True)
    space = models.DecimalField(verbose_name=u'Площадь',max_digits=8, decimal_places=2,blank=True,null=True)
    floor = models.CharField(max_length=30, verbose_name=u'Этаж',blank=True)
    entrance = models.CharField(max_length=30, verbose_name=u'Подъезд',blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2,verbose_name=u'Цена за кв.м.',blank=True,null=True)
    price_full = models.DecimalField(max_digits=10, decimal_places=2, verbose_name=u'Цена квартиры', blank=True, null=True)
    tour3d = models.URLField(verbose_name=u'3D тур',blank=True)
    prompt = models.CharField(max_length=75, verbose_name=u'Подсказка',blank=True)
    commission = models.DecimalField(max_digits=4, decimal_places=2,verbose_name=u'Агентское вознаграждение',blank=True,null=True)
    modification_date = models.DateTimeField(auto_now=True, verbose_name=u'Дата последней модификации')

    def __unicode__(self):
        return unicode(self.number_rooms) or u''
    class Meta:
        ordering = ['number_rooms','space','price']
        verbose_name_plural = u"Планировки"

def get_plan_photo_name(instance, filename):
    ext = filename.split('.')[-1].lower()
    rec =  Buildings.objects.get(id=instance.plan.building.id)
    filename = "%s_%s.%s" % (rec.index, get_random_string(4,'123456789'), ext)
    while PlanPhotos.objects.filter(photo=os.path.join(instance.directory_string_var, filename)):
        filename = "%s_%s.%s" % (rec.index, get_random_string(4,'123456789'), ext)
    return os.path.join(instance.directory_string_var, filename)

def pre_plan_save(sender, instance, **kwargs):
    parent = instance.building
    parent.modification_date = datetime.datetime.now()
    parent.save()

def pre_plan_delete(sender, instance, **kwargs):
    parent = instance.building
    parent.modification_date = datetime.datetime.now()
    parent.save()

pre_save.connect(pre_plan_save, sender=Plan)
pre_delete.connect(pre_plan_delete, sender=Plan)

class PlanPhotos(models.Model):
    
    plan = models.ForeignKey(Plan,verbose_name=u'Планировка')
    description = models.CharField(max_length=60, verbose_name=u'Описание')
    photo = ProcessedImageField(upload_to=get_plan_photo_name,processors=[ResizeToFit(width=None, height=600, upscale=True, mat_color=None)],
                                format='JPEG',options={'quality': 60})
    directory_string_var = 'photos_plan'
    
    def __unicode__(self):
        return unicode(self.description) or u''
    class Meta:
        ordering = ['description']
        verbose_name_plural = u"Фотографии планировок"

def htmlfield_format(description):

    p_font = re.compile(r'<font.*?>|</font>')
    p_u = re.compile(r'<u>|</u>')
    p_ol = re.compile(r'<ol.*?>')
    p_ul = re.compile(r'<ul.*?>')
    p_div = re.compile(r'<div.*?>')
    description = p_font.sub('', description)
    description = p_u.sub('', description)
    description = p_ul.sub('<ul>', description)
    description = p_ol.sub('<ol>', description)
    description = p_div.sub('<div>', description)
    return description

class OrdersSale(models.Model):
    
    index = models.CharField(max_length=9,verbose_name=u'Номер', blank=True, unique=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL,related_name='authors_orders_sale',verbose_name=u'Создатель')
    performer = models.ForeignKey(settings.AUTH_USER_MODEL,related_name='performers_orders_sale',verbose_name=u'Исполнитель',blank=True,null=True)
    heading = models.CharField(max_length=80,verbose_name=u'Название заявки')
    description = models.CharField(max_length=6000, verbose_name=u'Описание заявки',blank=True)
    create_date = models.DateTimeField(auto_now_add=True,verbose_name=u'Дата создания')
    modification_date = models.DateTimeField(auto_now=True,verbose_name=u'Дата последней модификации')
    status = models.ForeignKey(OrderStatus,verbose_name=u'Статус заявки')
    object_category = models.ForeignKey(ObjectCategory,verbose_name=u'Категория объекта')
    object_type = models.ForeignKey(ObjectType,verbose_name=u'Тип объекта')
    object_accessory = models.ForeignKey(ObjectAccessory,verbose_name=u'Принадлежность объекта',blank=True,null=True)
    total_space = models.DecimalField(verbose_name=u'Общая площадь',max_digits=8, decimal_places=2,blank=True,null=True)
    price = models.DecimalField(max_digits=11, decimal_places=2,verbose_name=u'Цена',blank=True,null=True)
    client = models.ForeignKey(Clients,verbose_name=u'Собственник')
    only_support = models.BooleanField(default=False,verbose_name=u'Только сопровождение')
    show_support = models.BooleanField(default=False,verbose_name=u'Показать юристу')
    house_number = models.CharField(max_length=10,verbose_name=u'Номер дома',blank=True)
    house_apartment = models.CharField(max_length=5,verbose_name=u'Номер квартиры',blank=True)
    encumbrance = models.ForeignKey(Encumbrance,verbose_name=u'Обременение',blank=True,null=True)
    certificate_title = models.CharField(max_length=30,verbose_name=u'Свидетельство о праве собственности', blank=True)
    certificate_date = models.DateField(verbose_name=u'Дата свидетельства',blank=True,null=True)
    cadastre_number = models.CharField(max_length=50,verbose_name=u'Кадастровый номер', blank=True)
    comment = models.CharField(max_length=300, verbose_name=u'Дополнительная информация',blank=True)
    location = models.CharField(max_length=100,verbose_name=u'Место расположения',blank=True)
    access_redline = models.BooleanField(default=None,verbose_name=u'Выход на красную линию',blank=True)
    rating = models.IntegerField(verbose_name=u'Оценка работы',blank=True,null=True)
    rating_comment = models.CharField(max_length=100, verbose_name=u'Комментарий к оценке',blank=True)
    luxury_housing = models.BooleanField(default=False,verbose_name=u'Элитное жилье')
                                                                                                         
    contract_type = models.ForeignKey(ContractType,verbose_name=u'Тип договора',blank=True,null=True)
    contract_number = models.CharField(max_length=20, verbose_name=u'Номер договора',blank=True)
    contract_date = models.DateField(verbose_name=u'Дата договора',blank=True,null=True)
    contract_end_date = models.DateField(verbose_name=u'Дата окончания договора',blank=True,null=True)
    
    transaction_type = models.BooleanField(default=None,choices=TRANSACTION_TYPE,verbose_name=u'Тип сделки')

    commission = models.BooleanField(default=None,verbose_name=u'Включать комиссионные',blank=True)
    commission_type = models.BooleanField(default=None,choices=COMMISSION_TYPE,verbose_name=u'Тип коммиссионных',blank=True)#процент/фиксированная величина
    commission_price = models.DecimalField(max_digits=8, decimal_places=2,verbose_name=u'Значение коммисионных',blank=True,null=True)
    other_agency = models.BooleanField(default=None,verbose_name=u'Задействовать другие агенства',blank=True)
    agency_commission = models.BooleanField(default=None,verbose_name=u'Включать комиссионные',blank=True)
    agency_commission_type = models.BooleanField(default=None,choices=COMMISSION_TYPE,verbose_name=u'Тип комиссионных',blank=True)#процент/фиксированная величина
    agency_commission_price = models.DecimalField(max_digits=8, decimal_places=2,verbose_name=u'Значение коммисионных',blank=True,null=True)

    nds_type = models.ForeignKey(NdsType,verbose_name=u'Тип НДС',blank=True,null=True)
    auction = models.BooleanField(default=True,verbose_name=u'Торг')
    hot_offer = models.BooleanField(default=False,verbose_name=u'Горячее предложение')
    method_payment = models.ForeignKey(MethodPayment,verbose_name=u'Метод оплаты',blank=True,null=True)

    coordinates_label = models.CharField(max_length=15, verbose_name=u'Координаты метки',blank=True)
    city = models.ForeignKey(City,verbose_name=u'Город',blank=True,null=True)
    district = models.ForeignKey(District,verbose_name=u'Район',blank=True,null=True)
    area = models.CharField(max_length=40, verbose_name=u'Дистрикт', blank=True)
    microdistrict = models.ForeignKey(Microdistrict,verbose_name=u'Микрорайон',blank=True,null=True)
    street = models.ForeignKey(Street,verbose_name=u'Город',blank=True,null=True)
    remoteness_center = models.IntegerField(verbose_name=u'Удаленность от центра',blank=True,null=True)
    construction_stage = models.BooleanField(default=True,verbose_name=u'Стадия строительства')
    #delivery_period = models.CharField(max_length=30, verbose_name=u'Срок сдачи',blank=True)

    quarter = models.IntegerField(verbose_name=u'Квартал сдачи дома', blank=True, null=True)
    year = models.IntegerField(verbose_name=u'Год сдачи дома', blank=True, null=True)

    number_rooms = models.IntegerField(verbose_name=u'Количество комнат',blank=True,null=True)
    floors = models.IntegerField(verbose_name=u'Этажей',blank=True,null=True)
    floor = models.IntegerField(verbose_name=u'Этаж',blank=True,null=True)
    material_walls = models.ForeignKey(MaterialWalls,verbose_name=u'Материал стен',blank=True,null=True)
    planishing = models.ForeignKey(Planishing,verbose_name=u'Планировка',blank=True,null=True)
    refinishing = models.ForeignKey(Refinishing,verbose_name=u'Отделка',blank=True,null=True)
    condition = models.ForeignKey(Condition,verbose_name=u'Состояние',blank=True,null=True)
    heating = models.ForeignKey(Heating,related_name='heating',verbose_name=u'Отопление',blank=True,null=True)
    hot_water = models.ForeignKey(Heating,related_name='hot_water',verbose_name=u'Горячая вода',blank=True,null=True)
    living_space = models.DecimalField(verbose_name=u'Жилая площадь',max_digits=8, decimal_places=2,blank=True,null=True)
    kitchen_space = models.DecimalField(verbose_name=u'Площадь кухни',max_digits=8, decimal_places=2,blank=True,null=True)
    balcony = models.ForeignKey(Balcony,verbose_name=u'Балкон',blank=True,null=True)
    balcony_space = models.DecimalField(verbose_name=u'Площадь балконов',max_digits=6, decimal_places=2,blank=True,null=True)
    landplot_space = models.DecimalField(verbose_name=u'Площадь земельного участка',max_digits=8, decimal_places=2,blank=True,null=True)
    landplot_property = models.BooleanField(default=True,verbose_name=u'Земля в собственности')
    layout_rooms = models.ForeignKey(LayoutRooms,verbose_name=u'Расположение комнат',blank=True,null=True)
    bathroom = models.ForeignKey(Bathroom,verbose_name=u'Санузел',blank=True,null=True)
    flooring = models.ForeignKey(Flooring,verbose_name=u'Пол',blank=True,null=True)
    ceiling_height = models.DecimalField(verbose_name=u'Высота потолка',max_digits=4, decimal_places=1,blank=True,null=True)
    windows = models.ForeignKey(Windows,verbose_name=u'Окна',blank=True,null=True)
    lift = models.BooleanField(default=True,verbose_name=u'Лифт')
    garbage_chute = models.BooleanField(default=False,verbose_name=u'Мусоропровод')
    laundry = models.BooleanField(default=False,verbose_name=u'Прачечная')
    garage = models.BooleanField(default=False,verbose_name=u'Гараж')
    property = models.CharField(max_length=120, verbose_name=u'Имущество',blank=True)
    construction_organization = models.ForeignKey(ConstructionOrganization,verbose_name=u'Строительная организация',blank=True,null=True)
    environment = models.CharField(max_length=150, verbose_name=u'Окружение',blank=True)
    ownership_type = models.ForeignKey(OwnershipType,verbose_name=u'Вид права',blank=True,null=True)
    ventilation = models.BooleanField(default=False,verbose_name=u'Вентиляция')
    firefighting = models.BooleanField(default=False,verbose_name=u'Пожаротушение')
    number_loading_zones = models.IntegerField(verbose_name=u'Количество зон загрузки',blank=True,null=True)
    electric_power = models.IntegerField(verbose_name=u'Электрическая мощность',blank=True,null=True)
    sanitation = models.BooleanField(default=True,verbose_name=u'Водопровод и канализация')
    branch_line = models.BooleanField(default=True,verbose_name=u'Железнодорожная ветка')
    rampant = models.BooleanField(default=True,verbose_name=u'Пандус')
    handling_equipment = models.BooleanField(default=True,verbose_name=u'Погрузочное оборудование')
    area_maneuvering = models.BooleanField(default=False,verbose_name=u'Площадка для маневрирования')
    parking = models.BooleanField(default=False,verbose_name=u'Парковка')
    telephone_communication = models.BooleanField(default=False,verbose_name=u'Телефонная связь')
    internet = models.BooleanField(default=False,verbose_name=u'Интернет')
    lease = models.ForeignKey(Lease,verbose_name=u'Срок аренды',blank=True,null=True)
    category_earth = models.ForeignKey(CategoryEarth,verbose_name=u'Категория земли',blank=True,null=True)
    road = models.ForeignKey(Road,verbose_name=u'Дорога',blank=True,null=True)
    gasification = models.BooleanField(default=False,verbose_name=u'Газификация')
    plumbing = models.BooleanField(default=False,verbose_name=u'Водопровод')
    well = models.BooleanField(default=False,verbose_name=u'Скажина')
    sewerage = models.BooleanField(default=False,verbose_name=u'Канализация')
    reclamation = models.BooleanField(default=False,verbose_name=u'Мелиорация')
    pond = models.BooleanField(default=False,verbose_name=u'Водоем')
    green_plantings = models.ForeignKey(GreenPlantings,verbose_name=u'Зеленые насаждения',blank=True,null=True)
    constructions = models.ForeignKey(Constructions,verbose_name=u'Постройки',blank=True,null=True)
    fencing = models.ForeignKey(Fencing,verbose_name=u'Ограждение',blank=True,null=True)
    resources = models.CharField(max_length=120, verbose_name=u'Ресурсы',blank=True)
    current_yield = models.DecimalField(verbose_name=u'Текущая доходность',max_digits=8, decimal_places=2,blank=True,null=True)
    current_expenses = models.DecimalField(verbose_name=u'Текущие затраты',max_digits=8, decimal_places=2,blank=True,null=True)
    founding_date = models.DateField(verbose_name=u'Дата основания',blank=True,null=True)
    classified_resources = models.BooleanField(default=False,verbose_name=u'Выгрузка в бесплатные ресурсы')
    toll_resources = models.BooleanField(default=False,verbose_name=u'Выгрузка в платные ресурсы')
    toll_resources_date = models.DateField(verbose_name=u'Дата начала выгрузки в платные ресурсы',blank=True,null=True)
    toll_resources_date_end = models.DateField(verbose_name=u'Дата конца выгрузки в платные ресурсы', blank=True,null=True)
    tour3d = models.URLField(verbose_name=u'3D тур',blank=True)
    developmentid = models.CharField(max_length=30, verbose_name=u'Код новостройки Авито', blank=True)
    secured = models.BooleanField(default=False, verbose_name=u'Охрана')

    def __unicode__(self):
        return unicode(self.heading) or u''
    class Meta:
        ordering = ['-create_date']
        verbose_name_plural = u"Заявки на продажу"
        permissions = (
            ("view_all_orders-sale", "View all Orders Sale"),
            ("view_free_orders-sale", "View free Orders Sale"),
            ("view_my_orders-sale", "View my Orders Sale"),
            ("change_all_orders-sale", "Change all Orders Sale"),
            ("share_orders-sale", "Share Orders Sale"),
            ("lock_orders-sale", "Lock Orders Sale"),
            ("uploading_orders-sale", "Uploading Orders Sale"),
            ("uploading_orders-all", "Uploading Orders All"),
            ("change_advertising", "Change advertising"),
            ("ability_change_olddate", "Аbility to change the old date"),
            ("free_resources_show", "Free resources show"),
        )

    def save(self, force_insert=False, force_update=False, using=None):
        self.description = htmlfield_format(self.description)
        if self.toll_resources == False: self.toll_resources_date = None
        if (self._state.adding):
            self.index = get_random_string(9,'123456789')
            while OrdersSale.objects.filter(index=self.index):
                self.index = get_random_string(9,'123456789')
        super(OrdersSale, self).save()
        
def get_file_name(instance, filename):
    ext = filename.split('.')[-1].lower()
    rec =  OrdersSale.objects.get(id=instance.object.id)
    filename = "%s_%s.%s" % (rec.index, get_random_string(4,'123456789'), ext)
    while Photos.objects.filter(photo=os.path.join(instance.directory_string_var, filename)):
        filename = "%s_%s.%s" % (rec.index, get_random_string(4,'123456789'), ext)
    return os.path.join(instance.directory_string_var, filename)

class Photos(models.Model):
    
    object = models.ForeignKey(OrdersSale,verbose_name=u'Объект')
    description = models.CharField(max_length=60, verbose_name=u'Описание')
    photo = ProcessedImageField(upload_to=get_file_name,
                                processors=[ResizeToFit(width=None, height=600, upscale=True, mat_color=None)],format='JPEG', options={'quality': 60})
    directory_string_var = 'photos'

    #def save(self):
    #    photo = Image.open(self.photo)
    #    print(photo.size)
    #    super(Photos, self).save()

    def __unicode__(self):
        return unicode(self.description) or u''
    class Meta:
        ordering = ['description']
        verbose_name_plural = u"Фотографии объектов"

def pre_photo_save(sender, instance, **kwargs):
    try:
        if sender==Photos:
            parent = instance.object
        if sender==BuildingPhotos:
            parent = instance.building
        if sender==PlanPhotos:
            parent = instance.plan.building
        parent.modification_date = datetime.datetime.now()
        parent.save()
        
        rec =  sender.objects.get(id=instance.id)
        if rec.photo.path != instance.photo.path:
            rec.photo.delete()
    except (sender.DoesNotExist, ValueError):
        pass
        
def pre_photo_delete(sender, instance, **kwargs):
    try:
        if sender==Photos:
            parent = instance.object
        if sender==BuildingPhotos:
            parent = instance.building
        if sender==PlanPhotos:
            parent = instance.plan.building
        parent.modification_date = datetime.datetime.now()
        parent.save()
        
        rec = sender.objects.get(id=instance.id)
        rec.photo.delete()
    except (sender.DoesNotExist, ValueError):
        pass

pre_save.connect(pre_photo_save, sender=Photos)
pre_delete.connect(pre_photo_delete, sender=Photos)
pre_save.connect(pre_photo_save, sender=PlanPhotos)
pre_delete.connect(pre_photo_delete, sender=PlanPhotos)
pre_save.connect(pre_photo_save, sender=BuildingPhotos)
pre_delete.connect(pre_photo_delete, sender=BuildingPhotos)



class OrdersBuy(models.Model):
    
    index = models.CharField(max_length=9,verbose_name=u'Номер', blank=True, unique=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL,related_name='authors_oders',verbose_name=u'Создатель')
    performer = models.ForeignKey(settings.AUTH_USER_MODEL,related_name='performers_oders',verbose_name=u'Исполнитель',blank=True,null=True)
    create_date = models.DateTimeField(auto_now_add=True,verbose_name=u'Дата создания')
    modification_date = models.DateTimeField(auto_now=True,verbose_name=u'Дата последней модификации')
    status = models.ForeignKey(OrderStatus,verbose_name=u'Статус заявки')
    heading = models.CharField(max_length=80,verbose_name=u'Название заявки')
    description = models.CharField(max_length=1200, verbose_name=u'Описание заявки',blank=True)
    object_category = models.ForeignKey(ObjectCategory,verbose_name=u'Категория объекта')
    client = models.ForeignKey(Clients,verbose_name=u'Клиент')
    transaction_type = models.BooleanField(default=None,verbose_name=u'Тип сделки')
    only_support = models.BooleanField(default=False,verbose_name=u'Только сопровождение')
    show_support = models.BooleanField(default=False,verbose_name=u'Показать юристу')
    flag_edit = models.BooleanField(default=False,verbose_name=u'Статус для редактирования')
    rating = models.IntegerField(verbose_name=u'Оценка работы',blank=True,null=True)
    rating_comment = models.CharField(max_length=100, verbose_name=u'Комментарий к оценке',blank=True)
    
    contract_type = models.ForeignKey(ContractType,verbose_name=u'Тип договора',blank=True,null=True)
    contract_number = models.CharField(max_length=20, verbose_name=u'Номер договора',blank=True)
    contract_date = models.DateField(verbose_name=u'Дата договора',blank=True,null=True)
    contract_end_date = models.DateField(verbose_name=u'Дата окончания договора',blank=True,null=True)
    
    mortgage = models.BooleanField(default=False,verbose_name=u'Требует ипотечного кредита')
    cash = models.DecimalField(max_digits=10, decimal_places=2,verbose_name=u'Сумма наличных',blank=True,null=True)
    bank = models.ForeignKey(Bank,verbose_name=u'Банк',blank=True,null=True)
    
    commission = models.BooleanField(default=None,verbose_name=u'Включать комиссионные',blank=True)
    commission_type = models.BooleanField(default=None,choices=COMMISSION_TYPE,verbose_name=u'Тип коммиссионных',blank=True)#процент/фиксированная величина
    commission_price = models.DecimalField(max_digits=8, decimal_places=2,verbose_name=u'Значение коммисионных',blank=True,null=True)
    other_agency = models.BooleanField(default=None,verbose_name=u'Задействовать другие агенства',blank=True)
    agency_commission = models.BooleanField(default=None,verbose_name=u'Включать комиссионные',blank=True)
    agency_commission_type = models.BooleanField(default=None,choices=COMMISSION_TYPE,verbose_name=u'Тип комиссионных',blank=True)#процент/фиксированная величина
    agency_commission_price = models.DecimalField(max_digits=8, decimal_places=2,verbose_name=u'Значение коммисионных',blank=True,null=True)
    
    price_from = models.DecimalField(max_digits=11, decimal_places=2,verbose_name=u'Цена, от',blank=True,null=True)
    price_to = models.DecimalField(max_digits=11, decimal_places=2,verbose_name=u'Цена, до',blank=True,null=True)
    space_from = models.DecimalField(verbose_name=u'Общая площадь, от',max_digits=8, decimal_places=2,blank=True,null=True)
    space_to = models.DecimalField(verbose_name=u'Общая площадь, до',max_digits=8, decimal_places=2,blank=True,null=True)
    remoteness_from = models.IntegerField(verbose_name=u'Удаленность от центра, от',blank=True,null=True)
    remoteness_to = models.IntegerField(verbose_name=u'Удаленность от центра, до',blank=True,null=True)
    
    classified_resources = models.BooleanField(default=False,verbose_name=u'Выгрузка в бесплатные ресурсы')
    toll_resources = models.BooleanField(default=False,verbose_name=u'Выгрузка в платные ресурсы')
    comment = models.CharField(max_length=300, verbose_name=u'Дополнительная информация',blank=True)
    
    def __unicode__(self):
        return unicode(self.heading) or u''
    class Meta:
        ordering = ['-create_date']
        verbose_name_plural = u"Заявки на покупку"
        permissions = (
            ("view_all_orders-buy", "View all Orders Buy"),
            ("view_free_orders-buy", "View free Orders Buy"),
            ("view_my_orders-buy", "View my Orders Buy"),
            ("change_all_orders-buy", "Change all Orders Buy"),
            ("share_orders-buy", "Share Orders Buy"),
            ("credit_manager", "Credit manager"),
            ("show_support", "Show support"),
            ("create_order_active", "Create order active"),
            ("lock_orders-buy", "Lock Orders Buy"),
            ("reports_all_view","Reports all view"),
            ("rating_agent","Rating agent"),
            ("brigadier","Brigadier")
        )
    
    def save(self, force_insert=False, force_update=False, using=None):
        if (self._state.adding):
            self.index = get_random_string(9,'123456789')
            while OrdersBuy.objects.filter(index=self.index):
                self.index = get_random_string(9,'123456789')
        super(OrdersBuy, self).save()

class HystoryOrderBuyStatus(models.Model):
    date = models.DateField(verbose_name=u'Дата изменения статуса')
    order = models.ForeignKey(OrdersBuy,verbose_name=u'Заявка')
    status = models.ForeignKey(OrderStatus,verbose_name=u'Новый статус')
    def __unicode__(self):
        return unicode(self.status) or u''
    class Meta:
        ordering = ['date','pk']
        verbose_name_plural = u"История изменения статуса заявки"

def pre_orders_buy_save(sender, instance, **kwargs):
    try:
        if instance.id:
            instance.status_old = instance.__class__.objects.get(id=instance.id).status
    except (sender.DoesNotExist):
        return

def post_orders_buy_save(sender, instance, created, **kwargs):
    try:
        status_hyst_last = HystoryOrderBuyStatus.objects.filter(order=instance.id).latest("pk").status
    except (HystoryOrderBuyStatus.DoesNotExist):
        status_hyst_last = None
    try:
        if (created or (instance.status != instance.status_old))and (instance.status != status_hyst_last):
            print instance.id
            HystoryOrderBuyStatus.objects.create(order=instance,status=instance.status,date=datetime.date.today())
    except (sender.DoesNotExist):
        return

post_save.connect(post_orders_buy_save, sender=OrdersBuy)
pre_save.connect(pre_orders_buy_save, sender=OrdersBuy)

class HystoryOrderSaleStatus(models.Model):
    date = models.DateField(verbose_name=u'Дата изменения статуса')
    order = models.ForeignKey(OrdersSale,verbose_name=u'Заявка')
    status = models.ForeignKey(OrderStatus,verbose_name=u'Новый статус')
    def __unicode__(self):
        return unicode(self.status) or u''
    class Meta:
        ordering = ['date','pk']
        verbose_name_plural = u"История изменения статуса заявки"

class PriceChanges(models.Model):
    order = models.ForeignKey(OrdersSale,verbose_name=u'Заявка на продажу')
    price = models.DecimalField(max_digits=11, decimal_places=2, verbose_name=u'Старая цена', blank=True, null=True)
    date_change = models.DateTimeField(auto_now=True, verbose_name=u'Дата модификации цены')

    class Meta:
        ordering = ['-id']
        verbose_name_plural = u"Динамика цен"

def pre_orders_sale_save(sender, instance, **kwargs):
    try:
        if instance.id:
            if (instance.price != instance.__class__.objects.get(id=instance.id).price):
                PriceChanges.objects.create(order=instance,price=instance.price)
    except:
        pass
    try:
        if instance.id:
            instance.status_old = instance.__class__.objects.get(id=instance.id).status
    except (sender.DoesNotExist):
        return

def post_orders_sale_save(sender, instance, created, **kwargs):

    try:
        if created and (instance.price != 0):
            PriceChanges.objects.create(order=instance, price=instance.price)
    except:
        pass

    try:
        status_hyst_last = HystoryOrderSaleStatus.objects.filter(order=instance.id).latest("pk").status
    except (HystoryOrderSaleStatus.DoesNotExist):
        status_hyst_last = None
    try:
        if (created or (instance.status != instance.status_old))and (instance.status != status_hyst_last):
            HystoryOrderSaleStatus.objects.create(order=instance,status=instance.status,date=datetime.date.today())
    except (sender.DoesNotExist):
        return

post_save.connect(post_orders_sale_save, sender=OrdersSale)
pre_save.connect(pre_orders_sale_save, sender=OrdersSale)

class Offer(models.Model):
    order_buy = models.ForeignKey(OrdersBuy,verbose_name=u'Заявка на покупку')
    order_sale = models.ForeignKey(OrdersSale,verbose_name=u'Заявка на продажу')
    informed = models.BooleanField(default=False,verbose_name=u'Извещение')
    stage = models.IntegerField(default=1,verbose_name=u'Стадия работы',blank=True,null=True)
    class Meta:
        ordering = ['-stage']
        verbose_name_plural = u"Встречные предложения"

def pre_offer_save(sender, instance, **kwargs):
    parent_order_buy = instance.order_buy
    parent_order_sale = instance.order_sale
    parent_order_buy.modification_date = datetime.datetime.now()
    parent_order_sale.modification_date = datetime.datetime.now()
    parent_order_buy.save()
    parent_order_sale.save()

def pre_offer_delete(sender, instance, **kwargs):
    parent_order_buy = instance.order_buy
    parent_order_sale = instance.order_sale
    parent_order_buy.modification_date = datetime.datetime.now()
    parent_order_sale.modification_date = datetime.datetime.now()
    parent_order_buy.save()
    parent_order_sale.save()

pre_save.connect(pre_offer_save, sender=Offer)
pre_delete.connect(pre_offer_delete, sender=Offer)


class HystoryOffer(models.Model):
    date = models.DateField(verbose_name=u'Дата предложения')
    offer = models.ForeignKey(Offer,verbose_name=u'Предложение')
    result = models.ForeignKey(ResultSentence,verbose_name=u'Результат предложения')
    comment = models.CharField(max_length=100,verbose_name=u'Комментарий',blank=True)
    def __unicode__(self):
        return unicode(self.comment) or u''
    class Meta:
        ordering = ['date']
        verbose_name_plural = u"История предложений"

class HystoryShow(models.Model):
    date = models.DateField(verbose_name=u'Дата показа')
    number_act = models.CharField(max_length=20,verbose_name=u'Номер акта показа',blank=True) 
    offer = models.ForeignKey(Offer,verbose_name=u'Предложение')
    result = models.ForeignKey(ResultShow,verbose_name=u'Результат показа',blank=True,null=True)
    comment = models.CharField(max_length=100,verbose_name=u'Комментарий',blank=True)
    def __unicode__(self):
        return unicode(self.comment) or u''
    class Meta:
        ordering = ['date']
        verbose_name_plural = u"История показов"


class HystoryService(models.Model):
    date = models.DateField(verbose_name=u'Дата операции')
    offer= models.ForeignKey(Offer,verbose_name=u'Предложение')
    operation = models.ForeignKey(OperationType,verbose_name=u'Тип операции')
    comment = models.CharField(max_length=100,verbose_name=u'Комментарий',blank=True) 
    result_operation = models.ForeignKey(ResultOperation,verbose_name=u'Результат операции')
    def __unicode__(self):
        return unicode(self.comment)or u''
    class Meta:
        ordering = ['date']
        verbose_name_plural = u"История ведения сделки"


class ListObjectType(models.Model):
    orders= models.ForeignKey(OrdersBuy,verbose_name=u'Заявка')
    object_type= models.ForeignKey(ObjectType,verbose_name=u'Тип объекта')
    def __unicode__(self):
        return unicode(self.object_type) or u''
    class Meta:
        ordering = ['object_type']
        verbose_name_plural = u"Тип объекта"

class ListDistrict(models.Model):
    orders= models.ForeignKey(OrdersBuy,verbose_name=u'Заявка')
    district= models.ForeignKey(District,verbose_name=u'Район')
    def __unicode__(self):
        return unicode(self.district) or u''
    class Meta:
        ordering = ['district']
        verbose_name_plural = u"Районы к заявке"

class ListCity(models.Model):
    orders= models.ForeignKey(OrdersBuy,verbose_name=u'Заявка')
    city = models.ForeignKey(City,verbose_name=u'Город')
    def __unicode__(self):
        return unicode(self.city) or u''
    class Meta:
        ordering = ['city']
        verbose_name_plural = u"Города к заявке"
        
class ListMicrodistrict(models.Model):
    orders= models.ForeignKey(OrdersBuy,verbose_name=u'Заявка')
    microdistrict = models.ForeignKey(Microdistrict,verbose_name=u'Микрорайон')
    def __unicode__(self):
        return unicode(self.microdistrict) or u''
    class Meta:
        ordering = ['microdistrict']
        verbose_name_plural = u"Микрорайоны к заявке"

class ListStreet(models.Model):
    orders= models.ForeignKey(OrdersBuy,verbose_name=u'Заявка')
    street = models.ForeignKey(Street,verbose_name=u'Улица')
    def __unicode__(self):
        return unicode(self.street) or u''
    class Meta:
        ordering = ['street']
        verbose_name_plural = u"Улицы к заявке"

class ListRooms(models.Model):
    orders= models.ForeignKey(OrdersBuy,verbose_name=u'Заявка')
    number_rooms = models.IntegerField(verbose_name=u'Количество комнат')
    def __unicode__(self):
        return unicode(self.number_rooms) or u''
    class Meta:
        ordering = ['number_rooms']
        verbose_name_plural = u"Количество комнат"

class Notifications(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,related_name='user',verbose_name=u'Получатель',blank=True,null=True)
    sender = models.ForeignKey(settings.AUTH_USER_MODEL,related_name='sender',verbose_name=u'Отправитель',blank=True,null=True)
    date = models.DateField(verbose_name=u'Дата операции',auto_now_add=True)
    phone = models.CharField(max_length=11,verbose_name=u'Телефон',blank=True)
    message = models.CharField(max_length=150,verbose_name=u'Сообщение') 
    read = models.BooleanField(default=False,verbose_name=u'Прочитано')
    sendsms = models.BooleanField(default=False,verbose_name=u'SMS сообщение')
    def __unicode__(self):
        return unicode(self.message) or u''
    class Meta:
        ordering = ['read','-date','-id']
        verbose_name_plural = u"Уведомления"

def pre_notifications_delete(sender, instance, **kwargs):
    if len(instance.phone)>0:
        raise Exception('Do not delete notifications')  # cancel the deletion
    # else continue with the deletion

pre_delete.connect(pre_notifications_delete, sender=Notifications)

def post_notifications_save(sender, instance, created, **kwargs):
    try:
        if (created):
            if instance.user:
                if (instance.user.sms_notification and (len(instance.user.phone)==11)):
                    #try:
                    phone = "".join(("7",instance.user.phone[1:]))
                    if ((not instance.sender) or (instance.sendsms)):
                        text = instance.message[:168]
                        #sms = smssend.AtomParkSMS()
                        #sms.send_sms(text, [phone])
                        connections = lookup_connections(backend="kannel-beeline-smpp",identities=[phone])
                        send(text, connections=connections)
                    #except:
                    #    pass
            elif len(instance.phone)==11:
                phone = "".join(("7", instance.phone[1:]))
                text = instance.message[:168]
                connections = lookup_connections(backend="kannel-beeline-smpp", identities=[phone])
                send(text, connections=connections)
    except (sender.DoesNotExist):
        return
           
post_save.connect(post_notifications_save, sender=Notifications)

class SmsMessages(models.Model):
    name = models.CharField(max_length=300,verbose_name=u'Сообщение')
    type = models.ForeignKey(MessageType,verbose_name=u'Тип сообщения')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['pk']
        verbose_name_plural = u"СМС рассылка"

class EmailMessages(models.Model):
    name = models.TextField(verbose_name=u'Сообщение')
    type = models.ForeignKey(MessageType,verbose_name=u'Тип сообщения')
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['pk']
        verbose_name_plural = u"E-mail рассылка"

def get_file_path(instance, filename):
    return unicode(os.path.join(instance.directory_string_var, filename.lower()))

class TemplatesDoc(models.Model):
    name = models.CharField(max_length=80,verbose_name=u'Название шаблона')
    file = models.FileField(upload_to=get_file_path,null=True,blank=True,verbose_name=u'Шаблон')
    directory_string_var = 'templates_doc'
    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Шаблоны документов"

def get_documents_path(instance, filename):
    offer_id = instance.offer.id
    filename = "%s_%s" % (offer_id, filename)
    return unicode(os.path.join(instance.directory_string_var, filename.lower()))

class Documents(models.Model):
    offer = models.ForeignKey(Offer,verbose_name=u'Предложение')
    name = models.CharField(max_length=80,verbose_name=u'Название документа')
    file = models.FileField(upload_to=get_documents_path,null=True,blank=True,verbose_name=u'Документ')
    directory_string_var = 'documents'

    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Шаблоны документов"

def get_regulations_path(instance, filename):
    filename = "%s" % (filename)
    return unicode(os.path.join(instance.directory_string_var, filename.lower()))

class Regulations(models.Model):
    name = models.CharField(max_length=80,verbose_name=u'Название документа')
    file = models.FileField(upload_to=get_regulations_path,null=True,blank=True,verbose_name=u'Документ')
    directory_string_var = 'regulations'

    def __unicode__(self):
        return unicode(self.name) or u''
    class Meta:
        ordering = ['name']
        verbose_name_plural = u"Нормативные документы"

def pre_file_save(sender, instance, **kwargs):
    try:
        rec = sender.objects.get(id=instance.id)
        if rec.file.path != instance.file.path:
            rec.file.delete()
    except (sender.DoesNotExist, ValueError):
        pass

def pre_file_delete(sender, instance, **kwargs):
    try:
        rec = sender.objects.get(id=instance.id)
        rec.file.delete()
    except (sender.DoesNotExist, ValueError):
        pass

class Tasks(models.Model):
    priority = models.ForeignKey(Priority, verbose_name=u'Приоритет')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name=u'Автор', related_name='author')
    performer = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name=u'Исполнитель', related_name='performer')
    description = models.CharField(max_length=200, verbose_name=u'Описание')
    create_date = models.DateTimeField(verbose_name=u'Время создания')
    execution_date = models.DateTimeField(verbose_name=u'Время выполнения')
    notification = models.BooleanField(default=False, verbose_name=u'Сделано оповещение')
    client = models.ForeignKey(Clients, verbose_name=u'Клиент', blank=True, null=True)
    order_sale = models.ForeignKey(OrdersSale, verbose_name=u'Заявка на покупку', blank=True, null=True)
    order_buy = models.ForeignKey(OrdersBuy,verbose_name=u'Заявка на продажу', blank=True, null=True)
    status = models.ForeignKey(TaskStatus, verbose_name=u'Статус', blank=True, null=True)

    def __unicode__(self):
        return unicode(self.description) or u''

    class Meta:
        ordering = ['create_date']
        verbose_name_plural = u"Задачи"
        permissions = (
            ("view_all_tasks", "View all tasks"),
        )

class TaskHistory(models.Model):
    task = models.ForeignKey(Tasks,verbose_name=u'Задача')
    corrector = models.ForeignKey(settings.AUTH_USER_MODEL,verbose_name=u'Корректор')
    comment = models.CharField(max_length=100,verbose_name=u'Комментарий')
    create_date = models.DateTimeField(verbose_name=u'Время создания')
    status = models.ForeignKey(TaskStatus,verbose_name=u'Статус',related_name='status',)
    def __unicode__(self):
        return unicode(self.comment) or u''
    class Meta:
        ordering = ['pk']
        verbose_name_plural = u"История задачи"

class TaskComments(models.Model):
    task = models.ForeignKey(Tasks,verbose_name=u'Задача')
    author = models.ForeignKey(settings.AUTH_USER_MODEL,verbose_name=u'Автор')
    comment = models.CharField(max_length=100,verbose_name=u'Комментарий')
    create_date = models.DateTimeField(verbose_name=u'Время создания')
    def __unicode__(self):
        return unicode(self.comment) or u''
    class Meta:
        ordering = ['pk']
        verbose_name_plural = u"Комментарии к задаче"

pre_save.connect(pre_file_save, sender=TemplatesDoc)
pre_delete.connect(pre_file_delete, sender=TemplatesDoc)
pre_save.connect(pre_file_save, sender=Documents)
pre_delete.connect(pre_file_delete, sender=Documents)
pre_save.connect(pre_file_save, sender=Regulations)
pre_delete.connect(pre_file_delete, sender=Regulations)