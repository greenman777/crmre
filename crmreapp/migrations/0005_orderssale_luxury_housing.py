# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crmreapp', '0004_auto_20150425_1344'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderssale',
            name='luxury_housing',
            field=models.BooleanField(default=False, verbose_name='\u042d\u043b\u0438\u0442\u043d\u043e\u0435 \u0436\u0438\u043b\u044c\u0435'),
            preserve_default=True,
        ),
    ]
