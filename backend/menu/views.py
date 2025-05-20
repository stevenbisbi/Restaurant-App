# views.py
from rest_framework import viewsets
from .models import Menu, MenuCategory, MenuItem, MenuItemVariant, MenuItemOption
from .serializers import MenuSerializer, MenuCategorySerializer, MenuItemSerializer, MenuItemVariantSerializer, MenuItemOptionSerializer

class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

class MenuCategoryViewSet(viewsets.ModelViewSet):
    queryset = MenuCategory.objects.all()
    serializer_class = MenuCategorySerializer

class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer

class MenuItemVariantViewSet(viewsets.ModelViewSet):
    queryset = MenuItemVariant.objects.all()
    serializer_class = MenuItemVariantSerializer

class MenuItemOptionViewSet(viewsets.ModelViewSet):
    queryset = MenuItemOption.objects.all()
    serializer_class = MenuItemOptionSerializer
