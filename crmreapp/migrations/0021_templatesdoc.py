# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import crmreapp.models


class Migration(migrations.Migration):

    dependencies = [
        ('crmreapp', '0020_buildings_coordinates_label'),
    ]

    operations = [
        migrations.CreateModel(
            name='TemplatesDoc',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=80, verbose_name='\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0448\u0430\u0431\u043b\u043e\u043d\u0430')),
                ('file', models.FileField(upload_to=crmreapp.models.get_file_path, null=True, verbose_name='\u0428\u0430\u0431\u043b\u043e\u043d', blank=True)),
            ],
        ),
    ]
