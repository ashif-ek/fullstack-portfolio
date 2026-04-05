from core.services.base_service import BaseService
from core.repositories.settings_repo import SettingsRepository

class SettingsService(BaseService):
    """
    Service Layer for Site Settings with caching.
    """
    CACHE_KEY_SETTINGS = "site:settings"
    repo = SettingsRepository()

    def get_settings(self):
        return self.get_cached(self.CACHE_KEY_SETTINGS, self.repo.get_settings)
