# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crmreapp', '0014_auto_20151004_1553'),
    ]

    operations = [
        migrations.AlterField(
            model_name='buildings',
            name='reclame1',
            field=models.CharField(max_length=90, verbose_name='\u0420\u0435\u043a\u043b\u0430\u043c\u0430 1', blank=True),
        ),
        migrations.AlterField(
            model_name='buildings',
            name='reclame2',
            field=models.CharField(max_length=90, verbose_name='\u0420\u0435\u043a\u043b\u0430\u043c\u0430 2', blank=True),
        ),
        migrations.AlterField(
            model_name='buildings',
            name='reclame3',
            field=models.CharField(max_length=90, verbose_name='\u0420\u0435\u043a\u043b\u0430\u043c\u0430 3', blank=True),
        ),
    ]
