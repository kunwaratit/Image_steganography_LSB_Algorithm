from django.shortcuts import render
from . models import *
from . serializers import *
# from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.

class ReactView(APIView):
    def get(self, request):
        output = [{'title': output.title,
                   "desc": output.description}
                  for output in React.objects.all()]
        return Response(output)

    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class React2View(APIView):
    def get(self, request):
        output = [{'employee': output.employee,
                   "department": output.department}
                  for output in React2.objects.all()]
        return Response(output)

    def post(self, request):
        serializer = React2Serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)





