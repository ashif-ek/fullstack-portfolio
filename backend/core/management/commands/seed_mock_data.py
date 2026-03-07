from datetime import date

from django.core.management.base import BaseCommand
from django.db import transaction

from core.mock_seed_data import (
    MOCK_ABOUT,
    MOCK_BLOGS,
    MOCK_CERTIFICATES,
    MOCK_PROFILE,
    MOCK_PROJECTS,
    MOCK_SERVICES,
    MOCK_SETTINGS,
    MOCK_SKILLS,
    MOCK_SOCIAL_LINKS,
    MOCK_TOOLS,
)
from core.models import (
    BlogPost,
    Certificate,
    Profile,
    Project,
    Service,
    SiteSettings,
    Skill,
    SocialLink,
    Tool,
)


class Command(BaseCommand):
    help = "Seed PostgreSQL with frontend mock portfolio data."

    def add_arguments(self, parser):
        parser.add_argument(
            "--reset",
            action="store_true",
            help="Delete existing seeded portfolio data before importing.",
        )

    def handle(self, *args, **options):
        reset = options["reset"]

        with transaction.atomic():
            if reset:
                self._clear_existing_data()

            profile = self._seed_profile()
            self._seed_social_links(profile)
            self._seed_skills()
            self._seed_tools()
            self._seed_projects()
            self._seed_certificates()
            self._seed_services()
            self._seed_blogs()
            self._seed_settings()

        self.stdout.write(self.style.SUCCESS("Mock data has been seeded to PostgreSQL."))

    def _clear_existing_data(self):
        SocialLink.objects.all().delete()
        BlogPost.objects.all().delete()
        Certificate.objects.all().delete()
        Project.objects.all().delete()
        Skill.objects.all().delete()
        Service.objects.all().delete()
        Tool.objects.all().delete()
        Profile.objects.all().delete()
        SiteSettings.objects.all().delete()

    def _seed_profile(self):
        defaults = {
            "name": MOCK_PROFILE["name"],
            "title": MOCK_PROFILE["title"],
            "description": MOCK_PROFILE["description"],
            "introduction": MOCK_ABOUT["introduction"],
            "experience": MOCK_ABOUT["experience"],
            "philosophy": MOCK_ABOUT["philosophy"],
        }
        profile, _ = Profile.objects.update_or_create(
            email=MOCK_PROFILE["email"],
            defaults=defaults,
        )
        return profile

    def _seed_social_links(self, profile: Profile):
        SocialLink.objects.filter(profile=profile).delete()
        SocialLink.objects.bulk_create(
            [
                SocialLink(profile=profile, name=item["name"], url=item["url"])
                for item in MOCK_SOCIAL_LINKS
            ]
        )

    def _seed_skills(self):
        for item in MOCK_SKILLS:
            Skill.objects.update_or_create(
                name=item["name"],
                defaults={
                    "level": item["level"],
                    "category": item["category"],
                    "icon": item["icon"],
                    "description": item["description"],
                    "color": item["color"],
                },
            )

    def _seed_tools(self):
        for item in MOCK_TOOLS:
            Tool.objects.update_or_create(
                name=item["name"],
                defaults={"icon": item["icon"]},
            )

    def _seed_projects(self):
        for item in MOCK_PROJECTS:
            Project.objects.update_or_create(
                title=item["title"],
                defaults={
                    "description": item["description"],
                    "tags": ", ".join(item["tags"]),
                    "link": item["link"],
                    "github": item["github"],
                    "image": item["image"],
                },
            )

    def _seed_certificates(self):
        for item in MOCK_CERTIFICATES:
            Certificate.objects.update_or_create(
                title=item["title"],
                defaults={
                    "issuer": item["issuer"],
                    "date": item["date"],
                    "category": item["category"],
                    "image": item["image"],
                    "credential_link": item["credential_link"],
                    "description": item["description"],
                },
            )

    def _seed_services(self):
        for item in MOCK_SERVICES:
            Service.objects.update_or_create(
                title=item["title"],
                defaults={
                    "description": item["description"],
                    "icon": item["icon"],
                },
            )

    def _seed_blogs(self):
        for item in MOCK_BLOGS:
            BlogPost.objects.update_or_create(
                slug=item["slug"],
                defaults={
                    "title": item["title"],
                    "date": date.fromisoformat(item["date"]),
                    "summary": item["summary"],
                    "content": item["content"],
                    "image_url": item["image_url"],
                },
            )

    def _seed_settings(self):
        settings = SiteSettings.objects.first()
        if settings is None:
            SiteSettings.objects.create(**MOCK_SETTINGS)
            return

        for key, value in MOCK_SETTINGS.items():
            setattr(settings, key, value)
        settings.save(update_fields=list(MOCK_SETTINGS.keys()))
