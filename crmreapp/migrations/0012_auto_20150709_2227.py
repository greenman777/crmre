# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crmreapp', '0011_auto_20150706_2305'),
    ]

    operations = [
        migrations.AddField(
            model_name='buildings',
            name='reclame1',
            field=models.CharField(max_length=75, verbose_name='\u0420\u0435\u043a\u043b\u0430\u043c\u0430 1', blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='buildings',
            name='reclame2',
            field=models.CharField(max_length=75, verbose_name='\u0420\u0435\u043a\u043b\u0430\u043c\u0430 2', blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='buildings',
            name='reclame3',
            field=models.CharField(max_length=75, verbose_name='\u0420\u0435\u043a\u043b\u0430\u043c\u0430 3', blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='plan',
            name='prompt',
            field=models.CharField(max_length=75, verbose_name='\u041f\u043e\u0434\u0441\u043a\u0430\u0437\u043a\u0430', blank=True),
            preserve_default=True,
        ),
    ]
