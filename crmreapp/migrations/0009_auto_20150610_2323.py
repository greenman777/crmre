# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crmreapp', '0008_auto_20150523_2204'),
    ]

    operations = [
        migrations.AddField(
            model_name='buildings',
            name='tour3d',
            field=models.URLField(verbose_name='3D \u0442\u0443\u0440', blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='orderssale',
            name='tour3d',
            field=models.URLField(verbose_name='3D \u0442\u0443\u0440', blank=True),
            preserve_default=True,
        ),
    ]
