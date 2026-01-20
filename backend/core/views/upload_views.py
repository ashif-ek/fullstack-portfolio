from rest_framework import views, permissions, status
from rest_framework.response import Response
from django.core.files.storage import default_storage


class UploadView(views.APIView):
    permission_classes = [permissions.AllowAny]  # Or IsAuthenticated

    def post(self, request, *args, **kwargs):
        file = request.FILES.get("image")
        if not file:
            return Response(
                {"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST
            )

        file_name = default_storage.save(file.name, file)
        file_url = default_storage.url(file_name)

        return Response(
            {"url": file_url, "filename": file_name}, status=status.HTTP_201_CREATED
        )
