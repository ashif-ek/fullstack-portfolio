from django.db import connections
from django.db.utils import OperationalError
import logging

logger = logging.getLogger(__name__)

class HealthChecks:
    """
    Health checks for critical system components.
    """
    
    @staticmethod
    def check_database():
        """
        Verifies database connectivity by performing a simple query.
        """
        try:
            db_conn = connections['default']
            db_conn.cursor()
            return True, "connected"
        except (OperationalError, Exception) as e:
            logger.error(f"Database health check failed: {str(e)}")
            return False, "disconnected"
