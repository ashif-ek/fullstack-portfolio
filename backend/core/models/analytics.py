from django.db import models


class VisitorCount(models.Model):
    total_visitors = models.PositiveIntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Total Visitors: {self.total_visitors}"

    class Meta:
        verbose_name_plural = "Visitor Counts"
