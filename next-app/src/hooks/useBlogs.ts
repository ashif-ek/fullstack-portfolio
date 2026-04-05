import { useQuery } from '@tanstack/react-query';
import { DataService } from '../services/dataService';

export const useBlogs = () => {
    return useQuery({
        queryKey: ['blogs'],
        queryFn: () => DataService.getBlogs(),
        staleTime: 1000 * 60 * 30, // 30 mins
    });
};
