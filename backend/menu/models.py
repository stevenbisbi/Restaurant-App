from django.db import models
import uuid

# Create your models here.
class Menu(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    restaurante = models.ForeignKey(Restaurante, on_delete=models.CASCADE, related_name="menus")
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    esta_activo = models.BooleanField(default=True)
    horario_disponibilidad = models.JSONField(blank=True, null=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre

class CategoriaMenu(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE, related_name="categorias")
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    orden_visualizacion = models.IntegerField(default=0)
    esta_activo = models.BooleanField(default=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre

class ItemMenu(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    categoria = models.ForeignKey(CategoriaMenu, on_delete=models.CASCADE, related_name="items")
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    url_imagen = models.URLField(max_length=255, blank=True, null=True)
    tiempo_preparacion = models.IntegerField(help_text="Tiempo en minutos")
    calorias = models.IntegerField(blank=True, null=True)
    ingredientes = models.TextField(blank=True, null=True)
    alergenos = models.TextField(blank=True, null=True)
    es_vegetariano = models.BooleanField(default=False)
    es_vegano = models.BooleanField(default=False)
    es_sin_gluten = models.BooleanField(default=False)
    es_destacado = models.BooleanField(default=False)
    esta_disponible = models.BooleanField(default=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre

class VarianteItemMenu(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    item_menu = models.ForeignKey(ItemMenu, on_delete=models.CASCADE, related_name="variantes")
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    ajuste_precio = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    es_predeterminado = models.BooleanField(default=False)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.item_menu.nombre} - {self.nombre}"

class OpcionItemMenu(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    item_menu = models.ForeignKey(ItemMenu, on_delete=models.CASCADE, related_name="opciones")
    nombre = models.CharField(max_length=100)
    ajuste_precio = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    permite_multiples = models.BooleanField(default=False)
    selecciones_maximas = models.IntegerField(default=1)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.item_menu.nombre} - {self.nombre}"
