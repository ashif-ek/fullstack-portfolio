from rest_framework import viewsets
from core.serializers import BlogPostSerializer
from core.services.blog_service import BlogService
from core.utils.response_wrapper import standard_response


class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Standardized API for retrieving blog posts (notes) with caching.
    """
    serializer_class = BlogPostSerializer
    lookup_field = "slug"
    service = BlogService()

    def list(self, request, *args, **kwargs):
        blogs = self.service.get_all_blogs()
        serializer = self.get_serializer(blogs, many=True)
        return standard_response(success=True, data=serializer.data)

    def retrieve(self, request, *args, **kwargs):
        slug = kwargs.get("slug")
        blog = self.service.get_blog_by_slug(slug)
        if not blog:
            return standard_response(success=False, error="Post not found", status=404)
        
        serializer = self.get_serializer(blog)
        return standard_response(success=True, data=serializer.data)
