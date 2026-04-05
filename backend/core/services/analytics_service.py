from core.services.base_service import BaseService
from core.repositories.analytics_repo import AnalyticsRepository

class AnalyticsService(BaseService):
    """
    Service Layer for Analytics.
    We cache the visitor count for efficiency, but increments invalidate the cache immediately.
    """
    CACHE_KEY_VISITORS = "analytics:visitors:total"
    repo = AnalyticsRepository()

    def get_total_visitors(self):
        return self.get_cached(self.CACHE_KEY_VISITORS, lambda: self.repo.get_visitor_count().total_visitors)

    def track_visitor(self):
        updated_obj = self.repo.increment_visitors()
        self.invalidate_cache(self.CACHE_KEY_VISITORS)
        return updated_obj.total_visitors

    def track_portfolio_view(self):
        updated_obj = self.repo.increment_portfolio_views()
        return updated_obj.total_views
