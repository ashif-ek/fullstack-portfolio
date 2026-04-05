import { useQuery } from '@tanstack/react-query';
import { DataService } from '../services/dataService';

export const useServices = () => {
    return useQuery({
        queryKey: ['services'],
        queryFn: () => DataService.getServices(),
        staleTime: 1000 * 60 * 60, // 1 hour
    });
};
