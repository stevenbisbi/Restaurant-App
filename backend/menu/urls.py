from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MenuViewSet, MenuCategoryViewSet, MenuItemViewSet, MenuItemVariantViewSet, MenuItemOptionViewSet

router = DefaultRouter()
router.register(r'', MenuViewSet)
router.register(r'category', MenuCategoryViewSet)
router.register(r'item', MenuItemViewSet)
router.register(r'item_variant', MenuItemVariantViewSet)
router.register(r'item_option', MenuItemOptionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
