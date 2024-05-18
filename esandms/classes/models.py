from django.db import models
import datetime

# Create your models here.

class BaseModel(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Classes(BaseModel):
    SEMESTER_CHOICES = [
    ('İlkbahar', 'İlkbahar'),
    ('Sonbahar', 'Sonbahar'),
]
    
    YEAR_CHOICES = [
    (1, '1'),
    (2, '2'),
    (3, '3'),
    (4, '4'),
]

    name = models.CharField(max_length=50)
    year = models.IntegerField(choices=YEAR_CHOICES)
    semester = models.CharField(max_length=8, choices=SEMESTER_CHOICES)
    count_of_students = models.IntegerField()

    def __str__(self):
        return self.name + " " + str(self.year) + ".Sinif " + str(self.semester)+ " Dönemi"
