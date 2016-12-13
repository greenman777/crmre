# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crmreapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='notifications',
            name='sendsms',
            field=models.BooleanField(default=False, verbose_name='SMS \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435'),
            preserve_default=True,
        ),
    ]
