from django.db import models
import uuid
from users.models import Customer
from restaurant.models import Restaurant
# Create your models here.

class Table(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
<<<<<<< HEAD
    restaurant = models.ForeignKey('users.Restaurant', on_delete=models.CASCADE, related_name="tables")
=======
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name="tables")
>>>>>>> dfc400d6057bd966c93099f7736d4b1afa04efbe
    number = models.IntegerField()
    capacity = models.IntegerField()
    location = models.CharField(max_length=50, blank=True, null=True)
    status = models.CharField(max_length=20)  # Could be 'Available', 'Occupied', 'Reserved'
    qr_code_url = models.URLField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Table {self.number}"

class ReservationStatus(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Reservation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
<<<<<<< HEAD
    customer = models.ForeignKey('users.Customer', on_delete=models.CASCADE, related_name="reservations")
=======
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="reservations")
>>>>>>> dfc400d6057bd966c93099f7736d4b1afa04efbe
    table = models.ForeignKey(Table, on_delete=models.CASCADE, related_name="reservations")
    reservation_date = models.DateTimeField()
    duration = models.IntegerField(help_text="Duration in minutes")
    group_size = models.IntegerField()
    special_requests = models.TextField(blank=True, null=True)
    status = models.ForeignKey(ReservationStatus, on_delete=models.CASCADE, related_name="reservations")
    confirmation_code = models.CharField(max_length=20, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Reservation {self.id} - Table {self.table.number}"