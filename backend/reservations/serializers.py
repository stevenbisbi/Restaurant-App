from rest_framework import serializers
from .models import Table, Reservation, ReservationStatus

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = '__all__'

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'

class ReservationStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReservationStatus
        fields = '__all__'


#toca crear un status, quede en como esta el Chatgpt