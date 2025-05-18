from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Menu, MenuCategory, MenuItem, MenuItemVariant, MenuItemOption
from .serializer import MenuSerializer, MenuCategorySerializer, MenuItemSerializer, MenuItemVariantSerializer, MenuItemOptionSerializer
from drf_yasg.utils import swagger_auto_schema # type: ignore

@swagger_auto_schema(method='post', request_body=MenuSerializer)
@api_view(['GET', 'POST'])
def menu_list_create(request):
  if request.method == 'GET':
    menus = Menu.objects.all()
    serializer = MenuSerializer(menus, many=True)
    return Response(serializer.data)
  elif request.method == 'POST':
    serializer = MenuSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
@api_view(['GET', 'PUT', 'DELETE'])
def menu_detail(request, pk):
  try:
    menu = Menu.objects.get(pk=pk)
  except Menu.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)
  if request.method == 'GET':
    serializer = MenuSerializer(menu)
    return Response(serializer.data)
  elif request.method == 'PUT':
    serializer = MenuSerializer(menu, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  elif request.method == 'DELETE':
    menu.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@swagger_auto_schema(method='post', request_body=MenuCategorySerializer)
@api_view(['GET', 'POST'])
def menu_category_list_create(request):
  if request.method == 'GET':
    categorias = MenuCategory.objects.all()
    serializer = MenuCategorySerializer(categorias, many=True)
    return Response(serializer.data)
  elif request.method == 'POST':
    serializer = MenuCategorySerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
@api_view(['GET', 'PUT', 'DELETE'])
def menu_category_detail(request, pk):
  try:
    categoria = MenuCategory.objects.get(pk=pk)
  except MenuCategory.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)
  if request.method == 'GET':
    serializer = MenuCategorySerializer(categoria)
    return Response(serializer.data)
  elif request.method == 'PUT':
    serializer = MenuCategorySerializer(categoria, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  elif request.method == 'DELETE':
    categoria.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
  
@swagger_auto_schema(method='post', request_body=MenuItemSerializer)
@api_view(['GET', 'POST'])
def menu_item_list_create(request):
  if request.method == 'GET':
    item = MenuItem.objects.all()
    serializer = MenuItemSerializer(item, many=True)
    return Response(serializer.data)
  elif request.method == 'POST':
    serializer = MenuItemSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def menu_item_detail(request, pk):
  try:
    item = MenuItem.objects.get(pk=pk)
  except MenuItem.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)
  if request.method == 'GET':
    serializer = MenuItemSerializer(item)
    return Response(serializer.data)
  elif request.method == 'PUT':
    serializer = MenuItemSerializer(item, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.erros, status=status.HTTP_400_BAD_REQUEST)
  elif request.method == 'DELETE':
    item.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
  
@swagger_auto_schema(method='post', request_body=MenuItemVariantSerializer)
@api_view(['GET', 'POST'])
def menu_item_variant_list_create(request):
  if request.method == 'GET':
    variant = MenuItemVariant.objects.all()
    serializer = MenuItemVariantSerializer(variant, many=True)
    return Response(serializer.data)
  elif request.method == 'POST':
    serializer = MenuItemVariantSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
@api_view(['GET', 'PUT', 'DELETE'])
def menu_item_variant_detail(request, pk):
  try:
    variant = MenuItemVariant.objects.get(pk=pk)
  except MenuItemVariant.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)
  if request.method == 'GET':
    serializer = MenuItemVariantSerializer(variant)
    return Response(serializer.data)
  elif request.method == 'PUT':
    serializer = MenuItemVariantSerializer(variant, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  elif request.method == 'DELETE':
    variant.delete()
    
@swagger_auto_schema(method='post', request_body=MenuItemOptionSerializer)
@api_view(['GET', 'POST'])
def menu_item_option_list_create(request):
  if request.method == 'GET':
    option = MenuItemOption.objects.all()
    serializer = MenuItemOptionSerializer(option, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  elif request.method == 'POST':
    serializer = MenuItemOptionSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
@api_view(['GET', 'PUT', 'DELETE'])
def menu_item_option_detail(request, pk):
  try:
    option =MenuItemOption.objects.get(pk=pk)
  except MenuItemOption.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)
  if request.method == 'GET':
    serializer = MenuItemOptionSerializer(option)
    return Response(serializer.data)
  elif request.method == 'PUT':
    serializer = MenuItemOptionSerializer(option, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  elif request.method == 'DELETE':
    option.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)