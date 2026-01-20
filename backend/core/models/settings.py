from django.db import models


class SiteSettings(models.Model):
    site_title = models.CharField(max_length=200, default="Ashif's Portfolio")
    show_blog = models.BooleanField(default=True)
    show_skills = models.BooleanField(default=True)
    show_projects = models.BooleanField(default=True)
    show_certificates = models.BooleanField(default=True)
    maintenance_mode = models.BooleanField(default=False)
    welcome_message = models.TextField(blank=True)

    def __str__(self):
        return self.site_title

    class Meta:
        verbose_name_plural = "Site Settings"
