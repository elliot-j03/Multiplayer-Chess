from fastapi.testclient import TestClient
import unittest
from main import app


client = TestClient(app)


class TestGameEndpoints(unittest.TestCase):

    def test_search_found_none(self):
        response = client.post(
            "/game/match-search",
            json={
                "client_uid": "0001",
            }
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {
            "matchFound": False
        })