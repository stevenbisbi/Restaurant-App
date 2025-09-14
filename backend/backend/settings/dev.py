from .base import *

DEBUG = True
SECRET_KEY = '8!k*ugymki)uf7*4n-v57i+xmdl5(m+7-tg3y^n3=a6p#b9l&z'
ALLOWED_HOSTS = []
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]
