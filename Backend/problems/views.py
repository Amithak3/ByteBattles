from django.shortcuts import render
from rest_framework import generics
from .models import Problems
from .serializers import ProblemsSerializer
import rest_framework.status as status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
# Create your views here.
class ProblemsListAPIView(generics.ListCreateAPIView):
    queryset = Problems.objects.all()
    serializer_class = ProblemsSerializer
    
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    
class ProblemsDetailAPIView(generics.RetrieveAPIView):
    queryset = Problems.objects.all()
    serializer_class = ProblemsSerializer
    lookup_field = 'id'
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    
class ProblemsCreateAPIView(generics.CreateAPIView):
    queryset = Problems.objects.all()
    serializer_class = ProblemsSerializer
    
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
   