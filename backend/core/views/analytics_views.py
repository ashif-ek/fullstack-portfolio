from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from core.models.analytics import VisitorCount


class VisitorCountView(APIView):
    def get(self, request, *args, **kwargs):
        visitor_obj, created = VisitorCount.objects.get_or_create(id=1)
        return Response(
            {"total_visitors": visitor_obj.total_visitors}, status=status.HTTP_200_OK
        )


class VisitorIncrementView(APIView):
    def post(self, request, *args, **kwargs):
        visitor_obj, created = VisitorCount.objects.get_or_create(id=1)
        # Avoid F() expression if we need simplicity, or use it for atomicity.
        # atomic update:
        from django.db.models import F

        VisitorCount.objects.filter(id=visitor_obj.id).update(
            total_visitors=F("total_visitors") + 1
        )
        visitor_obj.refresh_from_db()
        return Response(
            {"total_visitors": visitor_obj.total_visitors}, status=status.HTTP_200_OK
        )


class PortfolioAnalyticsView(APIView):
    def post(self, request, *args, **kwargs):
        from core.models.analytics import PortfolioAnalytics
        from django.db.models import F

        analytics_obj, created = PortfolioAnalytics.objects.get_or_create(id=1)
        PortfolioAnalytics.objects.filter(id=analytics_obj.id).update(
            total_views=F("total_views") + 1
        )
        analytics_obj.refresh_from_db()
        return Response(
            {"total_views": analytics_obj.total_views}, status=status.HTTP_200_OK
        )
