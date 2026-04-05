import { useQuery } from '@tanstack/react-query';
import { DataService } from '../services/dataService';

export const useHealth = () => {
    return useQuery({
        queryKey: ['health'],
        queryFn: () => DataService.checkHealth(),
        // Check often to realize when we are back online
        refetchInterval: 15000, // 15 seconds
        retry: 2, // Retry twice if it fails, helps with cold starts
        staleTime: 1000 * 5, // Data is fresh for 5 seconds
    });
};
