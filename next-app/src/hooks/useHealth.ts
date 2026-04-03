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
        retry: 2, // Retry twice if it fails, helps with cold starts
        staleTime: 1000 * 5, // Data is fresh for 5 seconds
    });
};
