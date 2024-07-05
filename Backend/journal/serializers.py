
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from .models import Journal     

class JournalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Journal
        fields = '__all__'