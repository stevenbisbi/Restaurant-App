# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RestaurantViewSet, RoleViewSet, PermissionViewSet

router = DefaultRouter()
router.register(r'', RestaurantViewSet)
router.register(r'role', RoleViewSet)
router.register(r'permission', PermissionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]