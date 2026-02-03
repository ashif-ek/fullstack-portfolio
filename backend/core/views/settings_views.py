from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from core.models import SiteSettings

from core.serializers import SiteSettingsSerializer


class SiteSettingsViewSet(viewsets.ModelViewSet):
    queryset = SiteSettings.objects.all()
    serializer_class = SiteSettingsSerializer


@api_view(["GET"])
def health_check(request):
    return Response({"status": "ok"})
