#!/usr/bin/env python
# -*- coding: utf-8 -*-

from django.utils.translation import ugettext_lazy as _
from django.core.urlresolvers import reverse

from admin_tools.dashboard import modules, Dashboard, AppIndexDashboard
from admin_tools.utils import get_admin_site_name


class CustomIndexDashboard(Dashboard):
    """
    Custom index dashboard for crmre.
    """
    def init_with_context(self, context):
        site_name = get_admin_site_name(context)
        
        # append an app list module for "Administration"
        self.children.append(modules.ModelList(
            title = u'Администрирование',
            models=('django.contrib.auth.*',
                    'crmreauth.models.User',
                    ),
        ))

        # append an app list module for "Models"
        self.children.append(modules.Group(
            title=u"Справочники",
            display="tabs",
            children=[
                modules.ModelList(
                    title=u'Задачи',
                    models=('crmreapp.models.Priority',
                            'crmreapp.models.TaskStatus',)
                ),
                modules.ModelList(
                    title=u'Клиенты',
                    models=('crmreapp.models.InfoSource',
                            'crmreapp.models.Occupation',
                            'crmreapp.models.Sphere',
                            'crmreapp.models.SmsMessages',
                            'crmreapp.models.EmailMessages',
                            'crmreapp.models.MessageType',)
                ),
                modules.ModelList(
                    title=u'Адрес',
                    models=('crmreapp.models.District',
                            'crmreapp.models.City',
                            'crmreapp.models.Microdistrict',
                            'crmreapp.models.Street',)
                ),
                modules.ModelList(
                    title=u'Помещение',
                    models=('crmreapp.models.MaterialWalls',
                            'crmreapp.models.Planishing',
                            'crmreapp.models.Condition',
                            'crmreapp.models.Refinishing',
                            'crmreapp.models.Heating',
                            'crmreapp.models.Balcony',
                            'crmreapp.models.LayoutRooms',
                            'crmreapp.models.Bathroom',
                            'crmreapp.models.Flooring',
                            'crmreapp.models.Windows',)
                ),
                modules.ModelList(
                    title=u'Земля',
                    models=('crmreapp.models.CategoryEarth',
                            'crmreapp.models.Road',
                            'crmreapp.models.GreenPlantings',
                            'crmreapp.models.Constructions',
                            'crmreapp.models.Fencing',)
                ),
                modules.ModelList(
                    title=u'Заявки',
                    models=('crmreapp.models.ObjectCategory',
                            'crmreapp.models.ObjectAccessory',
                            'crmreapp.models.OrderStatus',
                            'crmreapp.models.ContractType',
                            'crmreapp.models.NdsType',
                            'crmreapp.models.MethodPayment',
                            'crmreapp.models.OwnershipType',
                            'crmreapp.models.Encumbrance',
                            'crmreapp.models.Bank',
                            'crmreapp.models.Lease',
                            'crmreapp.models.ConstructionOrganization',
                            'crmreapp.models.TemplatesDoc',
                            'crmreapp.models.Regulations')
                ),
                modules.ModelList(
                    title=u'Предложения',
                    models=('crmreapp.models.DocumentTemplates',
                            'crmreapp.models.ResultSentence',
                            'crmreapp.models.ResultShow',
                            'crmreapp.models.OperationType',
                            'crmreapp.models.ResultOperation',)
                ),
                modules.ModelList(
                    title=u'Avito/Yandex',
                    models=('crmreapp.models.AvitoCategory',
                            'crmreapp.models.YandexCategory',
                            'crmreapp.models.AvitoType',
                            'crmreapp.models.AvitoCity',
                            'crmreapp.models.AvitoDistrict')
                ),
                modules.ModelList(
                    title=u'Планировщик задач',
                    models=('djcelery*',),
                ),
            ]
        ))
        # append a link list module for "quick links"
        self.children.append(modules.LinkList(
            _('Quick links'),
            layout='inline',
            draggable=False,
            deletable=False,
            collapsible=False,
            children=[
                [_('Return to site'), '/'],
                [_('Change password'),
                 reverse('%s:password_change' % site_name)],
                [_('Log out'), reverse('%s:logout' % site_name)],
            ]
        ))
        
        # append a recent actions module
        self.children.append(modules.RecentActions(_('Recent Actions'), 10))
        
class CustomAppIndexDashboard(AppIndexDashboard):
    """
    Custom app index dashboard for crmre.
    """

    # we disable title because its redundant with the model list module
    title = ''

    def __init__(self, *args, **kwargs):
        AppIndexDashboard.__init__(self, *args, **kwargs)

        # append a model list module and a recent actions module
        self.children += [
            modules.ModelList(self.app_title, self.models),
            modules.RecentActions(
                _('Recent Actions'),
                include_list=self.get_app_content_types(),
                limit=5
            )
        ]

    def init_with_context(self, context):
        """
        Use this method if you need to access the request context.
        """
        return super(CustomAppIndexDashboard, self).init_with_context(context)
