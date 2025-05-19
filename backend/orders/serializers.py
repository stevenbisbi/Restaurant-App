from rest_framework import serializers
from .models import Order, OrderItem, OrderItemOption, OrderItemStatus, OrderStatus

class OrderSerializer(serializers.ModelSerializer):
  class Meta:
    model = Order
    fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
  class Meta:
    model = OrderItem
    fields = '__all__'

class OrderItemOptionSerializer(serializers.ModelSerializer):
  class Meta:
    model = OrderItemOption
    fields = '__all__'
      
class OrderItemStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItemStatus
        fields = '__all__'

class OrderStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderStatus
        fields = '__all__'
