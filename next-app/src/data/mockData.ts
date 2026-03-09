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
        id: "1",
        title: "Full-Stack Web Development",
        description: "End-to-end development of responsive web applications using React, Next.js, and Django. I handle everything from database design to frontend interactivity.",
        icon: "CodeIcon"
    },
    {
        id: "2",
        title: "MVP Development",
        description: "Rapid prototyping and development of Minimum Viable Products for startups. Launch your idea quickly with a solid, scalable foundation.",
        icon: "RocketIcon"
    },
    {
        id: "3",
        title: "API Design & Integration",
        description: "Building secure and scalable RESTful APIs. Integration of third-party services like payment gateways (Stripe), authentication (OAuth), and cloud storage.",
        icon: "ServerIcon"
    },
    {
        id: "4",
        title: "Performance Optimization",
        description: "Auditing and optimizing existing applications for speed, accessibility, and SEO. Implementing caching strategies and code splitting.",
        icon: "LightningIcon"
    }
];

export const skills: Skill[] = [
    { "id": 1, "name": "Django & Python", "level": 95, "category": "Backend", "color": "#44B78B", "icon": "PythonIcon", "description": "Expert in building secure REST APIs, ORM optimization, and scalable backend architecture." },
    { "id": 2, "name": "React & Next.js", "level": 90, "category": "Frontend", "color": "#61DAFB", "icon": "ReactIcon", "description": "Building performant, server-side rendered (SSR) applications with modern hooks and state management." },
    { "id": 3, "name": "TypeScript", "level": 85, "category": "Language", "color": "#3178C6", "icon": "TSIcon", "description": "Strong typing for scalable codebases, resulting in fewer runtime errors and better maintainability." },
    { "id": 4, "name": "Database Design", "level": 88, "category": "Data", "color": "#336791", "icon": "DatabaseIcon", "description": "Schema design, optimization, and management of SQL (PostgreSQL) and NoSQL databases." },
    { "id": 5, "name": "DevOps & Cloud", "level": 80, "category": "Infrastructure", "color": "#FF9900", "icon": "CloudIcon", "description": "Experience with Docker, CI/CD pipelines, and deploying to platforms like AWS and Vercel." },
    { "id": 6, "name": "Flutter", "level": 80, "category": "Mobile", "color": "#027DFD", "icon": "MobileIcon", "description": "Developing cross-platform mobile applications with native-like performance." }
];

export const tools: Tool[] = [
    { "id": "1", "name": "VS Code", "icon": "CodeIcon" },
    { "id": "2", "name": "PostgreSQL", "icon": "DatabaseIcon" },
    { "id": "3", "name": "Docker", "icon": "DockerIcon" },
    { "id": "4", "name": "Git & GitHub", "icon": "GitIcon" },
    { "id": "5", "name": "Figma", "icon": "FigmaIcon" },
    { "id": "6", "name": "Postman", "icon": "PostmanIcon" }
];

export const projects: Project[] = [
    {
        "id": "1",
        "title": "Noirel Luxury Ecommerce",
        "description": "A high-performance e-commerce platform designed for luxury aesthetics. Implemented complex filtering, cart management, and optimized asset loading for a sub-2s load time.",
        "content": "## Background\nNoirel needed a digital presence that matched their high-end physical boutique. The objective was to create a blistering fast ecommerce platform without sacrificing visual fidelity.\n\n## Architecture\nBuilt securely on **Next.js** for SSR and SEO advantages, utilizing a headless **Django** backend for inventory and payment processing. \n\n## Results\n* Decreased average page load time by **45%**\n* Increased automated conversions by leveraging a custom 3-step checkout\n* Reached **100 Lighthouse** scores across Performance and Accessibility criteria.",
        "tags": ["Next.js", "TypeScript", "Tailwind CSS", "Redux"],
        "image": "project1.jpg",
        "link": "https://noirel-store.vercel.app/",
        "github": "https://github.com/ashif-ek/noirel-ecommerce"
    },
    {
        "id": "2",
        "title": "CivicConnect Governance",
        "description": "A comprehensive digital governance platform enabling citizen engagement. Features include complaint tracking, real-time notifications, and administrative dashboards. Handled role-based access control for 4 distinct user types.",
        "content": "## Mission\nDesigned to bridge the gap between municipal administrators and citizens through an intuitive mobile-first interface.\n\n## Implementation Details\nUtilized **Flutter** for cross-platform app deployment alongside a robust **Django REST Framework** backend. Complex geospatial queries were handled efficiently using PostgreSQL PostGIS extensions to route complaints to specific municipal wards automatically.\n\n### Key Modules\n1. **Citizen Portal:** Geo-tagged complaint registration and live tracking.\n2. **Admin Dashboard:** Real-time analytics and workforce deployment mapping.\n3. **Notification Engine:** WebSocket-based live alerts for critical civic updates.",
        "tags": ["Django", "Flutter", "PostgreSQL", "REST API"],
        "image": "project2.jpg",
        "link": "https://github.com/ashif-ek/civic-connect",
        "github": "https://github.com/ashif-ek/civic-connect"
    },
    {
        "id": "3",
        "title": "Minimalist CMS Blog",
        "description": "A custom Content Management System built to be lightweight and SEO-friendly. Includes markdown support, dynamic routing, and server-side rendering for optimal search engine visibility.",
        "content": "## The Problem\nModern CMS solutions are often bloated and slow, delivering poor reading experiences.\n\n## The Solution\nA strictly dependency-light architecture using **Django** rendered views enhanced dynamically by **HTMX**. This entirely eliminates the need for heavy JavaScript parsing on mobile clients, generating immediate First Contentful Paints.\n\n### Technical Highlights\n* Built-in Markdown Engine with Syntax Highlighting\n* Zero-JS fallback compatibility\n* Optimized PostgreSQL text-search for sub-10ms query times.",
        "tags": ["Django", "HTMX", "PostgreSQL", "Bootstrap"],
        "image": "project3.jpg",
        "link": "https://github.com/ashif-ek/django-blog",
        "github": "https://github.com/ashif-ek/django-blog"
    }
];

export const certificates: Certificate[] = [
    {
        "id": "1",
        "title": "Bachelor of Computer Applications",
        "issuer": "University of Calicut",
        "date": "2025",
        "category": "Degree",
        "image": "bca.jpg",
        "credentialLink": "#",
        "description": "Focused on Software Engineering, Data Structures, and Algorithms. Graduated with honors."
    },
    {
        "id": "2",
        "title": "Full Stack Development Certification",
        "issuer": "Regional Technologies",
        "date": "2024",
        "category": "Professional",
        "image": "ccsa.jpg",
        "credentialLink": "#",
        "description": "Intensive bootcamp covering advanced Python, Django, React, and deployment strategies."
    }
];

export const blogs: Blog[] = [
    {
        "id": 1,
        "slug": "scalable-architecture-django-react",
        "title": "Building Scalable Architecture with Django and React",
        "date": "2025-11-10",
        "summary": "A deep dive into decoupling frontend and backend to create high-performance web applications that scale.",
        "imageUrl": "/blog/scalable.png",
        "content": "## Introduction\nIn modern web engineering, monolithic architectures often pose significant bottlenecks when attempting to scale engineering velocity or handle massive traffic spikes. Decoupling the frontend (React/Next.js) from the backend (Django) has become the gold standard. \n\n## The Core Architecture\n\nThe fundamental separation involves utilizing Django exclusively as a headless REST or GraphQL API. It becomes responsible purely for:\n1. **Data Integrity** via PostgreSQL\n2. **Authentication/Authorization** using JWTs\n3. **Business Logic Computation**\n\nMeanwhile, the React frontend consumes these APIs, focusing entirely on state management, user interactivity, and UI rendering.\n\n### Overcoming CORS and Authentication Hurdles\nWhen hosting Decoupled architectures, Cross-Origin Resource Sharing (CORS) is explicitly the first barrier. Ensuring `django-cors-headers` is implemented strictly to whitelist only your frontend domains is critical for enterprise security.\n\nFor authentication, transitioning away from Django's default Session Auth to JSON Web Tokens (`djangorestframework-simplejwt`) allows the React application to independently verify session states without constant database queries.\n\n## Conclusion\nWhile initial setup complexity increases inherently, the decoupled stack ensures your application can seamlessly support concurrent web clients, mobile app integrations, and independent scaling thresholds over its lifecycle."
    },
    {
        "id": 2,
        "slug": "optimizing-nextjs-performance",
        "title": "Optimizing Next.js Performance: A Practical Guide",
        "date": "2025-10-25",
        "summary": "Techniques for reducing bundle size and improving Core Web Vitals in large-scale Next.js applications.",
        "imageUrl": "/blog/performance.png",
        "content": "## Performance is a Feature\n\nIn the era of mobile-first indexing, performance is no longer an afterthought—it dictates organic reach and conversion metrics directly. Next.js offers tremendous out-of-the-box performance, but large enterprise applications often degrade over time if not strictly monitored.\n\n## Strategies for Optimization\n\n### 1. Dynamic Imports and Code Splitting\nNot every component needs to be sent in the initial JavaScript bundle. For heavy components like charts or modals, utilizing `next/dynamic` is vital.\n\n```tsx\nimport dynamic from 'next/dynamic';\n\nconst HeavyChart = dynamic(() => import('../components/HeavyChart'), {\n  loading: () => <p>Loading Data...</p>,\n  ssr: false\n});\n```\n\n### 2. Aggressive Image Optimization\nNever serve unoptimized images. The standard `<img>` tag is the enemy of the Largest Contentful Paint (LCP) metric. Automatically convert formats to WebP, enforce lazy-loading, and dictate explicit scaling constraints using the built-in `next/image` component natively.\n\n### 3. Font Loading Tactics\nRender blocking resources consistently destroy First Contentful Paint times. Always utilize `next/font` to instantly load typography via CSS variables natively, entirely bypassing layout shifts (CLS)."
    }
];
