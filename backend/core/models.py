from django.contrib.auth.models import AbstractUser
from django.db import models
from mongoengine import Document, StringField, EmailField, BooleanField, ListField, ReferenceField

class CustomUser(AbstractUser):
    phone = models.CharField(max_length=15, blank=True)
    address = models.JSONField(default=dict)
    is_vendor = models.BooleanField(default=False)

    def __str__(self):
        return self.email
