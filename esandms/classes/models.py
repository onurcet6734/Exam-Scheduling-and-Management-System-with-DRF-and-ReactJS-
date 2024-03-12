from django.db import models
import datetime

# Create your models here.

class BaseModel(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Classes(BaseModel):
    name = models.CharField(max_length=50)
    year = models.IntegerField()
    semester = models.IntegerField()
    count_of_students = models.IntegerField()