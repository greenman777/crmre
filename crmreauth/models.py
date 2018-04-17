#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
from django.db import models
from django.contrib.auth.models import AbstractUser
from imagekit.models import ProcessedImageField
from pilkit.processors import ResizeToFill,ResizeToFit

def get_user_photo_name(instance, filename):
    ext = filename.split('.')[-1].lower()
    filename = "%s_%s.%s" % (instance.last_name, instance.first_name, ext)
    return unicode(os.path.join(instance.directory_string_var, filename))

class User(AbstractUser):
    phone = models.CharField(max_length=11, verbose_name=u'Телефон основной',blank=True)
    phone_other = models.CharField(max_length=11, verbose_name=u'Телефон доп.',blank=True)
    phone_swap = models.CharField(max_length=11, verbose_name=u'Подменный номер', blank=True)
    phone_short = models.CharField(max_length=4, verbose_name=u'Короткий номер',blank=True)
    organization_name = models.CharField(max_length=100, verbose_name=u'Наименование организации',blank=True)
    organization_phone = models.CharField(max_length=11, verbose_name=u'Телефон организации',blank=True)
    organization_fax = models.CharField(max_length=11, verbose_name=u'Факс организации',blank=True)
    business_address = models.CharField(max_length=100, verbose_name=u'Адрес места работы',blank=True)
    position = models.CharField(max_length=30, verbose_name=u'Должность',blank=True)
    birthday = models.DateField(verbose_name=u'Дата рождения',blank=True,null=True)
    sms_notification = models.BooleanField(default=True,verbose_name=u'СМС оповещение')
    brigade = models.IntegerField(default=0,verbose_name=u'Бригада',blank=True,null=True)
    photo = ProcessedImageField(verbose_name=u'Фотография',upload_to=get_user_photo_name,processors=[ResizeToFit(width=480, height=480, upscale=True, mat_color=255)],
                                format='JPEG',options={'quality': 60},blank=True)
    directory_string_var = 'photos_users'

    def __unicode__(self):
        return " ".join((self.last_name,self.first_name))

    class Meta:
        ordering = ['last_name','first_name']
        verbose_name = u'Пользователь'
        verbose_name_plural = u'Пользователи'
        permissions = (
            ("callback_manager", "Callback Manager"),
        )