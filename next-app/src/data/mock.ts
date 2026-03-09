import { Project, Skill, Tool } from "../types";

export const MOCK_PROJECTS: Project[] = [
    {
        "id": "1",
        "title": "Noirel Luxury Ecommerce",
        "description": "A high-performance e-commerce platform designed for luxury aesthetics. Implemented complex filtering, cart management, and optimized asset loading for a sub-2s load time.",
        "tags": ["Next.js", "TypeScript", "Tailwind CSS", "Redux"],
        "image": "project1.jpg",
        "link": "https://noirel-store.vercel.app/",
        "github": "https://github.com/ashif-ek/noirel-ecommerce"
    },
    {
        "id": "2",
        "title": "CivicConnect Governance",
        "description": "A comprehensive digital governance platform enabling citizen engagement. Features include complaint tracking, real-time notifications, and administrative dashboards. Handled role-based access control for 4 distinct user types.",
        "tags": ["Django", "Flutter", "PostgreSQL", "REST API"],
        "image": "project2.jpg",
        "link": "https://github.com/ashif-ek/civic-connect",
        "github": "https://github.com/ashif-ek/civic-connect"
    },
    {
        "id": "3",
        "title": "Minimalist CMS Blog",
        "description": "A custom Content Management System built to be lightweight and SEO-friendly. Includes markdown support, dynamic routing, and server-side rendering for optimal search engine visibility.",
        "tags": ["Django", "HTMX", "PostgreSQL", "Bootstrap"],
        "image": "project3.jpg",
        "link": "https://github.com/ashif-ek/django-blog",
        "github": "https://github.com/ashif-ek/django-blog"
    }
];

export const MOCK_SKILLS: Skill[] = [
    { "id": 1, "name": "Django & Python", "level": 95, "category": "Backend", "color": "#44B78B", "icon": "PythonIcon", "description": "Expert in building secure REST APIs, ORM optimization, and scalable backend architecture." },
    { "id": 2, "name": "React & Next.js", "level": 90, "category": "Frontend", "color": "#61DAFB", "icon": "ReactIcon", "description": "Building performant, server-side rendered (SSR) applications with modern hooks and state management." },
    { "id": 3, "name": "TypeScript", "level": 85, "category": "Language", "color": "#3178C6", "icon": "TSIcon", "description": "Strong typing for scalable codebases, resulting in fewer runtime errors and better maintainability." },
    { "id": 4, "name": "Database Design", "level": 88, "category": "Data", "color": "#336791", "icon": "DatabaseIcon", "description": "Schema design, optimization, and management of SQL (PostgreSQL) and NoSQL databases." },
    { "id": 5, "name": "DevOps & Cloud", "level": 80, "category": "Infrastructure", "color": "#FF9900", "icon": "CloudIcon", "description": "Experience with Docker, CI/CD pipelines, and deploying to platforms like AWS and Vercel." },
    { "id": 6, "name": "Flutter", "level": 80, "category": "Mobile", "color": "#027DFD", "icon": "MobileIcon", "description": "Developing cross-platform mobile applications with native-like performance." }
];

export const MOCK_TOOLS: Tool[] = [
    { "id": "1", "name": "VS Code", "icon": "CodeIcon" },
    { "id": "2", "name": "PostgreSQL", "icon": "DatabaseIcon" },
    { "id": "3", "name": "Docker", "icon": "DockerIcon" },
    { "id": "4", "name": "Git & GitHub", "icon": "GitIcon" },
    { "id": "5", "name": "Figma", "icon": "FigmaIcon" },
    { "id": "6", "name": "Postman", "icon": "PostmanIcon" }
];
