from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from halls.models import Hall
from halls.api.serializers import HallsSerializer
from django.contrib.auth.models import User
import json
from esandms.jwt_authentication import authenticate_user 
from rest_framework.test import APIClient
from classes.models import Classes


class ClassesAPITestCase(TestCase):
    
    list_create_url = reverse('classes:list-create')


    def setUp(self):
        self.client = APIClient()
        self.username = 'uniproject'
        self.password = 'unisupport23'
        self.user = User.objects.create_superuser(username=self.username, password=self.password)
        self.test_jwt_authentication()
        self.classes = Classes.objects.create(name='Bilgisayar Mühendisligi', semester='İlkbahar', year=4, count_of_students=500)
        self.update_delete_url = reverse("classes:update-delete", kwargs={"pk": self.classes.pk})

    def test_jwt_authentication(self):
        is_authenticated = authenticate_user(self.client, self.username, self.password)
        self.assertTrue(is_authenticated)

    def test_classes_list_create_view_get(self):
        response = self.client.get(self.list_create_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_classes_list_create_view_post(self):
        response = self.client.post(self.list_create_url, json.dumps({ "name": "Elektrik Mühendisliği2", "year": 3, 
                                                                      "semester": "İlkbahar", "count_of_students": 625 }), 
                                                                      content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Elektrik Mühendisliği2')
        self.assertEqual(response.data['year'], 3)

    def test_update_classes(self):
        classes_data = {"name": "Elektrik Mühendisliği", "year": 3, "semester": "İlkbahar", "count_of_students": 625}
        response = self.client.put(self.update_delete_url, json.dumps(classes_data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_classes(self):
        response = self.client.delete(self.update_delete_url)
        self.assertEqual(204, response.status_code)

    



