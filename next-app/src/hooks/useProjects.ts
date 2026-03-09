import { useQuery } from '@tanstack/react-query';
import Api from '../lib/api';
import { Project } from '../types';
import { MOCK_PROJECTS } from '../data/mock';

const fetchProjects = async (): Promise<Project[]> => {
    const { data } = await Api.get('/projects/');
    return data;
};

export const useProjects = () => {
    const query = useQuery({
        queryKey: ['projects'],
        queryFn: fetchProjects,
        staleTime: 0,
    });

    // Robust Fallback:
    // If API completely fails (e.g. connection refused), useQuery might return undefined data 
    // if we don't handle it. But placeholderData keeps the data visible while loading.
    // If isError is true (after retries), we explicitly return MOCK_PROJECTS to ensure "Demo Mode" persistence.
    if (query.isError) {
        return { ...query, data: MOCK_PROJECTS };
    }

    return query;
};
