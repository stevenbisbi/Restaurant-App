from django.contrib import admin
from .models import Restaurant, Permission, Role
# Register your models here.

admin.site.register(Restaurant)
admin.site.register(Permission)
admin.site.register(Role)