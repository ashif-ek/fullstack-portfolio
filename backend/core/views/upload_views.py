from rest_framework import views, permissions
from core.services.upload_service import UploadService
from core.utils.response_wrapper import standard_response


class UploadView(views.APIView):
    """
    Standardized API for handling media file uploads.
    """
    permission_classes = [permissions.AllowAny]  # Or IsAuthenticated
    service = UploadService()

    def post(self, request, *args, **kwargs):
        file = request.FILES.get("image")
        if not file:
            return standard_response(success=False, error="No file uploaded", status=400)

        success, result = self.service.handle_upload(file)
        if success:
            return standard_response(success=True, data=result, status=201)
        
        return standard_response(success=False, error=result, status=500)
