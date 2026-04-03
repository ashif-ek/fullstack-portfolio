import { useQuery } from '@tanstack/react-query';
import Api from '../lib/api';
import { Certificate } from '../types';
import { certificates as MOCK_CERTIFICATES } from '../data/mockData';

const fetchCertificates = async (): Promise<Certificate[]> => {
    const { data } = await Api.get('/certificates/');
    return data;
};

export const useCertificates = () => {
    const query = useQuery({
        queryKey: ['certificates'],
        queryFn: fetchCertificates,
        staleTime: 1000 * 60 * 60, // 1 hour
    });

    const displayData = query.data || MOCK_CERTIFICATES;

    return {
        ...query,
        data: displayData
    };
};
