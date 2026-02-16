import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "portfolio_backend.settings")
django.setup()

from django.test import Client


def test_endpoint(endpoint):
    try:
        c = Client(HTTP_HOST="localhost")
        print(f"Testing {endpoint}...")
        response = c.get(endpoint)
        print(f"Status Code: {response.status_code}")
        if response.status_code != 200:
            print(f"ERROR: {response.content.decode('utf-8')[:2000]}")
    except Exception as e:
        import traceback

        traceback.print_exc()


test_endpoint("/projects/")
test_endpoint("/skills/")
