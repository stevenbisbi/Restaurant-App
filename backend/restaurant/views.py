from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Restaurant, Role, Permission
from .serializer import RestaurantSerializer, RoleSerializer, PermissionSerializer
from drf_yasg.utils import swagger_auto_schema # type: ignore


@swagger_auto_schema(method='post', request_body=RestaurantSerializer)
@api_view(['GET', 'POST'])
def restaurant_list_create(request):
  if request.method == 'GET':
    restaurant = Restaurant.objects.all()
    serializer = RestaurantSerializer(restaurant, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  elif request.method == 'POST':
    serializer = RestaurantSerializer(data=request.data)
    if serializer.is_valid():
      restaurant = serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method='post', request_body=RoleSerializer)
@api_view(['GET', 'Post'])
def rol_list_create(request):
  if request.method == 'GET':
    role = Role.objects.all()
    serializer = RoleSerializer(role, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  elif request.method == 'POST':
    serializer = RoleSerializer(data=request.data)
    if serializer.is_valid():
      role = serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
@swagger_auto_schema(method='post', request_body=PermissionSerializer)
@api_view(['GET', 'Post'])
def permission_list_create(request):
  if request.method == 'GET':
    permission = Permission.objects.all()
    serializer = PermissionSerializer(permission, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  elif request.method == 'POST':
    serializer = PermissionSerializer(data=request.data)
    if serializer.is_valid():
      permission = serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)