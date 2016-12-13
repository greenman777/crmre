# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import crmreauth.models
import imagekit.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('crmreauth', '0002_user_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='photo',
            field=imagekit.models.fields.ProcessedImageField(upload_to=crmreauth.models.get_user_photo_name, verbose_name='\u0424\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u044f', blank=True),
            preserve_default=True,
        ),
    ]
