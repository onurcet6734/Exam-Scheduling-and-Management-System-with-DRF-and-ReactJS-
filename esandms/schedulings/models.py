from django.db import models
from classes.models import Classes
from exams.models import Exam
from halls.models import Hall
from django.contrib.auth.models import User

# Create your models here.

class BaseModel(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Scheduling(BaseModel):
    classid = models.ForeignKey(Classes, on_delete=models.CASCADE)
    school_number = models.CharField(max_length=15)
    exam_start_date = models.DateTimeField()
    exam_finish_date = models.DateTimeField()
    duration = models.IntegerField(editable=False)
    hallid = models.ForeignKey(Hall, on_delete=models.CASCADE)
    examid = models.ForeignKey(Exam, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        self.duration = (self.exam_finish_date - self.exam_start_date).seconds/60
        super(Scheduling, self).save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.school_number} - {self.classid.name}"
    
    #show class name in admin

