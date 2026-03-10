from django.db import models
from django.utils.text import slugify


class ProjectCaseStudy(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, db_index=True)
    problem = models.TextField()
    solution = models.TextField()
    architecture = models.TextField(
        help_text="Detailed architecture description (Markdown supported)"
    )
    tech_stack = models.TextField(
        help_text="Comma-separated tech stack or JSON formatted string"
    )
    challenges = models.TextField()
    performance_improvements = models.TextField(blank=True, null=True)
    lessons_learned = models.TextField()
    github_repo_url = models.URLField(blank=True, null=True)
    documentation_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Project Case Study"
        verbose_name_plural = "Project Case Studies"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
