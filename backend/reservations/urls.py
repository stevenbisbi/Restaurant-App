# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TableViewSet, ReservationViewSet, ReservationStatusViewSet

router = DefaultRouter()
router.register(r'table', TableViewSet)
router.register(r'', ReservationViewSet)
router.register(r'status', ReservationStatusViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
