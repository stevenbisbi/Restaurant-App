from django.contrib import admin
from .models import Menu, MenuCategory, MenuItem, MenuItemVariant, MenuItemOption

admin.site.register(Menu)
admin.site.register(MenuCategory)
admin.site.register(MenuItem)
admin.site.register(MenuItemVariant)
admin.site.register(MenuItemOption)