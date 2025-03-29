from django.db import models
import uuid

# Create your models here.

class MetodoPago(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(blank=True, null=True)
    es_en_linea = models.BooleanField(default=False)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.nombre

class EstadoPago(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(blank=True, null=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.nombre

class Pago(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name="pagos")
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    metodo = models.ForeignKey(MetodoPago, on_delete=models.CASCADE, related_name="pagos")
    estado = models.ForeignKey(EstadoPago, on_delete=models.CASCADE, related_name="pagos")
    id_transaccion = models.CharField(max_length=100, blank=True, null=True)
    fecha_hora_pago = models.DateTimeField(auto_now_add=True)
    ultimos_cuatro_tarjeta = models.CharField(max_length=4, blank=True, null=True)
    url_recibo = models.URLField(max_length=255, blank=True, null=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Pago {self.id}"
