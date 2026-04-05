from rest_framework import viewsets, permissions
from core.serializers.case_study import (
    ProjectCaseStudyListSerializer,
    ProjectCaseStudyDetailSerializer,
)
from core.services.case_study_service import CaseStudyService
from core.utils.response_wrapper import standard_response


class ProjectCaseStudyViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Standardized API for retrieving project case studies.
    """
    lookup_field = "slug"
    permission_classes = [permissions.AllowAny]
    service = CaseStudyService()

    def get_serializer_class(self):
        if self.action == "list":
            return ProjectCaseStudyListSerializer
        return ProjectCaseStudyDetailSerializer

    def list(self, request, *args, **kwargs):
        studies = self.service.get_all()
        serializer = self.get_serializer(studies, many=True)
        return standard_response(success=True, data=serializer.data)

    def retrieve(self, request, *args, **kwargs):
        slug = kwargs.get("slug")
        study = self.service.get_by_slug(slug)
        if not study:
            return standard_response(success=False, error="Case study not found", status=404)
        
        serializer = self.get_serializer(study)
        return standard_response(success=True, data=serializer.data)
