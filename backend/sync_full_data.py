import os
import django
import json
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
    
    experience_list = [
        {
            "role": "Full Stack Developer",
            "company": "Bridgeon",
            "period": "May 2025 – Present",
            "highlights": [
                "Architected and delivered scalable web applications using Django REST Framework, React, and PostgreSQL following modular service-oriented design principles.",
                "Designed secure REST APIs implementing JWT authentication, role-based access control (RBAC), and layered permission enforcement.",
                "Improved backend performance by optimizing database queries and request execution paths, reducing API response latency by up to 35%.",
                "Built state-driven admin interfaces using React + Redux Toolkit, ensuring predictable data flow and reducing UI inconsistency bugs.",
                "Implemented Razorpay payment workflows with transaction verification, idempotent order handling, and failure recovery mechanisms.",
                "Deployed applications on AWS (EC2, RDS) with Nginx + Gunicorn, implementing reverse proxying, process management, and zero-downtime deployment strategies via CI/CD pipelines."
            ],
            "link": "https://noirel-perfume.vercel.app/"
        },
        {
            "role": "Project Intern",
            "company": "Regional Technologies",
            "period": "Oct 2024 – Mar 2025",
            "highlights": [
                "Built a cross-platform digital governance platform using Django backend services and a Flutter mobile application to streamline citizen–administration interaction.",
                "Modeled hierarchical governance architecture (District → Higher Authority → Panchayath → Citizens) with role-based permission controls.",
                "Developed REST APIs supporting citizen services such as service requests, complaint submission, notifications, and community updates.",
                "Implemented complaint escalation workflows allowing unresolved Panchayath-level issues to be forwarded to higher administrative authorities.",
                "Built an announcement and update feed enabling Panchayath administrators to publish news, alerts, and public service information to residents.",
                "Enabled citizen engagement features including community posts, media sharing, and interaction within local governance networks.",
                "Designed normalized and query-efficient data models, reducing redundant joins and improving query performance under relational workloads."
            ]
        }
    ]

    p = Profile.objects.create(
        name="Ashif E.K",
        title="Full-Stack Engineer",
        description="Full-Stack Engineer specializing in production-grade web platforms. Experienced in designing secure APIs, scalable backends, and high-performance frontends using Django, React, PostgreSQL, and AWS. Dedicated to automation, CI/CD, and system reliability.",
        introduction="Full-Stack Engineer focused on building reliable, production-grade web platforms. Experienced in designing secure APIs and scalable backend systems using Django REST Framework, and building high-performance frontends with React. I prioritize system reliability, automation, and pragmatic engineering practices that operate correctly in production.",
        experience=json.dumps(experience_list),
        philosophy="Emphasizes reliability, observability, and maintainability: automated deployments, secure defaults, performance-first frontend patterns, and production-focused testing and monitoring.",
        email="ashifek11@gmail.com",
    )

    links_data = [
        {"name": "GitHub", "url": "https://github.com/ashif-ek"},
        {"name": "LinkedIn", "url": "https://www.linkedin.com/in/ashifek"},
        {"name": "Fiverr", "url": "http://www.fiverr.com/s/gDLy45X"},
        {"name": "Docs Material", "url": "https://ashif-ek.github.io/docs-stack-material/"},
        {"name": "WhatsApp", "url": "https://wa.me/919037499763"},
        {"name": "Instagram", "url": "https://instagram.com/ashif.io"},
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
            "title": "Cipher Analytics",
            "slug": "cipher-analytics",
            "description": "A privacy-preserving distributed AI analytics platform enabling secure computation on encrypted datasets using Fully Homomorphic Encryption (FHE CKKS), featuring a multi-queue distributed architecture (Celery + Redis) and a WebGL 3D data visualization layer.",
            "content": """## Cipher Analytics — Privacy-Preserving Distributed AI Platform

Cipher Analytics is a security-first, high-throughput analytics system designed to enable secure machine learning computation and statistical aggregation directly on encrypted datasets without exposing raw user data.

### Core Architecture & Technical Highlights
* **Homomorphic Cryptography**: Implemented privacy-preserving computing architectures using Fully Homomorphic Encryption (FHE) with the CKKS scheme (via TenSEAL/SEAL libraries), supporting secure ML inference.
* **Distributed Processing Pipeline**: Designed a multi-queue distributed task architecture using Celery and Redis to isolate high-compute cryptographic functions from standard web I/O workloads, improving latency and preventing core bottlenecks.
* **Event-Driven Backend**: Built an asynchronous, real-time feedback backend using Django REST Framework, Django Channels (WebSockets), and Daphne to stream live task progress and FHE computation results.
* **Interactive 3D Analytics**: Engineered a real-time statistical visualization layer using WebGL (Three.js and React Three Fiber) and ECharts to map high-dimensional clusters and anomalous data patterns.
* **Clustering & AI Explainability**: Applied SHAP (SHapley Additive exPlanations) for local model explanation, and integrated UMAP and HDBSCAN algorithms to cluster and identify anomalies in encrypted datasets.
* **Production-Grade Security**: Orchestrated services using Docker with secure shared-volume mounts. Enforced strict rate-limiting, comprehensive audit logging (via django-simple-history), static typing (mypy), and security scanning (bandit).""",
            "tags": "Django REST Framework, React, Fully Homomorphic Encryption (FHE), Celery & Redis, Three.js, Docker",
            "link": "#",
            "github": "https://github.com/ashif-ek",
            "image": "",
        },
        {
            "title": "Salary Checker",
            "slug": "salary-checker",
            "description": "Salary Reality Checker delivers AI-powered salary insights using percentile analytics, fuzzy-matched job titles, and machine-learning predictions. It auto-corrects user input, analyzes market trends, and predicts salaries when data is missing. Built with FastAPI, PostgreSQL, scikit-learn.",
            "content": "## Salary Reality Checker\n\nSalary Reality Checker delivers AI-powered salary insights using percentile analytics, fuzzy-matched job titles, and machine-learning predictions. It auto-corrects user input, analyzes market trends, and predicts salaries when data is missing.",
            "tags": "FastAPI, PostgreSQL, Machine Learning, AI, Salary Analytics",
            "link": "https://ashif-ek.github.io/docs-stack-material/",
            "github": "https://github.com/ashif-ek/salary-checker",
            "image": "",
        },
        {
            "title": "Civic (CiviTech) - Cross-Platform Digital Governance Platform",
            "slug": "civic-connect",
            "description": "Developed a multi-role civic platform connecting citizens with Panchayath and higher administrative authorities, enabling complaint escalation, service tracking, announcements, moderation, analytics, and citizen engagement.",
            "content": """## Civic (CiviTech) — Cross-Platform Digital Governance Platform

Civic is a comprehensive multi-role civic engagement system bridging communication gaps between citizens, local Panchayath officials, and higher administrative bodies.

### Core Architecture & Technical Highlights
* **Hierarchical Governance Model**: Designed normalized database relations representing District → Higher Authority → Panchayath → Citizens for structured role enforcement.
* **Complaint Escalation Workflow**: Developed automated state escalation engines to auto-forward unresolved local complaints to higher district authorities.
* **Public Information Broadcasting**: Developed alert and news feeds allowing Panchayath administrators to broadcast alerts and announcements directly to residents.
* **Citizen Engagement Tools**: Designed community forums, multimedia file sharing, and discussion threads utilizing efficient querying to minimize relational database joins.""",
            "tags": "Django, Flutter, REST API, RBAC, PostgreSQL",
            "link": "#",
            "github": "https://github.com/ashif-ek/civic-connect",
            "image": "",
        },
        {
            "title": "Blog System Design Sandbox",
            "slug": "system-design-sandbox",
            "description": "Built a full-stack blogging system to experiment with production backend patterns including JWT access/refresh tokens, request validation, structured logging, health checks, and Dockerized deployment.",
            "content": """## Blog System Design Sandbox — System Architecture Playground

This project serves as a secure, production-grade template sandbox designed to experiment with web service security, scaling, and deployment patterns.

### Core Architecture & Technical Highlights
* **Secure Session Architecture**: Implemented JWT-based authentication with strict access/refresh token rotation, token blacklisting, version control, and password-reset invalidation rules.
* **Enterprise Patterning**: Designed structured error validation middleware, standardized JSON response envelopes, and soft-delete database queries.
* **Observability & Health Monitoring**: Integrated structured application logging with request-scoped trace IDs to facilitate logs auditing across microservices.
* **Environment Parity**: Fully containerized the system utilizing multi-stage Docker builds to verify parity across development, staging, and production.
* **CI/CD Integration**: Engineered deployment pipelines using GitHub Actions to perform style checks, automated unit tests, and build validation.""",
            "tags": "React, Django REST Framework, Docker, GitHub Actions, AWS",
            "link": "#",
            "github": "",
            "image": "",
        },
        {
            "title": "TimeLens",
            "slug": "timelens",
            "description": "Time Lens reframes real minutes into life-equivalents, helping you feel the true weight of time. A mindset tool that turns seconds into life-hours, minutes into life-days, and days into life-years.",
            "content": "## TimeLens\n\nTime Lens reframes real minutes into life-equivalents, helping you feel the true weight of time. A mindset tool that turns seconds into life-hours, minutes into life-days, and days into life-years.",
            "tags": "Python, Productivity, Mindset Tool, Time Management",
            "link": "https://ashif-ek.github.io/docs-stack-material/",
            "github": "https://github.com/ashif-ek/time-lens-python",
            "image": "/images/mock/timelens.png",
        },
        {
            "title": "NOIR'EL - Luxury E-Commerce Platform",
            "slug": "noirel-ecommerce",
            "description": "Built a full-stack e-commerce platform using React and Django REST Framework covering the complete order lifecycle from browsing to secure payment confirmation. Implemented JWT authentication, admin controls, and payment workflows using Razorpay.",
            "content": """## NOIR'EL — Luxury E-Commerce Platform

NOIR'EL is a high-performance e-commerce engine focused on luxury aesthetics, high-speed catalogue browsing, and secure transaction workflows.

### Core Architecture & Technical Highlights
* **Modular APIs**: Designed rest resources using Django REST Framework for dynamic catalogues, cart updates, and checkout flows.
* **Payment Workflows**: Integrated Razorpay payment gateways with transaction signature verification, webhook validation, and failure recovery.
* **Predictable State Flow**: Built responsive frontends utilizing React and Redux Toolkit to prevent state inconsistencies between local carts and backend databases.
* **Optimal Performance**: Leveraged component lazy loading, image optimization, and bundle splitting, hitting a 100/100 Lighthouse performance grade.
* **Cloud Infrastructure**: Deployed on AWS (EC2 & RDS) behind Nginx and Gunicorn process managers, with CD pipelines driving automatic code delivery.""",
            "tags": "React, Django REST Framework, PostgreSQL, Razorpay, AWS",
            "link": "https://noirel-perfume.vercel.app/",
            "github": "https://github.com/ashif-ek/noirel-ecommerce",
            "image": "/images/mock/noirel.png",
        }
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
