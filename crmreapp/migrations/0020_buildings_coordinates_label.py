# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crmreapp', '0019_avitodistrict'),
    ]

    operations = [
        migrations.AddField(
            model_name='buildings',
            name='coordinates_label',
            field=models.CharField(max_length=15, verbose_name='\u041a\u043e\u043e\u0440\u0434\u0438\u043d\u0430\u0442\u044b \u043c\u0435\u0442\u043a\u0438', blank=True),
        ),
    ]
