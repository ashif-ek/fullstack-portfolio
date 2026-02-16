import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "portfolio_backend.settings")
django.setup()

from django.test import Client

try:
    c = Client(raise_request_exception=True)
    response = c.get("/health/")
    print(f"Status Code: {response.status_code}")
    if response.status_code != 200:
        print("Response Content:")
        print(response.content.decode("utf-8"))
except Exception as e:
    import traceback

    traceback.print_exc()
