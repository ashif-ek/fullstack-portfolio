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


class Profile(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    description = models.TextField()
    email = models.EmailField()
    avatar = models.ImageField(upload_to="profile/", blank=True, null=True)

    def __str__(self):
        return self.name


class SocialLink(models.Model):
    profile = models.ForeignKey(
        Profile, related_name="social_links", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=50)  # e.g. Github, LinkedIn
    url = models.URLField()

    def __str__(self):
        return f"{self.name} ({self.profile.name})"


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


class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    date = models.DateField()
    summary = models.TextField()
    content = models.TextField(help_text="Markdown content")
    image_url = models.ImageField(
        upload_to="blog/", blank=True, null=True
    )  # Renamed to match frontend expectation or map in serializer

    def __str__(self):
        return self.title


class Message(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name}"
