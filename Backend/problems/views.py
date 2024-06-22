from django.shortcuts import render
from rest_framework import generics
from .models import Problems
from .serializers import ProblemsSerializer
# Create your views here.
class ProblemsList(generics.ListCreateAPIView):
    queryset = Problems.objects.all()
    serializer_class = ProblemsSerializer
    
class ProblemsDetail(generics.RetrieveAPIView):
    queryset = Problems.objects.all()
    serializer_class = ProblemsSerializer
    
class ProblemsCreate(generics.CreateAPIView):
    queryset = Problems.objects.all()
    serializer_class = ProblemsSerializer