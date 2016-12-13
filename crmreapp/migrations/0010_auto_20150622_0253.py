# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crmreapp', '0009_auto_20150610_2323'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='orderssale',
            options={'ordering': ['create_date'], 'verbose_name_plural': '\u0417\u0430\u044f\u0432\u043a\u0438 \u043d\u0430 \u043f\u0440\u043e\u0434\u0430\u0436\u0443', 'permissions': (('view_all_orders-sale', 'View all Orders Sale'), ('view_free_orders-sale', 'View free Orders Sale'), ('view_my_orders-sale', 'View my Orders Sale'), ('change_all_orders-sale', 'Change all Orders Sale'), ('share_orders-sale', 'Share Orders Sale'), ('lock_orders-sale', 'Lock Orders Sale'), ('uploading_orders-sale', 'Uploading Orders Sale'), ('change_advertising', 'Change advertising'))},
        ),
    ]
