import { Project, Skill, Tool } from "../types";

export const MOCK_PROJECTS: Project[] = [
    {
        "id": "10",
        "slug": "noirel-ecommerce",
        "title": "NOIR'EL - Luxury E-Commerce Platform",
        "description": "Built a full-stack e-commerce platform using React and Django REST Framework covering the complete order lifecycle from browsing to secure payment confirmation. Implemented JWT authentication, admin controls, and payment workflows using Razorpay.",
        "tags": ["React", "Django REST Framework", "PostgreSQL", "Razorpay", "AWS"],
        "image": "project5.jpg",
        "link": "https://noirel-perfume.vercel.app/",
        "github": "https://github.com/ashif-ek/noirel-ecommerce"
    },
    {
        "id": "11",
        "slug": "civic-connect",
        "title": "Civic (CiviTech) - Digital Governance Platform",
        "description": "Developed a multi-role civic platform connecting citizens with Panchayath and higher administrative authorities, enabling complaint escalation, service tracking, announcements, moderation, analytics, and citizen engagement.",
        "tags": ["Django", "Flutter", "REST API", "RBAC", "PostgreSQL"],
        "image": "project2.jpg",
        "link": "#",
        "github": "https://github.com/ashif-ek/civic-connect"
    },
    {
        "id": "12",
        "slug": "system-design-sandbox",
        "title": "Blog System Design Sandbox",
        "description": "Built a full-stack blogging system to experiment with production backend patterns including JWT access/refresh tokens, request validation, structured logging, health checks, and Dockerized deployment.",
        "tags": ["React", "Django REST Framework", "Docker", "GitHub Actions", "AWS"],
        "image": "project3.jpg",
        "link": "#",
        "github": "#"
    }
];

export const MOCK_SKILLS: Skill[] = [
    { "id": 19, "name": "Django REST Framework", "level": 90, "category": "Technology", "color": "#44B78B", "icon": "PythonIcon", "description": "Designing secure, modular REST APIs for production-grade backend systems." },
    { "id": 20, "name": "React.js", "level": 90, "category": "Technology", "color": "#61DAFB", "icon": "ReactIcon", "description": "Building responsive frontend applications with reusable components and API-driven architecture." },
    { "id": 21, "name": "PostgreSQL", "level": 75, "category": "Technology", "color": "#336791", "icon": "DatabaseIcon", "description": "Modeling relational data and optimizing queries for scalable backend performance." },
    { "id": 22, "name": "Docker", "level": 75, "category": "DevOps", "color": "#2496ED", "icon": "DockerIcon", "description": "Containerizing services for environment parity across development and production." },
    { "id": 23, "name": "AWS (EC2, RDS, S3)", "level": 50, "category": "Cloud Platform", "color": "#FF9900", "icon": "CloudIcon", "description": "Amazon Web Services for cloud computing and infrastructure" },
];

export const MOCK_TOOLS: Tool[] = [
    { "id": "13", "name": "VS Code", "icon": "CodeIcon" },
    { "id": "14", "name": "PostgreSQL", "icon": "DatabaseIcon" },
    { "id": "15", "name": "Docker", "icon": "DockerIcon" },
    { "id": "16", "name": "Git & GitHub", "icon": "GitIcon" },
    { "id": "17", "name": "Figma", "icon": "FigmaIcon" },
    { "id": "18", "name": "Postman", "icon": "PostmanIcon" }
];
