from core.models.github import GitHubRepo

class GitHubRepository:
    """
    Data Access Layer (DAL) for GitHub Repository data.
    """
    @staticmethod
    def get_all_repos_optimized():
        return GitHubRepo.objects.all().order_by("-stars")
