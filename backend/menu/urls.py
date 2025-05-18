from django.urls import path
from . import views

urlpatterns = [
    path('', views.menu_list_create, name='menu_list_create'),
    path('menu/<uuid:pk>/', views.menu_detail, name='menu_detail'),
    path('category/', views.menu_category_list_create, name='menu_category_list_create'),
    path('category/<uuid:pk>/', views.menu_category_detail, name='menu_category_detail'),
    path('item/', views.menu_item_list_create, name='menu_item_list_create'),
    path('item/<uuid:pk>/', views.menu_item_detail, name='menu_item_detail'),
    path('item_variant/', views.menu_item_variant_list_create, name='menu_item_variant_list_create'),
    path('item_variant/<uuid:pk>/', views.menu_item_variant_detail, name='menu_item_variant_detail'),
    path('item_option/', views.menu_item_option_list_create, name='menu_item_option_list_create'),
    path('item_option/<uuid:pk>/', views.menu_item_option_detail, name='menu_item_option_detail'),
]