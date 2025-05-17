from django.urls import path
from . import views

urlpatterns = [
    path('restaurants/', views.restaurant_list_create, name='restaurant_list_create'),
    path('roles/', views.rol_list_create, name='role_list_create'),
    path('permissions/', views.permission_list_create, name='permission_list_create'),
]

