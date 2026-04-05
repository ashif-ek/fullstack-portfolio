import { useQuery } from '@tanstack/react-query';
import { DataService } from '../services/dataService';
import { Project } from '../types';

export const useProjects = () => {
    return useQuery({
        queryKey: ['projects'],
        queryFn: () => DataService.getProjects(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
