# views.py
from rest_framework import viewsets
from .models import Table, Reservation, ReservationStatus
from .serializers import TableSerializer, ReservationSerializer, ReservationStatusSerializer

class TableViewSet(viewsets.ModelViewSet):
  queryset = Table.objects.all()
  serializer_class = TableSerializer

class ReservationViewSet(viewsets.ModelViewSet):
  queryset = Reservation.objects.all()
  serializer_class = ReservationSerializer

class ReservationStatusViewSet(viewsets.ModelViewSet):
  queryset = ReservationStatus.objects.all()
  serializer_class = ReservationStatusSerializer