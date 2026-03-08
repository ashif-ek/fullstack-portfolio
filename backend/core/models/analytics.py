from django.db import models


class VisitorCount(models.Model):
    total_visitors = models.PositiveIntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Total Visitors: {self.total_visitors}"

    class Meta:
        verbose_name_plural = "Visitor Counts"


class PortfolioAnalytics(models.Model):
    total_views = models.IntegerField(default=0)

    def __str__(self):
        return f"Portfolio Views: {self.total_views}"

    class Meta:
        verbose_name_plural = "Portfolio Analytics"
