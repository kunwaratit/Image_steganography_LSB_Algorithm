from rest_framework import serializers
from .models import *


class ReactSerializer(serializers.ModelSerializer):

    class Meta:
        model = React
        fields = ['title', 'description']


class React2Serializer(serializers.ModelSerializer):

    class Meta:
        model = React2
        fields = ['employee', 'department']
