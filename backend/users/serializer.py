from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, Staff, Customer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = authenticate(email=email, password=password)
            if not user:
                raise serializers.ValidationError("Invalid credentials.")
            if not user.is_active:
                raise serializers.ValidationError("User is inactive.")
        else:
            raise serializers.ValidationError("Must include both email and password.")

        data['user'] = user
        return data

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'

from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Customer

User = get_user_model()

class CustomerSerializer(serializers.ModelSerializer):
    user_id = serializers.UUIDField(write_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Customer
        fields = [
            'id',
            'user_id',
            'email',
            'preferences',
            'created_at',
            'updated_at'
        ]
        read_only_fields = (
            'id', 'email', 'created_at', 'updated_at'
        )

    def create(self, validated_data):
        user_id = validated_data.pop('user_id')
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise serializers.ValidationError({"user_id": "User does not exist."})
        return Customer.objects.create(user=user, **validated_data)





