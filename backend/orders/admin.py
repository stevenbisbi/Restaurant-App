from django.contrib import admin
from .models import OrderStatus, Order, OrderItemStatus, OrderItem, OrderItemOption

admin.site.register(OrderStatus)
admin.site.register(Order)
admin.site.register(OrderItemStatus)
admin.site.register(OrderItem)
admin.site.register(OrderItemOption)