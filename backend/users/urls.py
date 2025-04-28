from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('profile/', views.profile, name='profile'),
    path('customers/', views.list_customers, name='list_customers'),
    path('customers/<uuid:pk>/', views.retrieve_customer, name='retrieve_customer'),
    path('customers/create/', views.create_customer, name='create_customer'),
    path('customers/<uuid:pk>/update/', views.update_customer, name='update_customer'),
    path('customers/<uuid:pk>/delete/', views.delete_customer, name='delete_customer'),
]
