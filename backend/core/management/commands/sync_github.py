import requests
from django.core.management.base import BaseCommand
from django.conf import settings
from core.models import GitHubRepo
from django.utils.dateparse import parse_datetime
import logging

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Sync GitHub repositories for the configured user"

    def handle(self, *args, **options):
        username = settings.GITHUB_USERNAME
        token = settings.GITHUB_TOKEN

        if not username:
            self.stderr.write("GITHUB_USERNAME not set in settings")
            return

        url = f"https://api.github.com/users/{username}/repos"
        headers = {}
        if token:
            headers["Authorization"] = f"token {token}"

        try:
            response = requests.get(url, headers=headers)

            if response.status_code == 403:
                self.stderr.write("Rate limit exceeded or forbidden access.")
                return

            response.raise_for_status()
            repos_data = response.json()

            for repo_data in repos_data:
                # Forked repos might not be desired, but including all for now as per requirements
                # unless specified otherwise.

                last_commit_str = repo_data.get("pushed_at")
                last_commit = (
                    parse_datetime(last_commit_str) if last_commit_str else None
                )

                GitHubRepo.objects.update_or_create(
                    name=repo_data["name"],
                    defaults={
                        "stars": repo_data.get("stargazers_count", 0),
                        "forks": repo_data.get("forks_count", 0),
                        "language": repo_data.get("language"),
                        "last_commit": last_commit,
                        "repo_url": repo_data.get("html_url"),
                    },
                )

            self.stdout.write(
                self.style.SUCCESS(
                    f"Successfully synced {len(repos_data)} repositories for {username}"
                )
            )

        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching GitHub repos: {e}")
            self.stderr.write(f"Error fetching GitHub repos: {e}")
