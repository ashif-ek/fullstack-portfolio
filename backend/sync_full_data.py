import os
import django
from datetime import date

# Setup Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "portfolio_backend.settings")
django.setup()

from core.models import (
    Profile,
    Service,
    Skill,
    Tool,
    Project,
    Certificate,
    BlogPost,
    SocialLink,
)


def sync_data():
    print("Starting comprehensive data synchronization...")

    # 1. Profile & Social Links
    Profile.objects.all().delete()
    p = Profile.objects.create(
        name="Ashif E.K",
        title="Full Stack Engineer",
        description="I build high-performance web applications enabling businesses to scale. Specializing in React, Django, and Modern Cloud Architecture, I transform complex requirements into seamless digital experiences.",
        email="ashifek11@gmail.com",
        introduction="I am a results-driven Software Engineer with a passion for building robust, scalable web solutions. My journey began with a curiosity for how things work, which quickly evolved into a career in full-stack development. I focus on writing clean, maintainable code and solving real-world business problems.",
        experience="With a strong foundation in Computer Science, I have successfully delivered projects ranging from e-commerce platforms to complex governance systems. I have hands-on experience with the modern web stack including Next.js, Django, and Cloud Infrastructure. My work emphasizes performance optimization, security best practices, and intuitive user experience design.",
        philosophy="I believe that technology should be invisible—it should work so smoothly that users focus on their goals, not the tools. My approach combines rigorous engineering principles with creative problem-solving to deliver software that is not just functional, but exceptional.",
    )

    links_data = [
        {"name": "GitHub", "url": "https://github.com/ashif-ek"},
        {"name": "LinkedIn", "url": "https://linkedin.com/in/ashifek"},
        {"name": "Instagram", "url": "https://instagram.com/ashif.io"},
        {"name": "Fiverr", "url": "http://www.fiverr.com/s/gDLy45X"},
        {
            "name": "Docs Material",
            "url": "https://ashif-ek.github.io/docs-stack-material/",
        },
    ]
    for link in links_data:
        SocialLink.objects.create(profile=p, **link)

    print(f"Created Profile and {len(links_data)} Social Links")

    # 2. Services
    Service.objects.all().delete()
    services_data = [
        {
            "title": "Full-Stack Web Development",
            "description": "End-to-end development of responsive web applications using React, Next.js, and Django. I handle everything from database design to frontend interactivity.",
            "icon": "CodeIcon",
        },
        {
            "title": "MVP Development",
            "description": "Rapid prototyping and development of Minimum Viable Products for startups. Launch your idea quickly with a solid, scalable foundation.",
            "icon": "RocketIcon",
        },
        {
            "title": "API Design & Integration",
            "description": "Building secure and scalable RESTful APIs. Integration of third-party services like payment gateways (Stripe), authentication (OAuth), and cloud storage.",
            "icon": "ServerIcon",
        },
        {
            "title": "Performance Optimization",
            "description": "Auditing and optimizing existing applications for speed, accessibility, and SEO. Implementing caching strategies and code splitting.",
            "icon": "LightningIcon",
        },
    ]
    for s in services_data:
        Service.objects.create(**s)
    print(f"Created {len(services_data)} Services")

    # 3. Skills
    Skill.objects.all().delete()
    skills_data = [
        {
            "name": "Django & Python",
            "level": 95,
            "category": "Backend",
            "color": "#44B78B",
            "icon": "PythonIcon",
            "description": "Expert in building secure REST APIs, ORM optimization, and scalable backend architecture.",
        },
        {
            "name": "React & Next.js",
            "level": 90,
            "category": "Frontend",
            "color": "#61DAFB",
            "icon": "ReactIcon",
            "description": "Building performant, server-side rendered (SSR) applications with modern hooks and state management.",
        },
        {
            "name": "TypeScript",
            "level": 85,
            "category": "Language",
            "color": "#3178C6",
            "icon": "TSIcon",
            "description": "Strong typing for scalable codebases, resulting in fewer runtime errors and better maintainability.",
        },
        {
            "name": "Database Design",
            "level": 88,
            "category": "Data",
            "color": "#336791",
            "icon": "DatabaseIcon",
            "description": "Schema design, optimization, and management of SQL (PostgreSQL) and NoSQL databases.",
        },
        {
            "name": "DevOps & Cloud",
            "level": 80,
            "category": "Infrastructure",
            "color": "#FF9900",
            "icon": "CloudIcon",
            "description": "Experience with Docker, CI/CD pipelines, and deploying to platforms like AWS and Vercel.",
        },
        {
            "name": "Flutter",
            "level": 80,
            "category": "Mobile",
            "color": "#027DFD",
            "icon": "MobileIcon",
            "description": "Developing cross-platform mobile applications with native-like performance.",
        },
    ]
    for sk in skills_data:
        Skill.objects.create(**sk)
    print(f"Created {len(skills_data)} Skills")

    # 4. Tools
    Tool.objects.all().delete()
    tools_data = [
        {"name": "VS Code", "icon": "CodeIcon"},
        {"name": "PostgreSQL", "icon": "DatabaseIcon"},
        {"name": "Docker", "icon": "DockerIcon"},
        {"name": "Git & GitHub", "icon": "GitIcon"},
        {"name": "Figma", "icon": "FigmaIcon"},
        {"name": "Postman", "icon": "PostmanIcon"},
    ]
    for t in tools_data:
        Tool.objects.create(**t)
    print(f"Created {len(tools_data)} Tools")

    # 5. Projects
    Project.objects.all().delete()
    projects_data = [
        {
            "title": "Noirel Luxury Ecommerce",
            "description": "A high-performance e-commerce platform designed for luxury aesthetics. Implemented complex filtering, cart management, and optimized asset loading for a sub-2s load time.",
            "tags": "Next.js, TypeScript, Tailwind CSS, Redux",
            "link": "https://noirel-store.vercel.app/",
            "github": "https://github.com/ashif-ek/noirel-ecommerce",
            "image": "project1.jpg",
        },
        {
            "title": "CivicConnect Governance",
            "description": "A comprehensive digital governance platform enabling citizen engagement. Features include complaint tracking, real-time notifications, and administrative dashboards. Handled role-based access control for 4 distinct user types.",
            "tags": "Django, Flutter, PostgreSQL, REST API",
            "link": "https://github.com/ashif-ek/civic-connect",
            "github": "https://github.com/ashif-ek/civic-connect",
            "image": "project2.jpg",
        },
        {
            "title": "Minimalist CMS Blog",
            "description": "A custom Content Management System built to be lightweight and SEO-friendly. Includes markdown support, dynamic routing, and server-side rendering for optimal search engine visibility.",
            "tags": "Django, HTMX, PostgreSQL, Bootstrap",
            "link": "https://github.com/ashif-ek/django-blog",
            "github": "https://github.com/ashif-ek/django-blog",
            "image": "project3.jpg",
        },
    ]
    for pj in projects_data:
        Project.objects.create(**pj)
    print(f"Created {len(projects_data)} Projects")

    # 6. Certificates
    Certificate.objects.all().delete()
    certs_data = [
        {
            "title": "Bachelor of Computer Applications",
            "issuer": "University of Calicut",
            "date": "2025",
            "category": "Degree",
            "description": "Focused on Software Engineering, Data Structures, and Algorithms. Graduated with honors.",
            "credential_link": "#",
            "image": "bca.jpg",
        },
        {
            "title": "Full Stack Development Certification",
            "issuer": "Regional Technologies",
            "date": "2024",
            "category": "Professional",
            "description": "Intensive bootcamp covering advanced Python, Django, React, and deployment strategies.",
            "credential_link": "#",
            "image": "ccsa.jpg",
        },
    ]
    for c in certs_data:
        Certificate.objects.create(**c)
    print(f"Created {len(certs_data)} Certificates")

    # 7. Blogs
    BlogPost.objects.all().delete()
    blogs_data = [
        {
            "title": "Building Scalable Architecture with Django and React",
            "slug": "scalable-architecture-django-react",
            "date": date(2025, 11, 10),
            "summary": "A deep dive into decoupling frontend and backend to create high-performance web applications that scale.",
            "content": "# Building Scalable Architecture...\n\n(Placeholder for technical article content...)",
        },
        {
            "title": "Optimizing Next.js Performance: A Practical Guide",
            "slug": "optimizing-nextjs-performance",
            "date": date(2025, 10, 25),
            "summary": "Techniques for reducing bundle size and improving Core Web Vitals in large-scale Next.js applications.",
            "content": "# Optimizing Next.js...",
        },
    ]
    for b in blogs_data:
        BlogPost.objects.create(**b)
    print(f"Created {len(blogs_data)} Blogs")

    print("Synchronization complete!")


if __name__ == "__main__":
    sync_data()
