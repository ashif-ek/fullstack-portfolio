import { useQuery } from '@tanstack/react-query';
import { DataService } from '../services/dataService';

export const useSettings = () => {
    return useQuery({
        queryKey: ['settings'],
        queryFn: () => DataService.getSettings(),
        staleTime: 1000 * 60, // Settings are rarely changed, keep for 1 minute
    });
};
