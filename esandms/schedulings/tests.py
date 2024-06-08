from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.models import User
from schedulings.models import Scheduling, Classes, Hall, Exam
from esandms.jwt_authentication import authenticate_user 
import json
from datetime import datetime, timedelta
import pytz
from schedulings.api.services import CheckCourseOverlappingService



class SchedulingViewTestCase(TestCase):
    """Test case for the Scheduling views"""

    url_listCreate =  reverse('schedulings:list-create')

    def setUp(self):
        self.client = APIClient()
        self.username = 'admin'
        self.password = '1234'
        self.student_user = User.objects.create_user(username='senasincanli', password='1234')
        self.class_instance = Classes.objects.create(name='Endustri Mühendisligi',year=4,
                                                     semester='Sonbahar',count_of_students=100) 
        self.exam = Exam.objects.create(name="Software Design Applicationdas",classid=self.class_instance)
        self.hall = Hall.objects.create(name='Test Hall', number_of_seats=100)
        self.start_time = datetime.now(pytz.UTC) 
        self.end_time= self.start_time + timedelta(hours=2)
        self.user = User.objects.create_superuser(username=self.username, password=self.password,is_superuser=True)
        self.test_jwt_authentication()
        self.service = CheckCourseOverlappingService()



    def test_jwt_authentication(self):
        is_authenticated = authenticate_user(self.client, self.username, self.password)
        self.assertTrue(is_authenticated)

    def test_create_scheduling(self):
        response = self.client.post(self.url_listCreate, data = {"school_number": "123456", 
                                                                 "exam_start_date": "2023-12-12T10:00:00Z", 
                                                                 "exam_finish_date": "2023-12-12T11:00:00Z", 
                                                                 "classid": self.class_instance.id, "hallid": self.hall.id, 
                                                                 "examid": self.exam.id, "user": self.student_user.id }, 
                                                                 format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_get_all_schedulings(self):
        response = self.client.get(self.url_listCreate)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_scheduling(self):
        scheduling = Scheduling.objects.create(school_number='123456', exam_start_date=self.start_time, 
                                               exam_finish_date=self.end_time, classid=self.class_instance, 
                                               hallid=self.hall, examid=self.exam, user=self.student_user)
        response = self.client.get(reverse('schedulings:update-delete', kwargs={'pk': scheduling.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_scheduling(self):
        scheduling = Scheduling.objects.create(school_number='123456', exam_start_date=self.start_time, 
                                               exam_finish_date=self.end_time, classid=self.class_instance, 
                                               hallid=self.hall, examid=self.exam, user=self.student_user)
        response = self.client.put(reverse('schedulings:update-delete', kwargs={'pk': scheduling.id}), 
                                   data = {"school_number": "123456", 
                                                                 "exam_start_date": "2023-12-12T10:00:00Z", 
                                                                 "exam_finish_date": "2023-12-12T11:00:00Z", 
                                                                 "classid": self.class_instance.id, "hallid": self.hall.id, 
                                                                 "examid": self.exam.id, "user": self.student_user.id }, 
                                                                 format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_scheduling(self):
        scheduling = Scheduling.objects.create(school_number='123456', exam_start_date=self.start_time, 
                                               exam_finish_date=self.end_time, 
                                               classid=self.class_instance, hallid=self.hall, 
                                               examid=self.exam, user=self.student_user)
        response = self.client.delete(reverse('schedulings:update-delete', kwargs={'pk': scheduling.id}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

class StudentTestCase(TestCase):
    """Test case for the ShowStudentSchedule view"""

    url_listCreate = reverse('user-list') 
    student_url = url_listCreate + "?is_superuser=False"

    def setUp(self):
        self.client = APIClient()
        self.username = 'admin'
        self.password = '1234'
        self.student_user = User.objects.create_user(username='senasincanli', password='senasincanli1234')
        self.user = User.objects.create_superuser(username=self.username, password=self.password,is_superuser=True)
        self.test_jwt_authentication()

    def test_jwt_authentication(self):
        is_authenticated = authenticate_user(self.client, self.username, self.password)
        self.assertTrue(is_authenticated)


    def test_get_all_student(self):
        response = self.client.get(self.student_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), User.objects.filter(is_superuser=False).count())
        self.assertTrue(all([not user['is_superuser'] for user in response.data]))

    def test_create_student(self):
        response = self.client.post(self.url_listCreate, data = {"username": "testuser","password":"testuser1234",
                                                                  "is_superuser": False,
                                                                  "email":"testuser@ubis.com"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_student(self):
        user = User.objects.create_user(username='testuser', password='testuser1234',email="testuser@ubis.com",is_superuser=False)

        response = self.client.put(reverse('user-detail', kwargs={'pk': user.id}), 
                                   data = {"username": "testuser","password":"testuser1234",
                                                                  "is_superuser": False,
                                                                  "email":"testuser@ubis.com"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_student(self):
        user = User.objects.create_user(username='testuser', password='testuser1234',email="testuser@ubis.com",is_superuser=False)
        response = self.client.delete(reverse('user-detail', kwargs={'pk': user.id}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
    
