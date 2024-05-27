from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from halls.models import Hall
from halls.api.serializers import HallsSerializer
from django.contrib.auth.models import User
import json
from esandms.jwt_authentication import authenticate_user 
from rest_framework.test import APIClient


class HallsAPITestCase(TestCase):

    list_create_url = "https://api.qrdestek.com/api/hall/list-create/"
    detail_url = "https://api.qrdestek.com/api/hall/update-delete/43/"

    def setUp(self):
        self.client = APIClient()

        self.username = 'uniproject'
        self.password = 'unisupport23'
        self.user = User.objects.create_superuser(username=self.username, password=self.password)
        self.test_jwt_authentication()

    def test_jwt_authentication(self):
        is_authenticated = authenticate_user(self.client, self.username, self.password)
        self.assertTrue(is_authenticated)

    def test_halls_list_create_view_get(self):
        print(self.list_create_url)
        response = self.client.get(self.list_create_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_halls_list_create_view_post(self):
        response = self.client.post(self.list_create_url, json.dumps({'name': 'Test Hall 2', 'number_of_seats': 200}), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Test Hall 2')
        self.assertEqual(response.data['number_of_seats'], 200)
    


    def test_halls_detail_view_put(self):
        data = {
            'name': 'C583',
            'number_of_seats': 500
        }
        response = self.client.put("https://api.qrdestek.com/api/hall/update-delete/43", json.dumps(data), content_type='application/json')
        self.assertEqual(301, response.status_code)

    def test_halls_detail_view_delete(self):
        response = self.client.delete("https://api.qrdestek.com/api/hall/update-delete/43")
        self.assertEqual(301, response.status_code)

 

