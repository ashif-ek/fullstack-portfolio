from rest_framework import viewsets
from core.serializers import ProfileSerializer, MessageSerializer
from core.services.profile_service import ProfileService
from core.utils.response_wrapper import standard_response


class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Standardized Profile API with caching.
    """
    serializer_class = ProfileSerializer
    service = ProfileService()

    def list(self, request, *args, **kwargs):
        profile = self.service.get_profile()
        if not profile:
            return standard_response(success=False, error="Profile not found", status=404)
        
        serializer = self.get_serializer(profile)
        return standard_response(success=True, data=serializer.data)


class MessageViewSet(viewsets.ModelViewSet):
    """
    Handles visitor contact messages.
    """
    serializer_class = MessageSerializer
    service = ProfileService()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            message = self.service.handle_contact_message(serializer.validated_data)
            return standard_response(success=True, data=self.get_serializer(message).data, status=201)
        
        return standard_response(success=False, error=serializer.errors, status=400)
