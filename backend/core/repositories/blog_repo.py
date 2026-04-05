from core.models.notes import BlogPost

class BlogRepository:
    """
    Data Access Layer (DAL) for Blog Posts (Notes).
    """
    @staticmethod
    def get_all_published():
        return BlogPost.objects.filter(is_published=True).order_by("-date")

    @staticmethod
    def get_by_slug(slug):
        return BlogPost.objects.filter(slug=slug).first()
