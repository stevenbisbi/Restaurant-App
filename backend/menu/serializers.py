from rest_framework import serializers
from .models import Menu, MenuCategory, MenuItem, MenuItemVariant, MenuItemOption
from restaurant.serializers import RestaurantSerializer

class MenuSerializer(serializers.ModelSerializer):
  restaurant = RestaurantSerializer(read_only=True)
  
  class Meta:
    model = Menu
    fields = '__all__'

class MenuCategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = MenuCategory
    fields = '__all__'

class MenuItemSerializer(serializers.ModelSerializer):
  class Meta:
    model = MenuItem
    fields = '__all__'

class MenuItemVariantSerializer(serializers.ModelSerializer):
  class Meta:
    model = MenuItemVariant
    fields = '__all__'

class MenuItemOptionSerializer(serializers.ModelSerializer):
  class Meta:
    model = MenuItemOption
    fields = '__all__'