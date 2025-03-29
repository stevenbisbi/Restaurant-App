from django.db import models
import uuid
from django.contrib.auth.models import AbstractUser

# Create your models here.


class Usuario(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre_usuario = models.CharField(max_length=50, unique=True, db_column="username")
    correo = models.EmailField(max_length=100, unique=True, db_column="email")
    contraseña = models.CharField(max_length=255, db_column="password")  # Django maneja hashing
    nombre = models.CharField(max_length=50, db_column="first_name")
    apellido = models.CharField(max_length=50, db_column="last_name")
    telefono = models.CharField(max_length=20, blank=True, null=True)
    esta_activo = models.BooleanField(default=True, db_column="is_active")
    fecha_registro = models.DateTimeField(auto_now_add=True, db_column="date_joined")
    ultimo_acceso = models.DateTimeField(blank=True, null=True, db_column="last_login")
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    # Definir el campo principal de autenticación
    USERNAME_FIELD = "correo"  # Django usará 'correo' en lugar de 'username' para autenticarse
    REQUIRED_FIELDS = ["nombre_usuario", "nombre", "apellido"]

    def __str__(self):
        return f"{self.nombre} {self.apellido}"

import uuid
from django.db import models
from django.contrib.postgres.fields import JSONField  # En Django 3.1+ se puede usar models.JSONField directamente

# -------------------------------
# Usuarios, Personal, Roles y Permisos
# -------------------------------

class Rol(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(blank=True, null=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre

class Permiso(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE, related_name="permisos")
    nombre = models.CharField(max_length=50)
    recurso = models.CharField(max_length=50)
    accion = models.CharField(max_length=20)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.nombre} - {self.accion}"

class Personal(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, related_name="personal")
    restaurante = models.ForeignKey("Restaurante", on_delete=models.CASCADE, related_name="personal")
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE, related_name="personal")
    fecha_contratacion = models.DateField()
    contacto_emergencia = models.CharField(max_length=100, blank=True, null=True)
    preferencias_turno = models.JSONField(blank=True, null=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.usuario.nombre_usuario} - {self.rol.nombre}"

class Cliente(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, related_name="cliente")
    preferencias = models.JSONField(blank=True, null=True)
    restricciones_dieteticas = models.TextField(blank=True, null=True)
    alergias = models.TextField(blank=True, null=True)
    puntos_fidelidad = models.IntegerField(default=0)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.usuario.nombre_usuario

# -------------------------------
# Restaurante, Menú y Categorías
# -------------------------------

class Restaurante(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=100)
    direccion = models.TextField()
    ciudad = models.CharField(max_length=50)
    estado = models.CharField(max_length=50)
    codigo_postal = models.CharField(max_length=20)
    telefono = models.CharField(max_length=20)
    correo = models.EmailField(max_length=100)
    sitio_web = models.URLField(max_length=100, blank=True, null=True)
    horario_apertura = models.JSONField(blank=True, null=True)
    tasa_impuesto = models.DecimalField(max_digits=5, decimal_places=2)
    url_logo = models.URLField(max_length=255, blank=True, null=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre