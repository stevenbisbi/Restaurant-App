# views.py
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Menu, MenuItem, MenuItemVariant, MenuItemOption
from .serializers import MenuSerializer, MenuItemSerializer, MenuItemVariantSerializer, MenuItemOptionSerializer

class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.select_related('restaurant').all()
    serializer_class = MenuSerializer

class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer

class MenuItemVariantViewSet(viewsets.ModelViewSet):
    queryset = MenuItemVariant.objects.all()
    serializer_class = MenuItemVariantSerializer

class MenuItemOptionViewSet(viewsets.ModelViewSet):
    queryset = MenuItemOption.objects.all()
    serializer_class = MenuItemOptionSerializer

@api_view(['GET'])
def get_category_choices(request):
    choices = MenuItem.CATEGORY_CHOICES
    return Response(choices)