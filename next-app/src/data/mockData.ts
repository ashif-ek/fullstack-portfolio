import { Profile, AboutData, Skill, Tool, Project, Certificate, Blog, Service, LocationData, Settings } from "../types";

export const profile: Profile = {
    "name": "Ashif E.K",
    "title": "Full Stack Engineer",
    "description": "I build high-performance web applications enabling businesses to scale. Specializing in React, Django, and Modern Cloud Architecture, I transform complex requirements into seamless digital experiences.",
    "email": "ashifek11@gmail.com",
    "socialLinks": [
        { "name": "Github", "url": "https://github.com/ashif-ek" },
        { "name": "LinkedIn", "url": "https://linkedin.com/in/ashifek" },
        { "name": "Instagram", "url": "https://instagram.com/ashif.io" },
        { "name": "Fiverr", "url": "http://www.fiverr.com/s/gDLy45X" },
        { "name": "Docs Material", "url": "https://ashif-ek.github.io/docs-stack-material/" }
    ]
};

export const about: AboutData[] = [
    {
        "id": "3",
        "avatar": "",
        "introduction": "I am a results-driven Software Engineer with a passion for building robust, scalable web solutions. My journey began with a curiosity for how things work, which quickly evolved into a career in full-stack development. I focus on writing clean, maintainable code and solving real-world business problems.",
        "experience": "With a strong foundation in Computer Science, I have successfully delivered projects ranging from e-commerce platforms to complex governance systems. I have hands-on experience with the modern web stack including Next.js, Django, and Cloud Infrastructure. My work emphasizes performance optimization, security best practices, and intuitive user experience design.",
        "philosophy": "I believe that technology should be invisible—it should work so smoothly that users focus on their goals, not the tools. My approach combines rigorous engineering principles with creative problem-solving to deliver software that is not just functional, but exceptional.",
        "stats": {
            "projects": 12,
            "certificates": 10,
            "technologies": 15
        }
    }
];

export const services: Service[] = [
    {
        id: "10",
        slug: "mvp-development",
        title: "MVP Development",
        description: "Rapid prototyping and development of Minimum Viable Products for startups. Launch your idea quickly with a solid, scalable foundation.",
        icon: "RocketIcon",
        content: "# MVP Development\n\nLaunch your vision in weeks, not months. We specialize in building robust MVPs that validate your idea and scale as you grow."
    },
    {
        id: "11",
        slug: "api-design-integration",
        title: "API Design & Integration",
        description: "Building secure and scalable RESTful APIs. Integration of third-party services like payment gateways (Stripe), authentication (OAuth), and cloud storage.",
        icon: "ServerIcon",
        content: "# API Design & Scalability\n\nSecure, modular, and high-performance API architectures built using Django REST Framework and industry best practices."
    },
    {
        id: "12",
        slug: "performance-optimization",
        title: "Performance Optimization",
        description: "Auditing and optimizing existing applications for speed, accessibility, and SEO. Implementing caching strategies and code splitting.",
        icon: "LightningIcon",
        content: "# Performance Excellence\n\nWe optimize bundle sizes, implement advanced caching (Redis/CDN), and ensure 90+ Lighthouse scores for your production apps."
    },
    {
        id: "13",
        slug: "backend-api-development",
        title: "Backend API Development",
        description: "Secure REST APIs using Django REST Framework with authentication and scalable architecture.",
        icon: "CodeIcon",
        content: "# Backend Engineering\n\nReliable, secure, and high-load backend systems designed with enterprise standards and data integrity at the core."
    },
    {
        id: "14",
        slug: "full-stack-web-development",
        title: "Full Stack Web Development",
        description: "Building responsive web platforms using React, Django, and PostgreSQL.",
        icon: "LayersIcon",
        content: "# End-to-End Development\n\nSeamless integration between React frontends and Django backends for a unified, elite user experience."
    },
    {
        id: "15",
        slug: "cloud-deployment",
        title: "Cloud Deployment",
        description: "Deploying production-ready applications using Docker, AWS EC2, and CI/CD pipelines.",
        icon: "CloudIcon",
        content: "# Cloud Infrastructure\n\nAutomated deployments and containerized workflows to ensure your application is always live, always scalable."
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
        "description": "Salary Reality Checker delivers AI-powered salary insights using percentile analytics, fuzzy-matched job titles, and machine-learning predictions. It auto-corrects user input, analyzes market trends, and predicts salaries when data is missing. Built with FastAPI, PostgreSQL, scikit-learn.",
        "content": "## Salary Reality Checker\n\nSalary Reality Checker delivers AI-powered salary insights using percentile analytics, fuzzy-matched job titles, and machine-learning predictions. It auto-corrects user input, analyzes market trends, and predicts salaries when data is missing.",
        "tags": ["FastAPI", "PostgreSQL", "Machine Learning", "AI", "Salary Analytics"],
        "image": "",
        "link": "https://ashif-ek.github.io/docs-stack-material/",
        "github": "https://github.com/ashif-ek/salary-checker"
    },
    {
        "id": "11",
        "slug": "civic-connect",
        "title": "Civic (CiviTech) - Cross-Platform Digital Governance Platform",
        "description": "Developed a multi-role civic platform connecting citizens with Panchayath and higher administrative authorities, enabling complaint escalation, service tracking, announcements, moderation, analytics, and citizen engagement.",
        "content": "## Civic (CiviTech)\n\nDeveloped a multi-role civic platform connecting citizens with Panchayath and higher administrative authorities, enabling complaint escalation, service tracking, announcements, moderation, analytics, and citizen engagement.",
        "tags": ["Django", "Flutter", "REST API", "RBAC", "PostgreSQL"],
        "image": "",
        "link": "#",
        "github": "https://github.com/ashif-ek/civic-connect"
    },
    {
        "id": "12",
        "slug": "system-design-sandbox",
        "title": "Blog System Design Sandbox",
        "description": "Built a full-stack blogging system to experiment with production backend patterns including JWT access/refresh tokens, request validation, structured logging, health checks, and Dockerized deployment.",
        "content": "## Blog System Design Sandbox\n\nBuilt a full-stack blogging system to experiment with production backend patterns including JWT access/refresh tokens, request validation, structured logging, health checks, and Dockerized deployment.",
        "tags": ["React", "Django REST Framework", "Docker", "GitHub Actions", "AWS"],
        "image": "",
        "link": "#",
        "github": ""
    },
    {
        "id": "14",
        "slug": "timelens",
        "title": "TimeLens",
        "description": "Time Lens reframes real minutes into life-equivalents, helping you feel the true weight of time. A mindset tool that turns seconds into life-hours, minutes into life-days, and days into life-years.",
        "content": "## TimeLens\n\nTime Lens reframes real minutes into life-equivalents, helping you feel the true weight of time. A mindset tool that turns seconds into life-hours, minutes into life-days, and days into life-years.",
        "tags": ["Python", "Productivity", "Mindset Tool", "Time Management"],
        "image": "/images/mock/timelens.png",
        "link": "https://ashif-ek.github.io/docs-stack-material/",
        "github": "https://github.com/ashif-ek/time-lens-python"
    },
    {
        "id": "10",
        "slug": "noirel-ecommerce",
        "title": "NOIR'EL - Luxury E-Commerce Platform",
        "description": "Built a full-stack e-commerce platform using React and Django REST Framework covering the complete order lifecycle from browsing to secure payment confirmation. Implemented JWT authentication, admin controls, and payment workflows using Razorpay.",
        "content": "## NOIR'EL - Luxury E-Commerce\n\nBuilt a full-stack e-commerce platform using React and Django REST Framework covering the complete order lifecycle from browsing to secure payment confirmation. Implemented JWT authentication, admin controls, and payment workflows using Razorpay.",
        "tags": ["React", "Django REST Framework", "PostgreSQL", "Razorpay", "AWS"],
        "image": "/images/mock/noirel.png",
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
        "imageUrl": "/images/mock/architecture.png",
        "content": "# Building Scalable Architecture with Django and React\n\nIn modern web engineering, the separation of concerns between front-end and back-end is no longer just a preference—it's a requirement for scalability. By decoupling **Django REST Framework** from a **React/Next.js** frontend, we achieve perfect modularity. This article explores how to architect systems that handle thousands of concurrent requests while maintaining a sub-200ms latency profile through strategic caching (Redis), optimized database querying (PostgreSQL), and containerized deployments (Docker)."
    },
    {
        "id": 6,
        "slug": "optimizing-nextjs-performance",
        "title": "Optimizing Next.js Performance: A Practical Guide",
        "date": "2025-10-25",
        "summary": "Techniques for reducing bundle size and improving Core Web Vitals in large-scale Next.js applications.",
        "imageUrl": "/images/mock/timelens.png",
        "content": "# Optimizing Next.js Performance\n\nSpeed is the ultimate feature. In this guide, we dive deep into Next.js 19's **Server Actions**, **Partial Prerendering (PPR)**, and **Streaming**. We'll look at how to reduce bundle size by 60% and improve Core Web Vitals to achieve that elusive 100/100 Lighthouse score for enterprise-grade SEO and user retention."
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
    },
    {
        "id": 11,
        "slug": "react-19-django-5-ultimate-guide",
        "title": "React 19 & Django 5.x: The Ultimate Full-Stack Blueprint for 2026",
        "date": "2026-03-30",
        "updated_at": "2026-03-30",
        "summary": "Master the world's most powerful full-stack duo. Learn how React 19's Server Components and Django 5's async breakthroughs are redefining web engineering.",
        "imageUrl": "",
        "content": "# React 19 & Django 5.x: Engineering the Future\n\nIn the ever-evolving landscape of web development, two titans have consistently stood the test of time: **React** and **Django**. With the release of React 19 and Django 5.x, this combination has transformed from a reliable choice into an unstoppable force for elite engineers. \n\n## Why This Stack Dominates the Enterprise\n\nWhen we talk about 'Full-Stack Excellence', we are talking about three things: **Scalability, Security, and Speed**. \n\n1. **Pythonic Powerhouse**: Django 5.x brings enhanced async support and database-computed default values, reducing boilerplate and increasing runtime efficiency.\n2. **React 19 Revolution**: Server Components and improved hydration mean faster First Contentful Paint (LCP) and a frictionless user experience.\n\n### The Decoupled Architecture\n\nAs an engineer, my philosophy is centered around a clean, decoupled architecture. By using **Django REST Framework (DRF)** as the engine and **Next.js** as the driver, we achieve perfect separation of concerns.\n\n```python\n# Django 5.x Async View Example\nasync def my_view(request):\n    data = await MyModel.objects.all().afirst()\n    return JsonResponse({'data': data})\n```\n\n## 10x Performance Optimization\n\nPerformance isn't just about code; it's about architecture. Implementing **Redis** for caching, **PostgreSQL** for relational integrity, and **Docker** for environment parity ensures that your application scales from a single user to millions without breaking a sweat.\n\n## FAQ: Is Django still relevant in 2026?\n**Absolutely.** While newer frameworks come and go, Django's 'batteries-included' philosophy and massive ecosystem make it the most secure and scalable choice for startups and enterprises alike. Combined with React 19, it's virtually unbeatable for complex, data-driven applications."
    },
    {
        "id": 12,
        "slug": "scalable-mvp-blueprint-startups-2026",
        "title": "The Scalable MVP Blueprint: How Startups Win with Better Engineering",
        "date": "2026-03-30",
        "updated_at": "2026-03-30",
        "summary": "Most MVPs fail not because the idea is bad, but because the tech is fragile. Learn the strategy for building a 'Minimum Awesome Product' that scales.",
        "imageUrl": "",
        "content": "# The Scalable MVP Blueprint\n\nFor startup founders, time-to-market is everything. But speed should never come at the cost of stability. As an elite SEO strategist and full-stack architect, I've seen too many brilliant ideas die due to technical debt. Here is the blueprint for a 'Minimum Awesome Product'.\n\n## Phase 1: The Foundation (React + Django)\n\nChoosing a tech stack isn't just a technical decision; it's a business decision. React and Django allow you to:\n- **Iterate Faster**: Modular components and built-in admin panels.\n- **Hire Easier**: Access to a global pool of elite talent.\n- **Scale Simpler**: Robust migration systems and cloud-ready architectures.\n\n## Phase 2: Feature Prioritization\n\nDon't build everything. Build the *right* thing. Use the **MoSCoW** method (Must have, Should have, Could have, Won't have) to identify the core value proposition of your MVP.\n\n### Core Metrics to Track\n1. **LCP (Largest Contentful Paint)**: Keep it under 2.5s for SEO and UX.\n2. **Retention Rate**: Are users coming back?\n3. **Conversion Velocity**: How fast do users reach the 'Aha!' moment?\n\n## Conclusion: Start Fast, Stay Solid\n\nA scalable MVP is one that validates your business model while providing a robust path to version 2.0. By focusing on elite engineering from day one, you ensure that success won't be your greatest bottleneck."
    },
    {
        "id": 13,
        "slug": "hire-full-stack-developer-kerala",
        "title": "How to Hire an Elite Full-Stack Developer in Kerala",
        "date": "2026-03-30",
        "updated_at": "2026-03-30",
        "summary": "Finding the right technical partner in Kerala can be difficult. Learn the key traits of an elite full-stack engineer and how to evaluate their expertise.",
        "imageUrl": "",
        "content": "# How to Hire an Elite Full-Stack Developer in Kerala\n\nKerala's startup ecosystem is booming, but the talent gap remains a challenge for many non-technical founders. In this guide, we explore how to find and hire developers who aren't just coders, but strategic partners."
    },
    {
        "id": 14,
        "slug": "building-scalable-saas-mvp",
        "title": "Building Scalable SaaS MVPs with React and Django",
        "date": "2026-03-30",
        "updated_at": "2026-03-30",
        "summary": "Learn the architectural patterns required to build a SaaS MVP that won't break when you hit your first 10,000 users.",
        "imageUrl": "",
        "content": "# Building Scalable SaaS MVPs\n\nScalability starts at day one. Using React for the frontend and Django for the backend provides a robust foundation for any SaaS product."
    },
    {
        "id": 15,
        "slug": "nextjs-performance-seo",
        "title": "Next.js Performance: Boosting Core Web Vitals for SEO",
        "date": "2026-03-30",
        "updated_at": "2026-03-30",
        "summary": "A deep dive into optimizing Next.js applications for Google's Core Web Vitals. Speed is a ranking factor you cannot ignore.",
        "imageUrl": "",
        "content": "# Next.js Performance & SEO\n\nCore Web Vitals are now a critical part of Google's ranking algorithm. Learn how to achieve 100/100 Lighthouse scores."
    },
    {
        "id": 16,
        "slug": "ai-integration-python-django",
        "title": "The Future of AI Integration in Python Backends",
        "date": "2026-03-30",
        "updated_at": "2026-03-30",
        "summary": "How to leverage Python's AI ecosystem within a Django application to build intelligent features.",
        "imageUrl": "",
        "content": "# AI Integration in Django\n\nPython is the language of AI. Integrating LLMs and machine learning models into your Django backend is easier than you think."
    },
    {
        "id": 17,
        "slug": "ecommerce-development-kerala",
        "title": "Custom E-commerce Development in Kerala: A Growth Guide",
        "date": "2026-03-30",
        "updated_at": "2026-03-30",
        "summary": "Why off-the-shelf solutions often fail growing Kerala brands, and how custom development drives higher ROI.",
        "imageUrl": "",
        "content": "# Custom E-commerce Development\n\nFor businesses in Kerala, a generic Shopify store might not be enough. We build bespoke e-commerce experiences that convert."
    },
    {
        "id": 18,
        "slug": "postgresql-vs-mongodb-scaling",
        "title": "PostgreSQL vs MongoDB: Scaling Data in Production",
        "date": "2026-03-30",
        "updated_at": "2026-03-30",
        "summary": "Choosing the right database is crucial for long-term scalability. We compare the two giants for full-stack applications.",
        "imageUrl": "",
        "content": "# Database Scalability: Postgres vs MongoDB\n\nWhen should you choose relational over NoSQL? We break down the trade-offs for production-scale apps."
    },
    {
        "id": 19,
        "slug": "microservices-django-rest",
        "title": "Microservices Architecture with Django REST Framework",
        "date": "2026-03-30",
        "updated_at": "2026-03-30",
        "summary": "When to move from a monolith to microservices, and how to do it correctly using Django and Docker.",
        "imageUrl": "",
        "content": "# Microservices with Django\n\nMonolithic architectures are great for MVPs, but microservices offer the independence large teams need. Here is the roadmap."
    },
    {
        "id": 20,
        "slug": "react-server-components-guide",
        "title": "React Server Components: A Developer's Deep Dive",
        "date": "2026-03-30",
        "updated_at": "2026-03-30",
        "summary": "Understanding the most significant change to React in years. How Server Components improve performance and DX.",
        "imageUrl": "",
        "content": "# React Server Components\n\nRSC is revolutionary. Learn how to leverage server-side logic within your React components to reduce client-side bundle sizes."
    },
    {
        "id": 21,
        "slug": "cloud-deployment-kerala",
        "title": "Leveraging Cloud Deployment for Kerala Businesses",
        "date": "2026-03-30",
        "updated_at": "2026-03-30",
        "summary": "Why local hosting is a risk, and how moving to AWS/Azure can safeguard your business data.",
        "imageUrl": "",
        "content": "# Cloud Deployment for Kerala Businesses\n\nThe cloud offers reliability that local servers simply cannot match. Learn the benefits of AWS for your Kerala-based enterprise."
    },
    {
        "id": 22,
        "slug": "state-management-react-2026",
        "title": "Redux vs Context API vs Zustand: State Management 2026",
        "date": "2026-03-30",
        "updated_at": "2026-03-30",
        "summary": "Stop over-engineering your state management. We compare the best tools for React applications in 2026.",
        "imageUrl": "",
        "content": "# State Management in 2026\n\nChoosing between Redux, Zustand, and Context API depends on your app's complexity. We help you make the right choice."
    },
    {
        "id": 23,
        "slug": "software-development-trends-kochi",
        "title": "Top Software Development Trends in Kochi for 2026",
        "date": "2026-03-30",
        "updated_at": "2026-03-30",
        "summary": "Staying ahead of the curve in Ernakulam's competitive tech landscape. What Kochi startups are building this year.",
        "imageUrl": "",
        "content": "# Kochi Tech Trends 2026\n\nFrom AI-driven logistics to Fintech breakthroughs, Kochi is at the forefront of Kerala's digital revolution."
    },
    {
        "id": 24,
        "slug": "secure-django-production",
        "title": "Securing Your Django App: Best Practices for Production",
        "date": "2026-03-30",
        "updated_at": "2026-03-30",
        "summary": "A checklist for ensuring your Django backend is hardened against common security threats (OWASP Top 10).",
        "imageUrl": "",
        "content": "# Secure Django in Production\n\nSecurity is not an afterthought. Learn how to implement CSP, secure cookies, and rate limiting in your Django app."
    },
    {
        "id": 25,
        "slug": "django-channels-real-time",
        "title": "Building Real-Time Applications with Django Channels",
        "date": "2026-03-30",
        "updated_at": "2026-03-30",
        "summary": "How to implement WebSockets in your Django project for real-time notifications and chat features.",
        "imageUrl": "",
        "content": "# Real-Time Apps with Django Channels\n\nWebSockets allow for bidirectional communication. Django Channels makes it easy to integrate into your existing stack."
    },
    {
        "id": 26,
        "slug": "tailwind-css-4-next-gen",
        "title": "Tailwind CSS 4.0: Modern Styling for Next-Gen Apps",
        "date": "2026-03-30",
        "updated_at": "2026-03-30",
        "summary": "Exploring the performance improvements and new features in the latest version of Tailwind CSS.",
        "imageUrl": "",
        "content": "# Tailwind CSS 4.0\n\nThe most popular utility-first CSS framework just got better. Faster compilation and improved container support."
    },
    {
        "id": 27,
        "slug": "automate-deployments-github-aws",
        "title": "Automating Deployments with GitHub Actions and AWS",
        "date": "2026-03-30",
        "updated_at": "2026-03-30",
        "summary": "Stop manual deployments. We show you how to set up a robust CI/CD pipeline for your full-stack projects.",
        "imageUrl": "",
        "content": "# Automated CI/CD with GitHub & AWS\n\nConsistent deployments reduce human error. Learn how to automate your workflow using GitHub Actions."
    },
    {
        "id": 28,
        "slug": "custom-web-app-calicut",
        "title": "Why your Startup in Calicut Needs a Custom Web App",
        "date": "2026-03-30",
        "updated_at": "2026-03-30",
        "summary": "Building for the unique needs of the Malabar market. Why custom software is an investment, not an expense.",
        "imageUrl": "",
        "content": "# Custom Web Apps for Calicut Startups\n\nKozhikode's startup scene is unique. We build software that speaks to your local audience while scaling globally."
    },
    {
        "id": 29,
        "slug": "mastering-jwt-auth",
        "title": "Mastering JWT Authentication in React & Django",
        "date": "2026-03-30",
        "updated_at": "2026-03-30",
        "summary": "A complete guide to implementing secure JWT access and refresh token rotation in your full-stack app.",
        "imageUrl": "",
        "content": "# Mastering JWT Authentication\n\nStateless authentication is the standard for modern web apps. Here is how to do it right using SimpleJWT and React."
    },
    {
        "id": 30,
        "slug": "scaling-to-1m-users",
        "title": "Scaling to 1M Users: Technical Challenges and Solutions",
        "date": "2026-03-30",
        "updated_at": "2026-03-30",
        "summary": "What happens when you go viral? We discuss the bottlenecks and solutions for scaling to millions of users.",
        "imageUrl": "",
        "content": "# Scaling to 1 Million Users\n\nDatabase locks, CPU bottlenecks, and network latency. We explore how to overcome the challenges of massive growth."
    }
];

export const locations: LocationData[] = [
    {
        id: "1",
        city: "Kochi",
        slug: "kochi",
        title: "Full-Stack Developer in Kochi | React & Django Specialist",
        description: "Empowering Kochi's tech ecosystem with high-performance web solutions. Expert React and Django development for startups in Ernakulam.",
        content: "# Full-Stack Development in Kochi\n\nKochi is the rising tech hub of Kerala, and your startup deserves world-class engineering... Specializing in building scalable, secure applications for the Kochi market using React, Django, and PostgreSQL."
    },
    {
        id: "2",
        city: "Calicut",
        slug: "calicut",
        title: "Expert Web Development in Calicut | Ashif E.K",
        description: "Custom web application development for businesses and startups in Kozhikode. Scalable React and Django solutions.",
        content: "# Web Development in Calicut\n\nServing the entrepreneurial spirit of Malabar with elite full-stack engineering... We help Calicut businesses scale their digital presence with modern web architecture and performance optimization."
    },
    {
        id: "3",
        city: "Trivandrum",
        slug: "trivandrum",
        title: "Software Engineer in Trivandrum | High-Scale Web Apps",
        description: "Professional software engineering services in the capital city. Building robust backends and dynamic frontends for Trivandrum startups.",
        content: "# Software Engineering in Trivandrum\n\nFrom Technopark to the global stage, we build apps that scale... Expert development services for the capital's tech community, focusing on reliability, security, and elite user experiences."
    }
];

export const settings: Settings = {
    showHero: true,
    showAbout: true,
    showServices: true,
    showBlog: true,
    showSkills: true,
    showProjects: true,
    showCertificates: true,
    showGithubActivity: true,
    showBuildJourney: false,
    showRecruiterCta: true,
    showContacts: true,
    maintenanceMode: false,
    siteTitle: "Ashif E.K",
    welcomeMessage: ""
};
