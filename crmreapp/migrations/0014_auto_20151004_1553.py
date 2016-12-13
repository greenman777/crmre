# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crmreapp', '0013_auto_20150831_1354'),
    ]

    operations = [
        migrations.CreateModel(
            name='YandexCategory',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50, verbose_name='\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f \u043e\u0431\u044a\u0435\u043a\u0442\u0430 Yandex')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': 'Yandex \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f \u043e\u0431\u044a\u0435\u043a\u0442\u0430 \u043d\u0435\u0434\u0432\u0438\u0436\u0438\u043c\u043e\u0441\u0442\u0438',
            },
        ),
        migrations.AddField(
            model_name='objecttype',
            name='yandex_category',
            field=models.ForeignKey(blank=True, to='crmreapp.YandexCategory', null=True),
        ),
    ]
