from rest_framework import viewsets, permissions, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema  # type: ignore
from drf_yasg import openapi # type: ignore

from .serializer import UserSerializer, CustomerSerializer, LoginSerializer, StaffSerializer
from .models import Customer, Staff

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  authentication_classes = [TokenAuthentication]
  permission_classes = [permissions.IsAuthenticated]
  
  def get_permissions(self):
    if self.action == 'create':  # Permitir crear usuario sin autenticación
      permission_classes = [AllowAny]
    else:
      permission_classes = [IsAuthenticated]
    return [permission() for permission in permission_classes]

  # Opcional: acción personalizada para perfil del usuario autenticado
  @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
  def profile(self, request):
    user = request.user
    role = "admin" if user.is_superuser else ("staff" if user.is_staff else ("customer" if hasattr(user, 'customer') else "user"))
    serializer = UserSerializer(user)
    data = serializer.data
    data['role'] = role
    return Response(data)

class CustomerViewSet(viewsets.ModelViewSet):
  queryset = Customer.objects.all()
  serializer_class = CustomerSerializer
  authentication_classes = [TokenAuthentication]
  permission_classes = [permissions.IsAuthenticated]


class LoginView(APIView):
  permission_classes = []
  authentication_classes = []

  @swagger_auto_schema(
    request_body = LoginSerializer,
    responses = {
      200: openapi.Response("Exito", schema=UserSerializer),
      400: openapi.Response("Error", schema=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        proferties = {'error': openapi.Schema(type=openapi.TYPE_STRING)}
      )),
    }
  )

  def post(self, request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.validated_data['email']
    password = serializer.validated_data['password']

    try:
      user = User.objects.get(email=email)
    except User.DoesNotExist:
      return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

    if not user.check_password(password):
      return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

    token, _ = Token.objects.get_or_create(user=user)
    user_serializer = UserSerializer(user)

    return Response({
      "token": token.key,
      "user": user_serializer.data,
    })

class StaffViewSet(viewsets.ModelViewSet):
  queryset = Staff.objects.all()
  serializer_class =  StaffSerializer
  authentication_classes = [TokenAuthentication]
  permission_classes = [permissions.IsAuthenticated]

