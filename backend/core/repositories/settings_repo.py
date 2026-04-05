from core.models.settings import SiteSettings

class SettingsRepository:
    """
    Data Access Layer (DAL) for Site Settings.
    """
    @staticmethod
    def get_settings():
        return SiteSettings.objects.first()
