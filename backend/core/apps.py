from django.apps import AppConfig


import logging
import time

# Global startup time for metrics
STARTUP_TIME = time.time()

logger = logging.getLogger(__name__)

class CoreConfig(AppConfig):
    name = "core"

    def ready(self):
        """
        Application warmup logic.
        """
        # Pre-import heavy or critical libraries
        try:
            import rest_framework
            import cloudinary
            import psutil
            logger.info("Critical libraries pre-imported.")
        except ImportError as e:
            logger.warning(f"Warmup library import failed: {e}")

        # Initialize database connection
        try:
            from .models.settings import SiteSettings
            # A simple query to wake up the connection
            SiteSettings.objects.exists()
            logger.info("Application warmup: Initial database connection established.")
        except Exception as e:
            logger.error(f"Application warmup: Database connection failed: {e}")

        logger.info("Application warmup completed.")
