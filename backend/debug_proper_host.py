import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "portfolio_backend.settings")
django.setup()

from django.test import Client

try:
    # Use correct host to pass ALLOWED_HOSTS check
    c = Client(HTTP_HOST="localhost")
    response = c.get("/health/")
    print(f"Status Code: {response.status_code}")
    if response.status_code != 200:
        print(response.content.decode("utf-8")[:2000])  # Print first 2000 chars
except Exception as e:
    import traceback

    traceback.print_exc()
