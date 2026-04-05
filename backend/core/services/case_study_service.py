from core.services.base_service import BaseService
from core.repositories.case_study_repo import CaseStudyRepository

class CaseStudyService(BaseService):
    """
    Service Layer for Project Case Studies with caching.
    """
    CACHE_KEY_LIST = "casestudies:all"
    CACHE_KEY_PREFIX_DETAIL = "casestudies:detail:"
    repo = CaseStudyRepository()

    def get_all(self):
        return self.get_cached(self.CACHE_KEY_LIST, self.repo.get_all_optimized)

    def get_by_slug(self, slug):
        cache_key = f"{self.CACHE_KEY_PREFIX_DETAIL}{slug}"
        return self.get_cached(cache_key, lambda: self.repo.get_by_slug(slug))
