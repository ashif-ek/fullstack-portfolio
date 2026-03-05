from rest_framework import serializers
from core.models import Skill, Project, Certificate, Service, Tool


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"


class ProjectSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = "__all__"

    def get_tags(self, obj):
        if not obj.tags:
            return []
        return [tag.strip() for tag in obj.tags.split(",")]


class CertificateSerializer(serializers.ModelSerializer):
    credentialLink = serializers.URLField(source="credential_link", read_only=True)

    class Meta:
        model = Certificate
        fields = [
            "id",
            "title",
            "issuer",
            "date",
            "category",
            "image",
            "credentialLink",
            "description",
        ]


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"


class ToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tool
        fields = "__all__"
