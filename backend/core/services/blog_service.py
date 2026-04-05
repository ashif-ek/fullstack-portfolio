from core.services.base_service import BaseService
from core.repositories.blog_repo import BlogRepository

class BlogService(BaseService):
    """
    Service Layer for Blog management and caching.
    """
    CACHE_KEY_BLOGS = "blog:posts:all"
    CACHE_KEY_PREFIX_DETAIL = "blog:post:detail:"
    repo = BlogRepository()

    def get_all_blogs(self):
        return self.get_cached(self.CACHE_KEY_BLOGS, self.repo.get_all_published)

    def get_blog_by_slug(self, slug):
        cache_key = f"{self.CACHE_KEY_PREFIX_DETAIL}{slug}"
        return self.get_cached(cache_key, lambda: self.repo.get_by_slug(slug))
