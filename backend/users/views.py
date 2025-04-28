from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model

from .serializer import UserSerializer, CustomerSerializer, LoginSerializer, RestaurantSerializer
from drf_yasg.utils import swagger_auto_schema # type: ignore
from .models import Customer, Restaurant


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

  if user.is_superuser: # Lógica para determinar el rol
    role = "admin"
  elif user.is_staff:
    role = "staff"
  elif hasattr(user, 'customer'):
    role = "customer"
  else:
    role = "user"  # Otro tipo si aplica

  return Response({
    "username": user.username,
    "email": user.email,
    "role": role,
  }, status=status.HTTP_200_OK)

@swagger_auto_schema(method='post', request_body=CustomerSerializer)
@api_view(['POST'])
def create_customer(request):
  """
  Create a new customer.
  """
  serializer =  CustomerSerializer(data=request.data)
  if serializer.is_valid():
    customer = serializer.save()
    token, created = Token.objects.get_or_create(user=customer.user)
    return Response({"token": token.key, "customer": serializer.data}, status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def list_customers(request):
  customer = Customer.objects.all()
  serializer = CustomerSerializer(customer, many=True)
  return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def retrieve_customer(request, pk):
  """
  Consulta Customer por ID de Customer.
  """
  customer = get_object_or_404(Customer, pk=pk)
  serializer = CustomerSerializer(customer)
  return Response(serializer.data, status=status.HTTP_200_OK)

@swagger_auto_schema(method='put', request_body=CustomerSerializer, responses={200: CustomerSerializer})

@api_view(['PUT', 'PATCH'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_customer(request, pk):
  """
  Actualizar customer por ID de Customer.
  """
  customer = get_object_or_404(Customer, pk=pk)
  serializer = CustomerSerializer(customer, data=request.data, partial=True)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data, status=status.HTTP_200_OK)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_customer(request, pk):
  """
  Eliminar Customer por ID de customer.
  """
  customer = get_object_or_404(Customer, pk=pk)
  customer.delete()
  return Response({"detaail": "customer eliminado corrrectamente"}, status=status.HTTP_204_NO_CONTENT)

@swagger_auto_schema(method='post', request_body=RestaurantSerializer)
@api_view(['GET', 'POST'])
def restaurant_list_create(request):
  if request.method == 'GET':
    restaurant = Restaurant.objects.all()
    serializer = RestaurantSerializer(restaurant, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  elif request.method == 'POST':
    serializer = RestaurantSerializer(data=request.data)
    if serializer.is_valid():
      restaurant = serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)