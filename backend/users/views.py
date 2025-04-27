from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model

from .serializer import UserSerializer
from .serializer import CustomerSerializer, LoginSerializer
from drf_yasg.utils import swagger_auto_schema # type: ignore


User = get_user_model()
@swagger_auto_schema(method='post', request_body=LoginSerializer)

@api_view(['POST'])
def login(request): # request es un objeto que contiene toda la información sobre la solicitud HTTP entrante
  """
  Inicia sesión.
  """
  username = request.data.get('username') # Obtención de los datos enviados
  password = request.data.get('password')

  if not username or not password: # Validación de campos obligatorios
    return Response({"error": "Debe proporcionar username y password"}, status=status.HTTP_400_BAD_REQUEST)

  user = get_object_or_404(User, username=username)

  if not user.check_password(password): #Buscar el usuario
    return Response({"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)
  
  token, created = Token.objects.get_or_create(user=user)
  serializer = UserSerializer(instance=user) #convierte el usuario a un formato JSON amigable.

  return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK)

@swagger_auto_schema(method='post', request_body=UserSerializer)
@api_view(['POST'])
def register(request):
  """
  Registra un nuevo usuario.
  Requiere los campos: username, email, password.

  """

  serializer = UserSerializer(data=request.data)

  if serializer.is_valid():
    user = serializer.save()

    user.set_password(request.data['password'])
    user.save()

    token = Token.objects.create(user=user)
    return Response({'token': token.key, "user": serializer.data}, status=status.HTTP_201_CREATED)
  
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile(request):
  user = request.user
  return Response({
    "username": user.username,
    "email": user.email,
    # agrega lo que necesites
  }, status=status.HTTP_200_OK)


@api_view(['POST'])
def create_customer(request):
  serializer =  CustomerSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  

# entonces debo crear un profile y un register para las demas clases