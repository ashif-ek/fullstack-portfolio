import { useQuery } from '@tanstack/react-query';
import { DataService } from '../services/dataService';

export const useMessages = () => {
    return useQuery({
        queryKey: ['messages'],
        queryFn: () => DataService.getMessages(),
    });
};
