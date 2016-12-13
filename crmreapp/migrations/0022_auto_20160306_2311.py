# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crmreapp', '0021_templatesdoc'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='templatesdoc',
            options={'ordering': ['name'], 'verbose_name_plural': '\u0428\u0430\u0431\u043b\u043e\u043d\u044b \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u043e\u0432'},
        ),
    ]
