#!/usr/bin/env python
# -*- coding: utf-8 -*-
from crmreapp.views import rest,reports,main,menu
from crmre import settings
from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.auth.views import login, logout, password_change, password_change_done
from django.views.generic.base import RedirectView
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from django.core.urlresolvers import reverse_lazy

admin.autodiscover()

router = DefaultRouter(trailing_slash=False)
router.register(r'city', rest.CityViewSet)
router.register(r'street', rest.StreetViewSet)
router.register(r'priority', rest.PriorityViewSet)
router.register(r'task_status', rest.TaskStatusViewSet)
router.register(r'object_category', rest.ObjectCategoryViewSet)
router.register(r'object_type', rest.ObjectTypeViewSet)
router.register(r'info_source', rest.InfoSourceViewSet)
router.register(r'object_accessory', rest.ObjectAccessoryViewSet)
router.register(r'contract_type', rest.ContractTypeViewSet)
router.register(r'order_status', rest.OrderStatusViewSet)
router.register(r'nds_type', rest.NdsTypeViewSet)
router.register(r'method_payment', rest.MethodPaymentViewSet)
router.register(r'district', rest.DistrictViewSet)
router.register(r'microdistrict', rest.MicrodistrictViewSet)
router.register(r'material_walls', rest.MaterialWallsViewSet)
router.register(r'planishing', rest.PlanishingViewSet)
router.register(r'condition', rest.ConditionViewSet)
router.register(r'refinishing', rest.RefinishingViewSet)
router.register(r'heating', rest.HeatingViewSet)
router.register(r'balcony', rest.BalconyViewSet)
router.register(r'layout_rooms', rest.LayoutRoomsViewSet)
router.register(r'bathroom', rest.BathroomViewSet)
router.register(r'flooring', rest.FlooringViewSet)
router.register(r'windows', rest.WindowsViewSet)
router.register(r'category_earth', rest.CategoryEarthViewSet)
router.register(r'road', rest.RoadViewSet)
router.register(r'green_plantings', rest.GreenPlantingsViewSet)
router.register(r'constructions', rest.ConstructionsViewSet)
router.register(r'fencing', rest.FencingViewSet)
router.register(r'ownership_type', rest.OwnershipTypeViewSet)
router.register(r'result_sentence', rest.ResultSentenceViewSet)
router.register(r'result_show', rest.ResultShowViewSet)
router.register(r'operation_type', rest.OperationTypeViewSet)
router.register(r'occupation', rest.OccupationViewSet)
router.register(r'sphere', rest.SphereViewSet)
router.register(r'encumbrance', rest.EncumbranceViewSet)
router.register(r'bank', rest.BankViewSet)
router.register(r'lease', rest.LeaseViewSet)
router.register(r'result_operation', rest.ResultOperationViewSet)
router.register(r'construction_organization', rest.ConstructionOrganizationViewSet)
router.register(r'message_type', rest.MessageTypeViewSet)

router.register(r'users', rest.UsersViewSet)
router.register(r'groups', rest.GroupsViewSet)
router.register(r'tasks', rest.TasksViewSet)
router.register(r'task_history', rest.TaskHistoryViewSet)
router.register(r'task_comments', rest.TaskCommentsViewSet)
router.register(r'clients', rest.ClientsViewSet)
router.register(r'client_comments', rest.ClientCommentsViewSet)
router.register(r'orders_sale', rest.OrdersSaleViewSet)
router.register(r'photos', rest.PhotosViewSet)
router.register(r'buildings', rest.BuildingsViewSet)
router.register(r'plan', rest.PlanViewSet)
router.register(r'plan_photos', rest.PlanPhotosViewSet)
router.register(r'building_photos', rest.BuildingPhotosViewSet)
router.register(r'orders_buy', rest.OrdersBuyViewSet)
router.register(r'offer', rest.OfferViewSet)
router.register(r'hystory_offer', rest.HystoryOfferViewSet)
router.register(r'hystory_show', rest.HystoryShowViewSet)
router.register(r'hystory_service', rest.HystoryServiceViewSet)
router.register(r'list_object_type', rest.ListObjectTypeViewSet)
router.register(r'list_district', rest.ListDistrictViewSet)
router.register(r'list_city', rest.ListCityViewSet)
router.register(r'list_microdistrict', rest.ListMicrodistrictViewSet)
router.register(r'list_street', rest.ListStreetViewSet)
router.register(r'list_rooms', rest.ListRoomsViewSet)
router.register(r'notifications', rest.NotificationsViewSet)
router.register(r'sms_messages', rest.SmsMessagesViewSet)
router.register(r'email_messages', rest.EmailMessagesViewSet)
router.register(r'templatesdoc', rest.TemplatesDocViewSet)
router.register(r'documents', rest.DocumentsViewSet)
router.register(r'regulations', rest.RegulationsViewSet)

urlpatterns = [
    url(r'^admin_tools/', include('admin_tools.urls')),
    url('^', include('django.contrib.auth.urls')),
    url(r'^accounts/login/$',  login,  {'template_name': 'login.html'}),
    url(r'^accounts/logout/$', logout, {'template_name': 'logged_out.html'}),
    url(r'^accounts/change_password/$', password_change, {'template_name': 'password_change_form.html'}),
    url(r'^accounts/password_changed/$', password_change_done, {'template_name': 'password_change_done.html'}),
    url('^$', main.mainpage, name='mainpage'),
    url('^pdf/$', main.generate_pdf),
    url(r'^admin/',include(admin.site.urls)),
    url(r'^tinymce/', include('tinymce.urls')),
    url(r'^robots\.txt$', TemplateView.as_view(template_name='robots.txt', content_type='text/plain')),
    url(r'^menutree/src', menu.menutree),
    url(r'^photo_upload/$', main.photo_upload),
    url(r'^plan_photo_upload/$', main.plan_photo_upload),
    url(r'^building_photo_upload/$', main.building_photo_upload),
    url(r'^offer_new/$', main.offer_news),
    url(r'^notifications_news/$', main.notifications_news),
    url(r'^count_orders/$', main.count_orders),
    url(r'^credit_manager/$', main.credit_manager),
    url(r'^manager/$', main.manager),
    url(r'^send_offer/$', main.send_offer),
    url(r'^open_offer/$', main.open_offer),
    url(r'^reports/$', reports.reports),
    url(r'^uploading/$', main.uploading),
    url(r'^uploading_orders/$', main.uploading_orders),
    url(r'^uploading_templatesdoc/$', main.uploading_templatesdoc),
    url(r'^documents_upload/$', main.documents_upload),
    url(r'^send_messages/$', main.send_messages),
    url(r'^send_notification/$', main.send_notification),
    url(r'^uploading_avito/$', main.upload_avito),
    url(r'^uploading_yandex/$', main.upload_yandex),
    url(r'^uploading_portal/$', main.upload_portal),
    url(r'^request_portal/$', main.request_portal),
    url(r'^test_portal/$', main.test_portal),
    #url(r'^svg_to_png/$', main.svg_to_png),
    url(r'^favicon\.ico$', RedirectView.as_view(url='/media/favicon.ico',permanent=False)),
]

urlpatterns += [
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    url(r'^', include(router.urls)),
]