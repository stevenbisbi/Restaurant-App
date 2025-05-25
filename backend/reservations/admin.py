from django.contrib import admin
from .models import Table, ReservationStatus, Reservation

admin.site.register(Table)
admin.site.register(ReservationStatus)
admin.site.register(Reservation)
