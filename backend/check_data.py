import os
import django
import json

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "portfolio_backend.settings")
django.setup()

from core.models import Project, Certificate

projects = [{"id": p.id, "title": p.title} for p in Project.objects.all()]
certs = [{"id": c.id, "title": c.title} for c in Certificate.objects.all()]

with open("data_check.json", "w") as f:
    json.dump({"projects": projects, "certs": certs}, f, indent=2)

print("Dumped to data_check.json")
