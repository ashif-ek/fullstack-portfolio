from core.services.base_service import BaseService
from core.repositories.profile_repo import ProfileRepository
from django.core.mail import send_mail
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

class ProfileService(BaseService):
    """
    Service Layer for Profile management and Contact logic.
    Handles email notifications as a synchronous fallback (can be Celery later).
    """
    
    CACHE_KEY_PROFILE = "profile:main"
    repo = ProfileRepository()

    def get_profile(self):
        """
        Retrieves the main profile with caching.
        """
        return self.get_cached(self.CACHE_KEY_PROFILE, self.repo.get_profile_optimized)

    def handle_contact_message(self, data):
        """
        Saves a contact message and sends a notification email.
        """
        message = self.repo.create_message(data)
        
        # In a larger system, this would be an @shared_task for Celery
        self._send_notification_email(message)
        
        return message

    def _send_notification_email(self, message):
        """
        Private method to encapsulate email logic.
        """
        subject = f"Portfolio Message: {message.name}"
        body = f"Name: {message.name}\nEmail: {message.email}\n\nMessage:\n{message.message}"
        
        try:
            send_mail(
                subject,
                body,
                settings.EMAIL_HOST_USER,
                [settings.EMAIL_HOST_USER],
                fail_silently=False,
            )
        except Exception as e:
            logger.error(f"Failed to send portfolio contact email: {e}")
            # We don't raise here to ensure the message stays saved in DB
