import os
import django
import json

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "portfolio_backend.settings")
django.setup()

from core.models import Certificate

certs = [
    {"id": c.id, "title": c.title, "issuer": c.issuer}
    for c in Certificate.objects.all()
]

with open("certs_check.json", "w") as f:
    json.dump(certs, f, indent=2)

print("Dumped to certs_check.json")
