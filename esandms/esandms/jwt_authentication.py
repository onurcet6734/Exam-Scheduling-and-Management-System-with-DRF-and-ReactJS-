from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse


def authenticate_user(client, username, password):
    url_login = "https://api.qrdestek.com/api/token/"
    response = client.post(url_login, data={"username": username, "password": password})
    if response.status_code == status.HTTP_200_OK:
        token = response.data.get("access", None)
        if token:
            client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
            return True
    return False