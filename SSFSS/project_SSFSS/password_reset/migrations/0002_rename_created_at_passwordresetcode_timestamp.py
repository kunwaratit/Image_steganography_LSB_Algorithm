# Generated by Django 4.2.3 on 2023-10-09 02:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('password_reset', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='passwordresetcode',
            old_name='created_at',
            new_name='timestamp',
        ),
    ]
