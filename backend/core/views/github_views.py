from rest_framework import viewsets, permissions
from core.models import GitHubRepo
from core.serializers.github import GitHubRepoSerializer


class GitHubRepoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GitHubRepo.objects.all().order_by("-stars")
    serializer_class = GitHubRepoSerializer
    permission_classes = [permissions.AllowAny]
