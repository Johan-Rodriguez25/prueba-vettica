from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Log(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    resource = models.CharField(max_length=255)
    payload = models.TextField()
    headers = models.TextField()
    user_id = models.IntegerField()
    # user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    http_method = models.CharField(max_length=10)
    processing_time_ms = models.PositiveIntegerField()
    client_http_status = models.PositiveIntegerField()
    api_http_status = models.PositiveIntegerField()
    client_ip = models.GenericIPAddressField()
    
    def __str__(self):
       return f"{self.timestamp} - {self.user_id} - {self.resource}"