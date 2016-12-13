#!/usr/bin/env python
# -*- coding: utf-8 -*-

from django.views.decorators.csrf import csrf_exempt
from django.db.models import Count,Sum,Max,Q,Avg,Min
from decimal import Decimal
from datetime import datetime,timedelta
from crmreapp import models
from crmre.utils import JSONResponse
from crmreauth.models import User
from django.contrib.auth.models import Group

def list_to_dict(list_item,field_name,format_date):
    return {datetime.date(datetime.strptime(item['date'], format_date)) : item[field_name] for item in list_item[field_name]}

@csrf_exempt
def reports(request):

    if request.method == 'POST':
        getparams = request.POST.copy()
        report_type =  getparams.get('report_type')
        status_archiv = models.OrderStatus.objects.get(name=u"архив")
        status_free = models.OrderStatus.objects.get(name=u"свободная")
        status_retired = models.OrderStatus.objects.get(name=u"отказная")
        status_complet = models.OrderStatus.objects.get(name=u"сделка завершена")
        status_activ = models.OrderStatus.objects.get(name=u"активная")
        status_locked = models.OrderStatus.objects.get(name=u"выход на сделку")
        status_works_all = (status_activ,status_locked,status_complet)
        status_works = (status_activ,status_locked)
        status_noworks_all = (status_retired,status_archiv)
        status_noworks = (status_retired,status_archiv,status_complet)
        status_show_work = models.ResultShow.objects.get(name=u"в работе")
        operation_complet = models.ResultOperation.objects.get(name=u"успешная")
        operation_registr = models.OperationType.objects.get(name=u"4. регистрация")
        contract_normal = models.ContractType.objects.get(name=u"обычный")
        contract_exclusive = models.ContractType.objects.get(name=u"эксклюзивный")
        contract_all = (contract_normal,contract_exclusive)
        if report_type == "info_show":
            content_item = {}
            data = {'success':True,'messages':{'date_new':"",'content':[]}}
            object_accessory_my = models.ObjectAccessory.objects.get(name=u"наш")
            object_accessory_owner = models.ObjectAccessory.objects.get(name=u"собственика")
            object_accessory_other = models.ObjectAccessory.objects.get(name=u"посредника")
            model_object_category = models.ObjectCategory;
            model_order_sale = models.OrdersSale.objects.filter(status__in=status_works_all)
            model_order_buy = models.OrdersBuy.objects.filter(status__in=status_works_all)
            for object_category in model_object_category.objects.all().order_by("pk"):
                try:
                    object_type_new = models.ObjectType.objects.get(object_category=object_category,name=u"квартира в новостройке")
                except models.ObjectType.DoesNotExist:
                    object_type_new = -1
                content_item["category_name"] = object_category.name
                # объектов на продажу
                content_item["object_sale_my"] = model_order_sale.filter(object_category=object_category,object_accessory__in=(object_accessory_my,object_accessory_owner),transaction_type=True).count()
                content_item["object_sale_other"] = model_order_sale.filter(object_category=object_category,object_accessory=object_accessory_other,transaction_type=True).count()
                content_item["object_sale_all"] = model_order_sale.filter(object_category=object_category,transaction_type=True).count()
                # объектов сдачи в аренду
                content_item["object_sale_my_rent"] = model_order_sale.filter(object_category=object_category,object_accessory__in=(object_accessory_my,object_accessory_owner),transaction_type=False).count()
                content_item["object_sale_other_rent"] = model_order_sale.filter(object_category=object_category,object_accessory=object_accessory_other,transaction_type=False).count()
                content_item["object_sale_all_rent"] = model_order_sale.filter(object_category=object_category,transaction_type=False).count()
                # заявок на покупку
                content_item["object_buy"] = model_order_buy.filter(object_category=object_category,transaction_type=True).count()
                # спрос на аренду
                content_item["object_buy_rent"] = model_order_buy.filter(object_category=object_category,transaction_type=False).count()
                # всего
                content_item["object_all"] = content_item["object_sale_all"]+content_item["object_sale_all_rent"]+content_item["object_buy"]+content_item["object_buy_rent"]

                data["messages"]["content"].append(content_item.copy())
                if object_category.name == u"Жилая недвижимость":
                    content_item["category_name"] = u"- вторичка"
                    # объектов на продажу
                    content_item["object_sale_my"] = model_order_sale.filter(object_category=object_category,object_accessory__in=(object_accessory_my,object_accessory_owner),transaction_type=True).exclude(object_type=object_type_new).count()
                    content_item["object_sale_other"] = model_order_sale.filter(object_category=object_category,object_accessory=object_accessory_other,transaction_type=True).exclude(object_type=object_type_new).count()
                    content_item["object_sale_all"] = model_order_sale.filter(object_category=object_category,transaction_type=True).exclude(object_type=object_type_new).count()
                    # объектов сдачи в аренду
                    content_item["object_sale_my_rent"] = model_order_sale.filter(object_category=object_category,object_accessory__in=(object_accessory_my,object_accessory_owner),transaction_type=False).exclude(object_type=object_type_new).count()
                    content_item["object_sale_other_rent"] = model_order_sale.filter(object_category=object_category,object_accessory=object_accessory_other,transaction_type=False).exclude(object_type=object_type_new).count()
                    content_item["object_sale_all_rent"] = model_order_sale.filter(object_category=object_category,transaction_type=False).exclude(object_type=object_type_new).count()
                    # заявок на покупку
                    content_item["object_buy"] = model_order_buy.filter(object_category=object_category,transaction_type=True).exclude(listobjecttype__object_type=object_type_new).count()
                    # спрос на аренду
                    content_item["object_buy_rent"] = model_order_buy.filter(object_category=object_category,transaction_type=False).exclude(listobjecttype__object_type=object_type_new).count()
                    # всего
                    content_item["object_all"] = content_item["object_sale_all"]+content_item["object_sale_all_rent"]+content_item["object_buy"]+content_item["object_buy_rent"]
                    data["messages"]["content"].append(content_item.copy())



                    content_item["category_name"] = u"- новостройка"
                    # объектов на продажу
                    content_item["object_sale_my"] = model_order_sale.filter(object_category=object_category,object_accessory__in=(object_accessory_my,object_accessory_owner),transaction_type=True,object_type=object_type_new).count()
                    content_item["object_sale_other"] = model_order_sale.filter(object_category=object_category,object_accessory=object_accessory_other,transaction_type=True,object_type=object_type_new).count()
                    content_item["object_sale_all"] = model_order_sale.filter(object_category=object_category,transaction_type=True,object_type=object_type_new).count()
                    # объектов сдачи в аренду
                    content_item["object_sale_my_rent"] = model_order_sale.filter(object_category=object_category,object_accessory__in=(object_accessory_my,object_accessory_owner),transaction_type=False,object_type=object_type_new).count()
                    content_item["object_sale_other_rent"] = model_order_sale.filter(object_category=object_category,object_accessory=object_accessory_other,transaction_type=False,object_type=object_type_new).count()
                    content_item["object_sale_all_rent"] = model_order_sale.filter(object_category=object_category,transaction_type=False,object_type=object_type_new).count()
                    # заявок на покупку
                    content_item["object_buy"] = model_order_buy.filter(object_category=object_category,transaction_type=True,listobjecttype__object_type=object_type_new).count()
                    # спрос на аренду
                    content_item["object_buy_rent"] = model_order_buy.filter(object_category=object_category,transaction_type=False,listobjecttype__object_type=object_type_new).count()
                    # всего
                    content_item["object_all"] = content_item["object_sale_all"]+content_item["object_sale_all_rent"]+content_item["object_buy"]+content_item["object_buy_rent"]
                    data["messages"]["content"].append(content_item.copy())
            content_item["category_name"] = u"ИТОГО"
            # объектов на продажу
            content_item["object_sale_my"] = model_order_sale.filter(object_accessory__in=(object_accessory_my,object_accessory_owner),transaction_type=True).count()
            content_item["object_sale_other"] = model_order_sale.filter(object_accessory=object_accessory_other,transaction_type=True).count()
            content_item["object_sale_all"] = model_order_sale.filter(transaction_type=True).count()
            # объектов сдачи в аренду
            content_item["object_sale_my_rent"] = model_order_sale.filter(object_accessory__in=(object_accessory_my,object_accessory_owner),transaction_type=False).count()
            content_item["object_sale_other_rent"] = model_order_sale.filter(object_accessory=object_accessory_other,transaction_type=False).count()
            content_item["object_sale_all_rent"] = model_order_sale.filter(transaction_type=False).count()
            # заявок на покупку
            content_item["object_buy"] = model_order_buy.filter(transaction_type=True).count()
            # спрос на аренду
            content_item["object_buy_rent"] = model_order_buy.filter(transaction_type=False).count()
            # всего
            content_item["object_all"] = content_item["object_sale_all"]+content_item["object_sale_all_rent"]+content_item["object_buy"]+content_item["object_buy_rent"]
            data["messages"]["content"].append(content_item.copy())

            data["messages"]["date_new"] = datetime.now()
            response = JSONResponse(data)
        if report_type == "info_client":
            content_item = {}
            data = {'success':True,'messages':{'date_new':"",'content':[]}}
            client = int(getparams.get('client'))
            model_object_category = models.ObjectCategory;
            model_order_sale = models.OrdersSale.objects.filter(client=client)
            model_order_buy = models.OrdersBuy.objects.filter(client=client)

            content_item["order_index"] = u"<b>Заявки на продажу"
            content_item["order_object_type"] = ""
            content_item["order_description"] = ""
            content_item["order_price"] = ""
            content_item["order_date"] = ""
            content_item["order_performer"] = ""
            content_item["order_status"] = ""
            data["messages"]["content"].append(content_item.copy())
            for order in model_order_sale.all().order_by("pk"):
                content_item["order_index"] = order.index
                content_item["order_object_type"] = order.object_type.name
                content_item["order_description"] = order.description
                content_item["order_price"] = order.price
                content_item["order_date"] = order.create_date
                content_item["order_performer"] = " ".join((order.performer.last_name,order.performer.first_name))
                content_item["order_status"] = order.status.name
                data["messages"]["content"].append(content_item.copy())

            content_item["order_index"] = u"<b>Заявки на покупку"
            content_item["order_object_type"] = ""
            content_item["order_description"] = ""
            content_item["order_price"] = ""
            content_item["order_date"] = ""
            content_item["order_performer"] = ""
            content_item["order_status"] = ""
            data["messages"]["content"].append(content_item.copy())
            for order in model_order_buy.all().order_by("pk"):
                content_item["order_index"] = order.index
                content_item["order_object_type"] = ""
                content_item["order_description"] = order.description
                content_item["order_price"] = ""
                content_item["order_date"] = order.create_date
                content_item["order_performer"] = " ".join((order.performer.last_name, order.performer.first_name))
                content_item["order_status"] = order.status.name
                data["messages"]["content"].append(content_item.copy())

            data["messages"]["date_new"] = datetime.now()
            response = JSONResponse(data)
        if report_type == "kpi":
            date_start =  datetime.strptime(getparams.get('date_start'), "%Y-%m-%d")
            date_stop =  datetime.strptime(getparams.get('date_stop'), "%Y-%m-%d")
            time_interval = int(str(date_stop - date_start).split()[0])
            content_item = {}
            data = {'success':True,'messages':{'date_start':date_start,'date_stop':date_stop,'content':[]}}
            model_order_sale = models.OrdersSale.objects.all()
            model_order_buy = models.OrdersBuy.objects.all()
            model_object_category = models.ObjectCategory;
            for object_category in model_object_category.objects.all().order_by("pk"):
                content_item["category_name"] = object_category.name
                content_item["category_type"] = 1
                # нормы
                content_item["rate_growth_orders"] = int(round((object_category.rate_growth_orders * time_interval)/30.0))
                content_item["rate_growth_contracts"] = int(round((object_category.rate_growth_contracts * time_interval)/30.0))
                content_item["rate_shows"] = int(round((object_category.rate_shows * time_interval)/30.0))
                content_item["rate_transactions"] = int(round((object_category.rate_transactions * time_interval)/30.0))
                # заявки: предложение/спрос
                content_item["orders_all"] = "/".join((str(model_order_sale.filter(object_category=object_category,create_date__lte=date_stop).filter(hystoryordersalestatus__status__in=status_works).exclude(hystoryordersalestatus__status__in=status_noworks).distinct().count()),str(model_order_buy.filter(object_category=object_category,create_date__lte=date_stop).filter(hystoryorderbuystatus__status__in=status_works).exclude(hystoryorderbuystatus__status__in=status_noworks).distinct().count())))
                content_item["orders_growth"] = "/".join((str(model_order_sale.filter(object_category=object_category,create_date__range=(date_start,date_stop)).filter(hystoryordersalestatus__status__in=status_works_all).exclude(hystoryordersalestatus__status__in=status_noworks_all).distinct().count()),str(model_order_buy.filter(object_category=object_category,create_date__range=(date_start,date_stop)).filter(hystoryorderbuystatus__status__in=status_works_all).exclude(hystoryorderbuystatus__status__in=status_noworks_all).distinct().count())))
                content_item["orders_growth_agent"] = ""
                content_item["orders_retired"] = "/".join((str(model_order_sale.filter(object_category=object_category).filter(hystoryordersalestatus__date__range=(date_start,date_stop),hystoryordersalestatus__status=status_retired).distinct().count()),str(model_order_buy.filter(object_category=object_category).filter(hystoryorderbuystatus__date__range=(date_start,date_stop),hystoryorderbuystatus__status=status_retired).distinct().count())))
                # договоры: предложение/спрос
                content_item["orders_contract_all"] = "/".join((str(model_order_sale.filter(object_category=object_category,contract_date__lte=date_stop,contract_type__in=(contract_all)).exclude(hystoryordersalestatus__status__in=status_noworks).distinct().count()),str(model_order_buy.filter(object_category=object_category,contract_date__lte=date_stop,contract_type__in=(contract_all)).exclude(hystoryorderbuystatus__status__in=status_noworks).distinct().count())))
                content_item["orders_contract_growth"] = "/".join((str(model_order_sale.filter(object_category=object_category,contract_date__range=(date_start,date_stop),contract_type__in=(contract_all)).exclude(hystoryordersalestatus__status__in=status_noworks_all).distinct().count()),str(model_order_buy.filter(object_category=object_category,contract_date__range=(date_start,date_stop),contract_type__in=(contract_all)).exclude(hystoryorderbuystatus__status__in=status_noworks_all).distinct().count())))
                # актов показов за период
                content_item["shows_acts_all"] = str(models.HystoryShow.objects.filter(offer__order_buy__object_category=object_category,date__range=(date_start,date_stop)).exclude(result=status_show_work).distinct().count()*2)
                # сделок за период
                content_item["transactions"] = str(model_order_sale.filter(object_category=object_category).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count()+model_order_buy.filter(object_category=object_category).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count())
                data["messages"]["content"].append(content_item.copy())
                agent_count = 0
                for user in object_category.group.user_set.filter(is_active=True):
                    if (not(u"_Агенты" in [group.name for group in user.groups.all()]) and not(u"_Руководители групп" in [group.name for group in user.groups.all()])):
                        continue
                    agent_count+=1
                    content_item["category_name"] = " ".join((user.last_name,user.first_name))
                    content_item["category_type"] = 2
                    # заявки: предложение/спрос
                    content_item["orders_all"] = "/".join((str(model_order_sale.filter(object_category=object_category,performer=user,create_date__lte=date_stop).filter(hystoryordersalestatus__status__in=status_works).exclude(hystoryordersalestatus__status__in=status_noworks).distinct().count()),str(model_order_buy.filter(object_category=object_category,performer=user,create_date__lte=date_stop).filter(hystoryorderbuystatus__status__in=status_works).exclude(hystoryorderbuystatus__status__in=status_noworks).distinct().count())))
                    content_item["orders_growth"] = "/".join((str(model_order_sale.filter(object_category=object_category,performer=user,create_date__range=(date_start,date_stop)).filter(hystoryordersalestatus__status__in=status_works_all).exclude(hystoryordersalestatus__status__in=status_noworks_all).distinct().count()),str(model_order_buy.filter(object_category=object_category,performer=user,create_date__range=(date_start,date_stop)).filter(hystoryorderbuystatus__status__in=status_works_all).exclude(hystoryorderbuystatus__status__in=status_noworks_all).distinct().count())))
                    content_item["orders_growth_agent"] = "/".join((str(model_order_sale.filter(object_category=object_category,author=user,create_date__range=(date_start,date_stop)).filter(hystoryordersalestatus__status__in=status_works_all).exclude(hystoryordersalestatus__status__in=status_noworks_all).distinct().count()),str(model_order_buy.filter(object_category=object_category,author=user,create_date__range=(date_start,date_stop)).filter(hystoryorderbuystatus__status__in=status_works_all).exclude(hystoryorderbuystatus__status__in=status_noworks_all).distinct().count())))
                    content_item["orders_retired"] = "/".join((str(model_order_sale.filter(object_category=object_category,performer=user).filter(hystoryordersalestatus__date__range=(date_start,date_stop),hystoryordersalestatus__status=status_retired).distinct().count()),str(model_order_buy.filter(object_category=object_category,performer=user).filter(hystoryorderbuystatus__date__range=(date_start,date_stop),hystoryorderbuystatus__status=status_retired).distinct().count())))
                    # договоры: предложение/спрос
                    content_item["orders_contract_all"] = "/".join((str(model_order_sale.filter(object_category=object_category,performer=user,contract_date__lte=date_stop,contract_type__in=(contract_all)).exclude(hystoryordersalestatus__status__in=status_noworks).distinct().count()),str(model_order_buy.filter(object_category=object_category,performer=user,contract_date__lte=date_stop,contract_type__in=(contract_all)).exclude(hystoryorderbuystatus__status__in=status_noworks).distinct().count())))
                    content_item["orders_contract_growth"] = "/".join((str(model_order_sale.filter(object_category=object_category,performer=user,contract_date__range=(date_start,date_stop),contract_type__in=(contract_all)).exclude(hystoryordersalestatus__status__in=status_noworks_all).distinct().count()),str(model_order_buy.filter(object_category=object_category,performer=user,contract_date__range=(date_start,date_stop),contract_type__in=(contract_all)).exclude(hystoryorderbuystatus__status__in=status_noworks_all).distinct().count())))
                    # актов показов за период
                    content_item["shows_acts_all"] = str(models.HystoryShow.objects.filter(offer__order_buy__object_category=object_category,offer__order_buy__performer=user,date__range=(date_start,date_stop)).exclude(result=status_show_work).count()+models.HystoryShow.objects.filter(offer__order_sale__object_category=object_category,offer__order_sale__performer=user,date__range=(date_start,date_stop)).exclude(result=status_show_work).distinct().count())
                    # сделок за период
                    content_item["transactions"] = str(model_order_sale.filter(object_category=object_category,performer=user).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count()+model_order_buy.filter(object_category=object_category,performer=user).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count())
                    data["messages"]["content"].append(content_item.copy())
                content_item["category_name"] = u"Среднее на 1 агента"
                content_item["category_type"] = 3
                # заявки: предложение/спрос
                agent_count = float(agent_count)
                content_item["orders_all"] = "/".join((str(round(model_order_sale.filter(object_category=object_category,create_date__lte=date_stop).filter(hystoryordersalestatus__status__in=status_works).exclude(hystoryordersalestatus__status__in=status_noworks).distinct().count()/agent_count,1)),str(round(model_order_buy.filter(object_category=object_category,create_date__lte=date_stop).filter(hystoryorderbuystatus__status__in=status_works).exclude(hystoryorderbuystatus__status__in=status_noworks).distinct().count()/agent_count,1))))
                content_item["orders_growth"] = "/".join((str(round(model_order_sale.filter(object_category=object_category,create_date__range=(date_start,date_stop)).filter(hystoryordersalestatus__status__in=status_works_all).exclude(hystoryordersalestatus__status__in=status_noworks_all).distinct().count()/agent_count,1)),str(round(model_order_buy.filter(object_category=object_category,create_date__range=(date_start,date_stop)).filter(hystoryorderbuystatus__status__in=status_works_all).exclude(hystoryorderbuystatus__status__in=status_noworks_all).distinct().count()/agent_count,1))))
                content_item["orders_retired"] = "/".join((str(round(model_order_sale.filter(object_category=object_category).filter(hystoryordersalestatus__date__range=(date_start,date_stop),hystoryordersalestatus__status=status_retired).distinct().count()/agent_count,1)),str(round(model_order_buy.filter(object_category=object_category).filter(hystoryorderbuystatus__date__range=(date_start,date_stop),hystoryorderbuystatus__status=status_retired).distinct().count()/agent_count,1))))
                content_item["orders_growth_agent"] = ""
                # договоры: предложение/спрос
                content_item["orders_contract_all"] = "/".join((str(round(model_order_sale.filter(object_category=object_category,contract_date__lte=date_stop,contract_type__in=(contract_all)).exclude(hystoryordersalestatus__status__in=status_noworks).distinct().count()/agent_count,1)),str(round(model_order_buy.filter(object_category=object_category,contract_date__lte=date_stop,contract_type__in=(contract_all)).exclude(hystoryorderbuystatus__status__in=status_noworks).distinct().count()/agent_count,1))))
                content_item["orders_contract_growth"] = "/".join((str(round(model_order_sale.filter(object_category=object_category,contract_date__range=(date_start,date_stop),contract_type__in=(contract_all)).exclude(hystoryordersalestatus__status__in=status_noworks_all).distinct().count()/agent_count,1)),str(round(model_order_buy.filter(object_category=object_category,contract_date__range=(date_start,date_stop),contract_type__in=(contract_all)).exclude(hystoryorderbuystatus__status__in=status_noworks_all).distinct().count()/agent_count,1))))
                # актов показов за период
                content_item["shows_acts_all"] = str(round(models.HystoryShow.objects.filter(offer__order_buy__object_category=object_category,date__range=(date_start,date_stop)).exclude(result=status_show_work).distinct().count()/agent_count,1))
                # сделок за период
                content_item["transactions"] = str(round((model_order_sale.filter(object_category=object_category).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count()+model_order_buy.filter(object_category=object_category).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count())/agent_count,1))
                data["messages"]["content"].append(content_item.copy())

            content_item["category_name"] = u"ИТОГО"
            content_item["category_type"] = 1


            # заявки: предложение/спрос
            content_item["orders_all"] = "/".join((str(model_order_sale.filter(create_date__lte=date_stop).filter(hystoryordersalestatus__status__in=status_works).exclude(hystoryordersalestatus__status__in=status_noworks).distinct().count()),str(model_order_buy.filter(create_date__lte=date_stop).filter(hystoryorderbuystatus__status__in=status_works).exclude(hystoryorderbuystatus__status__in=status_noworks).distinct().count())))
            content_item["orders_growth"] = "/".join((str(model_order_sale.filter(create_date__range=(date_start,date_stop)).filter(hystoryordersalestatus__status__in=status_works_all).exclude(hystoryordersalestatus__status__in=status_noworks_all).distinct().count()),str(model_order_buy.filter(create_date__range=(date_start,date_stop)).filter(hystoryorderbuystatus__status__in=status_works_all).exclude(hystoryorderbuystatus__status__in=status_noworks_all).distinct().count())))
            content_item["orders_growth_agent"] = ""
            content_item["orders_retired"] = "/".join((str(model_order_sale.filter(hystoryordersalestatus__date__range=(date_start,date_stop),hystoryordersalestatus__status=status_retired).distinct().count()),str(model_order_buy.filter(hystoryorderbuystatus__date__range=(date_start,date_stop),hystoryorderbuystatus__status=status_retired).distinct().count())))
            # договоры: предложение/спрос
            content_item["orders_contract_all"] = "/".join((str(model_order_sale.filter(contract_date__lte=date_stop,contract_type__in=(contract_all)).exclude(hystoryordersalestatus__status__in=status_noworks).distinct().count()),str(model_order_buy.filter(contract_date__lte=date_stop,contract_type__in=(contract_all)).exclude(hystoryorderbuystatus__status__in=status_noworks).distinct().count())))
            content_item["orders_contract_growth"] = "/".join((str(model_order_sale.filter(contract_date__range=(date_start,date_stop),contract_type__in=(contract_all)).exclude(hystoryordersalestatus__status__in=status_noworks_all).distinct().count()),str(model_order_buy.filter(contract_date__range=(date_start,date_stop),contract_type__in=(contract_all)).exclude(hystoryorderbuystatus__status__in=status_noworks_all).distinct().count())))
            # актов показов за период
            content_item["shows_acts_all"] = str(models.HystoryShow.objects.filter(date__range=(date_start,date_stop)).exclude(result=status_show_work).distinct().count()*2)
            # сделок за период
            content_item["transactions"] = str(model_order_sale.filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count()+model_order_buy.filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count())

            data["messages"]["content"].append(content_item.copy())

            response = JSONResponse(data)

        if report_type == "sales_funnel":
            date_start =  datetime.strptime(getparams.get('date_start'), "%Y-%m-%d")
            date_stop =  datetime.strptime(getparams.get('date_stop'), "%Y-%m-%d")
            time_interval = int(str(date_stop - date_start).split()[0])
            content_item = {}
            data = {'success':True,'messages':{'date_start':date_start,'date_stop':date_stop,'content':[]}}
            model_order_sale = models.OrdersSale.objects
            model_order_buy = models.OrdersBuy.objects
            model_object_category = models.ObjectCategory;
            for object_category in model_object_category.objects.all().order_by("pk"):
                content_item["category_name"] = object_category.name
                content_item["category_type"] = 1
                # продажа: удачные/неудачные
                content_item["orders_sale"] = "<br><font color='red'>".join((str(model_order_sale.filter(object_category=object_category,transaction_type=True).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count()),str(model_order_sale.filter(object_category=object_category,transaction_type=True).filter(hystoryordersalestatus__date__range=(date_start,date_stop),hystoryordersalestatus__status=status_retired).distinct().count())))
                # сдача в аренду: удачные/неудачные
                content_item["orders_sale_rent"] = "<br><font color='red'>".join((str(model_order_sale.filter(object_category=object_category,transaction_type=False).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count()),str(model_order_sale.filter(object_category=object_category,transaction_type=False).filter(hystoryordersalestatus__date__range=(date_start,date_stop),hystoryordersalestatus__status=status_retired).distinct().count())))
                # покупка: удачные/неудачные
                content_item["orders_buy"] = "<br><font color='red'>".join((str(model_order_buy.filter(object_category=object_category,transaction_type=True).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count()),str(model_order_buy.filter(object_category=object_category,transaction_type=True).filter(hystoryorderbuystatus__date__range=(date_start,date_stop),hystoryorderbuystatus__status=status_retired).distinct().count())))
                # поиск в аренду: удачные/неудачные
                content_item["orders_buy_rent"] = "<br><font color='red'>".join((str(model_order_buy.filter(object_category=object_category,transaction_type=False).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count()),str(model_order_buy.filter(object_category=object_category,transaction_type=False).filter(hystoryorderbuystatus__date__range=(date_start,date_stop),hystoryorderbuystatus__status=status_retired).distinct().count())))
                # всего
                content_item["orders_all"] = "<br><font color='red'>".join((str(model_order_sale.filter(object_category=object_category).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count()+model_order_buy.filter(object_category=object_category).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count()),str(model_order_sale.filter(object_category=object_category).filter(hystoryordersalestatus__date__range=(date_start,date_stop),hystoryordersalestatus__status=status_retired).distinct().count()+model_order_buy.filter(object_category=object_category).filter(hystoryorderbuystatus__date__range=(date_start,date_stop),hystoryorderbuystatus__status=status_retired).distinct().count())))
                # выручка наша
                content_item["orders_gain"] = 0
                try:
                    content_item["orders_gain"] += int(round(model_order_sale.filter(object_category=object_category,commission=True,commission_type=False).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().extra(select={'gain':'SUM(price*commission_price/100)'}).values('gain').order_by('gain')[0]['gain']))
                except:
                    content_item["orders_gain"] += 0
                try:
                    content_item["orders_gain"] += int(round(model_order_buy.filter(object_category=object_category,commission=True,commission_type=False).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().filter(offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).select_related('offer__order_sale__price').values('offer__id','offer__order_sale__price','commission_price').extra(select={'gain':'SUM(crmreapp_orderssale.price*crmreapp_ordersbuy.commission_price/100)'}).values('gain').order_by('gain')[0]['gain']))
                except:
                    content_item["orders_gain"] += 0
                # выручка другим агенствам
                try:
                    content_item["orders_gain"] -= int(round(model_order_sale.filter(object_category=object_category,agency_commission=True,agency_commission_type=False).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().extra(select={'gain':'SUM(price*agency_commission_price/100)'}).values('gain').order_by('gain')[0]['gain']))
                except:
                    content_item["orders_gain"] -= 0
                try:
                    content_item["orders_gain"] -= int(round(model_order_buy.filter(object_category=object_category,agency_commission=True,agency_commission_type=False).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().filter(offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).select_related('offer__order_sale__price').values('offer__id','offer__order_sale__price','agency_commission_price').extra(select={'gain':'SUM(crmreapp_orderssale.price*crmreapp_ordersbuy.agency_commission_price/100)'}).values('gain').order_by('gain')[0]['gain']))
                except:
                    content_item["orders_gain"] -= 0
                gain_sale_fixed = model_order_sale.filter(object_category=object_category,commission=True,commission_type=True).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().aggregate(Sum('commission_price'))['commission_price__sum']
                gain_buy_fixed = model_order_buy.filter(object_category=object_category,commission=True,commission_type=True).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().aggregate(Sum('commission_price'))['commission_price__sum']
                gain_sale_agency_fixed = model_order_sale.filter(object_category=object_category,agency_commission=True,agency_commission_type=True).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().aggregate(Sum('agency_commission_price'))['agency_commission_price__sum']
                gain_buy_agency_fixed = model_order_buy.filter(object_category=object_category,agency_commission=True,agency_commission_type=True).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().aggregate(Sum('agency_commission_price'))['agency_commission_price__sum']
                if gain_sale_fixed :
                    content_item["orders_gain"] += int(round(gain_sale_fixed))
                if gain_buy_fixed :
                    content_item["orders_gain"] += int(round(gain_buy_fixed))
                if gain_sale_agency_fixed :
                    content_item["orders_gain"] -= int(round(gain_sale_agency_fixed))
                if gain_buy_agency_fixed :
                    content_item["orders_gain"] -= int(round(gain_buy_agency_fixed))

                data["messages"]["content"].append(content_item.copy())
                agent_count = 0
                for user in object_category.group.user_set.filter(is_active=True):
                    if (not(u"_Агенты" in [group.name for group in user.groups.all()]) and not(u"_Руководители групп" in [group.name for group in user.groups.all()])):
                        continue
                    agent_count += 1
                    content_item["category_name"] = " ".join((user.last_name,user.first_name))
                    content_item["category_type"] = 2
                    # продажа: удачные/неудачные
                    content_item["orders_sale"] = "<br><font color='red'>".join((str(model_order_sale.filter(object_category=object_category,performer=user,transaction_type=True).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count()),str(model_order_sale.filter(object_category=object_category,performer=user,transaction_type=True).filter(hystoryordersalestatus__date__range=(date_start,date_stop),hystoryordersalestatus__status=status_retired).distinct().count())))
                    # сдача в аренду: удачные/неудачные
                    content_item["orders_sale_rent"] = "<br><font color='red'>".join((str(model_order_sale.filter(object_category=object_category,performer=user,transaction_type=False).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count()),str(model_order_sale.filter(object_category=object_category,performer=user,transaction_type=False).filter(hystoryordersalestatus__date__range=(date_start,date_stop),hystoryordersalestatus__status=status_retired).distinct().count())))
                    # покупка: удачные/неудачные
                    content_item["orders_buy"] = "<br><font color='red'>".join((str(model_order_buy.filter(object_category=object_category,performer=user,transaction_type=True).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count()),str(model_order_buy.filter(object_category=object_category,performer=user,transaction_type=True).filter(hystoryorderbuystatus__date__range=(date_start,date_stop),hystoryorderbuystatus__status=status_retired).distinct().count())))
                    # поиск в аренду: удачные/неудачные
                    content_item["orders_buy_rent"] = "<br><font color='red'>".join((str(model_order_buy.filter(object_category=object_category,performer=user,transaction_type=False).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count()),str(model_order_buy.filter(object_category=object_category,performer=user,transaction_type=False).filter(hystoryorderbuystatus__date__range=(date_start,date_stop),hystoryorderbuystatus__status=status_retired).distinct().count())))
                    # всего
                    content_item["orders_all"] = "<br><font color='red'>".join((str(model_order_sale.filter(object_category=object_category,performer=user).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count()+model_order_buy.filter(object_category=object_category,performer=user).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count()),str(model_order_sale.filter(object_category=object_category,performer=user).filter(hystoryordersalestatus__date__range=(date_start,date_stop),hystoryordersalestatus__status=status_retired).distinct().count()+model_order_buy.filter(object_category=object_category,performer=user).filter(hystoryorderbuystatus__date__range=(date_start,date_stop),hystoryorderbuystatus__status=status_retired).distinct().count())))
                    # выручка наша
                    content_item["orders_gain"] = 0
                    try:
                        content_item["orders_gain"] += int(round(model_order_sale.filter(object_category=object_category,performer=user,commission=True,commission_type=False).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().extra(select={'gain':'SUM(price*commission_price/100)'}).values('gain').order_by('gain')[0]['gain']))
                    except:
                        content_item["orders_gain"] += 0
                    try:
                        content_item["orders_gain"] += int(round(model_order_buy.filter(object_category=object_category,performer=user,commission=True,commission_type=False).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().filter(offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).select_related('offer__order_sale__price').values('offer__id','offer__order_sale__price','commission_price').extra(select={'gain':'SUM(crmreapp_orderssale.price*crmreapp_ordersbuy.commission_price/100)'}).values('gain').order_by('gain')[0]['gain']))
                    except:
                        content_item["orders_gain"] += 0
                    # выручка другим агенствам
                    try:
                        content_item["orders_gain"] -= int(round(model_order_sale.filter(object_category=object_category,performer=user,agency_commission=True,agency_commission_type=False).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().extra(select={'gain':'SUM(price*agency_commission_price/100)'}).values('gain').order_by('gain')[0]['gain']))
                    except:
                        content_item["orders_gain"] -= 0
                    try:
                        content_item["orders_gain"] -= int(round(model_order_buy.filter(object_category=object_category,performer=user,agency_commission=True,agency_commission_type=False).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().filter(offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).select_related('offer__order_sale__price').values('offer__id','offer__order_sale__price','agency_commission_price').extra(select={'gain':'SUM(crmreapp_orderssale.price*crmreapp_ordersbuy.agency_commission_price/100)'}).values('gain').order_by('gain')[0]['gain']))
                    except:
                        content_item["orders_gain"] -= 0
                    gain_sale_fixed = model_order_sale.filter(object_category=object_category,performer=user,commission=True,commission_type=True).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().aggregate(Sum('commission_price'))['commission_price__sum']
                    gain_buy_fixed = model_order_buy.filter(object_category=object_category,performer=user,commission=True,commission_type=True).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().aggregate(Sum('commission_price'))['commission_price__sum']
                    gain_sale_agency_fixed = model_order_sale.filter(object_category=object_category,performer=user,agency_commission=True,agency_commission_type=True).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().aggregate(Sum('agency_commission_price'))['agency_commission_price__sum']
                    gain_buy_agency_fixed = model_order_buy.filter(object_category=object_category,performer=user,agency_commission=True,agency_commission_type=True).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().aggregate(Sum('agency_commission_price'))['agency_commission_price__sum']
                    if gain_sale_fixed :
                        content_item["orders_gain"] += int(round(gain_sale_fixed))
                    if gain_buy_fixed :
                        content_item["orders_gain"] += int(round(gain_buy_fixed))
                    if gain_sale_agency_fixed :
                        content_item["orders_gain"] -= int(round(gain_sale_agency_fixed))
                    if gain_buy_agency_fixed :
                        content_item["orders_gain"] -= int(round(gain_buy_agency_fixed))

                    data["messages"]["content"].append(content_item.copy())
                content_item["category_name"] = u"Среднее на 1 агента"
                content_item["category_type"] = 3
                agent_count = float(agent_count)

                # продажа: удачные/неудачные
                content_item["orders_sale"] = "<br><font color='red'>".join((str(round(model_order_sale.filter(object_category=object_category,transaction_type=True).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count()/agent_count,1)),str(round(model_order_sale.filter(object_category=object_category,transaction_type=True).filter(hystoryordersalestatus__date__range=(date_start,date_stop),hystoryordersalestatus__status=status_retired).distinct().count()/agent_count,1))))
                # сдача в аренду: удачные/неудачные
                content_item["orders_sale_rent"] = "<br><font color='red'>".join((str(round(model_order_sale.filter(object_category=object_category,transaction_type=False).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count()/agent_count,1)),str(round(model_order_sale.filter(object_category=object_category,transaction_type=False).filter(hystoryordersalestatus__date__range=(date_start,date_stop),hystoryordersalestatus__status=status_retired).distinct().count()/agent_count,1))))
                # покупка: удачные/неудачные
                content_item["orders_buy"] = "<br><font color='red'>".join((str(round(model_order_buy.filter(object_category=object_category,transaction_type=True).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count()/agent_count,1)),str(round(model_order_buy.filter(object_category=object_category,transaction_type=True).filter(hystoryorderbuystatus__date__range=(date_start,date_stop),hystoryorderbuystatus__status=status_retired).distinct().count()/agent_count,1))))
                # поиск в аренду: удачные/неудачные
                content_item["orders_buy_rent"] = "<br><font color='red'>".join((str(round(model_order_buy.filter(object_category=object_category,transaction_type=False).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count()/agent_count,1)),str(round(model_order_buy.filter(object_category=object_category,transaction_type=False).filter(hystoryorderbuystatus__date__range=(date_start,date_stop),hystoryorderbuystatus__status=status_retired).distinct().count()/agent_count,1))))
                # всего
                content_item["orders_all"] = "<br><font color='red'>".join((str(round((model_order_sale.filter(object_category=object_category).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count()+model_order_buy.filter(object_category=object_category).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count())/agent_count,1)),str(round((model_order_sale.filter(object_category=object_category).filter(hystoryordersalestatus__date__range=(date_start,date_stop),hystoryordersalestatus__status=status_retired).distinct().count()+model_order_buy.filter(object_category=object_category).filter(hystoryorderbuystatus__date__range=(date_start,date_stop),hystoryorderbuystatus__status=status_retired).distinct().count())/agent_count,1))))
                # выручка наша
                content_item["orders_gain"] = 0
                try:
                    content_item["orders_gain"] += int(round(model_order_sale.filter(object_category=object_category,commission=True,commission_type=False).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().extra(select={'gain':'SUM(price*commission_price/100)'}).values('gain').order_by('gain')[0]['gain']))
                except:
                    content_item["orders_gain"] += 0
                try:
                    content_item["orders_gain"] += int(round(model_order_buy.filter(object_category=object_category,commission=True,commission_type=False).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().filter(offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).select_related('offer__order_sale__price').values('offer__id','offer__order_sale__price','commission_price').extra(select={'gain':'SUM(crmreapp_orderssale.price*crmreapp_ordersbuy.commission_price/100)'}).values('gain').order_by('gain')[0]['gain']))
                except:
                    content_item["orders_gain"] += 0
                # выручка другим агенствам
                try:
                    content_item["orders_gain"] -= int(round(model_order_sale.filter(object_category=object_category,agency_commission=True,agency_commission_type=False).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().extra(select={'gain':'SUM(price*agency_commission_price/100)'}).values('gain').order_by('gain')[0]['gain']))
                except:
                    content_item["orders_gain"] -= 0
                try:
                    content_item["orders_gain"] -= int(round(model_order_buy.filter(object_category=object_category,agency_commission=True,agency_commission_type=False).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().filter(offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).select_related('offer__order_sale__price').values('offer__id','offer__order_sale__price','agency_commission_price').extra(select={'gain':'SUM(crmreapp_orderssale.price*crmreapp_ordersbuy.agency_commission_price/100)'}).values('gain').order_by('gain')[0]['gain']))
                except:
                    content_item["orders_gain"] -= 0
                gain_sale_fixed = model_order_sale.filter(object_category=object_category,commission=True,commission_type=True).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().aggregate(Sum('commission_price'))['commission_price__sum']
                gain_buy_fixed = model_order_buy.filter(object_category=object_category,commission=True,commission_type=True).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().aggregate(Sum('commission_price'))['commission_price__sum']
                gain_sale_agency_fixed = model_order_sale.filter(object_category=object_category,agency_commission=True,agency_commission_type=True).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().aggregate(Sum('agency_commission_price'))['agency_commission_price__sum']
                gain_buy_agency_fixed = model_order_buy.filter(object_category=object_category,agency_commission=True,agency_commission_type=True).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().aggregate(Sum('agency_commission_price'))['agency_commission_price__sum']
                if gain_sale_fixed :
                    content_item["orders_gain"] += int(round(gain_sale_fixed))
                if gain_buy_fixed :
                    content_item["orders_gain"] += int(round(gain_buy_fixed))
                content_item["orders_gain"] = round(content_item["orders_gain"]/agent_count,1)
                if gain_sale_agency_fixed :
                    content_item["orders_gain"] -= int(round(gain_sale_agency_fixed))
                if gain_buy_agency_fixed :
                    content_item["orders_gain"] -= int(round(gain_buy_agency_fixed))
                content_item["orders_gain"] = round(content_item["orders_gain"]/agent_count,1)

                data["messages"]["content"].append(content_item.copy())

            content_item["category_name"] = u"ИТОГО"
            content_item["category_type"] = 1
            # продажа: удачные/неудачные
            content_item["orders_sale"] = "<br><font color='red'>".join((str(model_order_sale.filter(transaction_type=True).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count()),str(model_order_sale.filter(transaction_type=True).filter(hystoryordersalestatus__date__range=(date_start,date_stop),hystoryordersalestatus__status=status_retired).distinct().count())))
            # сдача в аренду: удачные/неудачные
            content_item["orders_sale_rent"] = "<br><font color='red'>".join((str(model_order_sale.filter(transaction_type=False).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count()),str(model_order_sale.filter(transaction_type=False).filter(hystoryordersalestatus__date__range=(date_start,date_stop),hystoryordersalestatus__status=status_retired).distinct().count())))
            # покупка: удачные/неудачные
            content_item["orders_buy"] = "<br><font color='red'>".join((str(model_order_buy.filter(transaction_type=True).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count()),str(model_order_buy.filter(transaction_type=True).filter(hystoryorderbuystatus__date__range=(date_start,date_stop),hystoryorderbuystatus__status=status_retired).distinct().count())))
            # поиск в аренду: удачные/неудачные
            content_item["orders_buy_rent"] = "<br><font color='red'>".join((str(model_order_buy.filter(transaction_type=False).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count()),str(model_order_buy.filter(transaction_type=False).filter(hystoryorderbuystatus__date__range=(date_start,date_stop),hystoryorderbuystatus__status=status_retired).distinct().count())))
            # всего
            content_item["orders_all"] = "<br><font color='red'>".join((str(model_order_sale.filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count()+model_order_buy.filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().count()),str(model_order_sale.filter(hystoryordersalestatus__date__range=(date_start,date_stop),hystoryordersalestatus__status=status_retired).distinct().count()+model_order_buy.filter(hystoryorderbuystatus__date__range=(date_start,date_stop),hystoryorderbuystatus__status=status_retired).distinct().count())))
            # выручка наша
            content_item["orders_gain"] = 0
            try:
                content_item["orders_gain"] += int(round(model_order_sale.filter(commission=True,commission_type=False).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().extra(select={'gain':'SUM(price*commission_price/100)'}).values('gain').order_by('gain')[0]['gain']))
            except:
                content_item["orders_gain"] += 0
            try:
                content_item["orders_gain"] += int(round(model_order_buy.filter(commission=True,commission_type=False).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().filter(offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).select_related('offer__order_sale__price').values('offer__id','offer__order_sale__price','commission_price').extra(select={'gain':'SUM(crmreapp_orderssale.price*crmreapp_ordersbuy.commission_price/100)'}).values('gain').order_by('gain')[0]['gain']))
            except:
                content_item["orders_gain"] += 0
            # выручка другим агенствам
            content_item["orders_gain"] = 0
            try:
                content_item["orders_gain"] -= int(round(model_order_sale.filter(agency_commission=True,agency_commission_type=False).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().extra(select={'gain':'SUM(price*agency_commission_price/100)'}).values('gain').order_by('gain')[0]['gain']))
            except:
                content_item["orders_gain"] -= 0
            try:
                content_item["orders_gain"] -= int(round(model_order_buy.filter(agency_commission=True,agency_commission_type=False).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().filter(offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).select_related('offer__order_sale__price').values('offer__id','offer__order_sale__price','agency_commission_price').extra(select={'gain':'SUM(crmreapp_orderssale.price*crmreapp_ordersbuy.agency_commission_price/100)'}).values('gain').order_by('gain')[0]['gain']))
            except:
                content_item["orders_gain"] -= 0
            gain_sale_fixed = model_order_sale.filter(commission=True,commission_type=True).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().aggregate(Sum('commission_price'))['commission_price__sum']
            gain_buy_fixed = model_order_buy.filter(commission=True,commission_type=True).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().aggregate(Sum('commission_price'))['commission_price__sum']
            gain_sale_agency_fixed = model_order_sale.filter(agency_commission=True,agency_commission_type=True).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().aggregate(Sum('agency_commission_price'))['agency_commission_price__sum']
            gain_buy_agency_fixed = model_order_buy.filter(agency_commission=True,agency_commission_type=True).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct().aggregate(Sum('agency_commission_price'))['agency_commission_price__sum']
            if gain_sale_fixed :
                content_item["orders_gain"] += int(round(gain_sale_fixed))
            if gain_buy_fixed :
                content_item["orders_gain"] += int(round(gain_buy_fixed))
            if gain_sale_agency_fixed :
                content_item["orders_gain"] -= int(round(gain_sale_agency_fixed))
            if gain_buy_agency_fixed :
                content_item["orders_gain"] -= int(round(gain_buy_agency_fixed))
            data["messages"]["content"].append(content_item.copy())

            response = JSONResponse(data)
        if report_type == "object_type":
            content_item = {}
            city =  getparams.get('city')
            microdistrict =  getparams.get('microdistrict')
            transaction_type =  getparams.get('transaction_type')
            object_filter = Q()
            if city:
                object_filter = object_filter & Q(city=int(city))
            if microdistrict:
                object_filter = object_filter & Q(microdistrict=int(microdistrict))
            if transaction_type:
                object_filter = object_filter & Q(transaction_type=bool(int(transaction_type)))
            status_archiv = models.OrderStatus.objects.get(name=u"архив")
            status_free = models.OrderStatus.objects.get(name=u"свободная")
            model_order_sale = models.OrdersSale.objects.filter(object_filter).exclude(status__in=(status_archiv,status_free))
            model_object_category = models.ObjectCategory
            objects_all_count = model_order_sale.count()
            try:
                city_name = models.City.objects.get(id=int(city)).name
            except:
                city_name = u"все"
            try:
                microdistrict_name = models.Microdistrict.objects.get(id=int(microdistrict)).name
            except:
                microdistrict_name = u"все"
            data = {'success':True,'messages':{'objects_all_count':objects_all_count,'city':city_name,'microdistrict':microdistrict_name,'transaction_type':transaction_type,'content':[]}}
            for object_category in model_object_category.objects.all().order_by("pk"):
                content_item["category_name"] = object_category.name
                content_item["category_type"] = 1
                # кол-во объектов
                content_item["objects_count"] = str(model_order_sale.filter(object_category=object_category).count())
                # минимальная площадь
                try:
                    content_item["space_min"] = str(round(model_order_sale.filter(object_category=object_category).aggregate(Min('total_space'))['total_space__min'],1))
                except TypeError:
                        content_item["space_min"] = ""
                # средняя площадь
                try:
                    content_item["space_average"] = str(round(model_order_sale.filter(object_category=object_category).aggregate(Avg('total_space'))['total_space__avg'],1))
                except TypeError:
                        content_item["space_average"] = ""
                # максимальная площадь
                try:
                    content_item["space_max"] = str(round(model_order_sale.filter(object_category=object_category).aggregate(Max('total_space'))['total_space__max'],1))
                except TypeError:
                        content_item["space_max"] = ""
                # минимальная цена
                try:
                    content_item["price_min"] = str(int(round(model_order_sale.filter(object_category=object_category).aggregate(Min('price'))['price__min'])))
                except TypeError:
                        content_item["price_min"] = ""
                # средняя цена
                try:
                    content_item["price_average"] = str(int(round(model_order_sale.filter(object_category=object_category).aggregate(Avg('price'))['price__avg'])))
                except TypeError:
                        content_item["price_average"] = ""
                # максимальная цена
                try:
                    content_item["price_max"] = str(int(round(model_order_sale.filter(object_category=object_category).aggregate(Max('price'))['price__max'])))
                except :
                        content_item["price_max"] = ""
                # средняя цена за квадратный метр
                try:
                    odersale_query = model_order_sale.filter(object_category=object_category,price__isnull=False,total_space__isnull=False).exclude(price=Decimal('0.00')).exclude(total_space=Decimal('0.00'))
                    content_item["price_average_meter"] = str(int(round(odersale_query.extra(select={'average':'SUM(price/total_space)'}).values('average').order_by("average")[0]['average']/odersale_query.count())))
                except TypeError:
                        content_item["price_average_meter"] = ""
                data["messages"]["content"].append(content_item.copy())
                for object_type in object_category.objecttype_set.all():
                    content_item["category_name"] = object_type.name
                    content_item["category_type"] = 2
                    # кол-во объектов
                    content_item["objects_count"] = str(model_order_sale.filter(object_category=object_category,object_type=object_type).count())
                    # минимальная площадь
                    try:
                        content_item["space_min"] = str(round(model_order_sale.filter(object_category=object_category,object_type=object_type).aggregate(Min('total_space'))['total_space__min'],1))
                    except TypeError:
                        content_item["space_min"] = ""
                    # средняя площадь
                    try:
                        content_item["space_average"] = str(round(model_order_sale.filter(object_category=object_category,object_type=object_type).aggregate(Avg('total_space'))['total_space__avg'],1))
                    except TypeError:
                        content_item["space_average"] = ""
                    # максимальная площадь
                    try:
                        content_item["space_max"] = str(round(model_order_sale.filter(object_category=object_category,object_type=object_type).aggregate(Max('total_space'))['total_space__max'],1))
                    except TypeError:
                        content_item["space_max"] = ""
                    # минимальная цена
                    try:
                        content_item["price_min"] = str(int(round(model_order_sale.filter(object_category=object_category,object_type=object_type).aggregate(Min('price'))['price__min'])))
                    except TypeError:
                        content_item["price_min"] = ""
                    # средняя цена
                    try:
                        content_item["price_average"] = str(int(round(model_order_sale.filter(object_category=object_category,object_type=object_type).aggregate(Avg('price'))['price__avg'])))
                    except TypeError:
                        content_item["price_average"] = ""
                    # максимальная цена
                    try:
                        content_item["price_max"] = str(int(round(model_order_sale.filter(object_category=object_category,object_type=object_type).aggregate(Max('price'))['price__max'])))
                    except TypeError:
                        content_item["price_max"] = ""
                    # средняя цена за квадратный метр
                    try:
                        odersale_query = model_order_sale.filter(object_category=object_category,object_type=object_type,price__isnull=False,total_space__isnull=False).exclude(price=Decimal('0.00')).exclude(total_space=Decimal('0.00'))
                        content_item["price_average_meter"] = str(int(round(odersale_query.extra(select={'average':'SUM(price/total_space)'}).values('average').order_by("average")[0]['average']/odersale_query.count())))
                    except TypeError:
                            content_item["price_average_meter"] = ""
                    data["messages"]["content"].append(content_item.copy())
            response = JSONResponse(data)
        if report_type == "dynamics":
            content_list = []
            content_item = {}
            content_dict = {}
            date_start =  datetime.strptime(getparams.get('date_start'), "%Y-%m-%d")
            date_stop =  datetime.strptime(getparams.get('date_stop'), "%Y-%m-%d")
            date_item = date_start
            date_type = bool(int(getparams.get('date_type')))
            while date_item <= date_stop:
                content_list.append({'date':datetime.date(date_item)})
                date_item += timedelta(days=1)
            object_category = getparams.get('object_category')
            orders_type = int(getparams.get('orders_type'))
            users = getparams.getlist('user')
            object_filter = Q()
            show_buy_filter = Q()
            show_sale_filter = Q()
            if object_category:
                object_filter = object_filter & Q(object_category=int(object_category))
                show_buy_filter = show_buy_filter & Q(offer__order_buy__object_category=int(object_category))
                show_sale_filter = show_sale_filter & Q(offer__order_sale__object_category=int(object_category))
            if users:
                object_filter = object_filter & Q(performer__in=users)
                show_buy_filter = show_buy_filter & Q(offer__order_buy__performer__in=users)
                show_sale_filter = show_sale_filter & Q(offer__order_sale__performer__in=users)
            group_agents = Group.objects.get(name=u'_Агенты')
            group_managers = Group.objects.get(name=u'_Руководители групп')
            agents_list = list(group_agents.user_set.all())+list(group_managers.user_set.all())
            data = {'success':True,'messages':[]}
            model_order_sale = models.OrdersSale.objects
            model_order_buy = models.OrdersBuy.objects
            if (orders_type==1 or orders_type==2):
                if (date_type):
                    content_item['orders_buy_all_counts'] = model_order_buy.filter(object_filter).extra(select={'date': "to_char(create_date, 'YYYY-MM-DD')"}).values('date').annotate(orders_buy_all_counts=Count('index')).order_by('date')
                    content_item['orders_buy_agent_counts'] = model_order_buy.filter(object_filter,author__in=agents_list).extra(select={'date': "to_char(create_date, 'YYYY-MM-DD')"}).values('date').annotate(orders_buy_agent_counts=Count('index')).order_by('date')
                    content_item['contracts_buy'] = model_order_buy.filter(object_filter,contract_type__in=(contract_all)).exclude(hystoryorderbuystatus__status__in=status_noworks_all).extra(select={'date': "to_char(create_date, 'YYYY-MM-DD')"}).values('date').annotate(contracts_buy=Count('index')).order_by('date')
                    content_item['transactions_buy'] = model_order_buy.filter(object_filter).filter(hystoryorderbuystatus__status=status_complet).distinct().extra(select={'date': "to_char(crmreapp_hystoryorderbuystatus.date, 'YYYY-MM-DD')"}).values('date').annotate(transactions_buy=Count('pk')).order_by('date')
                    content_item['orders_buy_retired'] = model_order_buy.filter(object_filter).filter(hystoryorderbuystatus__status=status_retired).distinct().extra(select={'date': "to_char(crmreapp_hystoryorderbuystatus.date, 'YYYY-MM-DD')"}).values('date').annotate(orders_buy_retired=Count('pk')).order_by('date')
                    content_item["shows_acts_buy"] = models.HystoryShow.objects.filter(show_buy_filter).exclude(result=status_show_work).extra(select={'date': "to_char(date, 'YYYY-MM-DD')"}).values('date').annotate(shows_acts_buy=Count('pk')).order_by('date')
                    format_date = "%Y-%m-%d"
                else:
                    content_item['orders_buy_all_counts'] = model_order_buy.filter(object_filter).extra(select={'date': "to_char(create_date, 'YYYY-MM')"}).values('date').annotate(orders_buy_all_counts=Count('index')).order_by('date')
                    content_item['orders_buy_agent_counts'] = model_order_buy.filter(object_filter,author__in=agents_list).extra(select={'date': "to_char(create_date, 'YYYY-MM')"}).values('date').annotate(orders_buy_agent_counts=Count('index')).order_by('date')
                    content_item['contracts_buy'] = model_order_buy.filter(object_filter,contract_type__in=(contract_all)).exclude(hystoryorderbuystatus__status__in=status_noworks_all).extra(select={'date': "to_char(create_date, 'YYYY-MM')"}).values('date').annotate(contracts_buy=Count('index')).order_by('date')
                    content_item['transactions_buy'] = model_order_buy.filter(object_filter).filter(hystoryorderbuystatus__status=status_complet).distinct().extra(select={'date': "to_char(crmreapp_hystoryorderbuystatus.date, 'YYYY-MM')"}).values('date').annotate(transactions_buy=Count('pk')).order_by('date')
                    content_item['orders_buy_retired'] = model_order_buy.filter(object_filter).filter(hystoryorderbuystatus__status=status_retired).distinct().extra(select={'date': "to_char(crmreapp_hystoryorderbuystatus.date, 'YYYY-MM')"}).values('date').annotate(orders_buy_retired=Count('pk')).order_by('date')
                    content_item["shows_acts_buy"] = models.HystoryShow.objects.filter(show_buy_filter).exclude(result=status_show_work).extra(select={'date': "to_char(date, 'YYYY-MM')"}).values('date').annotate(shows_acts_buy=Count('pk')).order_by('date')
                    format_date = "%Y-%m"
                content_dict['orders_buy_all_counts'] = list_to_dict(content_item,'orders_buy_all_counts',format_date)
                content_dict['orders_buy_agent_counts'] = list_to_dict(content_item,'orders_buy_agent_counts',format_date)
                content_dict['contracts_buy'] = list_to_dict(content_item,'contracts_buy',format_date)
                content_dict['transactions_buy'] = list_to_dict(content_item,'transactions_buy',format_date)
                content_dict['orders_buy_retired'] = list_to_dict(content_item,'orders_buy_retired',format_date)
                content_dict['shows_acts_buy'] = list_to_dict(content_item,'shows_acts_buy',format_date)
            else:
                content_dict['orders_buy_all_counts'] = {}
                content_dict['orders_buy_agent_counts'] = {}
                content_dict['contracts_buy'] = {}
                content_dict['transactions_buy'] = {}
                content_dict['orders_buy_retired'] = {}
                content_dict['shows_acts_buy'] = {}
            if (orders_type==1 or orders_type==3):
                if (date_type):
                    content_item['orders_sale_all_counts'] = model_order_sale.filter(object_filter).extra(select={'date': "to_char(create_date, 'YYYY-MM-DD')"}).values('date').annotate(orders_sale_all_counts=Count('index')).order_by('date')
                    content_item['orders_sale_agent_counts'] = model_order_sale.filter(object_filter,author__in=agents_list).extra(select={'date': "to_char(create_date, 'YYYY-MM-DD')"}).values('date').annotate(orders_sale_agent_counts=Count('index')).order_by('date')
                    content_item['contracts_sale'] = model_order_sale.filter(object_filter,contract_type__in=(contract_all)).exclude(hystoryordersalestatus__status__in=status_noworks_all).extra(select={'date': "to_char(create_date, 'YYYY-MM-DD')"}).values('date').annotate(contracts_sale=Count('index')).order_by('date')
                    content_item['transactions_sale'] = model_order_sale.filter(object_filter).filter(hystoryordersalestatus__status=status_complet).distinct().extra(select={'date': "to_char(crmreapp_hystoryordersalestatus.date, 'YYYY-MM-DD')"}).values('date').annotate(transactions_sale=Count('pk')).order_by('date')
                    content_item['orders_sale_retired'] = model_order_sale.filter(object_filter).filter(hystoryordersalestatus__status=status_retired).distinct().extra(select={'date': "to_char(crmreapp_hystoryordersalestatus.date, 'YYYY-MM-DD')"}).values('date').annotate(orders_sale_retired=Count('pk')).order_by('date')
                    content_item["shows_acts_sale"] = models.HystoryShow.objects.filter(show_sale_filter).exclude(result=status_show_work).extra(select={'date': "to_char(date, 'YYYY-MM-DD')"}).values('date').annotate(shows_acts_sale=Count('pk')).order_by('date')
                    format_date = "%Y-%m-%d"
                else:
                    content_item['orders_sale_all_counts'] = model_order_sale.filter(object_filter).extra(select={'date': "to_char(create_date, 'YYYY-MM')"}).values('date').annotate(orders_sale_all_counts=Count('index')).order_by('date')
                    content_item['orders_sale_agent_counts'] = model_order_sale.filter(object_filter,author__in=agents_list).extra(select={'date': "to_char(create_date, 'YYYY-MM')"}).values('date').annotate(orders_sale_agent_counts=Count('index')).order_by('date')
                    content_item['contracts_sale'] = model_order_sale.filter(object_filter,contract_type__in=(contract_all)).exclude(hystoryordersalestatus__status__in=status_noworks_all).extra(select={'date': "to_char(create_date, 'YYYY-MM')"}).values('date').annotate(contracts_sale=Count('index')).order_by('date')
                    content_item['transactions_sale'] = model_order_sale.filter(object_filter).filter(hystoryordersalestatus__status=status_complet).distinct().extra(select={'date': "to_char(crmreapp_hystoryordersalestatus.date, 'YYYY-MM')"}).values('date').annotate(transactions_sale=Count('pk')).order_by('date')
                    content_item['orders_sale_retired'] = model_order_sale.filter(object_filter).filter(hystoryordersalestatus__status=status_retired).distinct().extra(select={'date': "to_char(crmreapp_hystoryordersalestatus.date, 'YYYY-MM')"}).values('date').annotate(orders_sale_retired=Count('pk')).order_by('date')
                    content_item["shows_acts_sale"] = models.HystoryShow.objects.filter(show_sale_filter).exclude(result=status_show_work).extra(select={'date': "to_char(date, 'YYYY-MM')"}).values('date').annotate(shows_acts_sale=Count('pk')).order_by('date')
                    format_date = "%Y-%m"
                content_dict['orders_sale_all_counts'] = list_to_dict(content_item,'orders_sale_all_counts',format_date)
                content_dict['orders_sale_agent_counts'] = list_to_dict(content_item,'orders_sale_agent_counts',format_date)
                content_dict['contracts_sale'] = list_to_dict(content_item,'contracts_sale',format_date)
                content_dict['transactions_sale'] = list_to_dict(content_item,'transactions_sale',format_date)
                content_dict['orders_sale_retired'] = list_to_dict(content_item,'orders_sale_retired',format_date)
                content_dict['shows_acts_sale'] = list_to_dict(content_item,'shows_acts_sale',format_date)
            else:
                content_dict['orders_sale_all_counts'] = {}
                content_dict['orders_sale_agent_counts'] = {}
                content_dict['contracts_sale'] = {}
                content_dict['transactions_sale'] = {}
                content_dict['orders_sale_retired'] = {}
                content_dict['shows_acts_sale'] = {}
            for content in content_list:
                content['orders_all_counts'] = content_dict['orders_buy_all_counts'].get(content['date'],0) + content_dict['orders_sale_all_counts'].get(content['date'],0)
                content['orders_agent_counts'] = content_dict['orders_buy_agent_counts'].get(content['date'],0) + content_dict['orders_sale_agent_counts'].get(content['date'],0)
                content['contracts'] = content_dict['contracts_buy'].get(content['date'],0) + content_dict['contracts_sale'].get(content['date'],0)
                content['shows_acts'] = content_dict['shows_acts_buy'].get(content['date'],0) + content_dict['shows_acts_sale'].get(content['date'],0)
                content['transactions'] = content_dict['transactions_buy'].get(content['date'],0) + content_dict['transactions_sale'].get(content['date'],0)
                content['orders_retired'] = content_dict['orders_buy_retired'].get(content['date'],0) + content_dict['orders_sale_retired'].get(content['date'],0)
            data["messages"]=content_list
            response = JSONResponse(data)
        if report_type == "clients":
            content_list = []
            content_item = {}
            content_dict = {}
            date_start =  datetime.strptime(getparams.get('date_start'), "%Y-%m-%d")
            date_stop =  datetime.strptime(getparams.get('date_stop'), "%Y-%m-%d")
            date_item = date_start
            while date_item <= date_stop:
                content_list.append({'date':datetime.date(date_item)})
                date_item += timedelta(days=1)
            data = {'success':True,'messages':[]}
            clients_start = models.Clients.objects.filter(create_date__lte=date_start).order_by('create_date').count()
            clients_stop = models.Clients.objects.filter(create_date__lte=date_stop).order_by('create_date').count()
            content_item['clients'] = models.Clients.objects.extra(select={'date': "to_char(create_date, 'YYYY-MM-DD')"}).values('date').annotate(clients=Count('index')).order_by('date')
            content_dict['clients'] = list_to_dict(content_item,'clients',"%Y-%m-%d")
            for content in content_list:
                content['clients'] = content_dict['clients'].get(content['date'],0)
            data["messages"]=content_list
            data["clients_start"]=clients_start
            data["clients_stop"]=clients_stop
            response = JSONResponse(data)
        if report_type == "completed":
            date_start =  datetime.strptime(getparams.get('date_start'), "%Y-%m-%d")
            date_stop =  datetime.strptime(getparams.get('date_stop'), "%Y-%m-%d")
            object_category = getparams.get('object_category')
            orders_type = int(getparams.get('orders_type'))
            users_raw = getparams.get('user')
            if users_raw:
                users = getparams.getlist('user')
            else:
                users = []
            if orders_type == 1:
                orders_type_name = u'продажа'
            else:
                orders_type_name = u'покупка'
            object_filter = Q()
            if object_category:
                object_filter = object_filter & Q(object_category=int(object_category))
                object_category_name = models.ObjectCategory.objects.get(pk=int(object_category)).name
            else:
                object_category_name = ""
            time_interval = int(str(date_stop - date_start).split()[0])
            content_item = {}
            data = {'success':True,'messages':{'date_start':date_start,'date_stop':date_stop,'orders_type':orders_type_name,'object_category':object_category_name,'content':[]}}
            model_order_sale = models.OrdersSale.objects.filter(object_filter)
            model_order_buy = models.OrdersBuy.objects.filter(object_filter)
            print "users",users
            if len(users)>0:
                user_list = [User.objects.get(pk=int(user)) for user in users]
            else:
                user_list = User.objects.filter(is_active=True).order_by('last_name')
            for user in user_list:
                if (not(u"_Агенты" in [group.name for group in user.groups.all()]) and not(u"_Руководители групп" in [group.name for group in user.groups.all()])):
                    continue
                content_item["performer"] = " ".join((user.last_name,user.first_name))
                if (orders_type==1):
                    transactions = model_order_sale.filter(performer=user).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct()
                    for order in transactions:
                        try:
                            opposite_order = model_order_buy.get(offer__order_sale=order,offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet)
                            content_item["opposite_index"] = opposite_order.index
                            content_item["bank"] = opposite_order.bank.name if opposite_order.bank else ""
                        except:
                            content_item["opposite_index"] = ""
                            content_item["bank"] = ""
                        try:
                            content_item["date"] = models.HystoryService.objects.filter(operation=operation_registr,result_operation=operation_complet,offer__order_sale=order)[0].date
                        except:
                            content_item["date"] = ""
                        content_item["client"] = order.client.client_name
                        content_item["transaction_type"] = u"продажа" if order.transaction_type else u"аренда"
                        content_item["index"] = order.index
                        content_item["heading"] = order.heading
                        content_item["object_type"] = order.object_type.name
                        content_item["price"] = round(order.price)
                        city = order.city.name if order.city else ""
                        street = order.street.name if order.street else ""
                        content_item["address"] = " ".join((city,street,order.house_number,order.house_apartment))
                        if (order.price and order.commission and not order.commission_type):
                            content_item["revenue"] = int(round(order.price*order.commission_price/100))
                        elif (order.commission and order.commission_type):
                            content_item["revenue"] = int(order.commission_price)
                        else:
                            content_item["revenue"] = 0
                        content_item["method_payment"] = order.method_payment.name if order.method_payment else ""
                        content_item["construction_stage"] = u"готовый" if order.construction_stage else u"строящийся"
                        content_item["construction_organization"] = order.construction_organization.name if order.construction_organization else ""
                        content_item["author"] = " ".join((order.author.last_name,order.author.first_name))
                        content_item["rating"] = order.rating
                        data["messages"]["content"].append(content_item.copy())
                if (orders_type==2):
                    transactions = model_order_buy.filter(performer=user).filter(offer__hystoryservice__date__range=(date_start,date_stop),offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet).distinct()
                    for order in transactions:
                        try:
                            opposite_order = model_order_sale.get(offer__order_buy=order,offer__hystoryservice__operation=operation_registr,offer__hystoryservice__result_operation=operation_complet)
                            content_item["opposite_index"] = opposite_order.index
                            content_item["price"] = round(opposite_order.price)
                            if (opposite_order.price and order.commission and not order.commission_type):
                                content_item["revenue"] = int(round(opposite_order.price*order.commission_price/100))
                            elif (order.commission and order.commission_type):
                                content_item["revenue"] = int(order.commission_price)
                            else:
                                content_item["revenue"] = 0
                            content_item["object_type"] = opposite_order.object_type.name
                            city = opposite_order.city.name if opposite_order.city else ""
                            street = opposite_order.street.name if opposite_order.street else ""
                            content_item["address"] = " ".join((city,street,opposite_order.house_number,opposite_order.house_apartment))
                            content_item["method_payment"] = opposite_order.method_payment.name if opposite_order.method_payment else ""
                            content_item["construction_stage"] = u"готовый" if opposite_order.construction_stage else u"строящийся"
                            content_item["construction_organization"] = opposite_order.construction_organization.name if opposite_order.construction_organization else ""
                        except:
                            content_item["opposite_index"] = ""
                        try:
                            content_item["date"] = models.HystoryService.objects.filter(operation=operation_registr,result_operation=operation_complet,offer__order_buy=order)[0].date
                        except:
                            content_item["date"] = ""
                        content_item["client"] = order.client.client_name
                        content_item["transaction_type"] = u"покупка" if order.transaction_type else u"аренда"
                        content_item["index"] = order.index
                        content_item["heading"] = order.heading
                        content_item["bank"] = order.bank.name if order.bank else ""
                        content_item["author"] = " ".join((order.author.last_name,order.author.first_name))
                        content_item["rating"] = order.rating
                        data["messages"]["content"].append(content_item.copy())
            response = JSONResponse(data)
        if report_type == "payroll":
            object_category = getparams.get('object_category')
            date_start =  datetime.strptime(getparams.get('date_start'), "%Y-%m-%d")
            date_stop =  datetime.strptime(getparams.get('date_stop'), "%Y-%m-%d")
            time_interval = int(str(date_stop - date_start).split()[0])
            content_item = {}
            data = {'success':True,'messages':{'date_start':date_start,'date_stop':date_stop,'content':[]}}
            objects_new = models.ObjectType.objects.filter(name=u"квартира в новостройке")
            revenue_new_full = 0
            revenue_second_full = 0
            salary_new_full = 0
            salary_second_full = 0
            salary_all_full = 0
            category = models.ObjectCategory.objects.get(pk=int(object_category))
            query_offer = models.Offer.objects.filter(order_sale__object_category = category)
            for user in User.objects.filter(is_active=True):
                if (not(u"_Агенты" in [group.name for group in user.groups.all()]) and not(u"_Руководители групп" in [group.name for group in user.groups.all()])):
                    continue
                content_item["agent"] = " ".join((user.last_name,user.first_name))
                # выручка наша
                content_item["revenue_new"] = 0
                content_item["revenue_second"] = 0
                try:
                    content_item["revenue_new"] += round(sum([(offer.order_sale.price*offer.order_sale.commission_price)/100 for offer in query_offer.filter(order_sale__performer=user,order_sale__commission=True,order_sale__commission_type=False).filter(order_sale__object_type__in=objects_new).filter(hystoryservice__date__range=(date_start,date_stop),hystoryservice__operation=operation_registr,hystoryservice__result_operation=operation_complet).distinct()]))
                    content_item["revenue_second"] += round(sum([(offer.order_sale.price*offer.order_sale.commission_price)/100 for offer in query_offer.filter(order_sale__performer=user,order_sale__commission=True,order_sale__commission_type=False).exclude(order_sale__object_type__in=objects_new).filter(hystoryservice__date__range=(date_start,date_stop),hystoryservice__operation=operation_registr,hystoryservice__result_operation=operation_complet).distinct()]))
                except Exception as inst:
                    pass
                try:
                    content_item["revenue_second"] += round(sum([(offer.order_sale.price*offer.order_buy.commission_price)/100 for offer in query_offer.filter(order_buy__performer=user,order_buy__commission=True,order_buy__commission_type=False).filter(order_sale__object_type__in=objects_new).filter(hystoryservice__date__range=(date_start,date_stop),hystoryservice__operation=operation_registr,hystoryservice__result_operation=operation_complet).distinct().select_related('order_sale__price').values('id','order_sale__price','order_sale__commission_price')]))
                    content_item["revenue_second"] += round(sum([(offer.order_sale.price*offer.order_buy.commission_price)/100 for offer in query_offer.filter(order_buy__performer=user,order_buy__commission=True,order_buy__commission_type=False).exclude(order_sale__object_type__in=objects_new).filter(hystoryservice__date__range=(date_start,date_stop),hystoryservice__operation=operation_registr,hystoryservice__result_operation=operation_complet).distinct().select_related('order_sale__price').values('id','order_sale__price','order_sale__commission_price')]))
                except Exception as inst:
                    pass
                # выручка другим агенствам
                try:
                    content_item["revenue_new"] -= round(sum([(offer.order_sale.price*offer.order_sale.agency_commission_price)/100 for offer in query_offer.filter(order_sale__performer=user,order_sale__agency_commission=True,order_sale__agency_commission_type=False).filter(order_sale__object_type__in=objects_new).filter(hystoryservice__date__range=(date_start,date_stop),hystoryservice__operation=operation_registr,hystoryservice__result_operation=operation_complet).distinct()]))
                    content_item["revenue_second"] -= round(sum([(offer.order_sale.price*offer.order_sale.agency_commission_price)/100 for offer in query_offer.filter(order_sale__performer=user,order_sale__agency_commission=True,order_sale__agency_commission_type=False).exclude(order_sale__object_type__in=objects_new).filter(hystoryservice__date__range=(date_start,date_stop),hystoryservice__operation=operation_registr,hystoryservice__result_operation=operation_complet).distinct()]))
                except Exception as inst:
                    pass
                try:
                    content_item["revenue_second"] -= round(sum([(offer.order_sale.price*offer.order_buy.agency_commission_price)/100 for offer in query_offer.filter(order_buy__performer=user,order_buy__agency_commission=True,order_buy__agency_commission_type=False).filter(order_sale__object_type__in=objects_new).filter(hystoryservice__date__range=(date_start,date_stop),hystoryservice__operation=operation_registr,hystoryservice__result_operation=operation_complet).distinct().select_related('order_sale__price').values('id','order_sale__price','order_sale__agency_commission_price')]))
                    content_item["revenue_second"] -= round(sum([(offer.order_sale.price*offer.order_buy.agency_commission_price)/100 for offer in query_offer.filter(order_buy__performer=user,order_buy__agency_commission=True,order_buy__agency_commission_type=False).exclude(order_sale__object_type__in=objects_new).filter(hystoryservice__date__range=(date_start,date_stop),hystoryservice__operation=operation_registr,hystoryservice__result_operation=operation_complet).distinct().select_related('order_sale__price').values('id','order_sale__price','order_sale__agency_commission_price')]))
                except Exception as inst:
                    # print inst.args
                    pass
                revenue_new_sale_fixed = query_offer.filter(order_sale__performer=user,order_sale__commission=True,order_sale__commission_type=True).filter(order_sale__object_type__in=objects_new).filter(hystoryservice__date__range=(date_start,date_stop),hystoryservice__operation=operation_registr,hystoryservice__result_operation=operation_complet).distinct().aggregate(Sum('order_sale__commission_price'))['order_sale__commission_price__sum']
                revenue_new_buy_fixed = query_offer.filter(order_buy__performer=user,order_buy__commission=True,order_buy__commission_type=True).filter(order_sale__object_type__in=objects_new).filter(hystoryservice__date__range=(date_start,date_stop),hystoryservice__operation=operation_registr,hystoryservice__result_operation=operation_complet).distinct().aggregate(Sum('order_buy__commission_price'))['order_buy__commission_price__sum']
                revenue_new_sale_agency_fixed = query_offer.filter(order_sale__performer=user,order_sale__agency_commission=True,order_sale__agency_commission_type=True).filter(order_sale__object_type__in=objects_new).filter(hystoryservice__date__range=(date_start,date_stop),hystoryservice__operation=operation_registr,hystoryservice__result_operation=operation_complet).distinct().aggregate(Sum('order_sale__agency_commission_price'))['order_sale__agency_commission_price__sum']
                revenue_new_buy_agency_fixed = query_offer.filter(order_buy__performer=user,order_buy__agency_commission=True,order_buy__agency_commission_type=True).filter(order_sale__object_type__in=objects_new).filter(hystoryservice__date__range=(date_start,date_stop),hystoryservice__operation=operation_registr,hystoryservice__result_operation=operation_complet).distinct().aggregate(Sum('order_buy__agency_commission_price'))['order_buy__agency_commission_price__sum']
                if revenue_new_sale_fixed :
                    content_item["revenue_new"] += round(revenue_new_sale_fixed)
                if revenue_new_buy_fixed :
                    content_item["revenue_second"] += round(revenue_new_buy_fixed)
                if revenue_new_sale_agency_fixed :
                    content_item["revenue_new"] -= round(revenue_new_sale_agency_fixed)
                if revenue_new_buy_agency_fixed :
                    content_item["revenue_second"] -= round(revenue_new_buy_agency_fixed)
                revenue_second_sale_fixed = query_offer.filter(order_sale__performer=user,order_sale__commission=True,order_sale__commission_type=True).exclude(order_sale__object_type__in=objects_new).filter(hystoryservice__date__range=(date_start,date_stop),hystoryservice__operation=operation_registr,hystoryservice__result_operation=operation_complet).distinct().aggregate(Sum('order_sale__commission_price'))['order_sale__commission_price__sum']
                revenue_second_buy_fixed = query_offer.filter(order_buy__performer=user,order_buy__commission=True,order_buy__commission_type=True).exclude(order_sale__object_type__in=objects_new).filter(hystoryservice__date__range=(date_start,date_stop),hystoryservice__operation=operation_registr,hystoryservice__result_operation=operation_complet).distinct().aggregate(Sum('order_buy__commission_price'))['order_buy__commission_price__sum']
                revenue_second_sale_agency_fixed = query_offer.filter(order_sale__performer=user,order_sale__agency_commission=True,order_sale__agency_commission_type=True).exclude(order_sale__object_type__in=objects_new).filter(hystoryservice__date__range=(date_start,date_stop),hystoryservice__operation=operation_registr,hystoryservice__result_operation=operation_complet).distinct().aggregate(Sum('order_sale__agency_commission_price'))['order_sale__agency_commission_price__sum']
                revenue_second_buy_agency_fixed = query_offer.filter(order_buy__performer=user,order_buy__agency_commission=True,order_buy__agency_commission_type=True).exclude(order_sale__object_type__in=objects_new).filter(hystoryservice__date__range=(date_start,date_stop),hystoryservice__operation=operation_registr,hystoryservice__result_operation=operation_complet).distinct().aggregate(Sum('order_buy__agency_commission_price'))['order_buy__agency_commission_price__sum']
                if revenue_second_sale_fixed :
                    content_item["revenue_second"] += round(revenue_second_sale_fixed)
                if revenue_second_buy_fixed :
                    content_item["revenue_second"] += round(revenue_second_buy_fixed)
                if revenue_second_sale_agency_fixed :
                    content_item["revenue_second"] -= round(revenue_second_sale_agency_fixed)
                if revenue_second_buy_agency_fixed :
                    content_item["revenue_second"] -= round(revenue_second_buy_agency_fixed)

                content_item["salary_new"] = 0
                content_item["salary_second"] = 0

                if category.name in (u"Жилая недвижимость",u"Загородная недвижимость"):
                    if content_item["revenue_second"]<40000:
                        if content_item["revenue_new"] <= 100000:
                            content_item["salary_new"] = round(content_item["revenue_new"] * 0.3)
                        else:
                            content_item["salary_new"] = round(content_item["revenue_new"] * 0.35)
                    else:
                        if content_item["revenue_new"] <= 60000:
                            content_item["salary_new"] = round(content_item["revenue_new"] * 0.3)
                        else:
                            content_item["salary_new"] = round(content_item["revenue_new"] * 0.35)

                    if content_item["revenue_second"] <= 85000:
                        content_item["salary_second"] = round(content_item["revenue_second"] * 0.4)
                    else:
                        content_item["salary_second"] = round(content_item["revenue_second"] * 0.5)
                if category.name in (u"Коммерческая недвижимость",u"Земля"):
                    content_item["salary_new"] = round(content_item["revenue_new"] * 0.4)
                    content_item["salary_second"] = round(content_item["revenue_second"] * 0.4)

                content_item["salary_all"] = round((content_item["salary_new"] + content_item["salary_second"]))

                revenue_new_full += content_item["revenue_new"]
                revenue_second_full += content_item["revenue_second"]
                salary_new_full += content_item["salary_new"]
                salary_second_full += content_item["salary_second"]
                salary_all_full += content_item["salary_all"]
                if content_item["salary_all"]:
                    data["messages"]["content"].append(content_item.copy())

            content_item["agent"] = u"Итого"
            content_item["revenue_new"] = revenue_new_full
            content_item["revenue_second"] = revenue_second_full
            content_item["salary_new"] = salary_new_full
            content_item["salary_second"] = salary_second_full
            content_item["salary_all"] = salary_all_full

            data["messages"]["content"].append(content_item.copy())

            response = JSONResponse(data)

    return response
