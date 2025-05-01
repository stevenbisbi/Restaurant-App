from django.shortcuts import render

# Create your views here.

# Ejemplo en una vista de Django
from restaurant.tasks import enviar_correo_confirmacion

def mi_vista(request):
    # Ejecuta la tarea en segundo plano
    enviar_correo_confirmacion.delay(
        "cliente@example.com",
        "Confirmación de Pedido",
        "¡Tu pedido ha sido recibido!"
    )