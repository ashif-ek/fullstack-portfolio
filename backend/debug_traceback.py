import os
import django
import re

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "portfolio_backend.settings")
django.setup()

from django.test import Client

try:
    c = Client()
    response = c.get("/health/")
    print(f"Status Code: {response.status_code}")
    if response.status_code == 500:
        content = response.content.decode("utf-8")
        # Try to find exception in Django debug page
        # Look for <pre class="exception_value">
        match = re.search(r'<pre class="exception_value">([^<]+)</pre>', content)
        if match:
            print(f"Exception Value: {match.group(1)}")

        # Look for exception type
        match_type = re.search(r"<th>Exception Type:</th>\s*<td>([^<]+)</td>", content)
        if match_type:
            print(f"Exception Type: {match_type.group(1)}")

        # Print first few lines of traceback if possible, usually in logic.
        # But just type/value is often enough.

except Exception as e:
    print(e)
