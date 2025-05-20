# views.py
from rest_framework import viewsets
from .models import Restaurant, Role, Permission
from .serializers import RestaurantSerializer, PermissionSerializer, RoleSerializer

class RestaurantViewSet(viewsets.ModelViewSet):
  queryset = Restaurant.objects.all()
  serializer_class = RestaurantSerializer

class RoleViewSet(viewsets.ModelViewSet):
  queryset = Role.objects.all()
  serializer_class = RoleSerializer

class PermissionViewSet(viewsets.ModelViewSet):
  queryset = Permission.objects.all()
  serializer_class = PermissionSerializer