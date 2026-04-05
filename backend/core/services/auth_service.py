from django.contrib.auth import authenticate
import logging

logger = logging.getLogger(__name__)

class AuthService:
    """
    Service Layer for Authentication.
    Handles user verification and session/token generation.
    """
    @staticmethod
    def authenticate_admin(username, password):
        """
        Authenticates a user and checks for staff (admin) privileges.
        """
        user = authenticate(username=username, password=password)
        
        if user is not None and user.is_staff:
            # In a real JWT setup, this would generate a signed token
            return True, {"token": "admin-session-token"}
        
        return False, "Invalid credentials or insufficient permissions"
