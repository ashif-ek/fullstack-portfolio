from django.db import models


class GitHubRepo(models.Model):
    name = models.CharField(max_length=255, unique=True)
    stars = models.PositiveIntegerField(default=0)
    forks = models.PositiveIntegerField(default=0)
    language = models.CharField(max_length=100, blank=True, null=True)
    last_commit = models.DateTimeField(blank=True, null=True)
    repo_url = models.URLField()
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-stars"]
        verbose_name = "GitHub Repository"
        verbose_name_plural = "GitHub Repositories"

    def __str__(self):
        return self.name
