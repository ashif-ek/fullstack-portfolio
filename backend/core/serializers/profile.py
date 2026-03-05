from rest_framework import serializers
from core.models import Profile, Message, Project, Certificate, Skill


class ProfileSerializer(serializers.ModelSerializer):
    stats = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            "id",
            "name",
            "title",
            "description",
            "introduction",
            "experience",
            "philosophy",
            "email",
            "avatar",
            "stats",
        ]

    def get_stats(self, obj):
        return {
            "projects": Project.objects.count(),
            "certificates": Certificate.objects.count(),
            "technologies": Skill.objects.count(),
        }


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"
