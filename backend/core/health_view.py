from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.cache import never_cache
from django.utils import timezone
from django.conf import settings
from .models.settings import SiteSettings
import logging
import time
import shutil
import os
import sys
import platform

# Track global startup time
STARTUP_TIME = time.time()

logger = logging.getLogger(__name__)

@never_cache
@require_http_methods(["GET"])
def ping(request):
    """
    Ultra-lightweight endpoint for keep-alive services.
    Does not touch the database to ensure 200 OK even during startup/migrations.
    """
    return JsonResponse({"status": "pong", "timestamp": timezone.now().isoformat()})

@never_cache
@require_http_methods(["GET"])
def health_check(request):
    """
    Enhanced health check that verifies database connectivity and performance.
    """
    start_time = time.perf_counter()
    health_details = {
        "status": "ok",
        "timestamp": timezone.now().isoformat(),
        "database": "unknown",
        "environment": "production" if not settings.DEBUG else "development",
        "response_time_ms": 0
    }
    
    try:
        # Perform a light database operation
        exists = SiteSettings.objects.exists()
        health_details["database"] = "ok"
    except Exception as e:
        logger.warning(f"Health check database warning: {str(e)}")
        health_details["database"] = "unavailable"
        # We don't necessarily want to return 503 and trigger alerts if the 
        # app is actually running but DB is momentarily slow/restarting
        # especially on cheap/free tier hosting.
        if settings.DEBUG:
             health_details["error"] = str(e)

    health_details["response_time_ms"] = round((time.perf_counter() - start_time) * 1000, 2)
    
    # Return 200 even if DB is down but app is alive (liveness vs readiness)
    # This prevents keep-alive services from marking the site as "DOWN" 
    # during transient DB issues.
    return JsonResponse(health_details, status=200)

@never_cache
@require_http_methods(["GET"])
def system_status(request):
    """
    Exposes runtime and system observability information.
    """
    uptime_seconds = time.time() - STARTUP_TIME
    
    # Get disk usage
    total, used, free = shutil.disk_usage("/")
    
    # Try to get memory usage (platform dependent fallback)
    memory_info = {}
    try:
        import psutil
        process = psutil.Process(os.getpid())
        memory_info["usage_mb"] = round(process.memory_info().rss / (1024 * 1024), 2)
    except (ImportError, Exception):
        memory_info["usage_mb"] = "unknown"

    status_data = {
        "service_name": "Portfolio Backend",
        "service_version": "1.0.0",
        "uptime_formatted": f"{int(uptime_seconds // 3600)}h {int((uptime_seconds % 3600) // 60)}m {int(uptime_seconds % 60)}s",
        "uptime_seconds": round(uptime_seconds, 2),
        "database_connectivity": "connected",
        "disk": {
            "total_gb": round(total / (2**30), 2),
            "used_gb": round(used / (2**30), 2),
            "free_gb": round(free / (2**30), 2),
            "percent_used": round((used / total) * 100, 2)
        },
        "memory": memory_info,
        "python_version": sys.version,
        "platform": platform.platform(),
        "timestamp": timezone.now().isoformat()
    }

    try:
        # Verify DB connection for status too
        SiteSettings.objects.exists()
    except Exception:
        status_data["database_connectivity"] = "disconnected"

    return JsonResponse(status_data)
