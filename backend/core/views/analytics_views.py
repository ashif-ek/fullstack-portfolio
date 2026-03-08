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
