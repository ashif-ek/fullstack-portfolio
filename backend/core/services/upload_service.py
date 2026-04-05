from django.core.files.storage import default_storage
import logging

logger = logging.getLogger(__name__)

class UploadService:
    """
    Service Layer for File Uploads.
    Handles storage interactions and ensures consistent file naming.
    """
    @staticmethod
    def handle_upload(file):
        """
        Saves a file to the configured storage and returns the URL.
        """
        try:
            file_name = default_storage.save(file.name, file)
            file_url = default_storage.url(file_name)
            return True, {"url": file_url, "filename": file_name}
        except Exception as e:
            logger.error(f"File Upload Error: {e}")
            return False, str(e)
