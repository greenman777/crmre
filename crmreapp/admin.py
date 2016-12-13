#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.contrib import admin
from django import forms
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model 
from django.contrib.auth.forms import UserCreationForm,UserChangeForm
from crmreapp import models
from crmreauth.models import User
from simple_history.admin import SimpleHistoryAdmin

class MyUserCreationForm(UserCreationForm):
    def clean_username(self):
        User = get_user_model() 
        # Since User.username is unique, this check is redundant,
        # but it sets a nicer error message than the ORM. See #13147.
        username = self.cleaned_data["username"]
        try:
            User._default_manager.get(username=username)
        except User.DoesNotExist:
            return username
        raise forms.ValidationError(self.error_messages['duplicate_username'])

    class Meta(UserCreationForm.Meta):
        model = get_user_model()

class MyUserAdmin(UserAdmin):
    
    form = UserChangeForm
    add_form = MyUserCreationForm

    list_display = ('username', 'is_admin')
    list_filter = ('is_admin',)
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ((u'Персональная информация'), {'fields': ('first_name', 'last_name', 'birthday','email',
                                                   'phone','phone_other','phone_short','position',
                                                   'sms_notification','brigade','photo')}),
        ((u'Организация'), {'fields': ('organization_name', 'organization_phone',
                                        'organization_fax','business_address')}),
        ((u'Разрешения'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        ((u'Важные даты'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2')}
        ),
    ) 
    list_display = ('username', 'last_name', 'first_name', 'birthday','email', 'phone',
                    'phone_other', 'organization_name', 'position', 'brigade', 'is_staff')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups','brigade')
    search_fields = ('username', 'first_name', 'last_name', 'email', 'phone')
    ordering = ('last_name','first_name',)
    filter_horizontal = ('groups', 'user_permissions',) 

class ConstructionOrganizationAdmin(admin.ModelAdmin):
    list_display = ('name','client')

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "client":
            kwargs["queryset"] = models.Clients.objects.filter(client_type=False)
        return super(ConstructionOrganizationAdmin, self).formfield_for_foreignkey(db_field, request, **kwargs)

admin.site.register(User, MyUserAdmin)

class ObjectTypeInline(admin.TabularInline):
    model = models.ObjectType

class ObjectCategoryAdmin(admin.ModelAdmin):
    inlines = [
        ObjectTypeInline,
    ]

admin.site.register(models.ObjectCategory,ObjectCategoryAdmin)
admin.site.register(models.Priority)
admin.site.register(models.InfoSource)
admin.site.register(models.City)
admin.site.register(models.Street)
admin.site.register(models.TaskStatus)
admin.site.register(models.ObjectAccessory)
admin.site.register(models.ContractType)
admin.site.register(models.OrderStatus)
admin.site.register(models.NdsType)
admin.site.register(models.MethodPayment)
admin.site.register(models.District)
admin.site.register(models.Microdistrict)
admin.site.register(models.MaterialWalls)
admin.site.register(models.Planishing)
admin.site.register(models.Condition)
admin.site.register(models.Refinishing)
admin.site.register(models.Heating)
admin.site.register(models.Balcony)
admin.site.register(models.LayoutRooms)
admin.site.register(models.Bathroom)
admin.site.register(models.Flooring)
admin.site.register(models.Windows)
admin.site.register(models.CategoryEarth)
admin.site.register(models.Road)
admin.site.register(models.GreenPlantings)
admin.site.register(models.Constructions)
admin.site.register(models.Fencing)
admin.site.register(models.OwnershipType)
admin.site.register(models.ResultSentence)
admin.site.register(models.ResultShow)
admin.site.register(models.OperationType)
admin.site.register(models.Occupation)
admin.site.register(models.Sphere)
admin.site.register(models.Encumbrance)
admin.site.register(models.DocumentTemplates)
admin.site.register(models.Bank)
admin.site.register(models.Lease)
admin.site.register(models.ResultOperation)
admin.site.register(models.ConstructionOrganization,ConstructionOrganizationAdmin)
admin.site.register(models.SmsMessages)
admin.site.register(models.EmailMessages)
admin.site.register(models.AvitoCategory)
admin.site.register(models.YandexCategory)
admin.site.register(models.AvitoType)
admin.site.register(models.AvitoCity)
admin.site.register(models.AvitoDistrict)
admin.site.register(models.MessageType)
admin.site.register(models.TemplatesDoc)
admin.site.register(models.Regulations)

admin.site.register(models.HystoryOffer, SimpleHistoryAdmin)
admin.site.register(models.HystoryShow, SimpleHistoryAdmin)
admin.site.register(models.HystoryService, SimpleHistoryAdmin)