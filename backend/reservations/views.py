from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Reservation, Table
from .serializers import ReservationSerializer, TableSerializer
from drf_yasg.utils import swagger_auto_schema # type: ignore

@swagger_auto_schema(method='post', request_body=ReservationSerializer)
@api_view(['GET', 'POST'])
def reservation_list_create(request):
  if request.method == 'GET':
    reservations = Reservation.objects.all()
    serializer = ReservationSerializer(reservations, many=True)
    return Response(serializer.data)
  elif request.method == 'POST':
    serializer = ReservationSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
@api_view(['GET', 'PUT', 'DELETE'])
def reservation_detail(request, pk):
  try:
    reservation = Reservation.objects.get(pk=pk)
  except Reservation.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)

  if request.method == 'GET':
    serializer = ReservationSerializer(reservation)
    return Response(serializer.data)
  elif request.method =='PUT':
    serializer = ReservationSerializer(reservation, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  elif request.method == 'DELETE':
    reservation.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
  

@swagger_auto_schema(method='post', request_body=TableSerializer)
@api_view(['GET', 'POST'])
def table_list_create(request):
  if request.method == 'GET':
    tables = Table.objects.all()
    serializer = TableSerializer(tables, many=True)
    return Response (serializer.data)
  elif request.method == 'POST':
    serializer = TableSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def table_detail(request, pk):
  try:
    table = Table.objects.get(pk=pk)
  except Table.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)
  
  if request.method == 'GET':
    serializer = TableSerializer(table)
    return Response(serializer.data)
  elif request.method =='PUT':
    seralizer = TableSerializer(table, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  elif request.method == 'DELETE':
    table.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)