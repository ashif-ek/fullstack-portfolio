from rest_framework import viewsets, permissions
from core.models import ProjectCaseStudy
from core.serializers.case_study import (
    ProjectCaseStudyListSerializer,
    ProjectCaseStudyDetailSerializer,
)


class ProjectCaseStudyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProjectCaseStudy.objects.all()
    lookup_field = "slug"
    permission_classes = [permissions.AllowAny]

    def get_serializer_class(self):
        if self.action == "list":
            return ProjectCaseStudyListSerializer
        return ProjectCaseStudyDetailSerializer
