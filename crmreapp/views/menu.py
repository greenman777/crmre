#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json
from crmre.utils import JSONResponse
from crmreapp import models

def children(name="",iconcls=""):
    children = {"text":name,"leaf":False,"expanded":False,"children":[],"iconCls":iconcls}
    return children

def children_last(name,app="",filterapp="",title="",typeapp=""):
    children = {"text":name,"app":app,"filterapp":filterapp,"title":title,"typeapp":typeapp,"leaf":True,"expanded":True,"children":None}
    return children

def menutree(request):

    user_id = request.user.id
    user_groups_id = request.user.groups.values_list('id',flat=True)
    user_admin = request.user.is_superuser
    node_id = 0
    rootchildren = []
    """
    Дерево задач
    """
    rootchildren.append(children(name=u"Задачи",iconcls='icon-tasks'))
    rootchildren[node_id]["children"].append(children_last(name=u"Выполнить",app="appTasks",filterapp='{performer_id: '+str(user_id)+'}',
                                                           title=u'Выполнить',typeapp='tasks_make'))
    rootchildren[node_id]["children"].append(children_last(name=u"Проверить",app="appTasks",filterapp='{author_id: '+str(user_id)+'}',
                                                           title=u'Проверить',typeapp='tasks_check'))
    if request.user.has_perm('crmreapp.view_all_task'):
        rootchildren[node_id]["children"].append(children_last(name=u"Все",app="appTasks",filterapp='{}',
                                                               title=u'Все задачи',typeapp='tasks_all'))
    node_id += 1

    rootchildren.append(children(name=u"Клиенты",iconcls='icon-clients'))
    rootchildren[node_id]["children"].append(children_last(name=u"Мои клиенты активные",app="appClients",filterapp='{is_client:1,performer_id: '+str(user_id)+'}',
                                                                                     title=u'Мои клиенты активные',typeapp='clients_view_my'))
    rootchildren[node_id]["children"].append(children_last(name=u"Мои клиенты в резерве",app="appClients",filterapp='{is_client:0,performer_id: '+str(user_id)+'}',
                                                                                     title=u'Мои клиенты в резерве',typeapp='partners_view_my'))
    rootchildren[node_id]["children"].append(children_last(name=u"Клиенты активные",app="appClients",filterapp='{is_client:1}',
                                                                                     title=u'Клиенты активные',typeapp='clients_view'))
    rootchildren[node_id]["children"].append(children_last(name=u"Клиенты в резерве",app="appClients",filterapp='{is_client:0}',
                                                                                     title=u'Клиенты в резерве',typeapp='partners_view'))
    node_id += 1

    rootchildren.append(children(name=u"Заявки на покупку",iconcls='icon-orders-buy'))
    nodechild_id = 0
    status_free_id = json.dumps([models.OrderStatus.objects.get(name=u'свободная').id])
    status_my_id = json.dumps([models.OrderStatus.objects.get(name=u'активная').id,
                                models.OrderStatus.objects.get(name=u'выход на сделку').id])
    status_completed_id = json.dumps([models.OrderStatus.objects.get(name=u'сделка завершена').id])
    status_all_id = json.dumps([models.OrderStatus.objects.get(name=u'активная').id,
                                models.OrderStatus.objects.get(name=u'выход на сделку').id])
    status_archive_id = json.dumps([models.OrderStatus.objects.get(name=u'архив').id])
    for obj in models.ObjectCategory.objects.all():
        if (obj.group_id in user_groups_id) or user_admin:
            obj_id = str(obj.id)
            rootchildren[node_id]["children"].append(children(name=obj.name))
            if request.user.has_perm('crmreapp.view_all_orders-buy'):
                rootchildren[node_id]["children"][nodechild_id]["children"].append(children_last(
                    name=u'Все в работе',app="appOrdersBuy",filterapp='{object_category: '+obj_id+',status: '+status_all_id+'}',
                    title=" - ".join([u'Покупка',obj.name,u'все в работе']),typeapp="_".join(['orders_buy',obj_id,'all'])))
            if request.user.has_perm('crmreapp.view_free_orders-buy'):
                rootchildren[node_id]["children"][nodechild_id]["children"].append(children_last(
                        name=u'Свободные',app="appOrdersBuy",filterapp='{object_category: '+obj_id+',status: '+status_free_id+'}',
                        title=" - ".join([u'Покупка',obj.name,u'свободные']),typeapp="_".join(['orders_buy',obj_id,'free'])))
            if request.user.has_perm('crmreapp.view_my_orders-buy'):
                rootchildren[node_id]["children"][nodechild_id]["children"].append(children_last(
                        name=u'Мои в работе',app="appOrdersBuy",filterapp='{object_category: '+obj_id+',performer: '+str(user_id)+',status: '+status_my_id+'}',
                        title=" - ".join([u'Покупка',obj.name,u'мои в работе']),typeapp="_".join(['orders_buy',obj_id,'my'])))
                rootchildren[node_id]["children"][nodechild_id]["children"].append(children_last(
                        name=u'Мои завершенные',app="appOrdersBuy",filterapp='{object_category: '+obj_id+',performer: '+str(user_id)+',status: '+status_completed_id+'}',
                        title=" - ".join([u'Покупка',obj.name,u'завершенные']),typeapp="_".join(['orders_buy',obj_id,'completed'])))
            if request.user.has_perm('crmreapp.credit_manager'):
                rootchildren[node_id]["children"][nodechild_id]["children"].append(children_last(
                        name=u'Кредитные',app="appOrdersBuy",filterapp='{object_category: '+obj_id+',mortgage: true'+',status: '+status_all_id+'}',
                        title=" - ".join([u'Покупка',obj.name,u'кредитные']),typeapp="_".join(['orders_buy',obj_id,'credit'])))
            if request.user.has_perm('crmreapp.brigadier'):
                rootchildren[node_id]["children"][nodechild_id]["children"].append(children_last(
                        name=u'Заявки моей группы',app="appOrdersBuy",filterapp='{object_category: '+obj_id+',brigade: '+str(request.user.brigade)+',status: '+status_my_id+'}',
                        title=" - ".join([u'Покупка',obj.name,u'заявки моей группы']),typeapp="_".join(['orders_buy',obj_id,'brigadier'])))
            if request.user.has_perm('crmreapp.show_support'):
                rootchildren[node_id]["children"][nodechild_id]["children"].append(children_last(
                        name=u'Сопровождение',app="appOrdersBuy",filterapp='{object_category: '+obj_id+',show_support: true'+',status: '+status_all_id+'}',
                        title=" - ".join([u'Покупка',obj.name,u'сопровождение']),typeapp="_".join(['orders_buy',obj_id,'support'])))
            if request.user.has_perm('crmreapp.view_all_orders-buy'):
                rootchildren[node_id]["children"][nodechild_id]["children"].append(children_last(
                    name=u'Архивные',app="appOrdersBuy",filterapp='{object_category: '+obj_id+',status: '+status_archive_id+'}',
                    title=" - ".join([u'Покупка',obj.name,u'архивные']),typeapp="_".join(['orders_buy',obj_id,'archive'])))
            nodechild_id += 1
    node_id += 1

    rootchildren.append(children(name=u"Заявки на продажу",iconcls='icon-orders-sale'))
    nodechild_id = 0

    for obj in models.ObjectCategory.objects.all():
        if (obj.group_id in user_groups_id) or user_admin:
            obj_id = str(obj.id)
            rootchildren[node_id]["children"].append(children(name=obj.name))
            if request.user.has_perm('crmreapp.view_all_orders-sale'):
                rootchildren[node_id]["children"][nodechild_id]["children"].append(children_last(
                    name=u'Все в работе',app="appOrdersSale",filterapp='{object_category: '+obj_id+',status: '+status_all_id+'}',
                    title=" - ".join([u'Продажа',obj.name,u'все в работе']),typeapp="_".join(['orders_sale',obj_id,'all'])))
            if request.user.has_perm('crmreapp.view_free_orders-sale'):
                rootchildren[node_id]["children"][nodechild_id]["children"].append(children_last(
                        name=u'Свободные',app="appOrdersSale",filterapp='{object_category: '+obj_id+',status: '+status_free_id+'}',
                        title=" - ".join([u'Продажа',obj.name,u'свободные']),typeapp="_".join(['orders_sale',obj_id,'free'])))
            if request.user.has_perm('crmreapp.view_my_orders-sale'):
                rootchildren[node_id]["children"][nodechild_id]["children"].append(children_last(
                        name=u'Мои в работе',app="appOrdersSale",filterapp='{object_category: '+obj_id+',performer: '+str(user_id)+',status: '+status_my_id+'}',
                        title=" - ".join([u'Продажа',obj.name,u'мои в работе']),typeapp="_".join(['orders_sale',obj_id,'my'])))
                rootchildren[node_id]["children"][nodechild_id]["children"].append(children_last(
                        name=u'Мои завершенные',app="appOrdersSale",filterapp='{object_category: '+obj_id+',performer: '+str(user_id)+',status: '+status_completed_id+'}',
                        title=" - ".join([u'Продажа',obj.name,u'завершенные']),typeapp="_".join(['orders_sale',obj_id,'completed'])))
            if request.user.has_perm('crmreapp.brigadier'):
                rootchildren[node_id]["children"][nodechild_id]["children"].append(children_last(
                        name=u'Заявки моей группы',app="appOrdersSale",filterapp='{object_category: '+obj_id+',brigade: '+str(request.user.brigade)+',status: '+status_my_id+'}',
                        title=" - ".join([u'Продажа',obj.name,u'заявки моей группы']),typeapp="_".join(['orders_sale',obj_id,'brigadier'])))
            if request.user.has_perm('crmreapp.show_support'):
                rootchildren[node_id]["children"][nodechild_id]["children"].append(children_last(
                        name=u'Сопровождение',app="appOrdersSale",filterapp='{object_category: '+obj_id+',show_support: true'+',status: '+status_all_id+'}',
                        title=" - ".join([u'Продажа',obj.name,u'сопровождение']),typeapp="_".join(['orders_sale',obj_id,'support'])))
            if request.user.has_perm('crmreapp.view_all_orders-sale'):
                rootchildren[node_id]["children"][nodechild_id]["children"].append(children_last(
                    name=u'Архивные',app="appOrdersSale",filterapp='{object_category: '+obj_id+',status: '+status_archive_id+'}',
                    title=" - ".join([u'Продажа',obj.name,u'архивные']),typeapp="_".join(['orders_sale',obj_id,'archive'])))
            nodechild_id += 1
    node_id += 1

    if request.user.has_perm('crmreapp.change_smsmessages') and request.user.has_perm('crmreapp.change_emailmessages'):
        rootchildren.append(children(name=u"Рассылки",iconcls='icon-send_messages'))

        rootchildren[node_id]["children"].append(children_last(name=u"SMS рассылки",app="appSmsMessages",
                                                                                         filterapp='{}',title=u'SMS сообщения',typeapp='sms_messages'))
        rootchildren[node_id]["children"].append(children_last(name=u"E-mail рассылки",app="appEmailMessages",
                                                                                         filterapp='{}',title=u'E-mail сообщения',typeapp='email_messages'))
        node_id += 1

    rootchildren.append(children(name=u"Отчеты",iconcls='icon-reports'))
    rootchildren[node_id]["children"].append(children_last(name=u"Статистика базы недвижимости",app="appInfoShow",
                                                                                         filterapp='{}',title=u'Статистика',typeapp='info_all_show'))
    rootchildren[node_id]["children"].append(children_last(name=u"По типам объектов",app="appReportObjectType",
                                                                                         filterapp='{}',title=u'Отчет по типам объектов',typeapp='report_object_type'))
    rootchildren[node_id]["children"].append(children_last(name=u"Динамика клиентской базы",app="appReportClients",
                                                                                     filterapp='{}',title=u'Динамика клиентской базы',typeapp='report_clients'))
    if request.user.has_perm('crmreapp.reports_all_view'):

        rootchildren[node_id]["children"].append(children_last(name=u"Отчет по KPI",app="appReportKPI",
                                                                                         filterapp='{}',title=u'Отчет по KPI',typeapp='report_kpi'))
        rootchildren[node_id]["children"].append(children_last(name=u"Воронка продаж",app="appReportSalesFunnel",
                                                                                         filterapp='{}',title=u'Воронка продаж',typeapp='report_sales_funnel'))

        rootchildren[node_id]["children"].append(children_last(name=u"Динамика компании",app="appReportDynamics",
                                                                                         filterapp='{}',title=u'Динамика компании',typeapp='report_dynamics'))
        rootchildren[node_id]["children"].append(children_last(name=u"Совершенные сделки",app="appReportCompleted",
                                                                                         filterapp='{}',title=u'Совершенные сделки',typeapp='report_completed'))
        rootchildren[node_id]["children"].append(children_last(name=u"Ведомость по ЗП",app="appReportPayroll",
                                                                                         filterapp='{}',title=u'Ведомость по ЗП',typeapp='report_payroll'))
    serializer = {"children":rootchildren}
    response = JSONResponse(serializer)
    return response
