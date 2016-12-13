# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.utils.timezone
import django.core.validators


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(default=django.utils.timezone.now, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(help_text='Required. 30 characters or fewer. Letters, digits and @/./+/-/_ only.', unique=True, max_length=30, verbose_name='username', validators=[django.core.validators.RegexValidator('^[\\w.@+-]+$', 'Enter a valid username.', 'invalid')])),
                ('first_name', models.CharField(max_length=30, verbose_name='first name', blank=True)),
                ('last_name', models.CharField(max_length=30, verbose_name='last name', blank=True)),
                ('email', models.EmailField(max_length=75, verbose_name='email address', blank=True)),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('phone', models.CharField(max_length=11, verbose_name='\u0422\u0435\u043b\u0435\u0444\u043e\u043d \u043e\u0441\u043d\u043e\u0432\u043d\u043e\u0439', blank=True)),
                ('phone_other', models.CharField(max_length=11, verbose_name='\u0422\u0435\u043b\u0435\u0444\u043e\u043d \u0434\u043e\u043f.', blank=True)),
                ('phone_short', models.CharField(max_length=4, verbose_name='\u041a\u043e\u0440\u043e\u0442\u043a\u0438\u0439 \u043d\u043e\u043c\u0435\u0440', blank=True)),
                ('organization_name', models.CharField(max_length=100, verbose_name='\u041d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0435 \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u0438', blank=True)),
                ('organization_phone', models.CharField(max_length=11, verbose_name='\u0422\u0435\u043b\u0435\u0444\u043e\u043d \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u0438', blank=True)),
                ('organization_fax', models.CharField(max_length=11, verbose_name='\u0424\u0430\u043a\u0441 \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u0438', blank=True)),
                ('business_address', models.CharField(max_length=100, verbose_name='\u0410\u0434\u0440\u0435\u0441 \u043c\u0435\u0441\u0442\u0430 \u0440\u0430\u0431\u043e\u0442\u044b', blank=True)),
                ('position', models.CharField(max_length=30, verbose_name='\u0414\u043e\u043b\u0436\u043d\u043e\u0441\u0442\u044c', blank=True)),
                ('birthday', models.DateField(null=True, verbose_name='\u0414\u0430\u0442\u0430 \u0440\u043e\u0436\u0434\u0435\u043d\u0438\u044f', blank=True)),
                ('sms_notification', models.BooleanField(default=True, verbose_name='\u0421\u041c\u0421 \u043e\u043f\u043e\u0432\u0435\u0449\u0435\u043d\u0438\u0435')),
                ('brigade', models.IntegerField(default=0, null=True, verbose_name='\u0411\u0440\u0438\u0433\u0430\u0434\u0430', blank=True)),
                ('groups', models.ManyToManyField(related_query_name='user', related_name='user_set', to='auth.Group', blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of his/her group.', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(related_query_name='user', related_name='user_set', to='auth.Permission', blank=True, help_text='Specific permissions for this user.', verbose_name='user permissions')),
            ],
            options={
                'ordering': ['last_name', 'first_name'],
                'verbose_name': '\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c',
                'verbose_name_plural': '\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438',
            },
            bases=(models.Model,),
        ),
    ]
