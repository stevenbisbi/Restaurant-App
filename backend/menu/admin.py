from django.contrib import admin
from .models import Menu, MenuCategory, MenuItem, MenuItemOption, MenuItemVariant
# Register your models here.

admin.site.register(Menu)
admin.site.register(MenuCategory)
admin.site.register(MenuItem)
admin.site.register(MenuItemOption)
admin.site.register(MenuItemVariant)