# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crmreapp', '0010_auto_20150622_0253'),
    ]

    operations = [
        migrations.AlterField(
            model_name='buildings',
            name='description',
            field=models.CharField(max_length=6000, verbose_name='\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043d\u043e\u0432\u043e\u0441\u0442\u0440\u043e\u0439\u043a\u0438', blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='buildings',
            name='finish',
            field=models.CharField(max_length=1000, verbose_name='\u041e\u0442\u0434\u0435\u043b\u043a\u0430', blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='ordersbuy',
            name='description',
            field=models.CharField(max_length=1200, verbose_name='\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0437\u0430\u044f\u0432\u043a\u0438', blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='orderssale',
            name='description',
            field=models.CharField(max_length=1200, verbose_name='\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0437\u0430\u044f\u0432\u043a\u0438', blank=True),
            preserve_default=True,
        ),
    ]
