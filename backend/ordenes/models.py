from django.db import models
import uuid

# Create your models here.

class EstadoPedido(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(blank=True, null=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.nombre

class Pedido(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name="pedidos")
    mesa = models.ForeignKey(Mesa, on_delete=models.CASCADE, related_name="pedidos")
    personal = models.ForeignKey(Personal, on_delete=models.SET_NULL, related_name="pedidos", blank=True, null=True)
    fecha_hora_pedido = models.DateTimeField(auto_now_add=True)
    instrucciones_especiales = models.TextField(blank=True, null=True)
    estado = models.ForeignKey(EstadoPedido, on_delete=models.CASCADE, related_name="pedidos")
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    impuesto = models.DecimalField(max_digits=10, decimal_places=2)
    propina = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    hora_estimada_preparacion = models.DateTimeField(blank=True, null=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Pedido {self.id}"

class EstadoItemPedido(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(blank=True, null=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.nombre

class ItemPedido(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name="items")
    item_menu = models.ForeignKey(ItemMenu, on_delete=models.CASCADE, related_name="item_pedidos")
    cantidad = models.IntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    instrucciones_especiales = models.TextField(blank=True, null=True)
    estado = models.ForeignKey(EstadoItemPedido, on_delete=models.CASCADE, related_name="item_pedidos")
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"ItemPedido {self.id}"

class OpcionItemPedido(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    item_pedido = models.ForeignKey(ItemPedido, on_delete=models.CASCADE, related_name="opciones")
    opcion_item_menu = models.ForeignKey(OpcionItemMenu, on_delete=models.CASCADE, related_name="opciones_item_pedido")
    cantidad = models.IntegerField()
    ajuste_precio = models.DecimalField(max_digits=10, decimal_places=2)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"OpcionItemPedido {self.id}"