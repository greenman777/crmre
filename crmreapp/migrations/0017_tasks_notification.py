# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crmreapp', '0016_orderssale_coordinates_label'),
    ]

    operations = [
        migrations.AddField(
            model_name='tasks',
            name='notification',
            field=models.BooleanField(default=False, verbose_name='\u0421\u0434\u0435\u043b\u0430\u043d\u043e \u043e\u043f\u043e\u0432\u0435\u0449\u0435\u043d\u0438\u0435'),
        ),
    ]
