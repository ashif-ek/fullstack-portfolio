from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.utils import timezone
from .models.settings import SiteSettings
import logging

logger = logging.getLogger(__name__)

@require_http_methods(["GET"])
def health_check(request):
    """
    Enhanced health check that verifies database connectivity.
    """
    health_details = {
        "status": "healthy",
        "timestamp": timezone.now().isoformat(),
        "services": {
            "database": "unknown"
        }
    }
    
    try:
        # Perform a light database operation
        exists = SiteSettings.objects.exists()
        health_details["services"]["database"] = "up"
        health_details["database_verified"] = exists
        status_code = 200
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        health_details["status"] = "unhealthy"
        health_details["services"]["database"] = "down"
        health_details["error"] = str(e)
        status_code = 503

    return JsonResponse(health_details, status=status_code)
