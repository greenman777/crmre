# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import crmreapp.models


class Migration(migrations.Migration):

    dependencies = [
        ('crmreapp', '0022_auto_20160306_2311'),
    ]

    operations = [
        migrations.CreateModel(
            name='Documents',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=80, verbose_name='\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u0430')),
                ('file', models.FileField(upload_to=crmreapp.models.get_documents_path, null=True, verbose_name='\u0414\u043e\u043a\u0443\u043c\u0435\u043d\u0442', blank=True)),
                ('offer', models.ForeignKey(verbose_name='\u041f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u0435', to='crmreapp.Offer')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': '\u0428\u0430\u0431\u043b\u043e\u043d\u044b \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u043e\u0432',
            },
        ),
    ]
