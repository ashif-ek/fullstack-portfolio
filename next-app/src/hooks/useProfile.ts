import { useQuery } from '@tanstack/react-query';
import Api from '../lib/api';
import { Profile, AboutData } from '../types';
import { profile as MOCK_PROFILE, about as MOCK_ABOUT } from '../data/mockData';

// The backend /profile/ endpoint returns a combined object that maps to both Profile and AboutData
const fetchProfile = async (): Promise<any> => {
    const { data } = await Api.get('/profile/');
    return data[0] || data;
};

export const useProfile = () => {
    const query = useQuery({
        queryKey: ['profile'],
        queryFn: fetchProfile,
        staleTime: 1000 * 60 * 60, // 1 hour
    });

    // Extract Profile-specific data
    const profileData: Profile = query.data || MOCK_PROFILE;

    // Extract About-specific data
    const aboutData: AboutData = query.data || MOCK_ABOUT[0];

    return {
        ...query,
        profile: profileData,
        about: aboutData
    };
};
