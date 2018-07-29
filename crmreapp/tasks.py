#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import absolute_import

import os
import datetime
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from django.template import Context
from django.template.loader import get_template
from django.http import HttpResponse
import xml.etree.ElementTree as etree
from crmre.utils import JSONResponse
from crmreapp import models
from crmreauth.models import User
from crmreapp import smssend
from django.core.files import File
from crmre import settings
from celery import task, shared_task

@shared_task
def create_portal_file():
    template = get_template('portal.xml')
    status_activ = models.OrderStatus.objects.get(name=u"активная")
    status_deal = models.OrderStatus.objects.get(name=u"выход на сделку")
    object_category_comm = models.ObjectCategory.objects.get(name=u"Коммерческая недвижимость")
    xml = template.render(Context({
                            'offers':models.OrdersSale.objects.filter(classified_resources=True,status__in=(status_activ,status_deal)),
                            'buildings':models.Buildings.objects.all(),
                            'offers_buy':models.OrdersBuy.objects.filter(object_category=object_category_comm,classified_resources=True,status__in=(status_activ,status_deal)),
                            }))
    xml = xml.encode('utf-8')
    with open(os.path.join(settings.MEDIA_ROOT,"uploading","uploading_portal_rn43.xml"), 'w') as f:
        myfile = File(f)
        myfile.write(xml)
    myfile.closed
    f.closed
    return JSONResponse({'success':True,'messages':'OK'})

@shared_task
def create_avito_file():
    template = get_template('avito.xml')
    status_activ = models.OrderStatus.objects.get(name=u"активная")
    status_deal = models.OrderStatus.objects.get(name=u"выход на сделку")
    contract_normal = models.ContractType.objects.get(name=u"обычный")
    contract_exl = models.ContractType.objects.get(name=u"эксклюзивный")
    delta = datetime.timedelta(days=30)
    now_date = datetime.datetime.now() - delta
    models.OrdersSale.objects.filter(toll_resources=True,status__in=(status_activ,status_deal),contract_type__in=(contract_normal, contract_exl),contract_number__isnull=False,
                             contract_date__isnull=False,toll_resources_date__lt=now_date).update(toll_resources=False, toll_resources_date=None, toll_resources_date_end=None,)
    models.OrdersSale.objects.filter(toll_resources=True, status__in=(status_activ,status_deal),contract_type__in=(contract_normal, contract_exl),contract_number__isnull=False,
                             contract_date__isnull=False,toll_resources_date=None,toll_resources_date_end=None).update(toll_resources_date=datetime.datetime.now(), toll_resources_date_end=datetime.datetime.now()+delta)
    offers_start = models.OrdersSale.objects.filter(toll_resources=True, status__in=(status_activ,status_deal),
                              contract_type__in=(contract_normal, contract_exl),
                              contract_number__isnull=False, contract_date__isnull=False,toll_resources_date__gte=now_date)
    xml = template.render(Context({
                            'avito_city':[item[0] for item in models.AvitoCity.objects.values_list('name')],
                            'avito_district':[item[0] for item in models.AvitoDistrict.objects.values_list('name')],
                            'offers':offers_start
                            }))
    xml = xml.encode('utf-8')
    with open(os.path.join(settings.MEDIA_ROOT,"uploading","uploading_avito_rn43.xml"), 'w') as f:
        myfile = File(f)
        myfile.write(xml)
    myfile.closed
    f.closed
    return JSONResponse({'success':True,'messages':'OK'})

@shared_task
def create_yandex_file():
    template = get_template('yandex.xml')
    status_activ = models.OrderStatus.objects.get(name=u"активная")
    status_deal = models.OrderStatus.objects.get(name=u"выход на сделку")
    xml = template.render(Context({
                            'offers':models.OrdersSale.objects.filter(toll_resources=True,status__in=(status_activ,status_deal))
                            }))
    xml = xml.encode('utf-8')
    with open(os.path.join(settings.MEDIA_ROOT,"uploading","uploading_yandex_rn43.xml"), 'w') as f:
        myfile = File(f)
        myfile.write(xml)
    myfile.closed
    f.closed
    return JSONResponse({'success':True,'messages':'OK'})

@shared_task
def clents_to_reserve():
    date_stop = datetime.datetime.now() - datetime.timedelta(days=30)
    clients = models.Clients.objects.filter(is_client=True,create_date__lte=date_stop)
    status_arhiv = models.OrderStatus.objects.get(name=u"архив")
    for client in clients:
        is_client = True
        model_order_sale = models.OrdersSale.objects.filter(client=client).exclude(status=status_arhiv)
        model_order_buy = models.OrdersBuy.objects.filter(client=client).exclude(status=status_arhiv)
        if len(model_order_sale)==0 and len(model_order_buy)==0:
            client.is_client = False
            client.save()

@shared_task
def orders_to_arhiv():
    date_stop = datetime.datetime.now() - datetime.timedelta(days=180)
    status_arhiv = models.OrderStatus.objects.get(name=u"архив")
    status_complet = models.OrderStatus.objects.get(name=u"сделка завершена")
    status_retired = models.OrderStatus.objects.get(name=u"отказная")
    orders_sale = models.OrdersSale.objects.filter(status__in=(status_complet,status_retired),modification_date__lte=date_stop)
    orders_buy = models.OrdersBuy.objects.filter(status__in=(status_complet,status_retired),modification_date__lte=date_stop)
    for order in orders_sale:
        order.status = status_arhiv
        order.save()
        client = order.client
        counts_order_sale = len(models.OrdersSale.objects.filter(client=client).exclude(status=status_arhiv))
        counts_order_buy = len(models.OrdersBuy.objects.filter(client=client).exclude(status=status_arhiv))
        if counts_order_sale==0 and counts_order_buy==0:
            client.is_client = False
            client.save()
    print("orders_sale to arhive: ",len(orders_sale))
    for order in orders_buy:
        order.status = status_arhiv
        order.save()
        client = order.client
        counts_order_sale = len(models.OrdersSale.objects.filter(client=client).exclude(status=status_arhiv))
        counts_order_buy = len(models.OrdersBuy.objects.filter(client=client).exclude(status=status_arhiv))
        if counts_order_sale==0 and counts_order_buy==0:
            client.is_client = False
            client.save()
    print("orders_buy to arhive: ",len(orders_buy))

@shared_task
def task_notification():
    date_now = datetime.datetime.now()
    tasks = models.Tasks.objects.filter(notification=False,execution_date__lte=date_now)
    for task in tasks:
        notification_new = models.Notifications.objects.create(user=task.performer,sender=task.author,message=task.heading,sendsms=True)
        task.notification = True
        task.save()