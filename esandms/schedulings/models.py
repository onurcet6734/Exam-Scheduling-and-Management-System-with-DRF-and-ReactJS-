from django.db import models
# from accounts.models import UserModel
from classes.models import Classes
from exams.models import Exam
from halls.models import Hall

# Create your models here.

class BaseModel(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Scheduling(BaseModel):
    classid = models.ForeignKey(Classes, on_delete=models.CASCADE)
    papername = models.CharField(max_length=50)
    exam_start_date = models.DateTimeField()
    exam_finish_date = models.DateTimeField()
    duration = models.IntegerField()
    hallid = models.ForeignKey(Hall, on_delete=models.CASCADE)
    examid = models.ForeignKey(Exam, on_delete=models.CASCADE)
    # studentid = models.ForeignKey(UserModel, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        self.duration = (self.exam_finish_date - self.exam_start_date).seconds/60
        super(Scheduling, self).save(*args, **kwargs)

