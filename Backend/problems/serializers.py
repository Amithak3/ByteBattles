from rest_framework import serializers
from .models import Problems, Testcases

class TestcaseSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = Testcases
        fields = "__all__"

class ProblemsSerializer(serializers.HyperlinkedModelSerializer):
    id=serializers.IntegerField(read_only=True)
    class Meta:
        model = Problems
        fields = "__all__"

