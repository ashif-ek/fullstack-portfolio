from rest_framework import viewsets

from core.models import SiteSettings

from core.serializers import SiteSettingsSerializer


class SiteSettingsViewSet(viewsets.ModelViewSet):
    queryset = SiteSettings.objects.all()
    serializer_class = SiteSettingsSerializer
