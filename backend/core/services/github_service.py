from core.services.base_service import BaseService
from core.repositories.github_repo import GitHubRepository
from django.core.management import call_command
import os
import logging

logger = logging.getLogger(__name__)

class GitHubService(BaseService):
    """
    Service Layer for GitHub Repository management.
    Includes logic for triggering background syncs.
    """
    CACHE_KEY_REPOS = "github:repos:all"
    repo = GitHubRepository()

    def get_all_repos(self):
        """
        Retrieves all GitHub repositories with caching.
        """
        return self.get_cached(self.CACHE_KEY_REPOS, self.repo.get_all_repos_optimized)

    def trigger_sync(self, provided_token):
        """
        Authenticates and triggers the GitHub sync management command.
        """
        secret_token = os.getenv("SYNC_SECRET_TOKEN")
        
        if not secret_token:
            return False, "Sync secret token not configured on server."

        if provided_token != secret_token:
            return False, "Unauthorized sync request."

        try:
            # This is a synchronous call for now, but ideally offloaded to Celery
            call_command("sync_github")
            self.invalidate_cache(self.CACHE_KEY_REPOS)
            return True, "Sync completed successfully."
        except Exception as e:
            logger.error(f"GitHub Sync Error: {e}")
            return False, f"Sync failed: {str(e)}"
