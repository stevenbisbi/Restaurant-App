from django.db import models
import uuid

# Create your models here.

class Mesa(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    restaurante = models.ForeignKey(Restaurante, on_delete=models.CASCADE, related_name="mesas")
    numero = models.IntegerField()
    capacidad = models.IntegerField()
    ubicacion = models.CharField(max_length=50, blank=True, null=True)
    estado = models.CharField(max_length=20)  # Podría ser 'Disponible', 'Ocupada', 'Reservada'
    url_codigo_qr = models.URLField(max_length=255, blank=True, null=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Mesa {self.numero}"

class EstadoReserva(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(blank=True, null=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre

class Reserva(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name="reservas")
    mesa = models.ForeignKey(Mesa, on_delete=models.CASCADE, related_name="reservas")
    fecha_hora_reserva = models.DateTimeField()
    duracion = models.IntegerField(help_text="Duración en minutos")
    tamaño_grupo = models.IntegerField()
    solicitudes_especiales = models.TextField(blank=True, null=True)
    estado = models.ForeignKey(EstadoReserva, on_delete=models.CASCADE, related_name="reservas")
    codigo_confirmacion = models.CharField(max_length=20, blank=True, null=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Reserva {self.id} - Mesa {self.mesa.numero}"