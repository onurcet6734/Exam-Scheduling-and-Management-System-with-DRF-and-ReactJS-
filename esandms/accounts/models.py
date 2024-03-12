# from django.db import models
# from django.contrib.auth.models import AbstractUser

# from classes.models import Classes

# # Create your models here.
# class UserModel(AbstractUser):
#     classid = models.ForeignKey(Classes, on_delete=models.CASCADE)
#     ROLE_CHOICES = [
#         ('S', 'Student'),
#         ('A', 'Admin'),
#     ]
#     role = models.CharField(max_length=1,choices=ROLE_CHOICES)

#     def __str__(self):
#         return self.username