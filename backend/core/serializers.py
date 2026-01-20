from rest_framework import serializers
from .models import (
    SiteSettings,
    Profile,
    Skill,
    Project,
    Certificate,
    BlogPost,
    Message,
)


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = "__all__"


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"


class ProjectSerializer(serializers.ModelSerializer):
    tags_list = serializers.ListField(source="get_tags_list", read_only=True)

    class Meta:
        model = Project
        fields = "__all__"


class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = "__all__"


class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = "__all__"


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"
