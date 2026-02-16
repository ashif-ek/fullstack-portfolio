import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "portfolio_backend.settings")
django.setup()

from django.test import Client

try:
    c = Client(HTTP_HOST="localhost")
    print("Testing OPTIONS /projects/...")
    response = c.options(
        "/projects/",
        HTTP_ORIGIN="http://localhost:3000",
        HTTP_ACCESS_CONTROL_REQUEST_METHOD="GET",
    )
    print(f"Status Code: {response.status_code}")
    print(f"Headers: {response.headers}")
except Exception as e:
    import traceback

    traceback.print_exc()
