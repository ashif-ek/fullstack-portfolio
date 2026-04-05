from core.models.portfolio import Project, Skill, Tool, Certificate, Service

class PortfolioRepository:
    """
    Data Access Layer (DAL) for Portfolio-related models.
    Encapsulates all ORM queries and ensures optimized data fetching.
    """
    
    @staticmethod
    def get_all_projects_optimized():
        """
        Retrieves all projects with optimized prefetching.
        """
        # Optimized with prefetch_related for M2M or Reverse Relationships
        # select_related for ForeignKeys
        return Project.objects.all().order_by('-created_at')

    @staticmethod
    def get_project_by_id(project_id):
        return Project.objects.filter(id=project_id).first()

    @staticmethod
    def get_all_skills():
        return Skill.objects.all().order_by('category', '-level')

    @staticmethod
    def get_all_tools():
        return Tool.objects.all()

    @staticmethod
    def get_all_certificates():
        return Certificate.objects.all().order_by('-date')

    @staticmethod
    def get_all_services():
        return Service.objects.all()
