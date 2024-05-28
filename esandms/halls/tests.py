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

        self.token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4MDgxNjc0LCJpYXQiOjE3MTY4NzIwNzQsImp0aSI6ImZhMWFlYWRmYTJiMTQ5ZjM4NjQ3Yzk0YTNlN2Q5Y2E3IiwidXNlcl9pZCI6NH0._Ih-mGdoDvwdv2sOriPqBpdLJcLzypDY8Uo8ZYscUis"
        self.username = 'uniproject'
        self.password = 'unisupport23'
        self.user = User.objects.create_superuser(username=self.username, password=self.password)
        self.test_jwt_authentication()

    def test_jwt_authentication(self):
        is_authenticated = authenticate_user(self.client, self.username, self.password)
        self.assertTrue(is_authenticated)

    def test_halls_list_create_view_get(self):
        response = self.client.get(self.list_create_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_halls_list_create_view_post(self):
        response = self.client.post(self.list_create_url, json.dumps({'name': 'Test Hall 2', 'number_of_seats': 200}), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Test Hall 2')
        self.assertEqual(response.data['number_of_seats'], 200)

    def test_halls_detail_view_patch(self):
        data = {
            'name': 'C583',
            'number_of_seats': 500
        }
        response = self.client.patch(self.detail_url, json.dumps(data), content_type='application/json', HTTP_AUTHORIZATION=self.token)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_halls_detail_view_delete(self):
        response = self.client.delete(self.detail_url, HTTP_AUTHORIZATION=self.token)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)