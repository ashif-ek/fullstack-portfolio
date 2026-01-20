from django.db import models


class Skill(models.Model):
    name = models.CharField(max_length=100)
    level = models.IntegerField(help_text="Skill level in percentage (0-100)")
    category = models.CharField(max_length=100)  # e.g. Technology, Methodology
    icon = models.CharField(max_length=50, blank=True)  # Icon name string
    description = models.TextField(blank=True)
    color = models.CharField(max_length=20, blank=True)  # Hex code

    def __str__(self):
        return self.name


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    tags = models.CharField(
        max_length=500, help_text="Comma-separated tags"
    )  # Simple implementation
    link = models.URLField(blank=True)
    github = models.URLField(blank=True)
    image = models.ImageField(upload_to="projects/", blank=True, null=True)

    def __str__(self):
        return self.title

    def get_tags_list(self):
        return [tag.strip() for tag in self.tags.split(",")]


class Certificate(models.Model):
    title = models.CharField(max_length=200)
    issuer = models.CharField(max_length=200)
    date = models.CharField(
        max_length=50
    )  # Keeping as string to match flexible "2024-2025" formats
    category = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to="certificates/", blank=True, null=True)
    credential_link = models.URLField(blank=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.title
