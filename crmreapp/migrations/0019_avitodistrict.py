# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crmreapp', '0018_plan_commission'),
    ]

    operations = [
        migrations.CreateModel(
            name='AvitoDistrict',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=40, verbose_name='\u041d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0435')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': 'Avito \u0440\u0430\u0439\u043e\u043d',
            },
        ),
    ]
