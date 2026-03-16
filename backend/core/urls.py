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
    ServiceViewSet,
    ToolViewSet,
    UploadView,
    LoginView,
)
from .views.github_views import GitHubRepoViewSet
from .views.case_study_views import ProjectCaseStudyViewSet
from .views.analytics_views import (
    VisitorCountView,
    VisitorIncrementView,
    PortfolioAnalyticsView,
)
from .health_view import health_check
from .views.system_status_view import system_status_view


router = DefaultRouter()
router.register(r"settings", SiteSettingsViewSet)
router.register(r"profile", ProfileViewSet)
router.register(r"skills", SkillViewSet)
router.register(r"projects", ProjectViewSet)
router.register(r"certificates", CertificateViewSet)
router.register(r"blogs", BlogPostViewSet)
router.register(r"messages", MessageViewSet)
router.register(r"services", ServiceViewSet)
router.register(r"tools", ToolViewSet)
router.register(r"github-repos", GitHubRepoViewSet, basename="github-repo")
router.register(r"case-studies", ProjectCaseStudyViewSet, basename="case-study")

urlpatterns = [
    path("", include(router.urls)),
    path("upload", UploadView.as_view(), name="upload"),
    path("login", LoginView.as_view(), name="login"),
    path("health/", health_check, name="health_check"),
    path("api/system/status/", system_status_view, name="system_status"),
    path("analytics/visitors/", VisitorCountView.as_view(), name="visitor_count"),
    path(
        "analytics/visitors/increment/",
        VisitorIncrementView.as_view(),
        name="visitor_increment",
    ),
    path(
        "api/portfolio-view/",
        PortfolioAnalyticsView.as_view(),
        name="portfolio_view",
    ),
]
