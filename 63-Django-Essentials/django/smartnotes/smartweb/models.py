from django.contrib.auth.models import User
from django.db import models

class Journal(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file_upload = models.FileField(upload_to='', blank=True, null=True)