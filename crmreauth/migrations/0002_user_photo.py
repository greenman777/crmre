# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import crmreauth.models
import imagekit.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('crmreauth', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='photo',
            field=imagekit.models.fields.ProcessedImageField(upload_to=crmreauth.models.get_user_photo_name, blank=True),
            preserve_default=True,
        ),
    ]
