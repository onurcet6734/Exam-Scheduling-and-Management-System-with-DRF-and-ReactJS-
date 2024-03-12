from django.db import models
import datetime
from classes.models import Classes
from django.contrib.auth.models import User


# Create your models here.

class BaseModel(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Exam(BaseModel):
    classid = models.ForeignKey(Classes, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    school_number = models.CharField(max_length=50)
    login = models.ForeignKey(User, on_delete=models.CASCADE)