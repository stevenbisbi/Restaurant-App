from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, CustomerViewSet, LoginView

router = DefaultRouter()
router.register(r'', UserViewSet, basename='user')
router.register(r'customers', CustomerViewSet, basename='customer')

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('', include(router.urls)),
]
