# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crmreapp', '0003_auto_20150424_0118'),
    ]

    operations = [
        migrations.AddField(
            model_name='plan',
            name='tour3d',
            field=models.URLField(verbose_name='3D \u0442\u0443\u0440', blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='buildings',
            name='accessibility',
            field=models.CharField(max_length=500, verbose_name='\u0422\u0440\u0430\u043d\u0441\u043f\u043e\u0440\u0442\u043d\u0430\u044f \u0438 \u043f\u0435\u0448\u0435\u0445\u043e\u0434\u043d\u0430\u044f \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u043e\u0441\u0442\u044c', blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='buildings',
            name='communication',
            field=models.CharField(max_length=500, verbose_name='\u041a\u043e\u043c\u043c\u0443\u043d\u0438\u043a\u0430\u0446\u0438\u0438', blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='buildings',
            name='description',
            field=models.CharField(max_length=3000, verbose_name='\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043d\u043e\u0432\u043e\u0441\u0442\u0440\u043e\u0439\u043a\u0438', blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='buildings',
            name='features',
            field=models.CharField(max_length=500, verbose_name='\u041e\u0441\u043e\u0431\u0435\u043d\u043d\u043e\u0441\u0442\u0438', blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='buildings',
            name='finish',
            field=models.CharField(max_length=500, verbose_name='\u041e\u0442\u0434\u0435\u043b\u043a\u0430', blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='buildings',
            name='infrastructure',
            field=models.CharField(max_length=500, verbose_name='\u0418\u043d\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0430 \u0440\u0430\u0439\u043e\u043d\u0430', blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='buildings',
            name='purpose',
            field=models.CharField(max_length=500, verbose_name='\u041d\u0430\u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435 \u043e\u0431\u044a\u0435\u043a\u0442\u0430', blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='buildings',
            name='technology',
            field=models.CharField(max_length=500, verbose_name='\u0422\u0435\u0445\u043d\u043e\u043b\u043e\u0433\u0438\u044f \u0441\u0442\u0440\u043e\u0438\u0442\u0435\u043b\u044c\u0441\u0442\u0432\u0430', blank=True),
            preserve_default=True,
        ),
    ]
