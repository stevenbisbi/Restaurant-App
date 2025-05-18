from django.urls import path
from . import views

urlpatterns = [
    path('method/', views.payment_list_create, name='payment_list_create'),
    path('method/<uuid:pk>/', views.payment_method_detail, name='payment_method_detail'),
    path('status/', views.payment_status_list_create, name='payment_status_list_create'),
    path('status/<uuid:pk>/', views.payment_status_detail, name='payment_status_detail'),
    path('payments/', views.payment_list_create, name='payment_list_create'),
    path('payments/<uuid:pk>/', views.payment_detail, name='payment_detail'),
]
