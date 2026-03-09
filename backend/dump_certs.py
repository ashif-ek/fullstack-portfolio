import os
import django
import json

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "portfolio_backend.settings")
django.setup()

from core.models import Certificate
from core.serializers import CertificateSerializer

data = [CertificateSerializer(c).data for c in Certificate.objects.all()]
with open("certificates_dump.json", "w") as f:
    json.dump(data, f, indent=2)

print("Dumped to certificates_dump.json")
