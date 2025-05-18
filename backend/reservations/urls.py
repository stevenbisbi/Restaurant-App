from django.urls import path
from . import views

urlpatterns = [
    path('', views.reservation_list_create, name='reservation_list_create'),
    path('reservations/<uuid:pk>/', views.reservation_detail, name='reservation_detail'),
    path('tables/', views.table_list_create, name='table_list_create'),
    path('tables/<uuid:pk>/', views.table_detail, name='table_detail'),
    path('statuses/', views.reservation_status_list_create, name='reservation_status_list_create'),
    path('statuses/<uuid:pk>/', views.reservatuion_status_detail, name='reservatuion_status_detail'),
]
