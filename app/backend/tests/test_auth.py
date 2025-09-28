from fastapi.testclient import TestClient
import unittest
from main import app


client = TestClient(app)


class TestAuthEndpoints(unittest.TestCase):
    
    def test_user_create(self):
        response = client.post(
            "/auth/create",
            json={
                "username": "test_user",
                "email": "test@email.com",
                "password": "test_password"
            }
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {
            "Success": True,
            "username": "test_user",
            "email": "test@email.com"
        })

    def test_user_already_exists(self):
        response = client.post(
            "/auth/create",
            json={
                "username": "taken_user",
                "email": "test@email.com",
                "password": "test_password"
            }
        )
        self.assertEqual(response.status_code, 409)
        self.assertEqual(response.json(), {
            "detail": "The username provided already exists"
        })