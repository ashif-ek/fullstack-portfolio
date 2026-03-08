from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from core.models import Skill, Project, Certificate, Service, Tool
from core.serializers import (
    SkillSerializer,
    ProjectSerializer,
    CertificateSerializer,
    ServiceSerializer,
    ToolSerializer,
)


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    @action(detail=True, methods=["post"])
    def click(self, request, pk=None):
        project = self.get_object()
        from django.db.models import F

        Project.objects.filter(pk=project.pk).update(clicks=F("clicks") + 1)
        project.refresh_from_db()
        return Response({"status": "clicked", "clicks": project.clicks})


class CertificateViewSet(viewsets.ModelViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class ToolViewSet(viewsets.ModelViewSet):
    queryset = Tool.objects.all()
    serializer_class = ToolSerializer
