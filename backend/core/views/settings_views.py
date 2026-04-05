from rest_framework import viewsets
from core.serializers import SiteSettingsSerializer
from core.services.settings_service import SettingsService
from core.utils.response_wrapper import standard_response


class SiteSettingsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API for global site configurations with caching support.
    """
    serializer_class = SiteSettingsSerializer
    service = SettingsService()

    def list(self, request, *args, **kwargs):
        settings = self.service.get_settings()
        if not settings:
            return standard_response(success=False, error="Settings not found", status=404)
        
        serializer = self.get_serializer(settings)
        return standard_response(success=True, data=serializer.data)
