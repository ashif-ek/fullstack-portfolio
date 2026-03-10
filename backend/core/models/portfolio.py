from django.db import models


class Skill(models.Model):
    name = models.CharField(max_length=100)
    level = models.IntegerField(help_text="Skill level in percentage (0-100)")
    category = models.CharField(max_length=100)  # e.g. Technology, Methodology
    icon = models.CharField(max_length=50, blank=True)  # Icon name string
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)
    color = models.CharField(max_length=20, blank=True)  # Hex code

    class Meta:
        ordering = ["order", "name"]

    def __str__(self):
        return self.name


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(help_text="Short abstract for the project card")
    content = models.TextField(
        blank=True, help_text="Detailed markdown content for the Case Study page"
    )
    tags = models.CharField(
        max_length=500, help_text="Comma-separated tags"
    )  # Simple implementation
    link = models.URLField(blank=True)
    github = models.URLField(blank=True)
    image = models.ImageField(upload_to="projects/", blank=True, null=True)
    clicks = models.PositiveIntegerField(
        default=0, help_text="Number of times this project was clicked"
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "title"]

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
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "-date"]

    def __str__(self):
        return self.title


class Service(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=50)  # e.g. CodeIcon, RocketIcon
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "title"]

    def __str__(self):
        return self.title


class Tool(models.Model):
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]

    def __str__(self):
        return self.name
