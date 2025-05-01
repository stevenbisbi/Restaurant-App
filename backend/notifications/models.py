from django.db import models
import uuid
from users.models import User
# Create your models here.

class Notification(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
<<<<<<< HEAD
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name="notifications")
=======
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notifications")
>>>>>>> dfc400d6057bd966c93099f7736d4b1afa04efbe
    title = models.CharField(max_length=100)
    message = models.TextField()
    type = models.CharField(max_length=50)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title