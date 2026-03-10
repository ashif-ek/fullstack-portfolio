from django.contrib import admin
from .models import (
    SiteSettings,
    Profile,
    SocialLink,
    Message,
    Project,
    Skill,
    Certificate,
    Service,
    Tool,
    BlogPost,
    VisitorCount,
    PortfolioAnalytics,
)


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        ("General", {"fields": ("site_title", "maintenance_mode", "welcome_message")}),
        (
            "Core Sections Visibility",
            {
                "fields": (
                    "show_hero",
                    "show_about",
                    "show_services",
                    "show_blog",
                    "show_skills",
                    "show_projects",
                    "show_certificates",
                )
            },
        ),
        (
            "Additional Sections Visibility",
            {
                "fields": (
                    "show_github_activity",
                    "show_build_journey",
                    "show_recruiter_cta",
                    "show_contacts",
                )
            },
        ),
    )


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ["name", "title", "email"]


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ["name", "url", "profile"]


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "date"]
    readonly_fields = ["date"]
    list_filter = ["date"]
    search_fields = ["name", "email", "message"]


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["order", "title", "tags", "clicks"]
    list_display_links = ["title"]
    list_editable = ["order"]
    search_fields = ["title", "description", "tags"]


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ["order", "name", "category", "level"]
    list_display_links = ["name"]
    list_editable = ["order"]
    list_filter = ["category"]
    search_fields = ["name", "category"]


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ["order", "title", "issuer", "date", "category"]
    list_display_links = ["title"]
    list_editable = ["order"]
    list_filter = ["category", "date"]
    search_fields = ["title", "issuer"]


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ["order", "title"]
    list_display_links = ["title"]
    list_editable = ["order"]
    search_fields = ["title", "description"]


@admin.register(Tool)
class ToolAdmin(admin.ModelAdmin):
    list_display = ["order", "name"]
    list_display_links = ["name"]
    list_editable = ["order"]
    search_fields = ["name"]


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ["order", "title", "date"]
    list_display_links = ["title"]
    list_editable = ["order"]
    prepopulated_fields = {"slug": ["title"]}
    list_filter = ["date"]
    search_fields = ["title", "summary"]


@admin.register(VisitorCount)
class VisitorCountAdmin(admin.ModelAdmin):
    list_display = ["total_visitors", "last_updated"]
    readonly_fields = ["last_updated"]


@admin.register(PortfolioAnalytics)
class PortfolioAnalyticsAdmin(admin.ModelAdmin):
    list_display = ["total_views"]
