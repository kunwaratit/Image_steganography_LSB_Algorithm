from django.db import models

# Create your models here.


class React(models.Model):
    title = models.CharField(max_length=70, blank=False, default='')
    description = models.CharField(max_length=200, blank=False, default='')
    published = models.BooleanField(default=False)


class React2(models.Model):
    employee = models.CharField(max_length=30)
    department = models.CharField(max_length=200)
