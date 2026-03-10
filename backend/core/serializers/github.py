from rest_framework import serializers
from core.models import GitHubRepo


class GitHubRepoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GitHubRepo
        fields = [
            "name",
            "stars",
            "forks",
            "language",
            "last_commit",
            "repo_url",
        ]
