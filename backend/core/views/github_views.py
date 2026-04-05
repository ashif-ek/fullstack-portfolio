from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from core.serializers.github import GitHubRepoSerializer
from core.services.github_service import GitHubService
from core.utils.response_wrapper import standard_response


class GitHubRepoViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Standardized GitHub Repository API with sync capabilities.
    """
    serializer_class = GitHubRepoSerializer
    permission_classes = [permissions.AllowAny]
    service = GitHubService()

    def list(self, request, *args, **kwargs):
        repos = self.service.get_all_repos()
        serializer = self.get_serializer(repos, many=True)
        return standard_response(success=True, data=serializer.data)

    @action(detail=False, methods=["post"], permission_classes=[permissions.AllowAny])
    def sync(self, request):
        """
        Trigger the GitHub sync management command via an API call.
        Secure with a simple token verified against environment variables.
        """
        provided_token = request.headers.get("X-Sync-Token")
        success, message = self.service.trigger_sync(provided_token)
        
        if success:
            return standard_response(success=True, data={"status": message})
        
        return standard_response(success=False, error=message, status=401 if "Unauthorized" in message else 500)
