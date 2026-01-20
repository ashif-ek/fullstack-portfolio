from django.shortcuts import render
from rest_framework import viewsets, permissions, status, views
from rest_framework.response import Response
from rest_framework.decorators import action
from django.conf import settings
from .models import (
    SiteSettings,
    Profile,
    Skill,
    Project,
    Certificate,
    BlogPost,
    Message,
)
from .serializers import (
    SiteSettingsSerializer,
    ProfileSerializer,
    SkillSerializer,
    ProjectSerializer,
    CertificateSerializer,
    BlogPostSerializer,
    MessageSerializer,
)
import os
import uuid
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.contrib.auth import authenticate


class SiteSettingsViewSet(viewsets.ModelViewSet):
    queryset = SiteSettings.objects.all()
    serializer_class = SiteSettingsSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class CertificateViewSet(viewsets.ModelViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer


class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    lookup_field = "slug"  # Optionally allow lookup by slug


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


class UploadView(views.APIView):
    permission_classes = [permissions.AllowAny]  # Or IsAuthenticated

    def post(self, request, *args, **kwargs):
        file = request.FILES.get("image")
        if not file:
            return Response(
                {"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST
            )

        # Save file with unique name or original name
        # We can use default_storage
        file_name = default_storage.save(file.name, file)
        file_url = default_storage.url(file_name)

        return Response(
            {"url": file_url, "filename": file_name}, status=status.HTTP_201_CREATED
        )


class LoginView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        # Simple env var check as per original server.js logic OR Django Auth
        # Going with Django Auth user check
        user = authenticate(username=username, password=password)

        if user is not None and user.is_staff:  # Admin access
            return Response(
                {"success": True, "token": "admin-session-token"},
                status=status.HTTP_200_OK,
            )

        # Fallback to env var check if no user in DB yet (migration phase)
        # ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "admin")
        # ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "admin")

        # if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
        #      return Response({"success": True, "token": "admin-session-token"}, status=status.HTTP_200_OK)

        return Response(
            {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
        )
