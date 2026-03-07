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
)


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    pass


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("name", "title", "email")


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ("name", "url", "profile")


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "date")
    readonly_fields = ("date",)
    list_filter = ("date",)
    search_fields = ("name", "email", "message")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "tags")
    search_fields = ("title", "description", "tags")


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "level")
    list_filter = ("category",)
    search_fields = ("name", "category")


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ("title", "issuer", "date", "category")
    list_filter = ("category", "date")
    search_fields = ("title", "issuer")


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title",)
    search_fields = ("title", "description")


@admin.register(Tool)
class ToolAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ("title", "date")
    prepopulated_fields = {"slug": ("title",)}
    list_filter = ("date",)
    search_fields = ("title", "summary")
