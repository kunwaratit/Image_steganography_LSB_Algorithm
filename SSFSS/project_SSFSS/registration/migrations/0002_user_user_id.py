# Generated by Django 4.2.3 on 2023-07-21 09:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('registration', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='user_id',
            field=models.CharField(blank=True, max_length=30, null=True, unique=True),
        ),
    ]