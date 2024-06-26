
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from .models import Problems


        

class TestcaseSerializer(serializers.Serializer):
    class Meta:
        fields = '__all__'
        

class ProblemsSerializer(serializers.ModelSerializer):
    testcases = TestcaseSerializer(many=True)
    class Meta:
        model = Problems
        fields = '__all__'