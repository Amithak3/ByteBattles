from rest_framework import serializers
from .models import Submissions

class SubmissionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submissions
        fields = '__all__'
        # depth = 1