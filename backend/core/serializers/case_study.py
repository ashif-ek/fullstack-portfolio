from rest_framework import serializers
from core.models import ProjectCaseStudy


class ProjectCaseStudyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCaseStudy
        fields = [
            "title",
            "slug",
            "tech_stack",
            "github_repo_url",
        ]


class ProjectCaseStudyDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCaseStudy
        fields = [
            "title",
            "slug",
            "problem",
            "solution",
            "architecture",
            "tech_stack",
            "challenges",
            "performance_improvements",
            "lessons_learned",
            "github_repo_url",
            "documentation_url",
            "created_at",
            "updated_at",
        ]
