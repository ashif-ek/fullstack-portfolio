import { useQuery } from '@tanstack/react-query';
import Api from '../lib/api';
import { Project } from '../types';
import { projects as MOCK_PROJECTS } from '../data/mockData';

const fetchProjects = async (): Promise<Project[]> => {
    const { data } = await Api.get('/projects/');
    return data;
};

export const useProjects = () => {
    const query = useQuery({
        queryKey: ['projects'],
        queryFn: fetchProjects,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // If there's an error and no data, only then fallback to MOCK_PROJECTS for resilience
    const displayData = query.data || (query.isError ? MOCK_PROJECTS : []);

    return {
        ...query,
        data: displayData
    };
};
