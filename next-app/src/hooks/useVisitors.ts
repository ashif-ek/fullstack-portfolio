import { useQuery } from '@tanstack/react-query';
import Api from '../lib/api';

const fetchVisitors = async (): Promise<{ total_visitors: number }> => {
    const { data } = await Api.get('/analytics/visitors/');
    return data;
};

export const useVisitors = () => {
    return useQuery({
        queryKey: ['visitors'],
        queryFn: fetchVisitors,
        staleTime: 60000, // 1 minute
    });
};
