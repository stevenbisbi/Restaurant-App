from rest_framework import serializers
from .models import User, Role, Permission, Staff, Customer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = '__all__'


class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    user_id = serializers.UUIDField(
        source='user',
        help_text="User ID (UUID)"
    )
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Customer
        fields = [
            'id',
            'user_id',
            'username',
            'email',
            'preferences',
            'dietary_restrictions',
            'allergies',
            'loyalty_points',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ('id', 'user_id', 'username', 'email', 'created_at', 'updated_at')





