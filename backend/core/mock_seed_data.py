"""Seed data mirrored from next-app/src/data/mockData.ts."""

MOCK_PROFILE = {
    "name": "Ashif E.K",
    "title": "Full-stack Engineer",
    "description": (
        "I build high-performance web applications enabling businesses to scale. "
        "Specializing in React, Django, and Modern Cloud Architecture, I transform "
        "complex requirements into seamless digital experiences."
    ),
    "email": "ashifek11@gmail.com",
}

MOCK_ABOUT = {
    "introduction": (
        "I am a results-driven Software Engineer with a passion for building robust, "
        "scalable web solutions. My journey began with a curiosity for how things work, "
        "which quickly evolved into a career in full-stack development. I focus on writing "
        "clean, maintainable code and solving real-world business problems."
    ),
    "experience": (
        "With a strong foundation in Computer Science, I have successfully delivered projects "
        "ranging from e-commerce platforms to complex governance systems. I have hands-on "
        "experience with the modern web stack including Next.js, Django, and Cloud Infrastructure. "
        "My work emphasizes performance optimization, security best practices, and intuitive user "
        "experience design."
    ),
    "philosophy": (
        "I believe that technology should be invisible—it should work so smoothly that users "
        "focus on their goals, not the tools. My approach combines rigorous engineering principles "
        "with creative problem-solving to deliver software that is not just functional, but exceptional."
    ),
}

MOCK_SOCIAL_LINKS = [
    {"name": "Github", "url": "https://github.com/ashif-ek"},
    {"name": "LinkedIn", "url": "https://linkedin.com/in/ashifek"},
    {"name": "Instagram", "url": "https://instagram.com/ashif.io"},
    {"name": "Fiverr", "url": "http://www.fiverr.com/s/gDLy45X"},
    {"name": "Docs Material", "url": "https://ashif-ek.github.io/docs-stack-material/"},
]

MOCK_SKILLS = [
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

MOCK_TOOLS = [
    {"name": "VS Code", "icon": "CodeIcon"},
    {"name": "PostgreSQL", "icon": "DatabaseIcon"},
    {"name": "Docker", "icon": "DockerIcon"},
    {"name": "Git & GitHub", "icon": "GitIcon"},
    {"name": "Figma", "icon": "FigmaIcon"},
    {"name": "Postman", "icon": "PostmanIcon"},
]

MOCK_PROJECTS = [
    {
        "title": "Noirel Luxury Ecommerce",
        "description": (
            "A high-performance e-commerce platform designed for luxury aesthetics. Implemented "
            "complex filtering, cart management, and optimized asset loading for a sub-2s load time."
        ),
        "tags": ["Next.js", "TypeScript", "Tailwind CSS", "Redux"],
        "image": "project1.jpg",
        "link": "https://noirel-store.vercel.app/",
        "github": "https://github.com/ashif-ek/noirel-ecommerce",
    },
    {
        "title": "CivicConnect Governance",
        "description": (
            "A comprehensive digital governance platform enabling citizen engagement. Features include "
            "complaint tracking, real-time notifications, and administrative dashboards. Handled role-based "
            "access control for 4 distinct user types."
        ),
        "tags": ["Django", "Flutter", "PostgreSQL", "REST API"],
        "image": "project2.jpg",
        "link": "https://github.com/ashif-ek/civic-connect",
        "github": "https://github.com/ashif-ek/civic-connect",
    },
    {
        "title": "Minimalist CMS Blog",
        "description": (
            "A custom Content Management System built to be lightweight and SEO-friendly. Includes markdown "
            "support, dynamic routing, and server-side rendering for optimal search engine visibility."
        ),
        "tags": ["Django", "HTMX", "PostgreSQL", "Bootstrap"],
        "image": "project3.jpg",
        "link": "https://github.com/ashif-ek/django-blog",
        "github": "https://github.com/ashif-ek/django-blog",
    },
]

MOCK_CERTIFICATES = [
    {
        "title": "Bachelor of Computer Applications",
        "issuer": "University of Calicut",
        "date": "2025",
        "category": "Degree",
        "image": "bca.jpg",
        "credential_link": "",
        "description": "Focused on Software Engineering, Data Structures, and Algorithms. Graduated with honors.",
    },
    {
        "title": "Full Stack Development Certification",
        "issuer": "Regional Technologies",
        "date": "2024",
        "category": "Professional",
        "image": "ccsa.jpg",
        "credential_link": "",
        "description": "Intensive bootcamp covering advanced Python, Django, React, and deployment strategies.",
    },
]

MOCK_BLOGS = [
    {
        "slug": "scalable-architecture-django-react",
        "title": "Building Scalable Architecture with Django and React",
        "date": "2025-11-10",
        "summary": (
            "A deep dive into decoupling frontend and backend to create high-performance "
            "web applications that scale."
        ),
        "image_url": "blog/scalable.png",
        "content": "# Building Scalable Architecture...\n\n(Placeholder for technical article content...)",
    },
    {
        "slug": "optimizing-nextjs-performance",
        "title": "Optimizing Next.js Performance: A Practical Guide",
        "date": "2025-10-25",
        "summary": "Techniques for reducing bundle size and improving Core Web Vitals in large-scale Next.js applications.",
        "image_url": "blog/performance.png",
        "content": "# Optimizing Next.js...",
    },
]

MOCK_SERVICES = [
    {
        "title": "Full-Stack Web Development",
        "description": (
            "End-to-end development of responsive web applications using React, Next.js, and Django. "
            "I handle everything from database design to frontend interactivity."
        ),
        "icon": "CodeIcon",
    },
    {
        "title": "MVP Development",
        "description": (
            "Rapid prototyping and development of Minimum Viable Products for startups. "
            "Launch your idea quickly with a solid, scalable foundation."
        ),
        "icon": "RocketIcon",
    },
    {
        "title": "API Design & Integration",
        "description": (
            "Building secure and scalable RESTful APIs. Integration of third-party services like "
            "payment gateways (Stripe), authentication (OAuth), and cloud storage."
        ),
        "icon": "ServerIcon",
    },
    {
        "title": "Performance Optimization",
        "description": (
            "Auditing and optimizing existing applications for speed, accessibility, and SEO. "
            "Implementing caching strategies and code splitting."
        ),
        "icon": "LightningIcon",
    },
]

MOCK_SETTINGS = {
    "site_title": "Ashif's Portfolio",
    "show_blog": True,
    "show_skills": True,
    "show_projects": True,
    "show_certificates": True,
    "maintenance_mode": False,
    "welcome_message": "",
}
