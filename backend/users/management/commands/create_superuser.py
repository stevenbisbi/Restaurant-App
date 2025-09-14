from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import os

User = get_user_model()

class Command(BaseCommand):
    help = "Crea un superusuario automáticamente si no existe"

    def handle(self, *args, **kwargs):
        email = os.getenv("DJANGO_SUPERUSER_EMAIL", "admin@example.com")
        password = os.getenv("DJANGO_SUPERUSER_PASSWORD", "admin123")

        if not User.objects.filter(email=email).exists():
            User.objects.create_superuser(email=email, password=password)
            self.stdout.write(self.style.SUCCESS(f"Superusuario '{email}' creado."))
        else:
            self.stdout.write(self.style.WARNING(f"Superusuario '{email}' ya existe."))
