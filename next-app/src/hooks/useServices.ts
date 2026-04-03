import { useQuery } from '@tanstack/react-query';
import Api from '../lib/api';
import { Service } from '../types';
import { services as MOCK_SERVICES } from '../data/mockData';

const fetchServices = async (): Promise<Service[]> => {
    const { data } = await Api.get('/services/');
    return data;
};

export const useServices = () => {
    const query = useQuery({
        queryKey: ['services'],
        queryFn: fetchServices,
        staleTime: 1000 * 60 * 5,
    });

    const displayData = query.data || MOCK_SERVICES;
    return { ...query, data: displayData };
};
