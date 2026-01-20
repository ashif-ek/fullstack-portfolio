from django.db import models


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


class Message(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name}"
