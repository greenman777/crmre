# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crmreapp', '0005_orderssale_luxury_housing'),
    ]

    operations = [
        migrations.AddField(
            model_name='buildings',
            name='caption1',
            field=models.CharField(max_length=50, verbose_name='\u041f\u043e\u0434\u043f\u0438\u0441\u044c 1', blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='buildings',
            name='caption2',
            field=models.CharField(max_length=50, verbose_name='\u041f\u043e\u0434\u043f\u0438\u0441\u044c 2', blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='buildings',
            name='priority',
            field=models.IntegerField(default=20, null=True, verbose_name='\u041f\u0440\u0438\u043e\u0440\u0438\u0442\u0435\u0442', blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='buildings',
            name='stamp1',
            field=models.BooleanField(default=False, verbose_name='\u041f\u0435\u0447\u0430\u0442\u044c 1'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='buildings',
            name='stamp2',
            field=models.BooleanField(default=False, verbose_name='\u041f\u0435\u0447\u0430\u0442\u044c 2'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='orderssale',
            name='hot_offer',
            field=models.BooleanField(default=False, verbose_name='\u0413\u043e\u0440\u044f\u0447\u0435\u0435 \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u0435'),
            preserve_default=True,
        ),
    ]
