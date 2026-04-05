from rest_framework.views import APIView
from core.services.analytics_service import AnalyticsService
from core.utils.response_wrapper import standard_response


class VisitorCountView(APIView):
    """
    Standardized API for retrieving total visitor count.
    """
    service = AnalyticsService()

    def get(self, request, *args, **kwargs):
        count = self.service.get_total_visitors()
        return standard_response(success=True, data={"total_visitors": count})


class VisitorIncrementView(APIView):
    """
    Standardized API for tracking unique visitor interactions.
    """
    service = AnalyticsService()

    def post(self, request, *args, **kwargs):
        count = self.service.track_visitor()
        return standard_response(success=True, data={"total_visitors": count})


class PortfolioAnalyticsView(APIView):
    """
    Standardized API for tracking total portfolio views.
    """
    service = AnalyticsService()

    def post(self, request, *args, **kwargs):
        count = self.service.track_portfolio_view()
        return standard_response(success=True, data={"total_views": count})
