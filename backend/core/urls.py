from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SiteSettingsViewSet,
    ProfileViewSet,
    SkillViewSet,
    ProjectViewSet,
    CertificateViewSet,
    BlogPostViewSet,
    MessageViewSet,
    UploadView,
    LoginView,
)

router = DefaultRouter()
router.register(r"settings", SiteSettingsViewSet)
router.register(r"profile", ProfileViewSet)
router.register(r"skills", SkillViewSet)
router.register(r"projects", ProjectViewSet)
router.register(r"certificates", CertificateViewSet)
router.register(r"blogs", BlogPostViewSet)
router.register(r"messages", MessageViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("upload", UploadView.as_view(), name="upload"),
    path("login", LoginView.as_view(), name="login"),
]
