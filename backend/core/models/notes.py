from django.db import models


class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    date = models.DateField()
    summary = models.TextField()
    content = models.TextField(help_text="Markdown content")
    image_url = models.ImageField(
        upload_to="blog/", blank=True, null=True
    )  # Renamed to match frontend expectation or map in serializer
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "-date"]

    def __str__(self):
        return self.title
