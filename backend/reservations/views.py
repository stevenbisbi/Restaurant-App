# views.py
from rest_framework import viewsets
from .models import Reservation, ReservationStatus
from .serializers import ReservationSerializer, ReservationStatusSerializer

class ReservationViewSet(viewsets.ModelViewSet):
  queryset = Reservation.objects.all()
  serializer_class = ReservationSerializer

class ReservationStatusViewSet(viewsets.ModelViewSet):
  queryset = ReservationStatus.objects.all()
  serializer_class = ReservationStatusSerializer