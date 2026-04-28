import { useQuery } from '@tanstack/react-query';
import { DataService } from '../services/dataService';

export const useTools = () => {
    return useQuery({
        queryKey: ['tools'],
        queryFn: () => DataService.getTools(),
    });
};
