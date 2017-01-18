#!/usr/bin/env python
# -*- coding: utf-8 -*-

from django.contrib.auth.models import Group
from crmreauth.models import User
from django.db.models import Q,F
from crmreapp import models
from rest_framework import viewsets, status
from crmreapp import serializers
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.pagination import PageNumberPagination
import json
from datetime import datetime,timedelta

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 50

class PriorityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Priority.objects.all()
    serializer_class = serializers.PrioritySerializer


class CityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.City.objects.all()
    serializer_class = serializers.CitySerializer


class ObjectCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.ObjectCategory.objects.all()
    serializer_class = serializers.ObjectCategorySerializer


class ObjectTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.ObjectType.objects.all()
    serializer_class = serializers.ObjectTypeSerializer

    def list(self, request):
        getparams = self.request.GET.copy()
        object_category = getparams.get('object_category')
        if object_category is not None:
            queryset = self.queryset.filter(object_category=object_category)
        else:
            queryset = self.queryset.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class InfoSourceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.InfoSource.objects.all()
    serializer_class = serializers.InfoSourceSerializer


class ObjectAccessoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.ObjectAccessory.objects.all()
    serializer_class = serializers.ObjectAccessorySerializer


class ContractTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.ContractType.objects.all()
    serializer_class = serializers.ContractTypeSerializer


class OrderStatusViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.OrderStatus.objects.all()
    serializer_class = serializers.OrderStatusSerializer


class NdsTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.NdsType.objects.all()
    serializer_class = serializers.NdsTypeSerializer


class MethodPaymentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.MethodPayment.objects.all()
    serializer_class = serializers.MethodPaymentSerializer


class DistrictViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.District.objects.all()
    serializer_class = serializers.DistrictSerializer


class DistrictDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.District.objects.all()
    serializer_class = serializers.DistrictSerializer


class MicrodistrictViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Microdistrict.objects.all()
    serializer_class = serializers.MicrodistrictSerializer


class MicrodistrictDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Microdistrict.objects.all()
    serializer_class = serializers.MicrodistrictSerializer


class MaterialWallsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.MaterialWalls.objects.all()
    serializer_class = serializers.MaterialWallsSerializer


class PlanishingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Planishing.objects.all()
    serializer_class = serializers.PlanishingSerializer


class ConditionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Condition.objects.all()
    serializer_class = serializers.ConditionSerializer


class RefinishingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Refinishing.objects.all()
    serializer_class = serializers.RefinishingSerializer


class HeatingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Heating.objects.all()
    serializer_class = serializers.HeatingSerializer


class BalconyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Balcony.objects.all()
    serializer_class = serializers.BalconySerializer


class LayoutRoomsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.LayoutRooms.objects.all()
    serializer_class = serializers.LayoutRoomsSerializer


class BathroomViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Bathroom.objects.all()
    serializer_class = serializers.BathroomSerializer


class FlooringViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Flooring.objects.all()
    serializer_class = serializers.FlooringSerializer


class WindowsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Windows.objects.all()
    serializer_class = serializers.WindowsSerializer


class CategoryEarthViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.CategoryEarth.objects.all()
    serializer_class = serializers.CategoryEarthSerializer


class RoadViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Road.objects.all()
    serializer_class = serializers.RoadSerializer


class GreenPlantingsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.GreenPlantings.objects.all()
    serializer_class = serializers.GreenPlantingsSerializer


class ConstructionsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Constructions.objects.all()
    serializer_class = serializers.ConstructionsSerializer


class FencingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Fencing.objects.all()
    serializer_class = serializers.FencingSerializer


class OwnershipTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.OwnershipType.objects.all()
    serializer_class = serializers.OwnershipTypeSerializer


class ResultSentenceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.ResultSentence.objects.all()
    serializer_class = serializers.ResultSentenceSerializer


class ResultShowViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.ResultShow.objects.all()
    serializer_class = serializers.ResultShowSerializer


class OperationTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.OperationType.objects.all()
    serializer_class = serializers.OperationTypeSerializer


class StreetViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Street.objects.all()
    serializer_class = serializers.StreetSerializer


class StreetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Street.objects.all()
    serializer_class = serializers.StreetSerializer


class TaskStatusViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.TaskStatus.objects.all()
    serializer_class = serializers.TaskStatusSerializer


class OccupationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Occupation.objects.all()
    serializer_class = serializers.OccupationSerializer


class SphereViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Sphere.objects.all()
    serializer_class = serializers.SphereSerializer


class EncumbranceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Encumbrance.objects.all()
    serializer_class = serializers.EncumbranceSerializer


class BankViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Bank.objects.all()
    serializer_class = serializers.BankSerializer


class LeaseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Lease.objects.all()
    serializer_class = serializers.LeaseSerializer


class ResultOperationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.ResultOperation.objects.all()
    serializer_class = serializers.ResultOperationSerializer


class ConstructionOrganization(viewsets.ReadOnlyModelViewSet):
    queryset = models.ConstructionOrganization.objects.all()
    serializer_class = serializers.ConstructionOrganizationSerializer


class MessageTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.MessageType.objects.all()
    serializer_class = serializers.MessageTypeSerializer


class UsersViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer

    def list(self, request):
        queryset = self.queryset.filter(is_active=True)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class GroupsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Group.objects.all()
    serializer_class = serializers.GroupSerializer


class ConstructionOrganizationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.ConstructionOrganization.objects.all()
    serializer_class = serializers.ConstructionOrganizationSerializer


class TasksViewSet(viewsets.ModelViewSet):
    queryset = models.Tasks.objects.all()
    serializer_class = serializers.TasksSerializer

    def list(self, request):
        getparams = self.request.GET.copy()
        author_id = getparams.get('author_id')
        performer_id = getparams.get('performer_id')
        filters = Q()
        if author_id is not None:
            filters = filters | Q(author=author_id)
        if performer_id is not None:
            filters = filters | Q(performer=performer_id)
        queryset = self.queryset.filter(filters)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class TaskHistoryViewSet(viewsets.ModelViewSet):
    queryset = models.TaskHistory.objects.all()
    serializer_class = serializers.TaskHistorySerializer

    def list(self, request):
        getparams = self.request.GET.copy()
        task = getparams.get('task')
        if task is not None:
            queryset = self.queryset.filter(task=task)
        else:
            queryset = self.queryset.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

class TaskCommentsViewSet(viewsets.ModelViewSet):
    queryset = models.TaskComments.objects.all()
    serializer_class = serializers.TaskCommentsSerializer

    def list(self, request):
        getparams = self.request.GET.copy()
        task = getparams.get('task')
        if task is not None:
            queryset = self.queryset.filter(task=task)
        else:
            queryset = self.queryset.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)



class ResultsJSONRenderer(JSONRenderer):

    def render(self, data, accepted_media_type=None, renderer_context=None):
        data = {'results': data}
        return super(ResultsJSONRenderer, self).render(data, accepted_media_type, renderer_context)

class ClientsViewSet(viewsets.ModelViewSet):
    queryset = models.Clients.objects.all()
    serializer_class = serializers.ClientsSerializer
    pagination_class = StandardResultsSetPagination

    def get_filter(self, request):
        getparams = request.GET.copy()
        is_client = getparams.get('is_client')
        filters = getparams.get('filter')
        performer_id = getparams.get('performer_id')
        phone_represent = getparams.get('phone_represent')
        client_exclude_id = getparams.get('client_exclude_id')
        client_id = getparams.get('client_id')
        clients_filter = Q()

        if filters is not None:
            filters = json.loads(filters)
            for filter in filters:
                if filter['property'] == 'client_type':
                    clients_filter = clients_filter & Q(client_type=filter['value'])
                if filter['property'] == 'index':
                    clients_filter = clients_filter & Q(index__contains=filter['value'])
                if filter['property'] == 'represent':
                    clients_filter = clients_filter & Q(represent__contains=filter['value'])
                if filter['property'] == 'phone_represent':
                    clients_filter = clients_filter & Q(phone_represent__contains=filter['value'])
                if filter['property'] == 'client_name':
                    clients_filter = clients_filter & Q(client_name__contains=filter['value'])
                if filter['property'] == 'phone_main':
                    clients_filter = clients_filter & Q(phone_main__contains=filter['value'])
                if filter['property'] == 'author':
                    clients_filter = clients_filter & Q(author=filter['value'])
                if filter['property'] == 'info_source':
                    clients_filter = clients_filter & Q(info_source=filter['value'])
                if filter['property'] == 'vip':
                    if filter['value']:
                        clients_filter = clients_filter & Q(vip=True)

        if is_client is not None:
            is_client = json.loads(is_client)
            clients_filter = clients_filter & Q(is_client=is_client)
        if performer_id is not None:
            status_complet = models.OrderStatus.objects.get(name=u"сделка завершена")
            status_activ = models.OrderStatus.objects.get(name=u"активная")
            status_locked = models.OrderStatus.objects.get(name=u"выход на сделку")
            status_works_all = (status_activ, status_locked, status_complet)
            clients_filter = clients_filter & (
            Q(orderssale__performer=performer_id, orderssale__status__in=status_works_all) | Q(
                ordersbuy__performer=performer_id, ordersbuy__status__in=status_works_all) | Q(author=performer_id))
        if phone_represent is not None:
            clients_filter = clients_filter & Q(phone_represent=phone_represent)
        if client_id is not None:
            clients_filter = clients_filter & Q(id=client_id)

        return clients_filter,client_exclude_id

    def list(self, request):

        queryset = self.get_queryset()
        clients_filter,client_exclude_id = self.get_filter(request)
        queryset = queryset.filter(clients_filter).exclude(id=client_exclude_id).distinct()

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        page_size = self.paginator.page_size

        clients_filter, client_exclude_id = self.get_filter(request)
        queryset = self.queryset.filter(clients_filter).exclude(id=client_exclude_id).distinct()
        page_number = (list(queryset.values_list('id', flat=True)).index(serializer.data['id']))/page_size+1
        return Response({'results': serializer.data, 'page': page_number}, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({'results': serializer.data})


class ClientCommentsViewSet(viewsets.ModelViewSet):
    queryset = models.ClientComments.objects.all()
    serializer_class = serializers.ClientCommentsSerializer

    def list(self, request):
        getparams = self.request.GET.copy()
        client = getparams.get('client')
        if client is not None:
            queryset = self.queryset.filter(client=client)
        else:
            queryset = self.queryset.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class BuildingsViewSet(viewsets.ModelViewSet):
    queryset = models.Buildings.objects.all()
    serializer_class = serializers.BuildingsSerializer


class PlanViewSet(viewsets.ModelViewSet):
    queryset = models.Plan.objects.all()
    serializer_class = serializers.PlanSerializer

    def list(self, request):
        getparams = self.request.GET.copy()
        building = getparams.get('building')
        if building is not None:
            queryset = self.queryset.filter(building=building)
        else:
            queryset = self.queryset.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class BuildingPhotosViewSet(viewsets.ModelViewSet):
    queryset = models.BuildingPhotos.objects.all()
    serializer_class = serializers.BuildingPhotosSerializer

    def list(self, request):
        getparams = self.request.GET.copy()
        building = getparams.get('building')
        if building is not None:
            queryset = self.queryset.filter(building=building)
        else:
            queryset = []
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class PlanPhotosViewSet(viewsets.ModelViewSet):
    queryset = models.PlanPhotos.objects.all()
    serializer_class = serializers.PlanPhotosSerializer

    def list(self, request):
        getparams = self.request.GET.copy()
        plan = getparams.get('plan')
        if plan is not None:
            queryset = self.queryset.filter(plan=plan)
        else:
            queryset = []
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class OrdersSaleViewSet(viewsets.ModelViewSet):
    queryset = models.OrdersSale.objects.all()
    serializer_class = serializers.OrdersSaleSerializer
    pagination_class = StandardResultsSetPagination

    def get_filter(self, request):

        getparams = self.request.GET.copy()
        id = getparams.get('id')
        object_category = getparams.get('object_category')
        brigade = getparams.get('brigade')
        performer = getparams.get('performer')
        status = getparams.getlist('status')
        client = getparams.get('client')
        show_support = getparams.get('show_support')
        filters = getparams.get('filter')
        order_sale_filter = Q()

        if id is not None:
            order_sale_filter = order_sale_filter & Q(id=id)
        if object_category is not None:
            order_sale_filter = order_sale_filter & Q(object_category=object_category)
        if brigade is not None:
            order_sale_filter = order_sale_filter & Q(performer__brigade=brigade)
        if performer is not None:
            order_sale_filter = order_sale_filter & Q(performer=performer)
        if len(status) != 0:
            order_sale_filter = order_sale_filter & Q(status__in=status)
        if client is not None:
            order_sale_filter = order_sale_filter & Q(client=client)
        if show_support is not None:
            order_sale_filter = order_sale_filter & Q(show_support=show_support)

        if filters is not None:
            filters = json.loads(filters)
            for filter in filters:
                if filter['property'] == 'index':
                    order_sale_filter = order_sale_filter & Q(index__contains=filter['value'])
                if filter['property'] == 'object_category':
                    order_sale_filter = order_sale_filter & Q(object_category=filter['value'])
                if filter['property'] == 'object_type':
                    order_sale_filter = order_sale_filter & Q(object_type=filter['value'])
                if filter['property'] == 'contract_type':
                    order_sale_filter = order_sale_filter & Q(contract_type=filter['value'])
                if filter['property'] == 'transaction_type':
                    order_sale_filter = order_sale_filter & Q(transaction_type=filter['value'])
                if filter['property'] == 'district':
                    order_sale_filter = order_sale_filter & Q(district=filter['value'])
                if filter['property'] == 'city':
                    order_sale_filter = order_sale_filter & Q(city=filter['value'])
                if filter['property'] == 'microdistrict':
                    order_sale_filter = order_sale_filter & Q(microdistrict=filter['value'])
                if filter['property'] == 'street':
                    order_sale_filter = order_sale_filter & Q(street=filter['value'])
                if filter['property'] == 'house_number':
                    order_sale_filter = order_sale_filter & Q(house_number__contains=filter['value'])
                if filter['property'] == 'number_rooms':
                    order_sale_filter = order_sale_filter & Q(number_rooms=filter['value'])
                if filter['property'] == 'planishing':
                    order_sale_filter = order_sale_filter & Q(planishing=filter['value'])
                if filter['property'] == 'bathroom':
                    order_sale_filter = order_sale_filter & Q(bathroom=filter['value'])
                if filter['property'] == 'material_walls':
                    order_sale_filter = order_sale_filter & Q(material_walls=filter['value'])
                if filter['property'] == 'condition':
                    order_sale_filter = order_sale_filter & Q(condition=filter['value'])
                if filter['property'] == 'status':
                    order_sale_filter = order_sale_filter & Q(status=filter['value'])
                if filter['property'] == 'performer':
                    order_sale_filter = order_sale_filter & Q(performer=filter['value'])
                if filter['property'] == 'author':
                    order_sale_filter = order_sale_filter & Q(author=filter['value'])
                if filter['property'] == 'contract_old':
                    if filter['value']:
                        delta = timedelta(days=90)
                        now_date = datetime.now() - delta
                        order_sale_filter = order_sale_filter & Q(contract_date__lte=now_date)
                if filter['property'] == 'days_mod':
                    delta = timedelta(days=int(filter['value']))
                    now_date = datetime.now() - delta
                    order_sale_filter = order_sale_filter & Q(modification_date__lte=now_date)
                if filter['property'] == 'floor_no_first':
                    if filter['value']:
                        order_sale_filter = order_sale_filter & Q(floor__gt=1)
                if filter['property'] == 'floor_no_last':
                    if filter['value']:
                        order_sale_filter = order_sale_filter & Q(floor__lt=F('floors'))
                if filter['property'] == 'client_index':
                    order_sale_filter = order_sale_filter & Q(client__index__contains=filter['value'])
                if filter['property'] == 'client_name':
                    order_sale_filter = order_sale_filter & Q(client__client_name__contains=filter['value'])
                if filter['property'] == 'phone_main':
                    order_sale_filter = order_sale_filter & Q(client__phone_main__contains=filter['value'])
                if filter['property'] == 'represent':
                    order_sale_filter = order_sale_filter & Q(client__represent__contains=filter['value'])
                if filter['property'] == 'phone_represent':
                    order_sale_filter = order_sale_filter & Q(client__phone_represent__contains=filter['value'])
                if filter['property'] == 'info_source':
                    order_sale_filter = order_sale_filter & Q(client__info_source=filter['value'])
                if filter['property'] == 'vip':
                    if filter['value']:
                        order_sale_filter = order_sale_filter & Q(client__vip=True)
                if filter['property'] == 'price_from':
                    order_sale_filter = order_sale_filter & Q(price__gte=filter['value'])
                if filter['property'] == 'price_to':
                    order_sale_filter = order_sale_filter & Q(price__lte=filter['value'])
                if filter['property'] == 'space_from':
                    order_sale_filter = order_sale_filter & Q(total_space__gte=filter['value'])
                if filter['property'] == 'space_to':
                    order_sale_filter = order_sale_filter & Q(total_space__lte=filter['value'])
                if filter['property'] == 'space_living_from':
                    order_sale_filter = order_sale_filter & Q(living_space__gte=filter['value'])
                if filter['property'] == 'space_living_to':
                    order_sale_filter = order_sale_filter & Q(living_space__lte=filter['value'])
                if filter['property'] == 'space_kitchen_from':
                    order_sale_filter = order_sale_filter & Q(kitchen_space__gte=filter['value'])
                if filter['property'] == 'space_kitchen_to':
                    order_sale_filter = order_sale_filter & Q(kitchen_space__lte=filter['value'])
        return order_sale_filter

    def list(self, request):

        queryset = self.queryset.filter(self.get_filter(request)).distinct()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        page_size = self.paginator.page_size
        queryset = self.queryset.filter(self.get_filter(request)).distinct()
        page_number = (list(queryset.values_list('id', flat=True)).index(serializer.data['id']))/page_size+1
        return Response({'results': serializer.data, 'page': page_number}, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({'results': serializer.data})


class PhotosViewSet(viewsets.ModelViewSet):
    queryset = models.Photos.objects.all()
    serializer_class = serializers.PhotosSerializer

    def list(self, request):
        getparams = self.request.GET.copy()
        obj = getparams.get('object')
        if obj is not None:
            queryset = self.queryset.filter(object=obj)
        else:
            queryset = self.queryset.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class OrdersBuyViewSet(viewsets.ModelViewSet):
    queryset = models.OrdersBuy.objects.all()
    serializer_class = serializers.OrdersBuySerializer
    pagination_class = StandardResultsSetPagination

    def get_filter(self, request):

        getparams = self.request.GET.copy()
        id = getparams.get('id')
        object_category = getparams.get('object_category')
        brigade = getparams.get('brigade')
        performer = getparams.get('performer')
        status = getparams.getlist('status')
        client = getparams.get('client')
        mortgage = getparams.get('mortgage')
        show_support = getparams.get('show_support')
        filters = getparams.get('filter')
        order_buy_filter = Q()
        if id is not None:
            order_buy_filter = order_buy_filter & Q(id=id)
        if object_category is not None:
            order_buy_filter = order_buy_filter & Q(object_category=object_category)
        if brigade is not None:
            order_buy_filter = order_buy_filter & Q(performer__brigade=brigade)
        if performer is not None:
            order_buy_filter = order_buy_filter & Q(performer=performer)
        if len(status) != 0:
            order_buy_filter = order_buy_filter & Q(status__in=status)
        if client is not None:
            order_buy_filter = order_buy_filter & Q(client=client)
        if mortgage is not None:
            mortgage = json.loads(mortgage)
            order_buy_filter = order_buy_filter & Q(mortgage=mortgage)
        if show_support is not None:
            order_buy_filter = order_buy_filter & Q(show_support=show_support)

        if filters is not None:
            filters = json.loads(filters)
            for filter in filters:
                if filter['property'] == 'index':
                    order_buy_filter = order_buy_filter & Q(index__contains=filter['value'])
                if filter['property'] == 'object_category':
                    order_buy_filter = order_buy_filter & Q(object_category=filter['value'])
                if filter['property'] == 'transaction_type':
                    order_buy_filter = order_buy_filter & Q(transaction_type=filter['value'])
                if filter['property'] == 'status':
                    order_buy_filter = order_buy_filter & Q(status=filter['value'])
                if filter['property'] == 'days_mod':
                    delta = timedelta(days=int(filter['value']))
                    now_date = datetime.now() - delta
                    order_buy_filter = order_buy_filter & Q(modification_date__lte=now_date)
                if filter['property'] == 'performer':
                    order_buy_filter = order_buy_filter & Q(performer=filter['value'])
                if filter['property'] == 'author':
                    order_buy_filter = order_buy_filter & Q(author=filter['value'])
                if filter['property'] == 'client_index':
                    order_buy_filter = order_buy_filter & Q(client__index__contains=filter['value'])
                if filter['property'] == 'client_name':
                    order_buy_filter = order_buy_filter & Q(client__client_name__contains=filter['value'])
                if filter['property'] == 'phone_main':
                    order_buy_filter = order_buy_filter & Q(client__phone_main__contains=filter['value'])
                if filter['property'] == 'represent':
                    order_buy_filter = order_buy_filter & Q(client__represent__contains=filter['value'])
                if filter['property'] == 'phone_represent':
                    order_buy_filter = order_buy_filter & Q(client__phone_represent__contains=filter['value'])
                if filter['property'] == 'info_source':
                    order_buy_filter = order_buy_filter & Q(client__info_source=filter['value'])
                if filter['property'] == 'vip':
                    if filter['value']:
                        order_buy_filter = order_buy_filter & Q(client__vip=True)

        return order_buy_filter

    def list(self, request):

        queryset = self.queryset.filter(self.get_filter(request)).distinct()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        page_size = self.paginator.page_size

        queryset = self.queryset.filter(self.get_filter(request)).distinct()
        page_number = (list(queryset.values_list('id', flat=True)).index(serializer.data['id']))/page_size+1
        return Response({'results': serializer.data, 'page': page_number}, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({'results': serializer.data})

class OfferViewSet(viewsets.ModelViewSet):
    queryset = models.Offer.objects.all()
    serializer_class = serializers.OfferSerializer

    def list(self, request):
        getparams = self.request.GET.copy()
        order_id = getparams.get('order_id')
        order_type = getparams.get('order_type')
        if order_id is not None:
            if order_type == 'appOfferBuyList':
                queryset = self.queryset.filter(order_buy=order_id)#список предложений
            if order_type == 'appOfferSaleList':
                queryset = self.queryset.filter(order_sale=order_id)#список предложений
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class HystoryOfferViewSet(viewsets.ModelViewSet):
    queryset = models.HystoryOffer.objects.all()
    serializer_class = serializers.HystoryOfferSerializer

    def list(self, request):
        getparams = self.request.GET.copy()
        offer_id = getparams.get('offer_id')
        if offer_id is not None:
            queryset = self.queryset.filter(offer=offer_id)#список предложений
            serializer = self.serializer_class(queryset, many=True)
            return Response(serializer.data)


class HystoryShowViewSet(viewsets.ModelViewSet):
    queryset = models.HystoryShow.objects.all()
    serializer_class = serializers.HystoryShowSerializer

    def list(self, request):
        getparams = self.request.GET.copy()
        offer_id = getparams.get('offer_id')
        if offer_id is not None:
            queryset = self.queryset.filter(offer=offer_id)#список предложений
            serializer = self.serializer_class(queryset, many=True)
            return Response(serializer.data)


class HystoryServiceViewSet(viewsets.ModelViewSet):
    queryset = models.HystoryService.objects.all()
    serializer_class = serializers.HystoryServiceSerializer

    def list(self, request):
        getparams = self.request.GET.copy()
        offer_id = getparams.get('offer_id')
        if offer_id is not None:
            queryset = self.queryset.filter(offer=offer_id)#список предложений
            serializer = self.serializer_class(queryset, many=True)
            return Response(serializer.data)


class ListObjectTypeViewSet(viewsets.ModelViewSet):
    queryset = models.ListObjectType.objects.all()
    serializer_class = serializers.ListObjectTypeSerializer

    def list(self, request):
        getparams = self.request.GET.copy()
        orders = getparams.get('orders')
        if orders is not None:
            queryset = self.queryset.filter(orders=orders)
        else:
            queryset = self.queryset.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class ListDistrictViewSet(viewsets.ModelViewSet):
    queryset = models.ListDistrict.objects.all()
    serializer_class = serializers.ListDistrictSerializer

    def list(self, request):
        getparams = self.request.GET.copy()
        orders = getparams.get('orders')
        if orders is not None:
            queryset = self.queryset.filter(orders=orders)
        else:
            queryset = self.queryset.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

class ListCityViewSet(viewsets.ModelViewSet):
    queryset = models.ListCity.objects.all()
    serializer_class = serializers.ListCitySerializer

    def list(self, request):
        getparams = self.request.GET.copy()
        orders = getparams.get('orders')
        if orders is not None:
            queryset = self.queryset.filter(orders=orders)
        else:
            queryset = self.queryset.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class ListMicrodistrictViewSet(viewsets.ModelViewSet):
    queryset = models.ListMicrodistrict.objects.all()
    serializer_class = serializers.ListMicrodistrictSerializer

    def list(self, request):
        getparams = self.request.GET.copy()
        orders = getparams.get('orders')
        if orders is not None:
            queryset = self.queryset.filter(orders=orders)
        else:
            queryset = self.queryset.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

class ListStreetViewSet(viewsets.ModelViewSet):
    queryset = models.ListStreet.objects.all()
    serializer_class = serializers.ListStreetSerializer

    def list(self, request):
        getparams = self.request.GET.copy()
        orders = getparams.get('orders')
        if orders is not None:
            queryset = self.queryset.filter(orders=orders)
        else:
            queryset = self.queryset.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

class ListRoomsViewSet(viewsets.ModelViewSet):
    queryset = models.ListRooms.objects.all()
    serializer_class = serializers.ListRoomsSerializer

    def list(self, request):
        getparams = self.request.GET.copy()
        orders = getparams.get('orders')
        if orders is not None:
            queryset = self.queryset.filter(orders=orders)
        else:
            queryset = self.queryset.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class NotificationsViewSet(viewsets.ModelViewSet):
    queryset = models.Notifications.objects.all()
    serializer_class = serializers.NotificationsSerializer

    def list(self, request):
        getparams = self.request.GET.copy()
        user = getparams.get('user')
        if user is not None:
            filter_q = Q()
            filter_q = filter_q | Q(user=user) | Q(sender=user)
            queryset = self.queryset.filter(filter_q)
        else:
            queryset = self.queryset.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class SmsMessagesViewSet(viewsets.ModelViewSet):
    queryset = models.SmsMessages.objects.all()
    serializer_class = serializers.SmsMessagesSerializer


class EmailMessagesViewSet(viewsets.ModelViewSet):
    queryset = models.EmailMessages.objects.all()
    serializer_class = serializers.EmailMessagesSerializer

class TemplatesDocViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.TemplatesDoc.objects.all()
    serializer_class = serializers.TemplatesDocSerializer

class DocumentsViewSet(viewsets.ModelViewSet):
    queryset = models.Documents.objects.all()
    serializer_class = serializers.DocumentsSerializer
    def list(self, request):
        getparams = self.request.GET.copy()
        offer = getparams.get('offer')
        if offer is not None:
            queryset = self.queryset.filter(offer=offer)
        else:
            queryset = self.queryset.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

class RegulationsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Regulations.objects.all()
    serializer_class = serializers.RegulationsSerializer