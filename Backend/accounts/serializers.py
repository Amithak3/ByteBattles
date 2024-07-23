
from rest_framework_simplejwt.tokens import RefreshToken # type: ignore
from rest_framework import serializers # type: ignore
from .models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'name', 'age', 'email', 'password')


    def create(self, validated_data):
        user = CustomUser.objects.create_user(
        username=validated_data['username'],
        email=validated_data['email'],
        password=validated_data['password'],
        name=validated_data['name'],
        age=validated_data['age']
        )
        return user
        
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    
    
    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        user= CustomUser.objects.filter(username=username).first()
        if user:
            if user.check_password(password):
                refresh = RefreshToken.for_user(user)
                return {
                    "username" :user.username,
                    "tokens":{
                        'refresh': str(refresh),
                        'access': str(refresh.access_token)
                    }
                }
            else:
                raise serializers.ValidationError("Incorrect password")
        else:
            raise serializers.ValidationError("User not found")
        
                