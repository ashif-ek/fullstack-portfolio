import { useQuery } from '@tanstack/react-query';
import { DataService } from '../services/dataService';

export const useProfile = () => {
    const profileQuery = useQuery({
        queryKey: ['profile'],
        queryFn: () => DataService.getProfile(),
        staleTime: 1000 * 60 * 60, // 1 hour
    });

    const aboutQuery = useQuery({
        queryKey: ['about'],
        queryFn: () => DataService.getAbout(),
        staleTime: 1000 * 60 * 60, // 1 hour
    });

    return {
        profile: profileQuery.data,
        about: aboutQuery.data,
        isLoading: profileQuery.isLoading || aboutQuery.isLoading,
        error: profileQuery.error || aboutQuery.error,
        refetch: profileQuery.refetch,
        profileQuery,
        aboutQuery
    };
};
