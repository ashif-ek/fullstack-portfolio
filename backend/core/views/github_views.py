from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.management import call_command
from django.conf import settings
from core.models import GitHubRepo
from core.serializers.github import GitHubRepoSerializer
import os

class GitHubRepoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GitHubRepo.objects.all().order_by("-stars")
    serializer_class = GitHubRepoSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=["post"], permission_classes=[permissions.AllowAny])
    def sync(self, request):
        """
        Trigger the GitHub sync management command via an API call.
        Secure with a simple token verified against environment variables.
        """
        provided_token = request.headers.get("X-Sync-Token")
        secret_token = os.getenv("SYNC_SECRET_TOKEN")

        if not secret_token:
            return Response(
                {"error": "Sync secret token not configured on server."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        if provided_token != secret_token:
            return Response(
                {"error": "Unauthorized sync request."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        try:
            call_command("sync_github")
            return Response({"status": "Sync completed successfully."})
        except Exception as e:
            return Response(
                {"error": f"Sync failed: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
