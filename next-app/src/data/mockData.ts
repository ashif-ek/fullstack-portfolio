import { Profile, AboutData, Skill, Tool, Project, Certificate, Blog, Service } from "../types";

export const profile: Profile = {
    "name": "Ashif E.K",
    "title": "Full-Stack Engineer",
    "description": "I build high-performance web applications enabling businesses to scale. Specializing in React, Django, and Modern Cloud Architecture, I transform complex requirements into seamless digital experiences.",
    "email": "ashifek11@gmail.com",
    "socialLinks": [
        {
            "name": "Github",
            "url": "https://github.com/ashif-ek"
        },
        {
            "name": "LinkedIn",
            "url": "https://linkedin.com/in/ashifek"
        },
        {
            "name": "Instagram",
            "url": "https://instagram.com/ashif.io"
        },
        {
            "name": "Fiverr",
            "url": "http://www.fiverr.com/s/gDLy45X"
        },
        {
            "name": "Docs Material",
            "url": "https://ashif-ek.github.io/docs-stack-material/"
        }
    ]
};

export const about: AboutData[] = [
    {
        "id": "1",
        "avatar": "",
        "introduction": "I am a results-driven Software Engineer with a passion for building robust, scalable web solutions. My journey began with a curiosity for how things work, which quickly evolved into a career in full-stack development. I focus on writing clean, maintainable code and solving real-world business problems.",
        "experience": "With a strong foundation in Computer Science, I have successfully delivered projects ranging from e-commerce platforms to complex governance systems. I have hands-on experience with the modern web stack including Next.js, Django, and Cloud Infrastructure. My work emphasizes performance optimization, security best practices, and intuitive user experience design.",
        "philosophy": "I believe that technology should be invisible—it should work so smoothly that users focus on their goals, not the tools. My approach combines rigorous engineering principles with creative problem-solving to deliver software that is not just functional, but exceptional.",
        "stats": {
            "projects": 10,
            "certificates": 4,
            "technologies": 8
        }
    }
];

export const services: Service[] = [
    {
        id: "10",
        title: "MVP Development",
        description: "Rapid prototyping and development of Minimum Viable Products for startups. Launch your idea quickly with a solid, scalable foundation.",
        icon: "RocketIcon"
    },
    {
        id: "11",
        title: "API Design & Integration",
        description: "Building secure and scalable RESTful APIs. Integration of third-party services like payment gateways (Stripe), authentication (OAuth), and cloud storage.",
        icon: "ServerIcon"
    },
    {
        id: "12",
        title: "Performance Optimization",
        description: "Auditing and optimizing existing applications for speed, accessibility, and SEO. Implementing caching strategies and code splitting.",
        icon: "LightningIcon"
    },
    {
        id: "13",
        title: "Backend API Development",
        description: "Secure REST APIs using Django REST Framework with authentication and scalable architecture.",
        icon: "CodeIcon"
    },
    {
        id: "14",
        title: "Full Stack Web Development",
        description: "Building responsive web platforms using React, Django, and PostgreSQL.",
        icon: "LayersIcon"
    },
    {
        id: "15",
        title: "Cloud Deployment",
        description: "Deploying production-ready applications using Docker, AWS EC2, and CI/CD pipelines.",
        icon: "CloudIcon"
    }
];

export const skills: Skill[] = [
    { "id": 19, "name": "Django REST Framework", "level": 90, "category": "Technology", "color": "#44B78B", "icon": "PythonIcon", "description": "Designing secure, modular REST APIs for production-grade backend systems." },
    { "id": 20, "name": "React.js", "level": 90, "category": "Technology", "color": "#61DAFB", "icon": "ReactIcon", "description": "Building responsive frontend applications with reusable components and API-driven architecture." },
    { "id": 21, "name": "PostgreSQL", "level": 75, "category": "Technology", "color": "#336791", "icon": "DatabaseIcon", "description": "Modeling relational data and optimizing queries for scalable backend performance." },
    { "id": 22, "name": "Docker", "level": 75, "category": "DevOps", "color": "#2496ED", "icon": "DockerIcon", "description": "Containerizing services for environment parity across development and production." },
    { "id": 23, "name": "AWS (EC2, RDS, S3)", "level": 50, "category": "Cloud Platform", "color": "#FF9900", "icon": "CloudIcon", "description": "Amazon Web Services for cloud computing and infrastructure" },
    { "id": 24, "name": "MySQL", "level": 75, "category": "Database", "color": "#4479A1", "icon": "DatabaseIcon", "description": "Relational database management system" },
    { "id": 25, "name": "Redis", "level": 85, "category": "Caching", "color": "#D82C20", "icon": "ServerIcon", "description": "In-memory data structure store for caching" },
    { "id": 26, "name": "Docker Compose", "level": 80, "category": "DevOps", "color": "#2496ED", "icon": "DockerIcon", "description": "Tool for defining and running multi-container Docker applications" },
    { "id": 27, "name": "REST APIs", "level": 90, "category": "Backend Development", "color": "#44B78B", "icon": "CodeIcon", "description": "Representational State Transfer APIs for client-server communication" },
    { "id": 28, "name": "GraphQL", "level": 75, "category": "Backend Development", "color": "#E10098", "icon": "CodeIcon", "description": "Query language for APIs with strong typing and schema definition" },
    { "id": 29, "name": "Production Reliability", "level": 80, "category": "DevOps", "color": "#44B78B", "icon": "ShieldCheckIcon", "description": "Ensuring systems remain operational and stable in production environments" }
];

export const tools: Tool[] = [
    { "id": "13", "name": "VS Code", "icon": "CodeIcon" },
    { "id": "14", "name": "PostgreSQL", "icon": "DatabaseIcon" },
    { "id": "15", "name": "Docker", "icon": "DockerIcon" },
    { "id": "16", "name": "Git & GitHub", "icon": "GitIcon" },
    { "id": "17", "name": "Figma", "icon": "FigmaIcon" },
    { "id": "18", "name": "Postman", "icon": "PostmanIcon" }
];

export const projects: Project[] = [
    {
        "id": "13",
        "slug": "salary-checker",
        "title": "Salary Checker",
        "description": "An AI-powered salary insight platform using percentile analytics and machine learning to predict market-accurate compensation.",
        "content": "## Problem Statement\nJob seekers and employees often lack transparent, data-driven insights into their market value. Static salary surveys are frequently outdated or lack the granularity needed for specific niches.\n\n## Architecture\nBuilt with **FastAPI** and **PostgreSQL** for a high-performance backend, utilizing **scikit-learn** for predictive modeling. The frontend features interactive data visualizations to present complex analytics simply.\n\n## Solution & Results\nSalary Reality Checker delivers real-time salary insights using fuzzy-matched job titles and machine-learning predictions. It auto-corrects user input and predicts salaries even when exact data is missing, helping users negotiate with confidence.\n\n### Key Metrics\n- Processed over 10k data points for training\n- Achieved 85% accuracy in salary predictions\n- Sub-100ms API response times",
        "tags": ["FastAPI", "PostgreSQL", "Machine Learning", "AI", "Salary Analytics"],
        "image": "project1.jpg",
        "link": "https://ashif-ek.github.io/docs-stack-material/",
        "github": "https://github.com/ashif-ek/salary-checker"
    },
    {
        "id": "11",
        "slug": "civic-connect",
        "title": "Civic (CiviTech) - Digital Governance Platform",
        "description": "A cross-platform governance solution connecting citizens with local authorities for transparent service tracking and complaint management.",
        "content": "## Problem Statement\nCitizens often face bureaucratic hurdles and a lack of transparency when communicating with local government bodies (Panchayaths), leading to slow resolution times for civic issues.\n\n## Architecture\nA decoupled system with a **Django** REST API and a **Flutter** mobile application. Implemented **RBAC** (Role-Based Access Control) to handle complex administrative hierarchies and moderator workflows.\n\n## Solution & Results\nDeveloped a multi-role platform that enables complaint escalation, real-time service tracking, and automated announcements. This has significantly reduced the distance between citizens and administrators.\n\n### Key Features\n- Real-time complaint escalation workflow\n- Administrative analytics dashboard\n- Cross-platform availability (iOS/Android/Web)",
        "tags": ["Django", "Flutter", "REST API", "RBAC", "PostgreSQL"],
        "image": "project2.jpg",
        "link": "#",
        "github": "https://github.com/ashif-ek/civic-connect"
    },
    {
        "id": "12",
        "slug": "system-design-sandbox",
        "title": "Blog System Design Sandbox",
        "description": "A playground for production-grade backend patterns, focusing on security, scalability, and automated CI/CD workflows.",
        "content": "## Problem Statement\nExperimenting with high-load architectural patterns in a production environment is risky. This sandbox was created to test and validate various backend strategies safely.\n\n## Architecture\nA micro-monolith approach using **Django REST Framework** within **Docker** containers. The infrastructure is managed via **GitHub Actions** for CI/CD, deploying to **AWS**.\n\n## Solution & Results\nSuccessfully implemented and stress-tested production patterns including JWT rotation, structured logging, and health monitoring. This serves as a template for my professional client projects.\n\n### Technical Highlights\n- JWT Access/Refresh token rotation\n- Comprehensive health checks and metrics\n- Automated deployment via Docker and AWS",
        "tags": ["React", "Django REST Framework", "Docker", "GitHub Actions", "AWS"],
        "image": "project3.jpg",
        "link": "#",
        "github": "#"
    },
    {
        "id": "14",
        "slug": "time-lens",
        "title": "TimeLens",
        "description": "A productivity and mindset tool that reframes time into life-equivalents to help users perceive the true weight of their minutes and days.",
        "content": "## Problem Statement\nPeople often view time as an infinite resource in the abstract, leading to procrastination. Standard countdown timers fail to convey the emotional weight of lost time.\n\n## Architecture\nA lightweight **Python** utility that focuses on mathematical accuracy and minimal overhead. Designed with simplicity as a core tenet to ensure distraction-free usage.\n\n## Solution & Results\nTime Lens reframes real minutes into life-equivalents, turning seconds into life-hours and minutes into life-days. This psychological shift helps users prioritize deep work over trivial tasks.\n\n### Impact\n- Used by developers to track 'Life ROI' on coding tasks\n- Simplistic CLI and potential for GUI expansion\n- Zero-dependency core logic",
        "tags": ["Python", "Productivity", "Mindset Tool", "Time Management"],
        "image": "project4.jpg",
        "link": "https://ashif-ek.github.io/docs-stack-material/",
        "github": "https://github.com/ashif-ek/time-lens-python"
    },
    {
        "id": "10",
        "slug": "noirel-ecommerce",
        "title": "NOIR'EL - Luxury E-Commerce Platform",
        "description": "A high-performance luxury e-commerce platform with a focus on seamless user experience and secure transaction workflows.",
        "content": "## Problem Statement\nLuxury brands require a digital aesthetic that matches their product quality. Most out-of-the-box ecommerce solutions fail to provide the necessary customization and performance.\n\n## Architecture\nA modern tech stack using **React** for the library and **Django REST Framework** for the engine. Utilized **PostgreSQL** for relational data integrity and **Razorpay** for secure payments.\n\n## Solution & Results\nBuilt a bespoke platform covering the entire order lifecycle. Implemented JWT authentication and advanced admin controls, resulting in a premium shopping experience with high conversion potential.\n\n### Business Value\n- End-to-end checkout automation\n- Secure payment integration with Razorpay\n- Optimized asset delivery for luxury imagery",
        "tags": ["React", "Django REST Framework", "PostgreSQL", "Razorpay", "AWS"],
        "image": "project5.jpg",
        "link": "https://noirel-perfume.vercel.app/",
        "github": "https://github.com/ashif-ek/noirel-ecommerce"
    }
];

export const certificates: Certificate[] = [
    {
        "id": "10",
        "title": "Workshop Participation Certificate",
        "issuer": "Prosevo Technologies",
        "date": "14 October 2024",
        "category": "Workshop / Professional Development",
        "image": "prosevo.webp",
        "credentialLink": "#",
        "description": "Certificate awarded to Ashif E.K for successfully participating in a workshop conducted by Prosevo,\nRecognized for commendable enthusiasm and active engagement during the session."
    },
    {
        "id": "9",
        "title": "Certified Cyber Security Analyst (CCSA)",
        "issuer": "Red Team Hacker Academy",
        "date": "2022",
        "category": "cybersecurity",
        "image": "ccsa.webp",
        "credentialLink": "#",
        "description": "Covered OSINT, web application security testing, vulnerability assessment, and SOC/SIEM fundamentals."
    },
    {
        "id": "8",
        "title": "Python Django & Flutter Certification",
        "issuer": "Regional Technologies",
        "date": "2025",
        "category": "web development",
        "image": "django.webp",
        "credentialLink": "#",
        "description": "Hands-on training in Django backend development and Flutter mobile application development."
    },
    {
        "id": "7",
        "title": "Bachelor of Computer Applications (BCA)",
        "issuer": "SAFA Arts & Science College",
        "date": "Aug 2022 – Apr 2025",
        "category": "degree / education",
        "image": "bca.jpg",
        "credentialLink": "#",
        "description": "Completed undergraduate studies in computer applications focusing on software development and computing fundamentals."
    }
];

export const blogs: Blog[] = [
    {
        "id": 5,
        "slug": "scalable-architecture-django-react",
        "title": "Building Scalable Architecture with Django and React",
        "date": "2025-11-10",
        "summary": "A deep dive into decoupling frontend and backend to create high-performance web applications that scale.",
        "imageUrl": "/blog/scalable.png",
        "content": "# Building Scalable Architecture...\n\n(Placeholder for technical article content...)"
    },
    {
        "id": 6,
        "slug": "optimizing-nextjs-performance",
        "title": "Optimizing Next.js Performance: A Practical Guide",
        "date": "2025-10-25",
        "summary": "Techniques for reducing bundle size and improving Core Web Vitals in large-scale Next.js applications.",
        "imageUrl": "/blog/performance.png",
        "content": "# Optimizing Next.js..."
    },
    {
        "id": 7,
        "slug": "getting-started-with-react-beginners-guide",
        "title": "Getting Started with React: A Beginner's Guide",
        "date": "2026-03-06",
        "summary": "Learn the fundamentals of React, including components, JSX, props, and state. This comprehensive guide will help you get started on your journey to mastering React development.",
        "imageUrl": "",
        "content": "# Getting Started with React\r\n\r\nReact is a powerful JavaScript library for building user interfaces. In this article, we'll explore the key concepts that every React developer should understand.\r\n\r\n## What is React?\r\n\r\nReact is a JavaScript library maintained by Facebook that simplifies the process of building interactive user interfaces. It uses a component-based architecture to create reusable and maintainable code.\r\n\r\n## Key Concepts\r\n\r\n### Components\r\nComponents are the building blocks of any React application. They are reusable pieces of UI that encapsulate their own structure and behavior.\r\n\r\n### JSX\r\nJSX is a syntax extension that looks similar to HTML. It allows you to write UI code in a more readable and intuitive way.\r\n\r\n### Props\r\nProps are the way to pass data from parent to child components. They are read-only and help maintain unidirectional data flow.\r\n\r\n### State\r\nState allows components to manage their own data. Unlike props, state is mutable and can be updated over time."
    },
    {
        "id": 8,
        "slug": "django-best-practices-production",
        "title": "Django Best Practices for Production",
        "date": "2026-03-06",
        "summary": "Learn the essential best practices for deploying Django applications to production environments. This guide covers configuration, security, and performance optimization.",
        "imageUrl": "",
        "content": "# Django Best Practices for Production\r\n\r\n## Environment Configuration\r\nAlways use environment variables for sensitive configuration like database credentials, API keys, and secret keys. Never hardcode these values in your source code.\r\n\r\n## Security Measures\r\n- Enable DEBUG = False in production\r\n- Use HTTPS everywhere\r\n- Set ALLOWED_HOSTS properly\r\n- Use Django's built-in security middleware\r\n- Keep Django and dependencies updated\r\n\r\n## Database Optimization\r\n- Use database indexing strategically\r\n- Monitor query performance with Django Debug Toolbar\r\n- Implement connection pooling\r\n- Use raw SQL only when necessary\r\n\r\n## Caching Strategy\r\nImplement caching at multiple levels to improve performance:\r\n- Browser caching\r\n- Server-side caching with Redis\r\n- Database query caching\r\n- View-level caching"
    },
    {
        "id": 9,
        "slug": "advanced-redux-patterns-middleware",
        "title": "Advanced Redux Patterns and Middleware",
        "date": "2026-03-06",
        "summary": "Master advanced Redux patterns including middleware, sagas, and thunks. Learn how to manage complex state in large-scale applications effectively.",
        "imageUrl": "",
        "content": "# Advanced Redux Patterns\r\n\r\n## Redux Middleware\r\nMiddleware functions are powerful tools for handling side effects in Redux applications. They sit between actions and reducers, allowing you to intercept and modify actions.\r\n\r\n## Redux Thunk\r\nRedux Thunk is a middleware that allows you to return functions from action creators instead of objects. This is useful for async operations.\r\n\r\n```javascript\r\nconst myAction = (param) => (dispatch) => {\r\n  dispatch(actionStart());\r\n  setTimeout(() => {\r\n    dispatch(actionSuccess(param));\r\n  }, 1000);\r\n};\r\n```\r\n\r\n## Redux Saga\r\nRedux Saga is an alternative middleware for handling side effects using generator functions. It provides more advanced control over asynchronous operations.\r\n\r\n## Best Practices\r\n- Keep actions pure and side-effect free\r\n- Use middleware for async operations\r\n- Structure your reducers properly\r\n- Use selector functions to access state"
    },
    {
        "id": 10,
        "slug": "understanding-react-hooks",
        "title": "Understanding React Hooks",
        "date": "2026-03-06",
        "summary": "Master React Hooks to write functional components with state and side effects. This guide covers useState, useEffect, useContext, and custom hooks.",
        "imageUrl": "",
        "content": "# React Hooks Guide\r\n\r\nReact Hooks allow you to use state and other React features without writing a class component. They are functions that let you \"hook into\" React state and lifecycle features from functional components.\r\n\r\n## Common Hooks\r\n\r\n### useState\r\nuseState is the most basic Hook. It lets you add state to functional components.\r\n\r\n### useEffect\r\nuseEffect is used for side effects in functional components. It runs after the component renders.\r\n\r\n### useContext\r\nuseContext allows you to subscribe to React context without introducing nesting.\r\n\r\n### useReducer\r\nuseReducer is a more complex alternative to useState for managing complex state logic.\r\n\r\n## Best Practices\r\n- Only use Hooks at the top level\r\n- Only use Hooks from React function components\r\n- Use the ESLint plugin to enforce these rules"
    }
];
