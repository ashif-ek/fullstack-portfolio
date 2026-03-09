import { useQuery } from '@tanstack/react-query';
import Api from '../lib/api';

const checkHealth = async (): Promise<boolean> => {
    try {
        await Api.get('/health/');
        return true;
    } catch (error) {
        return false;
    }
};

export const useHealth = () => {
    return useQuery({
        queryKey: ['health'],
        queryFn: checkHealth,
        // Check often to realize when we are back online
        refetchInterval: 15000, // 15 seconds
        retry: 0,
        // Start with false if undefined, but query will run immediately
        initialData: false,
    });
};
