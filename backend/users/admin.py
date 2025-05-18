from django.contrib import admin
from .models import Customer, Staff, User
# Register your models here.

admin.site.register(Customer)
admin.site.register(Staff)
admin.site.register(User)