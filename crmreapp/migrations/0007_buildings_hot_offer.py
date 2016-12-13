# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crmreapp', '0006_auto_20150517_1715'),
    ]

    operations = [
        migrations.AddField(
            model_name='buildings',
            name='hot_offer',
            field=models.BooleanField(default=False, verbose_name='\u041f\u0435\u0447\u0430\u0442\u044c 2'),
            preserve_default=True,
        ),
    ]
