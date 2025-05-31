import json
from channels.generic.websocket import AsyncWebsocketConsumer  # type: ignore
from asgiref.sync import sync_to_async
from .models import Order
from .serializers import OrderSerializer
from django.core.serializers.json import DjangoJSONEncoder

class OrderConsumer(AsyncWebsocketConsumer):
  async def connect(self):
    self.order_id = self.scope['url_route']['kwargs']['order_id']
    self.room_group_name = f'order_{self.order_id}'

    await self.channel_layer.group_add(
      self.room_group_name,
      self.channel_name
    )

    await self.accept()

  async def disconnect(self, close_code):
    await self.channel_layer.group_discard(
      self.room_group_name,
      self.channel_name
    )

  async def receive(self, text_data):
    data = json.loads(text_data)
    new_status = data.get('status')

    if new_status:
      # Actualizar el estado de la orden
      await self.update_order_status(self.order_id, new_status)

      # Notificar a todos los clientes conectados a este canal
      await self.channel_layer.group_send(
        self.room_group_name,
        {
          'type': 'send_order_status',
        }
      )

  async def send_order_status(self, event):
    order = await self.get_order(self.order_id)
    order_serializer = OrderSerializer(order)

    # Imprimir en consola para verificar
    print(f"Estado actualizado de la orden {self.order_id}: {order_serializer.data['status']}")

    await self.send(text_data=json.dumps({
      'status': order_serializer.data['status'],
      'message': 'Order status updated!'
    }, cls=DjangoJSONEncoder))

  @sync_to_async
  def get_order(self, order_id):
    return Order.objects.get(id=order_id)

  @sync_to_async
  def update_order_status(self, order_id, status_name):
    from .models import OrderStatus  # Asegúrate de importar el modelo correcto

    order = Order.objects.get(id=order_id)
    try:
      status_instance = OrderStatus.objects.get(name=status_name)
    except OrderStatus.DoesNotExist:
      raise ValueError(f"No existe un estado con el nombre '{status_name}'")

    order.status = status_instance
    order.save()
