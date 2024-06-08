from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from exams.models import Exam
from django.contrib.auth.models import User
import json
from esandms.jwt_authentication import authenticate_user 
from rest_framework.test import APIClient
from classes.models import Classes


class ExamsAPITestCase(TestCase):

    list_create_url = reverse('exams:list-create')

    def setUp(self):
        self.client = APIClient()
        self.username = 'uniproject'
        self.password = 'unisupport23'
        self.user = User.objects.create_superuser(username=self.username, password=self.password)
        self.test_jwt_authentication()
        self.class_instance = Classes.objects.create(name='Bilgisayar Mühendisligi',year=4,semester='Sonbahar',count_of_students=100) 
        self.exam = Exam.objects.create(name="Software Design Applications",classid=self.class_instance)
        self.update_delete_url = reverse("exams:update-delete", kwargs={"pk": self.exam.pk})

    def test_jwt_authentication(self):
        is_authenticated = authenticate_user(self.client, self.username, self.password)
        self.assertTrue(is_authenticated)

    def test_create_exam(self):
        response = self.client.post(self.list_create_url, data = {"name": "Software Design Applications", "classid": self.class_instance.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_all_exams(self):
        response = self.client.get(self.list_create_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_exam(self):
        response = self.client.get(self.update_delete_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_exam(self):
        response = self.client.put(self.update_delete_url, data = {"name": "Software Design Applications", "classid": self.class_instance.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_exam(self):
        response = self.client.delete(self.update_delete_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    