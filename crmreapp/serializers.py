#!/usr/bin/env python
# -*- coding: utf-8 -*-

from rest_framework import serializers
from crmreapp import models
from django.contrib.auth.models import Group
from crmreauth.models import User

class TasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Tasks
        fields = '__all__'

class TaskHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TaskHistory
        fields = '__all__'

class TaskCommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TaskComments
        fields = '__all__'
                
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class ClientsSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        ret = super(ClientsSerializer, self).to_representation(instance)
        request = self.context["request"]
        getparams = request.GET.copy()
        client_id = getparams.get('client_id')
        if not request.user.has_perm('crmreapp.view_hidden_fields_clients') and not client_id and not request.user.id == ret['author']:
            ret['phone_represent'] = u"скрыт"
            ret['phone_represent'] = u"скрыт"
            ret['phone_main'] = u"скрыт"
            ret['phone_additional'] = u"скрыт"
            ret['fax'] = u"скрыт"
            ret['address_registr'] = u"скрыт"
            ret['address_actual'] = u"скрыт"
            ret['email'] = u"скрыт"
            ret['www'] = u"скрыт"
            ret['passport_series'] = u"скрыт"
            ret['output_place'] = u"скрыт"
            ret['date_issue'] = None
            ret['icq'] = u"скрыт"
            ret['vk'] = u"скрыт"
            ret['fb'] = u"скрыт"
            if not ret['client_type']:
                ret['position_name_im'] = u"скрыт"
                ret['position_name_gen'] = u"скрыт"
                ret['position'] = u"скрыт"
                ret['phone_head'] = u"скрыт"
                ret['email_head'] = u"скрыт"
        return ret
    class Meta:

        model = models.Clients
        fields = '__all__'

class ClientCommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ClientComments
        fields = '__all__'

class BuildingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Buildings
        fields = '__all__'

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Plan
        fields = '__all__'

class OrdersSaleSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        ret = super(OrdersSaleSerializer, self).to_representation(instance)
        ret['client_name'] = models.Clients.objects.get(pk=ret['client']).client_name
        ret['represent_name'] = models.Clients.objects.get(pk=ret['client']).represent
        return ret

    class Meta:
        model = models.OrdersSale
        fields = '__all__'

class PhotosSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Photos
        fields = '__all__'

class BuildingPhotosSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BuildingPhotos
        fields = '__all__'

class PlanPhotosSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PlanPhotos
        fields = '__all__'

class OrdersBuySerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        ret = super(OrdersBuySerializer, self).to_representation(instance)
        ret['client_name'] = models.Clients.objects.get(pk=ret['client']).client_name
        ret['represent_name'] = models.Clients.objects.get(pk=ret['client']).represent
        return ret

    class Meta:
        model = models.OrdersBuy
        fields = '__all__'

class OfferSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        ret = super(OfferSerializer, self).to_representation(instance)

        ret['order_buy_client_name'] = models.OrdersBuy.objects.get(pk=ret['order_buy']).client.client_name
        ret['order_buy_heading'] = models.OrdersBuy.objects.get(pk=ret['order_buy']).heading
        space_from = models.OrdersBuy.objects.get(pk=ret['order_buy']).space_from
        ret['order_buy_space'] = " ".join(('от',str(space_from))) if space_from else ""
        space_to = models.OrdersBuy.objects.get(pk=ret['order_buy']).space_to
        ret['order_buy_space'] = " ".join((ret['order_buy_space'], 'до', str(space_to))) if space_to else ret['order_buy_space']
        price_from = models.OrdersBuy.objects.get(pk=ret['order_buy']).price_from
        ret['order_buy_price'] = " ".join(('от', str(price_from))) if price_from else ""
        price_to = models.OrdersBuy.objects.get(pk=ret['order_buy']).price_to
        ret['order_buy_price'] = " ".join((ret['order_buy_price'], 'до', str(price_to))) if price_to else ret['order_buy_price']
        performer = models.OrdersBuy.objects.get(pk=ret['order_buy']).performer
        ret['order_buy_performer_id'] = performer.id
        ret['order_buy_performer_name'] = " ".join((performer.last_name, performer.first_name))
        ret['order_buy_create_date'] = models.OrdersBuy.objects.get(pk=ret['order_buy']).create_date
        ret['order_buy_index'] = models.OrdersBuy.objects.get(pk=ret['order_buy']).index

        ret['order_sale_client_name'] = models.OrdersSale.objects.get(pk=ret['order_sale']).client.client_name
        ret['order_sale_heading'] = models.OrdersSale.objects.get(pk=ret['order_sale']).heading
        ret['order_sale_space'] = models.OrdersSale.objects.get(pk=ret['order_sale']).total_space
        ret['order_sale_price'] = models.OrdersSale.objects.get(pk=ret['order_sale']).price
        try:
            ret['order_sale_street_name'] = models.OrdersSale.objects.get(pk=ret['order_sale']).street.name
        except:
            ret['order_sale_street_name'] = ""
        ret['order_sale_house_number'] = models.OrdersSale.objects.get(pk=ret['order_sale']).house_number
        try:
            ret['order_sale_microdistrict_name'] = models.OrdersSale.objects.get(pk=ret['order_sale']).microdistrict.name
        except:
            ret['order_sale_microdistrict_name'] = ""
        try:
            ret['order_sale_city_name'] = models.OrdersSale.objects.get(pk=ret['order_sale']).city.name
        except:
            ret['order_sale_city_name'] = ""
        try:
            ret['order_sale_object_type_name'] = models.OrdersSale.objects.get(pk=ret['order_sale']).object_type.name
        except:
            ret['order_sale_object_type_name'] = ""
        performer = models.OrdersSale.objects.get(pk=ret['order_sale']).performer
        ret['order_sale_performer_id'] = performer.id
        ret['order_sale_performer_name'] = " ".join((performer.last_name, performer.first_name))
        ret['order_sale_create_date'] = models.OrdersSale.objects.get(pk=ret['order_sale']).create_date
        ret['order_sale_index'] = models.OrdersSale.objects.get(pk=ret['order_sale']).index

        return ret

    class Meta:
        model = models.Offer
        fields = '__all__'

class HystoryOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.HystoryOffer
        fields = '__all__'
        
class HystoryShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.HystoryShow
        fields = '__all__'

class HystoryServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.HystoryService
        fields = '__all__'

class ListObjectTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ListObjectType
        fields = '__all__'

class ListDistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ListDistrict
        fields = '__all__'

class ListCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ListCity
        fields = '__all__'

class ListMicrodistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ListMicrodistrict
        fields = '__all__'

class ListStreetSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ListStreet
        fields = '__all__'

class ListRoomsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ListRooms
        fields = '__all__'

class NotificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Notifications
        fields = '__all__'

class SmsMessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SmsMessages
        fields = '__all__'

class EmailMessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.EmailMessages
        fields = '__all__'

class PrioritySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Priority
        fields = '__all__'

class TaskStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TaskStatus
        fields = '__all__'

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.City
        fields = '__all__'

class StreetSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Street
        fields = '__all__'

class ObjectCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ObjectCategory
        fields = '__all__'

class ObjectTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ObjectType
        fields = '__all__'

class InfoSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.InfoSource
        fields = '__all__'

class ObjectAccessorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ObjectAccessory
        fields = '__all__'

class ContractTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ContractType
        fields = '__all__'

class OrderStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OrderStatus
        fields = '__all__'

class NdsTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.NdsType
        fields = '__all__'

class MethodPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MethodPayment
        fields = '__all__'

class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.District
        fields = '__all__'

class MicrodistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Microdistrict
        fields = '__all__'

class MaterialWallsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MaterialWalls
        fields = '__all__'

class PlanishingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Planishing
        fields = '__all__'

class ConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Condition
        fields = '__all__'

class RefinishingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Refinishing
        fields = '__all__'

class HeatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Heating
        fields = '__all__'

class BalconySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Balcony
        fields = '__all__'

class LayoutRoomsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.LayoutRooms
        fields = '__all__'

class BathroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Bathroom
        fields = '__all__'

class FlooringSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Flooring
        fields = '__all__'

class WindowsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Windows
        fields = '__all__'

class CategoryEarthSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CategoryEarth
        fields = '__all__'

class RoadSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Road
        fields = '__all__'

class GreenPlantingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.GreenPlantings
        fields = '__all__'

class ConstructionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Constructions
        fields = '__all__'

class FencingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Fencing
        fields = '__all__'

class OwnershipTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.InfoSource
        fields = '__all__'

class ResultSentenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ResultSentence
        fields = '__all__'

class ResultShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ResultShow
        fields = '__all__'

class OperationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OperationType
        fields = '__all__'

class OccupationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Occupation
        fields = '__all__'

class SphereSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Sphere
        fields = '__all__'

class EncumbranceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Encumbrance
        fields = '__all__'

class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Bank
        fields = '__all__'

class LeaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Lease
        fields = '__all__'

class ResultOperationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ResultOperation
        fields = '__all__'

class ConstructionOrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ConstructionOrganization
        fields = '__all__'

class MessageTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MessageType
        fields = '__all__'

class TemplatesDocSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TemplatesDoc
        fields = '__all__'

class DocumentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Documents
        fields = '__all__'

class RegulationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Regulations
        fields = '__all__'