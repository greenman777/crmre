# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import imagekit.models.fields
import tinymce.models
from django.conf import settings
import crmreapp.models


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='AvitoCategory',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50, verbose_name='\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f \u043e\u0431\u044a\u0435\u043a\u0442\u0430 Avito')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': 'Avito \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f \u043e\u0431\u044a\u0435\u043a\u0442\u0430 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='AvitoCity',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=40, verbose_name='\u041d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0435')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': 'Avito \u0433\u043e\u0440\u043e\u0434',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='AvitoType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50, verbose_name='\u0422\u0438\u043f \u043e\u0431\u044a\u0435\u043a\u0442\u0430 Avito', blank=True)),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': 'Avito \u0442\u0438\u043f \u043e\u0431\u044a\u0435\u043a\u0442\u0430 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Balcony',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30, verbose_name='\u0411\u0430\u043b\u043a\u043e\u043d')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0411\u0430\u043b\u043a\u043e\u043d',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Bank',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=20, verbose_name='\u0411\u0430\u043d\u043a')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0411\u0430\u043d\u043a\u0438',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Bathroom',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30, verbose_name='\u0421\u0430\u043d\u0443\u0437\u0435\u043b')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0421\u0430\u043d\u0443\u0437\u0435\u043b',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='CategoryEarth',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50, verbose_name='\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f \u0437\u0435\u043c\u043b\u0438')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f \u0437\u0435\u043c\u043b\u0438',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=40, verbose_name='\u041d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0435')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0413\u043e\u0440\u043e\u0434',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ClientComments',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('comment', models.CharField(max_length=100, verbose_name='\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439')),
                ('create_date', models.DateField(verbose_name='\u0414\u0430\u0442\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f')),
                ('author', models.ForeignKey(verbose_name='\u0410\u0432\u0442\u043e\u0440', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['pk'],
                'verbose_name_plural': '\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0438 \u043a \u043a\u043b\u0438\u0435\u043d\u0442\u0443',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Clients',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('index', models.CharField(unique=True, max_length=9, verbose_name='\u041d\u043e\u043c\u0435\u0440', blank=True)),
                ('create_date', models.DateField(verbose_name='\u0414\u0430\u0442\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f')),
                ('represent', models.CharField(max_length=80, verbose_name='\u041f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0438\u0442\u0435\u043b\u044c')),
                ('phone_represent', models.CharField(max_length=11, verbose_name='\u0422\u0435\u043b\u0435\u0444\u043e\u043d \u043f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0438\u0442\u0435\u043b\u044f')),
                ('client_type', models.BooleanField(default=None, verbose_name='\u0422\u0438\u043f \u043a\u043b\u0438\u0435\u043d\u0442\u0430')),
                ('is_client', models.BooleanField(default=None, verbose_name='\u042f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u043a\u043b\u0438\u0435\u043d\u0442\u043e\u043c')),
                ('client_name', models.CharField(max_length=100, verbose_name='\u041a\u043b\u0438\u0435\u043d\u0442', blank=True)),
                ('address_registr', models.CharField(max_length=150, verbose_name='\u0410\u0434\u0440\u0435\u0441 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438', blank=True)),
                ('address_actual', models.CharField(max_length=150, verbose_name='\u0410\u0434\u0440\u0435\u0441 \u0444\u0430\u043a\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u0439', blank=True)),
                ('phone_main', models.CharField(max_length=11, verbose_name='\u0422\u0435\u043b\u0435\u0444\u043e\u043d \u043e\u0441\u043d\u043e\u0432\u043d\u043e\u0439', blank=True)),
                ('phone_additional', models.CharField(max_length=11, verbose_name='\u0422\u0435\u043b\u0435\u0444\u043e\u043d \u0434\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439', blank=True)),
                ('fax', models.CharField(max_length=11, verbose_name='\u0424\u0430\u043a\u0441', blank=True)),
                ('email', models.EmailField(max_length=75, verbose_name='E-mail', blank=True)),
                ('www', models.URLField(verbose_name='\u0412\u0435\u0431 \u0441\u0430\u0439\u0442', blank=True)),
                ('icq', models.CharField(max_length=14, verbose_name='ICQ', blank=True)),
                ('vk', models.URLField(verbose_name='Vk', blank=True)),
                ('fb', models.URLField(verbose_name='fb', blank=True)),
                ('date_birth', models.DateField(null=True, verbose_name='\u0414\u0430\u0442\u0430 \u0440\u043e\u0436\u0434\u0435\u043d\u0438\u044f', blank=True)),
                ('marital_status', models.BooleanField(default=None, verbose_name='\u0421\u0435\u043c\u0435\u0439\u043d\u043e\u0435 \u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u0435')),
                ('children_num', models.IntegerField(null=True, verbose_name='\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u043d\u0435\u0441\u043e\u0432\u0435\u0440\u0448\u0435\u043d\u043d\u043e\u043b\u0435\u0442\u043d\u0438\u0445 \u0434\u0435\u0442\u0435\u0439', blank=True)),
                ('information', models.CharField(max_length=150, verbose_name='\u0414\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u0430\u044f \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f', blank=True)),
                ('fullname_gen', models.CharField(max_length=100, verbose_name='\u0424\u0418\u041e \u0432 \u0440\u043e\u0434\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u043c \u043f\u0430\u0434\u0435\u0436\u0435', blank=True)),
                ('passport_series', models.CharField(max_length=4, verbose_name='\u0421\u0435\u0440\u0438\u044f \u043f\u0430\u0441\u043f\u043e\u0440\u0442\u0430', blank=True)),
                ('passport_number', models.CharField(max_length=6, verbose_name='\u041d\u043e\u043c\u0435\u0440 \u043f\u0430\u0441\u043f\u043e\u0440\u0442\u0430', blank=True)),
                ('output_place', models.CharField(max_length=150, verbose_name='\u041c\u0435\u0441\u0442\u043e \u0432\u044b\u0434\u0430\u0447\u0438 \u043f\u0430\u0441\u043f\u043e\u0440\u0442\u0430', blank=True)),
                ('date_issue', models.DateField(null=True, verbose_name='\u0414\u0430\u0442\u0430 \u0432\u044b\u0434\u0430\u0447\u0438 \u043f\u0430\u0441\u043f\u043e\u0440\u0442\u0430', blank=True)),
                ('inn', models.CharField(max_length=12, verbose_name='\u0418\u041d\u041d', blank=True)),
                ('kpp', models.CharField(max_length=9, verbose_name='\u041a\u041f\u041f', blank=True)),
                ('set_account', models.CharField(max_length=20, verbose_name='\u0420\u0430\u0441\u0447\u0435\u0442\u043d\u044b\u0439 \u0441\u0447\u0435\u0442', blank=True)),
                ('bik', models.CharField(max_length=9, verbose_name='\u0411\u0418\u041a', blank=True)),
                ('kor_account', models.CharField(max_length=20, verbose_name='\u041a\u043e\u0440. \u0441\u0447\u0435\u0442', blank=True)),
                ('bank', models.CharField(max_length=100, verbose_name='\u0411\u0430\u043d\u043a', blank=True)),
                ('position_name_im', models.CharField(max_length=100, verbose_name='\u0424\u0418\u041e \u0432 \u0438\u043c\u0435\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u043c \u043f\u0430\u0434\u0435\u0436\u0435', blank=True)),
                ('position_name_gen', models.CharField(max_length=100, verbose_name='\u0424\u0418\u041e \u0432 \u0440\u043e\u0434\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u043c \u043f\u0430\u0434\u0435\u0436\u0435', blank=True)),
                ('position', models.CharField(max_length=50, verbose_name='\u0414\u043e\u043b\u0436\u043d\u043e\u0441\u0442\u044c \u0440\u0443\u043a\u043e\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044f', blank=True)),
                ('phone_head', models.CharField(max_length=11, verbose_name='\u0422\u0435\u043b\u0435\u0444\u043e\u043d \u0440\u0443\u043a\u043e\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044f', blank=True)),
                ('email_head', models.EmailField(max_length=75, verbose_name='E-mail \u0440\u0443\u043a\u043e\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044f', blank=True)),
                ('vip', models.BooleanField(default=False, verbose_name='VIP \u043a\u043b\u0438\u0435\u043d\u0442')),
                ('pkg_email_1', models.BooleanField(default=True, verbose_name='\u0420\u0430\u0441\u0441\u044b\u043b\u043a\u0430 \u043f\u043e E-mail 1')),
                ('pkg_email_2', models.BooleanField(default=False, verbose_name='\u0420\u0430\u0441\u0441\u044b\u043b\u043a\u0430 \u043f\u043e E-mail 2')),
                ('pkg_email_3', models.BooleanField(default=False, verbose_name='\u0420\u0430\u0441\u0441\u044b\u043b\u043a\u0430 \u043f\u043e E-mail 3')),
                ('pkg_email_4', models.BooleanField(default=False, verbose_name='\u0420\u0430\u0441\u0441\u044b\u043b\u043a\u0430 \u043f\u043e E-mail 4')),
                ('pkg_email_5', models.BooleanField(default=False, verbose_name='\u0420\u0430\u0441\u0441\u044b\u043b\u043a\u0430 \u043f\u043e E-mail 5')),
                ('pkg_sms_1', models.BooleanField(default=True, verbose_name='\u0420\u0430\u0441\u0441\u044b\u043b\u043a\u0430 \u043f\u043e SMS 1')),
                ('pkg_sms_2', models.BooleanField(default=False, verbose_name='\u0420\u0430\u0441\u0441\u044b\u043b\u043a\u0430 \u043f\u043e SMS 2')),
                ('pkg_sms_3', models.BooleanField(default=False, verbose_name='\u0420\u0430\u0441\u0441\u044b\u043b\u043a\u0430 \u043f\u043e SMS 3')),
                ('pkg_sms_4', models.BooleanField(default=False, verbose_name='\u0420\u0430\u0441\u0441\u044b\u043b\u043a\u0430 \u043f\u043e SMS 4')),
                ('pkg_sms_5', models.BooleanField(default=False, verbose_name='\u0420\u0430\u0441\u0441\u044b\u043b\u043a\u0430 \u043f\u043e SMS 5')),
                ('author', models.ForeignKey(verbose_name='\u0410\u0432\u0442\u043e\u0440', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['client_name', 'represent'],
                'verbose_name_plural': '\u041a\u043b\u0438\u0435\u043d\u0442\u044b',
                'permissions': (('view_hidden_fields_clients', 'View hidden fields clients'), ('can_change_all_clients', 'Can change all clients')),
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Condition',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30, verbose_name='\u0421\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u0435')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0421\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u0435',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ConstructionOrganization',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=60, verbose_name='\u0421\u0442\u0440\u043e\u0438\u0442\u0435\u043b\u044c\u043d\u0430\u044f \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u044f')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0421\u0442\u0440\u043e\u0438\u0442\u0435\u043b\u044c\u043d\u0430\u044f \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u044f',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Constructions',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30, verbose_name='\u041f\u043e\u0441\u0442\u0440\u043e\u0439\u043a\u0438')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u041f\u043e\u0441\u0442\u0440\u043e\u0439\u043a\u0438',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ContractType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30, verbose_name='\u0422\u0438\u043f \u0434\u043e\u0433\u043e\u0432\u043e\u0440\u0430')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0422\u0438\u043f \u0434\u043e\u0433\u043e\u0432\u043e\u0440\u0430',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='District',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=40, verbose_name='\u0420\u0430\u0439\u043e\u043d')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0420\u0430\u0439\u043e\u043d',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='DocumentTemplates',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50, verbose_name='\u041d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0435 \u0448\u0430\u0431\u043b\u043e\u043d\u0430')),
                ('content', tinymce.models.HTMLField(verbose_name='\u0421\u043e\u0434\u0435\u0440\u0436\u0430\u043d\u0438\u0435')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0428\u0430\u0431\u043b\u043e\u043d\u044b \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u043e\u0432',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='EmailMessages',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.TextField(verbose_name='\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435')),
            ],
            options={
                'ordering': ['pk'],
                'verbose_name_plural': 'E-mail \u0440\u0430\u0441\u0441\u044b\u043b\u043a\u0430',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Encumbrance',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=20, verbose_name='\u041e\u0431\u0440\u0435\u043c\u0435\u043d\u0435\u043d\u0438\u0435')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u041e\u0431\u0440\u0435\u043c\u0435\u043d\u0435\u043d\u0438\u0435',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Fencing',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30, verbose_name='\u041e\u0433\u0440\u0430\u0434\u0435\u043d\u0438\u0435')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u041e\u0433\u0440\u0430\u0436\u0434\u0435\u043d\u0438\u0435',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Flooring',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30, verbose_name='\u041f\u043e\u043b')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u041f\u043e\u043b',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='GreenPlantings',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30, verbose_name='\u0417\u0435\u043b\u0435\u043d\u044b\u0435 \u043d\u0430\u0441\u0430\u0436\u0434\u0435\u043d\u0438\u044f')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0417\u0435\u043b\u0435\u043d\u044b\u0435 \u043d\u0430\u0441\u0430\u0436\u0434\u0435\u043d\u0438\u044f',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Heating',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30, verbose_name='\u041e\u0442\u043e\u043f\u043b\u0435\u043d\u0438\u0435')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u041e\u0442\u043e\u043f\u043b\u0435\u043d\u0438\u0435',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='HystoryOffer',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateField(verbose_name='\u0414\u0430\u0442\u0430 \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u044f')),
                ('comment', models.CharField(max_length=100, verbose_name='\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439', blank=True)),
            ],
            options={
                'ordering': ['date'],
                'verbose_name_plural': '\u0418\u0441\u0442\u043e\u0440\u0438\u044f \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u0439',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='HystoryOrderBuyStatus',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateField(verbose_name='\u0414\u0430\u0442\u0430 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u0441\u0442\u0430\u0442\u0443\u0441\u0430')),
            ],
            options={
                'ordering': ['date', 'pk'],
                'verbose_name_plural': '\u0418\u0441\u0442\u043e\u0440\u0438\u044f \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u0441\u0442\u0430\u0442\u0443\u0441\u0430 \u0437\u0430\u044f\u0432\u043a\u0438',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='HystoryOrderSaleStatus',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateField(verbose_name='\u0414\u0430\u0442\u0430 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u0441\u0442\u0430\u0442\u0443\u0441\u0430')),
            ],
            options={
                'ordering': ['date', 'pk'],
                'verbose_name_plural': '\u0418\u0441\u0442\u043e\u0440\u0438\u044f \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u0441\u0442\u0430\u0442\u0443\u0441\u0430 \u0437\u0430\u044f\u0432\u043a\u0438',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='HystoryService',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateField(verbose_name='\u0414\u0430\u0442\u0430 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438')),
                ('comment', models.CharField(max_length=100, verbose_name='\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439', blank=True)),
            ],
            options={
                'ordering': ['date'],
                'verbose_name_plural': '\u0418\u0441\u0442\u043e\u0440\u0438\u044f \u0432\u0435\u0434\u0435\u043d\u0438\u044f \u0441\u0434\u0435\u043b\u043a\u0438',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='HystoryShow',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateField(verbose_name='\u0414\u0430\u0442\u0430 \u043f\u043e\u043a\u0430\u0437\u0430')),
                ('number_act', models.CharField(max_length=20, verbose_name='\u041d\u043e\u043c\u0435\u0440 \u0430\u043a\u0442\u0430 \u043f\u043e\u043a\u0430\u0437\u0430', blank=True)),
                ('comment', models.CharField(max_length=100, verbose_name='\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439', blank=True)),
            ],
            options={
                'ordering': ['date'],
                'verbose_name_plural': '\u0418\u0441\u0442\u043e\u0440\u0438\u044f \u043f\u043e\u043a\u0430\u0437\u043e\u0432',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='InfoSource',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50, verbose_name='\u0418\u0441\u0442\u043e\u0447\u043d\u0438\u043a \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0418\u0441\u0442\u043e\u0447\u043d\u0438\u043a\u0438 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='LayoutRooms',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30, verbose_name='\u0420\u0430\u0441\u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u043a\u043e\u043c\u043d\u0430\u0442')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0420\u0430\u0441\u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u043a\u043e\u043c\u043d\u0430\u0442',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Lease',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=20, verbose_name='\u0421\u0440\u043e\u043a \u0430\u0440\u0435\u043d\u0434\u044b')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0421\u0440\u043e\u043a \u0430\u0440\u0435\u043d\u0434\u044b',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ListCity',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('city', models.ForeignKey(verbose_name='\u0413\u043e\u0440\u043e\u0434', to='crmreapp.City')),
            ],
            options={
                'ordering': ['city'],
                'verbose_name_plural': '\u0413\u043e\u0440\u043e\u0434\u0430 \u043a \u0437\u0430\u044f\u0432\u043a\u0435',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ListDistrict',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('district', models.ForeignKey(verbose_name='\u0420\u0430\u0439\u043e\u043d', to='crmreapp.District')),
            ],
            options={
                'ordering': ['district'],
                'verbose_name_plural': '\u0420\u0430\u0439\u043e\u043d\u044b \u043a \u0437\u0430\u044f\u0432\u043a\u0435',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ListMicrodistrict',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
                'ordering': ['microdistrict'],
                'verbose_name_plural': '\u041c\u0438\u043a\u0440\u043e\u0440\u0430\u0439\u043e\u043d\u044b \u043a \u0437\u0430\u044f\u0432\u043a\u0435',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ListObjectType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
                'ordering': ['object_type'],
                'verbose_name_plural': '\u0422\u0438\u043f \u043e\u0431\u044a\u0435\u043a\u0442\u0430',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ListRooms',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('number_rooms', models.IntegerField(verbose_name='\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u043a\u043e\u043c\u043d\u0430\u0442')),
            ],
            options={
                'ordering': ['number_rooms'],
                'verbose_name_plural': '\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u043a\u043e\u043c\u043d\u0430\u0442',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ListStreet',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
                'ordering': ['street'],
                'verbose_name_plural': '\u0423\u043b\u0438\u0446\u044b \u043a \u0437\u0430\u044f\u0432\u043a\u0435',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='MaterialWalls',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30, verbose_name='\u041c\u0430\u0442\u0435\u0440\u0438\u0430\u043b \u0441\u0442\u0435\u043d')),
                ('avito_housetype', models.CharField(max_length=30, verbose_name='\u0422\u0438\u043f \u0434\u043e\u043c\u0430 Avito', blank=True)),
                ('avito_wallstype', models.CharField(max_length=30, verbose_name='\u041c\u0430\u0442\u0435\u0440\u0438\u0430\u043b \u0441\u0442\u0435\u043d Avito', blank=True)),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u041c\u0430\u0442\u0435\u0440\u0438\u0430\u043b \u0441\u0442\u0435\u043d',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='MessageType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30, verbose_name='\u0422\u0438\u043f \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0422\u0438\u043f \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='MethodPayment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=20, verbose_name='\u0421\u043f\u043e\u0441\u043e\u0431 \u043e\u043f\u043b\u0430\u0442\u044b')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0421\u043f\u043e\u0441\u043e\u0431 \u043e\u043f\u043b\u0430\u0442\u044b',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Microdistrict',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=40, verbose_name='\u041c\u0438\u043a\u0440\u043e\u0440\u0430\u0439\u043e\u043d')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u041c\u0438\u043a\u0440\u043e\u0440\u0430\u0439\u043e\u043d',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='NdsType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=20, verbose_name='\u0422\u0438\u043f \u041d\u0414\u0421')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0422\u0438\u043f \u041d\u0414\u0421',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Notifications',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateField(auto_now_add=True, verbose_name='\u0414\u0430\u0442\u0430 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438')),
                ('message', models.CharField(max_length=150, verbose_name='\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435')),
                ('read', models.BooleanField(default=False, verbose_name='\u041f\u0440\u043e\u0447\u0438\u0442\u0430\u043d\u043e')),
                ('sender', models.ForeignKey(related_name='sender', verbose_name='\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u0435\u043b\u044c', blank=True, to=settings.AUTH_USER_MODEL, null=True)),
                ('user', models.ForeignKey(related_name='user', verbose_name='\u041f\u043e\u043b\u0443\u0447\u0430\u0442\u0435\u043b\u044c', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['read', '-date', '-id'],
                'verbose_name_plural': '\u0423\u0432\u0435\u0434\u043e\u043c\u043b\u0435\u043d\u0438\u044f',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ObjectAccessory',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30, verbose_name='\u041f\u0440\u0438\u043d\u0430\u0434\u043b\u0435\u0436\u043d\u043e\u0441\u0442\u044c \u043e\u0431\u044a\u0435\u043a\u0442\u0430')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u041f\u0440\u0438\u043d\u0430\u0434\u043b\u0435\u0436\u043d\u043e\u0441\u0442\u044c \u043e\u0431\u044a\u0435\u043a\u0442\u0430',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ObjectCategory',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=40, verbose_name='\u041d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0435')),
                ('rate_growth_orders', models.IntegerField(verbose_name='\u041d\u043e\u0440\u043c\u0430 \u043f\u0440\u0438\u0440\u043e\u0441\u0442\u0430 \u0437\u0430\u044f\u0432\u043e\u043a')),
                ('rate_growth_contracts', models.IntegerField(verbose_name='\u041d\u043e\u0440\u043c\u0430 \u043f\u0440\u0438\u0440\u043e\u0441\u0442\u0430 \u0434\u043e\u0433\u043e\u0432\u043e\u0440\u043e\u0432')),
                ('rate_shows', models.IntegerField(verbose_name='\u041d\u043e\u0440\u043c\u0430 \u043f\u043e\u043a\u0430\u0437\u043e\u0432')),
                ('rate_transactions', models.IntegerField(verbose_name='\u041d\u043e\u0440\u043c\u0430 \u0441\u0434\u0435\u043b\u043e\u043a')),
                ('group', models.ForeignKey(verbose_name='\u041e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0439 \u043e\u0442\u0434\u0435\u043b', to='auth.Group')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f \u043e\u0431\u044a\u0435\u043a\u0442\u0430 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ObjectType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50, verbose_name='\u041d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0435')),
                ('avito_category', models.ForeignKey(blank=True, to='crmreapp.AvitoCategory', null=True)),
                ('avito_type', models.ForeignKey(blank=True, to='crmreapp.AvitoType', null=True)),
                ('object_category', models.ForeignKey(to='crmreapp.ObjectCategory')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0422\u0438\u043f \u043e\u0431\u044a\u0435\u043a\u0442\u0430 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Occupation',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50, verbose_name='\u0420\u043e\u0434 \u0437\u0430\u043d\u044f\u0442\u0438\u0439')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0420\u043e\u0434 \u0437\u0430\u043d\u044f\u0442\u0438\u0439',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Offer',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('informed', models.BooleanField(default=False, verbose_name='\u0418\u0437\u0432\u0435\u0449\u0435\u043d\u0438\u0435')),
                ('stage', models.IntegerField(default=1, null=True, verbose_name='\u0421\u0442\u0430\u0434\u0438\u044f \u0440\u0430\u0431\u043e\u0442\u044b', blank=True)),
            ],
            options={
                'ordering': ['-stage'],
                'verbose_name_plural': '\u0412\u0441\u0442\u0440\u0435\u0447\u043d\u044b\u0435 \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u044f',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='OperationType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30, verbose_name='\u0422\u0438\u043f \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0422\u0438\u043f \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='OrdersBuy',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('index', models.CharField(unique=True, max_length=9, verbose_name='\u041d\u043e\u043c\u0435\u0440', blank=True)),
                ('create_date', models.DateField(verbose_name='\u0414\u0430\u0442\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f')),
                ('modification_date', models.DateField(verbose_name='\u0414\u0430\u0442\u0430 \u043f\u043e\u0441\u043b\u0435\u0434\u043d\u0435\u0439 \u043c\u043e\u0434\u0438\u0444\u0438\u043a\u0430\u0446\u0438\u0438')),
                ('heading', models.CharField(max_length=80, verbose_name='\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0437\u0430\u044f\u0432\u043a\u0438')),
                ('description', models.CharField(max_length=600, verbose_name='\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0437\u0430\u044f\u0432\u043a\u0438', blank=True)),
                ('transaction_type', models.BooleanField(default=None, verbose_name='\u0422\u0438\u043f \u0441\u0434\u0435\u043b\u043a\u0438')),
                ('only_support', models.BooleanField(default=False, verbose_name='\u0422\u043e\u043b\u044c\u043a\u043e \u0441\u043e\u043f\u0440\u043e\u0432\u043e\u0436\u0434\u0435\u043d\u0438\u0435')),
                ('show_support', models.BooleanField(default=False, verbose_name='\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u044e\u0440\u0438\u0441\u0442\u0443')),
                ('flag_edit', models.BooleanField(default=False, verbose_name='\u0421\u0442\u0430\u0442\u0443\u0441 \u0434\u043b\u044f \u0440\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f')),
                ('rating', models.IntegerField(null=True, verbose_name='\u041e\u0446\u0435\u043d\u043a\u0430 \u0440\u0430\u0431\u043e\u0442\u044b', blank=True)),
                ('rating_comment', models.CharField(max_length=100, verbose_name='\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439 \u043a \u043e\u0446\u0435\u043d\u043a\u0435', blank=True)),
                ('contract_number', models.CharField(max_length=20, verbose_name='\u041d\u043e\u043c\u0435\u0440 \u0434\u043e\u0433\u043e\u0432\u043e\u0440\u0430', blank=True)),
                ('contract_date', models.DateField(null=True, verbose_name='\u0414\u0430\u0442\u0430 \u0434\u043e\u0433\u043e\u0432\u043e\u0440\u0430', blank=True)),
                ('contract_end_date', models.DateField(null=True, verbose_name='\u0414\u0430\u0442\u0430 \u043e\u043a\u043e\u043d\u0447\u0430\u043d\u0438\u044f \u0434\u043e\u0433\u043e\u0432\u043e\u0440\u0430', blank=True)),
                ('mortgage', models.BooleanField(default=False, verbose_name='\u0422\u0440\u0435\u0431\u0443\u0435\u0442 \u0438\u043f\u043e\u0442\u0435\u0447\u043d\u043e\u0433\u043e \u043a\u0440\u0435\u0434\u0438\u0442\u0430')),
                ('cash', models.DecimalField(null=True, verbose_name='\u0421\u0443\u043c\u043c\u0430 \u043d\u0430\u043b\u0438\u0447\u043d\u044b\u0445', max_digits=10, decimal_places=2, blank=True)),
                ('commission', models.BooleanField(default=None, verbose_name='\u0412\u043a\u043b\u044e\u0447\u0430\u0442\u044c \u043a\u043e\u043c\u0438\u0441\u0441\u0438\u043e\u043d\u043d\u044b\u0435')),
                ('commission_type', models.BooleanField(default=None, verbose_name='\u0422\u0438\u043f \u043a\u043e\u043c\u043c\u0438\u0441\u0441\u0438\u043e\u043d\u043d\u044b\u0445', choices=[(True, '\u041f\u0440\u043e\u0446\u0435\u043d\u0442'), (False, '\u0424\u0438\u043a\u0441\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439')])),
                ('commission_price', models.DecimalField(null=True, verbose_name='\u0417\u043d\u0430\u0447\u0435\u043d\u0438\u0435 \u043a\u043e\u043c\u043c\u0438\u0441\u0438\u043e\u043d\u043d\u044b\u0445', max_digits=8, decimal_places=2, blank=True)),
                ('other_agency', models.BooleanField(default=None, verbose_name='\u0417\u0430\u0434\u0435\u0439\u0441\u0442\u0432\u043e\u0432\u0430\u0442\u044c \u0434\u0440\u0443\u0433\u0438\u0435 \u0430\u0433\u0435\u043d\u0441\u0442\u0432\u0430')),
                ('agency_commission', models.BooleanField(default=None, verbose_name='\u0412\u043a\u043b\u044e\u0447\u0430\u0442\u044c \u043a\u043e\u043c\u0438\u0441\u0441\u0438\u043e\u043d\u043d\u044b\u0435')),
                ('agency_commission_type', models.BooleanField(default=None, verbose_name='\u0422\u0438\u043f \u043a\u043e\u043c\u0438\u0441\u0441\u0438\u043e\u043d\u043d\u044b\u0445', choices=[(True, '\u041f\u0440\u043e\u0446\u0435\u043d\u0442'), (False, '\u0424\u0438\u043a\u0441\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439')])),
                ('agency_commission_price', models.DecimalField(null=True, verbose_name='\u0417\u043d\u0430\u0447\u0435\u043d\u0438\u0435 \u043a\u043e\u043c\u043c\u0438\u0441\u0438\u043e\u043d\u043d\u044b\u0445', max_digits=8, decimal_places=2, blank=True)),
                ('price_from', models.DecimalField(null=True, verbose_name='\u0426\u0435\u043d\u0430, \u043e\u0442', max_digits=10, decimal_places=2, blank=True)),
                ('price_to', models.DecimalField(null=True, verbose_name='\u0426\u0435\u043d\u0430, \u0434\u043e', max_digits=10, decimal_places=2, blank=True)),
                ('space_from', models.DecimalField(null=True, verbose_name='\u041e\u0431\u0449\u0430\u044f \u043f\u043b\u043e\u0449\u0430\u0434\u044c, \u043e\u0442', max_digits=8, decimal_places=2, blank=True)),
                ('space_to', models.DecimalField(null=True, verbose_name='\u041e\u0431\u0449\u0430\u044f \u043f\u043b\u043e\u0449\u0430\u0434\u044c, \u0434\u043e', max_digits=8, decimal_places=2, blank=True)),
                ('remoteness_from', models.IntegerField(null=True, verbose_name='\u0423\u0434\u0430\u043b\u0435\u043d\u043d\u043e\u0441\u0442\u044c \u043e\u0442 \u0446\u0435\u043d\u0442\u0440\u0430, \u043e\u0442', blank=True)),
                ('remoteness_to', models.IntegerField(null=True, verbose_name='\u0423\u0434\u0430\u043b\u0435\u043d\u043d\u043e\u0441\u0442\u044c \u043e\u0442 \u0446\u0435\u043d\u0442\u0440\u0430, \u0434\u043e', blank=True)),
                ('classified_resources', models.BooleanField(default=False, verbose_name='\u0412\u044b\u0433\u0440\u0443\u0437\u043a\u0430 \u0432 \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u044b\u0435 \u0440\u0435\u0441\u0443\u0440\u0441\u044b')),
                ('toll_resources', models.BooleanField(default=False, verbose_name='\u0412\u044b\u0433\u0440\u0443\u0437\u043a\u0430 \u0432 \u043f\u043b\u0430\u0442\u043d\u044b\u0435 \u0440\u0435\u0441\u0443\u0440\u0441\u044b')),
                ('comment', models.CharField(max_length=300, verbose_name='\u0414\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u0430\u044f \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f', blank=True)),
                ('author', models.ForeignKey(related_name='authors_oders', verbose_name='\u0421\u043e\u0437\u0434\u0430\u0442\u0435\u043b\u044c', to=settings.AUTH_USER_MODEL)),
                ('bank', models.ForeignKey(verbose_name='\u0411\u0430\u043d\u043a', blank=True, to='crmreapp.Bank', null=True)),
                ('client', models.ForeignKey(verbose_name='\u041a\u043b\u0438\u0435\u043d\u0442', to='crmreapp.Clients')),
                ('contract_type', models.ForeignKey(verbose_name='\u0422\u0438\u043f \u0434\u043e\u0433\u043e\u0432\u043e\u0440\u0430', blank=True, to='crmreapp.ContractType', null=True)),
                ('object_category', models.ForeignKey(verbose_name='\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f \u043e\u0431\u044a\u0435\u043a\u0442\u0430', to='crmreapp.ObjectCategory')),
                ('performer', models.ForeignKey(related_name='performers_oders', verbose_name='\u0418\u0441\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c', blank=True, to=settings.AUTH_USER_MODEL, null=True)),
            ],
            options={
                'ordering': ['create_date'],
                'verbose_name_plural': '\u0417\u0430\u044f\u0432\u043a\u0438 \u043d\u0430 \u043f\u043e\u043a\u0443\u043f\u043a\u0443',
                'permissions': (('view_all_orders-buy', 'View all Orders Buy'), ('view_free_orders-buy', 'View free Orders Buy'), ('view_my_orders-buy', 'View my Orders Buy'), ('change_all_orders-buy', 'Change all Orders Buy'), ('share_orders-buy', 'Share Orders Buy'), ('credit_manager', 'Credit manager'), ('show_support', 'Show support'), ('create_order_active', 'Create order active'), ('lock_orders-buy', 'Lock Orders Buy'), ('reports_all_view', 'Reports all view'), ('rating_agent', 'Rating agent'), ('brigadier', 'Brigadier')),
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='OrdersSale',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('index', models.CharField(unique=True, max_length=9, verbose_name='\u041d\u043e\u043c\u0435\u0440', blank=True)),
                ('heading', models.CharField(max_length=80, verbose_name='\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0437\u0430\u044f\u0432\u043a\u0438')),
                ('description', models.CharField(max_length=600, verbose_name='\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0437\u0430\u044f\u0432\u043a\u0438', blank=True)),
                ('create_date', models.DateField(verbose_name='\u0414\u0430\u0442\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f')),
                ('modification_date', models.DateField(verbose_name='\u0414\u0430\u0442\u0430 \u043f\u043e\u0441\u043b\u0435\u0434\u043d\u0435\u0439 \u043c\u043e\u0434\u0438\u0444\u0438\u043a\u0430\u0446\u0438\u0438')),
                ('total_space', models.DecimalField(null=True, verbose_name='\u041e\u0431\u0449\u0430\u044f \u043f\u043b\u043e\u0449\u0430\u0434\u044c', max_digits=8, decimal_places=2, blank=True)),
                ('price', models.DecimalField(null=True, verbose_name='\u0426\u0435\u043d\u0430', max_digits=10, decimal_places=2, blank=True)),
                ('only_support', models.BooleanField(default=False, verbose_name='\u0422\u043e\u043b\u044c\u043a\u043e \u0441\u043e\u043f\u0440\u043e\u0432\u043e\u0436\u0434\u0435\u043d\u0438\u0435')),
                ('show_support', models.BooleanField(default=False, verbose_name='\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u044e\u0440\u0438\u0441\u0442\u0443')),
                ('house_number', models.CharField(max_length=10, verbose_name='\u041d\u043e\u043c\u0435\u0440 \u0434\u043e\u043c\u0430', blank=True)),
                ('house_apartment', models.CharField(max_length=5, verbose_name='\u041d\u043e\u043c\u0435\u0440 \u043a\u0432\u0430\u0440\u0442\u0438\u0440\u044b', blank=True)),
                ('certificate_title', models.CharField(max_length=30, verbose_name='\u0421\u0432\u0438\u0434\u0435\u0442\u0435\u043b\u044c\u0441\u0442\u0432\u043e \u043e \u043f\u0440\u0430\u0432\u0435 \u0441\u043e\u0431\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0441\u0442\u0438', blank=True)),
                ('certificate_date', models.DateField(null=True, verbose_name='\u0414\u0430\u0442\u0430 \u0441\u0432\u0438\u0434\u0435\u0442\u0435\u043b\u044c\u0441\u0442\u0432\u0430', blank=True)),
                ('cadastre_number', models.CharField(max_length=30, verbose_name='\u041a\u0430\u0434\u0430\u0441\u0442\u0440\u043e\u0432\u044b\u0439 \u043d\u043e\u043c\u0435\u0440 \u0437\u0435\u043c\u0435\u043b\u044c\u043d\u043e\u0433\u043e \u0443\u0447\u0430\u0441\u0442\u043a\u0430', blank=True)),
                ('comment', models.CharField(max_length=300, verbose_name='\u0414\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u0430\u044f \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f', blank=True)),
                ('location', models.CharField(max_length=100, verbose_name='\u041c\u0435\u0441\u0442\u043e \u0440\u0430\u0441\u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u044f', blank=True)),
                ('access_redline', models.BooleanField(default=None, verbose_name='\u0412\u044b\u0445\u043e\u0434 \u043d\u0430 \u043a\u0440\u0430\u0441\u043d\u0443\u044e \u043b\u0438\u043d\u0438\u044e')),
                ('rating', models.IntegerField(null=True, verbose_name='\u041e\u0446\u0435\u043d\u043a\u0430 \u0440\u0430\u0431\u043e\u0442\u044b', blank=True)),
                ('rating_comment', models.CharField(max_length=100, verbose_name='\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439 \u043a \u043e\u0446\u0435\u043d\u043a\u0435', blank=True)),
                ('contract_number', models.CharField(max_length=20, verbose_name='\u041d\u043e\u043c\u0435\u0440 \u0434\u043e\u0433\u043e\u0432\u043e\u0440\u0430', blank=True)),
                ('contract_date', models.DateField(null=True, verbose_name='\u0414\u0430\u0442\u0430 \u0434\u043e\u0433\u043e\u0432\u043e\u0440\u0430', blank=True)),
                ('contract_end_date', models.DateField(null=True, verbose_name='\u0414\u0430\u0442\u0430 \u043e\u043a\u043e\u043d\u0447\u0430\u043d\u0438\u044f \u0434\u043e\u0433\u043e\u0432\u043e\u0440\u0430', blank=True)),
                ('transaction_type', models.BooleanField(default=None, verbose_name='\u0422\u0438\u043f \u0441\u0434\u0435\u043b\u043a\u0438', choices=[(True, '\u041f\u0440\u043e\u0434\u0430\u0436\u0430'), (False, '\u0410\u0440\u0435\u043d\u0434\u0430')])),
                ('commission', models.BooleanField(default=None, verbose_name='\u0412\u043a\u043b\u044e\u0447\u0430\u0442\u044c \u043a\u043e\u043c\u0438\u0441\u0441\u0438\u043e\u043d\u043d\u044b\u0435')),
                ('commission_type', models.BooleanField(default=None, verbose_name='\u0422\u0438\u043f \u043a\u043e\u043c\u043c\u0438\u0441\u0441\u0438\u043e\u043d\u043d\u044b\u0445', choices=[(True, '\u041f\u0440\u043e\u0446\u0435\u043d\u0442'), (False, '\u0424\u0438\u043a\u0441\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439')])),
                ('commission_price', models.DecimalField(null=True, verbose_name='\u0417\u043d\u0430\u0447\u0435\u043d\u0438\u0435 \u043a\u043e\u043c\u043c\u0438\u0441\u0438\u043e\u043d\u043d\u044b\u0445', max_digits=8, decimal_places=2, blank=True)),
                ('other_agency', models.BooleanField(default=None, verbose_name='\u0417\u0430\u0434\u0435\u0439\u0441\u0442\u0432\u043e\u0432\u0430\u0442\u044c \u0434\u0440\u0443\u0433\u0438\u0435 \u0430\u0433\u0435\u043d\u0441\u0442\u0432\u0430')),
                ('agency_commission', models.BooleanField(default=None, verbose_name='\u0412\u043a\u043b\u044e\u0447\u0430\u0442\u044c \u043a\u043e\u043c\u0438\u0441\u0441\u0438\u043e\u043d\u043d\u044b\u0435')),
                ('agency_commission_type', models.BooleanField(default=None, verbose_name='\u0422\u0438\u043f \u043a\u043e\u043c\u0438\u0441\u0441\u0438\u043e\u043d\u043d\u044b\u0445', choices=[(True, '\u041f\u0440\u043e\u0446\u0435\u043d\u0442'), (False, '\u0424\u0438\u043a\u0441\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439')])),
                ('agency_commission_price', models.DecimalField(null=True, verbose_name='\u0417\u043d\u0430\u0447\u0435\u043d\u0438\u0435 \u043a\u043e\u043c\u043c\u0438\u0441\u0438\u043e\u043d\u043d\u044b\u0445', max_digits=8, decimal_places=2, blank=True)),
                ('auction', models.BooleanField(default=True, verbose_name='\u0422\u043e\u0440\u0433')),
                ('remoteness_center', models.IntegerField(null=True, verbose_name='\u0423\u0434\u0430\u043b\u0435\u043d\u043d\u043e\u0441\u0442\u044c \u043e\u0442 \u0446\u0435\u043d\u0442\u0440\u0430', blank=True)),
                ('construction_stage', models.BooleanField(default=True, verbose_name='\u0421\u0442\u0430\u0434\u0438\u044f \u0441\u0442\u0440\u043e\u0438\u0442\u0435\u043b\u044c\u0441\u0442\u0432\u0430')),
                ('delivery_period', models.CharField(max_length=30, verbose_name='\u0421\u0440\u043e\u043a \u0441\u0434\u0430\u0447\u0438', blank=True)),
                ('number_rooms', models.IntegerField(null=True, verbose_name='\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u043a\u043e\u043c\u043d\u0430\u0442', blank=True)),
                ('floors', models.IntegerField(null=True, verbose_name='\u042d\u0442\u0430\u0436\u0435\u0439', blank=True)),
                ('floor', models.IntegerField(null=True, verbose_name='\u042d\u0442\u0430\u0436', blank=True)),
                ('living_space', models.DecimalField(null=True, verbose_name='\u0416\u0438\u043b\u0430\u044f \u043f\u043b\u043e\u0449\u0430\u0434\u044c', max_digits=8, decimal_places=2, blank=True)),
                ('kitchen_space', models.DecimalField(null=True, verbose_name='\u041f\u043b\u043e\u0449\u0430\u0434\u044c \u043a\u0443\u0445\u043d\u0438', max_digits=8, decimal_places=2, blank=True)),
                ('balcony_space', models.DecimalField(null=True, verbose_name='\u041f\u043b\u043e\u0449\u0430\u0434\u044c \u0431\u0430\u043b\u043a\u043e\u043d\u043e\u0432', max_digits=6, decimal_places=2, blank=True)),
                ('landplot_space', models.DecimalField(null=True, verbose_name='\u041f\u043b\u043e\u0449\u0430\u0434\u044c \u0437\u0435\u043c\u0435\u043b\u044c\u043d\u043e\u0433\u043e \u0443\u0447\u0430\u0441\u0442\u043a\u0430', max_digits=8, decimal_places=2, blank=True)),
                ('landplot_property', models.BooleanField(default=True, verbose_name='\u0417\u0435\u043c\u043b\u044f \u0432 \u0441\u043e\u0431\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0441\u0442\u0438')),
                ('ceiling_height', models.DecimalField(null=True, verbose_name='\u0412\u044b\u0441\u043e\u0442\u0430 \u043f\u043e\u0442\u043e\u043b\u043a\u0430', max_digits=4, decimal_places=1, blank=True)),
                ('lift', models.BooleanField(default=True, verbose_name='\u041b\u0438\u0444\u0442')),
                ('garbage_chute', models.BooleanField(default=False, verbose_name='\u041c\u0443\u0441\u043e\u0440\u043e\u043f\u0440\u043e\u0432\u043e\u0434')),
                ('laundry', models.BooleanField(default=False, verbose_name='\u041f\u0440\u0430\u0447\u0435\u0447\u043d\u0430\u044f')),
                ('garage', models.BooleanField(default=False, verbose_name='\u0413\u0430\u0440\u0430\u0436')),
                ('property', models.CharField(max_length=120, verbose_name='\u0418\u043c\u0443\u0449\u0435\u0441\u0442\u0432\u043e', blank=True)),
                ('environment', models.CharField(max_length=150, verbose_name='\u041e\u043a\u0440\u0443\u0436\u0435\u043d\u0438\u0435', blank=True)),
                ('ventilation', models.BooleanField(default=False, verbose_name='\u0412\u0435\u043d\u0442\u0438\u043b\u044f\u0446\u0438\u044f')),
                ('firefighting', models.BooleanField(default=False, verbose_name='\u041f\u043e\u0436\u0430\u0440\u043e\u0442\u0443\u0448\u0435\u043d\u0438\u0435')),
                ('number_loading_zones', models.IntegerField(null=True, verbose_name='\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0437\u043e\u043d \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0438', blank=True)),
                ('electric_power', models.IntegerField(null=True, verbose_name='\u042d\u043b\u0435\u043a\u0442\u0440\u0438\u0447\u0435\u0441\u043a\u0430\u044f \u043c\u043e\u0449\u043d\u043e\u0441\u0442\u044c', blank=True)),
                ('sanitation', models.BooleanField(default=True, verbose_name='\u0412\u043e\u0434\u043e\u043f\u0440\u043e\u0432\u043e\u0434 \u0438 \u043a\u0430\u043d\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u044f')),
                ('branch_line', models.BooleanField(default=True, verbose_name='\u0416\u0435\u043b\u0435\u0437\u043d\u043e\u0434\u043e\u0440\u043e\u0436\u043d\u0430\u044f \u0432\u0435\u0442\u043a\u0430')),
                ('rampant', models.BooleanField(default=True, verbose_name='\u041f\u0430\u043d\u0434\u0443\u0441')),
                ('handling_equipment', models.BooleanField(default=True, verbose_name='\u041f\u043e\u0433\u0440\u0443\u0437\u043e\u0447\u043d\u043e\u0435 \u043e\u0431\u043e\u0440\u0443\u0434\u043e\u0432\u0430\u043d\u0438\u0435')),
                ('area_maneuvering', models.BooleanField(default=False, verbose_name='\u041f\u043b\u043e\u0449\u0430\u0434\u043a\u0430 \u0434\u043b\u044f \u043c\u0430\u043d\u0435\u0432\u0440\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f')),
                ('parking', models.BooleanField(default=False, verbose_name='\u041f\u0430\u0440\u043a\u043e\u0432\u043a\u0430')),
                ('telephone_communication', models.BooleanField(default=False, verbose_name='\u0422\u0435\u043b\u0435\u0444\u043e\u043d\u043d\u0430\u044f \u0441\u0432\u044f\u0437\u044c')),
                ('internet', models.BooleanField(default=False, verbose_name='\u0418\u043d\u0442\u0435\u0440\u043d\u0435\u0442')),
                ('gasification', models.BooleanField(default=False, verbose_name='\u0413\u0430\u0437\u0438\u0444\u0438\u043a\u0430\u0446\u0438\u044f')),
                ('plumbing', models.BooleanField(default=False, verbose_name='\u0412\u043e\u0434\u043e\u043f\u0440\u043e\u0432\u043e\u0434')),
                ('well', models.BooleanField(default=False, verbose_name='\u0421\u043a\u0430\u0436\u0438\u043d\u0430')),
                ('sewerage', models.BooleanField(default=False, verbose_name='\u041a\u0430\u043d\u0430\u043b\u0438\u0437\u0430\u0446\u0438\u044f')),
                ('reclamation', models.BooleanField(default=False, verbose_name='\u041c\u0435\u043b\u0438\u043e\u0440\u0430\u0446\u0438\u044f')),
                ('pond', models.BooleanField(default=False, verbose_name='\u0412\u043e\u0434\u043e\u0435\u043c')),
                ('resources', models.CharField(max_length=120, verbose_name='\u0420\u0435\u0441\u0443\u0440\u0441\u044b', blank=True)),
                ('current_yield', models.DecimalField(null=True, verbose_name='\u0422\u0435\u043a\u0443\u0449\u0430\u044f \u0434\u043e\u0445\u043e\u0434\u043d\u043e\u0441\u0442\u044c', max_digits=8, decimal_places=2, blank=True)),
                ('current_expenses', models.DecimalField(null=True, verbose_name='\u0422\u0435\u043a\u0443\u0449\u0438\u0435 \u0437\u0430\u0442\u0440\u0430\u0442\u044b', max_digits=8, decimal_places=2, blank=True)),
                ('founding_date', models.DateField(null=True, verbose_name='\u0414\u0430\u0442\u0430 \u043e\u0441\u043d\u043e\u0432\u0430\u043d\u0438\u044f', blank=True)),
                ('classified_resources', models.BooleanField(default=False, verbose_name='\u0412\u044b\u0433\u0440\u0443\u0437\u043a\u0430 \u0432 \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u044b\u0435 \u0440\u0435\u0441\u0443\u0440\u0441\u044b')),
                ('toll_resources', models.BooleanField(default=False, verbose_name='\u0412\u044b\u0433\u0440\u0443\u0437\u043a\u0430 \u0432 \u043f\u043b\u0430\u0442\u043d\u044b\u0435 \u0440\u0435\u0441\u0443\u0440\u0441\u044b')),
                ('author', models.ForeignKey(related_name='authors_orders_sale', verbose_name='\u0421\u043e\u0437\u0434\u0430\u0442\u0435\u043b\u044c', to=settings.AUTH_USER_MODEL)),
                ('balcony', models.ForeignKey(verbose_name='\u0411\u0430\u043b\u043a\u043e\u043d', blank=True, to='crmreapp.Balcony', null=True)),
                ('bathroom', models.ForeignKey(verbose_name='\u0421\u0430\u043d\u0443\u0437\u0435\u043b', blank=True, to='crmreapp.Bathroom', null=True)),
                ('category_earth', models.ForeignKey(verbose_name='\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f \u0437\u0435\u043c\u043b\u0438', blank=True, to='crmreapp.CategoryEarth', null=True)),
                ('city', models.ForeignKey(verbose_name='\u0413\u043e\u0440\u043e\u0434', blank=True, to='crmreapp.City', null=True)),
                ('client', models.ForeignKey(verbose_name='\u0421\u043e\u0431\u0441\u0442\u0432\u0435\u043d\u043d\u0438\u043a', to='crmreapp.Clients')),
                ('condition', models.ForeignKey(verbose_name='\u0421\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u0435', blank=True, to='crmreapp.Condition', null=True)),
                ('construction_organization', models.ForeignKey(verbose_name='\u0421\u0442\u0440\u043e\u0438\u0442\u0435\u043b\u044c\u043d\u0430\u044f \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u044f', blank=True, to='crmreapp.ConstructionOrganization', null=True)),
                ('constructions', models.ForeignKey(verbose_name='\u041f\u043e\u0441\u0442\u0440\u043e\u0439\u043a\u0438', blank=True, to='crmreapp.Constructions', null=True)),
                ('contract_type', models.ForeignKey(verbose_name='\u0422\u0438\u043f \u0434\u043e\u0433\u043e\u0432\u043e\u0440\u0430', blank=True, to='crmreapp.ContractType', null=True)),
                ('district', models.ForeignKey(verbose_name='\u0420\u0430\u0439\u043e\u043d', blank=True, to='crmreapp.District', null=True)),
                ('encumbrance', models.ForeignKey(verbose_name='\u041e\u0431\u0440\u0435\u043c\u0435\u043d\u0435\u043d\u0438\u0435', blank=True, to='crmreapp.Encumbrance', null=True)),
                ('fencing', models.ForeignKey(verbose_name='\u041e\u0433\u0440\u0430\u0436\u0434\u0435\u043d\u0438\u0435', blank=True, to='crmreapp.Fencing', null=True)),
                ('flooring', models.ForeignKey(verbose_name='\u041f\u043e\u043b', blank=True, to='crmreapp.Flooring', null=True)),
                ('green_plantings', models.ForeignKey(verbose_name='\u0417\u0435\u043b\u0435\u043d\u044b\u0435 \u043d\u0430\u0441\u0430\u0436\u0434\u0435\u043d\u0438\u044f', blank=True, to='crmreapp.GreenPlantings', null=True)),
                ('heating', models.ForeignKey(related_name='heating', verbose_name='\u041e\u0442\u043e\u043f\u043b\u0435\u043d\u0438\u0435', blank=True, to='crmreapp.Heating', null=True)),
                ('hot_water', models.ForeignKey(related_name='hot_water', verbose_name='\u0413\u043e\u0440\u044f\u0447\u0430\u044f \u0432\u043e\u0434\u0430', blank=True, to='crmreapp.Heating', null=True)),
                ('layout_rooms', models.ForeignKey(verbose_name='\u0420\u0430\u0441\u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u043a\u043e\u043c\u043d\u0430\u0442', blank=True, to='crmreapp.LayoutRooms', null=True)),
                ('lease', models.ForeignKey(verbose_name='\u0421\u0440\u043e\u043a \u0430\u0440\u0435\u043d\u0434\u044b', blank=True, to='crmreapp.Lease', null=True)),
                ('material_walls', models.ForeignKey(verbose_name='\u041c\u0430\u0442\u0435\u0440\u0438\u0430\u043b \u0441\u0442\u0435\u043d', blank=True, to='crmreapp.MaterialWalls', null=True)),
                ('method_payment', models.ForeignKey(verbose_name='\u041c\u0435\u0442\u043e\u0434 \u043e\u043f\u043b\u0430\u0442\u044b', blank=True, to='crmreapp.MethodPayment', null=True)),
                ('microdistrict', models.ForeignKey(verbose_name='\u041c\u0438\u043a\u0440\u043e\u0440\u0430\u0439\u043e\u043d', blank=True, to='crmreapp.Microdistrict', null=True)),
                ('nds_type', models.ForeignKey(verbose_name='\u0422\u0438\u043f \u041d\u0414\u0421', blank=True, to='crmreapp.NdsType', null=True)),
                ('object_accessory', models.ForeignKey(verbose_name='\u041f\u0440\u0438\u043d\u0430\u0434\u043b\u0435\u0436\u043d\u043e\u0441\u0442\u044c \u043e\u0431\u044a\u0435\u043a\u0442\u0430', blank=True, to='crmreapp.ObjectAccessory', null=True)),
                ('object_category', models.ForeignKey(verbose_name='\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f \u043e\u0431\u044a\u0435\u043a\u0442\u0430', to='crmreapp.ObjectCategory')),
                ('object_type', models.ForeignKey(verbose_name='\u0422\u0438\u043f \u043e\u0431\u044a\u0435\u043a\u0442\u0430', to='crmreapp.ObjectType')),
            ],
            options={
                'ordering': ['create_date'],
                'verbose_name_plural': '\u0417\u0430\u044f\u0432\u043a\u0438 \u043d\u0430 \u043f\u0440\u043e\u0434\u0430\u0436\u0443',
                'permissions': (('view_all_orders-sale', 'View all Orders Sale'), ('view_free_orders-sale', 'View free Orders Sale'), ('view_my_orders-sale', 'View my Orders Sale'), ('change_all_orders-sale', 'Change all Orders Sale'), ('share_orders-sale', 'Share Orders Sale'), ('lock_orders-sale', 'Lock Orders Sale'), ('uploading_orders-sale', 'Uploading Orders Sale')),
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='OrderStatus',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30, verbose_name='\u0421\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u044f\u0432\u043a\u0438')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0421\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u044f\u0432\u043a\u0438',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='OwnershipType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30, verbose_name='\u0412\u0438\u0434 \u043f\u0440\u0430\u0432\u0430')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0412\u0438\u0434 \u043f\u0440\u0430\u0432\u0430',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Photos',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('description', models.CharField(max_length=30, verbose_name='\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435')),
                ('photo', imagekit.models.fields.ProcessedImageField(upload_to=crmreapp.models.get_file_name)),
                ('object', models.ForeignKey(verbose_name='\u041e\u0431\u044a\u0435\u043a\u0442', to='crmreapp.OrdersSale')),
            ],
            options={
                'ordering': ['description'],
                'verbose_name_plural': '\u0424\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0438',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Planishing',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30, verbose_name='\u041f\u043b\u0430\u043d\u0438\u0440\u043e\u0432\u043a\u0430')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u041f\u043b\u0430\u043d\u0438\u0440\u043e\u0432\u043a\u0430',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Priority',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30, verbose_name='\u041f\u0440\u0438\u043e\u0440\u0438\u0442\u0435\u0442')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u041f\u0438\u043e\u0440\u0438\u0442\u0435\u0442 \u0437\u0430\u0434\u0430\u0447\u0438',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Refinishing',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30, verbose_name='\u041e\u0442\u0434\u0435\u043b\u043a\u0430')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u041e\u0442\u0434\u0435\u043b\u043a\u0430',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ResultOperation',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=20, verbose_name='\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ResultSentence',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30, verbose_name='\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442 \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u044f')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442 \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u044f',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ResultShow',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30, verbose_name='\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442 \u043f\u043e\u043a\u0430\u0437\u0430')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442 \u043f\u043e\u043a\u0430\u0437\u0430',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Road',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30, verbose_name='\u0414\u043e\u0440\u043e\u0433\u0430')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0414\u043e\u0440\u043e\u0433\u0430',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='SmsMessages',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=300, verbose_name='\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435')),
                ('type', models.ForeignKey(verbose_name='\u0422\u0438\u043f \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f', to='crmreapp.MessageType')),
            ],
            options={
                'ordering': ['pk'],
                'verbose_name_plural': '\u0421\u041c\u0421 \u0440\u0430\u0441\u0441\u044b\u043b\u043a\u0430',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Sphere',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=110, verbose_name='\u0421\u0444\u0435\u0440\u0430 \u0434\u0435\u044f\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u0438')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0421\u0444\u0435\u0440\u0430 \u0434\u0435\u044f\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u0438',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Street',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=40, verbose_name='\u041d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0435')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0423\u043b\u0438\u0446\u0430',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='TaskComments',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('comment', models.CharField(max_length=100, verbose_name='\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439')),
                ('create_date', models.DateField(verbose_name='\u0414\u0430\u0442\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f')),
                ('author', models.ForeignKey(verbose_name='\u0410\u0432\u0442\u043e\u0440', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['pk'],
                'verbose_name_plural': '\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0438 \u043a \u0437\u0430\u0434\u0430\u0447\u0435',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='TaskHistory',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('comment', models.CharField(max_length=100, verbose_name='\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439')),
                ('create_date', models.DateField(verbose_name='\u0414\u0430\u0442\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f')),
                ('corrector', models.ForeignKey(verbose_name='\u041a\u043e\u0440\u0440\u0435\u043a\u0442\u043e\u0440', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['pk'],
                'verbose_name_plural': '\u0418\u0441\u0442\u043e\u0440\u0438\u044f \u0437\u0430\u0434\u0430\u0447\u0438',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Tasks',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('heading', models.CharField(max_length=80, verbose_name='\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a')),
                ('description', models.CharField(max_length=160, verbose_name='\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435')),
                ('create_date', models.DateField(verbose_name='\u0414\u0430\u0442\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f')),
                ('execution_date', models.DateField(verbose_name='\u0414\u0430\u0442\u0430 \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f')),
                ('author', models.ForeignKey(related_name='author', verbose_name='\u0410\u0432\u0442\u043e\u0440', to=settings.AUTH_USER_MODEL)),
                ('performer', models.ForeignKey(related_name='performer', verbose_name='\u0418\u0441\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c', to=settings.AUTH_USER_MODEL)),
                ('priority', models.ForeignKey(verbose_name='\u041f\u0440\u0438\u043e\u0440\u0438\u0442\u0435\u0442', to='crmreapp.Priority')),
            ],
            options={
                'ordering': ['create_date'],
                'verbose_name_plural': '\u0417\u0430\u0434\u0430\u0447\u0438',
                'permissions': (('view_all_tasks', 'View all tasks'),),
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='TaskStatus',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30, verbose_name='\u0421\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u0434\u0430\u0447\u0438')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0421\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u0434\u0430\u0447\u0438',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Windows',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30, verbose_name='\u041e\u043a\u043d\u0430')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u041e\u043a\u043d\u0430',
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='tasks',
            name='status',
            field=models.ForeignKey(verbose_name='\u0421\u0442\u0430\u0442\u0443\u0441', to='crmreapp.TaskStatus'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='taskhistory',
            name='status',
            field=models.ForeignKey(related_name='status', verbose_name='\u0421\u0442\u0430\u0442\u0443\u0441', to='crmreapp.TaskStatus'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='taskhistory',
            name='task',
            field=models.ForeignKey(verbose_name='\u0417\u0430\u0434\u0430\u0447\u0430', to='crmreapp.Tasks'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='taskcomments',
            name='task',
            field=models.ForeignKey(verbose_name='\u0417\u0430\u0434\u0430\u0447\u0430', to='crmreapp.Tasks'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='orderssale',
            name='ownership_type',
            field=models.ForeignKey(verbose_name='\u0412\u0438\u0434 \u043f\u0440\u0430\u0432\u0430', blank=True, to='crmreapp.OwnershipType', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='orderssale',
            name='performer',
            field=models.ForeignKey(related_name='performers_orders_sale', verbose_name='\u0418\u0441\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c', blank=True, to=settings.AUTH_USER_MODEL, null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='orderssale',
            name='planishing',
            field=models.ForeignKey(verbose_name='\u041f\u043b\u0430\u043d\u0438\u0440\u043e\u0432\u043a\u0430', blank=True, to='crmreapp.Planishing', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='orderssale',
            name='refinishing',
            field=models.ForeignKey(verbose_name='\u041e\u0442\u0434\u0435\u043b\u043a\u0430', blank=True, to='crmreapp.Refinishing', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='orderssale',
            name='road',
            field=models.ForeignKey(verbose_name='\u0414\u043e\u0440\u043e\u0433\u0430', blank=True, to='crmreapp.Road', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='orderssale',
            name='status',
            field=models.ForeignKey(verbose_name='\u0421\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u044f\u0432\u043a\u0438', to='crmreapp.OrderStatus'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='orderssale',
            name='street',
            field=models.ForeignKey(verbose_name='\u0413\u043e\u0440\u043e\u0434', blank=True, to='crmreapp.Street', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='orderssale',
            name='windows',
            field=models.ForeignKey(verbose_name='\u041e\u043a\u043d\u0430', blank=True, to='crmreapp.Windows', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='ordersbuy',
            name='status',
            field=models.ForeignKey(verbose_name='\u0421\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u044f\u0432\u043a\u0438', to='crmreapp.OrderStatus'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='offer',
            name='order_buy',
            field=models.ForeignKey(verbose_name='\u0417\u0430\u044f\u0432\u043a\u0430 \u043d\u0430 \u043f\u043e\u043a\u0443\u043f\u043a\u0443', to='crmreapp.OrdersBuy'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='offer',
            name='order_sale',
            field=models.ForeignKey(verbose_name='\u0417\u0430\u044f\u0432\u043a\u0430 \u043d\u0430 \u043f\u0440\u043e\u0434\u0430\u0436\u0443', to='crmreapp.OrdersSale'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='liststreet',
            name='orders',
            field=models.ForeignKey(verbose_name='\u0417\u0430\u044f\u0432\u043a\u0430', to='crmreapp.OrdersBuy'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='liststreet',
            name='street',
            field=models.ForeignKey(verbose_name='\u0423\u043b\u0438\u0446\u0430', to='crmreapp.Street'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='listrooms',
            name='orders',
            field=models.ForeignKey(verbose_name='\u0417\u0430\u044f\u0432\u043a\u0430', to='crmreapp.OrdersBuy'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='listobjecttype',
            name='object_type',
            field=models.ForeignKey(verbose_name='\u0422\u0438\u043f \u043e\u0431\u044a\u0435\u043a\u0442\u0430', to='crmreapp.ObjectType'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='listobjecttype',
            name='orders',
            field=models.ForeignKey(verbose_name='\u0417\u0430\u044f\u0432\u043a\u0430', to='crmreapp.OrdersBuy'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='listmicrodistrict',
            name='microdistrict',
            field=models.ForeignKey(verbose_name='\u041c\u0438\u043a\u0440\u043e\u0440\u0430\u0439\u043e\u043d', to='crmreapp.Microdistrict'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='listmicrodistrict',
            name='orders',
            field=models.ForeignKey(verbose_name='\u0417\u0430\u044f\u0432\u043a\u0430', to='crmreapp.OrdersBuy'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='listdistrict',
            name='orders',
            field=models.ForeignKey(verbose_name='\u0417\u0430\u044f\u0432\u043a\u0430', to='crmreapp.OrdersBuy'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='listcity',
            name='orders',
            field=models.ForeignKey(verbose_name='\u0417\u0430\u044f\u0432\u043a\u0430', to='crmreapp.OrdersBuy'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='hystoryshow',
            name='offer',
            field=models.ForeignKey(verbose_name='\u041f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u0435', to='crmreapp.Offer'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='hystoryshow',
            name='result',
            field=models.ForeignKey(verbose_name='\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442 \u043f\u043e\u043a\u0430\u0437\u0430', blank=True, to='crmreapp.ResultShow', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='hystoryservice',
            name='offer',
            field=models.ForeignKey(verbose_name='\u041f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u0435', to='crmreapp.Offer'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='hystoryservice',
            name='operation',
            field=models.ForeignKey(verbose_name='\u0422\u0438\u043f \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438', to='crmreapp.OperationType'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='hystoryservice',
            name='result_operation',
            field=models.ForeignKey(verbose_name='\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438', to='crmreapp.ResultOperation'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='hystoryordersalestatus',
            name='order',
            field=models.ForeignKey(verbose_name='\u0417\u0430\u044f\u0432\u043a\u0430', to='crmreapp.OrdersSale'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='hystoryordersalestatus',
            name='status',
            field=models.ForeignKey(verbose_name='\u041d\u043e\u0432\u044b\u0439 \u0441\u0442\u0430\u0442\u0443\u0441', to='crmreapp.OrderStatus'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='hystoryorderbuystatus',
            name='order',
            field=models.ForeignKey(verbose_name='\u0417\u0430\u044f\u0432\u043a\u0430', to='crmreapp.OrdersBuy'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='hystoryorderbuystatus',
            name='status',
            field=models.ForeignKey(verbose_name='\u041d\u043e\u0432\u044b\u0439 \u0441\u0442\u0430\u0442\u0443\u0441', to='crmreapp.OrderStatus'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='hystoryoffer',
            name='offer',
            field=models.ForeignKey(verbose_name='\u041f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u0435', to='crmreapp.Offer'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='hystoryoffer',
            name='result',
            field=models.ForeignKey(verbose_name='\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442 \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u044f', to='crmreapp.ResultSentence'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='emailmessages',
            name='type',
            field=models.ForeignKey(verbose_name='\u0422\u0438\u043f \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f', to='crmreapp.MessageType'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='clients',
            name='info_source',
            field=models.ForeignKey(verbose_name='\u0418\u0441\u0442\u043e\u0447\u043d\u0438\u043a \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438', blank=True, to='crmreapp.InfoSource', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='clients',
            name='occupation',
            field=models.ForeignKey(verbose_name='\u0420\u043e\u0434 \u0437\u0430\u043d\u044f\u0442\u0438\u0439', blank=True, to='crmreapp.Occupation', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='clients',
            name='sphere',
            field=models.ForeignKey(verbose_name='\u0421\u0444\u0435\u0440\u0430 \u0434\u0435\u044f\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u0438', blank=True, to='crmreapp.Sphere', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='clientcomments',
            name='client',
            field=models.ForeignKey(verbose_name='\u041a\u043b\u0438\u0435\u043d\u0442', to='crmreapp.Clients'),
            preserve_default=True,
        ),
    ]
