from core.services.base_service import BaseService
from core.repositories.portfolio_repo import PortfolioRepository

class PortfolioService(BaseService):
    """
    Service Layer for complex Portfolio logic and caching.
    Ensures business rules are applied before data persistence.
    """
    
    CACHE_KEY_PROJECTS = "portfolio:projects:all"
    CACHE_KEY_SKILLS = "portfolio:skills:all"
    CACHE_KEY_TOOLS = "portfolio:tools:all"
    CACHE_KEY_SERVICES = "portfolio:services:all"
    CACHE_KEY_CERTIFICATES = "portfolio:certificates:all"

    repo = PortfolioRepository()

    def get_all_projects(self):
        return self.get_cached(self.CACHE_KEY_PROJECTS, self.repo.get_all_projects_optimized)

    def get_all_skills(self):
        return self.get_cached(self.CACHE_KEY_SKILLS, self.repo.get_all_skills)

    def get_all_tools(self):
        return self.get_cached(self.CACHE_KEY_TOOLS, self.repo.get_all_tools)

    def get_all_services(self):
        return self.get_cached(self.CACHE_KEY_SERVICES, self.repo.get_all_services)

    def get_all_certificates(self):
        return self.get_cached(self.CACHE_KEY_CERTIFICATES, self.repo.get_all_certificates)

    def increment_project_click(self, project_id):
        """
        Increments a project's click count and invalidates the project cache.
        """
        from django.db.models import F
        from core.models.portfolio import Project

        Project.objects.filter(pk=project_id).update(clicks=F("clicks") + 1)
        self.invalidate_cache(self.CACHE_KEY_PROJECTS)
        
        # Return the updated object
        return self.repo.get_project_by_id(project_id)
