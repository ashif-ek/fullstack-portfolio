from core.models.analytics import VisitorCount, PortfolioAnalytics
from django.db.models import F

class AnalyticsRepository:
    """
    Data Access Layer (DAL) for Analytics.
    """
    @staticmethod
    def get_visitor_count():
        obj, _ = VisitorCount.objects.get_or_create(id=1)
        return obj

    @staticmethod
    def increment_visitors():
        VisitorCount.objects.filter(id=1).update(total_visitors=F('total_visitors') + 1)
        return VisitorCount.objects.get(id=1)

    @staticmethod
    def get_portfolio_analytics():
        obj, _ = PortfolioAnalytics.objects.get_or_create(id=1)
        return obj

    @staticmethod
    def increment_portfolio_views():
        PortfolioAnalytics.objects.filter(id=1).update(total_views=F('total_views') + 1)
        return PortfolioAnalytics.objects.get(id=1)
