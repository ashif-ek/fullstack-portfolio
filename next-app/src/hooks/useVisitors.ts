import { useQuery } from '@tanstack/react-query';
import { DataService } from '../services/dataService';

export const useVisitors = () => {
    return useQuery({
        queryKey: ['visitors'],
        queryFn: () => DataService.getVisitors(),
        staleTime: 60000, // 1 minute
    });
};
