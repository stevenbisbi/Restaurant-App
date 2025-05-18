from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import PaymentMethod, PaymentStatus, Payment
from .serializer import PaymentMethodSerializer, PaymentStatusSerializer, PaymentSerializer
from drf_yasg.utils import swagger_auto_schema # type: ignore

@swagger_auto_schema(method='post', request_body=PaymentMethodSerializer)
@api_view(['GET', 'POST'])
def payment_method_list_create(request):
  if request.method == 'GET':
    payment_methods = PaymentMethod.objects.all()
    serializer = PaymentMethodSerializer(payment_methods, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  elif request.method == 'POST':
    serializer = PaymentMethodSerializer(data=request.data)
    if serializer.is_valid():
      payment_methods = serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'PUT', 'DELETE'])
def payment_method_detail(request, pk):
  try:
    payment_method = PaymentMethod.objects.get(pk=pk)
  except PaymentMethod.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)
  if request.method == 'GET':
    serializer = PaymentMethodSerializer(payment_method)
    return Response(serializer.data)
  elif request.method == 'PUT':
    serializer = PaymentMethodSerializer(payment_method, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  elif request.method == 'DELETE':
    payment_method.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
  
@swagger_auto_schema(method='post', request_body=PaymentStatusSerializer)
@api_view(['GET', 'POST'])
def payment_status_list_create(request):
  if request.method == 'GET':
    payment_status = PaymentStatus.objects.all()
    serializer = PaymentStatusSerializer(payment_status, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  elif request.method == 'POST':
    serializer = PaymentStatusSerializer(data=request.data)
    if serializer.is_valid():
      payment_status = serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
@api_view(['GET', 'PUT', 'DELETE'])
def payment_status_detail(request, pk):
  try:
    payment_status = PaymentStatus.objects.get(pk=pk)
  except PaymentStatus.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)
  if request.method == 'GET':
    serializer = PaymentStatusSerializer(payment_status)
    return Response(serializer.data)
  elif request.method == 'PUT':
    serializer = PaymentStatusSerializer(payment_status, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  elif request.method == 'DELETE':
    payment_status.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
  
@swagger_auto_schema(method='post', request_body=PaymentSerializer)
@api_view(['GET', 'POST'])
def payment_list_create(request):
  if request.method == 'GET':
    payment = Payment.objects.all()
    serializer = PaymentSerializer(payment, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  elif request.method == 'POST':
    serializer = PaymentSerializer(data=request.data)
    if serializer.is_valid():
      payment = serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
@api_view(['GET', 'PUT', 'DELETE'])
def payment_detail(request, pk):
  try:
    payment = Payment.objects.get(pk=pk)
  except Payment.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)
  if request.method =='GET':
    serializer = PaymentSerializer(payment)
    return Response(serializer.data)
  elif request.method == 'PUT':
    serializer = PaymentSerializer(payment, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  elif request.method == 'DELETE':
    payment.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)