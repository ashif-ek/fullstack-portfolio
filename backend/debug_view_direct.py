import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "portfolio_backend.settings")
django.setup()

from django.test import RequestFactory
from core.health_view import health_check

try:
    factory = RequestFactory()
    request = factory.get("/health/")
    response = health_check(request)
    print(f"Status Code: {response.status_code}")
    print(f"Content: {response.content}")
except Exception as e:
    import traceback

    traceback.print_exc()
