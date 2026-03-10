from django.db import models


class SiteSettings(models.Model):
    site_title = models.CharField(max_length=200, default="Ashif's Portfolio")
    show_hero = models.BooleanField(default=True)
    show_about = models.BooleanField(default=True)
    show_services = models.BooleanField(default=True)
    show_blog = models.BooleanField(default=True)
    show_skills = models.BooleanField(default=True)
    show_projects = models.BooleanField(default=True)
    show_certificates = models.BooleanField(default=True)
    show_github_activity = models.BooleanField(default=True)
    show_build_journey = models.BooleanField(default=True)
    show_recruiter_cta = models.BooleanField(default=True)
    show_contacts = models.BooleanField(default=True)
    maintenance_mode = models.BooleanField(default=False)
    welcome_message = models.TextField(blank=True)

    def __str__(self):
        return self.site_title

    class Meta:
        verbose_name_plural = "Site Settings"
