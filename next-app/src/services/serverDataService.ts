import { orchestrator } from '../lib/data/orchestrator';
import { dbSource } from '../lib/data/sources/db';
import { mockSource } from '../lib/data/sources/mock';
import { Project, Blog, Skill, Tool, Service, Certificate, LocationData, Profile, Settings, AboutData, Message } from '../lib/data/types';

export const serverDataService = {
    async getSettings(): Promise<Settings> {
        return await orchestrator.fetch('settings', () => dbSource.getSettings(), () => mockSource.getSettings());
    },
    async getProfile(): Promise<Profile | null> {
        return await orchestrator.fetch('profile', () => dbSource.getProfile(), () => mockSource.getProfile());
    },
    async getAbout(): Promise<AboutData | null> {
        return await orchestrator.fetch('about', () => dbSource.getAbout(), () => mockSource.getAbout());
    },
    async getProjects(): Promise<Project[]> {
        return await orchestrator.fetch('projects', () => dbSource.getProjects(), () => mockSource.getProjects());
    },
    async getProjectBySlug(slug: string): Promise<Project | null> {
        const projects = await this.getProjects();
        return projects.find((p: Project) => p.slug === slug) || null;
    },
    async getBlogs(): Promise<Blog[]> {
        return await orchestrator.fetch('blogs', () => dbSource.getBlogs(), () => mockSource.getBlogs());
    },
    async getBlogBySlug(slug: string): Promise<Blog | null> {
        const blogs = await this.getBlogs();
        return blogs.find((b: Blog) => b.slug === slug) || null;
    },
    async getSkills(): Promise<Skill[]> {
        return await orchestrator.fetch('skills', () => dbSource.getSkills(), () => mockSource.getSkills());
    },
    async getTools(): Promise<Tool[]> {
        return await orchestrator.fetch('tools', () => dbSource.getTools(), () => mockSource.getTools());
    },
    async getServices(): Promise<Service[]> {
        return await orchestrator.fetch('services', () => dbSource.getServices(), () => mockSource.getServices());
    },
    async getServiceBySlug(slug: string): Promise<Service | null> {
        const services = await this.getServices();
        return services.find((s: Service) => s.slug === slug) || null;
    },
    async getCertificates(): Promise<Certificate[]> {
        return await orchestrator.fetch('certificates', () => dbSource.getCertificates(), () => mockSource.getCertificates());
    },
    async getLocations(): Promise<LocationData[]> {
        return await orchestrator.fetch('locations', () => dbSource.getLocations(), () => mockSource.getLocations());
    },
    async getLocationByCity(city: string): Promise<LocationData | null> {
        const locations = await this.getLocations();
        return locations.find((l: LocationData) => l.slug === city) || null;
    },
    async getMessages(): Promise<Message[]> {
        return await orchestrator.fetch('messages', () => dbSource.getMessages(), () => Promise.resolve([]));
    }
};
