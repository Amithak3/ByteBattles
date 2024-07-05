from django.shortcuts import render
from rest_framework import viewsets
from .models import Journal
from .serializers import JournalSerializer
# Create your views here.

class JournalViewSet(viewsets.ModelViewSet):
    queryset = Journal.objects.all()
    serializer_class = JournalSerializer
    authentication_classes = []
    permission_classes = []
