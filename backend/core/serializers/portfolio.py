from rest_framework import serializers
from core.models import Skill, Project, Certificate


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
