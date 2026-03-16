import os
import time
import platform
from datetime import datetime

class SystemMetrics:
    """
    Collector for system-level runtime metrics.
    """
    @staticmethod
    def _get_psutil():
        try:
            import psutil
            return psutil
        except ImportError:
            return None
    
    @staticmethod
    def get_uptime_data():
        """
        Calculates uptime information based on the STARTUP_TIME in apps.py.
        """
        from core.apps import STARTUP_TIME
        uptime_seconds = time.time() - STARTUP_TIME
        
        hours = int(uptime_seconds // 3600)
        minutes = int((uptime_seconds % 3600) // 60)
        seconds = int(uptime_seconds % 60)
        
        return {
            "uptime_seconds": round(uptime_seconds, 2),
            "uptime_formatted": f"{hours}h {minutes}m {seconds}s"
        }

    @staticmethod
    def get_memory_metrics():
        """
        Returns process and system memory usage.
        """
        psutil = SystemMetrics._get_psutil()
        if not psutil:
            return {"usage_mb": 0, "system_percent": 0}
            
        process = psutil.Process(os.getpid())
        mem_info = process.memory_info()
        system_mem = psutil.virtual_memory()
        
        return {
            "usage_mb": round(mem_info.rss / (1024 * 1024), 2),
            "system_percent": system_mem.percent
        }

    @staticmethod
    def get_cpu_metrics():
        """
        Returns current process CPU usage percentage.
        """
        psutil = SystemMetrics._get_psutil()
        if not psutil:
            return 0.0
            
        # interval=None means non-blocking, first call might return 0.0
        return psutil.cpu_percent(interval=0.1)

    @staticmethod
    def get_disk_metrics():
        """
        Returns disk usage statistics for the root partition.
        """
        psutil = SystemMetrics._get_psutil()
        if not psutil:
            return {"total_gb": 0, "used_gb": 0, "free_gb": 0, "percent_used": 0}

        usage = psutil.disk_usage('/')
        return {
            "total_gb": round(usage.total / (1024**3), 2),
            "used_gb": round(usage.used / (1024**3), 2),
            "free_gb": round(usage.free / (1024**3), 2),
            "percent_used": usage.percent
        }

    @staticmethod
    def get_service_metadata():
        """
        Returns service metadata and platform info.
        """
        return {
            "service_name": "Portfolio Backend",
            "service_version": "1.0.0",
            "python_version": platform.python_version(),
            "platform": platform.platform(),
            "timestamp": datetime.now().isoformat(),
            "git_commit": os.getenv("RENDER_GIT_COMMIT", "unknown")
        }
