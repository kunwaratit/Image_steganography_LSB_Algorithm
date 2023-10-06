# Generated by Django 4.2.3 on 2023-10-06 02:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='EncodedImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='encoded_images/')),
                ('hidden_data', models.TextField()),
                ('date_created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
