from core.models.profile import Profile, Message, SocialLink

class ProfileRepository:
    """
    Data Access Layer (DAL) for Profile and Communication models.
    """
    
    @staticmethod
    def get_profile_optimized():
        """
        Retrieves the primary profile with prefetched social links.
        """
        return Profile.objects.prefetch_related('social_links').first()

    @staticmethod
    def create_message(data):
        return Message.objects.create(**data)

    @staticmethod
    def get_social_links():
        return SocialLink.objects.all()
