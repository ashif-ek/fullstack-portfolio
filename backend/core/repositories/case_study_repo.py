from core.models.case_study import ProjectCaseStudy

class CaseStudyRepository:
    """
    Data Access Layer (DAL) for Project Case Studies.
    """
    @staticmethod
    def get_all_optimized():
        return ProjectCaseStudy.objects.all()

    @staticmethod
    def get_by_slug(slug):
        return ProjectCaseStudy.objects.filter(slug=slug).first()
