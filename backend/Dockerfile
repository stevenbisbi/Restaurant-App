# backend/Dockerfile
FROM python:3.13-slim

# Instalar dependencias del sistema necesarias para compilar algunos paquetes
RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential curl \
    && rm -rf /var/lib/apt/lists/*

# Instalar Poetry (sin virtualenvs dentro del contenedor)
ENV POETRY_VERSION=2.0.0
RUN pip install "poetry==$POETRY_VERSION"
ENV POETRY_VIRTUALENVS_CREATE=false

WORKDIR /app

# Copiar los archivos de dependencias primero (mejor cache)
COPY pyproject.toml poetry.lock ./

# Instalar dependencias
RUN poetry install --no-interaction --no-ansi

# Copiar el resto del código
COPY . .

# Archivos estáticos
RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["poetry", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]


# Iniciar el servidor en producción con Daphne
#CMD ["sh", "-c", "poetry run python manage.py migrate && python manage.py shell < create_super_user.py && daphne -b 0.0.0.0 -p 8000 backend.asgi:application"]