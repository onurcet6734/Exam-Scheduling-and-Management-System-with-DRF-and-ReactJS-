from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from halls.models import Hall
from django.contrib.auth.models import User
import json
from esandms.jwt_authentication import authenticate_user
from rest_framework.test import APIClient


class HallsAPITestCase(TestCase):

    list_create_url = reverse('halls:list-create')

    def setUp(self):
        self.client = APIClient()
        self.username = 'uniproject'
        self.password = 'unisupport23'
        self.user = User.objects.create_superuser(username=self.username, password=self.password)
        self.test_jwt_authentication()
        self.hall = Hall.objects.create(name='Test Hall', number_of_seats=100)
        self.update_delete_url = reverse("halls:update-delete", kwargs={"pk": self.hall.pk})


    def test_jwt_authentication(self):
        is_authenticated = authenticate_user(self.client, self.username, self.password)
        self.assertTrue(is_authenticated)

    def test_halls_list_create_view_get(self):
        response = self.client.get(self.list_create_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_halls_list_create_view_post(self):
        response = self.client.post(self.list_create_url, json.dumps({'name': 'Test Hall 2', 
                                                        'number_of_seats': 200}), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Test Hall 2')
        self.assertEqual(response.data['number_of_seats'], 200)

    def test_update_hall(self):
        hall_data = {'name': 'T blok 331', 'number_of_seats': 500}
        response = self.client.put(self.update_delete_url, json.dumps(hall_data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_delete_hall(self):
        response = self.client.delete(self.update_delete_url)
        self.assertEqual(204, response.status_code)


