from rest_framework import viewsets
from core.models import Profile, Message
from core.serializers import ProfileSerializer, MessageSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all().order_by("-id")
    serializer_class = ProfileSerializer


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        # Send email notification
        from django.core.mail import send_mail
        from django.conf import settings

        subject = f"Portfolio Message: {instance.name}"
        body = f"Name: {instance.name}\nEmail: {instance.email}\n\nMessage:\n{instance.message}"
        try:
            send_mail(
                subject,
                body,
                settings.EMAIL_HOST_USER,
                [settings.EMAIL_HOST_USER],  # Send to self
                fail_silently=False,
            )
        except Exception as e:
            # Re-raise or log properly so we can see it in terminal
            print(f"SMTP Error encountered: {e}")
            # Consider not raising if we want the message to still save in DB
