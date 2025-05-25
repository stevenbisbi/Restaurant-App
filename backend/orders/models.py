from django.db import models
import uuid
from menu.models import MenuItem, MenuItemOption
from users.models import Customer, Staff
from tables.models import Table

# Create your models here.

class OrderStatus(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="orders")
    table = models.ForeignKey(Table, on_delete=models.CASCADE, related_name="orders")
    staff = models.ForeignKey(Staff, on_delete=models.SET_NULL, related_name="orders", blank=True, null=True)
    order_date = models.DateTimeField(auto_now_add=True)
    special_instructions = models.TextField(blank=True, null=True)
    status = models.ForeignKey(OrderStatus, on_delete=models.CASCADE, related_name="orders")
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    tax = models.DecimalField(max_digits=10, decimal_places=2)
    tip = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    estimated_preparation_time = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Order {self.id}"

class OrderItemStatus(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

class OrderItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE, related_name="order_items")
    quantity = models.IntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    special_instructions = models.TextField(blank=True, null=True)
    status = models.ForeignKey(OrderItemStatus, on_delete=models.CASCADE, related_name="order_items")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"OrderItem {self.id}"

class OrderItemOption(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order_item = models.ForeignKey(OrderItem, on_delete=models.CASCADE, related_name="options")
    menu_item_option = models.ForeignKey(MenuItemOption, on_delete=models.CASCADE, related_name="order_item_options")
    quantity = models.IntegerField()
    price_adjustment = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"OrderItemOption {self.id}"