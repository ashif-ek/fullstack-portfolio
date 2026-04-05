import { useQuery } from '@tanstack/react-query';
import { DataService } from '../services/dataService';

export const useSkills = () => {
    return useQuery({
        queryKey: ['skills'],
        queryFn: () => DataService.getSkills(),
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    });
};

export const useTools = () => {
    return useQuery({
        queryKey: ['tools'],
        queryFn: () => DataService.getTools(),
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    });
};
