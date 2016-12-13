# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import imagekit.models.fields
from django.conf import settings
import crmreapp.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('crmreapp', '0002_notifications_sendsms'),
    ]

    operations = [
        migrations.CreateModel(
            name='BuildingPhotos',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('description', models.CharField(max_length=30, verbose_name='\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435')),
                ('photo', imagekit.models.fields.ProcessedImageField(upload_to=crmreapp.models.get_building_photo_name)),
            ],
            options={
                'ordering': ['description'],
                'verbose_name_plural': '\u0424\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0438 \u043f\u043b\u0430\u043d\u0438\u0440\u043e\u0432\u043e\u043a',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Buildings',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('index', models.CharField(unique=True, max_length=9, verbose_name='\u041d\u043e\u043c\u0435\u0440', blank=True)),
                ('heading', models.CharField(max_length=80, verbose_name='\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043d\u043e\u0432\u043e\u0441\u0442\u0440\u043e\u0439\u043a\u0438')),
                ('description', models.CharField(max_length=1000, verbose_name='\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043d\u043e\u0432\u043e\u0441\u0442\u0440\u043e\u0439\u043a\u0438', blank=True)),
                ('create_date', models.DateTimeField(auto_now_add=True, verbose_name='\u0414\u0430\u0442\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f')),
                ('modification_date', models.DateTimeField(auto_now=True, verbose_name='\u0414\u0430\u0442\u0430 \u043f\u043e\u0441\u043b\u0435\u0434\u043d\u0435\u0439 \u043c\u043e\u0434\u0438\u0444\u0438\u043a\u0430\u0446\u0438\u0438')),
                ('house_number', models.CharField(max_length=10, verbose_name='\u041d\u043e\u043c\u0435\u0440 \u0434\u043e\u043c\u0430', blank=True)),
                ('construction_stage', models.BooleanField(default=True, verbose_name='\u0421\u0442\u0430\u0434\u0438\u044f \u0441\u0442\u0440\u043e\u0438\u0442\u0435\u043b\u044c\u0441\u0442\u0432\u0430')),
                ('delivery_period', models.CharField(max_length=30, verbose_name='\u0421\u0440\u043e\u043a \u0441\u0434\u0430\u0447\u0438', blank=True)),
                ('floors', models.IntegerField(null=True, verbose_name='\u042d\u0442\u0430\u0436\u0435\u0439', blank=True)),
                ('number_entrances', models.IntegerField(null=True, verbose_name='\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u043f\u043e\u0434\u044a\u0435\u0437\u0434\u043e\u0432', blank=True)),
                ('purpose', models.CharField(max_length=300, verbose_name='\u041d\u0430\u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435 \u043e\u0431\u044a\u0435\u043a\u0442\u0430', blank=True)),
                ('technology', models.CharField(max_length=300, verbose_name='\u0422\u0435\u0445\u043d\u043e\u043b\u043e\u0433\u0438\u044f \u0441\u0442\u0440\u043e\u0438\u0442\u0435\u043b\u044c\u0441\u0442\u0432\u0430', blank=True)),
                ('finish', models.CharField(max_length=300, verbose_name='\u041e\u0442\u0434\u0435\u043b\u043a\u0430', blank=True)),
                ('communication', models.CharField(max_length=300, verbose_name='\u041a\u043e\u043c\u043c\u0443\u043d\u0438\u043a\u0430\u0446\u0438\u0438', blank=True)),
                ('accessibility', models.CharField(max_length=300, verbose_name='\u0422\u0440\u0430\u043d\u0441\u043f\u043e\u0440\u0442\u043d\u0430\u044f \u0438 \u043f\u0435\u0448\u0435\u0445\u043e\u0434\u043d\u0430\u044f \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u043e\u0441\u0442\u044c', blank=True)),
                ('infrastructure', models.CharField(max_length=300, verbose_name='\u0418\u043d\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0430 \u0440\u0430\u0439\u043e\u043d\u0430', blank=True)),
                ('features', models.CharField(max_length=300, verbose_name='\u041e\u0441\u043e\u0431\u0435\u043d\u043d\u043e\u0441\u0442\u0438', blank=True)),
                ('city', models.ForeignKey(verbose_name='\u0413\u043e\u0440\u043e\u0434', blank=True, to='crmreapp.City', null=True)),
                ('construction_organization', models.ForeignKey(verbose_name='\u0421\u0442\u0440\u043e\u0438\u0442\u0435\u043b\u044c\u043d\u0430\u044f \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u044f', blank=True, to='crmreapp.ConstructionOrganization', null=True)),
                ('district', models.ForeignKey(verbose_name='\u0420\u0430\u0439\u043e\u043d', blank=True, to='crmreapp.District', null=True)),
                ('material_walls', models.ForeignKey(verbose_name='\u041c\u0430\u0442\u0435\u0440\u0438\u0430\u043b \u0441\u0442\u0435\u043d', blank=True, to='crmreapp.MaterialWalls', null=True)),
                ('microdistrict', models.ForeignKey(verbose_name='\u041c\u0438\u043a\u0440\u043e\u0440\u0430\u0439\u043e\u043d', blank=True, to='crmreapp.Microdistrict', null=True)),
                ('performer', models.ForeignKey(verbose_name='\u0418\u0441\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c', blank=True, to=settings.AUTH_USER_MODEL, null=True)),
                ('street', models.ForeignKey(verbose_name='\u0413\u043e\u0440\u043e\u0434', blank=True, to='crmreapp.Street', null=True)),
            ],
            options={
                'ordering': ['create_date'],
                'verbose_name_plural': '\u041d\u043e\u0432\u043e\u0441\u0442\u0440\u043e\u0439\u043a\u0438',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Plan',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('number_rooms', models.IntegerField(null=True, verbose_name='\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u043a\u043e\u043c\u043d\u0430\u0442', blank=True)),
                ('space', models.DecimalField(null=True, verbose_name='\u041f\u043b\u043e\u0449\u0430\u0434\u044c', max_digits=8, decimal_places=2, blank=True)),
                ('floor', models.CharField(max_length=30, verbose_name='\u042d\u0442\u0430\u0436', blank=True)),
                ('entrance', models.CharField(max_length=30, verbose_name='\u041f\u043e\u0434\u044a\u0435\u0437\u0434', blank=True)),
                ('price', models.DecimalField(null=True, verbose_name='\u0426\u0435\u043d\u0430', max_digits=10, decimal_places=2, blank=True)),
                ('building', models.ForeignKey(verbose_name='\u041d\u043e\u0432\u043e\u0441\u0442\u0440\u043e\u0439\u043a\u0430', to='crmreapp.Buildings')),
            ],
            options={
                'ordering': ['number_rooms', 'space', 'price'],
                'verbose_name_plural': '\u041f\u043b\u0430\u043d\u0438\u0440\u043e\u0432\u043a\u0438',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='PlanPhotos',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('description', models.CharField(max_length=30, verbose_name='\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435')),
                ('photo', imagekit.models.fields.ProcessedImageField(upload_to=crmreapp.models.get_plan_photo_name)),
                ('plan', models.ForeignKey(verbose_name='\u041f\u043b\u0430\u043d\u0438\u0440\u043e\u0432\u043a\u0430', to='crmreapp.Plan')),
            ],
            options={
                'ordering': ['description'],
                'verbose_name_plural': '\u0424\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0438 \u043f\u043b\u0430\u043d\u0438\u0440\u043e\u0432\u043e\u043a',
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='buildingphotos',
            name='building',
            field=models.ForeignKey(verbose_name='\u041d\u043e\u0432\u043e\u0441\u0442\u0440\u043e\u0439\u043a\u0430', to='crmreapp.Buildings'),
            preserve_default=True,
        ),
        migrations.AlterModelOptions(
            name='photos',
            options={'ordering': ['description'], 'verbose_name_plural': '\u0424\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0438 \u043e\u0431\u044a\u0435\u043a\u0442\u043e\u0432'},
        ),
    ]
