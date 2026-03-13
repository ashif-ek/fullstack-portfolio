export interface SocialLink {
    name: string;
    url: string;
}

export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export interface Profile {
    name: string;
    title: string;
    description: string;
    email: string;
    avatar?: string;
    socialLinks: SocialLink[];
}

export interface AboutStats {
    projects: number;
    certificates: number;
    technologies: number;
}

export interface AboutData {
    id: string;
    introduction: string;
    experience: string;
    philosophy: string;
    avatar?: string;
    stats: AboutStats;
}

export interface Skill {
    id: number;
    name: string;
    level: number;
    category: string;
    color: string;
    icon: string;
    description: string;
}

export interface Tool {
    id: string;
    name: string;
    icon: string;
}

export interface Project {
    id: string;
    slug: string;
    title: string;
    description: string;
    tags: string[];
    image: string;
    link: string;
    github: string;
    content?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Certificate {
    id: string;
    title: string;
    issuer: string;
    date: string;
    category: string;
    image: string;
    credentialLink: string;
    description: string;
}

export interface Blog {
    id: number;
    slug: string;
    title: string;
    date: string;
    summary: string;
    imageUrl: string;
    content: string;
    created_at?: string;
    updated_at?: string;
}
