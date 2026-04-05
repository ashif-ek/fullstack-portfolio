from django.views.decorators.http import require_http_methods
from django.views.decorators.cache import never_cache
from core.utils.response_wrapper import standard_response
import logging
import time

from core.monitoring.system_metrics import SystemMetrics
from core.monitoring.health_checks import HealthChecks

logger = logging.getLogger(__name__)

@never_cache
@require_http_methods(["GET"])
def system_status_view(request):
    """
    Exposes runtime and system observability information as a production-grade monitoring endpoint.
    """
    start_time = time.perf_counter()
    
    # Run critical health checks
    db_ok, db_status = HealthChecks.check_database()
    
    # Collect metrics
    uptime_data = SystemMetrics.get_uptime_data()
    memory_data = SystemMetrics.get_memory_metrics()
    cpu_percent = SystemMetrics.get_cpu_metrics()
    disk_data = SystemMetrics.get_disk_metrics()
    metadata = SystemMetrics.get_service_metadata()
    
    # Build complete status payload
    status_data = {
        **metadata,
        "uptime_seconds": uptime_data["uptime_seconds"],
        "uptime_formatted": uptime_data["uptime_formatted"],
        "database": db_status,
        "disk": disk_data,
        "memory": memory_data,
        "cpu_percent": cpu_percent,
        "response_time_ms": round((time.perf_counter() - start_time) * 1000, 2)
    }
    
    # Structured logging for the call
    logger.info(f"System status call: health={db_status}, cpu={cpu_percent}%, mem={memory_data['usage_mb']}MB")
    
    # Determine status code (503 if critical checks fail)
    status_code = 200 if db_ok else 503
    
    return standard_response(success=db_ok, data=status_data, status=status_code)
