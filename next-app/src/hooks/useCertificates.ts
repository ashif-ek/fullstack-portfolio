import { useQuery } from '@tanstack/react-query';
import { DataService } from '../services/dataService';

export const useCertificates = () => {
    return useQuery({
        queryKey: ['certificates'],
        queryFn: () => DataService.getCertificates(),
        staleTime: 1000 * 60 * 60, // 1 hour
    });
};
