# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crmreapp', '0012_auto_20150709_2227'),
    ]

    operations = [
        migrations.AlterField(
            model_name='clients',
            name='email',
            field=models.EmailField(max_length=254, verbose_name='E-mail', blank=True),
        ),
        migrations.AlterField(
            model_name='clients',
            name='email_head',
            field=models.EmailField(max_length=254, verbose_name='E-mail \u0440\u0443\u043a\u043e\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044f', blank=True),
        ),
    ]
