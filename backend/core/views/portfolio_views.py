from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response as DRFResponse
from core.serializers import (
    SkillSerializer,
    ProjectSerializer,
    CertificateSerializer,
    ServiceSerializer,
    ToolSerializer,
)
from core.services.portfolio_service import PortfolioService
from core.utils.response_wrapper import standard_response


class PortfolioBaseViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Base ViewSet for read-only portfolio entities to ensure consistent 
    architecture across all domain endpoints.
    """
    service = PortfolioService()

    def get_standard_response(self, data):
        return standard_response(success=True, data=data)


class SkillViewSet(PortfolioBaseViewSet):
    serializer_class = SkillSerializer

    def list(self, request, *args, **kwargs):
        skills = self.service.get_all_skills()
        serializer = self.get_serializer(skills, many=True)
        return self.get_standard_response(serializer.data)


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    service = PortfolioService()

    def get_queryset(self):
        return self.service.repo.get_all_projects_optimized()

    def list(self, request, *args, **kwargs):
        projects = self.service.get_all_projects()
        serializer = self.get_serializer(projects, many=True)
        return standard_response(success=True, data=serializer.data)

    @action(detail=True, methods=["post"])
    def click(self, request, pk=None):
        project = self.service.increment_project_click(pk)
        if not project:
            return standard_response(success=False, error="Project not found", status=404)
        
        serializer = self.get_serializer(project)
        return standard_response(success=True, data=serializer.data)


class CertificateViewSet(PortfolioBaseViewSet):
    serializer_class = CertificateSerializer

    def list(self, request, *args, **kwargs):
        certs = self.service.get_all_certificates()
        serializer = self.get_serializer(certs, many=True)
        return self.get_standard_response(serializer.data)


class ServiceViewSet(PortfolioBaseViewSet):
    serializer_class = ServiceSerializer

    def list(self, request, *args, **kwargs):
        services = self.service.get_all_services()
        serializer = self.get_serializer(services, many=True)
        return self.get_standard_response(serializer.data)


class ToolViewSet(PortfolioBaseViewSet):
    serializer_class = ToolSerializer

    def list(self, request, *args, **kwargs):
        tools = self.service.get_all_tools()
        serializer = self.get_serializer(tools, many=True)
        return self.get_standard_response(serializer.data)
