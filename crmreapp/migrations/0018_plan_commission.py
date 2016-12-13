# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crmreapp', '0017_tasks_notification'),
    ]

    operations = [
        migrations.AddField(
            model_name='plan',
            name='commission',
            field=models.DecimalField(null=True, verbose_name='\u0410\u0433\u0435\u043d\u0442\u0441\u043a\u043e\u0435 \u0432\u043e\u0437\u043d\u0430\u0433\u0440\u0430\u0436\u0434\u0435\u043d\u0438\u0435', max_digits=4, decimal_places=2, blank=True),
        ),
    ]
