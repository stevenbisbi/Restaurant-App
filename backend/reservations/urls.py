# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReservationViewSet, ReservationStatusViewSet

router = DefaultRouter()
router.register(r'', ReservationViewSet)
router.register(r'table', TableViewSet)
router.register(r'status', ReservationStatusViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
